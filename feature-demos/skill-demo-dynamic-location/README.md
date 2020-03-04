# Dynamic Location Demo

## What You Will Need
*  [Amazon Developer Account](http://developer.amazon.com/alexa)
*  [Amazon Web Services Account](http://aws.amazon.com/)
*  The sample code on [GitHub](https://github.com/alexa/alexa-cookbook/tree/master/feature-demos/skill-demo-dynamic-location/).
*  An Alexa device which supports dynamic location updates (e.g. your Phone)

## Setting Up the Demo
This folder contains the interaction model and skill code.  It is structured to make it easy to deploy if you have the ASK CLI already setup.  If you would like to use the Developer Portal, you can follow the steps outlined in the [Hello World](https://github.com/alexa/skill-sample-nodejs-hello-world) example, substituting the [Model](./models/en-US.json) and the [skill code](./lambda/custom/index.js) when called for.

## Running the Demo
To start the demo say "alexa open location demo".  It will tell you to ask what's your current location.  Say "where am i" to listen to your latest location info.

You will need to grant Location permissions to the skill via the Alexa app.

> Note: location updates are not supported in the Alexa developer console simulator. You can use the skill from the Alexa app in your phone to pass the dynamic location

\###