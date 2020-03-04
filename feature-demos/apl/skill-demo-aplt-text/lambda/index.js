/* eslint-disable global-require */
/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
const TOKEN = "apltToken";

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'This is the APL-T Text Demo!';

    if (!supportsAPLT(handlerInput)) {
      return handlerInput.responseBuilder
        .speak('This APLT demo requires a device with a character display. Please try again from a device such as the Echo dot with clock.')
        .getResponse();
    }

    //Note, not all characters are supported in a seven segment display.
    //See: https://developer.amazon.com/docs/alexa-presentation-language/viewport-information-aplt.html#seven_segment

    return handlerInput.responseBuilder
      .speak(speechText)
      .addDirective({
        type: 'Alexa.Presentation.APLT.RenderDocument',
        token: TOKEN,
        version: '1.0',
        document: require('./apltDocument.json'),
        datasources: {
          'textData': {
            'type': 'object', 
            'text': 'GOOd dAy' //Stylized to show supported chars only. Unsupported chars are converted to space on device: " "
          }
        }
      }).getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'This skill demonstrates the Text component of APLT on a compatible device such as the Echo dot with clock. To see it, just open the skill without asking for help.';

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

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I had trouble processing that request. Please try again.')
      .getResponse();
  },
};

function supportsAPLT(handlerInput) {
  const supportedInterfaces = Alexa.getSupportedInterfaces(handlerInput.requestEnvelope);
  const aplInterface = supportedInterfaces['Alexa.Presentation.APLT']; // This is APLT, not APL
  return aplInterface !== null && aplInterface !== undefined;
}

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .withCustomUserAgent('cookbook/aplt-text/v1')
  .lambda();
