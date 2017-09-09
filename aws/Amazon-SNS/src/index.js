// alexa-cookbook sample code

// There are three sections, Text Strings, Skill Code, and Helper Function(s).
// You can copy and paste the entire file contents as the code for a new Lambda function,
//  or copy & paste section #3, the helper function, to the bottom of your existing Lambda code.


// 1. Text strings =====================================================================================================
//    Modify these strings and messages to change the behavior of your Lambda function

var AWSregion = 'us-east-1';  // eu-west-1

const mobileNumber = '+1508259846';  // be sure to change this to YOUR mobile number

const emoji = {
    'thumbsup':     '\uD83D\uDC4D',
    'smile':        '\uD83D\uDE0A',
    'star':         '\uD83C\uDF1F',
    'robot':        '\uD83E\uDD16',
    'germany':      '\ud83c\udde9\ud83c\uddea',
    'uk':           '\ud83c\uddec\ud83c\udde7',
    'usa':          '\ud83c\uddfa\ud83c\uddf8'
}
// Escaped Unicode for other emoji:  https://github.com/wooorm/gemoji/blob/master/support.md

const bodyText = 'Hello! ' + emoji.smile + ' \n'
        + emoji.germany + emoji.uk + emoji.usa + '\n'
    + 'Here is your link: \n'
    + 'https://youtu.be/DLzxrzFCyOs';


const params = {
    PhoneNumber: mobileNumber,
    Message: bodyText
};

// 2. Skill Code =======================================================================================================


const Alexa = require('alexa-sdk');

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

        sendTxtMessage(params, myResult=>{

            var say = myResult;
            this.response.speak(say).listen('try again');
            this.emit(':responseReady');

        });
    }
};

//    END of Intent Handlers {} ========================================================================================
// 3. Helper Function  =================================================================================================

function sendTxtMessage(params, callback) {

    var AWS = require('aws-sdk');
    AWS.config.update({region: AWSregion});

    var SNS = new AWS.SNS();

    SNS.publish(params, function(err, data){

        console.log('sending message to ' + params.PhoneNumber.toString() );

        if (err) console.log(err, err.stack);

        callback('text message sent');

    });
}
