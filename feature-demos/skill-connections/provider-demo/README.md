# Skill Connections Provider Demo
This sample shows how to use Skill Connections as a Provider

## What You Will Need
*  [Amazon Developer Account](http://developer.amazon.com/alexa)
*  [Amazon Web Services Account](http://aws.amazon.com/)
*  The sample code on [GitHub](https://github.com/alexa/alexa-cookbook/tree/master/feature-demos/skill-connections/provider-demo/).

## Setting Up the Demo
This folder contains the interaction model and skill code.  It is structured to make it easy to deploy if you have the ASK CLI already setup.  If you would like to use the Developer Portal, you can follow the steps outlined in the [Hello World](https://github.com/alexa/skill-sample-nodejs-hello-world) example, substituting the [Model](./models/en-US.json) and the [skill code](./lambda/custom/index.js) when called for.

## Exploring Skill Connections
Once the skill is configured, navigate to the Build tab in the skill builder, and explore the intents, slots, sample utterances and prompts.

## Running the Demo
To start the demo go to the testing tab of your skill's developer portal and type:
```
open connection tester and send valid connection request with parameters <Provider Skill Id>--PrintWebpage
```
Your skill will then be sent a request that will hit your `PrintWebPageTaskHandler`.

## Next Steps
After you send your skill for certification and it is deployed to live, it will now be considered as a provider for the task specified in your Skill Manifest.

## Further Documentation
Further Documentation on how to be a Skill Connections provider can be found here:
* https://developer.amazon.com/docs/custom-skills/skill-connections.html#make-your-skill-a-skill-connection-provider
