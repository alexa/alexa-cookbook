/* 
    This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
    Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
    session persistence, api calls, and more.
*/
const Alexa = require('ask-sdk-core');
const moment = require('moment-timezone');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Welcome to the banana stand. Would you like a daily reminder at one p. m. to get a banana?';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

/* Handler for creating a reminder when the AMAZON.YesIntent is matched */
const CreateReminderIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.YesIntent'
    },
    async handle(handlerInput) {
        
        /*
            Assign remindersApiClient to an instance of the reminderManagementServiceClient for making in-session requests
            to the Reminders API for creating, reading, updating, and deleting a reminder.
        */
        const reminderApiClient = handlerInput.serviceClientFactory.getReminderManagementServiceClient(),
            { permissions } = handlerInput.requestEnvelope.context.System.user // Assign-destruct permissions from the handlerInput
        
        /* 
            Check if the user has granted permissions for the skill to read and write reminders.
            If the permissions has not been granted, send an AskForPermissionsConsent card to the Alexa Companion mobile app.
            Reference: https://developer.amazon.com/docs/custom-skills/request-customer-contact-information-for-use-in-your-skill.html#permissions-card-for-requesting-customer-consent
        */
        if (!permissions) {
            return handlerInput.responseBuilder
                .speak("Please go to the Alexa mobile app to grant reminders permissions.")
                .withAskForPermissionsConsentCard(['alexa::alerts:reminders:skill:readwrite'])
                .getResponse()
        }
        
        const currentDateTime = moment().tz('America/Los_Angeles'), // Use moment to get current date and time in Pacific Time.
            /* 
                Declare the reminder request object that will be used by the reminderApiClient to send a POST request to the Reminders API.
                The request object specifies a daily reminder at 1 p.m. (13:00:00) Pacific Time.
                Reference: https://developer.amazon.com/docs/smapi/alexa-reminders-api-reference.html#request
            */
            reminderRequest = {
              requestTime: currentDateTime.format('YYYY-MM-DDTHH:mm:ss'),
              trigger: {
                type: 'SCHEDULED_ABSOLUTE',
                scheduledTime: currentDateTime.set({
                    hour: '13',
                    minute: '00',
                    second: '00'
                }).format('YYYY-MM-DDTHH:mm:ss'),
                timeZoneId: 'America/Los_Angeles',
                recurrence: {
                    freq: 'DAILY'
                }
              },
              alertInfo: {
                spokenInfo: {
                  content: [{
                    locale: 'en-US',
                    text: 'Time to get yo banana',
                  }],
                },
              },
              pushNotification: {
                status: 'ENABLED',
              }
            }
        
        try {
            /* Try to create a reminder based on the specified parameters in the request object. */
            await reminderApiClient.createReminder(reminderRequest)
        } catch(error) {
            /* If there is an error trying to create a reminder catch it so the skill can gracefully notify the user that an error occured. */
            console.log(`~~~ Error: ${error}`)
            return handlerInput.responseBuilder
                .speak('There was an error scheduling your reminder. Please try again later.')
                .getResponse();
        }
        
        /* If the create reminder request is successful, provide a confirmation message to the user. */
        const speechText = 'You successfully schedule a daily reminder at one p. m. to get a banana!';
        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = "To use this skill say open banana stand. Then confirm with yes and a reminder will be scheduled so you'll get your daily dose of banana!";

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Thanks for trying out Banana Stand. Goodbye!';
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

/* 
    The intent reflector is used for interaction model testing and debugging.
    It will simply repeat the intent the user said. You can create custom handlers
    for your intents by defining them above, then also adding them to the request
    handler chain below.
*/
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = handlerInput.requestEnvelope.request.intent.name;
        const speechText = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

/* 
    Generic error handling to capture any syntax or routing errors. If you receive an error
    stating the request handler chain is not found, you have not implemented a handler for
    the intent being invoked or included it in the skill builder below.
*/
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const speechText = `Sorry, I couldn't understand what you said. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

// This handler acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        CreateReminderIntentHandler, // Register CreateReminderIntentHandler declared above.
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler) // Make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers.
    .addErrorHandlers(ErrorHandler)
    /* 
        Add the API Client to our skill, so the skill has access to the RemindersManagementServiceClient which is used 
        to interact with the Reminders API.
    */
    .withApiClient(new Alexa.DefaultApiClient()) 
    .lambda();
