# Display Interface Skill for Echo Show

# Display Directive Demo
This demos how the List Templates and Body Templates works on devices with display capability. There are two templates for displaying lists, one that scrolls vertically and one horizontally. There are five body templates, one for each U.S. state held in the skill's data object.  

When you begin this skill it will display the data we have in our skill in a vertical format. Asking for the horizontal list will then display a horizontally-scrolling list. Asking for any of the five U.S. states on the list will display info about that state, each using a unique body template.

## What You Will Need
*  [Amazon Developer Account](http://developer.amazon.com/alexa)
*  [Amazon Web Services Account](http://aws.amazon.com/)
*  The sample code on [GitHub](https://github.com/alexa/alexa-cookbook/tree/master/feature-demos/skill-demo-display-directive/listTemplate/).

## Setting Up the Demo
This folder contains the interaction model and skill code.  It is structured to make it easy to deploy if you have the ASK CLI already setup.  If you would like to use the Developer Portal, you can follow the steps outlined in the [Hello World](https://github.com/alexa/skill-sample-nodejs-hello-world) example, substituting the [Model](./models/en-US.json) and the [skill code](./lambda/custom/index.js) when called for.

## Exploring

Once enabled, try saying different state names on different devices. Each state uses a different body template so you know what to expect with the examples. Look at the code to see each Template that's in use and learn how you can use these different options in your own skills.
