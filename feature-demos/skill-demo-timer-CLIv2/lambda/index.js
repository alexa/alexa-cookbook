// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: LicenseRef-.amazon.com.-AmznSL-1.0
// Licensed under the Amazon Software License  http://aws.amazon.com/asl/

const Alexa = require('ask-sdk-core');
const i18n = require('i18next');
const languageStrings = require('./localisation');

const TIMERS_PERMISSION = 'alexa::alerts:timers:skill:readwrite';
// change to test different types of timers
const TIMER_FUNCTION = getAnnouncementTimer;
//const TIMER_FUNCTION = getPredefinedTaskLaunchTimer;
//const TIMER_FUNCTION = getCustomTaskLaunchTimer;

function getAnnouncementTimer(handlerInput, duration) {
    return {
        duration: duration,
        label: handlerInput.t('ANNOUNCEMENT_TIMER_TITLE_MSG'),
        creationBehavior: {
            displayExperience: {
                visibility: 'VISIBLE'
            }
        },
        triggeringBehavior: {
            operation: {
                type : 'ANNOUNCE',
                textToAnnounce: [{
                    locale: handlerInput.t('ANNOUNCEMENT_LOCALE_MSG'),
                    text: handlerInput.t('ANNOUNCEMENT_TEXT_MSG')
                }]
            },
            notificationConfig: {
                playAudible: true
            }
        }
    };
}

function getCustomTaskLaunchTimer(handlerInput, duration) {
    return {
        duration: duration,
        label: handlerInput.t('TASK_TIMER_TITLE_MSG'),
        creationBehavior: {
            displayExperience: {
                visibility: 'VISIBLE'
            }
        },
        triggeringBehavior: {
            operation: {
                type : 'LAUNCH_TASK',
                textToConfirm: [{
                    locale: handlerInput.t('TASK_LOCALE_MSG'),
                    text: handlerInput.t('TASK_TEXT_MSG')
                }],
                task : {
                    name : '<SKILL_ID>.<TASK_NAME>',
                    version : '<TASK_VERSION>',
                    input : {
                        //<TASK_INPUT_PARAMETERS>
                    }
                }
            },
            notificationConfig: {
                playAudible: true
            }
        }
    };
}

function getPredefinedTaskLaunchTimer(handlerInput, duration) {
    return {
        duration: duration,
        label: handlerInput.t('TASK_TIMER_TITLE_MSG'),
        creationBehavior: {
            displayExperience: {
                visibility: 'VISIBLE'
            }
        },
        triggeringBehavior: {
            operation: {
                type : 'LAUNCH_TASK',
                textToConfirm: [{
                    locale: handlerInput.t('TASK_LOCALE_MSG'),
                    text: handlerInput.t('TASK_TEXT_MSG')
                }],
                task : {
                    name : 'AMAZON.ScheduleTaxiReservation',
                    version : '1',
                    input : {
                        '@type': 'ScheduleTaxiReservationRequest',
                        '@version': '1',
                        'partySize': 4,
                        'pickupLocation': {
                            '@type': 'PostalAddress',
                            '@version': '1',
                            'streetAddress': '415 106th Ave NE',
                            'locality': 'Bellevue',
                            'region': 'WA',
                            'postalCode': '98004',
                            'country': 'US'
                        },
                        'pickupTime': null,
                        'dropoffLocation': {
                            '@type': 'PostalAddress',
                            '@version': '1',
                            'streetAddress': '2031 6th Ave.',
                            'locality': 'Seattle',
                            'region': 'WA',
                            'postalCode': '98121',
                            'country': 'US'
                        }
                    }
                }
            },
            notificationConfig: {
                playAudible: true
            }
        }
    };
}

function verifyConsentToken(handlerInput){
    let {requestEnvelope} = handlerInput;
    const {permissions} = requestEnvelope.context.System.user;
    if (!(permissions && permissions.consentToken)){
        console.log('No permissions found!');
        // we send a request to enable by voice
        // note that you'll need another handler to process the result, see AskForResponseHandler
        return handlerInput.responseBuilder
            .addDirective({
            type: 'Connections.SendRequest',
            'name': 'AskFor',
            'payload': {
                '@type': 'AskForPermissionsConsentRequest',
                '@version': '1',
                'permissionScope': TIMERS_PERMISSION
            },
            token: 'verifier'
        }).getResponse();
    }
    console.log('Permissions found: ' + permissions.consentToken);
    return null;
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        let response = verifyConsentToken(handlerInput);
        if(response)
            return response;
        const speechOutput = handlerInput.t('WELCOME_MSG');
        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(speechOutput)
            .getResponse();
    }
};

const ReadTimerIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'ReadTimerIntent';
    },
    async handle(handlerInput) {
        const {requestEnvelope, attributesManager, serviceClientFactory} = handlerInput;
        const sessionAttributes = attributesManager.getSessionAttributes();
        let timerId = sessionAttributes['lastTimerId'];

        try {
            const timerServiceClient = serviceClientFactory.getTimerManagementServiceClient();
            const timersList = await timerServiceClient.getTimers();
            console.log('Read timers: ' + JSON.stringify(timersList));
            const totalCount = timersList.totalCount;
            const preText = totalCount ? handlerInput.t('TIMER_COUNT_MSG', {count: totalCount}) : '';
            if(timerId || totalCount > 0) {
                timerId = timerId ? timerId : timersList.timers[0].id; 
                timerResponse = await timerServiceClient.getTimer(timerId);       
                console.log('Read timer: ' + JSON.stringify(timerResponse));
                const timerStatus = timerResponse.status;
                return handlerInput.responseBuilder
                    .speak(preText + handlerInput.t('LAST_TIMER_MSG', {status: handlerInput.t(timerStatus + '_TIMER_STATUS_MSG')}) + handlerInput.t('REPROMPT_MSG'))
                    .reprompt(handlerInput.t('REPROMPT_MSG'))
                    .getResponse();
            } else {
                return handlerInput.responseBuilder
                    .speak(preText + handlerInput.t('NO_TIMER_MSG') + handlerInput.t('REPROMPT_MSG'))
                    .reprompt(handlerInput.t('REPROMPT_MSG'))
                    .getResponse();
            }
        } catch (error) {
            console.log('Read timer error: ' + JSON.stringify(error));
            return handlerInput.responseBuilder
                        .speak(handlerInput.t('READ_TIMER_ERROR_MSG') + handlerInput.t('REPROMPT_MSG'))
                        .reprompt(handlerInput.t('REPROMPT_MSG'))
                        .getResponse();
        }
    }
}

const SetTimerIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'SetTimerIntent';
    },
    async handle(handlerInput) {
        const {requestEnvelope, attributesManager, serviceClientFactory} = handlerInput;
        verifyConsentToken(handlerInput);
        const duration = Alexa.getSlotValue(requestEnvelope, 'duration');

        const timer = TIMER_FUNCTION(handlerInput, duration);
        console.log('About to create timer: ' + JSON.stringify(timer));
        
        try {
            const timerServiceClient = serviceClientFactory.getTimerManagementServiceClient();
            const timersList = await timerServiceClient.getTimers();
            console.log('Current timers: ' + JSON.stringify(timersList));

            const timerResponse = await timerServiceClient.createTimer(timer);
            console.log('Timer creation response: ' + JSON.stringify(timerResponse));
            
            const timerId = timerResponse.id;
            const timerStatus = timerResponse.status;

            if(timerStatus === 'ON') {
                const sessionAttributes = attributesManager.getSessionAttributes();
                sessionAttributes['lastTimerId'] = timerId;
                return handlerInput.responseBuilder
                    .speak(handlerInput.t('CREATE_TIMER_OK_MSG') + handlerInput.t('REPROMPT_MSG'))
                    .reprompt(handlerInput.t('REPROMPT_MSG'))
                    .getResponse();
            } else
                throw { statusCode: 308, message: 'Timer did not start' };
                
        } catch (error) {
            console.log('Create timer error: ' + JSON.stringify(error));
            return handlerInput.responseBuilder
                    .speak(handlerInput.t('CREATE_TIMER_ERROR_MSG') + handlerInput.t('REPROMPT_MSG'))
                    .reprompt(handlerInput.t('REPROMPT_MSG'))
                    .getResponse();
        }
    }
};

const DeleteTimerIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'DeleteTimerIntent';
    },
    async handle(handlerInput) {
        const {attributesManager, serviceClientFactory} = handlerInput;
        const sessionAttributes = attributesManager.getSessionAttributes();
        const timerId = sessionAttributes['lastTimerId'];

        try {
            const timerServiceClient = serviceClientFactory.getTimerManagementServiceClient();
            const timersList = await timerServiceClient.getTimers();
            console.log('Read timers: ' + JSON.stringify(timersList));
            const totalCount = timersList.totalCount;
            if(totalCount === 0) {
                return handlerInput.responseBuilder
                    .speak(preText + handlerInput.t('NO_TIMER_MSG') + handlerInput.t('REPROMPT_MSG'))
                    .reprompt(handlerInput.t('REPROMPT_MSG'))
                    .getResponse();
            }
            if(timerId) {
                await timerServiceClient.deleteTimer(timerId);
            } else {
                // warning, since there's no timer id we *cancel all 3P timers by the user*
                await timerServiceClient.deleteTimers();
            }
            console.log('Timer deleted!');
            return handlerInput.responseBuilder
                .speak(handlerInput.t('DELETE_TIMER_OK_MSG') + handlerInput.t('REPROMPT_MSG'))
                .reprompt(handlerInput.t('REPROMPT_MSG'))
                .getResponse();
        } catch (error) {
            console.log('Delete timer error: ' + JSON.stringify(error));
            return handlerInput.responseBuilder
                .speak(handlerInput.t('DELETE_TIMER_ERROR_MSG') + handlerInput.t('REPROMPT_MSG'))
                .reprompt(handlerInput.t('REPROMPT_MSG'))
                .getResponse();
        }
    }
}

const PauseTimerIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PauseIntent';
    },
    async handle(handlerInput) {
        const {serviceClientFactory} = handlerInput;
        
        try {
            const timerServiceClient = serviceClientFactory.getTimerManagementServiceClient();
            const timersList = await timerServiceClient.getTimers();
            console.log('Read timers: ' + JSON.stringify(timersList));
            const totalCount = timersList.totalCount;

            if(totalCount === 0) {
                return handlerInput.responseBuilder
                    .speak(preText + handlerInput.t('NO_TIMER_MSG') + handlerInput.t('REPROMPT_MSG'))
                    .reprompt(handlerInput.t('REPROMPT_MSG'))
                    .getResponse();
            }
            // pauses all timers
            timersList.timers.forEach(async (timer) => {
                if(timer.status === 'ON'){
                    await timerServiceClient.pauseTimer(timer.id);
                }
            });
            return handlerInput.responseBuilder
                .speak(handlerInput.t('PAUSE_TIMER_OK_MSG') + handlerInput.t('REPROMPT_MSG'))
                .reprompt(handlerInput.t('REPROMPT_MSG'))
                .getResponse();
        } catch (error) {
            console.log('Pause timer error: ' + JSON.stringify(error));
            return handlerInput.responseBuilder
                .speak(handlerInput.t('PAUSE_TIMER_ERROR_MSG') + handlerInput.t('REPROMPT_MSG'))
                .reprompt(handlerInput.t('REPROMPT_MSG'))
                .getResponse();
        }
    }
}

const ResumeTimerIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.ResumeIntent';
    },
    async handle(handlerInput) {
        const {serviceClientFactory} = handlerInput;
        
        try {
            const timerServiceClient = serviceClientFactory.getTimerManagementServiceClient();
            const timersList = await timerServiceClient.getTimers();
            console.log('Read timers: ' + JSON.stringify(timersList));
            const totalCount = timersList.totalCount;

            if(totalCount === 0) {
                return handlerInput.responseBuilder
                    .speak(preText + handlerInput.t('NO_TIMER_MSG') + handlerInput.t('REPROMPT_MSG'))
                    .reprompt(handlerInput.t('REPROMPT_MSG'))
                    .getResponse();
            }
            // pauses all timers
            timersList.timers.forEach(async (timer) => {
                if(timer.status === 'PAUSED'){
                    await timerServiceClient.resumeTimer(timer.id);
                }
            });
            return handlerInput.responseBuilder
                .speak(handlerInput.t('RESUME_TIMER_OK_MSG') + handlerInput.t('REPROMPT_MSG'))
                .reprompt(handlerInput.t('REPROMPT_MSG'))
                .getResponse();
        } catch (error) {
            console.log('Resume timer error: ' + JSON.stringify(error));
            return handlerInput.responseBuilder
                .speak(handlerInput.t('RESUME_TIMER_ERROR_MSG') + handlerInput.t('REPROMPT_MSG'))
                .reprompt(handlerInput.t('REPROMPT_MSG'))
                .getResponse();
        }
    }
}

const AskForResponseHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Connections.Response'
            && handlerInput.requestEnvelope.request.name === 'AskFor';
    },
    async handle(handlerInput) {
        console.log('Handler: AskForResponseHandler');
        const {request} = handlerInput.requestEnvelope;
        const {payload, status} = request;
        console.log('Connections reponse status + payload: ' + status + ' - ' + JSON.stringify(payload));

        if (status.code === '200') {
            if (payload.status === 'ACCEPTED') {
                // Request was accepted
                handlerInput.responseBuilder
                    .speak(handlerInput.t('VOICE_PERMISSION_ACCEPTED') + handlerInput.t('REPROMPT_MSG'))
                    .reprompt(handlerInput.t('REPROMPT_MSG'));
            } else if (payload.status === 'DENIED') {
                // Request was denied
                handlerInput.responseBuilder
                    .speak(handlerInput.t('VOICE_PERMISSION_DENIED') + handlerInput.t('GOODBYE_MSG'));
            } else if (payload.status === 'NOT_ANSWERED') {
                // Request was not answered
                handlerInput.responseBuilder
                    .speak(handlerInput.t('VOICE_PERMISSION_DENIED') + handlerInput.t('GOODBYE_MSG'));
            }
            if(payload.status !== 'ACCEPTED' && !payload.isCardThrown){
                handlerInput.responseBuilder
                        .speak(handlerInput.t('PERMISSIONS_CARD_MSG'))
                        .withAskForPermissionsConsentCard([TIMERS_PERMISSION]);
            }
            return handlerInput.responseBuilder.getResponse();
        }

        if (status.code === '400') {
            console.log('You forgot to specify the permission in the skill manifest!')
        }

        // Something failed.
        console.log(`Connections.Response indicated failure. error: ${request.status.message}`);

        return handlerInput.responseBuilder
            .speak(handlerInput.t('VOICE_PERMISSION_ERROR') + handlerInput.t('GOODBYE_MSG'))
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechOutput = handlerInput.t('HELP_MSG');

        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(speechOutput)
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
        const speechOutput = handlerInput.t('GOODBYE_MSG');
        return handlerInput.responseBuilder
            .speak(speechOutput)
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

const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = handlerInput.t('REFLECTOR_MSG', {intent: intentName});

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
        const speechOutput = handlerInput.t('ERROR_MSG');

        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(speechOutput)
            .getResponse();
    }
};

// This request interceptor will log all incoming requests to this lambda
const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope)}`);
    }
};

// This request interceptor will bind a translation function 't' to the handlerInput
// Additionally it will handle picking a random value if instead of a string it receives an array
const LocalisationRequestInterceptor = {
    process(handlerInput) {
        const localisationClient = i18n.init({
            lng: Alexa.getLocale(handlerInput.requestEnvelope),
            resources: languageStrings,
            returnObjects: true
        });
        localisationClient.localise = function localise() {
            const args = arguments;
            const value = i18n.t(...args);
            if (Array.isArray(value)) {
                return value[Math.floor(Math.random() * value.length)];
            }
            return value;
        };
        handlerInput.t = function translate(...args) {
            return localisationClient.localise(...args);
        }
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        AskForResponseHandler,
        SetTimerIntentHandler,
        ReadTimerIntentHandler,
        DeleteTimerIntentHandler,
        PauseTimerIntentHandler,
        ResumeTimerIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler
    )
    .addErrorHandlers(
        ErrorHandler
    )
    .addRequestInterceptors(
        LocalisationRequestInterceptor,
        LoggingRequestInterceptor
    )
    .withApiClient(new Alexa.DefaultApiClient())
    .withCustomUserAgent('sample/skill-demo-timers')
    .lambda();
