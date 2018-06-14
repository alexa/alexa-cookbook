# Display Interface Skill for Echo Show

## What you will learn
This sample modifies the node.js Fact skill sample to:
- Detect a request from an Echo Show (which supports the [display directive](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/display-interface-reference)) or the Echo Show renderer simulator
- Use the [Display.RenderTemplate](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/display-interface-reference#form-of-the-displayrendertemplate-directive) directive to display a [bodyTemplate](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/display-interface-reference#bodytemplate1) and a [listTemplate](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/display-interface-reference#listtemplate1)
- how to do capability detection to determine if the requesting device supports Display directives (ex: Echo Show), does not (Echo, Echo dot, Fire TV), or is the simulator.
- This skill uses state management (ex: START, QUIZ, and not set). So, for example, the AnswerIntent does one thing in the START state (tells you about a state) and another thing in the QUIZ state (progresses you through the quiz). If you're not aware of this, following the flow of the code can be confusing. You can read more on [State in the SDK documentation](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs#making-skill-state-management-simpler)

## Install Steps
### Create a Quiz Game Skill

 * Build a quiz game skill using [this tutorial](https://github.com/alexa/skill-sample-nodejs-quiz-game)
 * Be sure to run ```npm install``` to get the lastest node SDK. You need version 1.0.11

### On your Skill Information cover page, click Render Template = Yes and save

### Replace your Lambda function code with the provided ```index.js```

 * Download the deployment package from your Lambda Function, (Actions > Export Function > Download Deployment Package) replace [index.js](index.js)
 * One time, run ```npm install``` to get the lastest node SDK. You need version 1.0.11
 * Compress and upload your package to Lambda. NOTE: compress the index file and the node_modules folder. DO NOT include their parent folder. Index must be at the root of your compressed file.


### Test Your Skill
  You can test your skill using:

  - Your Echo Show
  - The new Simulator panel on the very bottom of the Test page of your skill in developer.amazon.com
  - The AWS Lambda console using the sample unit test requests found in the [test_events](test_events) folder

**Highlighted changes**


- ```supportsDisplay()``` returns true if the device supports the Display directive
- ```isSimulator()``` returns true if the request is from the simulator
- ```renderTemplate()``` creates the display template. Inside this function, create the templates you want for your scenario. Then, call this function with which of your templates you want to use and the content that will populate that template.
- ```ElementSelected``` event handler. This is where you handle touch events

**See Also**
- [Build for Echo Show](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/build-skills-for-echo-show)
- [Display Interface Reference](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/display-interface-reference)
- [Design Guide Videos for Echo Show](https://developer.amazon.com/designing-for-voice/what-alexa-says/)
- [Design Guide on Choosing the Right Template](https://developer.amazon.com/designing-for-voice/what-alexa-says/#choose-the-right-template-on-echo-show)
- [Announce Post](https://developer.amazon.com/blogs/alexa/post/50d2ed06-6a81-415c-a842-b335c7f967df/build-skills-for-echo-show-new-alexa-skills-kit-features-for-display-and-video-interfaces)



************

# List Events Demo
This demos how to do capability detection to determine if the requesting device supports Display directives (ex: Echo Show), does not (Echo, Echo dot, Fire TV), or is the simulator.

This skill uses state management (ex: START, QUIZ, and not set). So, for example, the AnswerIntent does one thing in the START state (tells you about a state) and another thing in the QUIZ state (progresses you through the quiz). If you're not aware of this, following the flow of the code can be confusing. You can read more on [State in the SDK documentation](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs#making-skill-state-management-simpler)

## What You Will Need
*  [Amazon Developer Account](http://developer.amazon.com/alexa)
*  [Amazon Web Services Account](http://aws.amazon.com/)
*  The sample code on [GitHub](https://github.com/alexa/alexa-cookbook/tree/master/feature-demos/skill-demo-display-directive/listTemplate/).

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
