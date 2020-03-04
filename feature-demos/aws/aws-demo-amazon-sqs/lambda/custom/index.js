const Alexa = require('ask-sdk-core');
const CookbookSQS = require('./cookbook-sqs.js');
const util = require('util');

const queueName = 'SQS4SkillDevelopers';
const queueRegion = process.env.AWS_REGION; // defaults to region the lambda function is running in

// Text strings
const HELP_MESSAGE = 'You can demonstrate using an Amazon SQS queue by launching the skill.';
const GOODBYE_MESSAGE = 'Talk to you later!';
const MESSAGE_BODY = 'Hello!\nHere is your SQS message which was sent at %s';
const ERROR_MESSAGE = 'I had trouble processing that request. Please try again and if the issue persists, please contact the skill developer.';
const NUMBER_OF_MESSAGES = 'The total number of messages in the queue is %d. ';
const TAIL_MESSAGE = 'The tail of the message id is <say-as interpret-as="characters">%s</say-as>.';

// Intent Handlers =============================================

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest';
  },
  async handle(handlerInput) {
    const responseBuilder = handlerInput.responseBuilder;
    let speechOutput = '';

    const queue = new CookbookSQS.SQSQueue(queueName, queueRegion);
    // check queue size
    const attributes = await queue.getQueueAttributes(['ApproximateNumberOfMessages']);
    if (attributes.ApproximateNumberOfMessages) {
      speechOutput += util.format(NUMBER_OF_MESSAGES, attributes.ApproximateNumberOfMessages);
    }

    // build and send message
    const currentDateTime = new Date();
    const messageText = util.format(MESSAGE_BODY, currentDateTime.toISOString().substr(11, 5));
    const messageId = await queue.sendMessage(messageText);
    speechOutput += util.format(TAIL_MESSAGE, messageId.toString().substr(-6));

    return responseBuilder
      .speak(speechOutput)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const responseBuilder = handlerInput.responseBuilder;
    return responseBuilder
      .speak(HELP_MESSAGE)
      .getResponse();
  },
};

const CancelStopHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' &&
      (request.intent.name === 'AMAZON.CancelIntent' || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const responseBuilder = handlerInput.responseBuilder;

    return responseBuilder
      .speak(GOODBYE_MESSAGE)
      .getResponse();
  },
};

const SessionEndedHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
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
    const request = handlerInput.requestEnvelope.request;

    console.log(`Original Request was: ${JSON.stringify(request, null, 2)}`);
    console.log(`Error handled: ${error.stack}`);

    return handlerInput.responseBuilder
      .speak(ERROR_MESSAGE)
      .getResponse();
  },
};

// Exports handler function and setup ===================================================
const skillBuilder = Alexa.SkillBuilders.custom();
exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    CancelStopHandler,
    HelpHandler,
    SessionEndedHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .withCustomUserAgent('cookbook/aws-sqs/v1')
  .lambda();
