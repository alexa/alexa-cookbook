#### Ingredients
## 4. Connect your skill to Lambda <a id="title"></a>

Here is how to copy and paste your Lambda function ARN to the Alexa skill endpoint.

1. Notice the Lambda ARN, shown near the top right of the page, which looks something like:

       arn:aws:lambda:us-east-1:333304287777:function:HelloWorld

   This ARN is different from the ARN for the Alexa app because it is specific to this lambda function.
   We will use this ARN in the Alexa app to reference this lambda function.
1. Copy this ARN to the clipboard:

   ![Amazon Resource Name](https://m.media-amazon.com/images/G/01/cookbook/arn._TTH_.png)
1. Reopen the browser tab labeled **Amazon Apps &amp; Services Developer Portal** that you left open on the **Interaction Model** step. 
1. Click on the **Configuration** menu step on the left.
1. In the **Global Fields** section, find the **Service Endpoint Type** label and click the radio button for 
   **AWS Lambda ARN (Amazon Resource Name)**.
1. Pick a geographical region that is closest to your target customers.
1. Click into the textbox that appears, and paste the ARN from the clipboard.
1. Scroll down past the **Account Linking** and **Permissions** sections and click the **Save** button.
1. You should see a green checkbox next to the **Configuration** menu item.
1. If you get an error, confirm you have previously defined the **Alexa Skills Kit** as a trigger for your Lambda function.


### Test your skill with Service Simulator

1. In the **Service Simulator**, type "hello" into the **Enter Utterance** section.
1. Click on the **Ask Hello world** button. 
   1. You should see the **Lambda Request** text area fill with contents that look like the following.
      Note that the text you entered, "hello", does not occur in the request.
      The Service Simulator has a quirk: it always requires input, even for intents that do not require additional data.
   ```
    {
      "session": {
        "sessionId": "SessionId.90f0842f-055e-491d-96bd-c4bebfa2013a",
        "application": {
          "applicationId": "amzn1.ask.skill.7a889d16-1c38-44ce-9feb-64e1b3e7a118"
        },
        "attributes": {},
        "user": {
          "userId": "amzn1.ask.account.AHVMY27TKPPKIIU7KOPEL45TY2TUIQAR2RBEKSZ3BCNUUA5AGJGGNUQQ37KNASA555LEK7KU2BXPYFCSOE65TLBPCQFPXMNKDAJAP4IVVCRFRESUXYYE7FYXTZ7YGY4WU7OLGSI6XZEUO2QWLADV3RCWP5GCHVQMR5LGO33RKCAOLPDEY6WJB2TXPOFZLDWP3CAHBXVYPX7UNPI"
        },
        "new": true
      },
      "request": {
        "type": "IntentRequest",
        "requestId": "EdwRequestId.bc640d4d-77a2-4176-81a5-c71ca9636bed",
        "locale": "en-US",
        "timestamp": "2017-04-26T21:10:55Z",
        "intent": {
          "name": "MyIntent",
          "slots": {}
        }
      },
      "version": "1.0"
    }
    ```
    1. You should see the **Lambda Response** text area fill with contents that look like this:
    ```
    {
      "version": "1.0",
      "response": {
        "outputSpeech": {
          "type": "SSML",
          "ssml": "<speak> the welcome message is, howdy </speak>"
        },
        "shouldEndSession": true
      },
      "sessionAttributes": {}
    }
    ```

### Privately publish your skill
#### Set Publishing Information
1. Click on the **Publishing Information** step on the left.
1. Select any **Category** that pleases you.
1. In the **Example Phrases** section, enter `alexa hello`.
1. Upload two icons of the required sizes (108x108 and 512x512 pixels).
   The images must either be PNGs or JPGs.
   You can use the [roulette wheel icons](https://en.wikipedia.org/wiki/Randomness#/media/File:Roulette_wheel.jpg)
   from Wikipedia's [Randomness](https://en.wikipedia.org/wiki/Randomness) entry that are provided in 
   the [resources](./resources/) directory of this example.
1. Click on the **Save** button.
1. You will NOT see a green checkbox next to the **Publishing Information** menu item.

#### Set Privacy and Compliance Information
1. Click the **No** selections for the questions:
    1. Does this skill allow users to make purchases or spend real money?
    1. Does this Alexa skill collect users' personal information? 
    1. Is this skill directed to or does it target children under the age of 13? 
1. Enable the **Export Compliance** checkbox.
1. Click on the **Save** button.
1. You will NOT see a green checkbox next to the **Privacy and Compliance Information** menu item.

### Private Live Test
Verify that your new Alexa app is ready for private testing:
1. Open the [Amazon Alexa web app](http://alexa.amazon.com/spa/index.html#skills/?ref-suffix=nav_nav) in a new browser tab.
1. Click on the **Your Skills** button at the top.
1. Scroll down to the **Hello world** app and click on it.

Now it is time to try your new Alexa app! 

**If you have an Alexa device**, ensure that it is turned on, and say "alexa ask hello world".
You should hear one of the following responses: 
* "The welcome message is hello"
* "The welcome message is howdy"
* "The welcome message is hi"
* "The welcome message is good day"

Look at the [Alexa cards](http://alexa.amazon.com/spa/index.html#cards) and notice your interactions are shown at the top of the page.

**If you do not have an Alexa device** you can use [EchoSim](https://echosim.io/). 
On the `echosim.io` web page, click and hold on the image of the microphone and say "ask hello world".
The results should be the same as if you had an Alexa device.

### Problems testing?
Here is a debug checklist:

* Ensure you are signed into the same Amazon account that you created your skill with. 
* Ensure your Amazon account is set to the country that your skill is set to. 
  For example, if you are making an Alexa skill that is deployed to a region in the US, your account needs to be set to a US address. 
  In general, before testing deployments to supported AWS regions in other countries, 
  you must modify your account settings to a regional address in each of those other countries.


### Further Reading
See the [testing](../../testing#title) guide for more testing options, including a discussion of the unit tests in [tests/test.js](./tests/test.js).

<hr />

Back to the [Home Page](../../README.md#title)
