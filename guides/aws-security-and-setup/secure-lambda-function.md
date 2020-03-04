# Enabling Skill ID Verification in AWS Lambda


**Summary**

It is highly recommended that you limit invocation permissions to just Alexa and enable skill ID verification to protect your function from malicious callers.

**Instructions**


1. To secure a Lambda function, so that it can only be invoked by your skill, follow these steps.
1. Open up the [developer portal](https://developer.amazon.com/alexa/console/ask) and locate your skill in the list.
1. Click on the skill id which is located in small text, directly below the skill name.  It'll looks something like ```amzn1.ask.skill.12ab...```.  Once you click on it, the id should briefly change into the word 'Copied'.
1. Return to your Lambda function in the AWS Console. If you're following a sample skill tutorial, you may already have this browser tab open. Otherwise, open the Lambda console by clicking here: [AWS Console](https://console.aws.amazon.com/lambda/home?/functions) and selecting the appropriate function. 
1. In the **Designer** section, under the **Add triggers** section, locate the **Alexa Skills Kit** trigger and click on it.
1. Scroll down to **Configure triggers**, paste the Skill ID in the Skill ID edit box.
1. Click the **Add** button. 
1. You may see a second trigger with no Skill ID associated with it.  This can be created by default, depending on how you created your function.  Since you are securing it with a new trigger that is tied to the correct Skill ID, this unbound trigger can be safely deleted.  Click the **Delete** button for this unbound trigger.
1. Scroll up and click the **Save** button in the top right. You should see a green **Saved** message in the trigger object in the Designer.
1. To view the function code again, click the box that has the Lambda icon followed by the name of your function.


**Further Reading**

For more information visit the [Configuring Alexa Skills Kit Triggers](https://developer.amazon.com/docs/custom-skills/host-a-custom-skill-as-an-aws-lambda-function.html#configuring-the-alexa-skills-kit-trigger) section of our Official Alexa Skills Kit Documentation.




