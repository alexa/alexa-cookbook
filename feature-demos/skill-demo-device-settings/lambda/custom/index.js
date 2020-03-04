/* eslint-disable prefer-template */
const Alexa = require('ask-sdk-core');

const messages = {
  WELCOME: 'Welcome to the Sample Alexa Customer Settings API Skill! You can ask for your time zone, distance units and temperature units. What do you want to hear?',
  WHAT_DO_YOU_WANT: 'What do you want to hear?',
  ERROR: 'Uh Oh. Looks like something went wrong.',
  SETTINGS_FAILURE: 'There was an error with the Alexa Customer Settings API. Please try again.',
  GOODBYE: 'Bye! Thanks for using the Demo Alexa Customer Settings API Skill!',
  UNHANDLED: 'This skill doesn\'t support that. Please ask something else.',
  HELP: 'You can use this skill by asking something like: whats my time zone?',
  STOP: 'Bye! Thanks for using the Demo Alexa Customer Settings API Skill!',
};

const LaunchRequest = {
  canHandle(handlerInput) {
    return ((handlerInput.requestEnvelope.request.type === 'LaunchRequest') ||
      (handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
       handlerInput.requestEnvelope.request.intent.name === 'MySettingsIntent'));
  },
  async handle(handlerInput) {
    const { requestEnvelope, serviceClientFactory, attributesManager } = handlerInput;
    const { deviceId } = requestEnvelope.context.System.device;
    let usertimeZone;
    let userDistanceUnits;
    let userTemperatureUnits;

    try {
      const upsServiceClient = serviceClientFactory.getUpsServiceClient();
      usertimeZone = await upsServiceClient.getSystemTimeZone(deviceId);
      userDistanceUnits = await upsServiceClient.getSystemDistanceUnits(deviceId);
      userTemperatureUnits = await upsServiceClient.getSystemTemperatureUnit(deviceId);
    } catch (error) {
      if (error.name !== 'ServiceError') {
        return handlerInput.responseBuilder.speak(messages.ERROR).getResponse();
      }
      throw error;
    }

    const requestAttributes = attributesManager.getRequestAttributes();
    requestAttributes.timeZone = usertimeZone;
    requestAttributes.distanceUnits = userDistanceUnits;
    requestAttributes.temperatureUnits = userTemperatureUnits;
    attributesManager.setRequestAttributes(requestAttributes);

    console.log(JSON.stringify(attributesManager.getRequestAttributes()));

    const message = `Your time zone is ${usertimeZone}, your distance units are ${userDistanceUnits}, and your temperature units are ${userTemperatureUnits}.`;
    return handlerInput.responseBuilder.speak(message)
      .withStandardCard(message)
      .getResponse();
  },
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

const SettingsError = {
  canHandle(handlerInput, error) {
    return error.name === 'ServiceError';
  },
  handle(handlerInput, error) {
    return handlerInput.responseBuilder
      .speak(messages.SETTINGS_FAILURE)
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequest,
    SessionEndedRequest,
    HelpIntent,
    CancelIntent,
    StopIntent,
    UnhandledIntent,
  )
  .addErrorHandlers(SettingsError)
  .withApiClient(new Alexa.DefaultApiClient())
  .withCustomUserAgent('cookbook/device-settings/v1')
  .lambda();
