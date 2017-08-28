#### Ingredients

1. [Setup Thing](./step-1.md#title) || 2. [Create The Skill](./step-2.md#title) || 3. [Create The Lambda Function](./step-3.md#title) || 4. [Connect Skill To Lambda & Add IOT Permissions](./step-4.md#title) || 5. [Webapp-Thing](./step-5.md#title)

## Connecting Your Voice User Interface To Your Lambda Function

In the [first step](./step-2.md#title) of this guide, we created a voice user interface for the intents and utterances we expect from our users.  In the [second step](./step-3.md#title), we created a Lambda function that contains all of our logic for the skill.  On this page, we need to connect those two pieces together.

1.  **Go back to the [Amazon Developer Portal](https://developer.amazon.com/edw/home.html#/skills/list) and select your skill from the list.** You may still have a browser tab open if you started at the beginning of this tutorial.

2.  **Open the "Configuration" tab on the left side.**

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/3-2-configuration-tab._TTH_.png" />

3.  **Select the "AWS Lambda ARN" option for your endpoint.** You have the ability to host your code anywhere that you would like, but for the purposes of simplicity and frugality, we are using AWS Lambda. ([Read more about Hosting Your Own Custom Skill Web Service](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/developing-an-alexa-skill-as-a-web-service).)  With the AWS Free Tier, you get 1,000,000 free requests per month, up to 3.2 million seconds of compute time per month. Learn more at https://aws.amazon.com/free/.  In addition, Amazon now offers [AWS Promotional Credits for developers who have live Alexa skills that incur costs on AWS related to those skills](https://developer.amazon.com/alexa-skills-kit/alexa-aws-credits).

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/3-3-aws-lambda-arn._TTH_.png" />

4.  **Select "North America" or "Europe" as your geographical region.** IMPORTANT: Make sure you select the same region that you created your Lambda in.  Remember, Alexa skills using AWS Lambda can only run in N. Virginia (North America) and Ireland (Europe).

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/3-4-choose-region._TTH_.png" />

5.  **Paste your Lambda's ARN (Amazon Resource Name) into the textbox provided.** It should look similar to the screenshot above.

6.  **Leave "Account Linking" set to "No."** For this skill, we won't be using Account Linking, but you can learn more about [Linking an Alexa User with a User in Your System.](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/linking-an-alexa-user-with-a-user-in-your-system)


#### Add IOT permissions to your Lambda IAM Role

1. Within the AWS IAM console, locate and click on the role used by your Lambda function, such as ```lambda_basic_execution```
1. Click the blue button to add ```AWSIoTFullAccess``` policy. to this role.

```AWSIoTFullAccess``` will work fine for testing, however in a production setting, you would want to define a finer-grained set of limited permissions for your Lambda function role.

The following IAM Policy can be modified and attached to your Lambda function's IAM role to only allow updating a specific Thing.
See the [IAM Policies](./IAM_POLICIES.md) page for more details.


```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "iot:UpdateThingShadow"
      ],
      "Resource":["arn:aws:iot:eu-west-1:589662380000:thing/thing1"],
    }
  ]
}
```

 *You can learn more from the [Getting Started with AWS IOT](https://aws.amazon.com/iot-platform/getting-started/) documentation.*


#### Test your skill

* Open your skill and say 'hello'.  Verify the response is as expected.
* Say something like "reisen nach Frankfurt" or "go to Belfast" or "go to Berlin".


#### Add the dynamic web page

 * Create the single-page by going to [Part 5](./step-5.md#title)



Back to the [Home Page](./README.md#title)
