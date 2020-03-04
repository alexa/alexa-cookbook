/**
 * Skill Connections Requester.
 * Main entry point for lambda.
 */
const Alexa = require('ask-sdk-core');

/**
 * Handler to handle LaunchRequest.
 */
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
      console.log("LaunchRequest received.");

      const speechText = 'Skill Connections Requester starting connection for Print Webpage.';

        return handlerInput.responseBuilder
            .speak(speechText)
            .addDirective({
                'type': 'Connections.StartConnection',
                'uri': 'connection://AMAZON.PrintWebPage/1',
                'input': {
                    '@type': 'PrintWebPageRequest',
                    '@version': '1',
                    'title': 'Example Webpage',
                    'url': 'http://example.com/index.html'
                },
                'token': 'none'
            })
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === "IntentRequest" && request.intent.name == "AMAZON.HelpIntent";
    },
    handle(handleInput) {
        const speechText = "Welcome to Skill Connections Requester Skill. Launch the skill without asking for help.";

        handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && (request.intent.name === 'AMAZON.CancelIntent'
                || request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    },
};


/**
 * Handler to handle SessionResumedRequest.
 */
const SessionResumedRequestHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'SessionResumedRequest';
    },
    handle(handlerInput) {
        console.log("Requester skill received SessionResumedRequest");

        // Session attributes and ID are same as previous IntentRequest
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        const status = handlerInput.requestEnvelope.request.cause.status;
        const code = status.code;
        const message = status.message;
        const speechText = `status code is ${code}, message is ${message}`;

        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    },
};


/**
 * Handler to handle SessionEndedRequest
 */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === "SessionEndedRequest";
    },
    handle(handlerInput) {
        console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.error.message}`);
        return handlerInput.responseBuilder.getResponse();
    }
};

/**
 * Handler for error handling.
 */
const ErrorHandler = {
    canHandle() {
      return true;
    },
    handle(handlerInput, error) {
      console.log(`Error handled: ${error.message}`);
      return handlerInput.responseBuilder
        .speak('Sorry, error occurred.')
        .getResponse();
    },
};

exports.handler = Alexa.SkillBuilders.custom()
	.addRequestHandlers(
        LaunchRequestHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionResumedRequestHandler,
        SessionEndedRequestHandler,
    )
    .addErrorHandlers(ErrorHandler)
    .withCustomUserAgent('cookbook/connections-requester/v1')
    .lambda();
