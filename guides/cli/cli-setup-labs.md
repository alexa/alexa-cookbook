# ASK CLI Getting Started Guide

This guide gets you started using the CLI you through the setup of the Alexa Skills Kit Command Line Interface (ASK-CLI).

* [Task 1](#ASK%20CLI%20-%20Task%201) - Install
* [Task 2](#ASK%20CLI%20-%20Task%202) - First Project
* [Task 3](#ASK%20CLI%20-%20Task%203) - Customize Lambda
* [Task 4](#ASK%20CLI%20-%20Task%204) - Customize Invocation Name
* [Task 5](#ASK%20CLI%20-%20Task%205) - Add New Intent

### ASK CLI - Task 1
1. First start by [installing the ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html).

**Extra Points:** If you finish this step early, [familiarize yourself with some of the CLI features](https://developer.amazon.com/docs/smapi/ask-cli-command-reference.html).

### ASK CLI - Task 2
**Once you have the CLI setup let's scaffold our first project**
1. Open up a command prompt. Navigate to a directory that you would like to work in.
1. Enter the command below. You'll be asked to provide a skill name. This can be anything you would like it to be, though the best practice is to name it something descriptive and sensible.
1. For our case, lets just call it `hello-world`
```
ask new
```
4. You should receive a confirmation message "New Project for Alexa Skill Created".
1. Navigate into the directory you just created. Notice that the CLI has already created the base files for our Alexa Skill with the project name of "hello-world".
1. Next, enter the following command:
```
ask deploy
```
7. This command will deploy the lambda function and the interaction model for your Alexa Skill.
1. Log into your [AWS Console](https://aws.amazon.com/lambda/) to see the lambda function deployed to the cloud.
1. You can also log into the [skill developer portal](https://developer.amazon.com/alexa/console/ask) to see the interaction model with all of your skill metadata has been deployed.
1. Feel free to test your skill on any echo device registered to your account by saying "Alexa, start greeter". If you don't have a device handy, you can test from the testing pane in the [developer portal](https://developer.amazon.com/alexa/console/ask) or on [echosim.io](https://www.echosim.io).

### ASK CLI - Task 3
**Let's customize this basic skill and get some practice using the CLI to deploy our changes. We'll first begin by making changes to and deploying our lambda code.**
1. Open the file `lambda/custom/index.js` in your preferred Code Editor, alternatively feel free to use a standard text editor like notepad.
1. Scroll down to `line 11` and change the `speechText` string to say whatever you would like Alexa to say when a user opens this skill. Save the file.
1. Since we made a change to our Lambda function, let's update it. Go back to your command prompt, make sure you are in the root folder of your directory and type the following command:
```
ask deploy -t lambda
```
You should see a confirmation message in your terminal "Lambda deployment finished."
Congratulations! Test the changes by launching the skill on your device, from the testing pane in the [developer portal](https://developer.amazon.com/alexa/console/ask) or on [echosim.io](https://www.echosim.io).

### ASK CLI - Task 4
**Now let's practice using the CLI to make changes in a skill's interaction model.**
1. Open the file `models/en-US.json` in your preferred Code Editor.
1. Scroll to `line 4` and change the `invocationName` value from `"greeter"` to `"hello jeff"` Feel free to use your own name instead.
  **TIP:** The interaction model is a mapping between a user's utterance and an Alexa Skill's handler. The handler will contain the code that will execute when an utterance is detected.
1. Now lets update our skills interaction model. Open the command prompt. Navigate to the directory the skill is in and type the following command:
```
ask deploy -t model
```
> **Note:** This process takes a bit longer since the model is essentially training Alexa to recognize the speech input from our customers. You should see a confirmation message in your terminal "Model deployment finished."

Congratulations! Test the changes you've made to your skill on your device, from the testing pane in the [developer portal](https://developer.amazon.com/alexa/console/ask), or on [echosim.io](https://www.echosim.io). Remmber to use the new invocation name you gave your skill. You'll want to say something like "Alexa, start hello jeff" or you can also try "Alexa, hello jeff". or "ask", "open", "tell"...go ahead and experiment with a few variations.

### ASK CLI - Task 5
**Lets expand our Alexa Skill's features. If someone were to say "Alexa, ask hello jeff how he's doing?" the Skill should have an answer.**
1. Let's start by editing the front-end (VUI). Open the interaction model in your preferred Code Editor (`models/en-US.json`)
1. Copy and paste the following block of JSON below in between `line 26` and `line 27`. Feel free to add additional utterances
```
{
  "name": "HowAreYouIntent",
  "slots": [],
  "samples": [
    "how is he doing",
    "how are you",
    "howdy do"
  ]
},
```
**Tip:** Don't forget the trailing comma after the closed curly brace!

**Extra Points:** Feel free to add additional Utterances to the samples array. Remember to comma separate!

3. Save your interaction model and open your lambda function (`lambda/custom/index.js`) and copy/paste the following brick of code at `line 35`

```
const HowAreYouIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'HowAreYouIntent';
  },
  handle(handlerInput) {
    const speechText = 'I\'m doing just great!';
    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};
```
**Extra Points:** Feel free to edit the  speechText variable to say anything you want

4. In your lambda function, scroll down to `line 113` and add `HowAreYouIntentHandler,` to the array of Intent Handlers and save the changes you've made. It should look something like this

```
.addRequestHandlers(
  LaunchRequestHandler,
  HelloWorldIntentHandler,
  HowAreYouIntentHandler,
  HelpIntentHandler,
  CancelAndStopIntentHandler,
  SessionEndedRequestHandler
)
```
**Tip:** Don't forget to comma separate the items in your array!

5. Now Deploy your changes. Since you've changed both the interaction model and the lambda function simply enter `ask deploy` into your command prompt to push both the interaction model and lambda function changes up.

**Extra Points:** Test directly by entering `ask simulate -l en-US -t "start hello world"` into your command prompt.

Woohoo! Test the changes you've made to your skill on your device, from the [developer portal](https://developer.amazon.com/alexa/console/ask) or on [echosim.io](https://www.echosim.io). Remember to try your new utterances, "Alexa, ask hello jeff howdy do?" Or you can try to say something like "Alexa, start hello jeff" or you can also try "Alexa, start hello jeff" and then follow up with "how are you?"...go ahead and experiment with a few variations.
