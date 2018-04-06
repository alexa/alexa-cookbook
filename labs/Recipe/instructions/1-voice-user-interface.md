# Build An Alexa Recipe Skill
[![Voice User Interface](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-on._TTH_.png)](./1-voice-user-interface.md)[![Lambda Function](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-off._TTH_.png)](./2-lambda-function.md)[![Connect VUI to Code](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-off._TTH_.png)](./3-connect-vui-to-code.md)[![Testing](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-off._TTH_.png)](./4-testing.md)[![Customization](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-off._TTH_.png)](./5-customization.md)[![Publication](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-off._TTH_.png)](./6-publication.md)

## Setting up Your Alexa Skill in the Developer Portal
1.  **Go to the [Amazon Developer Portal](http://developer.amazon.com).  In the top-right corner of the screen, click the "Sign In" button.** </br>(If you don't already have an account, you will be able to create a new one for free.)


2.  Once you have signed in, move your mouse over the **Your Alexa Consoles** text at the top of the screen and Select the **Skills (New)** Link.


3.  From the **Alexa Skills Console (New Console)** select the **Create Skill** button near the top of the screen.


4. Give your new skill a **Name**. This is the name that will be shown in the Alexa Skills Store, and the name your users will refer to. Push Next.

5. Select the **Custom** model at the top of the page to add to your skill and select the **Create Skill** button at the top right.

6. **Build the Interaction Model for your skill**
	1. On the left hand navigation panel. Select the **Invocation** tab. Enter a **Skill Inovcation Name**. This is the name that your users will need to say to start your skill.
	2. Next, select the **JSON Editor** tab. In the textfield provided, replace any existing code with the code provided in the [Interaction Model](../models/en-US.json), then click "Build Model".

	**Note:** You should notice that **Intents** and **Slot Types** will auto populate based on the JSON Interaction Model that you have now applied to your skill. Feel free to explore the changes here, to learn about **Intents**, **Slots**, and **Utterances** open our [technical documentation in a new tab](https://developer.amazon.com/docs/custom-skills/define-the-interaction-model-in-json-and-text.html).

7. **Optional:** Select an intent by expanding the **Intents** from the left side navigation panel. Add some more sample utterances for your newly generated intents. Think of all the different ways that a user could request to make a specific intent happen. A few examples are provided. Be sure to click **Save Model** and **Build Model** after you're done making changes here.

8. If your interaction model builds successfully, proceed to the next step. If not, you should see an error. Try to resolve the errors. In our next step of this guide, we will be creating our Lambda function in the AWS developer console, but keep this browser tab open, because we will be returning here on [Page #3: Connect VUI to Code](./3-connect-vui-to-code.md).


     If you get an error from your interaction model, check through this list:

     *  **Did you copy & paste the provided code correctly?**
     *  **Did you accidentally add any characters to the Interaction Model or Sample Utterances?**

<br/><br/>
<a href="./2-lambda-function.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_next_lambda_function._TTH_.png" /></a>
