# Reminders Demo

## What You Will Need
*  [Amazon Developer Account](http://developer.amazon.com/alexa)
*  [Amazon Web Services Account](http://aws.amazon.com/)
*  The sample code on [GitHub](https://github.com/alexa/alexa-cookbook/tree/master/feature-demos/skill-demo-reminders/).
*  An Alexa device which supports reminders (e.g. Amazon Echo)

## Setting Up the Demo
This folder contains the interaction model and skill code.  It is structured to make it easy to deploy if you have the ASK CLI already setup.  If you would like to use the Developer Portal, you can follow the steps outlined in the [Hello World](https://github.com/alexa/skill-sample-nodejs-hello-world) example, substituting the [Model](./models/en-US.json) and the [skill code](./lambda/custom/index.js) when called for.

## Running the Demo
To start the demo say "alexa open reminders demo".  It will tell you how many reminders you have related to the skill.  Say "create a reminder" to create a reminder.

You will need to grant Reminders permissions to the skill using the Alexa app.

> Note: attempting a one shot to create the reminder may trigger the built in reminder functionality.

> Note: reminders are not supported in the Alexa developer console simulator.

\###