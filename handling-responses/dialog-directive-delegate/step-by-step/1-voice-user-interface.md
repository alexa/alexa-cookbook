# Delegate Dialog Directive Sample Project
[![Voice User Interface](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-on._TTH_.png)](https://github.com/alexa/alexa-cookbook/blob/master/handling-responses/dialog-directive-delegate/step-by-step/1-voice-user-interface.md)[![Lambda Function](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-off._TTH_.png)](https://github.com/alexa/alexa-cookbook/blob/master/handling-responses/dialog-directive-delegate/step-by-step/2-lambda-function.md)[![Connect VUI to Code](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-off._TTH_.png)](https://github.com/alexa/alexa-cookbook/blob/master/handling-responses/dialog-directive-delegate/step-by-step/3-connect-vui-to-code.md)[![Testing](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-off._TTH_.png)](https://github.com/alexa/alexa-cookbook/blob/master/handling-responses/dialog-directive-delegate/step-by-step/4-testing.md)

## Setting up Your Voice User Interface

There are two parts to an Alexa skill.  The first part is the [Voice User Interface (VUI)](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/defining-the-voice-interface).  This is where we define how we will handle a user's voice input, and which code should be executed when specific commands are uttered.  The second part is the actual code logic for our skill, and we will handle that in [the next step](https://github.com/alexa/alexa-cookbook/tree/master/handling-responses/dialog-directive-delegate/blob/master/step-by-step/2-lambda-function.md) of this step-by-step guide.

1.  **Go to the [Amazon Developer Portal](http://developer.amazon.com).  In the top right corner of the screen, click the Sign In button.** </br>(If you don't already have an account, you will be able to create a new one for free.)

    ![Sign in](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/1-1-developer-portal._TTH_.png)

2.  **Once you have signed in, click the Alexa button at the top of the screen.**

    ![Alexa button](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/1-2-alexa-button._TTH_.png)

3.  **On the Alexa page, choose the Get Started button for the Alexa Skills Kit.**

    ![Get Started](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/1-3-alexa-skills-kit._TTH_.png)

4.  **Select Add A New Skill.** This will get you to the first page of your new Alexa skill.

    ![Amazon Developer Portal](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/1-4-add-a-new-skill._TTH_.png)

5.  **Fill out the Skill Information screen.**  Make sure to review the tips we provide below the screenshot.

    ![Skill Information](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/1-5-skill-information._TTH_.png)

    ### Skill Information Instructions
    *  **Skill Type** For this skill, we are creating a skill using the Custom Interaction Model.  This is the default choice.

    *  **Language** Choose the first language you want to support.  You can add additional languages in the future, but we need to start with one.  (This guide is using U.S. English to start.)

    *  **Name** This is the name of the skill as it will be displayed in the [Alexa app](http://alexa.amazon.com).

    *  **Invocation Name** This is the name spoken by your users to start the skill. Use a name like "plan my trip" for this sample skill. Some common issues that developers experience with invocation names are listed in the following table. In addition, please review the [Invocation Name Requirements](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/choosing-the-invocation-name-for-an-alexa-skill) as you consider an invocation name for your skill.

        | Invocation Name Requirements | Examples of incorrect invocation names |
        | ---------------------------- | -------------------------------------- |
        | The skill invocation name must not infringe upon the intellectual property rights of an entity or person. | korean air; septa check |
        | Invocation names should be more than one word (unless it is a brand or intellectual property), and must not be a name or place | horoscope; trivia; guide; new york |
        | Two word invocation names are not allowed when one of the words is a definite article, indefinite article, or a preposition | any poet; the bookie; the fool |
        | The invocation name must not contain any of the Alexa skill launch phrases and connecting words.  Launch phrase examples include "launch," "ask," "tell," "load," and "begin."  Connecting word examples include "to," "from," "by," "if," "and," "whether." | trivia game for star wars; better with bacon |
        | The invocation name must not contain the wake words "Alexa," "Amazon," "Echo," "Computer," or the words "skill" or "app." | hackster initial skill; word skills |
        | The invocation name must be written in each language you choose to support.  For example, the German version of your skill must have an invocation name written in German, while the English (US) version must have an invocation name written in English. | kitchen stories (German skill) |

    *  **Audio Player** For this skill, we won't be using any audio files, so you can select No for this option.  If you would like to learn more about adding audio to your skills, please check out our [Audio Player Guide](https://github.com/alexa/skill-sample-nodejs-audio-player).

6.  **Click the Next button to move to the Interaction Model.**

    ![Next Button](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/1-6-next-button._TTH_.png)

7.  **Fill out the Interaction Model screen.**  In an Alexa skill, a dialog with the user is a conversation with multiple turns in which Alexa asks questions and the user responds with the answers. The conversation is tied to a specific intent representing the user’s overall request. The questions and answers are intended to gather and confirm values for all of the intent’s required slots. The conversation continues until all slots needed for the intent are filled and confirmed.

      The skill builder (beta) provides visual tools to create the intents, slots, slot types, and dialog models for a skill.
      ![skill-builder](https://images-na.ssl-images-amazon.com/images/G/01/mobile-apps/dex/ask-customskills/skill-editor-dashboard-labeled._TTH_.png)
      >(A) The Dashboard appears when you start the skill editor (beta). It provides a summary of all the intents and slot types you have created so far.

      >(B) The left-hand navigation pane displays on all pages. From here, you can navigate to the Dashboard, your Intents, and your Slot Types. Use the ADD + links to create new intents or slot types from the navigation pane.

      >(C) Select an intent to edit its sample utterances, slots, and dialog information. The Intents list includes all the intents included in your skill’s interaction model. Expand the intent to see all of its slots (intent slots). Select a slot to edit its type and dialog information.

      >(D) Select a slot type to edit its list of values. This list includes all custom slot types you created and any built-in types that you have extended with additional values.

      >(E) Click these buttons to save your work and build the interaction model. Save Model saves the data, regardless of whether it is valid for a build. Build Model validates, saves, and builds the interaction model.

      >(F) Return to the rest of the pages on the developer portal to configure, test, and publish your skill.

    7.1. *OPTIONAL:* You can choose to upload a file to fill out your interaction model. To do that for this sample click on the `</> Code Editor` tab and drag your JSON file from the [dialog-directive-delegate sample in the Alexa cookbook](https://github.com/alexa/alexa-cookbook/blob/master/handling-responses/dialog-directive-delegate/speech-assets/InteractionModel.json) to the cloud upload icon. Once you're done, click `Apply Changes`. From this point you can follow along with the rest of step 7 to see how things work or move onto step 8.

    Here are the steps to build out your interaction model by hand.  

    7.2. **Add an Intent** An intent defines the actions that we want our users to be able to take ([learn more](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/ask-define-the-vui-with-gui#about-intents-slots-and-dialogs)). From the left navigation, click the `ADD+` button for Intents to open the Add Intent page.

    7.3.  **Create a new custom intent** Type `PlanMyTrip` into the `Create a new custom intent` field. With the skill builder you can also choose from over 100 built-in Intents. Whenever one of these intents fits your scenario it's best to use one of these because the utterances and slots are already trained for you. For this example, we'll show you how to create a custom intent.

    7.4. **Sample Utterances** Add a list of phrases that people would say to invoke your new PlanMyTrip intent. Notice how we gather responses like the city we're going to by using `{ }` to create a slot. Enter any phrases people might say to start planning a trip.
    ```
    Plan a trip
    I'd like to plan a trip
    I will go to {toCity} on the {travelDate}
    I will go to {toCity} {travelDate}
    We'll visit {toCity} on the {travelDate}
    We'll visit {toCity} {travelDate}
    I want to visit {toCity}
    I want to travel from {fromCity} to {toCity} on {travelDate}
    I'm going to {toCity} to {activity}
    There's a {activity} in {toCity}
    ```
    click `Save Model`

    7.5. **Choose Slot Types** On the right, notice the `Intent Slots` panel with all of the new slots that you created while adding utterances. Tick the `toCity, fromCity, and travelDate checkboxes` to indicate that these are required slots. Click `choose a slot type` and select AMAZON.US_CITY for fromCity and toCity. Select AMAZON.DATE for travelDate so that people can say things like "next tuesday" or "March 5th" and you'll get a date value back.

    7.6. **Add Slot Types** Whenever possible choose from one of the built in slot types like we did for city and date. Those are already trained for you. To create a custom slot type, look for the `Slot Types` section on the right navigation and choose `ADD+` to bring up the Add Slot Type page. Type `LIST_OF_ACTIVITIES` and enter slot values like:
    ```
    swimming
    hiking
    shopping
    surfing
    concert
    play
    visit my relatives
    visit my friends
    ```
    click `Save Model`

    7.7. **Set the slot type for activity to LIST_OF_ACTIVITIES** from the left navigation, choose `PlanMyTrip` then from the right panel, `choose a slot type` for activity and pick `LIST_OF_ACTIVITIES`.

    Next we'll add prompts and utterances for each of the required cities. To learn more see the [required slots](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/ask-define-the-vui-with-gui#id-required-slots) section of the documentation.

    7.8. **Add Prompts and Utterances for toCity** In the left navigation choose `toCity`.

    Set the `is this slot required to fulfill the intent` option to `YES`.

    Add prompts that Alexa will use to request the toCity from users.
    ```
    Where are you going?
    Which city are you going to?
    ```
    and add a list of utterances that users might respond with. Notice that you can enable the user to over answer with other slot values. That helps the experience be more conversational rather than feeling like a wizard.
    ```
    I'd like to go to {toCity}
    I'd like to go {activity} in {toCity}
    I'd like to visit {toCity}
    we're going to {toCity}
    I will leave on {travelDate}
    I will go to {toCity} on {travelDate}
    I'd like to start in {toCity} on {travelDate} and go to {toCity}
    ```
    Leave Slot Confirmation set to NO. You'd use this if you'd want Alexa to say something like "are you sure" after gathering the slot value.

    click `Save Model`

    7.9. **Add Prompts and Utterances for fromCity** In the left navigation choose `fromCity`.

    Set the `is this slot required to fulfill the intent` option to `YES`.

    Add prompts that Alexa will use to request the fromCity from users.
    ```
    Where are you starting your trip?
    What city are you leaving from?
    ```
    and add a list of utterances that users might respond with
    ```
    leaving from {fromCity}
    from {fromCity}
    my trip starts in {fromCity}
    ```
    Leave Slot Confirmation set to NO. You'd use this if you'd want Alexa to say something like "are you sure" after gathering the slot value.

    click `Save Model`

    7.10. **Add Prompts and Utterances for travelDate** In the left navigation choose `travelDate`.

    Set the `is this slot required to fulfill the intent` option to `YES`.

    Add prompts that Alexa will use to request the travelDate from users.
    ```
    What date are you flying out?
    When will you start this trip?
    ```
    and add a list of utterances that users might respond with
    ```
    leaving on {travelDate}
    my trip starts {travelDate}
    ```
    Leave Slot Confirmation set to NO. You'd use this if you'd want Alexa to say something like "are you sure" after gathering the slot value.

    click `Save Model`

8. **Build Model** Now you've created a new PlanMyTrip Intent with three required slots, toCity, fromCity, and travelDate as well as an optional activities slot. You've also created the related prompts Alexa will use and the utterances people will respond with. Now it's time to prepare all this information for use in your Alexa skill. click the `Build Model` button from the top navigation.

If your interaction model builds successfully, click `Configuration` to move on to Configuration.  In our next step of this guide, we will be creating our Lambda function in the AWS developer console, but keep this browser tab open, because we will be returning here on [Page #3: Connect VUI to Code](https://github.com/alexa/alexa-cookbook/tree/master/handling-responses/dialog-directive-delegate/blob/master/step-by-step/3-connect-vui-to-code.md).


<br/><br/>
[![Next: Lambda Function](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_next_lambda_function._TTH_.png)](https://github.com/alexa/alexa-cookbook/blob/master/handling-responses/dialog-directive-delegate/step-by-step/2-lambda-function.md)

<img height="1" width="1" src="https://www.facebook.com/tr?id=1847448698846169&ev=PageView&noscript=1"/>
