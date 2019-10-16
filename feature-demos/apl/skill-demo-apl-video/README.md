# APL Video Demo
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/header._TTH_.png" />

This tutorial that demonstrates how to implement a skill that plays a video using APL (Alexa Presentation Language) and how to voice control the playback such as _play_ and _pause_.

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

**You**: _"alexa, open video demo."_

**Alexa**: _"Welcome to the APL Video Demo! You can control the video playback by saying play or pause."_

**You**:
- _"pause"_
- _"pause video"_
- _"play"_
- _"play video"_