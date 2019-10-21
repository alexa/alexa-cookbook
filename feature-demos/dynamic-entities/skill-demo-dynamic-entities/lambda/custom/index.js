// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
// i18n dependency
const i18n = require('i18next');
// We import a language strings object containing all of our strings.
// The keys for each string will then be referenced in our code
// e.g. handlerInput.t('WELCOME_MSG')
const languageStrings = require('./localisation');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('WELCOME_MSG') + handlerInput.t('HELP_MSG');
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(handlerInput.t('HELP_MSG'))
            .getResponse();
    }
};

const CreateEntitiesIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'CreateEntitiesIntent';
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const {intent} = handlerInput.requestEnvelope.request;
        
        let speakOutput = handlerInput.t('RETRY_MSG');
        
        if(intent.slots.dynamicEntity.confirmationStatus !== 'CONFIRMED') {
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt(speakOutput)
                .getResponse();
        }
        
        if(!sessionAttributes['entities'])
            sessionAttributes['entities'] = [];
        
        const dynamicEntity = intent.slots.dynamicEntity.value;
        sessionAttributes['entities'].push(dynamicEntity);
        addDynamicEntities(handlerInput.responseBuilder, 'MyEntities', sessionAttributes['entities']);
        
        speakOutput = handlerInput.t('ADDED_MSG') + handlerInput.t('HELP2_MSG');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(handlerInput.t('HELP2_MSG'))
            .getResponse();
    }
};

const CheckEntitiesIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'CheckEntitiesIntent';
    },
    handle(handlerInput) {
        const {intent} = handlerInput.requestEnvelope.request;
        
        const entity = intent.slots.entity.value;
        const slotValues = getStaticAndDynamicSlotValuesFromSlot(intent.slots.entity);
        
        let speakOutput ;
        
        if (slotValues.static.statusCode === 'ER_SUCCESS_MATCH') {
            speakOutput = entity + handlerInput.t('IS_STATIC_MSG');
        } else
        if (slotValues.dynamic.statusCode === 'ER_SUCCESS_MATCH') {
            speakOutput = entity + handlerInput.t('IS_DYNAMIC_MSG');
        } else {
            speakOutput = entity + handlerInput.t('NOT_MATCHED_MSG');
        }
        
        
        return handlerInput.responseBuilder
            .speak(speakOutput + handlerInput.t('HELP2_MSG'))
            .reprompt(handlerInput.t('HELP2_MSG'))
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('HELP_MSG');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('FALLBACK_MSG');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
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
        const speakOutput = handlerInput.t('EXIT_MSG');
        
        // It's a good practice to clear all dynamic entities at the end of a session
        const clearEntitiesDirective = {
          type: 'Dialog.UpdateDynamicEntities',
          updateBehavior: 'CLEAR'
        };

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .addDirective(clearEntitiesDirective)
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

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = handlerInput.requestEnvelope.request.intent.name;
        const speakOutput = handlerInput.t('REFLECT_MSG') + `${intentName}`;

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
        console.log(`~~~~ Error handled: ${error.message}`);
        const speakOutput = handlerInput.t('ERROR_MSG');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// Aux functions

function addDynamicEntities(responseBuilder, slotType, entities) {
    let updateEntitiesDirective = {
      type: 'Dialog.UpdateDynamicEntities',
      updateBehavior: 'REPLACE',
      types: [
        {
          name: slotType,
          values: [] // we fill this array with the entities below
        }
      ]
    };
    entities.map((entity) => updateEntitiesDirective.types[0].values.push(
        {
            id: entity.replace(/\s/gi, "_"),
            name: {
                value: entity
            }
        }
    ));
    console.log(JSON.stringify(updateEntitiesDirective));
    responseBuilder.addDirective(updateEntitiesDirective);
}

const getStaticAndDynamicSlotValues = function(slots) {
    const slotValues = {}
    for (let slot in slots) {
        slotValues[slot] = getStaticAndDynamicSlotValuesFromSlot(slots[slot]);
    }
    return slotValues;
}

const getStaticAndDynamicSlotValuesFromSlot = function(slot) {

    const result = {
        name: slot.name,
        value: slot.value
    };

    if (((slot.resolutions || {}).resolutionsPerAuthority || [])[0] || {}) {
        slot.resolutions.resolutionsPerAuthority.forEach((authority) => {
            const slotValue = {
                authority: authority.authority,
                statusCode: authority.status.code,
                synonym: slot.value || undefined,
                resolvedValues: slot.value
            };
            if (authority.values && authority.values.length > 0) {
                slotValue.resolvedValues = [];

                authority.values.forEach((value) => {
                    slotValue.resolvedValues.push(value);
                });

            }

            if (authority.authority.includes('amzn1.er-authority.echo-sdk.dynamic')) {
                result.dynamic = slotValue;
            } else {
                result.static = slotValue;
            }
        });
    }
    return result;
};

// This request interceptor will bind a translation function 't' to the handlerInput.
const LocalisationRequestInterceptor = {
    process(handlerInput) {
        i18n.init({
            lng: handlerInput.requestEnvelope.request.locale,
            resources: languageStrings
        }).then((t) => {
            handlerInput.t = (...args) => t(...args);
        });
    }
  };

// This handler acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        CreateEntitiesIntentHandler,
        CheckEntitiesIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler) // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(LocalisationRequestInterceptor)
    .withCustomUserAgent('cookbook/dynamic-entities/v1')
    .lambda();
