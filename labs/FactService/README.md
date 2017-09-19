#### Alexa Cookbook
## Fact Service Tutorial <a id="title"></a>
<hr />

### Intro <a id="intro"></a>

 This is a set of tutorial steps on how to add features to an Alexa skill.


### Tutorial Steps
 We will start by installing the most basic of skills and then follow the labs to learn how to extend the skill.
 We will begin with a code template called ```alexa-skill-kit-sdk-factskill```,
 however we will replace this code with our starting code so that we see how a fact skill can be created from the ground up.


#### Code
1. Login to AWS and verify the region at the top right is set to the **Ireland** or **N. Virginia** Region region.
1. Click [Lambda](https://console.aws.amazon.com/lambda/home) and then **Create a Lambda function**  Do **NOT** select the default **Blank** blueprint.
1. Locate and click on the ```alexa-skill-kit-sdk-factskill``` skill template (hint: search for **fact** )
1. Click in the empty square and choose the trigger *Alexa Skills Kit* and click Next.
1. Give your function the name *FactService*
1. Paste in the source code from [src/index.js](./src/index.js) :

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

            'GetNewFactIntent': function () {
                this.emit(':tell', 'You can build new voice experiences with the Alexa Skills Kit!');
            }
        };
```

1. Just below the code editor, create or re-use an execution role, such as ```lambda_basic_execution```
1. Click Next and create the function.
1. Make note of the Lambda ARN, shown near the top right, such as this example:
 *  ``` arn:aws:lambda:us-east-1:333304287777:function:FactService ```


#### Skill
1. Login to [developer.amazon.com](https://developer.amazon.com) and click Alexa, then Alexa Skills Kit
1. Create a new Skill called ```Fact Service``` with invocation name ```fact service```.
1. Paste in the [IntentSchema.json](./speechAssets/IntentSchema.json) :

```
{
  "intents": [
    {
      "intent": "GetNewFactIntent",  "slots":[]
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

1. Paste in the [SampleUtterances.txt](speechAssets/SampleUtterances.txt) :

```
GetNewFactIntent tell me a fact
GetNewFactIntent give me a fact
GetNewFactIntent tell me something
```

1. Configure the skill endpoint with the AWS Lambda ARN previously created.

#### Test
* Type or say "open fact service" and Alexa should reply with "You can build new voice experiences with the Alexa Skills Kit"
* Modify code within the Lambda function editor to have Alexa say something besides this phrase.  Click the blue ```Save``` button.
* Test and hear Alexa say the new response.


# Labs <a id="labs"></a>

## Lab 1 - Fact List

This lab will show you how to define a list of facts instead of a single fact, and have Alexa pick a random fact to tell the user.

Take a look at the ```// helper functions``` section of code at the bottom of your Lambda code:

```javascript
function getFact() {
    var newFact = 'You can build new voice experiences with the Alexa Skills Kit';
    return newFact;
}

```

We will enhance our getFact() function with the following:
1. Define an array of facts called **myFacts**.  An array is just a list of values, enclosed in square brackets [].
1. Add add in a call to a new helper function called ```randomPhrase()``` to help us pick a random value from the array.

#### Steps

Delete the ```getFact()``` function and replace with the following two functions:

```
function getFact() {
    var myFacts = ['Pandas live for about 20 years.','Pandas are native to China.','Pandas eat bamboo.']

    var newFact = randomPhrase(myFacts);

    return newFact;
}

function randomPhrase(array) {
    // the argument is an array [] of words or phrases
    var i = 0;
    i = Math.floor(Math.random() * array.length);
    return(array[i]);
}
```

#### Test
* Type or say "open fact service" and Alexa should reply with one of the facts in your array.
* Modify code within the Lambda function editor to change the fact array to your own custom facts.  For example, you could define facts about your hometown.  Click the blue ```Save``` button.
* Test and hear Alexa say one of your facts.

## Lab 2 - Handle Help, Stop, Cancel

Within your lambda code, *un-comment* out the three lines that handle the standard Alexa intents.
Hint: locate the // characters and remove them.
Review and modify the response messages for each intent, if desired.

* AMAZON.HelpIntent
* AMAZON.CancelIntent
* AMAZON.StopIntent

You can now submit your skill for publication!  See this [guide on the publishing process](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/publishing-an-alexa-skill).

 <hr/>

[Back](../../README.md#title) - [Cookbook Home Page](../../README.md#title)

