# Alexa Proactive Events API

The [Proactive Events API](https://developer.amazon.com/docs/smapi/proactive-events-api.html) allows you to send notifications to users of your skill. When your skill successfully sends a notification to a user’s Alexa device, the user hears a chime sound that indicates a notification has arrived. The user can then say, “Alexa, read my notifications” and hear the details.

This feature demo shows you how to set up a sample skill called Ping Me, and a script to generate notifications.

## What You Will Need
*  [Amazon Developer Account](http://developer.amazon.com/alexa)
*  [Amazon Web Services Account](http://aws.amazon.com/)
*  [AWS Command Line Interface \(CLI\)](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
*  [Alexa Skills Kit Command Line Interface \(ASK CLI\)](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html)
*  [Node.JS version 8](https://nodejs.org/)
*  This sample code on [GitHub](https://github.com/alexa/alexa-cookbook/tree/master/feature-demos/skill-demo-proactive-events/).

Your notification must follow one of the pre-defined formats listed in the [Proactive Events Schema](https://developer.amazon.com/docs/smapi/schemas-for-proactive-events.html)
For example, here is a sample notification that uses the **OrderStatus** schema:
```
        "event": {
            "name": "AMAZON.OrderStatus.Updated",
            "payload": {
                "state": {
                    "status": "ORDER_SHIPPED",
                    "deliveryDetails": {
                        "expectedArrival":  "2018-12-14T11:30:00.000Z"
                    }
                },
                "order": {
                    "seller": {
                        "name": "Delivery Owl"
                    }
                }
            }
        },
```

 * Alexa:  *"Your order from Delivery Owl has shipped and will arrive on December fourteenth at five thirty PM"*
Note that the expected arrival time is given in the user's time zone, and not in the universal time zone used in the timestamp field. 

## Set Up the Demo
Be sure you have the AWS CLI and ASK CLI setup.
Download this repository to your laptop. You can do this in one of two ways:
* Run the ```git clone https://github.com/alexa/alexa-cookbook``` command, or
* Click the **Code** tab near the top of the page, and then click the green **Clone or download** button.

#### AWS setup steps
First, you will set up the AWS Lambda function, which contains the skill service code, as part of a CloudFormation stack called PingMe.
The stack also includes the AWS Lambda trigger, IAM role, and a DynamoDB table to track userIds. The IAM role (Identity Access Management) provides the necessary permissions for the Lambda function to read and write from the DyanmoDB table. 

 * Note: The CloudFormation package should be run from the **us-east-1** region, also known as N. Virginia.  Verify your default region in the AWS CLI by typing ```aws configure``` and pressing enter four times.

1. Open a (bash) command terminal.
1. Navigate to the ```/skill/sam``` folder
1. Make the deploy script executable. Run the command ```chmod +x ./deploy.sh```.
1. Execute the script to create your stack. Run the command  ```./deploy.sh```.
 * Executing this script launches a CloudFormation setup from the packaged project defined in pingme.yaml.
1. Open the [CloudFormation console](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks) and verify the new stack called PingMe is created. It will take a few moments to complete.
1. Click on this stack, and then click the **Outputs** tab.  Copy the **AlexaSkillFunctionARN** value. 

#### Skill setup steps
Next, you will update the skill manifest with the **AlexaSkillFunctionARN** value. Then you will deploy the skill using the ASK CLI.

1. Open the file ```skill.json``` found within the ```/skill``` folder
1. Locate the two lines with "uri" on about lines 36 and 46.
1. Replace the values of these with the **AlexaSkillFunctionARN** value, and save the file.
1. Notice the publications eventNames listed: ```"eventName": "AMAZON.OrderStatus.Updated"```, etc.  The [Proactive Events](https://developer.amazon.com/docs/smapi/schemas-for-proactive-events.html) you intend to use must be defined here.
1. Run the command ```ask deploy``` to create the skill.
1. When the command completes, log in to the [Developer Portal](https://developer.amazon.com/alexa/console/ask) and open your Ping Me skill.
1. Click the **Test** tab, and enable skill testing in "Development".
1. Test the skill with the utterance `open ping me` and then `stop`.
1. Locate your ```userId``` from within the Skill I/O JSON Input panel. Copy this ```userId``` value to a temporary location (like a text file) - you will be copying additional values before using this value.
1. Click the **Build** tab, and click "Permissions" at the the bottom left.
1. At the bottom of the **Permissions** page, locate and copy the two Skill Messaging Client credentials, **Client Id** and **Client Secret**.

Enable the skill to receive notifications, as an end user would.
1. Navigate to [alexa.amazon.com](https://alexa.amazon.com) and log in.
1. Click Skills, then "Your Skills" from the top right.
1. Within the skill list panel, click on "Dev Skills" and then click on your new skill called "Ping Me".
1. Click the **Settings** button, then click "Manage Permissions".
1. Toggle on the **Alexa Notifications** option and click **Save Permissions**.

You can also perform these steps from the Alexa app on your phone.

#### Test script setup steps
The root of the project contains two sample Node.JS scripts you can run from the command line:
* **order.js** shows how to send a notification to an individual user
* **media.js** shows how to send a broadcast message to all users

1. Open ```order.js``` and locate the three settings for clientID, clientSecret, and userId1.
1. Replace these values with the values you copied in the previous steps.
1. Open ```media.js``` and locate the two settings for clientID and clientSecret.
1. Replace these values with the values you copied in the previous steps.
1. Review the ```schedule.txt``` file that accompanies the media demo.


## Running the Demo
1. Type ```node order.js```
 * You should hear a chime and see a yellow light ring on your Echo device! Say "Alexa, notifications"

1. Type ```node media.js```
 * This script will scan through the list of sports events in schedule.txt, locate the next future event, and send out a Multicast notification.

```
// skill/lambda/custom/schedule.txt
2018-12-20T13:00:00.000Z, "Owls at Badgers",   "Speech Radio"
2019-01-25T13:00:00.000Z, "Otters at Swans",   "Listen Channel"
2019-02-14T13:00:00.000Z, "Pandas at Tigers",  "Voice TV"
```

## Next Steps
Here are a few ways you can extend this demo.

* Change the event data in the schedule.txt file. 
* Modify the skill.json event publications section to define additional schema event types and re-deploy the skill.
* Notice the `localizedAttributes` section of the event. You can define unique variable values that will be resolved dynamically from the locale of each user.

        "localizedAttributes": [
            {
                "locale": "en-US",
                "sellerName": "Delivery Owl"
            },
            {
                "locale": "en-GB",
                "sellerName": "Delivery Owl UK"
            }
        ],

* Navigate to the [DynamoDB Console](https://console.aws.amazon.com/dynamodb/home?#tables:) and find the new table "askPingMe".
This table has one row for each user of your skill.  The primary key is the field called "userId", followed by any Persistent Attributes you set in your endpoint code. 
You can design integrations such that other systems read and write from this table.  For example, you could correlate a notification to a subsequent skill invocation to see how many people "click through" to launch the skill after receiving the notification.

* Track when users have granted permissions by adding handlers to respond to [Alexa Skill Events](https://developer.amazon.com/docs/smapi/skill-events-in-alexa-skills.html).
The `getMemoryAttributes` function in lambda/custom/constants.js initializes any user persistent attributes you wish to define.

* Set up a regularly scheduled job to run your script, using tools such as
[Cron](https://en.wikipedia.org/wiki/Cron),
[Windows Task Scheduler](https://en.wikipedia.org/wiki/Windows_Task_Scheduler),
or [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/with-scheduled-events.html).
The job could check existing systems for any new events, and generate Proactive Events API notifications.


## Frequently Asked Questions

 * Q: Can I send an ad-hoc or literal message as a notification?
 * A: No, your notification must follow the form of one of the [Proactive Events API schemas](https://developer.amazon.com/docs/smapi/schemas-for-proactive-events.html). You can propose new schemas via [alexa.uservoice.com](https://alexa.uservoice.com) .

 * Q: How do I get a notification banner to appear on my Echo Show device, or other Alexa-enabled screen device?
 * A: When you complete the Distribution section, you add icons to your skill page. 
If the customer is using an Alexa-enabled screen device, these icons that represent your skill will be visible when a customer gets a notification. 

 * Q: Can I send a notification to a mobile phone?
 * A: The Proactive Events API works with Alexa devices. If you want to trigger a text message to a mobile phone number, you can separately use a third-party service. 
