/**
 * Created by mccaul on 5/11/18.
 */
const constants = require('./constants.js');
const helpers = require('./helpers.js');

const AWS = constants.AWS;
const DYNAMODB_TABLE = constants.DYNAMODB_TABLE;

module.exports = {

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

    'RequestPersistenceInterceptor': {
        process(handlerInput) {
            if(handlerInput.requestEnvelope.session['new']) {

                return new Promise((resolve, reject) => {

                    handlerInput.attributesManager.getPersistentAttributes()

                        .then((sessionAttributes) => {
                            sessionAttributes = sessionAttributes || {};

                            // console.log(JSON.stringify(sessionAttributes, null, 2));

                            if(Object.keys(sessionAttributes).length === 0) {
                                // console.log('--- First Ever Visit for userId ' + handlerInput.requestEnvelope.session.user.userId);

                                const initialAttributes = constants.getMemoryAttributes();
                                sessionAttributes = initialAttributes;

                            }

                            sessionAttributes['launchCount'] += 1;
                            // sessionAttributes['tempPassPhrase'] = generatePassPhrase().word1 + '-' + generatePassPhrase().word2 + '-' + generatePassPhrase().number;

                            handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

                            handlerInput.attributesManager.savePersistentAttributes()
                                .then(() => {
                                    resolve();
                                })
                                .catch((err) => {
                                    reject(err);
                                });

                        });

                });

            } // end session['new']


        }
    },

    'RequestJoinRankInterceptor': {
        process(handlerInput) {
            if(handlerInput.requestEnvelope.session['new']) {

                return new Promise((resolve) => {
                    helpers.getRecordCount(skillUserCount => {

                        let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

                        if(sessionAttributes['launchCount'] === 1) {
                            sessionAttributes['joinRank'] = skillUserCount;
                        }
                        sessionAttributes['skillUserCount'] = skillUserCount;
                        resolve();

                    });
                });

            }

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
    'SpeechOutputInterceptor': {
        process(handlerInput, responseOutput) {

            let sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

            let speakingSpeed = sessionAttributes['speakingSpeed'] || 'medium';
            if (responseOutput.outputSpeech && responseOutput.outputSpeech.ssml) {
                // dialog delegate prompt
                let speechOutput = responseOutput.outputSpeech.ssml;

                speechOutput = speechOutput.replace('<speak>', '').replace('</speak>', '');

                speechOutput = '' + speechOutput + '';

                let rate = 'medium';
                if (speakingSpeed && speakingSpeed !== 'medium') {

                    speechOutput = "<speak><prosody rate='" + speakingSpeed + "'>" + speechOutput + "</prosody></speak>";
                    // console.log(speechOutput);
                    responseOutput.outputSpeech.ssml = speechOutput;

                } else {
                    speechOutput = "<speak>" + speechOutput + "</speak>";

                }
            } // else no outputSpeech.ssml; dialog delegate output

        }
    }

};


