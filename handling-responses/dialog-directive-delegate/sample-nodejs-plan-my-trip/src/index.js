/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

// alexa-cookbook sample code

// There are three sections, Text Strings, Skill Code, and Helper Function(s).
// You can copy and paste the entire file contents as the code for a new Lambda function,
// or copy & paste section #3, the helper function, to the bottom of your existing Lambda code.

// TODO add URL to this entry in the cookbook


 // 1. Text strings =====================================================================================================
 //    Modify these strings and messages to change the behavior of your Lambda function

 const speechOutput;
 const reprompt;
 const welcomeOutput = "Let's plan a trip. Where would you like to go?";
 const welcomeReprompt = "Let me know where you'd like to go or when you'd like to go on your trip";
 const tripIntro = [
   "This sounds like a cool trip. ",
   "This will be fun. ",
   "Oh, I like this trip. "
 ];



 // 2. Skill Code =======================================================================================================

'use strict';
const Alexa = require('alexa-sdk');
const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const handlers = {
    'LaunchRequest': function () {
      this.response.speak(welcomeOutput).listen(welcomeReprompt);
      this.emit(':responseReady');
    },
    'PlanMyTrip': function () {
        //delegate to Alexa to collect all the required slot values
        var filledSlots = delegateSlotCollection.call(this);

        //compose speechOutput that simply reads all the collected slot values
        var speechOutput = randomPhrase(tripIntro);

        //activity is optional so we'll add it to the output
        //only when we have a valid activity
        var travelMode = isSlotValid(this.event.request, "travelMode");
        if (travelMode) {
          speechOutput += travelMode;
        } else {
          speechOutput += "You'll go ";
        }

        //Now let's recap the trip
        var fromCity=this.event.request.intent.slots.fromCity.value;
        var toCity=this.event.request.intent.slots.toCity.value;
        var travelDate=this.event.request.intent.slots.travelDate.value;
        speechOutput+= " from "+ fromCity + " to "+ toCity+" on "+travelDate;

        var activity = isSlotValid(this.event.request, "activity");
        if (activity) {
          speechOutput += " to go "+ activity;
        }

        //say the results
        this.response.speak(speechOutput);
        this.emit(":responseReady");
    },
    'AMAZON.HelpIntent': function () {
        speechOutput = "";
        reprompt = "";
        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        speechOutput = "";
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        speechOutput = "";
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'SessionEndedRequest': function () {
        var speechOutput = "";
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
};

exports.handler = (event, context) => {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    //alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

//    END of Intent Handlers {} ========================================================================================
// 3. Helper Function  =================================================================================================

function delegateSlotCollection(){
  console.log("in delegateSlotCollection");
  console.log("current dialogState: "+this.event.request.dialogState);
    if (this.event.request.dialogState === "STARTED") {
      console.log("in Beginning");
      var updatedIntent=this.event.request.intent;
      //optionally pre-fill slots: update the intent object with slot values for which
      //you have defaults, then return Dialog.Delegate with this updated intent
      // in the updatedIntent property
      this.emit(":delegate", updatedIntent);
    } else if (this.event.request.dialogState !== "COMPLETED") {
      console.log("in not completed");
      // return a Dialog.Delegate directive with no updatedIntent property.
      this.emit(":delegate");
    } else {
      console.log("in completed");
      console.log("returning: "+ JSON.stringify(this.event.request.intent));
      // Dialog is now complete and all required slots should be filled,
      // so call your normal intent handler.
      return this.event.request.intent;
    }
}

function randomPhrase(array) {
    // the argument is an array [] of words or phrases
    var i = 0;
    i = Math.floor(Math.random() * array.length);
    return(array[i]);
}
function isSlotValid(request, slotName){
        var slot = request.intent.slots[slotName];
        //console.log("request = "+JSON.stringify(request)); //uncomment if you want to see the request
        var slotValue;

        //if we have a slot, get the text and store it into speechOutput
        if (slot && slot.value) {
            //we have a value in the slot
            slotValue = slot.value.toLowerCase();
            return slotValue;
        } else {
            //we didn't get a value in the slot.
            return false;
        }
}
