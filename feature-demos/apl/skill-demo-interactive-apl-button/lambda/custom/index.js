/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core')

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
  },
  handle(handlerInput) {
    const speechText = 'Welcome to the Interactive APL Button Demo! Press the button to learn how I work. Then go see the code on GitHub.'

    return handlerInput.responseBuilder
      .speak(speechText)
      // Add this to render APL document
      .addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        version: '1.0',
        document: require('./apl/button'), // Import button APL document
        datasources: {}
      })
      .getResponse()
  },
};

const SendEventIntentHandler = {
  canHandle(handlerInput) {
    // Check for SendEvent sent from the button
    return handlerInput.requestEnvelope.request.type === 'Alexa.Presentation.APL.UserEvent'
  },
  handle(handlerInput) {
    // Take argument sent from the button to speak back to the user
    const speechText = handlerInput.requestEnvelope.request.arguments[0]
    return handlerInput.responseBuilder
        .speak(speechText)
        .getResponse()
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent'
  },
  handle(handlerInput) {
    const speechText = 'Press the button.'

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Press the button and checkout GitHub for the source code.', speechText)
      .getResponse()
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent')
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!'

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Thanks for trying the demo. You could find the code on GitHub', speechText)
      .getResponse()
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest'
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`)

    return handlerInput.responseBuilder.getResponse()
  },
};

const ErrorHandler = {
  canHandle() {
    return true
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`)
    const speechText = 'I had trouble processing that request. Please try again and if the issue persists, please contact the skill developer. What can I help you with?'
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse()
  },
};

const skillBuilder = Alexa.SkillBuilders.custom()

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    SendEventIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .withCustomUserAgent('cookbook/apl-interactive-button/v1')
  .lambda();
