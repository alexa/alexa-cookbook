# Alexa List Events Project

In the list sample project. We'll cover integration of a skill with SMAPI

## What You Will Learn
*  [AWS Lambda](http://aws.amazon.com/lambda)
*  [Alexa Skills Kit (ASK)](https://developer.amazon.com/alexa-skills-kit)
*  [SMAPI](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/ask-cli-intro)
*  Lists for Alexa Skills

## What You Will Need
*  [Amazon Developer Portal Account](http://developer.amazon.com)
*  [Amazon Web Services Account](http://aws.amazon.com/)
*  [ASK CLI](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/quick-start-alexa-skills-kit-command-line-interface)
*  [NPM](https://www.npmjs.com/get-npm)
*  The sample code on [GitHub](https://github.com/Alexa/alexa-cookbook/context/skill-events).

## What your skill will do
Customers can add items to their Alexa lists using their voice or through the Alexa app. Your skill will subscribe to the `AlexaHouseholdListEvent.ItemsCreated`, `AlexaHouseholdListEvent.ItemsUpdated` and `AlexaHouseholdListEvent.ItemsDeleted` events. Your skill will call the List API to retrieve the list item details and log them to the console.

When a user enables a skill within the Alexa app, the user will be prompted to provide consent for list read permissions. This is so your skill can retrieve list item details when a user add, updates or removes an item from one of their Alexa lists. This code can be extended to sync with your list service so that a customer's Alexa list will stay in sync with your service.

## Prerequisites

The ASK Command Line Interface (ASK CLI) is a tool for you to manage your Alexa skills and related AWS Lambda functions.  You'll need to [install and initialize the ASK CLI](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/command-line-usage-instructions)

Ensure that you've set up both your AWS user account and Amazon Developer account with the ASK CLI

## Deploying your skill

From the terminal on your computer

1. **Clone the alexa cookbook**

    `git clone https://github.com/alexa/alexa-cookbook.git`

2. **Navigate to the skill-events skill folder and install dependencies**

    `cd alexa-cookbook/context/skill-events/lambda/custom` on Linux/Unix

    or

    `cd alexa-cookbook\context\skill-events\lambda\custom` on Windows

    To install the skill's dependencies, run `npm install`

3. **Deploy the skill**

    Move back to the root directory of the skill

    `cd ../..` on Linux/Unix

    or

    `cd ..\..` on Windows

    Then run `ask deploy` (Note: we're using the default profile here, if you've specified a profile name you'll need to use the `-p, --profile <profile>  ask cli profile` option)

    ```
    > ask deploy
    -------------------- Update Skill Project --------------------
    Skill Id: ######
    Skill deployment finished.
    Model deployment finished.
    Lambda deployment finished.```

    This will create a lambda function, create the skill model and link the skill to your lambda function

4.  **Go to http://aws.amazon.com and sign in to the console.**

    <a href="https://console.aws.amazon.com/console/home" target="_new"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-1-sign-in-to-the-console._TTH_.png" /></a>

5.  **Click "Services" at the top of the screen, and type "Lambda" in the search box.**  You can also find Lambda in the list of services.  It is in the "Compute" section.

    <a href="https://console.aws.amazon.com/lambda/home" target="_new"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-2-services-lambda._TTH_.png" /></a>

6. **Click on your function and look for the ARN value from in the top right corner. Copy this value for use in the next section of the guide.**

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/2-12-copy-ARN._TTH_.png" />

7. **Modify Skill Manifest to subscribe to skill events.** Add the following JSON to the skill Manifest, found in the `context/skill-events` folder. Include it as a child of the skill manifest object.

```
    "skillManifest" : {
        "events" : {
            "endpoint": {
                "uri": "### TODO: FILL IN WITH YOUR LAMBDA ARN ###"
            },
            "subscriptions": [
            {
                "eventName": "SKILL_ENABLED"
            },
            {
                "eventName": "SKILL_DISABLED"
            },
            {
                "eventName": "SKILL_PERMISSION_ACCEPTED"
            },
            {
                "eventName": "SKILL_PERMISSION_CHANGED"
            },
            {
                "eventName": "SKILL_ACCOUNT_LINKED"
            },
            {
                "eventName": "ITEMS_CREATED"
            },
            {
                "eventName": "ITEMS_UPDATED"
            },
            {
                "eventName": "ITEMS_DELETED"
            }
            ]
        }
    }
```


8. **Register skill events to your Skill's ARN**

   Replace the `TODO : FILL IN YOUR LAMBDA ARN` with the ARN you retrieved on Step 6. Your skill manifest should now look like this:
```
{
  "skillManifest": {
    "publishingInformation": {
      "locales": {
        "en-US": {
          "summary": "Sample Short Description",
          "examplePhrases": [
            "Alexa open hello world",
            "Alexa tell hello world I am Jeff",
            "Alexa tell hello world my name is Peter"
          ],
          "name": "household-list",
          "description": "Sample Full Description"
        }
      },
      "isAvailableWorldwide": true,
      "testingInstructions": "Sample Testing Instructions.",
      "category": "EDUCATION_AND_REFERENCE",
      "distributionCountries": []
    },
    "apis": {
      "custom": {
        "endpoint": {
          "sourceDir": "lambda/custom"
        }
      },
      "householdList" : {
      }
    },
    "permissions": [
      { "name": "alexa::household:lists:read" }
    ],
    "events": {
     "endpoint": {
        "uri": "### TODO: FILL IN WITH YOUR LAMBDA ARN ###"
     },
     "subscriptions": [
        {
          "eventName": "SKILL_ENABLED"
        },
        {
          "eventName": "SKILL_DISABLED"
        },
        {
          "eventName": "SKILL_PERMISSION_ACCEPTED"
        },
        {
          "eventName": "SKILL_PERMISSION_CHANGED"
        },
        {
          "eventName": "SKILL_ACCOUNT_LINKED"
        },
        {
          "eventName": "ITEMS_CREATED"
        },
        {
          "eventName": "ITEMS_UPDATED"
        },
        {
          "eventName": "ITEMS_DELETED"
        }
      ]
    },
    "manifestVersion": "1.0"
  }
}
```

9. **Deploy Updated Skill Manifest**

    Run `ask deploy` again to update your skill's manifest and subcribe your skill to list and skill lifecyle events

    ```
    > ask deploy
    -------------------- Update Skill Project --------------------
    Skill Id: ######
    Skill deployment finished.
    Model deployment finished.
    Lambda deployment finished.```

10. **Test your Skill**

    The Service Simulator is not a device, so it cannot be used to test household list events. Use an actual device for testing by saying
    `Alexa, add bread to my shopping list`.

    If you look in the cloudwatch logs -- you'll see that the event was received by your skill:

    `2017-08-30T06:33:14.989Z	1925b897-8d4d-11e7-bef4-e3bc239a4867	bread was added to list {listId}`

- **Next Steps!**

    - Modify the handlers in the skill `lambda/custom/index.js` to integrate with your list service.
    - Leverage the `AlexaSkillEvent.SkillAccountLinked` event to enable a two-way sync between your list service and an Alexa list.
