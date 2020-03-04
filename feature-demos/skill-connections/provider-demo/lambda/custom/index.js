const Alexa = require('ask-sdk-core');

/**
 * Handler for AMAZON.PrintWebPage skill connections requests.
 */
const PrintWebPageTaskHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest'
            && request.task
            && request.task.name == "AMAZON.PrintWebPage";
    },
    handle(handlerInput) {
        console.log("Handling AMAZON.PrintWebPage task");
        const speechText = 'Successfully received an AMAZON.PrintWebPage task.';

        return handlerInput.responseBuilder
            .speak(speechText)
            .addDirective({
                "type": "Tasks.CompleteTask",
                "status": {
                    "code": "200",
                    "message": "Success",
                }
            })
            .withShouldEndSession(true)
            .getResponse();
    },
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest'&& request.task === undefined;
    },
    handle(handlerInput) {
        console.log("LaunchRequest received");

        const speechText = 'Welcome to Skill Connections AMAZON.PrintWebPage Provider Skill. Launch with a AMAZON.PrintWebPage task.'

        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    },
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
      const speechText = 'All I do is handle Skill Connections Requests. Launch with a AMAZON.PrintWebPage task.';
  
      return handlerInput.responseBuilder
        .speak(speechText)
        .getResponse();
    },
  };
  
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
            || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Goodbye!';

        return handlerInput.responseBuilder
        .speak(speechText)
        .getResponse();
    },
};
  

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

/**
 * Handler to catch exceptions from RequestHandler
 * and respond back to Alexa
 */
const ErrorHandler = {
    canHandle(handlerInput, error) {
        // handle all type of exceptions
        return true;
    },
    handle(handlerInput, error) {
        console.log("==== ERROR ======");
        console.log(`Error handled: ${error}`);

        return handlerInput.responseBuilder
            .speak('Sorry, error occurred')
            .getResponse();
    },
};

exports.handler = Alexa.SkillBuilders
  .custom()
  .addRequestHandlers(
    PrintWebPageTaskHandler,
    LaunchRequestHandler,
    SessionEndedRequestHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .withCustomUserAgent('cookbook/connections-provider/v1')
  .lambda();
