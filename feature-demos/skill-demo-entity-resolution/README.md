# Entity Resolution Quiz Demo
This sample shows how to use entity resolution in a simple quiz.

Let's say Alexa asks, "Who is credited with suggesting the word "hello" be used when answering the telephone?"

The user can answer with, "Thomas Edison" or similar phrases like "Edison" or "Menlo Park".

If they say Edison, your code will get "Edison" as what they said as well as "Thomas Edison" which is what that resolves to.

## What You Will Need
*  [Amazon Developer Account](http://developer.amazon.com/alexa)
*  [Amazon Web Services Account](http://aws.amazon.com/)
*  The sample code on [GitHub](https://github.com/alexa/alexa-cookbook/tree/master/feature-demos/skill-demo-entity-resolution/).

## Setting Up the Demo
This folder contains the interaction model and skill code.  It is structured to make it easy to deploy if you have the ASK CLI already setup.  If you would like to use the Developer Portal, you can follow the steps outlined in the [Hello World](https://github.com/alexa/skill-sample-nodejs-hello-world) example, substituting the [Model](./models/en-US.json) and the [skill code](./lambda/custom/index.js) when called for.

## Exploring Entity Resolution
Once the skill is configured, naviagate to the Build tab in the skill builder, and explore the intents, slots, sample utterances and prompts.  Pay attention to the answerValues custom slot type.

## Running the Demo
To start the demo say "alexa open entity resolution quiz demo".  Answer the question as you see fit, trying different synonyms.

## Next Steps
Check out [Pet Match](https://github.com/alexa/skill-sample-nodejs-petmatch) for a skill sample that includes entity resolution and other features related to dialog management. 