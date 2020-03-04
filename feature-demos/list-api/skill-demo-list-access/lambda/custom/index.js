const Alexa = require('ask-sdk');

const listIsEmpty = '#list_is_empty#';

const welcomeOutput = 'Welcome. You can say, top todo';
const welcomeReprompt = 'You can say, top todo';
const helpOutput = 'You can say top todo or cancel top todo.';
const helpReprompt = 'Say top todo or cancel top todo.';

const listStatuses = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
};

// handlers

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

const TopToDoHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'TopToDoIntent';
  },
  async handle(handlerInput) {
    const responseBuilder = handlerInput.responseBuilder;

    let speechOutput;
    console.log('Starting top todo handler');
    const itemName = await getTopToDoItem(handlerInput);
    if (!itemName) {
      speechOutput = 'Alexa List permissions are missing. You can grant permissions within the Alexa app.';
      const permissions = ['read::alexa:household:list'];
      return responseBuilder
        .speak(speechOutput)
        .withAskForPermissionsConsentCard(permissions)
        .getResponse();
    } else if (itemName === listIsEmpty) {
      speechOutput = 'Your todo list is empty.';
      return responseBuilder
        .speak(speechOutput)
        .getResponse();
    }
    speechOutput = `Your top todo is ${itemName}.  To mark it as complete, say complete my to do.`;
    const speechReprompt = 'Say complete my to do to mark it complete.';
    return responseBuilder
      .speak(speechOutput)
      .reprompt(speechReprompt)
      .getResponse();
  },
};

const CompleteTopToDoHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'CompleteTopToDoIntent';
  },
  async handle(handlerInput) {
    const responseBuilder = handlerInput.responseBuilder;

    let speechOutput;
    console.info('Starting complete top todo handler');
    try {
      const result = await completeTopToDoAction(handlerInput);
      if (!result) {
        speechOutput = 'Alexa List permissions are missing. You can grant permissions within the Alexa app.';
        const permissions = ['write::alexa:household:list'];
        return responseBuilder
          .speak(speechOutput)
          .withAskForPermissionsConsentCard(permissions)
          .getResponse();
      } else if (result === listIsEmpty) {
        speechOutput = 'I could not complete your top todo. Your todo list is empty.';
      } else {
        speechOutput = `I successfully completed ${result.value}, which was your top todo.  Bye for now!`;
      }
    } catch (err) {
      speechOutput = 'I could not complete the todo.  Please try again later';
    }
    return responseBuilder
      .speak(speechOutput)
      .getResponse();
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

// helpers

/**
* List API to retrieve the customer to-do list.
*/
async function getToDoListId(handlerInput) {
  // check session attributes to see if it has already been fetched
  const attributesManager = handlerInput.attributesManager;
  const sessionAttributes = attributesManager.getSessionAttributes();
  let listId;

  if (!sessionAttributes.todoListId) {
    // lookup the id for the 'to do' list
    const listClient = handlerInput.serviceClientFactory.getListManagementServiceClient();
    const listOfLists = await listClient.getListsMetadata();
    if (!listOfLists) {
      console.log('permissions are not defined');
      return null;
    }
    for (let i = 0; i < listOfLists.lists.length; i += 1) {
      console.log(`found ${listOfLists.lists[i].name} with id ${listOfLists.lists[i].listId}`);
      const decodedListId = Buffer.from(listOfLists.lists[i].listId, 'base64').toString('utf8');
      console.log(`decoded listId: ${decodedListId}`);
      // The default lists (To-Do and Shopping List) list_id values are base-64 encoded strings with these formats:
      //  <Internal_identifier>-TASK for the to-do list
      //  <Internal_identifier>-SHOPPING_LIST for the shopping list
      // Developers can base64 decode the list_id value and look for the specified string at the end. This string is constant and agnostic to localization.
      if (decodedListId.endsWith('-TASK')) {
        // since we're looking for the default to do list, it's always present and always active
        listId = listOfLists.lists[i].listId;
        break;
      }
    }
  }
  attributesManager.setSessionAttributes(sessionAttributes);
  console.log(JSON.stringify(handlerInput));
  return listId; // sessionAttributes.todoListId;
}

/**
* Helper function to retrieve the top to-do item.
*/
async function getTopToDoItem(handlerInput) {
  const listClient = handlerInput.serviceClientFactory.getListManagementServiceClient();
  const listId = await getToDoListId(handlerInput);
  console.log(`listid: ${listId}`);
  const list = await listClient.getList(listId, listStatuses.ACTIVE);
  if (!list) {
    console.log('null list');
    return null;
  } else if (!list.items || list.items.length === 0) {
    console.log('empty list');
    return listIsEmpty;
  }
  console.log(`list item found: ${list.items[0].value} with id: ${list.items[0].id}`);
  return list.items[0].value;
}

/**
* List API to delete the top todo item.
*/
async function completeTopToDoAction(handlerInput) {
  const listClient = handlerInput.serviceClientFactory.getListManagementServiceClient();
  // get the list
  const listId = await getToDoListId(handlerInput);
  const list = await listClient.getList(listId, listStatuses.ACTIVE);
  // if the list doesn't exist, no permissions or has no items
  if (!list) {
    return null;
  } else if (!list.items || list.items.length === 0) {
    return (listIsEmpty);
  }

  // get first item
  const item = list.items[0];
  const updateRequest = {
    value: item.value,
    status: listStatuses.COMPLETED,
    version: item.version,
  };
  return listClient.updateListItem(listId, item.id, updateRequest);
}

// exports

const skillBuilder = Alexa.SkillBuilders.custom();
exports.handler = skillBuilder
  .addRequestHandlers(
    AmazonCancelStopHandler,
    AmazonHelpHandler,
    LaunchRequestHandler,
    CompleteTopToDoHandler,
    TopToDoHandler,
    SessionEndedHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .withApiClient(new Alexa.DefaultApiClient())
  .withCustomUserAgent('cookbook/list-access/v1')
  .lambda();
