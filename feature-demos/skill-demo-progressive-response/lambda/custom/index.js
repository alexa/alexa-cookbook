const Alexa = require('ask-sdk');
const Messages = require('./Messages');
const WikiRequestClient = require('./WikiRequestClient');

// 1. Text strings ================================================================================
//    Modify these strings and messages to change the behavior of your Lambda function

const PAGINATION_SIZE = 3;
const MONTH_NAMES = 'January,February,March,April,May,June,July,August,September,October,November,December';

// 1. Intent Handlers =============================================

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const responseBuilder = handlerInput.responseBuilder;
    return responseBuilder
      .speak(Messages.welcomeOutput)
      .reprompt(Messages.welcomeReprompt)
      .getResponse();
  },
};

const InProgressGetFirstEventHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' &&
      request.intent.name === 'GetFirstEventIntent' &&
      request.dialogState !== 'COMPLETED';
  },
  handle(handlerInput) {
    const currentIntent = handlerInput.requestEnvelope.request.intent;
    return handlerInput.responseBuilder
      .addDelegateDirective(currentIntent)
      .getResponse();
  },
};

const GetFirstEventHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'GetFirstEventIntent';
  },
  async handle(handlerInput) {
    const responseBuilder = handlerInput.responseBuilder;
    const attributesManager = handlerInput.attributesManager;
    const request = handlerInput.requestEnvelope.request;
    const sessionAttributes = attributesManager.getSessionAttributes();

    const dateSlotValue = request.intent.slots && request.intent.slots.day.value;
    const calendar = dateSlotValue &&
      (Number.isNaN(Date.parse(dateSlotValue)) ? new Date() : new Date(dateSlotValue));
    const month = MONTH_NAMES.split(',')[calendar.getMonth()];
    const date = calendar.getDate().toString();
    try {
      await callDirectiveService(handlerInput, `${month} ${date}`);
    } catch (err) {
      // if it failed we can continue, just the user will wait longer for first response
      console.log(Messages.DIRECTIVEERRORMESSAGE + err);
    }
    try {
      const wikiRequestClient = new WikiRequestClient();
      const getEventsCall = wikiRequestClient.getEventsFromWiki(month, date);
      const events = await getEventsCall;
      if (events.length === 0) {
        return responseBuilder
          .speak(Messages.CONNECTERROR)
          .getResponse();
      }
      // let's purposely insert a 5 second delay for this demo.
      // shouldn't go longer else Lambda function may time out
      await sleep(5000);

      const cardTitle = `Events on ${month} ${date}`;
      const startIndex = 0;
      let speechOutput = `<p>For ${month} ${date}</p> ${selectCurrentEvents(events, startIndex).speechOutputContent}`;
      const cardOutput = `For ${month} ${date}, ${selectCurrentEvents(events, startIndex).cardOutputContent}`;
      if (startIndex + PAGINATION_SIZE >= events.length) {
        return responseBuilder
          .speak(speechOutput)
          .reprompt(Messages.NOMORE)
          .withSimpleCard(Messages.CARDTITLE, cardOutput)
          .getResponse();
      }
      sessionAttributes.index = PAGINATION_SIZE;
      sessionAttributes.text = events;
      speechOutput += Messages.GODEEPER;
      return responseBuilder
        .speak(speechOutput)
        .reprompt(Messages.MOREREPROMPTTEXT)
        .withSimpleCard(cardTitle, cardOutput)
        .getResponse();
    } catch (err) {
      console.log(`Error processing events request: ${err}`);
      return responseBuilder
        .speak(Messages.GETEVENTSERRORMESSAGE)
        .getResponse();
    }
  },
};

const AmazonYesHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.YesIntent';
  },
  handle(handlerInput) {
    return getNextEvent(handlerInput);
  },
};

const AmazonHelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const responseBuilder = handlerInput.responseBuilder;
    return responseBuilder
      .speak(Messages.helpOutput)
      .reprompt(Messages.helpReprompt)
      .getResponse();
  },
};

const AmazonCancelStopNoHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' &&
      (request.intent.name === 'AMAZON.CancelIntent' ||
        request.intent.name === 'AMAZON.NoIntent' ||
        request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const responseBuilder = handlerInput.responseBuilder;
    const speechOutput = 'Okay, talk to you later! ';

    return responseBuilder
      .speak(speechOutput)
      .withShouldEndSession(true)
      .getResponse();
  },
};

const SessionEndedHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    const request = handlerInput.requestEnvelope.request;

    console.log(`Original Request was: ${JSON.stringify(request, null, 2)}`);
    console.log(`Error handled: ${error}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can not understand the command.  Please say again.')
      .reprompt('Sorry, I can not understand the command.  Please say again.')
      .getResponse();
  },
};

function getNextEvent(handlerInput) {
  const responseBuilder = handlerInput.responseBuilder;
  const attributesManager = handlerInput.attributesManager;
  const sessionAttributes = attributesManager.getSessionAttributes();

  const events = sessionAttributes.text;
  const startIndex = sessionAttributes.index;
  if (events.length === 0) {
    return responseBuilder
      .speak(Messages.helpOutput)
      .reprompt(Messages.helpReprompt)
      .getResponse();
  }
  if (startIndex >= events.length) {
    return responseBuilder
      .speak(Messages.NOMORE)
      .reprompt(Messages.NOMORE)
      .getResponse();
  }
  let speechOutput = selectCurrentEvents(events, startIndex).speechOutputContent;
  const cardOutput = selectCurrentEvents(events, startIndex).cardOutputContent;
  if (startIndex + PAGINATION_SIZE >= events.length) {
    return responseBuilder
      .speak(speechOutput)
      .reprompt(Messages.NOMORE)
      .withSimpleCard(Messages.CARDTITLE, cardOutput)
      .getResponse();
  }
  sessionAttributes.index = startIndex + PAGINATION_SIZE;
  speechOutput += Messages.GODEEPER;
  return responseBuilder
    .speak(speechOutput)
    .reprompt(Messages.MOREREPROMPTTEXT)
    .withSimpleCard(Messages.CARDTITLE, cardOutput)
    .getResponse();
}

function callDirectiveService(handlerInput, date) {
  // Call Alexa Directive Service.
  const requestEnvelope = handlerInput.requestEnvelope;
  const directiveServiceClient = handlerInput.serviceClientFactory.getDirectiveServiceClient();

  const requestId = requestEnvelope.request.requestId;
  const endpoint = requestEnvelope.context.System.apiEndpoint;
  const token = requestEnvelope.context.System.apiAccessToken;

  // build the progressive response directive
  const directive = {
    header: {
      requestId,
    },
    directive: {
      type: 'VoicePlayer.Speak',
      speech: `${Messages.DIRECTIVESERVICEMESSAGE} ${date}...`,
    },
  };

  // send directive
  return directiveServiceClient.enqueue(directive, endpoint, token);
}

function selectCurrentEvents(events, startIndex) {
  let speechOutputContent = '';
  let cardOutputContent = '';
  for (let i = startIndex; i < Math.min(events.length, startIndex + PAGINATION_SIZE); i += 1) {
    speechOutputContent += `<p>${events[i]}</p>`;
    cardOutputContent += `${events[i]}\n`;
  }
  return {
    speechOutputContent,
    cardOutputContent,
  };
}

function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

// 4. Exports handler function and setup ===================================================
const skillBuilder = Alexa.SkillBuilders.custom();
exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    AmazonCancelStopNoHandler,
    AmazonHelpHandler,
    InProgressGetFirstEventHandler,
    GetFirstEventHandler,
    AmazonYesHandler,
    SessionEndedHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .withApiClient(new Alexa.DefaultApiClient())
  .withCustomUserAgent('cookbook/progressive-response/v1')
  .lambda();
