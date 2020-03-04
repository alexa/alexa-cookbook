/**
 * Created by mccaul on 6/5/18.
 */
/* eslint-disable  func-names */
/* eslint-disable  no-console */
/* eslint-disable  no-use-before-define */


// City Guide: A sample Alexa Skill Lambda function
//  This function shows how you can manage data in objects and arrays,
//   choose a random recommendation,
//   call an external API and speak the result,
//   handle YES/NO intents with session attributes,
//   and return text data on a card.

const Alexa = require('ask-sdk-core');
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');
const https = require('https');


// 1. Handlers ===================================================================================

const LaunchHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;

        const requestAttributes = attributesManager.getRequestAttributes();
        const speechOutput = `${requestAttributes.t('WELCOME')} ${requestAttributes.t('HELP')}`;
        return responseBuilder
            .speak(speechOutput)
            .reprompt('sorry, try again, ' + speechOutput)
            .getResponse();
    },
};

const AboutHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest' && request.intent.name === 'AboutIntent';
    },
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;

        const requestAttributes = attributesManager.getRequestAttributes();

        return responseBuilder
            .speak(requestAttributes.t('ABOUT'))
            .getResponse();
    },
};

const CoffeeHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest' && request.intent.name === 'CoffeeIntent';
    },
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;

        const sessionAttributes = attributesManager.getSessionAttributes();
        const restaurant = randomArrayElement(getRestaurantsByMeal('coffee'));
        sessionAttributes.restaurant = restaurant.name;
        const speechOutput = `For a great coffee shop, I recommend, ${restaurant.name}. Would you like to hear more?`;

        return responseBuilder.speak(speechOutput).reprompt(speechOutput).getResponse();
    },
};

const BreakfastHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest' && request.intent.name === 'BreakfastIntent';
    },
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;

        const sessionAttributes = attributesManager.getSessionAttributes();
        const restaurant = randomArrayElement(getRestaurantsByMeal('breakfast'));
        sessionAttributes.restaurant = restaurant.name;
        const speechOutput = `For breakfast, try this, ${restaurant.name}. Would you like to hear more?`;

        return responseBuilder.speak(speechOutput).reprompt(speechOutput).getResponse();
    },
};

const LunchHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest' && request.intent.name === 'LunchIntent';
    },
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;

        const sessionAttributes = attributesManager.getSessionAttributes();
        const restaurant = randomArrayElement(getRestaurantsByMeal('lunch'));
        sessionAttributes.restaurant = restaurant.name;
        const speechOutput = `Lunch time! Here is a good spot. ${restaurant.name}. Would you like to hear more?`;

        return responseBuilder.speak(speechOutput).reprompt(speechOutput).getResponse();
    },
};

const DinnerHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest' && request.intent.name === 'DinnerIntent';
    },
    handle(handlerInput) {

        unicorn;  // will cause an error

        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;

        const sessionAttributes = attributesManager.getSessionAttributes();
        const restaurant = randomArrayElement(getRestaurantsByMeal('dinner'));
        sessionAttributes.restaurant = restaurant.name;
        const speechOutput = `Enjoy dinner at, ${restaurant.name}. Would you like to hear more?`;

        return responseBuilder.speak(speechOutput).reprompt(speechOutput).getResponse();
    },
};

const YesHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.YesIntent';
    },
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;

        const sessionAttributes = attributesManager.getSessionAttributes();
        let speechOutput;
        let card = '';

        if (sessionAttributes.restaurant) {

            const restaurantName = sessionAttributes.restaurant;

            const restaurantDetails = getRestaurantByName(restaurantName);
            speechOutput = `${restaurantDetails.name
                } is located at ${restaurantDetails.address
                }, the phone number is ${restaurantDetails.phone
                }, and the description is, ${restaurantDetails.description
                }  I have sent these details to the Alexa App on your phone.  Enjoy your meal!
            <say-as interpret-as="interjection">bon appetit</say-as>`;

            card = `${restaurantDetails.name}\n ${restaurantDetails.address}\n ${data.city}, ${data.state} ${data.postcode}\n phone: ${restaurantDetails.phone}\n`;

        } else {
            speechOutput = `Yes?  Please try again. Say Help for some options.`;
        }
        return responseBuilder
            .speak(speechOutput)
            .withSimpleCard(SKILL_NAME, card)
            .getResponse();
    },
};

const AttractionHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest' && request.intent.name === 'AttractionIntent';
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const responseBuilder = handlerInput.responseBuilder;

        let distance = 200;
        if (request.intent.slots.distance.value && request.intent.slots.distance.value !== "?") {
            distance = request.intent.slots.distance.value;
        }

        const attraction = randomArrayElement(getAttractionsByDistance(distance));

        const speechOutput = `Try ${
            attraction.name}, which is ${
            attraction.distance === '0' ? 'right downtown. ' : `${attraction.distance} miles away. Have fun! `
            }${attraction.description}`;

        return responseBuilder.speak(speechOutput).getResponse();
    },
};

const GoOutHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest' && request.intent.name === 'GoOutIntent';
    },
    handle(handlerInput) {
        return new Promise((resolve) => {
            getWeather((localTime, currentTemp, currentCondition) => {
                const speechOutput = `It is ${localTime
                    } and the weather in ${data.city
                    } is ${
                    currentTemp} and ${currentCondition}`;
                resolve(handlerInput.responseBuilder.speak(speechOutput).getResponse());
            });
        });
    },
};

const HelpHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;

        const requestAttributes = attributesManager.getRequestAttributes();
        return responseBuilder
            .speak(requestAttributes.t('HELP'))
            .reprompt(requestAttributes.t('HELP'))
            .getResponse();
    },
};

const StopHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest'
            && (request.intent.name === 'AMAZON.NoIntent'
            || request.intent.name === 'AMAZON.CancelIntent'
            || request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;

        const requestAttributes = attributesManager.getRequestAttributes();
        return responseBuilder
            .speak(requestAttributes.t('STOP'))
            .getResponse();
    },
};

const SessionEndedHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

        return handlerInput.responseBuilder.getResponse();
    },
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const request = handlerInput.requestEnvelope.request;

        console.log(`Error handled: ${error.message}`);
        console.log(` Original request was ${JSON.stringify(request, null, 2)}\n`);

        return handlerInput.responseBuilder
            .speak('Sorry, I can\'t understand the command. Please say again.')
            .reprompt('Sorry, I can\'t understand the command. Please say again.')
            .getResponse();
    },
};

const FallbackHandler = {

    // 2018-May-01: AMAZON.FallackIntent is only currently available in en-US locale.

    //              This handler will not be triggered except in that locale, so it can be

    //              safely deployed for any locale.

    canHandle(handlerInput) {

        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest'

            && request.intent.name === 'AMAZON.FallbackIntent';

    },

    handle(handlerInput) {

        return handlerInput.responseBuilder

            .speak(FALLBACK_MESSAGE)

            .reprompt(FALLBACK_REPROMPT)

            .getResponse();

    },

};


// 2. Constants ==================================================================================

const languageStrings = {
    en: {
        translation: {
            WELCOME: 'Welcome to Gloucester Guide!',
            HELP: 'Say about, to hear more about the city, or say coffee, breakfast, lunch, or dinner, to hear local restaurant suggestions, or say recommend an attraction, or say, go outside. ',
            ABOUT: 'Gloucester Massachusetts is a city on the Atlantic Ocean.  A popular summer beach destination, Gloucester has a rich history of fishing and ship building.',
            STOP: 'Okay, see you next time!',
        },
    },
    // , 'de-DE': { 'translation' : { 'TITLE'   : "Local Helfer etc." } }
};
const data = {
    city: 'Gloucester',
    state: 'MA',
    postcode: '01930',
    restaurants: [
        {
            name: "Zeke's Place",
            address: '66 East Main Street',
            phone: '978-283-0474',
            meals: 'breakfast, lunch',
            description: 'A cozy and popular spot for breakfast.  Try the blueberry french toast!',
        },
        {
            name: 'Morning Glory Coffee Shop',
            address: '25 Western Avenue',
            phone: '978-281-1851',
            meals: 'coffee, breakfast, lunch',
            description: 'A homestyle diner located just across the street from the harbor sea wall.',
        },
        {
            name: 'Sugar Magnolias',
            address: '112 Main Street',
            phone: '978-281-5310',
            meals: 'breakfast, lunch',
            description: 'A quaint eatery, popular for weekend brunch.  Try the carrot cake pancakes.',
        },
        {
            name: 'Seaport Grille',
            address: '6 Rowe Square',
            phone: '978-282-9799',
            meals: 'lunch, dinner',
            description: 'Serving seafood, steak and casual fare.  Enjoy harbor views on the deck.',
        },
        {
            name: 'Latitude 43',
            address: '25 Rogers Street',
            phone: '978-281-0223',
            meals: 'lunch, dinner',
            description: 'Features artsy decor and sushi specials.  Live music evenings at the adjoining Minglewood Tavern.',
        },
        {
            name: "George's Coffee Shop",
            address: '178 Washington Street',
            phone: '978-281-1910',
            meals: 'coffee, breakfast, lunch',
            description: 'A highly rated local diner with generously sized plates.',
        },

    ],
    attractions: [
        {
            name: 'Whale Watching',
            description: 'Gloucester has tour boats that depart twice daily from Rogers street at the harbor.  Try either the 7 Seas Whale Watch, or Captain Bill and Sons Whale Watch. ',
            distance: '0',
        },
        {
            name: 'Good Harbor Beach',
            description: 'Facing the Atlantic Ocean, Good Harbor Beach has huge expanses of soft white sand that attracts hundreds of visitors every day during the summer.',
            distance: '3',
        },
        {
            name: 'Rockport',
            description: 'A quaint New England town, Rockport is famous for rocky beaches, seaside parks, lobster fishing boats, and several art studios.',
            distance: '5',
        },
        {
            name: 'Fenway Park',
            description: 'Home of the Boston Red Sox, Fenway park hosts baseball games From April until October, and is open for tours. ',
            distance: '38',
        },
    ],
};

