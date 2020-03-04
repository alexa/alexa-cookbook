# Progressive Response Demo

Sometimes it may take some time before a response can be sent to a user.  Rather than wait in silence, it is better to provide an initial response and then follow it up with the full response.  The Progressive Response API allows for that.  This demo fetches data from a remote source after providing an initial resposne to the user.

## What You Will Need
*  [Amazon Developer Account](http://developer.amazon.com/alexa)
*  [Amazon Web Services Account](http://aws.amazon.com/)
*  The sample code on [GitHub](https://github.com/alexa/alexa-cookbook/tree/master/feature-demos/skill-demo-progressive-response/).

## Setting Up the Demo
This folder contains the interaction model and skill code.  It is structured to make it easy to deploy if you have the ASK CLI already setup.  If you would like to use the Developer Portal, you can follow the steps outlined in the [Hello World](https://github.com/alexa/skill-sample-nodejs-hello-world) example, substituting the [Model](./models/en-US.json) and the [skill code](./lambda/custom/index.js) when called for.

## Running the Demo
To start the demo say "alexa open progressive response demo what happened on August thirtieth".  Alexa will provide an initial response, insert an artificial five second delay, and then provide the list of events.
