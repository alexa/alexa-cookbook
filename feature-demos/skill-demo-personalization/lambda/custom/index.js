const Alexa = require('ask-sdk-core');

const messages = {
  ERROR: 'Uh Oh. Looks like something went wrong.',
  GOODBYE: 'Bye! Thanks for using skill personalization demo skill!',
  UNHANDLED: 'This skill doesn\'t support that. Please ask something else.',
  HELP: 'You can use this skill by asking something like: who am i?',
  STOP: 'Bye! Thanks for using the skill personalization demo skill!',
};

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return ((request.type === 'LaunchRequest') ||
      (request.type === 'IntentRequest' &&
       request.intent.name === 'MyPersonalizationIntent'));
  },
  handle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    const person = handlerInput.requestEnvelope.context.System.person;

    if (person) {
      // The identifier of the recognized speaker.
      const personId = person.personId;
      console.log("Received personId: ", personId);
      // The account linking accessToken from the 3P account linked.
      // at person level
      const accessToken = person.accessToken;
      // This is for demo purpose only, you should never log accessToken.
      console.log("Received accessToken for person: ", accessToken);
      
      // Build a greeting response with first name.
      const personalizedGreeting = "Hi <alexa:name type=\"first\" personId=\""  
            + personId + "\"/>";

      return handlerInput.responseBuilder
        .speak(personalizedGreeting)
        .getResponse();
    } else {
      return handlerInput.responseBuilder
        .speak("Hi Stranger!")
        .getResponse();
    }
  }
};

const SessionEndedRequest = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const UnhandledIntent = {
  canHandle() {
    return true;
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(messages.UNHANDLED)
      .reprompt(messages.UNHANDLED)
      .getResponse();
  },
};

const HelpIntent = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(messages.HELP)
      .reprompt(messages.HELP)
      .getResponse();
  },
};

const CancelIntent = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.CancelIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(messages.GOODBYE)
      .getResponse();
  },
};

const StopIntent = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.StopIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(messages.STOP)
      .getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
 
    return handlerInput.responseBuilder
      .speak(messages.ERROR)
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    SessionEndedRequest,
    HelpIntent,
    CancelIntent,
    StopIntent,
    UnhandledIntent
  )
  .addErrorHandlers(ErrorHandler)
  .withCustomUserAgent('cookbook/skill-personalization-demo/v1')
  .lambda();