# VUI Testing Tool
[![Voice User Interface](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-locked._TTH_.png)](https://github.com/alexa/alexa-cookbook/blob/master/tools/VUI%20Testing%20Tool/step-by-step/1-voice-user-interface.md)[![Lambda Function](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-locked._TTH_.png)](https://github.com/alexa/alexa-cookbook/blob/master/tools/VUI%20Testing%20Tool/step-by-step/2-lambda-function.md)[![Connect VUI to Code](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-locked._TTH_.png)](https://github.com/alexa/alexa-cookbook/blob/master/tools/VUI%20Testing%20Tool/step-by-step/3-connect-vui-to-code.md)[![Testing](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-on._TTH_.png)](https://github.com/alexa/alexa-cookbook/blob/master/tools/VUI%20Testing%20Tool/step-by-step/4-testing.md)


## Testing Your Alexa Skill

So far, we have [created a Voice User Interface](https://github.com/Alexa/alexa-cookbook/blob/master/tools/VUI-Testing/step-by-step/1-voice-user-interface.md) and [a Lambda function](https://github.com/Alexa/alexa-cookbook/blob/master/tools/VUI-Testing/step-by-step/2-lambda-function.md), and [connected the two together](https://github.com/Alexa/alexa-cookbook/blob/master/tools/VUI-Testing/step-by-step/3-connect-vui-to-code.md).  Your skill is now ready to test.

1.  **Go back to the [Amazon Developer Portal](https://developer.amazon.com/edw/home.html#/skills/list) and select your skill from the list.** You may still have a browser tab open if you started at the beginning of this tutorial.

2.  **Open the "Test" tab on the left side.**

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/4-2-test-tab._TTH_.png" />

3.  **Test with a device or Echosim.io** Skills that use dialog delegation need to be tested with a device or [Echosim](https://echosim.io/).
 - to test using a device all you need to do is, make sure your device is configured with the same account you used to create the skill.
 - If using Echosim, make sure you log in with the same account you are using to build your skill.
 Reference](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/dialog-interface-reference).
4. **See the full documentation for more details** The [Using the skill builder (beta) ](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/ask-define-the-vui-with-gui) walks you through creating intents, slots, and dialogs. The [dialog interface reference](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/dialog-interface-reference) will give you more details on the Delegate directive used in this sample as well as the ElicitSlot, ConfirmSlot, ConfirmIntent directives.
