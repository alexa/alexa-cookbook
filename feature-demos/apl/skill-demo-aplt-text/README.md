# APLT Demo

## What You Will Need
*  [Amazon Developer Account](http://developer.amazon.com/alexa)
*  The sample code on [GitHub](https://github.com/alexa/alexa-cookbook/tree/master/feature-demos/skill-demo-aplt-text).

## Setting Up the Demo
If you use Alexa hosted, follow the steps:

1. Create a new Alexa Hosted skill using Node.JS
2. Copy paste the file models/en-US.json into the json editor of the interaction model. 
3. Enable Alexa Presentation Language under Interfaces. 
4. Build your interaction model and skill changes.
5. Go to the *Code* tab. Copy paste the index.js into the index.js file already in your hosted environment. (SkillCode > lambda > index.js)
6. Create a new file, "apltDocument.json" in the *Code* tab and copy the code repo's apltDocument.json into your new file.
7. Deploy and enjoy!

## Running the Demo
To start the demo say "alexa open text demo". It will present the APLT document on the device if you are using an APLT compatible device, such as the Echo Dot with Clock. Otherwise, you will be asked to run the skill on a compatible device. 
