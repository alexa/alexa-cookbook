/**
 * Copyright 2020 Amazon.com, Inc. and its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: LicenseRef-.amazon.com.-AmznSL-1.0
 *
 * Licensed under the Amazon Software License (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://aws.amazon.com/asl/
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 **/
'use strict';

const Alexa = require('ask-sdk');
const i18next = require('i18next');
const sprintf = require('sprintf-js').sprintf;
const _ = require('lodash');

const resources = require('./resources')
const util = require('./util');

const REMOVE_PIZZA_BAD_REQUEST_TYPES = {
    NO_ORDER_IN_PROGRESS: 'NO_ORDER_IN_PROGRESS',
    TOO_FEW_PIZZAS_FOR_ORDINAL: 'TOO_FEW_PIZZAS_FOR_ORDINAL'
};

// For GetSpecialtyPizzaDetailsApi and summing costs for GetInProgressOrderApi, we have these data maps. It would be
// neat to use keys and values of slot value "id"s so we could reuse them for all languages, but for now they are keyed
// by resolved slot value "id" or "value", to reduce misses from "nearly" expected slot utterances.

const SPECIALTY_PIZZAS_BY_ID = {
    'meatLovers': {
        'size': 'large',
        'cheese': 'light',
        'crust': 'traditional',
        'toppings': [
            'sausage',
            'pepperoni',
            'ham',
            'bacon'
        ],
        'cost': 9.99
    },
    'veggieSupreme': {
        'size': 'medium',
        'cheese': 'normal',
        'crust': 'thin',
        'toppings': [
            'spinach',
            'olives',
            'mushrooms',
            'onions',
            'artichoke hearts'
        ],
        'cost': 8.99
    },
    'kitchenSink': {
        'size': 'extra large',
        'cheese': 'extra',
        'crust': 'deep dish',
        'toppings': [
            'ham',
            'bacon',
            'pepperoni',
            'sausage',
            'onions',
            'black olives',
            'green peppers',
            'jalapenos',
            'feta cheese'
        ],
        'cost': 9.99
    }
};

const PIZZA_COSTS_BY_SIZE_ID = {
    'S': 5.99,
    'M': 7.99,
    'L': 10.99,
    'XL': 13.99
};

// *****************************************************************************
// Launch request handler
// *****************************************************************************
const LaunchHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    async handle(handlerInput) {
        // Our skill is configured to start sessions with the skill's intent handlers, so this is the first handler hit.
        return handlerInput.responseBuilder
            .speak(handlerInput.t('WELCOME'))
            .reprompt(handlerInput.t('NO_NAME_PROMPT'))
            .getResponse();
    }
};

// *****************************************************************************
// Intent handlers
// *****************************************************************************
// This skill uses the two modes, skill and Conversations, to easily implement a locking loop, where we can require the
// user to sign-in before continuing, without having to manage that state in any handlers in the Conversations mode that
// defines the bulk of the behavior.

const GiveNameIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GiveNameIntent';
    },
    handle(handlerInput) {
        // If they sign in with a name, we want to allow the user to continue in Conversations. Since Conversations will
        // require a name if we use its dialog flows for the ChangeUserApi, we can reuse it (and keep the saving of
        // "givenName" in one place) by delegating into those dialogs.

        if (_.get(handlerInput.requestEnvelope, 'request.dialogState') !== 'COMPLETED') {
            // We'll elicit for the slot by delegating to the dialog model. While the prompts are in our dialog model,
            // we aren't using "auto-delegation" to the dialog model here because it would also occur during
            // Conversations turns, before the intent is sent to Conversations, rather than to the skill.
            return handlerInput.responseBuilder
                .addDelegateDirective()
                .getResponse();
        }

        // If we have a name we'll let the user "free" into the dialogs by switching to Conversations mode. We can
        // keep "saving the user name" in one place by having our first Conversations dialog be the shortcut that will
        // allow a user to update their name in Conversations mode with the ChangeNameApi.
        return handlerInput.responseBuilder
            .addDirective({
                'type': 'Dialog.DelegateRequest',
                'target': 'AMAZON.Conversations',
                'period': {
                    'until': 'EXPLICIT_RETURN'
                },
                'updatedRequest': {
                    'type': 'Dialog.InputRequest',
                    'input': {
                        'name': 'InvokeChangeUserWithNameUtteranceSet',
                        'slots': {
                            'name': Alexa.getSlot(handlerInput.requestEnvelope, 'name')
                        }
                    }
                }
            })
            .getResponse();
    }
};

const RemoveNameIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RemoveNameIntent';
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        delete sessionAttributes.givenName;

        return handlerInput.responseBuilder
            .speak(handlerInput.t('REMOVED_NAME'))
            .reprompt(handlerInput.t('NO_NAME_PROMPT'))
            .getResponse();
    }
};

/**
 * FallbackIntent triggers when a customer says something that doesn't map to any intents in your skill, while
 * skill is the dialog manager controlling the session (we're not in Alexa Conversations). This handler will also catch
 * requests for the UtteranceTrainingIntent.
 *
 * The UtteranceTrainingIntent contains samples that are the union of Alexa Conversations utterance sets that aren't
 * already contained in the interaction model. This is because the interaction model is the source of truth for training
 * the speech recognition for the skill: if we didn't specify these other utterances, our skill would bias toward
 * recognizing all brief speech as first names, for instance: since AMAZON.FallbackIntent is lower confidence than an
 * "okay" match to a defined interaction model sample utterance, and our skill defines intents dealing with first names.
 * Ultimately, this should be done behind-the-scenes from the Conversations model, but for now, adding the utterances
 * both places ensures good speech recognition.
 *
 * Note: it's expected that this is the last intent handler in the handlers list, so it doesn't preempt more specific
 * intent handlers.
 **/
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        // We expect to handle utterances related to getting the user name: we can use the intent handlers as a loop to
        // get the user to give us one (approximating a "sign in/out" or other separate locking loop function): if we
        // get an utterance outside our skill-handled intents, we can check for a name in the session: if we don't have
        // one, we can prompt for one; if we have one, we can delegate the incoming utterance unchanged to the
        // Conversations handlers.
        const { givenName } = handlerInput.attributesManager.getSessionAttributes();

        if (!givenName) {
            const speechOutput = handlerInput.t('NO_NAME_PROMPT')
            return handlerInput.responseBuilder
                .speak(speechOutput)
                .reprompt(speechOutput)
                .getResponse();
        }

        // We have a givenName, so switch to the Conversations handlers and pass this utterance unchanged to
        // start off. (Since we delegate into Conversations mode as part of handling GiveNameIntent, and only switch
        // back to skill-intent mode when removing the name, this is not likely to see much, if any, traffic.)

        return handlerInput.responseBuilder
            .addDirective({
                'type': 'Dialog.DelegateRequest',
                'target': 'AMAZON.Conversations',
                'period': {
                    'until': 'EXPLICIT_RETURN'
                }
            })
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        // Since this should only be hit while the skill is in the "intent handlers" mode - that is, the user is not
        // 'signed in' - we use a sign-in-related prompt in response to "help" when this intent is hit.
        return handlerInput.responseBuilder
            .speak(handlerInput.t('HELP_INTENT'))
            .reprompt(handlerInput.t('NO_NAME_PROMPT'))
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
        const speakOutput = handlerInput.t('EXIT');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(true)
            .getResponse();
    }
};

// *****************************************************************************
// Conversations API handlers
// *****************************************************************************

const AddCustomPizzaApiHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Dialog.API.Invoked'
            && handlerInput.requestEnvelope.request.apiRequest.name === 'AddCustomPizzaApi';
    },
    handle(handlerInput) {
        const apiArguments = _.get(handlerInput, 'requestEnvelope.request.apiRequest.arguments');

        const sizeSlot = _.get(handlerInput, 'requestEnvelope.request.apiRequest.slots.size');
        const resolvedSizeId = util.getSlotResolvedId(sizeSlot);

        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        _.defaultsDeep(sessionAttributes, { inProgress: { pizzas: [] } });

        const pizza = apiArguments;
        pizza.cost = PIZZA_COSTS_BY_SIZE_ID[resolvedSizeId];
        sessionAttributes.inProgress.pizzas.push(pizza);

        // The Conversations API response contains an AMAZON.Ordinal (stringified number). APLA does not consume an
        // associated datatype for the string field value, so it is spoken as its numerical value during the audio
        // response. We mention it in the response to ensure it will be carried-over to an anaphoric "remove" utterance,
        // as specified in the AddThenRemovePizza sample dialog.
        return {
            apiResponse: {
                pizza: pizza,
                ordinal: `${sessionAttributes.inProgress.pizzas.length}`
            }
        };
    }
};

const GetSpecialtyPizzaDetailsApiHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Dialog.API.Invoked'
            && handlerInput.requestEnvelope.request.apiRequest.name === 'GetSpecialtyPizzaDetailsApi';
    },
    handle(handlerInput) {
        const specialtyPizzaNameSlot = _.get(handlerInput,
            'requestEnvelope.request.apiRequest.slots.specialtyPizzaName');
        const specialtyPizzaNameId = util.getSlotResolvedId(specialtyPizzaNameSlot);

        if (specialtyPizzaNameId && SPECIALTY_PIZZAS_BY_ID[specialtyPizzaNameId]) {
            const pizza = SPECIALTY_PIZZAS_BY_ID[specialtyPizzaNameId];
            pizza.nullableSpecialtyPizzaName = util.getSlotResolvedValue(specialtyPizzaNameSlot);
            return {
                apiResponse: pizza
            };
        }

        // Give an empty response to cue the mapped response template we didn't find one.
        return {
            apiResponse: {}
        };
    }
};

const AddSpecialtyPizzaApiHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Dialog.API.Invoked'
            && handlerInput.requestEnvelope.request.apiRequest.name === 'AddSpecialtyPizzaApi';
    },
    handle(handlerInput) {
        const specialtyPizzaNameSlot = _.get(handlerInput,
            'requestEnvelope.request.apiRequest.slots.specialtyPizzaName');
        const specialtyPizzaNameId = util.getSlotResolvedId(specialtyPizzaNameSlot);

        if (!specialtyPizzaNameId || !SPECIALTY_PIZZAS_BY_ID[specialtyPizzaNameId]) {
            return {
                apiResponse: {}
            }
        }

        const pizza = SPECIALTY_PIZZAS_BY_ID[specialtyPizzaNameId];
        pizza.nullableSpecialtyPizzaName = util.getSlotResolvedValue(specialtyPizzaNameSlot);

        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        _.defaultsDeep(sessionAttributes, { inProgress: { pizzas: [] }});
        sessionAttributes.inProgress.pizzas.push(pizza);

        const latestOrdinalString = `${sessionAttributes.inProgress.pizzas.length}`;
        return {
            apiResponse: latestOrdinalString
        };
    }
};

const GetInProgressOrderApiHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Dialog.API.Invoked'
            && handlerInput.requestEnvelope.request.apiRequest.name === 'GetInProgressOrderApi';
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        const nullablePizzas = _.get(sessionAttributes, 'inProgress.pizzas');

        return {
            apiResponse: {
                pizzas: nullablePizzas
            }
        };
    }
}

const RemovePizzaApiHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Dialog.API.Invoked'
            && handlerInput.requestEnvelope.request.apiRequest.name === 'RemovePizzaApi';
    },
    handle(handlerInput) {
        const apiArguments = _.get(handlerInput, 'requestEnvelope.request.apiRequest.arguments');

        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        const nullablePizzas = _.get(sessionAttributes, 'inProgress.pizzas');
        if (!nullablePizzas) {
            // There's no order in progress: cue AC to a spoken error response per our saved APLA.
            return {
                apiResponse: {
                    badRequestType: REMOVE_PIZZA_BAD_REQUEST_TYPES.NO_ORDER_IN_PROGRESS
                }
            };
        }

        if (apiArguments.ordinal < 0 || apiArguments.ordinal > nullablePizzas.length) {
            // There's fewer pizzas in the array than the given ordinal: cue AC to a spoken error response.
            return {
                apiResponse: {
                    badRequestType: REMOVE_PIZZA_BAD_REQUEST_TYPES.TOO_FEW_PIZZAS_FOR_ORDINAL
                }
            };
        }

        const arrayIndex = Number.parseInt(apiArguments.ordinal) - 1;
        const removedPizza = nullablePizzas[arrayIndex];
        sessionAttributes.inProgress.pizzas.splice(arrayIndex, 1);

        return {
            apiResponse: {
                removedPizza: removedPizza
            }
        };
    }
};

const PlaceOrderApiHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Dialog.API.Invoked'
            && handlerInput.requestEnvelope.request.apiRequest.name === 'PlaceOrderApi';
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

        const inProgressOrder = _.get(sessionAttributes, 'inProgress');
        if (!inProgressOrder) {
            // Return empty Order to cue error response.
            return {
                apiResponse: {}
            }
        }

        _.defaults(sessionAttributes, { placedOrders: [] });
        sessionAttributes.placedOrders.push(inProgressOrder);
        inProgressOrder.cost = getTotalCost(inProgressOrder);
        delete sessionAttributes.inProgress;

        return {
            apiResponse: inProgressOrder
        };
    }
};

const ChangeNameApiHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Dialog.API.Invoked'
            && handlerInput.requestEnvelope.request.apiRequest.name === 'ChangeNameApi';
    },
    handle(handlerInput) {
        // The name slot currently loses its resolved capitalization after being delegated with correct capitalization.
        // We can fix it for neatness. Since the resolved slot value doesn't add any data, we can just use the basic
        // string version from the arguments.

        const apiArguments = _.get(handlerInput, 'requestEnvelope.request.apiRequest.arguments');
        const name = apiArguments.name;
        const initialCapitalName = name.charAt(0).toUpperCase() + name.slice(1);

        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        sessionAttributes.givenName = initialCapitalName;

        return {
            apiResponse: {
                name: initialCapitalName
            }
        };
    }
};

const DelegateToRemoveNameIntentApiHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Dialog.API.Invoked'
            && handlerInput.requestEnvelope.request.apiRequest.name === 'DelegateToRemoveNameIntentApi';
    },
    handle(handlerInput) {
        // If we remove the name out, we want to be back in the loop to ensure we get a new name from the user, so we
        // delegate back to the intent handlers. We can actually remove the name recorded in the session attributes here
        // or in the target intent handler. For simplicity/reuse, we'll rely on the intent handler's existing logic.
        return handlerInput.responseBuilder
            .addDirective({
                'type': 'Dialog.DelegateRequest',
                'target': 'skill',
                'period': {
                    'until': 'EXPLICIT_RETURN'
                },
                'updatedRequest': {
                    'type': 'IntentRequest',
                    'intent': {
                        'name': 'RemoveNameIntent'
                    }
                }
            })
            .getResponse();
    }
};

// *****************************************************************************
// Session ended request handler
// *****************************************************************************

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Add any custom end-of-session clean-up here.
        console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
        return handlerInput.responseBuilder.getResponse();
    },
};

// *****************************************************************************
// Error handler
// *****************************************************************************

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.error(`Error handled: ${error.message}`);
        console.error(`Error stack`, JSON.stringify(error.stack));
        console.error(`Error`, JSON.stringify(error));

        return handlerInput.responseBuilder
            .speak(handlerInput.t('ERROR'))
            .reprompt(handlerInput.t('GENERIC_REPROMPT'))
            .getResponse();
    },
};

// *****************************************************************************
// Interceptors
// *****************************************************************************

const LogRequestInterceptor = {
    process(handlerInput) {
        console.log(`REQUEST ENVELOPE = ${JSON.stringify(handlerInput.requestEnvelope)}`);
    },
};

const LogResponseInterceptor = {
    process(handlerInput, response) {
        console.log(`RESPONSE = ${JSON.stringify(response)}`);
    },
};

const LocalizationInterceptor = {
    process(handlerInput) {
        i18next
            .init({
                lng: _.get(handlerInput, 'requestEnvelope.request.locale'),
                overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
                resources: resources,
                returnObjects: true
            });

        handlerInput.t = (key, opts) => {
            const value = i18next.t(key, {...{interpolation: {escapeValue: false}}, ...opts});
            if (Array.isArray(value)) {
                return value[Math.floor(Math.random() * value.length)]; // return a random element from the array
            } else {
                return value;
            }
        };
    }
};

const getTotalCost = (order) => {
    let orderCost = 0;
    if (order.pizzas) {
        orderCost += order.pizzas.map(pizza => pizza.cost)
            .reduce((total, pizzaCost) => total + pizzaCost, 0);
    }
    return orderCost;
};

// *****************************************************************************
// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters in lists: they're processed top to bottom.
module.exports.handler = Alexa.SkillBuilders.standard()
    .addRequestHandlers(
        LaunchHandler,
        GiveNameIntentHandler,
        RemoveNameIntentHandler,
        CancelAndStopIntentHandler,
        HelpIntentHandler,
        FallbackIntentHandler,

        AddCustomPizzaApiHandler,
        GetSpecialtyPizzaDetailsApiHandler,
        AddSpecialtyPizzaApiHandler,
        GetInProgressOrderApiHandler,
        RemovePizzaApiHandler,
        PlaceOrderApiHandler,
        ChangeNameApiHandler,
        DelegateToRemoveNameIntentApiHandler,

        SessionEndedRequestHandler)
    .addErrorHandlers(ErrorHandler)
    .addRequestInterceptors(LogRequestInterceptor, LocalizationInterceptor)
    .addResponseInterceptors(LogResponseInterceptor)
    .withCustomUserAgent('reference-skills/pizza-reference/v1.1')
    .lambda();
