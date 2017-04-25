#### Ingredients
## 2. Create the Skill <a id="title"></a>

1. Login to [developer.amazon.com](https://developer.amazon.com) and click Alexa, then Alexa Skills Kit.
1. Create a new Skill called **hello world** with invocation name ```hello world```.
1. Paste in the [IntentSchema.json](./speechAssets/IntentSchema.json):
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
1. Paste in the [SampleUtterances.txt](speechAssets/SampleUtterances.txt) :
    ```
    MyIntent hello
    ```

Pause here and leave this browser tab open.

#### Continue to the next step
[Part 3 - Create the Lambda function](./PAGE3.md#title)

<hr />
