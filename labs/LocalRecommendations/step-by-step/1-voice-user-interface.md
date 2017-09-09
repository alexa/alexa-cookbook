# Build An Alexa Local Recommendations Skill
[Voice User Interface](../step-by-step/1-voice-user-interface.md) || [Lambda Function](../step-by-step/2-lambda-function.md) || [Connect VUI to Code](../step-by-step/3-connect-vui-to-code.md) || [Testing](../step-by-step/4-testing.md) || [Customization](../step-by-step/5-customization.md) || [Intents and Slots](../step-by-step/6-intents-slots.md) || [Smart Recommendations](../step-by-step/7-smart-recommendations.md) || [Publication](../step-by-step/10-publication.md)


## Setting up Your Voice User Interface

There are two parts to an Alexa skill.  The first part is the [Voice User Interface (VUI)](https://developer.amazon.com/alexa-skills-kit/vui).  This is where we define how we will handle a user's voice input, and which code should be executed when specific commands are uttered.  The second part is the actual code logic for our skill, and we will handle that in [the next step](../step-by-step/2-lambda-function.md) of this step-by-step guide.

1.  **Go to the [Amazon Developer Portal](http://developer.amazon.com).  In the top-right corner of the screen, click the "Sign In" button.** </br>(If you don't already have an account, you will be able to create a new one for free.)

    <a href="http://developer.amazon.com" target="_new"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/1-1-developer-portal._TTH_.png" /></a>

2.  **Once you have signed in, click the Alexa button at the top of the screen.**

    <a href="https://developer.amazon.com/edw/home.html#/" target="_new"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/1-2-alexa-button._TTH_.png" /></a>

3.  **On the Alexa page, choose the "Get Started" button for the Alexa Skills Kit.**

    <a href="https://developer.amazon.com/edw/home.html#/skills/list" target="_new"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/1-3-alexa-skills-kit._TTH_.png" /></a>

4.  **Select "Add A New Skill."** This will get you to the first page of your new Alexa skill.

    <a href="https://developer.amazon.com/edw/home.html#/skill/create/" target="_new"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/1-4-add-a-new-skill._TTH_.png" /></a>

5.  **Fill out the Skill Information screen.**  Make sure to review the tips we provide below the screenshot.

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/1-5-skill-information._TTH_.png" />

    ### Skill Information Tips
    1.  **Skill Type** For this skill, we are creating a skill using the Custom Interaction Model.  This is the default choice.

    2.  **Language** Choose the first language you want to support.  You can add additional languages in the future, but we need to start with one.  (This guide is using U.S. English to start.)

    3.  **Name** This is the name that will be shown in the Alexa Skills Store, and the name your users will refer to.

    4.  **Invocation Name** This is the name that your users will need to say to start your skill.  We have provided some common issues developers encounter in the list below, but you should also review the entire [Invocation Name Requirements](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/choosing-the-invocation-name-for-an-alexa-skill).

        | Invocation Name Requirements | Examples of incorrect invocation names |
        | ---------------------------- | -------------------------------------- |
        | The skill invocation name must not infringe upon the intellectual property rights of an entity or person. | korean air; septa check |
        | Invocation names should be more than one word (unless it is a brand or intellectual property), and must not be a name or place | horoscope; trivia; guide; new york |
        | Two word invocation names are not allowed when one of the words is a definite article, indefinite article, or a preposition | any poet; the bookie; the fool |
        | The invocation name must not contain any of the Alexa skill launch phrases and connecting words.  Launch phrase examples include "launch," "ask," "tell," "load," and "begin."  Connecting word examples include "to," "from," "by," "if," "and," "whether." | trivia game for star wars; better with bacon |
        | The invocation name must not contain the wake words "Alexa," "Amazon," "Echo," or the words "skill" or "app." | hackster initial skill; word skills |
        | The invocation name must be written in each language you choose to support.  For example, the German version of your skill must have an invocation name written in German, while the English (US) version must have an invocation name written in English. | kitchen stories (German skill) |

    5.  **Audio Player** For this Fact skill, we won't be using any audio files, so you can select No for this option.  If you would like to learn more about adding audio to your skills, please check out our [Audio Player Guide](https://github.com/alexa/skill-sample-nodejs-audio-player).

6.  **Click the Next button to move to the Interaction Model.**

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/1-6-next-button._TTH_.png" />

7.  Click on the **Launch Skill Builder** (Beta) button . This will launch the new Skill Builder Dashboard.

    ![Launch Skill Builder](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/1-7-skill-builder-launch._TTH_.png)

8.  Click on the "Code Editor" item under **Dashboard** on the top left side of the skill builder.

9.  In the textfield provided, replace any existing code with the code provided in the [Interaction Model](https://github.com/voicehacks/setup-local-recommendations/blob/master/speech-assets/InteractionModel.json), then click "Apply Changes" or "Save Model".  

10. Click on the "Dashboard" button.

11. Add some more sample utterances for your newly generated intents.  These are the things a user would say to make a specific intent happen.  Here are a few examples:

    * I want some supper
    * Lunch time
    * Time for breakfast
    * I'm hungry

    ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/1-10-sample-utterances._TTH_.png)

12. Click on the **Save Model** button, and then click on the **Build Model** button.

    ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/1-12-skill-builder-build-save-model._TTH_.png)


13.  If your interaction model builds successfully, click on **Configuration button** to move on to Configuration. In our next step of this guide, we will be creating our Lambda function in the AWS developer console, but keep this browser tab open, because we will be returning here on [Page #3: Connect VUI to Code](https://github.com/voicehacks/setup-local-recommendations/blob/master/step-by-step/3-connect-vui-to-code.md).
     ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/1-13-skill-builder-configuration.png)

     If you get an error from your interaction model, check through this list:

     *  **Did you copy & paste the provided code into the appropriate boxes?**
     *  **Did you accidentally add any characters to the Interaction Model or Sample Utterances?**

<br/><br/>
<a href="../step-by-step/2-lambda-function.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_next_lambda_function._TTH_.png"/></a>

<img height="1" width="1" src="https://www.facebook.com/tr?id=1847448698846169&ev=PageView&noscript=1"/>
