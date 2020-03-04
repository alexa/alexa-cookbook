# List Events Demo
This demos how events can be sent to your skill when there are changes in a user's Alexa lists.  You might want to keep those lists in sync with lists in your app or on your website.

In this demo, basic information from each skill, list and list item event is logged in CloudWatch Logs.  The events are triggered when changes are made to the Alexa lists (e.g. adding an item to your shopping list).

## What You Will Need
*  [Amazon Developer Account](http://developer.amazon.com/alexa)
*  [Amazon Web Services Account](http://aws.amazon.com/)
*  The sample code on [GitHub](https://github.com/alexa/alexa-cookbook/tree/master/feature-demos/skill-demo-list-events/).
*  The [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html) installed and configured.

## Setting Up the Demo
This folder contains the skill manifest, and child folders contain the skill code.  The ASK CLI is required in order to already setup this skill.

### Clone the repo
First clone or download this repo.  At the command line, switch to the skill-demo-list-events directory.

### Create the Lambda Function
In order to create the skill, you will need the Lambda function's ARN.  To create it:

1. Open the [Lambda console](https://console.aws.amazon.com/lambda/home).  Ensure you are in the us-east-1 (N. Virginia) or other supported region.
1. Click [here](https://console.aws.amazon.com/lambda/home?#/create/app?applicationId=arn:aws:serverlessrepo:us-east-1:173334852312:applications/alexa-skills-kit-nodejs-factskill) to start the creation of a Lambda function.  The fact skill will be used as a template.
1. Update the application parameters.
1. Click **Deploy**.
1. Wait until the banner updates to display **Application successfully deployed**.  In the Resource list, click on the Lambda function (it's the only link in the list).
1. Copy the code from [index.js](./lambda/custom/index.js) and paste it into the Lambda function's code editor.  Click **Save**.

### Create the Skill
1. Copy the ARN from the upper right corner of the page, e.g. arn:aws:lambda:us-east-1:123412341234:function:ask-list-events-demo-default
1. Open the **skill.json** file and replace the placeholder value.
```
  "endpoint": {
    "uri": "arn:aws:lambda:us-east-1:123412341234:function:ask-list-events-demo-default"
  },
```
Save the file and then issue the ``ask deploy`` command in the project root folder (the one with skill.json).  Even if the deployment is successful, you will see an error in the output.  A List-type skill cannot be enabled for testing, which is automatically attempted after the skill is successfully deployed.  You can safely ignore this message:
```text
Error code: 403
{
  "message": "You can only enable custom skills."
}
```

### Enable the Skill
Once the skill is setup, you will need to go to your Alexa app to grant permission for the skill to access your lists.
1. Go to the Alexa on your mobile device (or point your browser to https://alexa.amazon.com).
1. Navigate to the Skills section.
1. Click on **Your Skills** and select **Dev Skills**.
1. Scroll until you find the **Demo - skill and list events** skill.
1. Enable the skill if it is not, otherwise click **Settings**, then **Manage Permissions**.
1. Enable the list permissions by sliding the toggle to the on position, and then click **Save Permissions**.

## Exploring the List Events Demo
This skill can only be configured using the CLI, so you will be unable to view it from within the Developer Console.  You can, however, delete it from there.  To explore the configuration, explore the skill.json file.

## Running the Demo
Once enabled, adding items to your lists, adding new lists and completing items on your lists will generate events.  Open the AWS Console and navigate to the CloudWatch Logs section and view the logs associated with your skill's Lambda function.  It is most easy to access the logs from Lambda function page.  Click on the **Monitoring** tab, then click on one of the **Jump to Logs** links.  Examine the logs and you will see information about the events which have been generated.