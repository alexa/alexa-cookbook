const Alexa = require('ask-sdk');

const welcomeOutput = 'Welcome to ...';
const welcomeReprompt = 'What can I help you with?';
const helpOutput = 'You can demonstrate ... by ...  Try saying ...';
const helpReprompt = 'Try saying ...';

// Status of list, either active or completed
const STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
};

// handlers

const SkillEventHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (request.type === 'AlexaSkillEvent.SkillEnabled' ||
      request.type === 'AlexaSkillEvent.SkillDisabled' ||
      request.type === 'AlexaSkillEvent.SkillPermissionAccepted' ||
      request.type === 'AlexaSkillEvent.SkillPermissionChanged' ||
      request.type === 'AlexaSkillEvent.SkillAccountLinked');
  },
  handle(handlerInput) {
    const userId = handlerInput.requestEnvelope.context.System.user.userId;
    let acceptedPermissions;
    switch (handlerInput.requestEnvelope.request.type) {
      case 'AlexaSkillEvent.SkillEnabled':
        console.log(`skill was enabled for user: ${userId}`);
        break;
      case 'AlexaSkillEvent.SkillDisabled':
        console.log(`skill was disabled for user: ${userId}`);
        break;
      case 'AlexaSkillEvent.SkillPermissionAccepted':
        acceptedPermissions = JSON.stringify(handlerInput.requestEnvelope.request.body.acceptedPermissions);
        console.log(`skill permissions were accepted for user ${userId}. New permissions: ${acceptedPermissions}`);
        break;
      case 'AlexaSkillEvent.SkillPermissionChanged':
        acceptedPermissions = JSON.stringify(handlerInput.requestEnvelope.request.body.acceptedPermissions);
        console.log(`skill permissions were changed for user ${userId}. New permissions: ${acceptedPermissions}`);
        break;
      case 'AlexaSkillEvent.SkillAccountLinked':
        console.log(`skill account was linked for user ${userId}`);
        break;
      default:
        console.log(`unexpected request type: ${handlerInput.requestEnvelope.request.type}`);
    }
  },
};

const ItemEventHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    console.log(request);
    return (request.type === 'AlexaHouseholdListEvent.ItemsCreated' ||
      request.type === 'AlexaHouseholdListEvent.ItemsDeleted' ||
      request.type === 'AlexaHouseholdListEvent.ItemsUpdated');
  },
  async handle(handlerInput) {
    const listId = handlerInput.requestEnvelope.request.body.listId;
    const listItemIds = handlerInput.requestEnvelope.request.body.listItemIds;
    const status = STATUS.ACTIVE;
    const listServiceClient = handlerInput.serviceClientFactory.getListManagementServiceClient();
    console.log('item created');
    const list = await listServiceClient.getList(listId, status);
    if (handlerInput.requestEnvelope.request.type === 'AlexaHouseholdListEvent.ItemsDeleted') {
      console.log(`${listItemIds} was deleted from list ${list.name}`);
    } else {
      for (let i = 0, len = listItemIds.length; i < len; i += 1) {
        // using await within the loop to avoid throttling
        const listItem = await listServiceClient.getListItem(listId, listItemIds[i]);
        const itemName = listItem.value;
        switch (handlerInput.requestEnvelope.request.type) {
          case 'AlexaHouseholdListEvent.ItemsCreated':
            console.log(`${itemName} was added to list ${list.name}`);
            break;
          case 'AlexaHouseholdListEvent.ItemsUpdated':
            console.log(`${itemName} was updated on list ${list.name}`);
            break;
          default:
            console.log(`unexpected request type ${handlerInput.requestEnvelope.request.type}`);
        }
      }
    }
  },
};

const ListEventHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (request.type === 'AlexaHouseholdListEvent.ListCreated' ||
      request.type === 'AlexaHouseholdListEvent.ListUpdated' ||
      request.type === 'AlexaHouseholdListEvent.ListDeleted');
  },
  async handle(handlerInput) {
    const listClient = handlerInput.serviceClientFactory.getListManagementServiceClient();
    const listId = handlerInput.requestEnvelope.request.body.listId;
    const status = STATUS.ACTIVE;

    if (handlerInput.requestEnvelope.request.type === 'AlexaHouseholdListEvent.ListDeleted') {
      console.log(`list ${listId} was deleted`);
    } else {
      const list = await listClient.getList(listId, status);
      switch (handlerInput.requestEnvelope.request.type) {
        case 'AlexaHouseholdListEvent.ListCreated':
          console.log(`list ${list.name} was created`);
          break;
        case 'AlexaHouseholdListEvent.ListUpdated':
          console.log(`list ${list.name} was updated`);
          break;
        default:
          console.log(`unexpected request type ${handlerInput.requestEnvelope.request.type}`);
      }
    }
  },
};

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const responseBuilder = handlerInput.responseBuilder;
    return responseBuilder
      .speak(welcomeOutput)
      .reprompt(welcomeReprompt)
      .getResponse();
  },
};

const UnhandledHandler = {
  canHandle(handlerInput) {
    return true;
  },
  handle(handlerInput) {
    console.log('unhandled');
    console.log(handlerInput.requestEnvelope.request);
  },
};

const AmazonHelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const responseBuilder = handlerInput.responseBuilder;
    return responseBuilder
      .speak(helpOutput)
      .reprompt(helpReprompt)
      .getResponse();
  },
};

const AmazonCancelStopHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' &&
      (request.intent.name === 'AMAZON.CancelIntent' || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const responseBuilder = handlerInput.responseBuilder;
    const speechOutput = 'Okay, talk to you later! ';

    return responseBuilder
      .speak(speechOutput)
      .withShouldEndSession(true)
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
    console.log(`Error handled: ${error}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I had trouble doing what you asked.  Please ask for it again.')
      .reprompt('Sorry, I had trouble doing what you asked.  Please ask for it again.')
      .getResponse();
  },
};

// exports

const skillBuilder = Alexa.SkillBuilders.custom();
exports.handler = skillBuilder
  .addRequestHandlers(
    AmazonCancelStopHandler,
    AmazonHelpHandler,
    LaunchRequestHandler,
    SkillEventHandler,
    ItemEventHandler,
    ListEventHandler,
    SessionEndedHandler,
    UnhandledHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .withApiClient(new Alexa.DefaultApiClient())
  .lambda();
