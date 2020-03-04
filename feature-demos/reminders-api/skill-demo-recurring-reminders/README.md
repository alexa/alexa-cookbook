# Recurring Reminders Demo
This Alexa Skill Feature Demo demonstrate how to set a recurring reminder using the Alexa Skills Kit (ASK) SDK for Java.

A reminder is somewhat like an alarm. However, Alexa will speak the reminder, such as "Play a 3-minute meditation."  This sample shows how a skill can set up a reminder that happens on a recurring basis, rather than just once.

> Note: the Alexa Skill Simulator does not support reminders so you will need an Alexa-enabled device, such as Amazon Echo, in order to experience the reminder.

## What You Will Need
*  [Amazon Developer Account](http://developer.amazon.com/alexa)
*  [Amazon Web Services Account](http://aws.amazon.com/)
*  The sample code on [GitHub](https://github.com/alexa/alexa-cookbook/tree/master/feature-demos/skill-demo-recurring-reminders/).
*  Java 8 JDK and Maven
*  An Alexa device which supports reminders (e.g. Amazon Echo)

## Setting Up the Demo
1. Create the skill
1. Create the AWS Lambda function
1. Grant permissions to the skill

### Create the Skill
First, let's create the skill.
1. Navigate to the [Alexa Skills Kit Developer Console](https://developer.amazon.com/alexa/console/ask). Click the **Create Skill** button at the upper right.
1. Enter `Channel Guide` as your skill name, choose **en-US**, select **Custom** and click **Create skill**.
1. Navigate to the **JSON Editor** section.  Copy the interaction model from [here](./models/en-US.json) and paste it over the existing model.  Save and build the model.
1. Navigate to the **Permissions** section and enable the **Reminders** option.  Save the permissions.
1. Navigate to the **Endpoints** section.  Leave this section here, as you'll need to come back to it after creating the AWS Lambda function.

### Create the AWS Lambda Function
1. If you're not familiar with how to create an AWS Lambda function, refer to [Hosting a Custom Skill as an AWS Lambda Function](https://developer.amazon.com/docs/custom-skills/host-a-custom-skill-as-an-aws-lambda-function.html). The relevant options necessary for this demo are:
    * When creating the function, select the **Author from scratch** option, and then select the **Java 8** runtime
    * Add the **Alexa Skills Kit** trigger.  Optionally (but recommended), secure the function using this procedure: https://alexa.design/secure-lambda-function
    * Configure the function to use at least **512 MB** of memory
    * Configure the function timeout to be `10` seconds (The Alexa service will not wait that long, however a little bit of extra time can help debug issues if you encounter them in a function running longer than expected.  You'll only be charged for the time actually used.)
1. If you haven't already, clone or download the repo to the machine with the JDK/Maven.
1. Open a terminal and go to the directory containing **pom.xml**, and run
```mvn assembly:assembly -DdescriptorId=jar-with-dependencies package```
1. Locate the generated zip file named **reminderapi-channel-guide-1.0.0-jar-with-dependencies.jar** in the target directory.
1. Upload this jar to the Lambda function and set the handler to `com.amazon.ask.channelguide.ChannelGuideStreamHandler`.  Click Save.
1. Copy the **ARN** for the Lambda function from the upper right of the function page.  Switch back to the Alexa Developer Console's **Endpoint** section and paste the ARN into the **Default Endpoint** field.

### Grant Permissions
In order for the demo to work for you as a user, you must grant permissions to the skill using the Alexa app. One option is to navigate to the Skills section, search for your new skill, and grant permission. However, you could just try out the skill.  When you attempt to set a reminder, if you haven't granted permissions, the skill sends a card to the Alexa app which you can use to go directly to the skill's settings and grant permissions. This might be the simplest approach and it's what's going to happen when some customers use reminders in your skill, so take a short walk in your customers' shoes!
 
## Running the Demo
It is possible to test some of the skill using the **Test** tab of the developer console, however since reminders are not supported in the simulator, your best option is to test using a device.

> Note: reminders are not supported in the Alexa developer console simulator.
 
### Example script
    User: "Alexa, open channel guide"
    Alexa: "..."
    User: "Kings and Thrones"
    Alexa: "..."
    User: "Yes"
    (This is when Alexa will send the card if permissions haven't been provided by the customer.)

\###
