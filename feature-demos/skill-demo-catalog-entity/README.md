# Catalog Entities Demo

## What You Will Need
*  [Amazon Developer Account](http://developer.amazon.com/alexa)
*  [Amazon Web Services Account](http://aws.amazon.com/)
*  The sample code on [GitHub](https://github.com/alexa/alexa-cookbook/tree/master/feature-demos/skill-demo-catalog-entity/).
*  A catalog of [entities](https://github.com/alexa/alexa-cookbook/tree/master/feature-demos/skill-demo-catalog-entity/ingredients.json)

## Setting Up the Demo
This folder contains the interaction model and skill code.  It is structured to make it easy to deploy if you have the ASK CLI already setup.  If you would like to use the Developer Portal, you can follow the steps outlined in the [Hello World](https://github.com/alexa/skill-sample-nodejs-hello-world) example, substituting the [Model](./models/en-US.json) and the [skill code](./lambda/custom/index.js) when called for.

## Running the Demo
To start the demo say "alexa open recipe app".  It will tell you what's in your ingredient list.  Say "add {ingredient} to my ingredient list" to recognize and pull an entity for the catalog and move it into the ingredient list


###