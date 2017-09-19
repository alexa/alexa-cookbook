# Alexa Birthday Hotline
I created a Birthday Hotline for my dad. You can too.

## What is Alexa Birthday Hotline
I wanted to do something special for my dad on his birthday, instead of sending the same old flowers, cakes, and cupcakes. I wondered - what if I created a birthday hotline for him? So, I would set up a phone number that his close family and friends would call, and record their greetings or share  special memories with him. Then, on the day of his birthday, he would call that number, and listen to all the lovely messages.

That's a pretty awesome gift, I thought. Much better than the flowers and the super-dad cupcakes for sure.

But, then I realized that’s just a regular voicemail.  Nobody likes listening to voicemails. That’s pretty boring. How do I make this a bit more fun and engaging?

Then, I had the aha moment. What if Alexa could play the messages for him instead? He has an Amazon Echo, and he loves it. What if he could ask Alexa to play his birthday messages? Now, that’d be pretty cool.

So, that’s what I set out to do, using [Twilio](https://twilio.com), [Alexa Skills Kit](https://developer.amazon.com/ask), and [Amazon Web Services](https://aws.amazon.com)

![](http://ajotwani.s3.amazonaws.com/birthday-hotline/birthday-hotline.007.jpeg)


## The Stack

As you can imagine, there are two pieces to the Alexa Birthday Hotline.

1. **Recording**: the voice greetings using [Twilio](https://twilio.com)
2. **Playback**: playing the messages back through an Alexa Skill

### Recording
Everyone would call the Twilio number, be greeted with a welcome message, and record their greeting after the beep.

![](http://ajotwani.s3.amazonaws.com/birthday-hotline/birthday-hotline.008.jpeg)

### Playback
Alexa, play my birthday greetings
![](http://ajotwani.s3.amazonaws.com/birthday-hotline/birthday-hotline.009.jpeg)


# Let’s Build

## Recording


### Setting Up Our Phone Number
Head to the Twilio numbers page and click the “**Buy a number**” button if you don’t already have a phone number available.

When you click on the “Buy a number” button you’ll see the numbers search screen. You can search for a number by location or even digits or phrases.

### Create TWIML bin

Now that we have the phone number ready to go, we’ll write up some quick [TwiML](https://www.twilio.com/docs/api/twiml) that we will then point our phone number to. So, when we receive a call, this TwiML will get fired.

One quick way to write and host TwiML is to use TwiML Bins. TwiML Bins allow you to write TwiML that Twilio will host for you - so you can quickly prototype a solution without spinning up a web server.

1. Head over to [TwiML Bins](https://www.twilio.com/console/dev-tools/twiml-bins)
2. Click on the “+” to create a new TwiML
3. Give it a friendly name, like so - “My Birthday Hotline”
4. Paste the following inside the TWIML box

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Play>
http://ajotwani.s3.amazonaws.com/media/wishes/signal-greeting.mp3
  </Play>
  <Record />
</Response>
```

#### Understanding the TwiML
The <[Play](https://www.twilio.com/docs/api/twiml/play)> verb plays an audio file back to the caller. Twilio retrieves the file from a URL that you provide.

The <[Record](https://www.twilio.com/docs/api/twiml/record)> verb records the caller's voice and returns to you the URL of a file containing the audio recording.

So, what our TwiML is essentially doing is *playing* an MP3, and then *recording* the caller’s voice.

Feel free to replace the URL of the audio file to something of your own choosing.  

### Connect the TWIML bin to the Phone Number
We’re now ready to set up the Twilio number.

1. Head back to the Twilio [Phone Numbers](https://www.twilio.com/console/phone-numbers/incoming) and click on the number you just purchased.
2. Under “Voice & Fax” -> A Call Comes In, choose TwiML on the first drop down, and then choose the TwiML bin you just created on the second drop down.
3. Save

We are now done with the “Recording” part of our skill. Let’s move on to the second part - the Playback through Alexa.

## Playback

There are two parts to an Alexa skill:

1. **Voice User Interface (VUI)**: This is where we define how we will handle a user's voice input, and which code should be executed when specific commands are uttered. You may think of this as the frontend of our skill.
2. **Programming Logic**: This is the actual code logic for our skill, that resides on a hosted service, like AWS Lambda, and responds to user requests.

![](http://ajotwani.s3.amazonaws.com/birthday-hotline/birthday-hotline.010.jpeg)

Let’s start off by creating our Frontend.

### 1 - Create the Voice User Interface for our skill

1. Head over to [Amazon Developer Portal](http://developer.amazon.com/). On the top right corner of the screen, click the **Sign In** button.
2. Once you have signed in, click the **Alexa button** at the top of the screen.
3. On the Alexa page, choose the **Get Started** button for the Alexa Skills Kit.
4. Select **Add a New Skill**. This will get you to the first page of your new Alexa skill.
5. Fill out the Skill Information screen, as below:


    |   | Description | Example  |
    | ------------- | ------------- | ------------- |
    | **Skill Type**  | For this skill, we are creating a skill using the Custom Interaction Model. This is the default choice.  | Custom Interaction Model  |
    | **Language**  | Choose the first language you want to support.  You can add additional languages in the future, but we need to start with one. (This guide is using U.S. English to start.)  | U.S English  |
    | **Name**  | This is the name of the skill as it will be displayed in the [Alexa app](http://alexa.amazon.com).  | Birthday Hotline  |
    | **Invocation Name**  | This is the name spoken by your users to start the skill. We will keep this short and simple.| Birthday Hotline  |
    | **Audio Player**  | We will be using the [Audio Player API](https://github.com/alexa/skill-sample-nodejs-audio-player) for this skill, so choose Yes. | Yes  |


6. Click on **Save**, and then click **Next** button to move to the Interaction Model.

#### Interaction Model Instructions
Fill out the Interaction Model screen as below:

**Intent Schema**: An intent schema defines the actions that we want our users to be able to take. Copy and paste the code below into the Intent Schema box. ([get this on GitHub](https://github.com/ajot/alexa-birthday-hotline/blob/master/speechAssets/IntentSchema.json))

```json
{
  "intents": [
    {
      "intent": "PlayAudio"
    },
    {
      "intent": "AMAZON.PauseIntent"
    },
    {
      "intent": "AMAZON.ResumeIntent"
    },
    {
      "intent": "AMAZON.NextIntent"
    },
    {
      "intent": "AMAZON.PreviousIntent"
    },
    {
      "intent": "AMAZON.HelpIntent"
    },
    {
      "intent": "AMAZON.StopIntent"
    },
    {
      "intent": "AMAZON.CancelIntent"
    },
    {
      "intent": "AMAZON.StartOverIntent"
    },
    {
      "intent": "AMAZON.YesIntent"
    },
    {
      "intent": "AMAZON.NoIntent"
    }
  ]
}
```

**Sample Utterances**: Sample utterances guide Alexa to map what a user says to the Intents that we defined earlier. Copy these sample utterances and paste them into the Sample Utterances box in your browser. ([get this on GitHub](https://github.com/ajot/alexa-birthday-hotline/blob/master/speechAssets/Utterances.txt))

```
PlayAudio begin greetings
PlayAudio begin the greetings
PlayAudio begin playing the greetings
PlayAudio start greetings
PlayAudio start the greetings
PlayAudio start playing the greetings
PlayAudio play the greetings
PlayAudio to play
PlayAudio to begin greetings
PlayAudio to begin the greetings
PlayAudio to begin playing the greetings
PlayAudio to start greetings
PlayAudio to start the greetings
PlayAudio to start playing the greetings
PlayAudio to play the greetings
```

Click **Save** to verify that your interaction model builds properly without any errors.

If your interaction model builds successfully, click **Next** to move on to Configuration.

We are now ready to create our backend using AWS Lambda.

### 2 - Setting up our AWS Lambda Function

Now that we have built our Voice User Interface (VUI) for our Alexa skill, we will be creating an AWS Lambda function using [Amazon Web Services](http://aws.amazon.com).  You can [read more about what a Lambda function is](http://aws.amazon.com/lambda), but for the purposes of this guide, what you need to know is that AWS Lambda is where our code lives.  When a user asks Alexa to use our skill, it is our AWS Lambda function that interprets the appropriate interaction, and provides the conversation back to the user.

1. Go to [aws.amazon.com](http://aws.amazon.com/) and sign in to the console. If you don't already have an account, you will need to create one. If you don't have an AWS account, check out this [quick walkthrough](https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/set-up-aws.md) for setting it up.

2. **Create an AWS Role** in IAM with access to Lambda, CloudWatch Logs and DynamoDB.
![create_role_1](https://cloud.githubusercontent.com/assets/7671574/17451098/09f64f40-5b19-11e6-82ee-b82c98387052.png "AWS Create Role Screenshot 1")
![create_role_2](https://cloud.githubusercontent.com/assets/7671574/17451100/0c3ef928-5b19-11e6-9aca-8cd353106396.png "AWS Create Role Screenshot 2")
![create_role_3](https://cloud.githubusercontent.com/assets/7671574/18011103/7b05f2b2-6b68-11e6-8dc3-3aa9ead6d83e.png "AWS Create Role Screenshot 3")

3. Click **Services** at the top of the screen, and type "Lambda" in the search box. You can also find Lambda in the list of services. It is in the "Compute" section.

    <a href="https://console.aws.amazon.com/lambda/home" target="_new"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-2-services-lambda._TTH_.png" /></a>

3.  **Check your AWS region.** AWS Lambda only works with the Alexa Skills Kit in two regions: US East (N. Virginia) and EU (Ireland).  Make sure you choose the region closest to your customers.

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-3-check-region._TTH_.png"/>

4.  **Click the "Create a Lambda function" button.** It should be near the top of your screen.  (If you don't see this button, it is because you haven't created a Lambda function before. Click the blue "Get Started" button near the center of your screen.)

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-4-create-a-lambda-function._TTH_.png" />

5.  Choose the blueprint named **Blank Function**.
![](http://ajotwani.s3.amazonaws.com/birthday-hotline/blank-function.png)

6.  **Configure your trigger.** Click in the dashed box, and select Alexa Skills Kit from the list.  If you don't see Alexa Skills Kit in the list, make sure you have the correct region selected. See step 3 earlier.

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/2-6-configure-your-trigger._TTH_.png" />

    Once you have selected Alexa Skills Kit, click the **Next** button.

7. **Configure your function.** This screen is where we will enter the important parts of our Lambda function.  These values will only ever be visible to you, but make sure that you name your function something meaningful.  
	1.  **Name**: You can name it whatever, but let’s name it something meaningful, like **birthdayHotlineSkill**
	2.  **Description**:”Programming logic for the Birthday Hotline Skill”
	3.  **Runtime**: Node.js 6.10
	4.  **Lambda Function Code**: Leave this as is. We will come back to this in just a moment.
	5.  **Role**: Choose an existing Role
	6.  **Existing Role**: Select the role we created earlier.
8. Click the **Next** button to move to the Review screen. The Review screen is a summary of your choices.  
9. Scroll all the way down and click **Create Function** in the bottom left corner.
10. After you create the function, the **ARN** value appears in the **top right corner**. **Copy** this value for use in the next section of the guide.

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/2-12-copy-ARN._TTH_.png" />

### 3 - Connecting Your Voice User Interface To Your Lambda Function
We’re now ready to connect our frontend with our backend.

1.  **Go back** to the [Amazon Developer Portal](https://developer.amazon.com/edw/home.html#/skills/list) and select your skill from the list. You may still have a browser tab open if you started at the beginning of this tutorial.

2.  Open the "Configuration" tab on the left side.

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/3-2-configuration-tab._TTH_.png" />

3.  Select the **AWS Lambda ARN** option for your endpoint.

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/3-3-aws-lambda-arn._TTH_.png" />

4.  **Select "North America" or "Europe" as your geographical region.** IMPORTANT: Make sure you select the same region that you created your Lambda in.  Remember, Alexa skills using AWS Lambda can only run in N. Virginia (North America) and Ireland (Europe).

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/3-4-choose-region._TTH_.png" />

5.  **Paste your Lambda's ARN (Amazon Resource Name) into the textbox provided.** It should look similar to the screenshot above.

6.  **Leave "Account Linking" set to "No."** For this skill, we won't be using Account Linking, but you can learn more about [Linking an Alexa User with a User in Your System.](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/linking-an-alexa-user-with-a-user-in-your-system)

7.  Click the “Save” button.

—

### Let’s upload our code to the Lambda function
1. Clone this repo and cd into the /BirthdayHotline/src directory

```
git clone git@github.com:alexa/alexa-cookbook.git
cd alexa-cookbook/labs/BirthdayHotline/src
```

2. Install the [Twilio Node helper library](https://www.twilio.com/docs/libraries/node)

```
npm install twilio
```
3. Update the src/twilio-config-sample.js with your [Twilio credentials](https://www.twilio.com/console), and then **rename** the file to twilio-config.js
4. Create the Deployment Package for AWS Lambda by zipping the contents of the /src directory. Your /src directory will now have the following structure:

```
|- audioEventHandlers.js
|- getRecordings.js
|- stateHandlers.js
|- constants.js
|- index.js
|- package.json   
|- twilio-config-sample.js
|- node_modules
```

 So, to zip the contents of the /src directory, run the following from inside the /src directory -

```
zip -X -r ../index.zip *
```

Index.zip is now your deployment package that we will upload to AWS Lambda.

5. Upload the deployment package to the Lambda function we created earlier.

## Ready to test it now.
1. Call the Twilio phone number to record a greeting.
2. Then ask Alexa to playback the greetings by saying - *"Alexa, open birthday hotline."*

Enjoy!
