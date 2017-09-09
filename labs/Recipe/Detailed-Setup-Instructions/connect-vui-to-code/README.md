# Build An Alexa Recipe Skill

[![Voice User Interface](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-locked._TTH_.png)](../voice-user-interface)[![Lambda Function](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-locked._TTH_.png)](../Lambda-Function)[![Connect VUI to Code](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-on._TTH_.png)](../connect-vui-to-code)[![Testing](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-off._TTH_.png)](../testing)[![Customization](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-off._TTH_.png)](../customization)[![Publication](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-off._TTH_.png)](../publication)


[Click Here](../README.md) to return to the Recipe guide.

## Connecting Your Voice User Interface To Your Lambda Function

On [page #1](../voice-user-interface) of this guide, we created a voice user interface for the intents and utterances we expect from our users.  On [page #2](../Lambda-Function), we created a Lambda function that contains all of our logic for the skill.  On this page, we need to connect those two pieces together.

1.  **Go back to the [Amazon Developer Portal](https://developer.amazon.com/edw/home.html#/skills/list) and select your skill from the list.** You may still have a browser tab open if you started at the beginning of this tutorial.

2.  **Open the "Configuration" tab on the left side.**

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/3-2-configuration-tab._TTH_.png" />

3.  **Select the "AWS Lambda ARN" option for your endpoint.** You have the ability to host your code anywhere that you would like, but for the purposes of simplicity and frugality, we are using AWS Lambda. ([Read more about Hosting Your Own Custom Skill Web Service](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/developing-an-alexa-skill-as-a-web-service).)  With the AWS Free Tier, you get 1,000,000 free requests per month, up to 3.2 million seconds of compute time per month. Learn more at https://aws.amazon.com/free/.  In addition, Amazon now offers [AWS Promotional Credits for developers who have live Alexa skills that incur costs on AWS related to those skills](https://developer.amazon.com/alexa-skills-kit/alexa-aws-credits).

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/3-3-aws-lambda-arn._TTH_.png" />

4.  **Select "North America" or "Europe" as your geographical region.** IMPORTANT: Make sure you select the same region that you created your Lambda in.  Remember, Alexa skills using AWS Lambda can only run in N. Virginia (North America) and Ireland (Europe).

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/3-4-choose-region._TTH_.png" />

5.  **Paste your Lambda's ARN (Amazon Resource Name) into the textbox provided.** It should look similar to the screenshot above.

6.  **Leave "Account Linking" set to "No."** For this skill, we won't be using Account Linking, but you can learn more about [Linking an Alexa User with a User in Your System.](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/linking-an-alexa-user-with-a-user-in-your-system)

7.  **Click the "Next" button to continue to page #4 of this guide.**

    [![Testing](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/3-7-next-button._TTH_.png)](https://github.com/alexa/skill-sample-nodejs-fact/blob/master/step-by-step/4-testing.md)

<br/><br/>
<a href="../testing"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_next_testing._TTH_.png" /></a>

<img height="1" width="1" src="https://www.facebook.com/tr?id=1847448698846169&ev=PageView&noscript=1"/>
