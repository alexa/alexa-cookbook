// alexa-cookbook sample code

// There are three sections, Text Strings, Skill Code, and Helper Function(s).
// You can copy and paste the entire file contents as the code for a new Lambda function,
//  or copy & paste section #3, the helper function, to the bottom of your existing Lambda code.


// 1. Text strings =====================================================================================================
//    Modify these strings and messages to change the behavior of your Lambda function

// from the lambda, choose Action > Configure Test Event > Alexa Intent - Recipe
const slotName = "Item";


// 2. Skill Code =======================================================================================================

const Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    // alexa.appId = 'amzn1.echo-sdk-ams.app.1234';
    // alexa.dynamoDBTableName = 'YourTableName'; // creates new table for session.attributes
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        var speechOutput = "try saying an utterance with a slot value to test this.";
        this.response.speak(speechOutput).listen(speechOutput);
        this.emit(':responseReady');
    },
    'Unhandled': function () {
        var speechOutput;
        var intent = this.event.request.intent.name;

        var slotValue = isSlotValid(this.event.request, slotName); //slot value or false
        if  (slotValue) {
            //slot has a valid value
            speechOutput="Intent " + intent + ", slot " + slotName + ", is " + slotValue;
        } else {
            //no valid slot
            speechOutput="Intent " + intent + ", did not get a value for " + slotName;
        }
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    }
};


//    END of Intent Handlers {} ========================================================================================
// 3. Helper Function  =================================================================================================


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
