# Delete Persistent Attributes Demo

This feature demo use the SkillDisabled skill event to trigger the deletion of data persisted for the user.

## What You Will Need
*  [Amazon Developer Account](http://developer.amazon.com/alexa)
*  [Amazon Web Services Account](http://aws.amazon.com/)
*  The sample code on [GitHub](https://github.com/alexa/alexa-cookbook/tree/master/feature-demos/skill-demo-delete-persistent-attributes).
*  The [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html) installed and configured.

## Setting Up the Demo

These instructions assume you are using the ASK CLI connected to AWS Lambda for the backend code. If you are using Alexa-Hosted skills or another tool, you should be able to adapt the instructions, however the skill event configuration must be done using the ASK CLI.

1. Clone or download this repo.  At the command line, switch to the skill-demo-delete-persistent-attributes directory.
1. Deploy the skill using the `ask deploy` command.
1. Once deployed, open the skill.json file.
1. Add the `events` configuration as a child of the **manifest** node, replacing the **uri** value with your lambda function's ARN (which you can copy from the **apis >> endpoint >> custom >> uri** value.):
    ```
    "events": {
      "endpoint": {
        "uri": "arn:aws:lambda:us-west-2:123412341234:function:ask-feature-demo-delete-persistent-attributes"
      },
      "subscriptions": [
        {
          "eventName": "SKILL_DISABLED"
        }
      ]
    },
    ```
1. Save and redeploy the skill. To just deploy the skill configuration, use the `--target skill` option.
1. Navigate to the (AWS IAM console)[https://console.aws.amazon.com/iam] and grant Amazon DynamoDB permissions to the AWS Lambda function's execution role.

## Running the Demo

To see this in action, open the DynamoDB console to view the data in the data table (**delete-persistent-attributes-demo**).  Toggle the state of the skill using:
```
ask api enable-skill --skill-id amzn1.ask.skill.abc...
ask api disable-skill --skill-id amzn1.ask.skill.abc...
```
While the skill is enabled, use the `ask dialog`, `ask simulate`, a device or the developer console simulator to open the skill using `open delete attributes demo`. The skill will save the current time as the last access time, tell you the time since your previous time opening the skill (if it isn't your first time), and then exit. Repeat if you like, then look in the data table. Then disable the skill and look back at the data table - your data should be gone!

\###