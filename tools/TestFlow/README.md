# Testflow
[Setup steps](./tutorial/SETUP.md) - [Tutorial](./tutorial/TUTORIAL.md)

Testflow is a command-line testing tool for Alexa skill code that simulates multi turn conversations, allows interactive inputs, and provides concise, colorful output.

Voice is a fast-evolving user interface. Over the last few years, many developers started creating voice experiences by building a simple one-shot “fact skill” using the AWS console at a hackathon or workshop. Fast forward to today and two trends are clear: developers are building multi-turn conversational skills, and they like to write skill code from their laptop using an integrated development environment (IDE).
Developing code on a laptop is great, but deploying your code to test it may cause unnecessary interruptions to your mental flow. It takes time to zip your project, deploy your code to AWS Lambda, fire up the skill, ask a series of questions, stop the skill, locate and refresh the log file in Amazon CloudWatch, and search for debug messages and errors.

The Alexa evangelist team built a simulation tool called TestFlow to streamline skill debugging and testing. You can use the tool to test your skill code without needing to package or deploy your project. TestFlow is a lightweight, command-line dialog simulator. It displays and maintains the details of a mock skill session. Whenever you want to run a test, you just Alt-Tab to a command prompt, run TestFlow, review results, and then Alt-Tab right back to developing.

#### Examples
A voice designer could define a happy-path flow of user requests to the skill. For example, imagine a file listing the launch request, then a help query, and then a stop command.


```
LaunchRequest
AMAZON.HelpIntent
AMAZON.StopIntent
```

Here’s another example showing how to define Intents, Slots, and a pause for user input.

```
LaunchRequest
BookmarkGetIntent
BookmarkSetIntent page=25
? BookmarkSetIntent page=31
BookmarkGetIntent
ResetIntent
AMAZON.YesIntent
```


As a developer, you can save dialog sequence files like this to a /dialogs folder in your project.
See the Dialog Sequence [SPEC](./SPEC.md) for full details.
You can use these files in two ways.  First as a design document for specifying and sharing expected skill sequences,
and secondly as an input to Testflow.

TestFlow will open both this file and your source file and execute this series of unit tests for you.

To run TestFlow, you just type :  ```node testflow```
![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/testflow/Picture1._TTH_.png)


#### How TestFlow Works

You can think of TestFlow as a lightweight skill simulator rather than a traditional testing tool. Both the inputs and outputs to and from TestFlow are reduced to the simplest possible format to remove any friction in the testing process. As TestFlow executes multiple events, it will maintain session state for you, like the real Alexa service.
Developers can envision, define, run, and repeat “what if” scenarios quickly, having full control over which text and attributes to display, whether the test runs fully automated or with guided user input, and how slowly the test should run. For example, if you set a delay of 5 seconds between test events, users will have time to read and digest each request and response as it scrolls past. TestFlow is not network-dependent; it is a single file that runs alongside your code, and is perfect for developers who want to develop offline, like when traveling.  Testflow is configurable; you can set display and runtime options directly in the testflow.js file, or hack the script for your own purposes.
Here we see the test begins in automated fashion, then pauses to allow the user to type in a custom slot value of 33 rather than accept the default value.
![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/testflow/Picture2._TTH_.png)



Developers must understand how to set and get context, or session attributes, in order to remember things and provide intelligent responses to the user. An attribute could be used to remember the value of a user utterance slot, or for internal metadata such as a count of times the user launched the skill.
![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/testflow/Picture3._TTH_.png)

However, session attributes are largely invisible, requiring the developer to imagine their state or log their state as a skill executes.
Developers can configure TestFlow to show all the session attributes shaded in magenta; or just a single named attribute, similar to a “watch” variable in traditional debugging.

TestFlow prepares a mock request JSON for each execution, containing a User ID and timestamp.

Developers can define unique User IDs for events to run as, as well as whether the event runs as of right now or at a past or future time. In this way, you can simulate skills with multiple users and persistent memory.
![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/testflow/Picture4._TTH_.png)


