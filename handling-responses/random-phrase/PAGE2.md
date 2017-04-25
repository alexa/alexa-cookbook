#### Ingredients
## 2. Create the Skill <a id="title"></a>

1. Login to [developer.amazon.com](https://developer.amazon.com) and click **Alexa**, then **Alexa Skills Kit**.
   You should now see the [Building Alexa Skills with the Alexa Skills Kit](https://developer.amazon.com/edw/home.html#/skills) page.
1. Click the **Add a New Skill** button to begin the process of creating a new skill.
1. In the **Skill Information** step,
    1. Leave the **Skill Type** set to **Custom Interaction Model**.
    1. Name the skill `Hello world`.
    1. Set the invocation name to `hello world`.
    1. Click the **Save** button.
    1. You should see a green checkbox next to the **Skill Information** menu item.
1. Click on the **Next** button, or click the **Interaction Model** menu item on the left, which is another way to moving to that step.
1. Paste in the contents of [IntentSchema.json](./speechAssets/IntentSchema.json) into the **Intent Schema** text area:
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
1. Leave the **Custom Slot Types** section alone for this example.
1. Paste in the contents of [SampleUtterances.txt](speechAssets/SampleUtterances.txt) into the **Sample Utterances** text area:
    ```
    MyIntent hello
    ```
1. Click the **Save** button. 
   There will be a pause while Alexa builds the model.
1. You should see a green checkbox next to the **Interaction Model** menu item.

Pause here and leave the web browser tab open.
We need to define a lambda function for this Alexa app, then we will come back to this page and reference the new lambda from this Alexa app.

### Continue to the next step
[Part 3 - Create the Lambda function](./PAGE3.md#title)

<hr />

Back to the [Home Page](../../README.md#title)
