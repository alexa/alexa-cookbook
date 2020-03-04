const Alexa = require(`ask-sdk-core`);

const LaunchReflectorHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === `LaunchRequest`;
  },
  handle(handlerInput) {
    let speechOutput = `Launch Request`;
    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withShouldEndSession(false)
      .getResponse();
  }
};
const IntentReflectorHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === `IntentRequest`;
  },
  handle(handlerInput) {
    const intentName = handlerInput.requestEnvelope.request.intent.name;
    let speechOutput = `Intent, ${intentName}. `;
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    speechOutput += `Locale, ${sessionAttributes.locale}. `;
    const slotsInRequest = handlerInput.requestEnvelope.request.intent.slots;
    if (slotsInRequest) {
      const slotValues = getSlotValues(slotsInRequest);
      speechOutput += `Slots. `;
      Object.keys(slotValues).forEach((item) => {
        const name = item; 
        const value = slotValues[item].value; 
        const synonym = slotValues[item].synonym; 
        speechOutput += `${name}, ${value}, `;
        if (synonym != value) {
          speechOutput += `${synonym}. `;
        }
      });
    }
    const dialogState = handlerInput.requestEnvelope.request.dialogState;
    if (dialogState === `STARTED` ||
      dialogState === `IN PROGRESS`
    ) {
      handlerInput.responseBuilder.addDelegateDirective(handlerInput.requestEnvelope.request.intent);
    } else {
      handlerInput.responseBuilder.speak(speechOutput).withShouldEndSession(false);
    }

    return handlerInput.responseBuilder.getResponse();
  }
};
const SessionEndedReflectorHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === `SessionEndedRequest`;
  },
  handle(handlerInput) {
    const sessionEndedReason = handlerInput.requestEnvelope.request.reason;
    console.log(`~~~~~~~~~~~~~~~~~~~`);
    console.log(`Session Ended Reason: ${sessionEndedReason}`);
    console.log(`~~~~~~~~~~~~~~~~~~~\n`);
  }
};

const RequestHandlerChainErrorHandler = {
  canHandle(handlerInput, error) {
    return error.message === `RequestHandlerChain not found!`;
  },
  handle(handlerInput, error) {
    console.log(`~~~~~~~~~~~~~~~~~~~`);
    console.log(`Error handled: ${error.message}`);
    console.log(`~~~~~~~~~~~~~~~~~~~\n`);
    return handlerInput.responseBuilder
      .speak(`Oops! Looks like you forgot to register a handler.`)
      .getResponse();
  },
};
const GenericErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`~~~~~~~~~~~~~~~~~~~`);
    console.log(`Error handled: ${error.message}`);
    console.log(`~~~~~~~~~~~~~~~~~~~\n`);
    return handlerInput.responseBuilder
      .speak(`There was an error. The stack trace has been logged to Cloud Watch.`)
      .getResponse();
  },
};

const LocaleRequestInterceptor = {
  process(handlerInput) {
    const requestLocale = handlerInput.requestEnvelope.request.locale;
    let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    sessionAttributes.locale = requestLocale;
    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
  }
};
const LoggingRequestInterceptor = {
  process(handlerInput) {
    console.log(`~~~~~~~~~~~~~~~~~~~`);
    console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    console.log(`~~~~~~~~~~~~~~~~~~~\n`);
  }
};
const LoggingResponseInterceptor = {
  process(handlerInput, response) {
    console.log(`~~~~~~~~~~~~~~~~~~~`);
    console.log(`Outgoing response: ${JSON.stringify(response)}`);
    console.log(`~~~~~~~~~~~~~~~~~~~\n`);
  }
};
const skillBuilder = Alexa.SkillBuilders.custom();
exports.handler = skillBuilder
  .addRequestHandlers(
    IntentReflectorHandler,
    LaunchReflectorHandler,
    SessionEndedReflectorHandler
  )
  .addErrorHandlers(
    RequestHandlerChainErrorHandler,
    GenericErrorHandler
  )
  .addRequestInterceptors(
    LoggingRequestInterceptor,
    LocaleRequestInterceptor
  )
  .addResponseInterceptors(
    LoggingResponseInterceptor
  )
  .lambda();

//=========================================================================================================================================
//Helper functions
//=========================================================================================================================================

function getSlotValues(filledSlots) {
  const slotValues = {};

  console.log(`The filled slots: ${JSON.stringify(filledSlots)}`);
  Object.keys(filledSlots).forEach((item) => {
    const name = filledSlots[item].name;

    if (filledSlots[item] &&
      filledSlots[item].resolutions &&
      filledSlots[item].resolutions.resolutionsPerAuthority[0] &&
      filledSlots[item].resolutions.resolutionsPerAuthority[0].status &&
      filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
      switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
        case 'ER_SUCCESS_MATCH':
          slotValues[name] = {
            synonym: filledSlots[item].value,
            value: filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name,
            id: filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.id,
            isValidated: true,
            canUnderstand: "YES",
            canFulfill: "YES",
          };
          break;
        case 'ER_SUCCESS_NO_MATCH':
          slotValues[name] = {
            synonym: filledSlots[item].value,
            value: filledSlots[item].value,
            id: null,
            isValidated: false,
            canUnderstand: "NO",
            canFulfill: "MAYBE",
          };
          break;
        default:
          break;
      }
    } else {
      slotValues[name] = {
        synonym: filledSlots[item].value,
        value: filledSlots[item].value,
        id: filledSlots[item].id,
        isValidated: false,
        canUnderstand: "NO",
        canFulfill: "NO",
      };
    }
  }, this);
  return slotValues;
}
