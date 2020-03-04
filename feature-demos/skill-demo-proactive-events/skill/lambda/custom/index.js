/* eslint-disable  func-names */
/* eslint-disable  no-console */

// Ping Me skill sample to accompany alexa-cookbook sample on Proactive Events API

const Alexa = require('ask-sdk');

const helpers = require('./helpers.js');
const interceptors = require('./interceptors.js');
const constants = require('./constants.js');
const DYNAMODB_TABLE = constants.DYNAMODB_TABLE;


const NextGameHandler = {
  canHandle(handlerInput) {
    return (handlerInput.requestEnvelope.request.type === 'LaunchRequest'
            || (handlerInput.requestEnvelope.request.type === 'IntentRequest'
                && handlerInput.requestEnvelope.request.intent.name === 'NextGameIntent')
    );
  },
  handle(handlerInput) {
    const nextEvent = helpers.getNextEvent('schedule.txt');

    const nextEventDate = new Date(nextEvent.mediaEventTime);
    // Determine user's device time (time zone) not covered; see  https://developer.amazon.com/blogs/alexa/post/c2ba44fa-4bd8-4b49-925d-29dbc0330b1e/personalize-your-alexa-skill-with-customer-specific-time-zones-and-measurements-using-the-alexa-settings-api

    let speechText = `The next game is ${nextEvent.mediaEventName} at ${nextEventDate.toDateString().slice(0, -5)} on ${nextEvent.mediaEventProvider}. `;
    speechText += `I can notify you the day before if you visit the Alexa App and enable notifications.`;

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withAskForPermissionsConsentCard(['alexa::devices:all:notifications:write'])
      .getResponse();
  },
};

const HelloWorldIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';
  },
  handle(handlerInput) {
    const speechText = 'Hello World!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can say hello to me!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
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

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {

        const debug = true;
        const stack = error.stack.split('\n');
        let speechOutput = 'Sorry, an error occurred. ';

        console.log(stack[0].slice(0, 33));
        console.log(stack[1]);
        console.log(stack[2]);
        if(stack[0].slice(0, 33) === `AskSdk.DynamoDbPersistenceAdapter`) {
            speechOutput = 'DyanamoDB error.  Be sure your table and IAM execution role are setup. ';
        }

        let errorLoc = stack[1].substring(stack[1].lastIndexOf('/') + 1, 900);

        errorLoc = errorLoc.slice(0, -1);

        const file = errorLoc.substring(0, errorLoc.indexOf(':'));
        let line = errorLoc.substring(errorLoc.indexOf(':') + 1, 900);
        line = line.substring(0, line.indexOf(':'));


        if(debug) {
            speechOutput +=  error.message + ' in ' + file + ', line ' + line;
        }

        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(speechOutput)
            .withShouldEndSession(true)
            .getResponse();
    },
};


const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    NextGameHandler,
    HelloWorldIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )

  .addErrorHandlers(ErrorHandler)
  .addRequestInterceptors(interceptors.RequestPersistenceInterceptor)
  .addRequestInterceptors(interceptors.RequestHistoryInterceptor)
  .addResponseInterceptors(interceptors.ResponsePersistenceInterceptor)

  .withTableName(DYNAMODB_TABLE)
//  .withAutoCreateTable(true)  // created by SAM deploy

  .lambda();
