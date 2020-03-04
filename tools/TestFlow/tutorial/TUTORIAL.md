## Testflow Tutorial

Welcome!  This guide will walk you through all the features of Testflow.
After completing the tutorial, you will know a new way to rapidly build and test skill code.

First, be sure Testflow is installed: see [SETUP](./SETUP.md)

We will be testing against the two included Node.JS sample skill code projects in
[sampleskill](../sampleskill) and
[sampleskill2](../sampleskill2) and the Python project in
[sampleskill3](../sampleskill3)

Open up the testflow project folder in your favorite code editor or text editor.
We will be modifying ```testflow.js```, and the sequence text files within ```/dialogs/```.

Open up a commmand prompt (black background is recommended),
change into the root testflow directory, and type

```
node testflow
```

This runs three default test events from the file [dialogs/default.txt](../dialogs/default.txt) :

```
LaunchRequest
AMAZON.HelpIntent
AMAZON.StopIntent
```

Notice, we are not testing with the full phrase or utterances that a human might say, nor are we typing in questions like a chatbot.
Testflow simulates the same Intents and Slots that the Alexa service will send to your code.
Assume the Skill and Alexa service have already processed the audio,
and selected an Intent (and slot values) according to the language model of your skill.


### Choose a Test
1. Type ```node testflow breakfast.txt```
1. Type ```node testflow lunch.txt``` You will get an error.
1. Create a new file in /dialogs called lunch.txt with Requests & Intents similar to breakfast.txt
1. Run testflow again with your new file.

### Delay
1. Within testflow.js, change the ```options.delay``` to 4 seconds.
1. Rerun the test.  You now have time to read the responses from your Alexa skill.

### Customized Output

1. Set the following options to true:

```
  * options.speechOutput
  * options.reprompt
  * options.attributes
  * options.cards
```
1. Run ```node testflow breakfast.txt```

  * Pay close attention to the session attributes in magenta.  A design goal of Testflow is to allow you to easily view these memory values as the skill progresses.

---

### Slots
<img align="right" src="https://s3.amazonaws.com/skill-images-789/tf/attractionslot.png">

1. Run ```node testflow attraction.txt```

You should see a slot, shown as a key:value pair in blue and green.

1. Modify attraction.txt by changing the slot value from 4 to 2, and re-run the test.

   *  ```AttractionIntent distance=2```

---

### Prompt for Slot

You can make Testflow pause and collect a slot value from the user.
1. Modify attraction.txt by adding a question mark before the Intent name:

   *  ```? AttractionIntent distance=2```

   <img align="right" src="https://s3.amazonaws.com/skill-images-789/tf/AttractionPrompt.gif">

1. Re-run the test, and you should be prompted to either accept the default value, or enter a new value.
Type in 40 and press enter.


This will cause the script to pause and give you a chance to type in a value.
1. Run ```node testflow attraction.txt``` again.
You can type in "40" and the skill will execute with this new value.  You may see an attraction a little farther away!

  * Assume the skill is listening for the built-in slot type: AMAZON.NUMBER; in this case you would receive either an integer, or empty slot, or "?"

---

### Calling Web Services & APIs
1. Run ```node testflow outside.txt```
  * The code within the sample skill attempts a live call to a Yahoo API to get the current weather.
  As long as your laptop has Internet access, you should be able to execute the test and see the results.

---

### Debugging

<img align="right" src="https://s3.amazonaws.com/skill-images-789/tf/Dinner.gif">

Any messages sent to "stdout", such as those you write to console.log(), will be displayed in Testflow in white.
These include debug statuses, warnings, and errors.
It is recommended to avoid logging if possible, and add logs when necessary for debugging.


1. Run ```node testflow dinner.txt```
1. The error is caught and displayed in white text.
1. Open sampleskill/index.js and find the word "unicorn" and comment it out.
1. Re-run the test


---

### Skipping Lines

1. Run ```node testflow coffee.txt```

<img align="right" width="149" height="82" src="https://s3.amazonaws.com/skill-images-789/tf/comment.png">

1. Notice the final line is an AMAZON.YesIntent, but the skill doesn't understand.
  * The skill has ended with the first YES.  You can see double-dashed lines (=====) indicating the skill session has ended.
The next YES is running under a brand new session.
1. Open coffee.txt and comment out the final line with a pound sign: ```# AMAZON.YesIntent```

1. You could also insert a new line with just the word ```end``` in order to skip any remaining lines.




---
---

### Advanced Topics

#### Redirect Testflow to run Skill Sample 2

1. Right at the top of testflow.js, update source code reference to point to sample #2:

```const MyLambdaFunction = require('./sampleskill2/index.js');```

This skill is more complex; be sure you have setup and configured the AWS CLI and AWS SDK (with --global)
as recommended in the [SETUP](./tutorial/SETUP.md) steps.

<img align="right" src="https://s3.amazonaws.com/skill-images-789/tf/dynamodb_sm.png">

The skill uses a feature of the ask-sdk to auto-create a DynamoDB table for you, called ```askMemorySkillTable```.

This table is used to store persistent attributes so the skill can remember each user even after the session ends.

Run ```node testflow color.txt```

