# Build An Alexa Local Recommendations Skill
[Voice User Interface](../step-by-step/1-voice-user-interface.md) || [Lambda Function](../step-by-step/2-lambda-function.md) || [Connect VUI to Code](../step-by-step/3-connect-vui-to-code.md) || [Testing](../step-by-step/4-testing.md) || [Customization](../step-by-step/5-customization.md) || [Intents and Slots](../step-by-step/6-intents-slots.md) || [Smart Recommendations](../step-by-step/7-smart-recommendations.md) || [Publication](../step-by-step/10-publication.md)




<!--<a href="../step-by-step/1-voice-user-interface.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-locked._TTH_.png" /></a><a href="../step-by-step/2-lambda-function.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-locked._TTH_.png" /></a><a href="../step-by-step/3-connect-vui-to-code.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-locked._TTH_.png" /></a><a href="../step-by-step/4-testing.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-locked._TTH_.png" /></a><a href="../step-by-step/5-customization.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-locked._TTH_.png" /></a><a href="../step-by-step/10-publication.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-on._TTH_.png" /></a>-->

## Add Smart Recommendations

When the user says "go outside", the ```GoOutIntent``` intent is called and the code in the GoOutIntent handler block is executed.
This makes an API call over the Internet to the Yahoo Weather service, which returns the weather and current time in your city.

You can enhance the ```GoOutIntent``` handler code (around line 185) to make a relevant activity suggestion to the user.
For example, add logic to decide, based on current time and weather conditions, whether to:

 * Go out to a local beach or park
 * Recommend a movie theatre or mall
 * Attend a scheduled public event happening soon
 * Staying home to watch a movie on Amazon Prime
 * etc..

### To begin, follow these steps

1. Test ‘go outside’ skill in simulator first. You should get a standard response giving you the time and weather conditions in your city.

1. Go to your lambda function

1. Scroll through your code to one of the last handlers, called ```GoOutIntent```

1. Now, paste this code into your GoOutIntent:

```
            var AMPM = localTime.substr(-2);
            console.log(AMPM);
            var hour = parseInt(localTime.split(':').shift());
            if(AMPM == "PM" && hour < 12) { hour = hour + 12; }
            console.log(hour);

            var suggestion = 'Read a book.';

            console.log(suggestion);

            if(hour < 7 ) {suggestion = 'Sleep.'; }
            if(hour >= 7 && hour < 12) {suggestion = 'Ask me for a breakfast recommendation.'; }
            if(hour >= 12 && hour < 14) {suggestion = 'Ask me for a lunch recommendation.'; }
            if(hour >= 17 && hour < 20) {suggestion = 'Ask me for a dinner recommendation.'; }

            if(hour >= 22) {suggestion = 'Go to bed.'; }

            if(hour >= 20 && hour < 22) {
                if(['Rain', 'Shower', 'Thunderstorms'].indexOf(currentCondition) > -1) {
                    suggestion = 'Stay home and watch a movie on Amazon Prime since it is wet outside.';   
                } else {
                    suggestion = 'Check out what is playing at the Cineplex movie theater on 123 Main St.';
                }

            }

            if (['Sunny'].indexOf(currentCondition) > -1 -1 && currentTemp > 75 && hour < 11) {suggestion = 'Plan a day at the beach, as it is sunny and warm today.'}

            console.log(suggestion);
            this.emit(':tell', 'It is ' + localTime
            + ' and the weather in ' + data.city
            + ' is '
            + currentTemp + ' and ' + currentCondition
            + '. I suggest you ' + suggestion);
```            

1. What we have just done is create some logic that matches possible outcomes to a custom response for our users.

1. Now click Save, then click Test. Our test should pass.

1. Go to the developer portal.

1. Type 'go outside' into the Enter Utterance field found in the Service Simulator and press enter

1. Alexa should give us a customized recommendation according to your code.

### Extra Credit

What if we wanted to get info about local movie showtimes? Try adding another API call, maybe one that checks movie showtimes for a local theater, or something creative that you come up with yourself!


When you are ready, proceed to learn about [design for Alexa](../step-by-step/8-alexa-design.md).

<br/><br/>
<!-- <a href="../step-by-step/8-alexa-design.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_next_publication._TTH_.png" /></a> -->

<img height="1" width="1" src="https://www.facebook.com/tr?id=1847448698846169&ev=PageView&noscript=1"/>
