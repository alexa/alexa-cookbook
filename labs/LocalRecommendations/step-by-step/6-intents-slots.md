# Build An Alexa Local Recommendations Skill
[Voice User Interface](../step-by-step/1-voice-user-interface.md) || [Lambda Function](../step-by-step/2-lambda-function.md) || [Connect VUI to Code](../step-by-step/3-connect-vui-to-code.md) || [Testing](../step-by-step/4-testing.md) || [Customization](../step-by-step/5-customization.md) || [Intents and Slots](../step-by-step/6-intents-slots.md) || [Smart Recommendations](../step-by-step/7-smart-recommendations.md) || [Publication](../step-by-step/10-publication.md)


<!--<a href="../step-by-step/1-voice-user-interface.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-locked._TTH_.png" /></a><a href="../step-by-step/2-lambda-function.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-locked._TTH_.png" /></a><a href="../step-by-step/3-connect-vui-to-code.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-locked._TTH_.png" /></a><a href="../step-by-step/4-testing.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-locked._TTH_.png" /></a><a href="../step-by-step/5-customization.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-locked._TTH_.png" /></a><a href="../step-by-step/10-publication.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-on._TTH_.png" /></a>-->

## Add a New Intent with Slots

1.  **Choosing Slot Types**

Continuing with Local Recommendations, we’ve customized for our city/town, let’s add a feature by adding a new intent, such as a new type of intent that we want our skill to handle. Let’s create an intent so we can ask this skill which sports team plays hockey, baseball, etc. Go into skill builder, create an intent, type a sample utterance, double-click on slot word and define that, then add some code to pull out a slot value and handle the intent and provide a custom response to the user.

1. Go to developer.amazon, click Interaction Model on the left to enter the skill builder.

1. Click "Add New Intent".

1. Name it ``` TeamNameIntent ``` and click Create Intent.

1. Click utterances and type: "what team plays basketball" then enter.

1. Double-click the word basketball, and name it "sport" in the create a new intent slot on the right.

1. Click choose a slot type. You should see a list of suggested slot types- search for sport here, then choose the premade ``` AMAZON.sport ``` type.

1. Click Save & then click Build Skill.

1. Click test.

1. Type "what team plays baseball" into the Service Simulator > Enter Utterance field and then hit enter.

1. When you see the Lambda Request box fill with code, select everything in that box and copy it.

1. In your aws.amazon window: click ‘Actions’ button, then select "Configure Test Event".

1. Paste the code that you just copied into the field that comes up, then scroll down and click "Save and Test".

1. This test should fail, but we expect it to so it's ok.  

1. Go back to your Lambda function and find your handlers. Copy an entire handler and paste it in. You should now have something like this:

```     
    'AboutIntent': function () {
        this.emit(':tell', this.t('ABOUT'));
    },

    'AboutIntent': function () {
        this.emit(':tell', this.t('ABOUT'));
    },
```

1. Change the name of your second AboutIntent to ``` TeamNameIntent ``` .

1. Add a line below the name that has this code: ``` var say = 'handling the team name intent'; ``` .

1. Add a line below that with this code: ``` this.emit(':tell', say); ``` .

1. Now Click Save at the top, then click Test.  This time our test should pass.

1. On the line below ``` var say = 'handling the team name intent'; ```, paste this code:

```
        var sportName = '';
        if (this.event.request.intent.slots.sport.value) {
            sportName = this.event.request.intent.slots.sport.value;
        }
        switch(sportName) {
        case 'basketball':
          say = 'The Boston Celtics are the local basketball team.';
          break;
          case 'hockey':
          say = 'The Boston Bruins are the local hockey team.';
          break;
          case 'baseball':
          say = 'The Boston Red Sox are the local baseball team.';
          break;
          case 'football':
          say = 'The New England Patriots are the local football team.';
          break;
          default:
          say = 'Please try again. You can ask which team plays either basketball, hockey, baseball, or football. ';
        }
```

1. Based on what the user says, this will give our user a response to what they asked, and the default will ensure that we help the user if they ask for a sport we haven't planned on.

1. Save, then test again, then go to the developer portal.

1. Now when you test your utterance in the skill builder, you should get and be able to hear a response.

### Extra Credit

What about custom slot types? The Alexa [Quiz Game](https://github.com/alexa/skill-sample-nodejs-quiz-game/blob/master/step-by-step/1-voice-user-interface.md) Skill uses a custom slot, named US_STATE_ABBR.  Try creating a custom slot for your own skill.


When you are ready, proceed to [Smart Recommendations](../step-by-step/7-smart-recommendations.md).

<br/><br/>
<!-- <a href="../step-by-step/7-smart-recommendations.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_next_publication._TTH_.png" /></a> -->

<img height="1" width="1" src="https://www.facebook.com/tr?id=1847448698846169&ev=PageView&noscript=1"/>
