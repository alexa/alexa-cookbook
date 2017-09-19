#### Ingredients
## Fact Service <a id="title"></a>

A "Fact Skill" picks a random fact from a list of facts and reads the fact to the user.
Many developers first start by installing the [Space Facts Skill](https://github.com/alexa/skill-sample-nodejs-fact).

This guide will show you how you can enter and maintain your Fact list via on online service.

### Instructions for deploying this sample skill

1. Login to [developer.amazon.com](https://developer.amazon.com) and click Alexa, then Alexa Skills Kit.
1. Create a new Skill called **Fact Service** with invocation name ```fact service```.  Click Save.
1. You should now see an Application Id just above the name of your skill, such as:  ```amzn1.ask.skill.6a4c4aac-c3ad-49c7-982b-975617496442```  Make a note of this, also called the App ID.
1. Click Next to advance to the Interaction Model page.
1. Paste in the [IntentSchema.json](./speechAssets/IntentSchema.json) :

```
{
  "intents": [
    {
      "intent": "GetNewFactIntent", "slots": []
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

1. At the bottom of this page, paste in the [SampleUtterances.txt](speechAssets/SampleUtterances.txt) :
    ```
    GetNewFactIntent tell me a fact
    GetNewFactIntent give me a fact
    GetNewFactIntent i want a fact
    GetNewFactIntent tell me something
    ```

1. Click Next to advance to the Configuration page for this skill.
1. Click the AWS Lambda ARN radio button.
1. Click the geographic region closest to you, such as "North America"
1. Paste in the following ARN ```arn:aws:lambda:us-east-1:589662381973:function:FactService```
  * Optional: Install and use your own version of this function via the [src/index.js](src/index.js) Lambda code.
1. Click Next to advance to the Test page.


#### Fact Service Console
A demo Fact service has been setup that you may use to manage your fact list.

1. Locate your skill's Application Id that appears on the Skill Information page and Copy this value.
1. In a new browser tab, navigate to [https://s3.amazonaws.com/fact-service/factlist.html](https://s3.amazonaws.com/fact-service/factlist.html)
1. Paste in your Application Id to the first textbox and press the Load button.
1. Type in several facts into the the Fact List textbox on this page.
1. Click Save.

#### Testing

1. Within the test page of your skill, Service Simulator box, type in "tell me a fact".
  * You may also test using [EchoSim.io](https://echosim.io) or on any Alexa device.
1. You should hear one of the facts from your list!
1. Modify the facts in your list from the web console, and test again.


<hr />

Back to the [Home Page](../../README.md#title)

