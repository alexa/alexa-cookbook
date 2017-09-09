# Build An Alexa Recipe Skill
[![Voice User Interface](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-locked._TTH_.png)](../voice-user-interface)[![Lambda Function](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-on._TTH_.png)](../Lambda-Function)[![Connect VUI to Code](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-off._TTH_.png)](../connect-vui-to-code)[![Testing](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-off._TTH_.png)](../testing)[![Customization](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-off._TTH_.png)](../customization)[![Publication](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-off._TTH_.png)](../publication)

[Click Here](../README.md) to return to the Recipe guide.

## Setting Up A Lambda Function Using Amazon Web Services

In the [first step of this guide](../voice-user-interface), we built the Voice User Interface (VUI) for our Alexa skill.  On this page, we will be creating a Lambda function using [Amazon Web Services](http://aws.amazon.com).  You can [read more about what a Lambda function is](http://aws.amazon.com/lambda), but for the purposes of this guide, what you need to know is that Lambda is where our code lives.  When a user asks Alexa to use our skill, it is our Lambda function that interprets the appropriate interaction, and provides the conversation back to the user.

1.  **Go to http://aws.amazon.com and sign in to the console.** If you don't already have an account, you will need to create one.  [Check out this quick walkthrough for setting up a new AWS account](/set-up-aws.md).

    <a href="https://console.aws.amazon.com/console/home" target="_new"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-1-sign-in-to-the-console._TTH_.png" /></a>

2.  **Choose "Services" at the top of the screen, and type "Lambda" in the search box.**  You can also find it in the list of services.  It is in the "Compute" section.

    <a href="https://console.aws.amazon.com/lambda/home" target="_new"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-2-services-lambda._TTH_.png" /></a>

3.  **Check your AWS region.** Lambda only works with the Alexa Skills Kit in two regions: US East (N. Virginia) and EU (Ireland).  Make sure you choose the region closest to your customers.

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-3-check-region._TTH_.png"/>

4.  **Click the "Create a Lambda function" button.** It should be near the top of your screen.

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-4-create-a-lambda-function._TTH_.png" />

5.  **Choose the blueprint named "alexa-nodejs-template".** We have created a blueprint as a shortcut to getting everything set up for your skill.  It adds the alexa-sdk to your Lambda function so that you don't have to upload it yourself.

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/fact/2-5-blueprint._TTH_.png" />  <!--TODO: THIS IMAGE NEEDS TO BE CUSTOMIZED FOR YOUR SKILL TEMPLATE. -->

6.  **Configure your trigger.** There are many different AWS services that can trigger a Lambda function, but for the purposes of this guide, we need to select "Alexa Skills Kit."  If you don't see Alexa Skills Kit in the list, jump back to step #3 on this page.

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-6-configure-your-trigger._TTH_.png" />

    Once you have selected Alexa Skills Kit, click the **Next** button.

7.  **Configure your function.** This screen is where we will enter the important parts of our Lambda function.  These values will only ever be visible to you, but make sure that you name your function something meaningful.  "BreakfastSandwich" is sufficient if you don't have another idea for a name.

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-7-configure-your-function._TTH_.png" />

8.  **Paste the provided code into the Lambda function code box.**  We have provided the code for this skill on [GitHub](../../src/index.js).  Simply delete the contents of the code box, and paste the contents of the new code.

9.  **Set up your Lambda function role.**  If you haven't done this before, we have a [detailed walkthrough for setting up your first role for Lambda](https://github.com/alexa/skill-sample-nodejs-fact/blob/master/lambda-role.md).  If you have done this before, you only need to set your **Existing role** value to "lambda_basic_execution."

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-9-lambda-function-role._TTH_.png" />

10. **For this guide, you can skip all of the Advanced settings.**  You can just click the **Next** button to move to the Review screen.

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-10-next-button._TTH_.png" />

11. **The Review screen is just a summary of your choices.  Click the Create Function bottom in the bottom left corner.**

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-11-create-function-button._TTH_.png" />  

12. **As a final step, copy the ARN value from the top right corner of the screen.** You will need this value in the next section of this guide.

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/fact/2-12-copy-ARN._TTH_.png" />  <!--TODO: THIS IMAGE NEEDS TO BE CUSTOMIZED FOR YOUR SKILL TEMPLATE. -->

<br/><br/>
<a href="../connect-vui-to-code"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_next_connect_vui_to_code._TTH_.png"/></a>

<img height="1" width="1" src="https://www.facebook.com/tr?id=1847448698846169&ev=PageView&noscript=1"/>
