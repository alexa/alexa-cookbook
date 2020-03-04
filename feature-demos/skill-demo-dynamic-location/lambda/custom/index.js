// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
// i18n dependency
const i18n = require('i18next');
// We import a language strings object containing all of our strings.
// The keys for each string will then be referenced in our code
// e.g. handlerInput.t('WELCOME_MSG')
const languageStrings = require('./localisation');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = handlerInput.t('WELCOME_MSG');
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
const MyLocationIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'MyLocationIntent';
    },
    handle(handlerInput) {
        const {context} = handlerInput.requestEnvelope;
        const {request} = handlerInput.requestEnvelope;
        const isGeoSupported = context.System.device.supportedInterfaces.Geolocation;

        let speechText = handlerInput.t('UNSUPPORTED_DEVICE_MSG');

        if (isGeoSupported) {
            var geoObject = context.Geolocation;
            console.log(JSON.stringify(geoObject)); // log the geo-coordinates object
            let ACCURACY_THRESHOLD = 100; // accuracy of 100 meters required

            // check if there's permission to get location updates
            if ( ! geoObject || ! geoObject.coordinate ) {
                var skillPermissionGranted = context.System.user.permissions.scopes['alexa::devices:all:geolocation:read'].status === "GRANTED";
                if ( !skillPermissionGranted) {
                  return handlerInput.responseBuilder
                    .speak(handlerInput.t('PERMISSION_CARD_MSG'))
                    .withAskForPermissionsConsentCard(['alexa::devices:all:geolocation:read'])
                    .getResponse();
                } else {
                    if(context.Geolocation.locationServices.access !== 'ENABLED'){
                        return handlerInput.responseBuilder
                            .speak(handlerInput.t('LOCATION_DISABLED'))
                            .getResponse();
                    }
                    if(context.Geolocation.locationServices.status !== 'RUNNING'){
                        return handlerInput.responseBuilder
                            .speak(handlerInput.t('LOCATION_NOT_RUNNING'))
                            .getResponse();
                    }
                    return handlerInput.responseBuilder
                        .speak(handlerInput.t('LOCATION_ERROR'))
                        .getResponse();
                }
            }

            // fetch geolocation data and use it in the response
            if (geoObject && geoObject.coordinate && geoObject.coordinate.accuracyInMeters < ACCURACY_THRESHOLD ) {
                let freshness = (new Date(request.timestamp) - new Date(geoObject.timestamp)) / 1000; // freshness in seconds

                const lat = geoObject.coordinate.latitudeInDegrees;
                const lon = geoObject.coordinate.longitudeInDegrees;
                const coordinateAccuracy = geoObject.coordinate.accuracyInMeters;
                const altitude = geoObject.altitude ? geoObject.altitude.altitudeInMeters : null;
                const altitudeAccuracy = geoObject.altitude ? geoObject.altitude.accuracyInMeters : null;
                let heading = geoObject.heading.directionInDegrees;
                let speed = geoObject.heading.speedInMetersPerSecond;
                const cardinalLat = lat >= 0 ? handlerInput.t('CARDINAL_NORTH') : handlerInput.t('CARDINAL_SOUTH');
                const cardinalLon = lon >= 0 ? handlerInput.t('CARDINAL_EAST') : handlerInput.t('CARDINAL_WEST');

                speechText = handlerInput.t('LOCATION_MSG', {count: freshness, latitude: lat.toFixed(2), cardinalLat: cardinalLat, longitude: lon.toFixed(2), cardinalLon: cardinalLon});
                if(altitude)
                    speechText += handlerInput.t('ALTITUDE_MSG', {count: altitude.toFixed(2)}); //TODO detect unit and convert accordingly
                if(speed > 0){
                    speechText += handlerInput.t('SPEED_MSG', {count: speed * 3.6}); //convert to km/h (TODO detect unit and convert accordingly)
                    speechText += handlerInput.t('HEADING_MSG', {heading: getHeading(heading, handlerInput)});
                }
            } else {
                speechText = handlerInput.t('LOCATION_INACCURATE');
            }
        }

        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = handlerInput.t('HELP_MSG');

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = handlerInput.t('GOODBYE_MSG');
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const speechText = handlerInput.t('ERROR_MSG');

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

// This request interceptor will bind a translation function 't' to the handlerInput.
const LocalisationRequestInterceptor = {
  process(handlerInput) {
      i18n.init({
          lng: handlerInput.requestEnvelope.request.locale,
          resources: languageStrings
      }).then((t) => {
          handlerInput.t = (...args) => t(...args);
      });
  }
};

// Auxiliary function
function getHeading(degrees, handlerInput) {
  let input = (degrees / 11.25)+.5|0;
  input = input > 31.5 ? 0 : input;
  let j = input % 8;
  input = (input / 8)|0 % 4;
  let cardinal = [handlerInput.t('CARDINAL_NORTH'), handlerInput.t('CARDINAL_EAST'), handlerInput.t('CARDINAL_SOUTH'), handlerInput.t('CARDINAL_WEST')];
  let pointDesc = ['1', `1 ${handlerInput.t('CARDINAL_BY')} 2`, '1-C', `C ${handlerInput.t('CARDINAL_BY')} 1`, 'C', `C ${handlerInput.t('CARDINAL_BY')} 2`, '2-C', `2 ${handlerInput.t('CARDINAL_BY')} 1`];
  let str1, str2, strC, result;

  str1 = cardinal[input];
  str2 = cardinal[(input + 1) % 4];
  strC = (str1 === cardinal[0] || str1 === cardinal[2]) ? str1 + str2 : str2 + str1;
  result = pointDesc[j].replace('1', str1).replace('2', str2).replace('C', strC);
  result = fixHeadingForLocale(result, handlerInput.requestEnvelope.request.locale);
  return result;
}

function fixHeadingForLocale(heading, locale){
    //special replacement for es-*
    if(locale.startsWith('es')){
        heading = heading.replace('norteeste', 'noreste');
        heading = heading.replace('norteoeste', 'noroeste');
        heading = heading.replace('norte-noreste', 'nor-noreste');
        heading = heading.replace('norte-noroeste', 'nor-noroeste');
    }
    return heading;
}

// This handler acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        MyLocationIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(LocalisationRequestInterceptor)
    .withCustomUserAgent('cookbook/dynamic-location/v1')
    .lambda();
