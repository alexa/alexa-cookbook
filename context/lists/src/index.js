const https = require("https");
const list_is_empty = "#list_is_empty#";

/**
 * List API end-point.
 */
const api_url = 'api.amazonalexa.com';
const api_port = '443';

var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

/**
 * Called when the session starts.
 */
const newSessionRequestHandler = function() {
    console.log("Starting newSessionRequestHandler");
    if (this.event.request.type === "IntentRequest") {
        this.emit(this.event.request.intent.name);
    }
    else {
        this.emit(LAUNCH_REQUEST);
    }
    console.log("Ending newSessionRequestHandler");
};

/**
 * Handler for the launch request event.
 */
const launchRequestHandler = function() {
    console.log("Starting launchRequestHandler");
    var speechOutput = "Welcome. You can say, top todo";

    this.response.speak(speechOutput);
    this.emit(":responseReady");
    console.log("Ending launchRequestHandler");
};

/**
 * This is the handler for the SessionEnded event.
 */
const sessionEndedRequestHandler = function() {
    console.log("Starting sessionEndedRequestHandler");
    var speechOutput = "Goodbye";
    this.response.speak(speechOutput);
    this.emit(":responseReady");
    console.log("Ending sessionEndedRequestHandler");
};

/**
 * This is the handler for the Unhandled event.
 */
const unhandledRequestHandler = function() {
    console.log("Starting unhandledRequestHandler");
    var speechOutput = "This request is not supported.";
    this.response.speak(speechOutput).listen(speechOutput);
    this.emit(":responseReady");
    console.log("Ending unhandledRequestHandler");
};

/**
 * This is the handler for the Amazon help built in intent.
 */
const amazonHelpHandler = function() {
    console.log("Starting amazonHelpHandler");
    var speechOutput = "You can say top todo or todo list size or cancel top todo.";
    this.response.speak(speechOutput);
    this.emit(":responseReady");
    console.log("Ending amazonHelpHandler");
};

/**
 * This is the handler for the Amazon cancel built-in intent.
 */
const amazonCancelHandler = function() {
    console.log("Starting amazonCancelHandler");
    var speechOutput = "Goodbye";
    this.response.speak(speechOutput);
    this.emit(":responseReady");
    console.log("Ending amazonCancelHandler");
};

/**
 * This is the handler for the Amazon stop built in intent.
 */
const amazonStopHandler = function() {
    console.log("Starting amazonStopHandler");
    var speechOutput = "Goodbye";
    this.response.speak(speechOutput);
    this.emit(":responseReady");
    console.log("Ending amazonStopHandler");
};

/**
 * This is the handler for the top to-do intent.
 */
const topToDoHandler = function() {
    var speechOutput = "";
    var that = this;
    console.log("Starting top todo handler");
    console.log("this.event = " + JSON.stringify(this.event));
    getTopToDoItem(this.event.session, function(itemName) {
        if(!itemName) {
            speechOutput = "Alexa List permissions are missing. You can grant permissions within the Alexa app.";
            var permissions = ["read::alexa:household:list"];
            that.emit(":tellWithPermissionCard", speechOutput, permissions);
        } else if(itemName === list_is_empty) {
            speechOutput = "Your todo list is empty.";
            that.response.speak(speechOutput);
            that.emit(':responseReady');
        } else {
            speechOutput = "Your top todo is " + itemName;
            that.response.speak(speechOutput)
            that.emit(":responseReady");
        }
    });
    console.log("Ending top todo handler");
};

/**
 * This is the handler for the delete top to-do intent.
 */
const clearTopToDoHandler = function() {
    var speechOutput = "";
    var that = this;
    console.info("Starting clear top todo handler");
    clearTopToDoAction(this.event.session, function(status) {
        if(!status) {
            speechOutput = "Alexa List permissions are missing. You can grant permissions within the Alexa app.";
            var permissions = ["write::alexa:household:list"];
            that.emit(":tellWithPermissionCard", speechOutput, permissions);
        } else if(status === list_is_empty) {
            speechOutput = "I could not delete your top todo. Your todo list is empty.";
            that.response.speak(speechOutput);
            that.emit(":responseReady");
        } else if(status === 200 ) {
            speechOutput = "I successfully deleted your top todo.";
            this.response.speak(speechOutput);
            that.emit(":responseReady");
        } else {
          speechOutput = "I could not delete the todo. The developers are debugging response code " + status;
          this.response.speak(speechOutput);
          that.emit(":responseReady");
        }
    });
    console.info("Ending clear top todo handler");
};

// --------------- Helper List API functions -----------------------

/**
 * List API to retrieve the List of Lists : Lists Metadata.
 */
const getListsMetadata = function(session, callback) {
    if(!session.user.permissions) {
        console.log("permissions are not defined");
        callback(null);
        return;
    }
    consent_token = session.user.permissions.consentToken;
    console.log("Starting the get list metadata call.");
    var options = {
        host: api_url,
        port: api_port,
        path: '/v2/householdlists/',
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + consent_token,
            'Content-Type': 'application/json'
        }
    }

    var req = https.request(options, (res) => {
        console.log('STATUS: ', res.statusCode);
        console.log('HEADERS: ', JSON.stringify(res.headers));

        if(res.statusCode === 403) {
            console.log("permissions are not granted");
            callback(null);
            return;
        }

        var body = [];
        res.on('data', function(chunk) {
            body.push(chunk);
        }).on('end', function() {
            body = Buffer.concat(body).toString();
            callback(body);
        });

        res.on('error', (e) => {
            console.log(`Problem with request: ${e.message}`);
        });
    }).end();
};

