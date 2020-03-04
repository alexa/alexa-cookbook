# Plan My Trip
Focus on building the best voice experience, not error handling. The skill builder’s new dialog model reduces the amount of handling required in the skill endpoint (backend) to manage slot filling, prompts, and confirmations for a customer intent. All you have to do is respond with a Dialog.Delegate directive if the status in not complete. Alexa will manage the dialogs for you, greatly reducing the amount of handling needed by you to create a great experience.

The "Plan my trip" sample asks the user questions about an upcoming trip they'd like to take. As a part of this Alexa will gather information about when the trip will start as well as where they'd like to leave from and go to. You'll learn how to use the skill builder to create the intents, utterances, and slots for this scenario. This code sample will also show you how to delegate the process of gathering the required slots to Alexa.

## What You Will Need
*  [Amazon Developer Account](http://developer.amazon.com/alexa)
*  [Amazon Web Services Account](http://aws.amazon.com/)
*  The sample code on [GitHub](https://github.com/alexa/alexa-cookbook/tree/master/feature-demos/skill-demo-dialog-delegate/).

## Setting Up the Demo
This folder contains the interaction model and skill code.  It is structured to make it easy to deploy if you have the ASK CLI already setup.  If you would like to use the Developer Portal, you can follow the steps outlined in the [Hello World](https://github.com/alexa/skill-sample-nodejs-hello-world) example, substituting the [Model](./models/en-US.json) and the [skill code](./lambda/custom/index.js) when called for.

## Exploring Dialog Management
Once the skill is configured, navigate to the Build tab in the skill builder, and explore the PlanMyTrip Intent, slots, sample utterances and prompts.

## Running the Demo
To start the demo say "alexa open plan my trip demo".  Alexa will prompt you to provide a US city as a starting point and a US city as a destination.

## Next Steps
Check out [Pet Match](https://github.com/alexa/skill-sample-nodejs-petmatch) for a skill sample that includes delgation and other features related to dialog management. 