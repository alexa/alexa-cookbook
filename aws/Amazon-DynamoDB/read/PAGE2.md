#### Ingredients
## 2. Create the Skill <a id="title"></a>
<hr />


1. Login to [developer.amazon.com](https://developer.amazon.com) and click Alexa, then Alexa Skills Kit.
1. Create a new Skill called **Magic Answers** with invocation name ```magic answers```.
1. Paste in the [IntentSchema.json](./speechAssets/IntentSchema.json) :

```
{
    "interactionModel": {
        "languageModel": {
            "invocationName": "magic answers",
            "intents": [
                {
                    "name": "MyIntent",
                    "slots": [
                        {
                            "name": "MyQuestion",
                            "type": "AMAZON.US_STATE"
                        }
                    ],
                    "samples": []
                },
                {
                    "name": "AMAZON.FallbackIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.CancelIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.HelpIntent",
                    "samples": []
                },
                {
                    "name": "AMAZON.StopIntent",
                    "samples": []
                }
            ],
            "types": []
        }
    }
}
```

1. Paste in the [SampleUtterances.txt](speechAssets/SampleUtterances.txt) :
    ```
    MyIntent {MyQuestion}
    ```

Pause here and leave this browser tab open.


*Notice the slot type used*
 + ```AMAZON.US_STATE```

*The user can say any question, it does not have to be the name of a US State.  Alexa will not force it to match to a STATE value, but will rather return its best attempt at the literal words it heard.*


#### Continue to the next step

 * [Part 3 - Create the Lambda function](./PAGE3.md#title)


<hr />

Back to the [Home Page](../../README.md#title)
