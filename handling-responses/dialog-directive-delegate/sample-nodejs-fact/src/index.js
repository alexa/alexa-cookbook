/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = "";  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    'en-US': {
        translation: {
            FACTS: [
                'A year on Mercury is just 88 days long.',
                'Despite being farther from the Sun, Venus experiences higher temperatures than Mercury.',
                'Venus rotates counter-clockwise, possibly because of a collision in the past with an asteroid.',
                'On Mars, the Sun appears about half the size as it does on Earth.',
                'Earth is the only planet not named after a god.',
                'Jupiter has the shortest day of all the planets.',
                'The Milky Way galaxy will collide with the Andromeda Galaxy in about 5 billion years.',
                'The Sun contains 99.86% of the mass in the Solar System.',
                'The Sun is an almost perfect sphere.',
                'A total solar eclipse can happen once every 1 to 2 years. This makes them a rare event.',
                'Saturn radiates two and a half times more energy into space than it receives from the sun.',
                'The temperature inside the Sun can reach 15 million degrees Celsius.',
                'The Moon is moving approximately 3.8 cm away from our planet every year.',
            ],
            PLANETS: {
                "mercury":{
                    "PrintName": "Mercury",
                    "DistanceFromSun": 36, // millions of miles
                    "Weather": "high of 840 and low of minus 275 fahrenheit. Nothing but sun."
                },
                "venus":{
                    "PrintName": "Venus",
                    "DistanceFromSun": 67.2, // millions of miles
                    "Weather": "high and low of 870 fahrenheit. Expect thick cloud cover <break time=\"1s\"/> forever."
                },
                "earth":{
                    "PrintName": "Earth",
                    "DistanceFromSun": 93, // millions of miles
                    "Weather": "high of 136 and low of minus 129 fahrenheit. Anything can happen on this planet."
                },
                "mars":{
                    "PrintName": "Mars",
                    "DistanceFromSun": 141.6, // millions of miles
                    "Weather": "high of 70 and low of minus 195 fahrenheit. Sunny with a chance of sandstorms later in the day."
                },
                "jupiter":{
                    "PrintName": "Jupiter",
                    "DistanceFromSun": 483.6, // millions of miles
                    "Weather": "high of minus 148 and low of minus 234 fahrenheit. Storms are highly likely, bringing heavy rain and high winds."
                },
                "saturn":{
                    "PrintName": "Saturn",
                    "DistanceFromSun": 886.7, // millions of miles
                    "Weather": "high of 134 and low of minus 288 fahrenheit. Cloudy with a chance of super storm."},
                "uranus":{
                    "PrintName": "Uranus",
                    "DistanceFromSun": 1784, // millions of miles
                    "Weather": "high and low of minus 357 fahrenheit. Cloudy with a chance of storms."
                },
                "neptune":{
                    "PrintName": "Neptune",
                    "DistanceFromSun": 2794.4, // millions of miles
                    "Weather": "high of minus 328 and low of minus 360 fahrenheit. Extreme wind and a change of storms."
                },
                "pluto":{
                    "PrintName": "Pluto",
                    "DistanceFromSun": 3674.5, // millions of miles
                    "Weather": "high of minus 387 and low of minus 396 fahrenheit. Snow is expected."
                }
            },
            VEHICLES: {
                "car": {"speed": 65, "string":"in a car"},
                "jet": {"speed": 500, "string":"in a jetliner"},
                "concorde": {"speed": 1350, "string":"in a Concorde"},
                "rocket": {"speed": 11250, "string":"by rocket"},
                "light": {"speed": 670616629, "string":"at the speed of light"}
            },
            JOKES: [ // jokes from http://www.funology.com/outer-space-jokes/
                'What is a spaceman’s favorite chocolate? <break time=\"1s\"/>A marsbar!',
                'What kind of music do planets sing? <break time=\"1s\"/>Neptunes!',
                'What do aliens on the metric system say? <break time=\"1s\"/>Take me to your liter.',
                'Why did the people not like the restaurant on the moon? <break time=\"1s\"/>Because there was no atmosphere.',
                'I’m reading a book about anti-gravity. <break time=\"1s\"/>It’s impossible to put down!',
                'How many ears does Captain Kirk have? <break time=\"1s\"/>Three. A left ear, a right ear, and a final frontier!',
                'What did Mars say to Saturn? <break time=\"1s\"/>Give me a ring sometime!'
            ],
            SKILL_NAME: 'Spacey',
            GET_FACT_MESSAGE: "Here's an interesting one: ",
            HELP_MESSAGE: 'You can say tell me a space fact, ask me for the travel time between two planets, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
            LAUNCH_MESSAGE: 'Welcome to spacey. I know facts about space, how long it takes to travel between two planets and I even know a joke.',
            LAUNCH_MESSAGE_REPROMPT: 'Try asking me to tell you something about space.'
        },
    }
};

