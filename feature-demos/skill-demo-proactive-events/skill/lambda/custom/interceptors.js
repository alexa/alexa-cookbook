/**
 * Created by mccaul on 5/11/18.
 */
const constants = require('./constants.js');
const helpers = require('./helpers.js');

const AWS = constants.AWS;
const DYNAMODB_TABLE = constants.DYNAMODB_TABLE;

module.exports = {

    'RequestPersistenceInterceptor': {
        process(handlerInput) {
            if(!handlerInput.requestEnvelope.session) {
                handlerInput.requestEnvelope['session'] = {"new": true};  // for Skill Events
            }

            if(handlerInput.requestEnvelope.session['new']) {

                return new Promise((resolve, reject) => {

                    handlerInput.attributesManager.getPersistentAttributes()

                        .then((sessionAttributes) => {
                            sessionAttributes = sessionAttributes || {};

                            // console.log(JSON.stringify(sessionAttributes, null, 2));

                            if(Object.keys(sessionAttributes).length === 0) {
                                // console.log('--- First Ever Visit for userId ' + handlerInput.requestEnvelope.session.user.userId);

                                const initialAttributes = constants.getMemoryAttributes();
                                // console.log(`constants.getMemoryAttributes()\n${JSON.stringify(initialAttributes)}`);
                                sessionAttributes = initialAttributes;

                            }

                            sessionAttributes['launchCount'] += 1;

                            handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

                            handlerInput.attributesManager.savePersistentAttributes()
                                .then(() => {
                                    resolve();
                                })
                                .catch((err) => {
                                    reject(err);
                                });

                        })
                        .catch((error) => {
                            console.log(`requires DynamoDB table`);
                            reject(error);
                        });

                });

            } // end session['new']


        }
    },

    'ResponsePersistenceInterceptor': {
        process(handlerInput, responseOutput) {

            const ses = (typeof responseOutput.shouldEndSession == "undefined" ? true : responseOutput.shouldEndSession);

            if(ses || handlerInput.requestEnvelope.request.type == 'SessionEndedRequest') { // skill was stopped or timed out

                let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

                sessionAttributes['lastUseTimestamp'] = new Date(handlerInput.requestEnvelope.request.timestamp).getTime();

                handlerInput.attributesManager.setPersistentAttributes(sessionAttributes);

                return new Promise((resolve, reject) => {
                    handlerInput.attributesManager.savePersistentAttributes()
                        .then(() => {
                            resolve();
                        })
                        .catch((err) => {
                            reject(err);
                        });

                });

            }

        }
    },

    'RequestHistoryInterceptor': {
        process(handlerInput) {

            const maxHistorySize = constants.getMaxHistorySize();  // number of intent/request events to store

            const thisRequest = handlerInput.requestEnvelope.request;
            let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

            let history = sessionAttributes['history'];

            let IntentRequest = {};
            if (thisRequest.type === 'IntentRequest') {

                let slots = {};

                IntentRequest = {
                    'IntentRequest': thisRequest.intent.name
                };

                if (thisRequest.intent.slots) {

                    for (let slot in thisRequest.intent.slots) {
                        slots[slot] = thisRequest.intent.slots[slot].value;
                    }

                    IntentRequest = {
                        'IntentRequest': thisRequest.intent.name,
                        'slots': slots
                    };

                }

            } else {
                IntentRequest = {'IntentRequest': thisRequest.type};
            }

            if (history.length >= maxHistorySize) {
                history.shift();
            }
            history.push(IntentRequest);

            handlerInput.attributesManager.setPersistentAttributes(sessionAttributes);

            // }

        }
    },

};

