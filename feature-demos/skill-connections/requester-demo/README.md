# Skill Connections Requester Demo
This sample shows how to use Skill Connections as a Requester

## What You Will Need
*  [Amazon Developer Account](http://developer.amazon.com/alexa)
*  [Amazon Web Services Account](http://aws.amazon.com/)
*  The sample code on [GitHub](https://github.com/alexa/alexa-cookbook/tree/master/feature-demos/skill-connections/requester-demo/).

## Setting Up the Demo
This folder contains the interaction model and skill code.  It is structured to make it easy to deploy if you have the ASK CLI already setup.  If you would like to use the Developer Portal, you can follow the steps outlined in the [Hello World](https://github.com/alexa/skill-sample-nodejs-hello-world) example, substituting the [Model](./models/en-US.json) and the [skill code](./lambda/custom/index.js) when called for.

## Exploring Skill Connections
Once the skill is configured, navigate to the Build tab in the skill builder, and explore the intents, slots, sample utterances and prompts.

## Running the Demo
To start the demo say "alexa open skill connections requester demo". Your skill will then start a connection that will be routed to the best provider for PrintWebpage

## Further Documentation:
More documentation on how to be a Skill Connections requester can be found here:
* https://developer.amazon.com/docs/custom-skills/skill-connections.html#make-your-skill-a-skill-connection-requester
