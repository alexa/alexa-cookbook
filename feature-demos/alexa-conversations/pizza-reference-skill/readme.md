# Pizza Reference Skill

This folder contains the nodejs lambda function code for the Pizza Reference skill hosted template available in the Alexa Developer Portal.

# How to use
You should only use this code if you create a new Alexa skill using the Intro to Alexa Conversations template, but decide to host your own endpoint for the skill service.

# Installing the code in your own lambda function
To use this code in your own AWS Lambda function, you will need to login to your AWS account and create a lambda function for NodeJS using the latest version and paste the 3 files into the inline editor or upload a zip file containing the files. For more information on setting up lambda functions for use in Alexa skills, please see our documentation: [Host a Custom Skill as an AWS Lambda Function](https://developer.amazon.com/en-US/docs/alexa/custom-skills/host-a-custom-skill-as-an-aws-lambda-function.html%28https://developer.amazon.com/en-US/docs/alexa/custom-skills/host-a-custom-skill-as-an-aws-lambda-function.html)


# Skill Functionality

Please refer to the [developer documentation](https://developer.amazon.com/en-US/docs/alexa/conversations/about-alexa-conversations.html) for details or terminology you don't understand as part of this guide.

This template provides a collection of dialogs built using Alexa Conversations that provide examples of pizza ordering. Some of the built-in features of Alexa Conversations included in this skill include:

 - Context carryover
    - For example, in the AddCustomPizzaThenRemove dialog, you can see an example of a user turn saying "Remove *that* pizza" where *that* refers to the most recent pizza, identified by the ordinal returned from AddCustomPizzaApi 
- One step correction
    - When the skill confirms arguments the user has the ability to correct and refill arguments with new values in a single turn, without having to specifically model those utterances in Alexa Converations
    - Example:  After informing a size, crust, or cheese, the user can respond to any prompt with something like "Actually, make that thin crust"
    - NOTE: this feature is not yet supported for lists, like toppings.

As a developer, you can see examples of:

 - Annotated dialogs to consume user input
 - Calling a configured API to pass the captured input to the lambda function
 - Examples of interoperability between regular intent handlers and Alexa Conversations dialogs



