# Dynamic Entities Demo

## What You Will Need
*  [Amazon Developer Account](http://developer.amazon.com/alexa)
*  (Optional) [Amazon Web Services Account](http://aws.amazon.com/)
*  The sample code on [GitHub](https://github.com/alexa/alexa-cookbook/tree/master/feature-demos/skill-demo-dynamic-entities/).

## Setting Up the Demo
This folder contains the interaction model and skill code.  It is structured to make it easy to deploy if you have the ASK CLI already setup.  If you would like to use the Developer Portal, you can follow the steps outlined in the [Hello World](https://github.com/alexa/skill-sample-nodejs-hello-world) example, substituting the [Model](./models/en-US.json) and the [skill code](./lambda/custom/index.js) when called for. (Remember to also copy the localisation.js file too!)

## Running the Demo
To start the demo say "alexa open dynamic entities demo".  Start by adding dynamic entities by saying e.g. "add saturn", "add venus", etc. When you're done adding entities you can say "check" and the entity name to verify it has been incorporated as a dynamic entity, e.g. you can say "check saturn" and Alexa will tell you if it's a static or a dynamic entity (an unmatched entity will trigger the fallback intent).
