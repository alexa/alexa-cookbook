// alexa-cookbook sample code for random-phrase example

// There are three sections, Text Strings, Skill Code, and Helper Function(s).
// You can copy and paste the entire file contents as the code for a new Lambda function,
//  or copy & paste section #3, the helper function, to the bottom of your existing Lambda code.


// 1. Text Strings =====================================================================================================
//    Modify these strings and messages to change the behavior of your Lambda function

var myRequest = ['hello','howdy','hi', 'good day'];  // Array of items


// 2. Skill Code =======================================================================================================

var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);

    // alexa.appId = 'amzn1.echo-sdk-ams.app.1234';
    // alexa.dynamoDBTableName = 'YourTableName'; // creates new table for session.attributes

    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('MyIntent');
    },

    'MyIntent': function () {
        this.emit(':tell', 'the welcome message is, ' + randomPhrase(myRequest) );
    }
};


// 3. Helper Function  =================================================================================================

// myData is an array of words or phrases
function randomPhrase(myData) {
    var i = Math.floor(Math.random() * myData.length);
    return(myData[i]);
}
