    // alexa-cookbook sample code

// There are three sections, Text Strings, Skill Code, and Helper Function(s).
// You can copy and paste the entire file contents as the code for a new Lambda function,
//  or copy & paste section #3, the helper function, to the bottom of your existing Lambda code.


// 1. Text strings =====================================================================================================
//    Modify these strings and messages to change the behavior of your Lambda function

const AWSregion = 'us-east-1';  // us-east-1

const params = {
    TableName: 'yesno',
    Key:{ "id": '0'  }
};


// 2. Skill Code =======================================================================================================

const Alexa = require('alexa-sdk');
const AWS = require('aws-sdk');

AWS.config.update({
    region: AWSregion
});

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);

    // alexa.appId = 'amzn1.echo-sdk-ams.app.1234';
    // alexa.dynamoDBTableName = 'YourTableName'; // creates new table for session.attributes

    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        this.response.speak('welcome to magic answers.  ask me a yes or no question.').listen('try again');
        this.emit(':responseReady');
    },

    'MyIntent': function () {

        var MyQuestion = this.event.request.intent.slots.MyQuestion.value;
        console.log('MyQuestion : ' + MyQuestion);

        readDynamoItem(params, myResult=>{
            var say = '';

            say = myResult;

            say = 'you asked, ' + MyQuestion + '. The answer is: ' + myResult;
            this.response.speak(say).listen('try again');
            this.emit(':responseReady');

        });

    },
    'AMAZON.HelpIntent': function () {
        this.response.speak('ask me a yes or no question.').listen('try again');
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak('Goodbye!');
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak('Goodbye!');
        this.emit(':responseReady');
    }
};

//    END of Intent Handlers {} ========================================================================================
// 3. Helper Function  =================================================================================================


function readDynamoItem(params, callback) {

    var AWS = require('aws-sdk');
    AWS.config.update({region: AWSregion});

    var docClient = new AWS.DynamoDB.DocumentClient();

    console.log('reading item from DynamoDB table');

    docClient.get(params, (err, data) => {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));

            callback(data.Item.message);  // this particular row has an attribute called message

        }
    });

}
