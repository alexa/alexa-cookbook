'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: var APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
const APP_ID = undefined;

const SKILL_NAME = "Number Facts";
const GET_FACT_MESSAGE = "Here's your fact: ";
const HELP_MESSAGE = "You can say tell me a number fact, or, you can say exit... What can I help you with?";
const HELP_REPROMPT = "What can I help you with?";
const STOP_MESSAGE = "Goodbye!";

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
const data = [
  "7 is the maximum number of times a letter-sized paper can be folded in half",
  "11 is the number of players in a football team",
  "37 is the normal human body temperature in degrees Celsius",
  "42 is the number of kilometres in a marathon",
  "140 is the character-entry limit for Twitter",
  "587 is the outgoing port for email message submission",
  "7 is the sum of any two opposite sides on a standard six-sided die."
]

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================
exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {
        var factArr = data;
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];
        var speechOutput = GET_FACT_MESSAGE + randomFact;

        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'GetNewFactAboutIntent': function () {
        var theNumber = this.event.request.intent.slots.number.value;
        var factType = this.event.request.intent.slots.factType.value;
        var factArr = data;

        var myRequest = {num:parseInt(theNumber),type:factType};
        httpGet(myRequest,  (myResult) => {
                console.log("sent     : " + myRequest);
                console.log("received : " + myResult);
                this.response.speak(myResult);
                this.emit(':responseReady');
            });
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = HELP_MESSAGE;
        var reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
      this.response.speak(STOP_MESSAGE);
      this.emit(':responseReady');
    }
};

var http = require('http');
// https is a default part of Node.JS.  Read the developer doc:  https://nodejs.org/api/https.html
// try other APIs such as the current bitcoin price : https://btc-e.com/api/2/btc_usd/ticker  returns ticker.last

function httpGet(myData, callback) {
  console.log("got to the http function")
    // GET is a web service request that is fully defined by a URL string
    // Try GET in your browser:
    // http://numbersapi.com/42

    // Update these options with the details of the web service you would like to call
    var options = {
        host: 'numbersapi.com',
        path: '/' + encodeURIComponent(myData.num) + '/' + encodeURIComponent(myData.type),
        method: 'GET',
    };

    var req = http.request(options, res => {
        res.setEncoding('utf8');
        var returnData = "";

        res.on('data', chunk => {
            returnData = returnData + chunk;
        });

        res.on('end', () => {
            // we have now received the raw return data in the returnData variable.
            // We can see it in the log output via:
            // console.log(JSON.stringify(returnData))
            // we may need to parse through it to extract the needed data
            console.log(returnData);
            callback(returnData);  // this will execute whatever function the caller defined, with one argument
        });

    });
    req.end();

}