You can also specify slot values in the dialog sequence using a single value, or by simulating various entity resolution events, such as testing both synonym with canonical values  See the dialog sequence spec for the full details.

TestFlow supports both Node.JS and Python projects, any version of the Alexa Skills Kit Software Development Kit (SDK), and skills that call other APIs or AWS services.  See the Setup Steps for hints on configuring your local environment


#### Testing Tools Landscape

TestFlow is one of dozens of approaches to testing an Alexa skill.  The developer portal Test console is the primary tool to use, especially for reviewing how utterances map to your language model. Echosim.io from a browser or the Alexa App (Android) and Amazon App (iPhone) now feature Alexa buttons, and can be used to interact with your skill verbally.
The Alexa Skills Management API (SMAPI) and Alexa Skills Kit Command Line Interface (CLI) tools can simulate utterances to an Alexa skill. Also, Bespoken’s BST command line utilities provide an integrated testing framework for skills.
Formal QA testing frameworks can be used to verify the expected output of your skill code, and are often automated as part of a continuous integration workflow. MochaJS and Chai are popular open source Javascript test frameworks.
TestFlow is unique in that it requires no device, browser, or network; it simplifies inputs and outputs to the minimum


#### Running tests

1. Type ```node testflow```
  + You should see requests and responses for each of the default request types
1. Type ```node testflow breakfast.txt```
  + You should see request and Intents, slot values, session attributes, and output speech.


#### Customizing the output
At the top of the ```testflow.js``` file, notice a set of options you can define.
You may change any of these to ```true``` or ```false```.

```javascript
const options = {

    delay        : 1.0,    // delay N seconds between requests

    speechOutput : true,  // the cyan text you hear the Echo say

    reprompt     : false, // The reprompt in case the user does not answer

    attributes   : true,  // session.attributes shown in magenta
                          // You can also name one particular attribute to watch instead of the boolean

    slots        : true,  // key/value pairs shown in blue and green
                          // For Entity Resolution enter a pair such as red/red or crimson/red

    requestEvent : false, // the request JSON sent to your code

    cards        : false, // Display simple card title and text

    userId       : '123',  // Define the final 3 chars of the user Id, can be overridden

    timestamp    : ''      // defaults to Now, can set via '2018-04-23T21:47:49Z'

};
```
#### AWS Calls
If your code makes calls to AWS Services such as S3 or DynamoDB, you should be able to test these from your local command prompt, too.
Be sure you have the [AWS-SDK](./tutorial/SETUP.md) installed and the AWS CLI (command line interface) [installed](http://docs.aws.amazon.com/cli/latest/userguide/installing.html) and [configured](https://developer.amazon.com/blogs/post/Tx1UE9W1NQ0GYII/publishing-your-skill-code-to-lambda-via-the-command-line-interface).

#### Installation Steps
The setup instructions are found here: [SETUP](./tutorial/SETUP.md)

#### Tutorial
A tutorial is available at: [TUTORIAL](./tutorial/TUTORIAL.md) that shows off additional features.

### FAQ:
Q. Can I use Testflow to automate testing results for CI/CD, and build pipelines?

A. Testflow is designed for human developers.

Q. Does Testflow need access and authentication to my live or development Skill on the Developer Portal?

A. Testflow runs on your laptop; it requires no authentication or Internet connection (and is perfect for developing while on a plane).
It simply executes your code project (a local version of your Lambda code) with a sequence of events.

Q. Can I use Testflow with ask-sdk V2 and alexa-sdk V1?

A. Testflow is not tied to ASK SDK V2.
It treats your code project like a black box, by simply sending in test events.
Your code can be running alexa-sdk V1, ask-sdk V2, or no SDK at all.


#### Feedback
Feedback is appreciated!  Please create a Github Issue or Pull Request (above) to report problems or suggest enhancements.
Follow me at [@robmccauley](https://twitter.com/robmccauley)