const handlers = {
    'LaunchRequest': function () {
        const speechOutput = this.t('LAUNCH_MESSAGE');
        const repromptOutput = this.t('LAUNCH_MESSAGE_REPROMPT');

        this.response.cardRenderer(this.t('SKILL_NAME'), removeSSML(speechOutput));
        this.response.speak(speechOutput).listen(repromptOutput);
        this.emit(':responseReady');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        const factArr = this.t('FACTS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];

        // Create speech output
        const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;

        this.response.cardRenderer(this.t('SKILL_NAME'), removeSSML(speechOutput));
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'GetTravelTime': function () {
        // Use this.t() to get corresponding language data
        console.log(this.event.request);
        console.log(this.event.request.intent.slots);
        if (this.event.request.dialogState == "STARTED" || this.event.request.dialogState == "IN_PROGRESS"){
            this.context.succeed({
                "response": {
                    "directives": [
                        {
                            "type": "Dialog.Delegate"
                        }
                    ],
                    "shouldEndSession": false
                },
                "sessionAttributes": {}
            });
        } else {
            var departingPlanet = this.event.request.intent.slots.DepartingPlanet.value.toLowerCase();
            var arrivalPlanet = this.event.request.intent.slots.ArrivingPlanet.value.toLowerCase();
            var vehicle = "rocket";
            if(this.event.request.intent.slots.Vehicle != null ) {
                if(this.event.request.intent.slots.Vehicle.value != undefined ) {
                    vehicle = this.event.request.intent.slots.Vehicle.value.toLowerCase();
                }
            }

            var planetDB = this.t('PLANETS');
            var speedDB = this.t('VEHICLES');

            var distance = Math.abs(planetDB[departingPlanet].DistanceFromSun - planetDB[arrivalPlanet].DistanceFromSun);
            var speedOfTravel = speedDB[vehicle].speed;

            var speechOutput = "It would take about "

            var travelTimeHours = (distance*1000000)/speedOfTravel;
            if (travelTimeHours<24) {
                var travelTimeMinutes = Math.round(travelTimeHours * 60);
                speechOutput += travelTimeMinutes+" minutes";
            } else if (travelTimeHours>8760) {
                var travelTimeYears = (travelTimeHours / 8760).toFixed(1);
                speechOutput += travelTimeYears+" years";
            } else if (travelTimeHours>730) {
                var travelTimeMonths = (travelTimeHours / 730).toFixed(1);
                speechOutput += travelTimeMonths+" months";
            } else if (travelTimeHours>24) {
                var travelTimeDays = (travelTimeHours / 24).toFixed(1);
                speechOutput += travelTimeDays+" days";
            } else {
                speechOutput += travelTimeHours+" hours";
            }

            speechOutput += " to travel from " +planetDB[departingPlanet].PrintName+ " to " + planetDB[arrivalPlanet].PrintName + " " + speedDB[vehicle].string + ".";

            // Create speech output
            this.response.cardRenderer(this.t('SKILL_NAME'), removeSSML(speechOutput));
            this.response.speak(speechOutput);
            this.emit(':responseReady');
        }
    },
    'GetWeather': function () {
        var planetDB = this.t('PLANETS');
        console.log(this.event.request);
        console.log(this.event.request.intent.slots);
        if (this.event.request.dialogState == "STARTED" || this.event.request.dialogState == "IN_PROGRESS"){
            this.context.succeed({
                "response": {
                    "directives": [
                        {
                            "type": "Dialog.Delegate"
                        }
                    ],
                    "shouldEndSession": false
                },
                "sessionAttributes": {}
            });
        } else {
            var planet = this.event.request.intent.slots.Planet.value.toLowerCase();

            if (planetDB[planet] != undefined) {
                // Create speech output
                const speechOutput = "The forecast for "+planetDB[planet].PrintName+" is "+ planetDB[planet].Weather;

                this.response.cardRenderer(this.t('SKILL_NAME'), removeSSML(speechOutput));
                this.response.speak(speechOutput);
                this.emit(':responseReady');
            }
        }
    },
    'GetJoke': function () {
        const jokeArr = this.t('JOKES');
        const jokeIndex = Math.floor(Math.random() * jokeArr.length);
        const randomJoke = jokeArr[jokeIndex];

        // Create speech output
        const speechOutput = randomJoke;
        this.response.cardRenderer(this.t('SKILL_NAME'), removeSSML(speechOutput));
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(this.t('STOP_MESSAGE'));
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(this.t('STOP_MESSAGE'));
        this.emit(':responseReady');
    },
    'SessionEndedRequest': function () {
        this.response.speak(this.t('STOP_MESSAGE'));
        this.emit(':responseReady');
    }
};

function removeSSML (s) {
    return s.replace(/<\/?[^>]+(>|$)/g, "");
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
