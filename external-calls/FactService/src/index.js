// alexa-cookbook sample code

// There are three sections, Text Strings, Skill Code, and Helper Function(s).
// You can copy and paste the entire file contents as the code for a new Lambda function,
//  or copy & paste section #3, the helper function, to the bottom of your existing Lambda code.


// 1. Text strings =====================================================================================================
//    Modify these strings and messages to change the behavior of your Lambda function

var AWSregion = 'us-east-1';  // us-east-1

var params = {
    TableName: 'FactList',
    Key:{
       // "appId":  "amzn1.ask.skill.6a4c4aac-c3ad-49c7-982b-975617496442"
    }
};

// 2. Skill Code =======================================================================================================

var Alexa = require('alexa-sdk');
var AWS = require('aws-sdk');

AWS.config.update({
    region: AWSregion
});
var appId = '';

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    // console.log(event);

    // alexa.appId = 'amzn1.echo-sdk-ams.app.1234';
    // alexa.dynamoDBTableName = 'YourTableName'; // creates new table for session.attributes

    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },

    'GetNewFactIntent': function () {
        console.log('appId here');

        // call the Fact Service

        httpsGet(this.event.session.application.applicationId,  myResult => {
            console.log('myResult');
            console.log(myResult);

            var say = '';
            say = 'here is your fact, ' +  randomPhrase(JSON.parse(myResult)); // array
            this.response.speak(say).listen('try again');
            this.emit(':responseReady');

        });


    },
    'AMAZON.HelpIntent': function () {
        this.response.speak('just say, tell me a fact').listen('try again');
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak('Goodbye!');
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak('Goodbye!')
        this.emit(':responseReady');
    }
};

//    END of Intent Handlers {} ========================================================================================
// 3. Helper Function  =================================================================================================


var https = require('https');
// https is a default part of Node.JS.  Read the developer doc:  https://nodejs.org/api/https.html
// try other APIs such as the current bitcoin price : https://btc-e.com/api/2/btc_usd/ticker  returns ticker.last

function httpsGet(myData, callback) {

    // Update these options with the details of the web service you would like to call
    var options = {
        host: '1fzfdjhc2l.execute-api.us-east-1.amazonaws.com',
        port: 443,
        path: '/prod/list?appId=' + encodeURIComponent(myData),
        method: 'GET',

        // if x509 certs are required:
        // key: fs.readFileSync('certs/my-key.pem'),
        // cert: fs.readFileSync('certs/my-cert.pem')
    };

    var req = https.request(options, res => {
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

            callback(returnData);  // this will execute whatever function the caller defined, with one argument

        });

    });
    req.end();

}

function randomPhrase(array) {
    // the argument is an array [] of words or phrases
    if (array.length > 0) {

        var i = 0;
        i = Math.floor(Math.random() * array.length);
        return (array[i]);
    } else {
        return '';
    }
}
