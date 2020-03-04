const Alexa = require('ask-sdk');
const invocationName = 'recipe app';

function getMemoryAttributes() {
  const memoryAttributes = {
    'history': [],

    // The remaining attributes will be useful after DynamoDB persistence is configured
    'launchCount': 0,
    'lastUseTimestamp': 0,

    'lastSpeechOutput': {},
    'nextIntent': [],

  };
  return memoryAttributes;
}

const maxHistorySize = 20; // remember only latest 20 intents


/* HANDLERS */

const LaunchRequestHandler = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      return request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
      const responseBuilder = handlerInput.responseBuilder;
  
      const say = `${'hello and welcome to '}${invocationName} ! Say help to hear some options.`;
  
      const skillTitle = capitalize(invocationName);
  
  
      return responseBuilder
        .speak(say)
        .reprompt(`try again, ${say}`)
        .withStandardCard('Welcome!',
          `Hello!\nThis is a card for your skill, ${skillTitle}`,
          welcomeCardImg.smallImageUrl, welcomeCardImg.largeImageUrl)
        .getResponse();
    },
  };

// Handler for Ingredient Intent which uses Catalog Entity Managment to populate slot values
const IngredientHandler = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      return request.type === 'IntentRequest' 
        && request.intent.name 
            === 'IngredientIntent';
    },
    handle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      const responseBuilder = handlerInput.responseBuilder;
  
      // delegate to Alexa to collect all the required slots
      let say = 'Hello. ';
  
      let slotStatus = '';
  
      const slotValues = getSlotValues(request.intent.slots);
  
      if (slotValues.Ingredient.heardAs) {
        slotStatus += ` You said ${slotValues.Ingredient.heardAs}, `;
      } else {
        slotStatus += 'Sorry I did not catch that ';
      }
      if (slotValues.Ingredient.ERstatus === 'ER_SUCCESS_MATCH') {
        slotStatus += 'a valid ';
        if (slotValues.Ingredient.resolved !== slotValues.Ingredient.heardAs) {
          slotStatus += `synonym for ${slotValues.Ingredient.resolved}. `;
        } else {
          slotStatus += 'match. ';
        } 
      }
      if (slotValues.Ingredient.ERstatus === 'ER_SUCCESS_NO_MATCH') {
        slotStatus += 'which did not match any slot value in the catalog list. ';
        console.log(`***** consider adding "${slotValues.Ingredient.heardAs}" to the custom slot type used by slot Ingredient! `);
      }
  
      if ((slotValues.Ingredient.ERstatus === 'ER_SUCCESS_NO_MATCH') 
            || (!slotValues.Ingredient.heardAs)) {
        slotStatus += 'A few valid values are salt, pepper, and vinegar';
      }
  
      say += slotStatus;
  
  
      return responseBuilder
        .speak(say)
        .reprompt(`try again, ${say}`)
        .getResponse();
    },
  };

  const HelpHandler = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      return request.type === 'IntentRequest' 
        && request.intent.name 
            === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
      const responseBuilder = handlerInput.responseBuilder;
      const intents = getCustomIntents();
      const sampleIntent = randomElement(intents);
  
      let say = 'You asked for help. ';
      say += ` Here something you can ask me, ${getSampleUtterance(sampleIntent)}`;
  
      return responseBuilder
        .speak(say)
        .reprompt(`try again, ${say}`)
        .getResponse();
    },
  };

  const StopHandler = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
      return request.type === 'IntentRequest' 
        && request.intent.name 
            === 'AMAZON.StopIntent';
    },
    handle(handlerInput) {
      const responseBuilder = handlerInput.responseBuilder;
      const say = 'Okay, talk to you later! ';
  
      return responseBuilder
        .speak(say)
        .withShouldEndSession(true)
        .getResponse();
    },
  };

const FallbackHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' 
        && request.intent.name 
            === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    const responseBuilder = handlerInput.responseBuilder;
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const previousSpeech = getPreviousSpeechOutput(sessionAttributes);

    return responseBuilder
      .speak(`Sorry I didnt catch what you said, ${stripSpeak(previousSpeech.outputSpeech)}`)
      .reprompt(stripSpeak(previousSpeech.reprompt))
      .getResponse();
  },
};

const CancelHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' 
        && request.intent.name 
            === 'AMAZON.CancelIntent';
  },
  handle(handlerInput) {
    const responseBuilder = handlerInput.responseBuilder;
    const say = 'Okay, talk to you later! ';

    return responseBuilder
      .speak(say)
      .withShouldEndSession(true)
      .getResponse();
  },
};

const NavigateHomeHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' 
        && request.intent.name 
            === 'AMAZON.NavigateHomeIntent';
  },
  handle(handlerInput) {
    const responseBuilder = handlerInput.responseBuilder;
    const say = 'Hello from AMAZON.NavigateHomeIntent. ';

    return responseBuilder
      .speak(say)
      .reprompt(`try again, ${say}`)
      .getResponse();
  },
};

const SessionEndedHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput}`);
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.  Please say again.')
      .reprompt('Sorry, an error occurred.  Please say again.')
      .getResponse();
  },
};


/* CONSTANTS */
const welcomeCardImg = {
    smallImageUrl: 'https://s3.amazonaws.com/skill-images-789/cards/card_plane720_480.png',
    largeImageUrl: 'https://s3.amazonaws.com/skill-images-789/cards/card_plane1200_800.png',
};

/* FUNCTIONS */
function capitalize(myString) {
  return myString.replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
}


function randomElement(myArray) {
  return (myArray[Math.floor(Math.random() * myArray.length)]);
}

function stripSpeak(str) {
  return (str.replace('<speak>', '').replace('</speak>', ''));
}


function getSlotValues(filledSlots) {
  const slotValues = {};

  Object.keys(filledSlots).forEach((item) => {
    const name = filledSlots[item].name;

    if (filledSlots[item]
            && filledSlots[item].resolutions
            && filledSlots[item].resolutions.resolutionsPerAuthority[0]
            && filledSlots[item].resolutions.resolutionsPerAuthority[0].status
            && filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
      switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
        case 'ER_SUCCESS_MATCH':
          slotValues[name] = {
            heardAs: filledSlots[item].value,
            resolved: filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name,
            ERstatus: 'ER_SUCCESS_MATCH',
          };
          break;
        case 'ER_SUCCESS_NO_MATCH':
          slotValues[name] = {
            heardAs: filledSlots[item].value,
            resolved: '',
            ERstatus: 'ER_SUCCESS_NO_MATCH',
          };
          break;
        default:
          break;
      }
    } else {
      slotValues[name] = {
        heardAs: filledSlots[item].value,
        resolved: '',
        ERstatus: '',
      };
    }
  }, this);

  return slotValues;
}

function getCustomIntents() {
  const modelIntents = model.interactionModel.languageModel.intents;

  const customIntents = [];


  for (let i = 0; i < modelIntents.length; i++) {
    if (modelIntents[i].name.substring(0, 7) !== 'AMAZON.' 
        && modelIntents[i].name 
            !== 'LaunchRequest') {
      customIntents.push(modelIntents[i]);
    }
  }
  return customIntents;
}

function getSampleUtterance(intent) {
  return randomElement(intent.samples);
}


function getPreviousSpeechOutput(attrs) {
  if (attrs.lastSpeechOutput && attrs.history.length > 1) {
    return attrs.lastSpeechOutput;
  }
  return false;
}

const InitMemoryAttributesInterceptor = {
  process(handlerInput) {
    let sessionAttributes = {};
    if (handlerInput.requestEnvelope.session.new) {
      sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

      const memoryAttributes = getMemoryAttributes();

      if (Object.keys(sessionAttributes).length === 0) {
        Object.keys(memoryAttributes).forEach((key) => {
          sessionAttributes[key] = memoryAttributes[key];
        });
      }
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
    }
  },
};

const RequestHistoryInterceptor = {
  process(handlerInput) {
    const thisRequest = handlerInput.requestEnvelope.request;
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    const history = sessionAttributes.history || [];

    let IntentRequest = {};
    if (thisRequest.type === 'IntentRequest') {
      const slots = [];

      IntentRequest = {
        'IntentRequest': thisRequest.intent.name,
      };

      if (thisRequest.intent.slots) {
        for (const slot in thisRequest.intent.slots) {
          const slotObj = {};
          slotObj[slot] = thisRequest.intent.slots[slot].value;
          slots.push(slotObj);
        }

        IntentRequest = {
          'IntentRequest': thisRequest.intent.name,
          'slots': slots,
        };
      }
    } else {
      IntentRequest = { 'IntentRequest': thisRequest.type };
    }
    if (history.length > maxHistorySize - 1) {
      history.shift();
    }
    history.push(IntentRequest);

    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
  },

};


const skillBuilder = Alexa.SkillBuilders.standard();
exports.handler = skillBuilder
  .addRequestHandlers(
    FallbackHandler,
    CancelHandler,
    HelpHandler,
    StopHandler,
    NavigateHomeHandler,
    IngredientHandler,
    LaunchRequestHandler,
    SessionEndedHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .addRequestInterceptors(InitMemoryAttributesInterceptor)
  .addRequestInterceptors(RequestHistoryInterceptor)
  .lambda();


// End of Skill code -------------------------------------------------------------
// Static Language Model for reference

const model = {
  'interactionModel': {
    'languageModel': {
      'invocationName': 'recipe app',
      'intents': [
        {
          'name': 'AMAZON.FallbackIntent',
          'samples': [],
        },
        {
          'name': 'AMAZON.CancelIntent',
          'samples': [],
        },
        {
          'name': 'AMAZON.HelpIntent',
          'samples': [],
        },
        {
          'name': 'AMAZON.StopIntent',
          'samples': [],
        },
        {
          'name': 'AMAZON.NavigateHomeIntent',
          'samples': [],
        },
        {
          'name': 'IngredientIntent',
          'slots': [
            {
              'name': 'Ingredient',
              'type': 'Ingredient',
            },
          ],
          'samples': [
            'Add {Ingredient} to my ingredient list',
          ],
        },
        {
          'name': 'LaunchRequest',
        },
      ],
      'types': [
        {
          'name': 'Ingredient',
          'valueSupplier': {
            'type': 'CatalogValueSupplier',
            'valueCatalog': {
              'catalogId': 'amzn1.ask.interactionModel.catalog.4a0177ce-edfb-48b9-a211-284dd16183cb',
              'version': '1',
            },
          },
        },
      ],
    },
  },
};
