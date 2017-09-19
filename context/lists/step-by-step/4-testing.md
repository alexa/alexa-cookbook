# Alexa Lists Integration Sample Project
[![Voice User Interface](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-locked._TTH_.png)](https://github.com/Alexa/alexa-cookbook/blob/master/context/lists/step-by-step/1-voice-user-interface.md)[![Lambda Function](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-locked._TTH_.png)](https://github.com/Alexa/alexa-cookbook/blob/master/context/lists/step-by-step/2-lambda-function.md)[![Connect VUI to Code](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-locked._TTH_.png)](https://github.com/Alexa/alexa-cookbook/blob/master/context/lists/step-by-step/3-connect-vui-to-code.md)[![Testing](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-on._TTH_.png)](https://github.com/Alexa/alexa-cookbook/blob/master/context/lists/step-by-step/4-testing.md)

<!--<a href="https://github.com/Alexa/alexa-cookbook/blob/master/context/lists/step-by-step/1-voice-user-interface.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-locked._TTH_.png" /></a><a href="https://github.com/Alexa/alexa-cookbook/blob/master/context/lists/step-by-step/2-lambda-function.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-locked._TTH_.png" /></a><a href="https://github.com/Alexa/alexa-cookbook/blob/master/context/lists/step-by-step/3-connect-vui-to-code.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-locked._TTH_.png" /></a><a href="https://github.com/Alexa/alexa-cookbook/blob/master/context/lists/step-by-step/4-testing.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-on._TTH_.png" /></a><a href="https://github.com/Alexa/alexa-cookbook/blob/master/context/lists/step-by-step/5-customization.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-off._TTH_.png" /></a><a href="https://github.com/Alexa/alexa-cookbook/blob/master/context/lists/step-by-step/6-publication.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-off._TTH_.png" /></a>-->

## Testing Your Alexa Skill

So far, we have [created a Voice User Interface](https://github.com/Alexa/alexa-cookbook/blob/master/context/lists/step-by-step/1-voice-user-interface.md) and [a Lambda function](https://github.com/Alexa/alexa-cookbook/blob/master/context/lists/step-by-step/2-lambda-function.md), and [connected the two together](https://github.com/Alexa/alexa-cookbook/blob/master/context/lists/step-by-step/3-connect-vui-to-lambda.md).  Your skill is now ready to test.

1.  **Go back to the [Amazon Developer Portal](https://developer.amazon.com/edw/home.html#/skills/list) and select your skill from the list.** You may still have a browser tab open if you started at the beginning of this tutorial.

2.  **Open the "Test" tab on the left side.**

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/4-2-test-tab._TTH_.png" />

3.  **Understand the voice simulator.** While it's not specific to your skill, the Voice Simulator is a valuable testing tool for every skill. Type a word into the box, and click the "Listen" button to hear how Alexa will
pronounce it. To make changes to her pronunciation, use Speech Synthesis Markup Language [(SSML)](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speech-synthesis-markup-language-ssml-reference) to modify how Alexa will interpret text to speech. Try these examples:

    ```html
    <say-as interpret-as="number">12345</say-as>
    ```

    ```html
    <say-as interpret-as="ordinal">12345</say-as>
    ```

    ```html
    <say-as interpret-as="digits">12345</say-as>
    ```

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/4-3-voice-simulator._TTH_.png" />

    Return to the Voice Simulator as needed to ensure that Alexa says words and phrases as you would expect.

4.  **Test with a device.** The Service Simulator is not a device, so it cannot be used to test the device address component of your skill workflow. Use a an actual device for testing and development when testing Alexa Lists integration. [See Access the Alexa Shopping and To-do Lists](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/access-the-alexa-shopping-and-to-do-lists).
5. **Learn more about how the API works** The [Using the Alexa Lists Access API](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/access-the-alexa-shopping-and-to-do-lists) walks you through getting the user permissions, obtaining the customer consent token, accessing the API, and handling the missing customer permissions.



<img height="1" width="1" src="https://www.facebook.com/tr?id=1847448698846169&ev=PageView&noscript=1"/>
