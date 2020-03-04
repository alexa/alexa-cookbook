# VideoApp Feature Demo
This sample simply plays a video from an S3 bucket.  Setup the skill and launch it to see it in action.

## What You Will Need
*  [Amazon Developer Account](http://developer.amazon.com/alexa)
*  [Amazon Web Services Account](http://aws.amazon.com/)
*  The sample code on [GitHub](https://github.com/alexa/alexa-cookbook/tree/master/feature-demos/skill-demo-videoapp-directive/).

## Setting Up the Demo
This folder contains the interaction model and skill code.  It is structured to make it easy to deploy if you have the ASK CLI already setup.  If you would like to use the Developer Portal, you can follow the steps outlined in the [Hello World](https://github.com/alexa/skill-sample-nodejs-hello-world) example, substituting the [Model](./models/en-US.json) and the [skill code](./lambda/custom/index.js) when called for.

> If you configure the skill through the developer console, remember to enable the Video App interface in the Interfaces of the Build tab.

## Running the Demo
To start the demo say "alexa open video feature demo".  Alexa will speak and start playing the video.