const SKILL_NAME = 'Gloucester Guide';
const FALLBACK_MESSAGE = `The ${SKILL_NAME} skill can\'t help you with that.  It can help you learn about Gloucester if you say tell me about this place. What can I help you with?`;
const FALLBACK_REPROMPT = 'What can I help you with?';



// 3. Helper Functions ==========================================================================


const myAPI = {
    host: 'query.yahooapis.com',
    port: 443,
    path: `/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${encodeURIComponent(data.city)}%2C%20${data.state}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`,
    method: 'GET',
};

function getRestaurantsByMeal(mealType) {
    const list = [];
    for (let i = 0; i < data.restaurants.length; i += 1) {
        if (data.restaurants[i].meals.search(mealType) > -1) {
            list.push(data.restaurants[i]);
        }
    }
    return list;
}

function getRestaurantByName(restaurantName) {
    let restaurant = {};
    for (let i = 0; i < data.restaurants.length; i += 1) {
        if (data.restaurants[i].name === restaurantName) {
            restaurant = data.restaurants[i];
        }
    }
    return restaurant;
}

function getAttractionsByDistance(maxDistance) {
    const list = [];

    for (let i = 0; i < data.attractions.length; i += 1) {
        if (parseInt(data.attractions[i].distance, 10) <= maxDistance) {
            list.push(data.attractions[i]);
        }
    }
    return list;
}

function getWeather(callback) {
    const req = https.request(myAPI, (res) => {
        res.setEncoding('utf8');
        let returnData = '';

        res.on('data', (chunk) => {
            returnData += chunk;
        });
        res.on('end', () => {
            const channelObj = JSON.parse(returnData).query.results.channel;

            let localTime = channelObj.lastBuildDate.toString();
            localTime = localTime.substring(17, 25).trim();

            const currentTemp = channelObj.item.condition.temp;

            const currentCondition = channelObj.item.condition.text;

            callback(localTime, currentTemp, currentCondition);
        });
    });
    req.end();
}

function randomArrayElement(array) {
    let i = 0;
    i = Math.floor(Math.random() * array.length);
    return (array[i]);
}

const LocalizationInterceptor = {
    process(handlerInput) {
        const localizationClient = i18n.use(sprintf).init({
            lng: handlerInput.requestEnvelope.request.locale,
            overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
            resources: languageStrings,
            returnObjects: true,
        });

        const attributes = handlerInput.attributesManager.getRequestAttributes();
        attributes.t = function (...args) {
            return localizationClient.t(...args);
        };
    },
};

// 4. Export =====================================================================================

const skillBuilder = Alexa.SkillBuilders.custom();
exports.handler = skillBuilder
    .addRequestHandlers(
        LaunchHandler,
        AboutHandler,
        CoffeeHandler,
        BreakfastHandler,
        LunchHandler,
        DinnerHandler,
        YesHandler,
        AttractionHandler,
        GoOutHandler,
        HelpHandler,
        StopHandler,
        FallbackHandler,
        SessionEndedHandler
    )
    .addRequestInterceptors(LocalizationInterceptor)
    .addErrorHandlers(ErrorHandler)
    .lambda();