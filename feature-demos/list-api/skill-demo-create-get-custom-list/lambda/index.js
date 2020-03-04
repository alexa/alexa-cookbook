// This sample demonstrates how to use the ListManagementClient through ASK SDK v2 to create and get custom lists.

const Alexa = require('ask-sdk-core');

const createListSpeech = "You can create a list by saying, create a custom list name and the name",
    getListsSpeech = "You can get lists you created by saying, what are my custom lists";
            
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const introSpeech = "Welcome to the custom list demo. This demo demonstrates creating a custom list and getting custom lists you've created",
            speakOutput = `${introSpeech}. ${createListSpeech} or ${getListsSpeech}.`
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CreateCustomListIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CreateCustomListIntent';
    },
    async handle(handlerInput) {
        const { permissions } = handlerInput.requestEnvelope.context.System.user
        
        // Check if permissions has been granted. If not request it.
        if (!permissions) {
          const permissions = [
              'write::alexa:household:list',
              'read::alexa:household:list'
          ];
          return handlerInput.responseBuilder
            .speak('Alexa List permissions are missing. You can grant permissions within the Alexa app.')
            .withAskForPermissionsConsentCard(permissions)
            .getResponse();
        }
        
        // Create an instance of the ListManagementServiceClient
        const listClient = handlerInput.serviceClientFactory.getListManagementServiceClient();
        
        // Get specified list name or default to current day an time
        const today = new Date()
        const listName = Alexa.getSlotValue(handlerInput.requestEnvelope, 'list_name') || today.toString();
        
        // Make use listClient to make an async HTTP request to create the list
        try {
            const response = await listClient.createList({
                "name": listName,
                "state": "active"
            }, "")
        } catch(error) {
            console.log(`~~~~ ERROR ${JSON.stringify(error)}`)
            return handlerInput.responseBuilder
                .speak("An error occured. Please try again later.")
                //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
                .getResponse();    
        }
        
        return handlerInput.responseBuilder
            .speak("List was successfully created.")
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const GetCustomListsIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetCustomListsIntent';
    },
    async handle(handlerInput) {
        // Check if permissions has been granted. If not request it.
        const { permissions } = handlerInput.requestEnvelope.context.System.user
        if (!permissions) {
          const permissions = [
              'write::alexa:household:list',
              'read::alexa:household:list'
          ];
          return handlerInput.responseBuilder
            .speak('Alexa List permissions are missing. You can grant permissions within the Alexa app.')
            .withAskForPermissionsConsentCard(permissions)
            .getResponse();
        }
        
        const listClient = handlerInput.serviceClientFactory.getListManagementServiceClient();
        
        try {
            // Use the listClient to retrieve lists for user's account
            const response = await listClient.getListsMetadata()
            
            // Remove the default lists to get only the custom lists
            const customLists = response.lists.splice(2)
            
            // Map to get only the list names from the object and join them separated by a comma
            const listStr = customLists.map((list) => list.name).join(',')
            
            // Speak out the custom lists on the user's account
            return handlerInput.responseBuilder
                .speak(`You have ${customLists.length} custom lists: ${listStr}`)
                .getResponse();
        } catch(error) {
            console.log(`~~~~ ERROR ${JSON.stringify(error)}`)
            return handlerInput.responseBuilder
                .speak("An error occured. Please try again later.")
                .getResponse();    
        }
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = `${createListSpeech} or ${getListsSpeech}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Thanks for checking out the custom list demo!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        CreateCustomListIntentHandler,
        GetCustomListsIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler, // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    )
    .withApiClient(new Alexa.DefaultApiClient()) // Add it to the response builder to get access the to ListManagementClient
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
