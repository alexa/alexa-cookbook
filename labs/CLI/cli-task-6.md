# CLI Lab
## Task 6

  **Let's experiment with monetizing our skill. We'll give our customers the ability to one-time purchase a special greeting by adding a product to the skill."

1. In your terminal window or command prompt, navigate to your skill directory and type in the following command:  
  
  ```
ask add isp
```

You'll be presented with a choice of products, either *entitlements* or *subscriptions*.

2. Choose the **entitlement** option and press Enter.

You'll be presented with a second option to choose a basic template for your in-skill product. 

3. Select the `Entitlement_Template` and press Enter.

The terminal prompt will ask you for a name.

4. Type in `premium-greeting`

A new in-skill product will be created as a JSON file in a folder called `/isps/entiltement/`. 

5. Open the in-skill product JSON file (`/isps/entitlement/premium-greeting.json`) in your code editor.

6. Copy a completed version by [clicking here](https://github.com/alexa/alexa-cookbook/blob/master/labs/CLI/assets/premium-greetings.json) and paste it into your in-skill product JSON file.

7. Return to your terminal window and type in `ask deploy -t isp` to deploy your product.

8. Open your lambda function (located in `lambda/custom/index.js`) in your code editor. Go to `line 26` add `async` to the handle callback. 

It should look something like this:   

```
     async handle(handlerInput) {
       const speechText = 'Hello World!';
```

**TIP:** An `async` function can contain an `await` expression. This pauses the execution of the function and waits for the  resolution, and then resumes the async function's execution and returns the resolved value.

9. Change `const` to `let` for the `speechText` variable. 

It should now look like:
```
     let speechText = 'Hello World!';
```

10. Now add a reprompt to keep alexa listening for another utterance from our customer. After `line 27` add `let repromptText = 'Try saying hello. ';` and after `line 30` add `.reprompt(repromptText)` to the responseBuilder return block. 

If you completed this part successfully, your `HelloWorldIntentHandler` should look something like this:

```
	const HelloWorldIntentHandler = {
	  canHandle(handlerInput) {
	    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
	      && handlerInput.requestEnvelope.request.intent.name === 'HelloWorldIntent';
	  },
	  async handle(handlerInput) {
	    let speechText = 'Hello World!';
	
	    return handlerInput.responseBuilder
	      .speak(speechText)
	      .reprompt(repromptText)
	      .withSimpleCard('Hello World', speechText)
	      .getResponse();
	  },
	};
```

Now we'll put a premium greeting behind a pay wall. If a customer is entitled to our "premium greeting" product, we'll send them the premium speech output -- otherwise they will continue to get a standard greeting with an upsell message.
	
11. Go ahead and copy and paste the following brick of code at `line 29`:

```
    const locale = handlerInput.requestEnvelope.request.locale;
    const monetizationService = await handlerInput.serviceClientFactory.getMonetizationServiceClient();
  
    const result = await monetizationService.getInSkillProducts(locale);
    const product = result.inSkillProducts[0]
    console.log(product);

    if (product.entitled === 'ENTITLED') {
      speechText = "Many years of happy days befall thee, my <emphasis level='strong'>gracious</emphasis> sovereign." 
      		+ "<audio src='https://s3.amazonaws.com/ask-soundlibrary/magic/amzn_sfx_fairy_melodic_chimes_01.mp3'/>";
    } else {
      upsell = product.summary + ' Say buy it now to make it happen!';
      speechText = 'Hello World. ' + upsell;
      repromptText = repromptText + upsell;
    }
```
	
12. Locate `line 135` and add the following line to the exports handler:
`  .withApiClient(new Alexa.DefaultApiClient())`

Your exports handler should look something like this when you're done:
```
exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    HelloWorldIntentHandler,
    HowAreYouIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .withApiClient(new Alexa.DefaultApiClient())
  .lambda();
```

13. Run `ask deploy` to deploy your skill from your local environment to the cloud. 

14. Test the new functionality within echosim.io or the skill development console. The logic you've added in this step will check to see if your customer is entitled to your product. If they are, the greeting will change! Since you haven't paid for the product yet, you should still see the standard greeting. We'll adjust this in order to complete the experience for paid customers, in the next step.