/**
 * List API to retrieve the customer to-do list.
 */
const getToDoList = function(session, callback) {
    if(!session.user.permissions) {
        console.log("permissions are not defined");
        callback(null);
        return;
    }
    consent_token = session.user.permissions.consentToken;
    console.log("Starting get todo list call.");

    getListsMetadata(session, function(returnValue) {
        if(!returnValue) {
            console.log("permissions are not defined");
            callback(null);
            return;
        }
        var obj = JSON.parse(returnValue);
        var todo_path = "";
        for (i=0; i < obj.lists.length; i++) {
	    if (obj.lists[i].name === "Alexa to-do list") {
                for (j=0; j < obj.lists[i].statusMap.length; j++) {
                    if (obj.lists[i].statusMap[j].status === "active") {
                        todo_path = obj.lists[i].statusMap[j].href;
                        break;
		    }
		}
                break;
	    }
	}

        var options = {
           host: api_url,
           port: api_port,
           path: todo_path,
           method: 'GET',
           headers: {
               'Authorization': 'Bearer ' + consent_token,
               'Content-Type': 'application/json'
           }
        }

        var req = https.request(options, (res) => {
           console.log('STATUS: ', res.statusCode);
           console.log('HEADERS: ', JSON.stringify(res.headers));

           if(res.statusCode === 403) {
             console.log("permissions are not granted");
             callback(null);
             return;
           }

           var body = [];
           res.on('data', function(chunk) {
               body.push(chunk);
            }).on('end', function() {
               body = Buffer.concat(body).toString();
               callback(JSON.parse(body));
            });

            res.on('error', (e) => {
               console.log(`Problem with request: ${e.message}`);
            });
         }).end();
    });
};

/**
 * Helper function to retrieve the top to-do item.
 */
const getTopToDoItem = function(session, callback) {
    getToDoList(session, function(returnValue) {
       if(!returnValue) {
           callback(null);
       }
       else if(!returnValue.items || returnValue.items.length === 0) {
           callback(list_is_empty);
       }
       else {
           callback(returnValue.items[0].value);
       }
    });
};

/**
 * List API to delete the top todo item.
 */
const clearTopToDoAction = function(session, callback) {
    getToDoList(session, function(returnValue) {
        if(!returnValue) {
	    callback(null);
	    return;
	}
	else if(!returnValue.items || returnValue.items.length === 0) {
	    callback(list_is_empty);
	    return;
	}

	if(!session.user.permissions) {
	    console.log("permissions are not defined");
	    callback(null);
	    return;
	}
	consent_token = session.user.permissions.consentToken;

	var path = "/v2/householdlists/_listId_/items/_itemId_";
	path = path.replace("_listId_", returnValue.listId);
	path = path.replace("_itemId_", returnValue.items[0].id);

	var options = {
	    host: api_url,
	    port: api_port,
	    path: path,
	    method: 'DELETE',
	    headers: {
		'Authorization': 'Bearer ' + consent_token,
		'Content-Type': 'application/json'
	    }
	}

	var req = https.request(options, (res) => {
		console.log('STATUS: ', res.statusCode);
		console.log('HEADERS: ', JSON.stringify(res.headers));

		if(res.statusCode === 403) {
		    console.log("permissions are not granted");
		    callback(null);
		    return;
		}

		var body = [];
		res.on('data', function(chunk) {
		    body.push(chunk);
		}).on('end', function() {
		    body = Buffer.concat(body).toString();
		    callback(res.statusCode);
		});

		res.on('error', (e) => {
		    console.log(`Problem with request: ${e.message}`);
		});

	    }).end();
	});
};

// Define events and intents
const NEW_SESSION = "NewSession";
const LAUNCH_REQUEST = "LaunchRequest";
const SESSION_ENDED = "SessionEndedRequest";
const UNHANDLED = "Unhandled";

const TOP_TODO_INTENT = "TopToDoIntent";
const CLEAR_TOP_TODO_INTENT = "ClearTopToDoIntent";
const AMAZON_HELP = "AMAZON.HelpIntent";
const AMAZON_CANCEL = "AMAZON.CancelIntent";
const AMAZON_STOP = "AMAZON.StopIntent";

const handlers = {};

// Event handlers
handlers[NEW_SESSION] = newSessionRequestHandler;
handlers[LAUNCH_REQUEST] = launchRequestHandler;
handlers[SESSION_ENDED] = sessionEndedRequestHandler;
handlers[UNHANDLED] = unhandledRequestHandler;

// Intent handlers
handlers[TOP_TODO_INTENT] = topToDoHandler;
handlers[CLEAR_TOP_TODO_INTENT] = clearTopToDoHandler;

handlers[AMAZON_CANCEL] = amazonCancelHandler;
handlers[AMAZON_STOP] = amazonStopHandler;
handlers[AMAZON_HELP] = amazonHelpHandler;
