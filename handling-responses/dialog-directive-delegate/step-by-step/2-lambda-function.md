# Delegate Dialog Directive Sample Project
[![Voice User Interface](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-locked._TTH_.png)](https://github.com/alexa/alexa-cookbook/blob/master/handling-responses/dialog-directive-delegate/step-by-step/1-voice-user-interface.md)[![Lambda Function](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-on._TTH_.png)](https://github.com/alexa/alexa-cookbook/blob/master/handling-responses/dialog-directive-delegate/step-by-step/2-lambda-function.md)[![Connect VUI to Code](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-off._TTH_.png)](https://github.com/alexa/alexa-cookbook/blob/master/handling-responses/dialog-directive-delegate/step-by-step/3-connect-vui-to-code.md)[![Testing](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-off._TTH_.png)](https://github.com/alexa/alexa-cookbook/blob/master/handling-responses/dialog-directive-delegate/step-by-step/4-testing.md)


## Setting Up A Lambda Function Using Amazon Web Services

In the [first step of this guide](https://github.com/alexa/alexa-cookbook/blob/master/handling-responses/dialog-directive-delegate/step-by-step/1-voice-user-interface.md), we built the Voice User Interface (VUI) for our Alexa skill.  On this page, we will be creating an AWS Lambda function using [Amazon Web Services](http://aws.amazon.com).  You can [read more about what a Lambda function is](http://aws.amazon.com/lambda), but for the purposes of this guide, what you need to know is that AWS Lambda is where our code lives.  When a user asks Alexa to use our skill, it is our AWS Lambda function that interprets the appropriate interaction, and provides the conversation back to the user.

1.  **Go to http://aws.amazon.com and sign in to the console.** If you don't already have an account, you will need to create one.  [If you don't have an AWS account, check out this quick walkthrough for setting it up](/set-up-aws.md).

    <a href="https://console.aws.amazon.com/console/home" target="_new"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-1-sign-in-to-the-console._TTH_.png" /></a>

1.  **Click "Services" at the top of the screen, and type "Lambda" in the search box.**  You can also find Lambda in the list of services.  It is in the "Compute" section.

    <a href="https://console.aws.amazon.com/lambda/home" target="_new"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-2-services-lambda._TTH_.png" /></a>

1.  **Check your AWS region.** AWS Lambda only works with the Alexa Skills Kit in two regions: US East (N. Virginia) and EU (Ireland).  Make sure you choose the region closest to your customers.

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-3-check-region._TTH_.png"/>

1.  **Click the "Create a Lambda function" button.** It should be near the top of your screen.  (If you don't see this button, it is because you haven't created a Lambda function before.  Click the blue "Get Started" button near the center of your screen.)

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-4-create-a-lambda-function._TTH_.png" />

1.  **Choose the blueprint named "alexa-skill-kit-sdk-factskill".** We have created a blueprint as a shortcut to getting everything set up for your skill. You can search for a blueprint using the provided search box.  This blueprint adds the alexa-sdk to your Lambda function so that you don't have to upload it yourself.

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/fact/2-5-blueprint._TTH_.png" />  <!--TODO: THIS IMAGE NEEDS TO BE CUSTOMIZED FOR YOUR SKILL TEMPLATE. -->

1.  **Configure your trigger.** Click in the dashed box, and select Alexa Skills Kit from the list.  If you don't see Alexa Skills Kit in the list, jump back to step #3 on this page.

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-6-configure-your-trigger._TTH_.png" />

    Once you have selected Alexa Skills Kit, click the **Next** button.

1.  **Configure your function.** This screen is where we will enter the important parts of our Lambda function.  These values will only ever be visible to you, but make sure that you name your function something meaningful.  

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-7-configure-your-function._TTH_.png" />

1. **Upload the [provided code](https://github.com/alexa/alexa-cookbook/blob/master/handling-responses/dialog-directive-delegate/sample-nodejs-plan-my-trip/src/)**  
  8.1. From the Code entry type box, choose "Upload a .ZIP file"  
  8.2. Clone the project and package the skill  
  8.2.1. go to https://github.com/alexa/alexa-cookbook  
  8.2.2. clone or download the zip file and extract the files. This sample makes use of the [delegate directive](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/dialog-interface-reference#directives) and you can learn more about it's [states and dialog flow](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/dialog-interface-reference#details) in the documentation  
  8.2.3. from the command prompt or terminal:
    navigate to the \handling-responses\dialog-directive-delegate\src folder and type `npm install`
  8.2.4. zip the files in the src folder (DO NOT include the parent src folder itself)  
  8.3. Back on AWS.Amazon.com, click the upload button and upload your zip file.  

1.  **Set up your Lambda function role.**  Create an AWS Role in IAM with access to Lambda, CloudWatch Logs and DynamoDB.
        ![create_role_1](https://cloud.githubusercontent.com/assets/7671574/17451098/09f64f40-5b19-11e6-82ee-b82c98387052.png "AWS Create Role Screenshot 1")
        ![create_role_2](https://cloud.githubusercontent.com/assets/7671574/17451100/0c3ef928-5b19-11e6-9aca-8cd353106396.png "AWS Create Role Screenshot 2")
        ![create_role_3](https://cloud.githubusercontent.com/assets/7671574/18011103/7b05f2b2-6b68-11e6-8dc3-3aa9ead6d83e.png "AWS Create Role Screenshot 3")

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-9-lambda-function-role._TTH_.png" />

1. **For this guide, you can skip all of the Advanced settings.**  Click the **Next** button to move to the Review screen.

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-10-next-button._TTH_.png" />

1. **The Review screen is a summary of your choices.  Click Create Function in the bottom left corner.**  You will need to scroll down to find **Create Function.**

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-11-create-function-button._TTH_.png" />

1. **After you create the function, the ARN value appears in the top right corner.** Copy this value for use in the next section of the guide.
You want everything after "ARN-"`arn:aws:lambda:us-east:xxxxxxxxxxxx:function:YourFunctionName`


<br/><br/>
<a href="https://github.com/alexa/alexa-cookbook/blob/master/handling-responses/dialog-directive-delegate/step-by-step/3-connect-vui-to-code.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_next_connect_vui_to_code._TTH_.png"/></a>

<img height="1" width="1" src="https://www.facebook.com/tr?id=1847448698846169&ev=PageView&noscript=1"/>
