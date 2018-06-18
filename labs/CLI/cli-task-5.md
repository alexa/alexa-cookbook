# CLI Lab
## Task 5

  **Lets expand our Alexa Skill's features. If someone were to say "Alexa, ask hello jeff how he's doing?" the Skill should have an answer.**

18. Let's start by editing the front-end (VUI). Open the interaction model in your preferred Code Editor (`models/en-US.json`)

19. Copy and paste the following block of JSON below in between `line 26` and `line 27`. Feel free to add additional utterances

  ```
        {
          "name": "HowAreYouIntent",
          "slots": [

          ],
          "samples": [
            "how is he doing",
            "how are you",
            "howdy do"
          ]
        },
   ```
**Tip:** Don't forget the trailing comma after the closed curly brace!

  **Extra Points:** Feel free to add additional Utterances to the samples array. Remember to comma separate!

20. Save your interaction model and open your lambda function (`lambda/custom/index.js`) and copy/paste the following brick of code at `line 35`

  ```
const HowAreYouIntentHandler = {

  		canHandle(handlerInput) {
    		return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      		&& handlerInput.requestEnvelope.request.intent.name === 'HowAreYouIntent';
  		},
  		handle(handlerInput) {

    		const speechText = 'I\'m doing just great!';

    		return handlerInput.responseBuilder
      		.speak(speechText)
      		.withSimpleCard('Hello World', speechText)
      		.getResponse();
  		},
};
  ```
**Extra Points:** Feel free to edit the  speechText variable to say anything you want

21. In your lambda function, scroll down to `line 113` and add `HowAreYouIntentHandler,` to the array of Intent Handlers and save the changes you've made. It should look something like this

  ```
    .addRequestHandlers(
		    LaunchRequestHandler,
		    HelloWorldIntentHandler,
		    HowAreYouIntentHandler,
		    HelpIntentHandler,
		    CancelAndStopIntentHandler,
		    SessionEndedRequestHandler
  )
  ```
  **Tip:** Don't forget to comma separate the items in your array!
22. Now Deploy your changes. Since you've changed both the interaction model and the lambda function simply enter `ask deploy` into your command prompt to push both the interaction model and lambda function changes up.

  **Extra Points:** Test directly by entering `ask simulate -l en-US -t "start hello"` into your command prompt.

  Woohoo! Test the changes you've made to your skill on your device, from the [developer portal](https://developer.amazon.com/alexa/console/ask) or on [echosim.io](https://www.echosim.io). Remember to try your new utterances, "Alexa, ask hello jeff howdy do?" Or you can try to say something like "Alexa, start hello jeff" or you can also try "Alexa, start hello jeff" and then follow up with "how are you?"...go ahead and experiment with a few variations.
