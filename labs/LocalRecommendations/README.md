# Build An Alexa Local Recommendations Skill
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/header._TTH_.png" />


[Voice User Interface](step-by-step/1-voice-user-interface.md) || [Lambda Function](step-by-step/2-lambda-function.md) || [Connect VUI to Code](step-by-step/3-connect-vui-to-code.md) || [Testing](step-by-step/4-testing.md) || [Customization](step-by-step/5-customization.md) || [Intents and Slots](step-by-step/6-intents-slots.md) || [Smart Recommendations](step-by-step/7-smart-recommendations.md) || [Publication](step-by-step/10-publication.md)


<!--<a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/1-voice-user-interface.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-off._TTH_.png" /></a><a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/2-lambda-function.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-off._TTH_.png" /></a><a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/3-connect-vui-to-code.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-off._TTH_.png" /></a><a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/4-testing.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-off._TTH_.png" /></a><a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/5-customization.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-off._TTH_.png" /></a><a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/10-publication.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-off._TTH_.png" /></a>-->

## What You Will Learn
*  [AWS Lambda](http://aws.amazon.com/lambda)
*  [Alexa Skills Kit (ASK)](https://developer.amazon.com/alexa-skills-kit)
*  Voice User Interface (VUI) Design
*  Skill Certification
*  State Management
* [Speechcons](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference)

## What You Will Need
*  [Amazon Developer Portal Account](http://developer.amazon.com)
*  [Amazon Web Services Account](http://aws.amazon.com/)
*  The sample code on [GitHub](#).
*  Simple graphical editing tool

## What Your Skill Will Do
At some point we all gain some unexpected free time and wonder "What should I do today?". Whether going to a local restaurant or coffeehouse, checking out the local library, or just staying inside if the weather is bad, some suggestions are almost always welcome. Especially when those suggestions come from an individual who knows the area very well.

You can now bring that experience to Alexa using our new local recommendations template. Today you will provide the city and the places to visit in that city, and Alexa will dynamically build a recommendation for you. In the guide, Alexa will give recommendations like:
*  "For breakfast, try this, Zeke's place."
*  "Seaport Grille is located at 6 Rowe Square."
*  "Try whale watching, which is 8 miles away. Have fun!"

If you’re in the US, we've also included the new [speechcons](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference) feature for Alexa skill development. Speechcons are special words and phrases that Alexa pronounces more expressively. We use them in this quiz game to let the user know whether they gave a correct or incorrect answer during the quiz.

If you would like to see an example of this skill in action, you can enable the [Gloucester Guide](https://www.amazon.com/Robert-McCauley-Gloucester-Guide/dp/B0736QNPP1/ref=sr_1_5?s=digital-skills&ie=UTF8&qid=1501180976&sr=1-5&keywords=local+guide) from the [Alexa app](http://amazon.com/skills).  You may not get all of the info right away, but you'll definitely get a great feel for what your new local guide could sound like!

### Task 1: Build the Skill

Create your skill using the Lambda code given in [src/index.js](src/index.js) and the [Interaction Model](speech-assets/InteractionModel.json) (We've also included a simple [test file](tests/test.js) for your lambda function).


#### New Skill Builders Path
If you're not familiar with building Alexa skill, click the get started button for a detailed step-by-step guide
<a href="step-by-step/1-voice-user-interface.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_get_started._TTH_.png" /></a>

#### Experienced Skill Builders Path

*1.1 Create a new AWS Lambda function:*
[See also: Detailed Lambda Instructions](step-by-step/2-lambda-function.md)
  1. From [aws.amazon.com](https://aws.amazon.com/)
  1. Choose the **Fact** blueprint template. Tip. remember to choose the N. Virginia region.
  1. Setup "Alexa Skills Kit" as the function trigger.
  1. Name the function. Choose a name for your guide.
  1. Replace the existing code by pasting in the code from [src/index.js](src/index.js).
  1. Set the Lambda function's role ```lambda_basic_execution``` [see also detailed walkthrough for setting up your first role for Lambda](lambda-role.md)
  1. Click "Create Function"

*1.2 Create a new skill*
[See also: Detailed Voice UI Instructions](step-by-step/1-voice-user-interface.md)
  1. Sign in and create a skill at [developer.amazon.com](https://developer.amazon.com/)
  1. Choose an invocation name of your choice. we used ```Gloucester Guide```. You'll want to choose your own location.
  1. Launch "Skill Builder Beta"
  1. Click the Code Editor tab (just below the turqoise Dashboard tab on the top left)
  1. Copy and paste the [speechAssets/InteractionModel.json](speech-assets/InteractionModel.json) contents into the field over the existing text.
  1. Click Save, then click Build
  1. Advance to the Configuration page, choose AWS Lambda ARN, and paste in the ARN from the function you just created. [Detailed configuration Instructions](step-by-step/3-connect-vui-to-code.md)

### Task 2: Customize the Skill to be yours
At this point, you should have a working copy of our Local Recommendations skill.  In order to make it your own, you will need to customize it with data and responses that you create.  [Detailed steps to customize](step-by-step/5-customization.md)

### Extra Credit

#### Set Up Your Dev Environment
So far you've been using the Lambda console IDE or zipping and uploading your code. This is fine for most people. If you prefer using a terminal, configure the [command line interface (CLI)](https://developer.amazon.com/blogs/post/Tx1UE9W1NQ0GYII/Publishing-Your-Skill-Code-to-Lambda-via-the-Command-Line-Interface), to streamline your work flow.

#### Add a New Intent and Slots
Now that you've customized for our city/town, let’s add a feature by adding a new intent that we want our skill to handle. Let’s create an intent so we can ask this skill which sports team plays hockey, baseball, etc. Go into skill builder, create an intent, type a sample utterance, double-click on slot word and define that, then add some code to pull out a slot value and handle the intent and provide a custom response to the user.
[Detailed steps to add an intent and slots](step-by-step/6-intents-slots.md)

#### Add Smart Recommendations - Call an API
When the user says "go outside", the ```GoOutIntent``` intent is called and the code in the GoOutIntent handler block is executed.
This makes an API call over the Internet to a weather service, which returns the weather and current time in your city.

You can enhance the ```GoOutIntent``` handler code (around line 185) to make a relevant activity suggestion to the user.
For example, add logic to decide, based on current time and weather conditions, whether to:
* Go out to a local beach or park
* Recommend a movie theatre or mall
* Attend a scheduled public event happening soon
* Staying home to watch a movie on Amazon Prime
* etc..

[See also: Detailed steps to add smart recommendations](step-by-step/6-intents-slots.md)

#### Publish Your Skill
An important part of learning about a new technology is to release an MVP. Once you've tested your experience well. Go through the process of publishing the skill. Then have friends and family use the skill so you can witness the complete customer experience.

[Detailed steps to publish](step-by-step/10-publication.md)

There is also a monthly promotion for people that publish skills. Depending on the month, you could get a shirt, socks, or a device. Check here for the current [promotion details](https://developer.amazon.com/alexa-skills-kit/alexa-developer-skill-promotion)

<img height="1" width="1" src="https://www.facebook.com/tr?id=1847448698846169&ev=PageView&noscript=1"/>
