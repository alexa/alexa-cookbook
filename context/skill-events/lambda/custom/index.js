'use strict';
const Alexa = require('alexa-sdk');
const AlexaListClient = require('./alexaListClient');

/**
 * Fetches list item information for each listItem in listItemIds. Executes the
 * callback function with the response back from api.amazonalexa.com
 * for each item in the list.
 *
 * @param {string} listId list id to check
 * @param {string[]} listItemIds list item ids in the request
 * @param {string} consentToken consent token from Alexa request
 * @param {string} apiEndpoint api endpoint from alexa request
 * @param {(string) => void} callback func for each list item
 */
const traverseListItems = (listId, listItemIds, consentToken, apiEndpoint, callback) => {
    const listClient = new AlexaListClient(consentToken, apiEndpoint);

    listItemIds.forEach((itemId) => {
        const listRequest = listClient.getListItem(listId, itemId);

        listRequest.then((response) => {
            callback(response);
        }).catch((err) => {
            console.error(err);
        });
    });
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('SayHello');
    },
    'HelloWorldIntent': function () {
        this.emit('SayHello');
    },
    'MyNameIsIntent': function () {
        this.emit('SayHelloName');
    },
    'SayHello': function () {
        this.response.speak('Hello World!');
        this.emit(':responseReady');
    },
    'SayHelloName': function () {
        const name = this.event.request.intent.slots.name.value;
        this.response.speak(`Hello ${name}!`);
        this.emit(':responseReady');
    },

    // Skill events
    'AlexaSkillEvent.SkillEnabled' : function() {
        let userId = this.event.context.System.user.userId;
        console.log(`skill was enabled for user: ${userId}`);
    },
    'AlexaSkillEvent.SkillDisabled' : function() {
        let userId = this.event.context.System.user.userId;
        console.log(`skill was disabled for user: ${userId}`);
    },
    'AlexaSkillEvent.SkillPermissionAccepted' : function() {
        let userId = this.event.context.System.user.userId;
        let acceptedPermissions = JSON.stringify(this.event.request.body.acceptedPermissions);
        console.log(`skill permissions were accepted for user ${userId}. New permissions: ${acceptedPermissions}`);
    },
    'AlexaSkillEvent.SkillPermissionChanged' : function() {
        let userId = this.event.context.System.user.userId;
        let acceptedPermissions = JSON.stringify(this.event.request.body.acceptedPermissions);
        console.log(`skill permissions were changed for user ${userId}. New permissions: ${acceptedPermissions}`);
    },
    'AlexaSkillEvent.SkillAccountLinked' : function() {
        let userId = this.event.context.System.user.userId;
        console.log(`skill account was linked for user ${userId}`);
    },

    // Household list events
    'AlexaHouseholdListEvent.ItemsCreated' : function() {
        const listId = this.event.request.body.listId;
        const consentToken = this.event.context.System.user.permissions.consentToken;
        const apiEndpoint = this.event.context.System.apiEndpoint;
        const listItemIds = this.event.request.body.listItemIds;

        traverseListItems(listId, listItemIds, consentToken, apiEndpoint, (listItem) => {
            const itemName = listItem.value;
            console.log(`${itemName} was added to list ${listId}`);
        });
    },
    'AlexaHouseholdListEvent.ItemsDeleted' : function() {
        const listId = this.event.request.body.listId;
        const consentToken = this.event.context.System.user.permissions.consentToken;
        const apiEndpoint = this.event.context.System.apiEndpoint;
        const listItemIds = this.event.request.body.listItemIds;

        traverseListItems(listId, listItemIds, consentToken, apiEndpoint, (listItem) => {
            const itemName = listItem.value;
            console.log(`${itemName} was deleted from list ${listId}`);
        });
    },
    'AlexaHouseholdListEvent.ItemsUpdated' : function() {
        const listId = this.event.request.body.listId;
        const consentToken = this.event.context.System.user.permissions.consentToken;
        const apiEndpoint = this.event.context.System.apiEndpoint;
        const listItemIds = this.event.request.body.listItemIds;

        traverseListItems(listId, listItemIds, consentToken, apiEndpoint, (listItem) => {
            const itemName = listItem.value;
            console.log(`${itemName} was updated on list ${listId}`);
        });
    }
};

exports.handler = function(event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(handlers);
    alexa.execute();
};