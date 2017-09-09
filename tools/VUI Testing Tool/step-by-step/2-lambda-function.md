# VUI Testing Tool
[![Voice User Interface](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-locked._TTH_.png)](https://github.com/alexa/alexa-cookbook/blob/master/tools/VUI%20Testing%20Tool/step-by-step/1-voice-user-interface.md)[![Lambda Function](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-on._TTH_.png)](https://github.com/alexa/alexa-cookbook/blob/master/tools/VUI%20Testing%20Tool/step-by-step/2-lambda-function.md)[![Connect VUI to Code](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-off._TTH_.png)](https://github.com/alexa/alexa-cookbook/blob/master/tools/VUI%20Testing%20Tool/step-by-step/3-connect-vui-to-code.md)[![Testing](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-off._TTH_.png)](https://github.com/alexa/alexa-cookbook/blob/master/tools/VUI%20Testing%20Tool/step-by-step/4-testing.md)

## Setting Up A Lambda Function Using Amazon Web Services

For this step, we will be creating an AWS Lambda function using [Amazon Web Services](http://aws.amazon.com).  You can [read more about Lambda functions](http://aws.amazon.com/lambda), but for the purposes of this guide, what you need to know is that AWS Lambda is where our code lives.  When a user speaks a command to our Alexa skill, it is the code in your AWS Lambda function that interprets the request, and builds the response that is sent back to the user.

1.  **Go to http://aws.amazon.com and sign in to the console.** If you don't already have an account, you will need to create one.  [Here's a quick walkthrough for setting it up](https://github.com/alexa/alexa-cookbook/blob/master/handling-responses/dialog-directive-delegate/set-up-aws.md).
![AWS sign in button](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-1-sign-in-to-the-console._TTH_.png)

2.  **Click "Services" at the top of the screen, and type "Lambda" in the search box.**  You can also find Lambda in the list of services.  It is in the "Compute" section.
![List of AWS Services ](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-2-services-lambda._TTH_.png)

3.  **Check your AWS region.** AWS Lambda only works with the Alexa Skills Kit in two regions: US East (N. Virginia) and EU (Ireland).  Make sure you choose the region closest to your customers.
![AWS Region Select](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-3-check-region._TTH_.png)

4.  **Click the "Create a Lambda function" button.** It should be near the top of your screen.  (If you don't see this button, it is because you haven't created a Lambda function before.  Click the blue "Get Started" button near the center of your screen.)
![Create Lambda Function Button](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-4-create-a-lambda-function._TTH_.png")

5.  **Choose the blueprint named "alexa-skill-kit-sdk-factskill".** We have created a blueprint as a shortcut to getting everything set up for your skill. You can search for a blueprint using the provided filter box.  This blueprint adds the alexa-sdk to your Lambda function so that you don't have to upload it yourself.
![Alexa Fact Skill blueprint](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/fact/2-5-blueprint._TTH_.png)

6.  **Configure your trigger.** Click in the dashed box, and select Alexa Skills Kit from the list.  If you don't see Alexa Skills Kit in the list, jump back to step #3 on this page.
![Selecting trigger for lambda function](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-6-configure-your-trigger._TTH_.png)
    Once you have selected Alexa Skills Kit, click the **Next** button.

7.  **Configure your function.** This screen is where we will enter the important parts of our Lambda function.  These values will only ever be visible to you, but make sure that you name your function something meaningful.  
![Lambda function configuration](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-7-configure-your-function._TTH_.png)

8.  **Upload the [provided code](https://github.com/Alexa/alexa-cookbook/tree/master/tools/VUI-Testing/src)** We have provided the code for this skill on [GitHub](https://github.com/Alexa/alexa-cookbook/tree/master/tools/VUI-Testing/src).  
  8.1. From the Code entry type box, choose "Edit Code Inline"

  8.2. Copy the [provided code](https://github.com/alexa/alexa-cookbook/blob/master/tools/VUI%20Testing%20Tool/src/index.js)

  8.3 Replace the code with the one you just copied.

  8.4 **Optional** If you want to create your own zip follow this steps
    8.4.1. go to https://github.com/alexa/alexa-cookbook

    8.4.2. clone the repo or download the zip file and extract the files

    8.4.3. from the command prompt or terminal:
      navigate to the \handling-responses\dialog-directive-delegate\src folder and type ```npm install```

    8.4.4. zip the files in the src folder (DO NOT include the parent src folder itself)

  8.3. on AWS.Amazon.com, click the upload button and upload your zip file.

9.  **Set up your Lambda function role.**  Create (or use an existing) AWS Role with access to Lambda & CloudWatch Logs.
![role selection](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-9-lambda-function-role._TTH_.png)

10. **For this guide, you can skip all of the Advanced settings.**  Click the **Next** button to move to the Review screen.
![next button](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-10-next-button._TTH_.png)

11. **The Review screen is a summary of your choices.  Click Create Function in the bottom left corner.**  You will need to scroll down to find **Create Function.**
![Create Lambda function button](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-11-create-function-button._TTH_.png)

12. **After you create the function, the ARN value appears in the top right corner.** Copy this value for use in the next section of the guide.
You want everything after the "-"```arn:aws:lambda:us-east:xxxxxxxxxxxx:function:YourFunctionName```

[![Next step button](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_next_connect_vui_to_code._TTH_.png)](https://github.com/alexa/alexa-cookbook/blob/master/tools/VUI%20Testing%20Tool/step-by-step/3-connect-vui-to-code.md)
