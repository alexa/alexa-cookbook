# Display Interface Skill for Echo Show

# List Events Demo
This demos how to use capability detection to determine if the requesting device supports Display directives (ex: Echo Show), does not (Echo, Echo dot, Fire TV), or is the simulator.

When users with supported devices ask for a quiz to begin, they are able to see the question on their display. When using a device that does not support display, the question is simply asked by Alexa without any errors.

## What You Will Need
*  [Amazon Developer Account](http://developer.amazon.com/alexa)
*  [Amazon Web Services Account](http://aws.amazon.com/)
*  The sample code on [GitHub](https://github.com/alexa/alexa-cookbook/tree/master/feature-demos/skill-demo-display-directive/listTemplate/).

## Setting Up the Demo
This folder contains the interaction model and skill code.  It is structured to make it easy to deploy if you have the ASK CLI already setup.  If you would like to use the Developer Portal, you can follow the steps outlined in the [Hello World](https://github.com/alexa/skill-sample-nodejs-hello-world) example, substituting the [Model](./models/en-US.json) and the [skill code](./lambda/custom/index.js) when called for.

## Exploring

Once enabled, try playing through a few questions on different devices. Each round of questions will generate console log messages, depending on which device you are using. Open the AWS Console and navigate to the CloudWatch Logs section and view the logs associated with your skill's Lambda function. It is most easy to access the logs from Lambda function page. Click on the Monitoring tab, then click on one of the Jump to Logs links. Examine the logs and you will see information about the events which have been generated.