You may get an error the very first time you run a test; check your [AWS DynamoDB Console](https://console.aws.amazon.com/dynamodb/home)
to see if this table is still being created.  Once the table is created, it will remain, and the skill will add a new record for each new user.

You may need to visit the [IAM Console](https://console.aws.amazon.com/iam/home)
to grant your CLI user (and Lambda role) access to DynamoDB, for example by attaching the ```AmazonDynamoDBFullAccess``` policy.

---

### Attributes

   <img align="right" src="https://s3.amazonaws.com/skill-images-789/tf/Color.gif">

1. Set the following options to false:

```
options.reprompt
options.cards
```

1. Verify the following options are true:

```
options.slots
options.attributes
```



1. Run ```node testflow color.txt```

   * Wow, there are a lot of attributes being tracked in this sample! One of the attributes is called ```favoriteColor```.
Let's focus in on that attribute only.  The options.attributes can be set to more than just a true/false boolean.
1. Set options.attributes to the string 'favoriteColor'.  Javascript is flexibly typed :)
1. Re-run ```node testflow color.txt```

---

### Entity Resolution Slots
   <img align="right" src="https://s3.amazonaws.com/skill-images-789/tf/ColorSynonym.gif">

Now try ```node testflow colorsynonym.txt```

In your skill's language model you can define a custom slot with just a list of your own values.
In this simple case, your code would receive a slot value (or null) as part of the Intent.
Even if the user were to say "unicorn", that value would be returned as the slot value (whether or not it exists in your custom slot values).

If you create a custom slot AND define synonyms,
then an Alexa Skills Kit feature called [Entity Resolution](https://developer.amazon.com/blogs/alexa/post/5de2b24d-d932-4c6f-950d-d09d8ffdf4d4/entity-resolution-and-slot-validation) kicks in.


A user's slot utterance could now either:
 * Not be heard at all (an unfilled slot value)
 * Match to a slot value directly (with status ER_SUCCESS_MATCH)
 * Match to a synonym of a slot value (also ER_SUCCESS_MATCH, but with both values returned)
 * Be heard, but fail to match to any value or synonym (ER_SUCCESS_NOMATCH)

We can simulate each of these cases in Testflow.
```
MyColorSetIntent color=
MyColorSetIntent color=green/green
MyColorSetIntent color=crimson/red
MyColorSetIntent color=unicorn/
```

---

### Time dimension
Sometimes we want to simulate a history of interactions prior to the current time.
Testflow allows you to run your requests in the past (or future) by specifying a time offset.


First, let's watch the timestamp attribute for each session.  Modify your options.attributes like so:

 ```
 attributes   : 'lastUseTimestamp',
 ```

   <img align="left" src="https://s3.amazonaws.com/skill-images-789/tf/Time.gif">

The Alexa service (and AWS Lambda) operate on UTC time.  A current timestamp is included with each request to your code.

For example, to specify six hours in the past,
you can add a line to your sequence file with beginning with ```@``` and including a timespan to add to the current time.


Timespans can be defined as minutes, hours, or days.
To execute a request as of a week ago, you can add a line: ```@ -7d```

All subsequent requests will operate from this time.

Be sure your session ends with an AMAZON.StopIntent (or ensure your code returns a .withShouldEndSession(true))
in order for the timestamp to be set as the skill ends the session.

Now try ```node testflow time.txt```


```
@ -7d
LaunchRequest
AMAZON.StopIntent
@ -6h
LaunchRequest
AMAZON.StopIntent
@ -30m
LaunchRequest
AMAZON.StopIntent
@ 0m
LaunchRequest
AMAZON.StopIntent
```

---

### Different Users
Now try ```node testflow users.txt```
   <img align="right" src="https://s3.amazonaws.com/skill-images-789/tf/Users.gif">

Your published skill will be used by multiple users, each with a unique userId.
Testflow can vary the userId to simulate different user sessions.  The ```userId``` is a very long, random, anonymous string.
The userId will remain the same for each user, allowing you to remember attributes about the user's past interactions with the skill.

The options.userId defines a default userId ending in '123'.

The field's last three characters can be set and changed via a directive in the dialog sequence file.
Simply add ```~ 222``` for example.

You can also review user records and attributes managed in DynamoDB from the [DynamoDB console](https://console.aws.amazon.com/dynamodb/home?tables:selected=askMemorySkillTable).


```
~ 222
LaunchRequest
MyColorSetIntent color=green
AMAZON.StopIntent
~ 333
LaunchRequest
MyColorSetIntent color=red
AMAZON.StopIntent
~ 222
LaunchRequest
MyColorGetIntent
AMAZON.StopIntent
```

---

### Sample Skill 3 - Python

   <img align="right" src="https://s3.amazonaws.com/skill-images-789/tf/PythonDemo.gif">

Testflow supports testing Python code as well as Node.JS.
The tool checks the extension of your source file, either .js or .py.
For Python projects, a child process is spawned that executes the tests via ```Python.exe -c``` commands.
This feature was tested with Python 2.7.



Within testflow.js, search for // PYTHON to see the this code.

Open up testflow.js and modify the location of your path, file, and handler exactly as shown here:

```
const SourceCodeFile = './sampleskill3/index.py';
const handlerName =  'lambda_handler';
```

Now try ```node testflow colorpython.txt```


### DynamoDB Local
Testflow is designed to support offline development.  If your skill uses Persistent attributes and DynamoDB,
you would need to have Internet access to AWS for Testflow to run your skill properly.

However, you could [setup a local instance of DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html),
for enabling offline testing (like when traveling).

Then, modify your skill code to define a new local DynamoDB client and specify it in your skill handler:

```
AWS.config.endpoint = 'http://localhost:8000';
const localDynamoClient = new AWS.DynamoDB({apiVersion : 'latest', endpoint : 'http://localhost:8000'});
...
exports.handler = skillBuilder
    .addRequestHandlers(
    ...
    )
.withTableName('askMemorySkillTable')
.withDynamoDbClient(localDynamoClient)
```

---
Congrats, you made it through the whole tutorial!  Happy skillbuilding!

See also: a blog post on [automating the publish to Lambda process](https://developer.amazon.com/blogs/post/Tx1UE9W1NQ0GYII/Publishing-Your-Skill-Code-to-Lambda-via-the-Command-Line-Interface).



Back [HOME](../README.md)