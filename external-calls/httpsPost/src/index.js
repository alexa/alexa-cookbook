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

        var pop = 0;
        var myRequest = 'Virginia';

        httpsPost(myRequest,  myResult => {
                console.log("sent     : " + myRequest);
                console.log("received : " + myResult);

                this.response.speak('The population of ' + myRequest + ' is ' + myResult);
                this.emit(':responseReady');

            }
        );

    }
};

// END of Intent Handlers ---------------------------------------------------------------------
// Paste in any helper functions below --------------------------------------------------------


var https = require('https');
// https is a default part of Node.JS.  Read the developer doc:  https://nodejs.org/api/https.html
// try other APIs such as the current bitcoin price : https://btc-e.com/api/2/btc_usd/ticker  returns ticker.last


function httpsPost(myData, callback) {

    // GET is a web service request that is fully defined by a URL string
    // Try GET in your browser:
    // https://cp6gckjt97.execute-api.us-east-1.amazonaws.com/prod/stateresource?usstate=New%20Jersey


    var post_data = {"usstate": myData};

    var post_options = {
        host:  'cp6gckjt97.execute-api.us-east-1.amazonaws.com',
        port: '443',
        path: '/prod/stateresource',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(JSON.stringify(post_data))
        }
    };

    var post_req = https.request(post_options, res => {
        res.setEncoding('utf8');
        var returnData = "";
        res.on('data', chunk =>  {
            returnData += chunk;
        });
        res.on('end', () => {
            // this particular API returns a JSON structure:
            // returnData: {"usstate":"New Jersey","population":9000000}

            population = JSON.parse(returnData).population;

            callback(population);

        });
    });
    post_req.write(JSON.stringify(post_data));
    post_req.end();

}
