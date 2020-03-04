
const Alexa = require('ask-sdk-core');

const messages = {
  WELCOME: 'Welcome to the Sample Alexa Customer Profile API Skill! You can ask for your name, your email address, or your phone number. What do you want to ask?',
  WHAT_DO_YOU_WANT: 'What do you want to ask?',
  NOTIFY_MISSING_PERMISSIONS: 'Please enable Customer Profile permissions in the Amazon Alexa app.',
  NAME_MISSING: 'You can set your name either in the Alexa app under calling and messaging, or you can set it at Amazon.com, under log-in and security.',
  EMAIL_MISSING: 'You can set your email at Amazon.com, under log-in and security.',
  NUMBER_MISSING: 'You can set your phone number at Amazon.com, under log-in and security.',
  NAME_AVAILABLE: 'Here is your full name: ',
  EMAIL_AVAILABLE: 'Here is your email address: ',
  NUMBER_AVAILABLE: 'Here is your phone number: ',
  ERROR: 'Uh Oh. Looks like something went wrong.',
  API_FAILURE: 'There was an error with the Alexa Customer Profile API. Please try again.',
  GOODBYE: 'Bye! Thanks for using the Sample Alexa Customer Profile API Skill!',
  UNHANDLED: 'This skill doesn\'t support that. Please ask something else.',
  HELP: 'You can use this skill by asking something like: whats my name?',
  STOP: 'Bye! Thanks for using the Sample Alexa Customer Profile API Skill!',
};

const PERMISSIONS = ['alexa::profile:name:read', 'alexa::profile:email:read', 'alexa::profile:mobile_number:read'];

const LaunchRequest = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder.speak(messages.WELCOME)
      .reprompt(messages.WHAT_DO_YOU_WANT)
      .getResponse();
  },
};

const NameIntent = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;

    return request.type === 'IntentRequest' && request.intent.name === 'NameIntent';
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
      const client = serviceClientFactory.getUpsServiceClient();
      const name = await client.getProfileName();

      console.log('Name successfully retrieved, now responding to user.');

      let response;
      if (name == null) {
        response = responseBuilder.speak(messages.NAME_MISSING).getResponse();
      } else {
        response = responseBuilder.speak(messages.NAME_AVAILABLE + name).getResponse();
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

const EmailIntent = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;

    return request.type === 'IntentRequest' && request.intent.name === 'EmailIntent';
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
      const client = serviceClientFactory.getUpsServiceClient();
      const email = await client.getProfileEmail();

      console.log('Email successfully retrieved, now responding to user.');

      let response;
      if (email == null) {
        response = responseBuilder.speak(messages.EMAIL_MISSING).getResponse();
      } else {
        response = responseBuilder.speak(messages.EMAIL_AVAILABLE + email).getResponse();
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

const NumberIntent = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;

    return request.type === 'IntentRequest' && request.intent.name === 'NumberIntent';
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
      const client = serviceClientFactory.getUpsServiceClient();
      const number = await client.getProfileMobileNumber();

      console.log('Number successfully retrieved, now responding to user.');

      let response;
      if (number == null) {
        response = responseBuilder.speak(messages.NUMBER_MISSING).getResponse();
      } else {
        response = responseBuilder.speak(`${messages.NUMBER_AVAILABLE} ${number.countryCode} ${number.phoneNumber}`).getResponse();
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

const CancelIntent = {
  canHandle(handlerInput) {
    const { request } = handlerInput.requestEnvelope;

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
    const { request } = handlerInput.requestEnvelope;

    return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.StopIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(messages.STOP)
      .getResponse();
  },
};

const ProfileError = {
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


const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequest,
    NameIntent,
    EmailIntent,
    NumberIntent,
    SessionEndedRequest,
    HelpIntent,
    CancelIntent,
    StopIntent,
    UnhandledIntent,
  )
  .addErrorHandlers(ProfileError)
  .withApiClient(new Alexa.DefaultApiClient())
  .withCustomUserAgent('cookbook/customer-profile/v1')
  .lambda();
