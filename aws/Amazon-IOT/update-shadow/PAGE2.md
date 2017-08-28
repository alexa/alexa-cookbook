#### Ingredients
## 2. Create the Skill <a id="title"></a>

1. [Setup Thing](./step-1.md#title) || 2. [Create The Skill](./step-2.md#title) || 3. [Create The Lambda Function](./step-3.md#title) || 4. [Connect Skill To Lambda & Add IOT Permissions](./step-4.md#title) || 5. [Webapp-Thing](./step-5.md#title)

<hr />


1. Login to [developer.amazon.com](https://developer.amazon.com) and click Alexa, then Alexa Skills Kit.
1. Create a new Skill called **city browser** with invocation name ```city browser```.
1. Paste in the [IntentSchema.json](./speechAssets/IntentSchema.json) :

```
{
  "intents": [
    {
      "intent": "MyIntent",  "slots":[]
    },
    {
      "intent": "CityIntent",
      "slots":[
        {
          "name":"city",
          "type":"AMAZON.EUROPE_CITY"
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

1. Paste in the [SampleUtterances.txt](./speechAssets/SampleUtterances.txt) :

```
MyIntent hello
CityIntent go to {city}
CityIntent i am from {city}
```

Pause here and leave this browser tab open.

#### Continue to the next step

 * [Part 3 - Create the Lambda function](./PAGE3.md#title)


Back to the [Home Page](../README.md#title)
