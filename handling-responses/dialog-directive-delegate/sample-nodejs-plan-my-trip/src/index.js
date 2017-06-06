/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

// alexa-cookbook sample code

// There are three sections, Text Strings, Skill Code, and Helper Functions.
// You can copy and paste the entire file contents as the code for a new Lambda function,
// or copy & paste section #3, the helper function, to the bottom of your existing Lambda code.

// TODO add URL to this entry in the cookbook


// 1. Text strings ================================================================================
//    Modify these strings and messages to change the behavior of your Lambda function

var speechOutput;
var reprompt;
var welcomeOutput = "Let's plan a trip. Where would you like to go?";
var welcomeReprompt = "Let me know where you'd like to go or when you'd like to go on your trip.";
var tripIntro = [
  "This sounds like a cool trip. ",
  "This will be fun. ",
  "Oh, I like this trip. "
];

// 2. Skill Code ==================================================================================

'use strict';
var Alexa = require('alexa-sdk');
var APP_ID = undefined; // TODO replace with your app ID (OPTIONAL).

// Intent Handlers
var handlers = {
  'LaunchRequest': function() {
    this.emit(':ask', welcomeOutput, welcomeReprompt);
  },
  'PlanMyTrip': function() {
    // Delegate to Alexa to collect all the required slot values
    var filledSlots = delegateSlotCollection.call(this);

    // Compose speechOutput that simply reads all the collected slot values
    var speechOutput = randomPhrase(tripIntro);

    // Activity is optional. We'll add it to the output if we have a valid activity
    var travelMode = isSlotValid(this.event.request, "travelMode");
    if (travelMode) {
      speechOutput += travelMode;
    } else {
      speechOutput += "You'll go ";
    }

    // Now let's recap the trip
    var fromCity = this.event.request.intent.slots.fromCity.value;
    var toCity = this.event.request.intent.slots.toCity.value;
    var travelDate = this.event.request.intent.slots.travelDate.value;
    speechOutput += " from " + fromCity + " to " + toCity + " on " + travelDate;

    var activity = isSlotValid(this.event.request, "activity");
    if (activity) {
      speechOutput += " to go " + activity;
    }

    // Say the results
    this.emit(":tell", speechOutput);
  },
  'AMAZON.HelpIntent': function() {
    speechOutput = "Let me know where you'd like to go, or when you'd like to go on your trip. " +
                   "For example, You can say I am going to Chicago, next Tuesday.";
    reprompt = "Where are you traveling to? ";
    this.emit(':ask', speechOutput, reprompt);
  },
  'AMAZON.CancelIntent': function() {
    speechOutput = "Request Canceled. Goodbye!";
    this.emit(':tell', speechOutput);
  },
  'AMAZON.StopIntent': function() {
    speechOutput = "Request Stopped. Goodbye!";
    this.emit(':tell', speechOutput);
  },
  'SessionEndedRequest': function() {
    var speechOutput = "Talk to you later. Goodbye!";
    this.emit(':tell', speechOutput);
  },
};

exports.handler = (event, context) => {
  var alexa = Alexa.handler(event, context);
  alexa.APP_ID = APP_ID;
  // To enable string internationalization (i18n) features, set a resources object.
  // alexa.resources = languageStrings;
  alexa.registerHandlers(handlers);
  alexa.execute();
};

// 3. Helper Functions ============================================================================

function delegateSlotCollection() {
  console.log("in delegateSlotCollection");
  console.log("current dialogState: " + this.event.request.dialogState);
  if (this.event.request.dialogState === "STARTED") {
    console.log("in Beginning");
    var updatedIntent = this.event.request.intent;
    // Optionally pre-fill slots: update the intent object with slot values for which
    // you have defaults, then return Dialog.Delegate with this updated intent
    // in the updatedIntent property
    this.emit(":delegate", updatedIntent);
  } else if (this.event.request.dialogState !== "COMPLETED") {
    console.log("in not completed");
    // Return a Dialog.Delegate directive with no updatedIntent property.
    this.emit(":delegate");
  } else {
    console.log("in completed");
    console.log("returning: " + JSON.stringify(this.event.request.intent));
    // Dialog is now complete and all required slots should be filled,
    // so call your normal intent handler.
    return this.event.request.intent;
  }
}

function randomPhrase(array) {
  // The argument is an array [] of words or phrases
  var i = 0;
  i = Math.floor(Math.random() * array.length);
  return (array[i]);
}

function isSlotValid(request, slotName) {
  var slot = request.intent.slots[slotName];
  //console.log("request = "+JSON.stringify(request)); // Uncomment if you want to see the request
  var slotValue;

  // If we have a slot, get the text and store it into speechOutput
  if (slot && slot.value) {
    // We have a value in the slot
    slotValue = slot.value.toLowerCase();
    return slotValue;
  } else {
    // We didn't get a value in the slot.
    return false;
  }
}
