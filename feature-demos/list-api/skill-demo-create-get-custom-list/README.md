# Create and Get Custom Lists with the ListManagementClient
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/header._TTH_.png" />

This tutorial demonstrates how to use the ListManagementClient to interact with the List API to create and get custom lists.

## What You Will Need
*  [Amazon Developer Account](http://developer.amazon.com/alexa)
*  [Amazon Web Services Account](http://aws.amazon.com/)
*  [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html)
*  The sample code on [GitHub](https://github.com/alexa/alexa-cookbook/tree/master/feature-demos/skill-demo-customer-profile/).

## Setting Up the Demo

This folder contains the (1) interaction model, (2) APL document and (3) skill code.  It is structured to make it easy to deploy if you have the ASK CLI already setup.  

If you would like to use the Developer Portal, you can 

1. follow the steps outlined in the [Hello World](https://github.com/alexa/skill-sample-nodejs-hello-world) example
1. substituting the [Model](./models/en-US.json)
1. add [skill code](./lambda/index.js) to `./lambda/`.

## Running the Demo

**You**: _"Alexa, open custom list demo."_

**Alexa**: _"Welcome to the custom list demo. This demo demonstrates creating a custom list and getting custom lists you've created. You can create a list by saying, create a custom list name and the name or you can get lists you created by saying, what are my custom lists."_

**You**: 

- _"Create a custom list name {list_name}"_
- _"What are my custom lists"_