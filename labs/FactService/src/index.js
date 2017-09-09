const Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);

    // alexa.dynamoDBTableName = 'YourTableName'; // creates new table for userid:session.attributes

    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },

    'GetNewFactIntent': function () {
        var say = 'Here is your fact. ' + getFact();
        this.response.speak(say);
        this.emit(':responseReady');
    },

    // 'AMAZON.HelpIntent': function () {
    //     this.response.speak('you can ask for a fact by saying, tell me a fact.');
    //     this.response.listen('try again');
    // },
    //
    // 'AMAZON.CancelIntent': function () {
    //     this.response.speak('Goodbye')
    //     this.emit(':responseReady');
    // },
    //
    // 'AMAZON.StopIntent': function () {
    //     this.response.speak('Goodbye');
    //     this.emit(':responseReady');
    // }
};

//  helper functions  ===================================================================

function getFact() {
    var newFact = 'You can build new voice experiences with the Alexa Skills Kit';
    return newFact;
}
