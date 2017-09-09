'use strict';
const Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback){

    var alexa = Alexa.handler(event, context);
    // alexa.appId = "amzn1.echo-sdk-ams.app.8c97fc78-342a-4e4f-823b-e2f91e7f0000";
    console.log('console.log() status message from index.js');

    alexa.registerHandlers(handlers);
    alexa.execute();

};

const handlers = {
    'LaunchRequest': function () {
        var say = 'Welcome to the Alexa skill!';
        this.response.speak(say).listen('try again');
        this.emit(':responseReady');
    },

    'StateRequestIntent': function() {
        var say = '';

        if (this.event.request.intent.slots.usstate) {
            var myState = this.event.request.intent.slots.usstate.value;

            say = 'Okay great! You asked for ' + myState;

            // create and store session attributes
            if (!this.attributes['myList']) {
                this.attributes['myList'] = [];  // empty array
            }

            this.attributes['myList'].push(myState);  // add array element
        } else {
            say = 'I did not hear the name of the state.'
        }

        this.response.speak(say).listen('try again');
        this.emit(':responseReady');

    },
    'MyNameIsIntent': function() {

        var myName = '';
        var say = '';

        if (this.event.request.intent.slots.myName) {
            myName = this.event.request.intent.slots.myName.value;
            this.attributes['myName'] = myName;
            say = 'Hi ' + myName + '!';

        } else {
            say = 'You can tell me your name, for example, you can say my name is Danielle.';
        }
        //this.event.request.intent.slots.myName.value;

        this.response.speak(say).listen('try again');
        this.emit(':responseReady');
    },
    'ISeeIntent': function() {
        var say = '';

        if (this.event.request.intent.slots.color && this.event.request.intent.slots.animal) {
            var myColor = this.event.request.intent.slots.color.value;
            var myAnimal = this.event.request.intent.slots.animal.value;

            say = 'You saw a ' + myColor + ' ' + myAnimal;
        }

        this.response.speak(say).listen('try again');
        this.emit(':responseReady');

    },
    'RecapIntent': function() {

        // create and store session attributes
        if (!this.attributes['myList']) {
            this.attributes['myList'] = [];  // empty array
        }

        var stateList  = this.attributes['myList'].toString();  // add array element
        var stateCount =  this.attributes['myList'].length;

        var say = 'Your list has the following ' + stateCount + ' states. ' + stateList;

        this.response.speak(say).listen('try again');
        this.emit(':responseReady');
    },

    'AMAZON.HelpIntent': function () {
        var helpText = 'Say the name of a U.S. State, for example, say, go to Florida.';
        var reprompt = 'try again'

        this.response.speak(helpText, reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak('Goodbye');
        this.emit(':responseReady');

    },
    'AMAZON.StopIntent': function () {
        var say = '';
        var myName = '';
        if (this.attributes['myName'] ) {
            myName = this.attributes['myName'];
        }
        say = 'Goodbye, ' + myName;

        this.response.speak(say);
        this.emit(':responseReady');
    },
    'Unhandled': function() {
        var speechOutput = 'Sorry, unhandled intent ' + JSON.stringify(this.event.request) + ' error.';
        var reprompt = 'Try again?';
        this.response.speak(speechOutput + ' ' + reprompt).listen(reprompt);
        this.emit(':responseReady');

    }
};

// end of handlers

// ---------------------------------------------------  User Defined Functions ---------------
