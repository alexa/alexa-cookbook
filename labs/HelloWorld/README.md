#### Alexa Cookbook
## Hello World <a id="title"></a>

### Intro <a id="intro"></a>

This is a simple tutorial to introduce a simple Alexa skill and code.

#### Code
1. Login to AWS and verify the region at the top right is set to the **Ireland** or **N. Virginia** region.
1. Click [Lambda](https://console.aws.amazon.com/lambda/home) and then **Create a Lambda function**.
   Do not select the default **Blank** blueprint.
1. Locate and click on the `alexa-skill-kit-sdk-factskill` skill template (hint: search for **fact** ).
1. Click in the empty square and choose the trigger *Alexa Skills Kit* and click **Next**.
1. Give your function the name *HelloWorld*
1. Paste in the source code from [src/index.js](./src/index.js):
    ```
    var Alexa = require('alexa-sdk');

    exports.handler = function(event, context, callback) {
        var alexa = Alexa.handler(event, context);

        // alexa.dynamoDBTableName = 'YourTableName'; // creates new table for userid:session.attributes

        alexa.registerHandlers(handlers);
        alexa.execute();
    };

    var handlers = {
        'LaunchRequest': function () {
            this.emit('MyIntent');
        },

        'MyIntent': function () {
            this.emit(':tell', 'Hello World from Alexa!');
        }
    };
    ```

1. Just below the code editor, create or re-use an execution role, such as `lambda_basic_execution`.
1. Click **Next** and create the function.
1. Make note of the Lambda ARN, shown near the top right, which looks something like:
   ```
   arn:aws:lambda:us-east-1:333304287777:function:HelloWorld
   ```


#### Skill
1. Login to [developer.amazon.com](https://developer.amazon.com) and click **Alexa**, then **Alexa Skills Kit**.
1. Create a new skill called `HelloWorld` with invocation name ```hello world```.
1. Paste in the [IntentSchema.json](./speechAssets/IntentSchema.json) :
    ```
    {
      "intents": [
        {
          "intent": "MyIntent",  "slots":[]
        },
    
        {
          "intent": "AMAZON.HelpIntent"
        },
        {
          "intent": "AMAZON.StopIntent"
        },
        {
          "intent": "AMAZON.CancelIntent"
        }
      ]
    }
    
    ```

1. Paste in [SampleUtterances.txt](speechAssets/SampleUtterances.txt):
    ```
    MyIntent hello
    ```

1. Configure the skill endpoint with the previously noted AWS Lambda ARN.

#### Test
* Type or say "open hello world" and Alexa should reply with "hello world from Alexa"
* Modify code within the Lambda function editor to have Alexa say something besides Hello World.
* Test and hear Alexa say the new response.


# Labs <a id="labs"></a>

## Lab 1 - New Intents

This lab will have you extend your skill by adding new Intents.
First we will add the intent to the skill definition.

1. Within the [Dev Portal](https://developer.amazon.com/edw/home.html#/skills/list) skill definition, click on the **Interaction Model** page.
1. Review the Intent Schema panel, notice the three lines that define the **MyIntent** schema.
1. Create a new intent definition, similar to **MyIntent** called **WhatsUpIntent**.
1. Within the **Sample Utterances** box, add a sample for the new intent, such as ```WhatsUpIntent what is up```

Next, we will add a handler to the AWS Lambda function

1. Within the AWS Lambda Console console, review your function code.
1. Within the handlers section, notice the three lines of code that handle the **MyIntent** event.
1. Create a new handler function for the WhatsUpIntent (hint: copy and paste the **MyIntent** function and change **MyIntent** to **WhatsUpIntent**).
1. Customize the message Alexa will say.
1. Change the `emit` from a `:tell` to an `:ask`.
   This `:ask` will keep the session open after Alexa responds.
1. Test your new skill by opening the skill and asking "what is up"?

Finally, we will add handlers for default requests such as `Help`, `Stop`, and `Cancel`:

1. Within the Lambda code, add handlers for each of the following three events:
   `AMAZON.HelpIntent`,  `AMAZON.StopIntent` and `AMAZON.CancelIntent`.

1. Customize the `say` message in each handler.
1. Ensure the `Help` handler action is ```:ask```, while the `Cancel` and `Stop` handlers are ```:tell```.
   ```:tell``` stops the skill after Alexa speaks.
   ```:ask``` causes Alexa to listen again for the next question or command.
1. Feel free to add additional intents and handlers to make your skill unique.

## Lab 2 - Intents with Slots

This lab will have you add Intents with Slots.
Click in your skill's Interaction Model / Intent Schema box.
Review your existing Intent Schema.
The final two characters in this JSON are `] }`.
Click your cursor just before these two characters.
Type a comma, then press Enter three times.

Now we will add a new Intent called `MyNameIsIntent` and define a slot with the intent.

1. Copy and paste in the following new Intent definition:
    ```
    {
      "intent": "MyNameIsIntent",
      "slots":[
        {
          "name":"firstname",
          "type":"AMAZON.DE_FIRST_NAME"
        }
      ]
    }
    ```

1. Add the following line to **Sample Utterances**:
    ```
    MyNameIsIntent my name is {firstname}
    ```

1. Create another handler within your AWS Lambda function for `MyNameIsIntent` that stores the `firstname` slot value in a local variable.
Be sure this line of code exists *inside* the scope of this new Intent Handler.
    ```
    var myName = this.event.request.intent.slots.firstname.value;
    ```
    
1. Repeat the name back to the user as part of the MyNameIsIntent handler.
   For example, you could have the `MyNameIsIntent` handler do this :
 ```
 this.emit(':ask', 'hello, ' + myName, 'try again');
 ```

## Lab 3 - Session Attributes

Add session attributes to your skill to remember things.

In the previous lab you created a lambda function / handler called `MyNameIsIntent`.

1. Add the following line of code after you have retrieved the `firstname` slot value into the myName variable:
    ```
    this.attributes['name'] = myName;
    ```

1. Locate the handler for the AMAZON.StopIntent that you defined in Lab 1.
   Within this handler, replace the code with the following:
    ```
    var myName = '';
    if (this.attributes['name']) {
        myName = this.attributes['name'];
    }
    this.emit(':tell', 'goodbye, ' + myName, 'try again');
    ```

1. Test your skill:
    1. Say "my name is sam".  
    1. Say "stop".  You should hear a personalized goodbye message.

## Lab 4 - Calling Web Services
Your skill can make calls to external web services, APIs and REST services.

Read and follow the tutorial in the [external-calls/httpsGet](../../external-calls/httpsGet) folder, to create a starter skill that calls a web service.

Once you have this skill working:
1. Review the Lambda code.
1. Change the value of the `myRequest` from "Florida" to "California" or any other state.
1. Using what you have learned so far, try to add an Intent and Slot so that the user can say which state they want.
   For example, you can repeat the steps from Lab 2, to add a new Intent to the Intent Schema, with the following slot:
   ```
   {
       "name":"usstate",
       "type":"AMAZON.US_STATE"
   }
   ```
1. Be sure to add a corresponding **Sample Utterance** line, such as:
    ```
    NewIntent go to {usstate}
    ```

1. Within your Lambda code, obtain the value of the slot via:
    ```
    var myState = this.event.request.intent.slots.usstate.value;
    ```

## Lab 5 - SSML Audio

Add short MP3 audio clips to your output via SSML.
SSML markup tags can be interspersed directly within normal speech output text.
You can test these within the **Voice Simulator** textbox, just above the **Service Simulator** textbox on the skill **Test** page.


Examples:
```
There is a three second pause here <break time="3s"/>  then the speech continues.

<audio src='https://s3.amazonaws.com/my-ssml-samples/Flourish.mp3' />
<audio src='https://s3.amazonaws.com/my-ssml-samples/cheap_thrills.mp3' />
<audio src='https://s3.amazonaws.com/my-ssml-samples/this_is_what_you_came_for.mp3' />
```

For example, you could make Alexa say words and sound effects by preparing an output string like this:

```
var say = " news flash <audio src='https://s3.amazonaws.com/my-ssml-samples/Flourish.mp3' /> , i can create Alexa skills!";
this.emit(':ask',say, 'try again');
```

Read the [documentation page](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speech-synthesis-markup-language-ssml-reference#audio) on how to prepare and host MP3 audio clips in the required format.
You can use a tool such as "ffmpeg" or "vlc" to down-sample your existing MP3 content.  You can host the MP3s on your own website, or within the AWS S3 service.  Simply create an S3 bucket, upload your files, and set the files to be public, and note file properties which contain the public URL to the file.


## Lab 6 - Locale
Your skill code can create a custom response based on the geographic region of the user, whether they are in US, GB, or DE.

You can add conditional logic like this:

```
    var locale = this.event.request.locale;

    var say = "";

    if (locale == 'en-GB'){
            say = 'hiya';

    } else if (locale == 'de-DE') {
            say = 'guten tag';

    } else {
            say = 'hello';
    }
    this.emit(':ask', say, 'try again');

```

Based on Dean Bryen's post [How to Build a Multi-Language Alexa Skill](https://developer.amazon.com/blogs/post/Tx2XUAQ741IYQI4/how-to-build-a-multi-language-alexa-skill)


## Lab 7 - IOT Updates
Controlling IOT Devices

Read and follow the tutorial in the [aws/Amazon-IOT](../../aws/Amazon-IOT) folder.  You will:

 + Create a new virtual IOT device
 + Update it via a skill Lambda function
 + Build a web app to simulate a device and show updates happening


## Lab 8 - Session in DynamoDB

Skills written with the Node.JS ```alexa-sdk``` can easily store their session attributes in DynamoDB when the skill terminates.

When the user re-launches the skill at a later time, the session attributes are reloaded and available to the skill.

#### Pre-requisites:
Complete the lab exercises 1-3.  You should have a Hello World skill that recalls the user's name upon exit.
Review the [Lab 3 solution](https://gist.github.com/robm26/aec28e68137e776aea9722a9fa7b4d56) to quickly create this skill.


#### Lab Steps:

Within your Lambda function's ```exports.handler``` block, add one new line:

```
exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);


    alexa.dynamoDBTableName = 'YourTableName'; // creates new table for userid:session.attributes

    alexa.registerHandlers(handlers);
    alexa.execute();
};
```

Add permissions for your Lambda function to access DynamoDB

1. From within AWS Console, click on IAM, then Roles, then ```lambda_basic_execution```:
1. Click "Attach Policy" and select a DynamoDB policy such as **AmazonDynamoDBFullAccess**
1. Test your skill by executing a unit test from the AWS Lambda console.
1. You may see an error such as ```"errorMessage": "Requested resource not found"```.  This is okay.
1. Wait 60 seconds, then navigate to [AWS DynamoDB](https://console.aws.amazon.com/dynamodb/home) and click on Tables.
1. You should see a table called ```YourTableName```.
1. Return to the Lambda console, and test your function again.  It should now succeed.
1. Return to DynamoDB, and click on Tables, then ```YourTableName```
1. Click on ```Items``` and you should now see a record that has "amzn1.ask.account" in the ```userId``` column
1. Click on this record to review the data stored for this userId.  You should see a mapAttr object that stores the state of your session.attributes.


Note:
 * The session.attribute state is persisted in Dynamo only when your skill ends.
 * The previous session.attributes is loaded again when the user starts the skill again.
 * The first 25GB of data stored in DynamoDB is always free.

#### Lab Demo
Test the full lifecycle of your skill to verify your name is remembered.

1. Launch your skill or begin testing in the Skill Test page.
1. Say "my name is sam"
1. Say "stop"
 + Your session has now ended and the "name" attribute should be stored in the DynamoDB table.  This is equivalent of an Echo user allowing the session to end and waiting for some time.
1. Begin testing the skill again.  Say "help"
 + You should hear "here is the help for you, sam"


## Lab 9 (optional)
Account Linking allows your users to enable your skill, and then enter their credentials to your existing website or directory.
This is how Uber and Domino's Pizza links an Alexa user to a user within their service.  The skill can gain access to user attributes, and the skill can make authenticated calls into the service using an OAuth token that is automatically kept for the user with their enabled skill.

Account linking is required as a component of a Smart Home skill.

 * Review the blog post about Account Linking: [Linking your Skill with LWA in Five Steps](https://developer.amazon.com/blogs/post/Tx3CX1ETRZZ2NPC/Alexa-Account-Linking-5-Steps-to-Seamlessly-Link-Your-Alexa-Skill-with-Login-wit)

Setup Account Linking to "Login with Amazon" as in the blog post.  Welcome the user by saying their full name.

## Lab 10

Using the **alexa-sdk**:

1. Search the internet for `npm alexa sdk`.
1. Click the first link to open the `alexa-sdk` node module project page.
1. Read and scroll through the documentation and try out the code snippets in your skill.
1. See if you can implement the Hi-Low guessing game described in the documentation.


[Back](../../README.md#title) &bull; [Cookbook Home Page](../../README.md#title)
