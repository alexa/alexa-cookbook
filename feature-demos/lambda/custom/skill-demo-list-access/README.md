# List Access Demo
This demo shows how to access Alexa lists.  You might want to add things to a to-do list or a shopping list (or a custom list), or you may want to sync items with a list in your app or website.

In this demo, the first item on your to-do list is read back to you (read), and you have the opportunity to mark it as complete (write).

## What You Will Need
*  [Amazon Developer Account](http://developer.amazon.com/alexa)
*  [Amazon Web Services Account](http://aws.amazon.com/)
*  The sample code on [GitHub](https://github.com/alexa/alexa-cookbook/tree/master/feature-demos/skill-demo-list-access/).

## Setting Up the Demo
This folder contains the skill manifest, and child folders contain the interaction model and skill code.  It is structured to make it easy to deploy if you have the ASK CLI already setup.  If you would like to use the Developer Portal, you can follow the steps outlined in the [Hello World](https://github.com/alexa/skill-sample-nodejs-hello-world) example, substituting the [Model](./models/en-US.json) and the [skill code](./lambda/custom/index.js) when called for.

Once the skill is setup, you will need to go to your Alexa app to grant permission for the skill to access your lists.
1. Go to the Alexa on your mobile device (or point your browser to https://alexa.amazon.com).
1. Navigate to the skills section.
1. Click on **Your Skills** and select **Dev Skills**.
1. Scroll until you find the **Demo - List Access** skill.
1. Enable the skill if it is not, otherwise click **Settings**, then **Manage Permissions**.
1. Enable the list permissions by sliding the toggle to the on position, and then click **Save Permissions**.

## Exploring List Access
Once the skill is configured, you can naviagate to the Build tab in the skill builder, and explore the intents, slots, sample utterances and prompts if you like.  While in the skill builder, pay attention to the Permissions section.

## Running the Demo
To start the demo say "alexa open list demo".  Ask for your "top to do" and "complete your to do".