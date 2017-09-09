# VUI Testing Tool
[![Voice User Interface](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-locked._TTH_.png)](https://github.com/alexa/alexa-cookbook/blob/master/tools/VUI%20Testing%20Tool/step-by-step/1-voice-user-interface.md)[![Lambda Function](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-locked._TTH_.png)](https://github.com/alexa/alexa-cookbook/blob/master/tools/VUI%20Testing%20Tool/step-by-step/2-lambda-function.md)[![Connect VUI to Code](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-on._TTH_.png)](https://github.com/alexa/alexa-cookbook/blob/master/tools/VUI%20Testing%20Tool/step-by-step/3-connect-vui-to-code.md)[![Testing](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-off._TTH_.png)](https://github.com/alexa/alexa-cookbook/blob/master/tools/VUI%20Testing%20Tool/step-by-step/4-testing.md)

## Connecting Your Voice User Interface To Your Lambda Function

On [step #1](https://github.com/Alexa/alexa-cookbook/blob/master/tools/VUI-Testing/step-by-step/1-voice-user-interface.md) of this guide, we created a voice user interface for the intents and utterances we expect from our users.  On [step #2](https://github.com/alexa/alexa-cookbook/blob/master/tools/VUI-Testing/step-by-step/2-lambda-function.md), we created a Lambda function that contains all of our logic for the skill.  On this page, we need to connect those two pieces together.

1.  **Go back to the [Amazon Developer Portal](https://developer.amazon.com/edw/home.html#/skills/list) and select your skill from the list.** You may still have a browser tab open if you started at the beginning of this tutorial.

2.  **Open the "Configuration" tab on the left side.**

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/3-2-configuration-tab._TTH_.png" />

3.  **Select the "AWS Lambda ARN" option for your endpoint.** You have the ability to host your code anywhere that you would like, but for the purposes of simplicity and frugality, we are using AWS Lambda. ([Read more about Hosting Your Own Custom Skill Web Service](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/developing-an-alexa-skill-as-a-web-service).)  With the AWS Free Tier, you get one million AWS Lambda and up to 750 hours of Amazon Elastic Compute Cloud (Amazon EC2) compute time per month at no charge. Learn more at https://aws.amazon.com/free/.  [AWS Promotional Credits are also available for developers who incur AWS related costs to their published skills](https://developer.amazon.com/alexa-skills-kit/alexa-aws-credits).

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/3-3-aws-lambda-arn._TTH_.png" />

4.  **Select "North America" or "Europe" as your geographical region.** IMPORTANT: Make sure you select the same region that you created your Lambda in.  Remember, Alexa skills using AWS Lambda can only run in N. Virginia (North America) and Ireland (Europe).

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/3-4-choose-region._TTH_.png" />

5.  **Paste your Lambda's ARN (Amazon Resource Name) into the textbox provided.** it should be everything after the "ARN-" so it's: ```arn:aws:lambda:us-east:xxxxxxxxxxxx:function:YourFunctionName```
6. **Click the "Next" button** to continue to page #4 of this guide.

    <a href="4-testing.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/3-7-next-button._TTH_.png" /></a>

    **Leave "Account Linking" set to "No."** For this skill, we won't be using Account Linking, but you can learn more about [Linking an Alexa User with a User in Your System.](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/linking-an-alexa-user-with-a-user-in-your-system)

    **Leave Permissions for the Device Address unchecked** This sample does not need to ask customers for permission to get the [Device address](https://github.com/alexa/skill-sample-node-device-address-api/blob/master/README.md)


[![Next step button](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_next_testing._TTH_.png)](https://github.com/alexa/alexa-cookbook/blob/master/tools/VUI%20Testing%20Tool/step-by-step/4-testing.md)
