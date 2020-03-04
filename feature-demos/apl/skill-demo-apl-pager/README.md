## APL Pager Demo

This skill demonstrates the [Pager Component](https://developer.amazon.com/docs/alexa-presentation-language/apl-pager.html).

In this skill, when a user launches the skill, they will see a template that demonstrates the [Pager Component](https://developer.amazon.com/docs/alexa-presentation-language/apl-pager.html) using the AutoPage command.

## What You Will Need
*  [Amazon Developer Account](http://developer.amazon.com/alexa)
*  The sample code on [GitHub](https://github.com/alexa/alexa-cookbook/tree/master/feature-demos/apl/skill-demo-apl-pager/).
*  An Alexa device which has a display which supports APL (e.g. Amazon Echo Show)

## Setting Up the Demo
This folder contains the interaction model and skill code.  It is structured to make it easy to deploy if you have the ASK CLI already setup.  If you would like to use the Developer Portal, you can follow the steps outlined in the [Hello World](https://github.com/alexa/skill-sample-nodejs-hello-world) example, substituting the [Model](./models/en-US.json) and the [skill code](./lambda/custom/index.js) when called for.

> Note: The demo also requires the [pager.json](./lambda/custom/pager.json) file.  Deploy it with the **index.js** file.

## Running the Demo
To start the demo say "alexa open pager demo".  It will load the pages and automatically page through them.
