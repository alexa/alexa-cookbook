// Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Licensed under the Amazon Software License
// http://aws.amazon.com/asl/

const Alexa = require('ask-sdk');
const ddbAdapter = require('ask-sdk-dynamodb-persistence-adapter'); // included in ask-sdk

const ddbTableName = 'delete-persistent-attributes-demo';

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  async handle(handlerInput) {
    const attributesManager = handlerInput.attributesManager;
    const persistentAttributes = await attributesManager.getPersistentAttributes();
    const userIdTail = handlerInput.requestEnvelope.session.user.userId.substr(-6);
    let speechOutput = `I've saved now as the last access time. Your user id ends with <say-as interpret-as='spell-out'>${userIdTail}</say-as>.`;

    if (persistentAttributes.lastAccessTime) {
      // not the first time accessing the skill, so share the saved info
      const lastTime = parseInt(persistentAttributes.lastAccessTime, 10);
      const thisTime = Date.now();
      const difference = (thisTime - lastTime) / 1000;

      speechOutput = `The last time you accessed this skill was ${difference} seconds ago. ${speechOutput}`;
    }

    persistentAttributes.lastAccessTime = Date.now();
    attributesManager.setPersistentAttributes(persistentAttributes);
    await attributesManager.savePersistentAttributes();

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .getResponse();
  },
};

const SkillDisabledEventHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (request.type === 'AlexaSkillEvent.SkillDisabled');
  },
  handle(handlerInput) {
    console.log(JSON.stringify(handlerInput.requestEnvelope));
    const userId = handlerInput.requestEnvelope.context.System.user.userId;
    console.log(`skill was disabled for user: ${userId}`);
    if (handlerInput.requestEnvelope.request.body.userInformationPersistenceStatus === 'NOT_PERSISTED') {
      handlerInput.attributesManager.deletePersistentAttributes();
    }
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'All I do is save data to your database. Launch the skill without asking for help.';

    return handlerInput.responseBuilder
      .speak(speechText)
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
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, things didn\'t work.  Try it again.')
      .getResponse();
  },
};

function getPersistenceAdapter(tableName) {
  // Determines persistence adapter to be used based on environment
  // Note: tableName is only used for DynamoDB Persistence Adapter
  if (process.env.S3_PERSISTENCE_BUCKET) {
    // in Alexa Hosted Environment
    // eslint-disable-next-line global-require
    const s3Adapter = require('ask-sdk-s3-persistence-adapter');
    return new s3Adapter.S3PersistenceAdapter({
      bucketName: process.env.S3_PERSISTENCE_BUCKET,
    });
  }

  // Not in Alexa Hosted Environment
  return new ddbAdapter.DynamoDbPersistenceAdapter({
    tableName: tableName,
    createTable: true,
  });
}

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .withPersistenceAdapter(getPersistenceAdapter(ddbTableName))
  .addRequestHandlers(
    LaunchRequestHandler,
    SkillDisabledEventHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .withCustomUserAgent('cookbook/delete-persistent-attributes/v1')
  .lambda();
