#### Ingredients
## 3. Create the Lambda Function <a id="title"></a>

*Leave the default values for any form inputs not described below.
To complete each page you will usually scroll down and find the blue button.*

1. Sign in to AWS at [aws.amazon.com](https://aws.amazon.com) by clicking on the **My Account** / **AWS Management Console** menu item.
1. Verify that the AWS region displayed at the top right is set to either the **Ireland** or **N. Virginia** region.
   Alexa has not been rolled out to other regions yet.
1. Under the **Compute** services section, click [Lambda](https://console.aws.amazon.com/lambda/home)
1. Click the **Create a Lambda function** button.
   This will take you to the **Select blueprint** step.
    1. Do not select the default **Blank Function** blueprint.
    1. Locate the `alexa-skill-kit-sdk-factskill` skill blueprint (hint: search for **fact**).
    1. You should download the skill blueprint, packaged as a zip file, by clicking on the small download icon at the 
       bottom right of the skill blueprint box. This is a convenient way to explore the blueprint offline.
       Once you download the zip file, you will see a message that says 
       "This function contains external libraries. Uploading a new file will override these libraries."
    1. Install the blueprint into the new lambda function by clicking on the `alexa-skill-kit-sdk-factskill` heading.
       This will take you to the **Configure Triggers** step.
       Once you download the zip file, you will see a message that says 
       "This function contains external libraries. Uploading a new file will override these libraries."
1. Click in the empty square and choose the trigger *Alexa Skills Kit*.
   <img src='https://m.media-amazon.com/images/G/01/cookbook/trigger._TTH_.png' alt='Alexa Skills Kit Trigger' width='600'>
1. Click the **Next** button. 
   This will take you to the **Configure function** step.
    1. Give your function the name *HelloWorld*.
    1. Change the **Description** to `Hello World skill built with the ASK NodeJS SDK`.
    1. This example will work equally well with the **Runtime** set to `Node.js 4.3` or `Node.js 6.10`.
       You might as well select the newer runtime, `Node.js 6.10`.
    1. Leave the **Code entry type** set to **Edit code inline**.
    1. Select all the existing Javascript code in the inline code editor and delete it.
    1. Paste in the all the source code from [src/index.js](./src/index.js)
    1. In the **Lambda function handler and role** section:
        1. Leave **Handler** set to `index.handler`.
        1. Set the **Role** dropdown to an existing or new IAM role.
           To do that, either create a custom IAM role (these instructions do not tell you how),
           or re-use an existing Lambda execution IAM role by:
            1. Selecting **Choose an existing role**
            1. Setting **Existing role** to `lambda_basic_execution`.
    1. Leave the **Tags** section alone.
    1. Leave the **Advanced settings** section alone.
    1. Click **Next** button to advance to the **Review** step.
1. Create the new Lambda function by clicking on the **Create function** button.
1. Press the blue **Test** button to define a unit test.
   Many event templates are predefined for you - so many, in fact, that they are divided into sections.
   Click on the **Sample event template** pulldown, and scroll to the **Alexa** section.
   Click on the **Alexa Start Session** template.
1. Click on the **Save and test** button.
1. Click on the **Triggers** tab at the top of the page, and confirm the **Alexa Skills Kit** is shown.
   It is normal to see the message "To configure the Alexa service to work with your Lambda function, go to the Alexa Developer portal."
  
### Continue to the next step
[Part 4 - Connect your skill to Lambda](./PAGE4.md#title)

<hr />

Back to the [Home Page](../../README.md#title)
