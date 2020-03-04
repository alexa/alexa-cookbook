# Interactive APL Button Demo
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/header._TTH_.png" />

This is a tutorial that demonstrates how to implement an interactive APL (Alexa Presentation Language) button.

## What You Will Need
*  [Amazon Developer Account](http://developer.amazon.com/alexa)
*  [Amazon Web Services Account](http://aws.amazon.com/)
*  [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html)
*  The sample code on [GitHub](https://github.com/alexa/alexa-cookbook/tree/master/feature-demos/skill-demo-customer-profile/).

## Setting Up the Demo

This folder contains the (1) interaction model, (2) APL document and (3) skill code.  It is structured to make it easy to deploy if you have the ASK CLI already setup.  

If you would like to use the Developer Portal, you can 

1. follow the steps outlined in the [Hello World](https://github.com/alexa/skill-sample-nodejs-hello-world) example
1. substituting the [Model](./models/en-US.json)
1. create an `./lambda/custom/apl` folder
1. add [button.json](./lambda/custom/apl/button.json) to the `apl` folder
1. add [skill code](./lambda/custom/index.js) to `./lambda/custom/`.

## Running the Demo

To start the demo say "alexa, open button demo".


## Known Issues

Alexa Presentation Language (APL) is currently in public beta so there are some known bugs. In this demo there are the following issues:

**Physical Device**

Styles do not render properly so the button will appear to have no padding.

**Simulator**

The SendEvent request to the Lambda will be missing `source` information which is present when using a physical device