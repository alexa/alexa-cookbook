# CLI Lab
## Task 4
 **Now let's practice using the CLI to make changes in a skill's interaction model.**

1. Open the your locale specific interaction model, it should be in a file with naming convention `models/en-US.json` (i.e. `models/fr-FR.json`) in your preferred Code Editor.

2. Scroll to `line 4` and change the `invocationName` value from `"greeter"` to `"hello jeff"` Feel free to use your own name instead.

  **TIP:** The interaction model is a mapping between a user's utterance and an Alexa Skill's handler. The handler will contain the code that will execute when an utterance is detected.

3. Now lets update our skills interaction model. Open the command prompt. Navigate to the directory the skill is in and type the following command:

  ```
  ask deploy -t model
  ```

  **Note:** This process takes a bit longer since the model is essentially training Alexa to recognize the speech input from our customers. You should see a confirmation message in your terminal "Model deployment finished."

  Congratulations! Test the changes you've made to your skill on your device, from the testing pane in the [developer portal](https://developer.amazon.com/alexa/console/ask), or on [echosim.io](https://www.echosim.io). Remember to use the new invocation name you gave your skill. You'll want to say something like "Alexa, start hello jeff" or you can also try "Alexa, hello jeff". or "ask", "open", "tell"...go ahead and experiment with a few variations.
