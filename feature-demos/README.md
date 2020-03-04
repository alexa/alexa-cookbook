# Amazon Alexa Feature Demos

This folder contains focused demos of different features or techniques.  These demos are functional skills but are not intended to be published just to demostrate a feature or a technique, which can be incorporated into a skill.  Set them up, try them out, take them apart and learn from them!

## Demos

### Dialog Management

[Plan My Trip](./skill-demo-dialog-delegate/) demonstrates the delegate directive where the skill delegates collecting required slots to Alexa.  Check out [Pet Match](https://github.com/alexa/skill-sample-nodejs-petmatch) for a skill sample that includes delgation and other features related to dialog management.  

[Entity Resolution Quiz](./skill-demo-entity-resolution) demonstrates the use of synonyms for slot values.  Check out [Pet Match](https://github.com/alexa/skill-sample-nodejs-petmatch) for a skill sample that includes entity resolution and other features related to dialog management.  

### [Alexa Display Directives](skill-demo-display-directive/)

Display directives are used by skills to send commands to the [display interface](https://developer.amazon.com/en-US/docs/alexa/custom-skills/display-interface-reference.html) of Alexa-enabled devices with screens, such as Echo Show and Fire TV devices. This [Alexa display directives demonstration](skill-demo-display-directive/) shows how to use the **body template** and **list template** in your screen-enabled Alexa skill. 

### [Alexa Skill Management API (SMAPI) SDK Demo](smapi-sdk-node-demo/)

The [Alexa SMAPI SDK demonstration for Node](smapi-sdk-node-demo/) shows how to set up a Node.js project with the Alexa Skills Management API SDK and run some sample API calls to list skills for a vendor ID or get analytics data with the [Alexa Skill Metrics API](https://developer.amazon.com/en-US/docs/alexa/smapi/metrics-api.html/). 

### Other Areas

[Accessing Lists](./skill-demo-list-access) demonstrates how to access the list API for reading and writing to Alexa's lists.

[List events](./skill-demo-list-events) demonstrates how to recieve skill, list and item level events.

[Progressive Response](./skill-demo-progressive-response) demonstrates how to deliver a progressive response to a customer.

### Requesting a Demo

Is there a feature you'd like to see a demo created for?  If so, create an issue [here](../issues/new?template=feature_request.md) to request it.  If you want to request a new feature, use https://alexa.uservoice.com.
