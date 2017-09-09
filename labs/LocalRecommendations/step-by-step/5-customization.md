# Build An Alexa Local Recommendations Skill
[Voice User Interface](../step-by-step/1-voice-user-interface.md) || [Lambda Function](../step-by-step/2-lambda-function.md) || [Connect VUI to Code](../step-by-step/3-connect-vui-to-code.md) || [Testing](../step-by-step/4-testing.md) || [Customization](../step-by-step/5-customization.md) || [Intents and Slots](../step-by-step/6-intents-slots.md) || [Smart Recommendations](../step-by-step/7-smart-recommendations.md) || [Publication](../step-by-step/10-publication.md)




<!--<a href="../step-by-step/1-voice-user-interface.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-locked._TTH_.png" /></a><a href="../step-by-step/2-lambda-function.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-locked._TTH_.png" /></a><a href="../step-by-step/3-connect-vui-to-code.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-locked._TTH_.png" /></a><a href="../step-by-step/4-testing.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-locked._TTH_.png" /></a><a href="../step-by-step/5-customization.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-on._TTH_.png" /></a><a href="../step-by-step/10-publication.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-off._TTH_.png" /></a>-->

## Customize the Skill to be Yours

At this point, you should have a working copy of our Local Recommendations skill.  In order to make it your own, you will need to customize it with data and responses that you create.  Here are the things you will need to change:

1.  **New data.** You will need to create a new dataset for your skill that *isn't* the Gloucester, Massachusetts.  If you are looking for an idea, just use your hometown or favorite vacation destination.

    1.  **Open a copy of index.js.** If you haven't already downloaded the code for this project, [you can find a copy of index.js here on GitHub](../src/index.js).  You can use a simple, lightweight code editor like [Atom](http://atom.io), [Sublime Text](http://sublimetext.com), or [VSCode](http://code.visualstudio.com), but you also have the option to edit the code directly in your Lambda function.

    2.  **Search for the comment "var data = {"**  This is the data for our skill.  You can see that there is a row for city, state, postcode, restaurants, and attractions.

        You can provide as few or as many properties for your restaurant and attractions data as you would like, but we recommend a minimum of three to keep your skill interesting.  

    3.  **Consider using built-in slot values.** We recommend considering data from the built-in slot values provided by Amazon.  You still need to build your entire dataset, but using values from the built-in slots will make your work in the next few steps easier.  We have provided a few examples below, but you can see the [entire list of built-in slot values here](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference#list-types).

        | Slot Name | Description | Sample Values | Supported Languages |
        | --------- | ----------- | ------------- | ------------------- |
        | [AMAZON.Actor](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference#actor) | Names of actors and actresses | Alan Rickman, Amy Adams, Daniel Radcliffe, Emma Watson | US |
        | [AMAZON.Airline](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference#airline) | Name of a variety of airlines | Alaska Airlines, British Airways, Dolphin Air, Maestro | US |
        | [AMAZON.Animal](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference#animal) | Names of many different animals | blister beetle, common frog, moray eel, opossum, spider monkey | US |
        | [AMAZON.Comic](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference#comic) | Titles of comic books | Justice League, Runaways, The Amazing Spiderman, Watchmen, X-Men | US |
        | [AMAZON.EUROPE_CITY](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference#europe_city) | European and world cities | Kempten, Lourdes, Paris, London, Barcelona | US, UK, DE |
        | [AMAZON.Sport](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference#sport) | Names of sports | basketball, college football, football, gymnastics, team handball | US |
        | [AMAZON.VideoGame](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/slot-type-reference#videogame) | Titles of video games | Doom Two, Lemmings, The Sims, Worms | US |

    4.  **Once you have your data, here are a couple of tips to remember as we move forward:**

        *  **Alexa will read your restaurant and attraction names, so each property name should be readable in your questions.**  These names are also used in **cards** in the Alexa app, so you should capitalize the first letter of each word.  The skill will automatically separate words and add spaces as necessary.
        *  **If you can't remember the details for a place, just look them up.** We're going to be publishing this skill, so we need to make sure that our users are getting accurate data.

    5.  **When you have replaced the data in index.js, copy the contents of your file to your Lambda function.**  This should be as simple as copying the text, and pasting it into the code box for your Lambda.

        <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/5-1-5-lambda-code-box._TTH_.png" />

2.  **New language.** If you are creating this skill for another language other than English, you will need to make sure Alexa's responses are also in that language.

    *  For example, if you are creating your skill in German, every single response that Alexa makes has to be in German.  You can't use English responses or your skill will fail certification.

3.  **Once you have made the updates listed on this page, you can move on to adding new intents and custom slots to your skill.**

[Intents and Custom Slots](../step-by-step/6-intents-slots.md)

<br/><br/>
<!-- <a href="../step-by-step/6-intents-slots.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_next_publication._TTH_.png" /></a> -->

<img height="1" width="1" src="https://www.facebook.com/tr?id=1847448698846169&ev=PageView&noscript=1"/>
