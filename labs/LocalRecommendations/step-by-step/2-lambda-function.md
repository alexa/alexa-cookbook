# Build An Alexa Local Recommendations Skill
[Voice User Interface](../step-by-step/1-voice-user-interface.md) || [Lambda Function](../step-by-step/2-lambda-function.md) || [Connect VUI to Code](../step-by-step/3-connect-vui-to-code.md) || [Testing](../step-by-step/4-testing.md) || [Customization](../step-by-step/5-customization.md) || [Intents and Slots](../step-by-step/6-intents-slots.md) || [Smart Recommendations](../step-by-step/7-smart-recommendations.md) || [Publication](../step-by-step/10-publication.md)



<!--<a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/1-voice-user-interface.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-locked._TTH_.png" /></a><a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/2-lambda-function.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-on._TTH_.png" /></a><a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/3-connect-vui-to-code.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-off._TTH_.png" /></a><a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/4-testing.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-off._TTH_.png" /></a><a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/5-customization.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-off._TTH_.png" /></a><a href="https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/10-publication.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-off._TTH_.png" /></a>-->

## Setting Up A Lambda Function Using Amazon Web Services

In the [first step of this guide](../step-by-step/1-voice-user-interface.md), we built the Voice User Interface (VUI) for our Alexa skill.  On this page, we will be creating an AWS Lambda function using [Amazon Web Services](http://aws.amazon.com).  You can [read more about what a Lambda function is](http://aws.amazon.com/lambda), but for the purposes of this guide, what you need to know is that AWS Lambda is where our code lives.  When a user asks Alexa to use our skill, it is our AWS Lambda function that interprets the appropriate interaction, and provides the conversation back to the user.

1.  **Go to http://aws.amazon.com and sign in to the console.** If you don't already have an account, you will need to create one.  [If you don't have an AWS account, check out this quick walkthrough for setting it up](/set-up-aws.md).

    <a href="https://console.aws.amazon.com/console/home" target="_new"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-1-sign-in-to-the-console._TTH_.png" /></a>

2.  **Click "Services" at the top of the screen, and type "Lambda" in the search box.**  You can also find Lambda in the list of services.  It is in the "Compute" section.

    <a href="https://console.aws.amazon.com/lambda/home" target="_new"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-2-services-lambda._TTH_.png" /></a>

3.  **Check your AWS region.** AWS Lambda only works with the Alexa Skills Kit in two regions: US East (N. Virginia) and EU (Ireland).  Make sure you choose the region closest to your customers.

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-3-check-region._TTH_.png"/>

4.  **Click the "Create a Lambda function" button.** It should be near the top of your screen.  (If you don't see this button, it is because you haven't created a Lambda function before.  Click the blue "Get Started" button near the center of your screen.)

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-4-create-a-lambda-function._TTH_.png" />

5.  **Choose the blueprint named "alexa-skill-kit-sdk-factskill".** We have created a blueprint as a shortcut to getting everything set up for your skill. You can search for a blueprint using the provided search box.  This blueprint adds the alexa-sdk to your Lambda function so that you don't have to upload it yourself.

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/fact/2-5-blueprint._TTH_.png" />  <!--TODO: THIS IMAGE NEEDS TO BE CUSTOMIZED FOR YOUR SKILL TEMPLATE. -->

6.  **Configure your trigger.** Click in the dashed box, and select Alexa Skills Kit from the list.  If you don't see Alexa Skills Kit in the list, jump back to step #3 on this page.

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-6-configure-your-trigger._TTH_.png" />

    Once you have selected Alexa Skills Kit, click the **Next** button.

7.  **Configure your function.** This screen is where we will enter the important parts of our Lambda function.  These values will only ever be visible to you, but make sure that you name your function something meaningful.  "QuizGame" is sufficient if you don't have another idea for a name.

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-7-configure-your-function._TTH_.png" />

8.  **Copy and paste the [provided code](https://github.com/voicehacks/setup-local-recommendations/blob/master/src/index.js) into the Lambda function code box.**  We have provided the code for this skill on [GitHub](../src/index.js).  Delete the contents of the code box, and paste the contents of the new code.

9.  **Set up your Lambda function role.**  If you haven't done this before, we have a [detailed walkthrough for setting up your first role for Lambda](../lambda-role.md).  If you have done this before, set your **Existing role** value to "lambda_basic_execution."

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-9-lambda-function-role._TTH_.png" />

10. **For this guide, you can skip all of the Advanced settings.**  Click the **Next** button to move to the Review screen.

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-10-next-button._TTH_.png" />

11. **The Review screen is a summary of your choices.  Click Create Function in the bottom left corner.**  You will need to scroll down to find **Create Function.**

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-11-create-function-button._TTH_.png" />

12. **After you create the function, the ARN value appears in the top right corner. Copy this value for use in the next section of the guide.**

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/2-12-copy-ARN._TTH_.png" />  <!--TODO: THIS IMAGE NEEDS TO BE CUSTOMIZED FOR YOUR SKILL TEMPLATE. -->

<br/><br/>
<a href="../step-by-step/3-connect-vui-to-code.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_next_connect_vui_to_code._TTH_.png"/></a>

<img height="1" width="1" src="https://www.facebook.com/tr?id=1847448698846169&ev=PageView&noscript=1"/>
