# Auto-Delegate & Intent Chaining Demo
Focus on building the best voice experience, not error handling. With auto delegation, Alexa completes all the dialog steps based on the dialog model, then sends your skill a single IntentRequest when it is done. With this option, you do not need to use the Dialog directives.

Using Intent Chaining, you can start dialog management from any intent, including the **LaunchRequest**. You can chain to any of your intents, as long as it supports dialog model. You can chain from any intent, but there are a few intents you cannot chain to. For example, you can't chain to Launch Request or any of the Built-in intents. 

## What You Will Need
*  [Amazon Developer Account](http://developer.amazon.com/alexa)
*  (optional) [Amazon Web Services Account](http://aws.amazon.com/)
*  The sample code on [GitHub](https://github.com/alexa/alexa-cookbook/tree/master/feature-demos/skill-demo-dialog-delegate/).

## Setting Up the Demo
This folder contains the interaction model and skill code.  It is structured to make it easy to deploy if you have the ASK CLI already setup.  If you would like to use the Developer Portal, you can follow the steps outlined in the [Hello World](https://github.com/alexa/skill-sample-nodejs-hello-world) example, substituting the [Model](./models/en-US.json) and the [skill code](./lambda/custom/index.js) when called for.

## Exploring Dialog Management
Once the skill is configured, navigate to the Build tab in the skill builder, and explore the PlanMyTrip Intent, slots, sample utterances and prompts.

## Running the Demo
To start the demo say "alexa open intent chaining demo". Alexa will prompt you to provide a US city as a starting point and a US city as a destination.

When you launch the skill with no utterance (i.e. just 'open intent chaining demo'), the LaunchRequest chains to the PlayMyTripIntent.

## Next Steps
Check out [Pet Match](https://github.com/alexa/skill-sample-nodejs-petmatch) for a skill sample that includes delegation and other features related to dialog management. 