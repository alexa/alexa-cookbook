// alexa-cookbook sample code

// There are three sections, Text Strings, Skill Code, and Helper Function(s).
// You can copy and paste the entire file contents as the code for a new Lambda function,
//  or copy & paste section #3, the helper function, to the bottom of your existing Lambda code.


// 1. Text strings =====================================================================================================
//    Modify these strings and messages to change the behavior of your Lambda function

const myRequest = ['apples','oranges','strawberries'];  // Array of items

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
        var say = " news flash " + pickAudioClip(1) + " my code is working";
        this.response.speak(say).listen('try again');
        this.emit(':responseReady');
    }
};


//    END of Intent Handlers {} ========================================================================================
// 3. Helper Function  =================================================================================================

function pickAudioClip(myData) {
    // if you have several audio clips, your function could decide which one to be played

    tag = '';

    if (myData == 1) {
        tag = "<audio src='https://s3.amazonaws.com/my-ssml-samples/Flourish.mp3' />";
    } else {
        tag = "<audio src='https://s3.amazonaws.com/my-ssml-samples/cheap_thrills.mp3' />";
    }

    return(tag);

}
