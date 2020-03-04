# Skill Personalization Demo

## What You Will Need
*  [Amazon Developer Account](http://developer.amazon.com/alexa)
*  [Amazon Web Services Account](http://aws.amazon.com/)
*  The sample code on [GitHub](https://github.com/alexa/alexa-cookbook/tree/master/feature-demos/skill-demo-personalization/)

## Setting Up the Demo
This folder contains the interaction model and skill code.  It is structured to make it easy to deploy if you have the ASK CLI already setup.  If you would like to use the Developer Portal, you can follow the steps outlined in the [Hello World](https://github.com/alexa/skill-sample-nodejs-hello-world) example, by substituting the [Model](./models/en-US.json) and the [skill code](./lambda/custom/index.js) when called for.

## Running the Demo
To start the demo say "alexa open skill personalization demo".  Alexa will respond with "Hi <Your first name>"" if your test account has setup voice profile and opted-in personalization or "Hi Stranger" if personalization is not turned on. Note that this sample skill doesn't have account linking setup out of box and accessToken will only be available if you finished account linking configuration. You can follow the [instructions](https://developer.amazon.com/docs/quick-reference/account-linking-quick-reference.html) to add it.

