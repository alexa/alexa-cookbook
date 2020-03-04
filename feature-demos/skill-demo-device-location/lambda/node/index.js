const Alexa = require('ask-sdk-core');

const messages = {
  WELCOME: 'Welcome to the Sample Device Address API Skill!  You can ask for the device address by saying what is my address.  What do you want to ask?',
  WHAT_DO_YOU_WANT: 'What do you want to ask?',
  NOTIFY_MISSING_PERMISSIONS: 'Please enable Location permissions in the Amazon Alexa app.',
  NO_ADDRESS: 'It looks like you don\'t have an address set. You can set your address from the companion app.',
  ADDRESS_AVAILABLE: 'Here is your full address: ',
  ERROR: 'There was an error with the Device Address API. Please check the logs.',
  LOCATION_FAILURE: 'There was an error with the Device Address API. Please try again.',
  GOODBYE: 'Bye! Thanks for using the Sample Device Address API Skill!',
  HELP: 'You can use this skill by asking something like: whats my address?',
};

const PERMISSIONS = ['read::alexa:device:all:address'];

const GetAddressIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return ((request.type === 'IntentRequest' && request.intent.name === 'GetAddressIntent')
            || (handlerInput.requestEnvelope.request.type === 'LaunchRequest'));
  },
  async handle(handlerInput) {
    const { requestEnvelope, serviceClientFactory, responseBuilder } = handlerInput;

    const consentToken = requestEnvelope.context.System.apiAccessToken;
    if (!consentToken) {
      return responseBuilder
        .speak(messages.NOTIFY_MISSING_PERMISSIONS)
        .withAskForPermissionsConsentCard(PERMISSIONS)
        .getResponse();
    }
    try {
      const { deviceId } = requestEnvelope.context.System.device;
      const deviceAddressServiceClient = serviceClientFactory.getDeviceAddressServiceClient();
      const address = await deviceAddressServiceClient.getFullAddress(deviceId);

      console.log('Address successfully retrieved, now responding to user.');

      let response;
      if (address.addressLine1 === null && address.stateOrRegion === null) {
        response = responseBuilder.speak(messages.NO_ADDRESS).getResponse();
      } else {
        const ADDRESS_MESSAGE = `${messages.ADDRESS_AVAILABLE} ${address.addressLine1}, ${address.stateOrRegion}, ${address.postalCode}`;
        response = responseBuilder.speak(ADDRESS_MESSAGE).getResponse();
      }
      return response;
    } catch (error) {
      if (error.name !== 'ServiceError') {
        const response = responseBuilder.speak(messages.ERROR).getResponse();
        return response;
      }
      throw error;
    }
  },
};

const GetAddressErrorHandler = {
  canHandle(handlerInput, error) {
    return error.name === 'ServiceError';
  },
  handle(handlerInput, error) {
    if (error.statusCode === 403) {
      return handlerInput.responseBuilder
        .speak(messages.NOTIFY_MISSING_PERMISSIONS)
        .withAskForPermissionsConsentCard(PERMISSIONS)
        .getResponse();
    }
    return handlerInput.responseBuilder
      .speak(messages.LOCATION_FAILURE)
      .reprompt(messages.LOCATION_FAILURE)
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;

    return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(messages.HELP)
      .reprompt(messages.HELP)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;

    return request.type === 'IntentRequest'
        && (request.intent.name === 'AMAZON.CancelIntent'
            || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(messages.GOODBYE)
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

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetAddressIntentHandler,
    SessionEndedRequestHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
  )
  .addErrorHandlers(GetAddressErrorHandler)
  .withApiClient(new Alexa.DefaultApiClient())
  .withCustomUserAgent('cookbook/device-location/v1')
  .lambda();
