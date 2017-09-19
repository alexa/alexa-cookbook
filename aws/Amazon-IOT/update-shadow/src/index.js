// alexa-cookbook sample code

// There are three sections, Text Strings, Skill Code, and Helper Function(s).
// You can copy and paste the entire file contents as the code for a new Lambda function,
//  or copy & paste section #3, the helper function, to the bottom of your existing Lambda code.


// 1. Text strings =====================================================================================================
//    Modify these strings and messages to change the behavior of your Lambda function

const config = {};
config.IOT_BROKER_ENDPOINT      = "a3npzlqqmmzqo.iot.us-east-1.amazonaws.com";  // also called the REST API endpoint
config.IOT_BROKER_REGION        = "us-east-1";  // eu-west-1 corresponds to the Ireland Region.  Use us-east-1 for the N. Virginia region
config.IOT_THING_NAME           = "thing1";

const SkillMessagesUS = {
    'welcome'       :'welcome.  you can say things like, go to london or go to berlin',
    'cityresponse'  :'you asked for',
    'help'          :'you can say things like, go to london or go to berlin',
    'cancel'        :'goodbye',
    'stop'          :'goodbye'
};

const SkillMessagesDE = {
    'welcome'       :'hallo.  sagen so was, reisen nach london oder reisen nach berlin',
    'cityresponse'  :'sie haben gefragt',
    'help'          :'sagen so was, reisen nach london oder reisen nach berlin',
    'cancel'        :'auf wiedersehen',
    'stop'          :'auf wiedersehen'
};

// 2. Skill Code =======================================================================================================


const Alexa = require('alexa-sdk');
var SkillMessages = {};

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);

    // alexa.appId = 'amzn1.echo-sdk-ams.app.1234';
    // alexa.dynamoDBTableName = 'YourTableName'; // creates new table for session.attributes

    var locale = event.request.locale;
    console.log('locale is set to ' + locale);

    switch(locale) {
        case 'de-DE':
            SkillMessages = SkillMessagesDE;
            break;
        default:
            SkillMessages = SkillMessagesUS;
            break;
    }

    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('MyIntent');
    },

    'MyIntent': function () {
        this.response.speak(SkillMessages.welcome).listen('try again');
        this.emit(':responseReady');
    },

    'CityIntent': function () {

        var myCity = this.event.request.intent.slots.city.value;


        if (myCity == null) { // no slot
            say = SkillMessages.help;
        } else {

            say =  SkillMessages.cityresponse + ' ' + myCity;
        }

        newState = {'city':myCity};

        updateShadow(newState, status => {
            this.response.speak(say).listen(say);
            this.emit(':responseReady');
        });

    },
    'AMAZON.HelpIntent': function () {
        this.response.speak(SkillMessages.help).listen(SkillMessages.help);
        this.emit(':responseReady');

    },
    'AMAZON.StopIntent': function () {
        this.response.speak(SkillMessages.stop);
        this.emit(':responseReady');

    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(SkillMessages.cancel);
        this.emit(':responseReady');
    },
    'SessionEndedRequest': function() {
        this.emit('AMAZON.StopIntent');
    },
    'Unhandled': function() {
        this.response.speak(SkillMessages.help).listen(welcomeRepromt);
        this.emit(':responseReady');
    }

};

//    END of Intent Handlers {} ========================================================================================
// 3. Helper Function  =================================================================================================


function updateShadow(desiredState, callback) {
    // update AWS IOT thing shadow
    var AWS = require('aws-sdk');
    AWS.config.region = config.IOT_BROKER_REGION;

    //Prepare the parameters of the update call

    var paramsUpdate = {
        "thingName" : config.IOT_THING_NAME,
        "payload" : JSON.stringify(
            { "state":
                { "desired": desiredState             // {"pump":1}
                }
            }
        )
    };

    var iotData = new AWS.IotData({endpoint: config.IOT_BROKER_ENDPOINT});

    iotData.updateThingShadow(paramsUpdate, function(err, data)  {
        if (err){
            console.log(err);

            callback("not ok");
        }
        else {
            console.log("updated thing shadow " + config.IOT_THING_NAME + ' to state ' + paramsUpdate.payload);
            callback("ok");
        }

    });

}
