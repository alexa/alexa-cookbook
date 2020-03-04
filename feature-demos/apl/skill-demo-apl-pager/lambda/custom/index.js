/* eslint-disable global-require */
/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'This is the pager template!';

    if (!supportsAPL(handlerInput)) {
      return handlerInput.responseBuilder
        .speak('This APL demo requires a device with a screen. Please try again from a device like the Echo Show.')
        .getResponse();
    }

    return handlerInput.responseBuilder
      .speak(speechText)
      .addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        token: 'pagerToken',
        version: '1.0',
        document: require('./pager.json'),
        datasources: {
          'pagerTemplateData': {
            'type': 'object',
            'properties': {
              'hintString': 'try the blue cheese!',
            },
            'transformers': [
              {
                'inputPath': 'hintString',
                'transformer': 'textToHint',
              },
            ],
          },
        },
      })
      .addDirective({
        type: 'Alexa.Presentation.APL.ExecuteCommands',
        token: 'pagerToken',
        commands: [
          {
            'type': 'AutoPage',
            'componentId': 'pagerComponentId',
            'duration': 5000,
          },
        ],
      })
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'This skill demonstrates the pager component of APL. To see it, just open the skill without asking for help.';

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

function supportsAPL(handlerInput) {
  const supportedInterfaces = handlerInput.requestEnvelope.context.System.device.supportedInterfaces;
  const aplInterface = supportedInterfaces['Alexa.Presentation.APL'];
  return aplInterface != null && aplInterface !== undefined;
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
  .withCustomUserAgent('cookbook/apl-pager/v1')
  .lambda();
