// alexa-cookbook sample code

// There are three sections, Text Strings, Skill Code, and Helper Function(s).
// You can copy and paste the entire file contents as the code for a new Lambda function,
//  or copy & paste section #3, the helper function, to the bottom of your existing Lambda code.


// 1. Text strings =====================================================================================================
//    Modify these strings and messages to change the behavior of your Lambda function

const myRequest = ['apples', 'oranges', 'strawberries'];  // Array of items

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
        this.emit('MyIntent');
    },

    'MyIntent': function () {

        var speechOutput = 'the list contains ' + sayArray(myRequest,  'and')
                    + '. please choose either ' +  sayArray(myRequest,  'or');
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    }
};


//    END of Intent Handlers {} ========================================================================================
// 3. Helper Function  =================================================================================================


function sayArray(myData, andor) {
    // the first argument is an array [] of items
    // the second argument is the list penultimate word; and/or/nor etc.

    var listString = '';

    if (myData.length == 1) {
        listString = myData[0];
    } else {
        if (myData.length == 2) {
            listString = myData[0] + ' ' + andor + ' ' + myData[1];
        } else {

            for (var i = 0; i < myData.length; i++) {
                if (i < myData.length - 2) {
                    listString = listString + myData[i] + ', ';
                    if (i = myData.length - 2) {
                        listString = listString + myData[i] + ', ' + andor + ' ';
                    }

                } else {
                    listString = listString + myData[i];
                }

            }
        }

    }

    return(listString);
}
