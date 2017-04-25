#### Ingredients
## 2. Create the Skill <a id="title"></a>

1. Login to [developer.amazon.com](https://developer.amazon.com) and click **Alexa**, then **Alexa Skills Kit**.
1. Create a new skill called **Magic Answers** with invocation name ```magic answers```.
1. Paste in the [IntentSchema.json](./speechAssets/IntentSchema.json) :

```
{
  "intents": [
    {
      "intent": "MyIntent",  "slots":[
          {
            "name": "MyQuestion",
            "type": "AMAZON.US_STATE"
          }
      ]
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
    MyIntent {MyQuestion}
    ```

Pause here and leave this browser tab open.


**Notice the slot type used**: `AMAZON.US_STATE`.

Also notice that the user can say anything! Responses do not have to be the name of a US State.  
Alexa will not attempt to force the response to a STATE value, but will instead return its best attempt at the literal words it heard.

#### Continue to the next step
[Part 3 - Create the Lambda function](./PAGE3.md#title)

<hr />

Back to the [Home Page](../../README.md#title)
