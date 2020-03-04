# Converting Alexa Skills to Use Node.js v2 SDK
The purpose of this guide is to convert a skill from using the V1 SDK to the V2 SDK.  The V1 Skill Adapter will allow a skill to use the V2 SDK without any changes.  This guide will help you convert your skill to use the V2 SDK directly.  This will allow you to take full advantage of the new features and capabilities of the V2 SDK.  This guide cannot cover converting all the custom code you have in your skill, however it should get you 80-90% of the way there.  You will need to fully test your skill after the conversion.

This guide assumes you are not making any changes to your interaction model.  However, after conversion, you should consider adding the FallbackIntent, and any other standard intents you might not currently have as part of your skill.  When the interaction model updates are complete, you will need to resubmit your skill for certification.  If you decide not to update the interaction model, you should consider also submitting your skill for recertification ensure the highest customer experience.
## Overview of process
1.	Setup Prerequisites
2.	Clone skill
3.	Generate test requests
4.	Generate Boilerplate Code
5.	Map states into handlers
6.	Replace v1 functions with v2 Equivalents
7.	Unit test
8.	Test the skill

### Prerequisites
#### ASK CLI
ASK CLI -- if you haven't already setup the ASK CLI, I recommend you do.  it'll make this process easier.  It is possible to do the same steps manually, but it'll require more steps and will have a greater chance of introducing an error.
When setting up the ASK CLI, be sure to connect to the correct developer and AWS accounts.  If you use separate accounts/setups for dev/test and production, you should connect to both so you can clone from one and deploy to the other.
#### Linter
Your choice of linter (or IDE).

### Clone Skill
You need to get the most current version of your skill code and interaction model.  If you have been using source control for your configuration and code, you should pull the most recent versions of it.  If you are pulling from a deployed version, use the 'ask clone' command to clone the skill.  After you have cloned it, you should make the following updates:
1.	remove the skill id from .ask/config
2.	update wasCloned to false in .ask/config
3.	change the lambda arn to be just the test function name you want to create when you later deploy the skill (and not the full arn)
4.	update the invocation name in each model found in the models folder.  add 'update' to the end of the invocation name if you don't have any other preference.  Avoid adding 'two' to the end as this can make it difficult to distinguish it from a case where you are using a one shot utterance to 'ask <skill name> to ...".
5.	update the skill name in the skill.json file for each locale.  This easily distinguishes the test skill from the original skill.
Update Dependencies
Update your dependency from alexa-sdk to ask-sdk.  In the folder with your package.json (typically lambda/custom), run these commands:
```Npm install ask-sdk –save```
```Npm uninstall alexa-sdk --save```
Pro tip: If you would like to be able to edit your code in the AWS Lambda console, the aws-sdk can be removed to reduce the size of your deployment package, since the aws-sdk is available to all lambda functions natively.   Npm uninstall aws-sdk –no-save

### Generate Test Requests
To help test your changes, you should generate some test events if you don't have them already.  Use the ask simulate or the Alexa Skills Kit web simulator to generate the json events (or the utterances to use).