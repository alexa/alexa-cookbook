/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills Kit
 * using the nodejs SDK.  It's intended to be used at an Alexa Workshop
 **/

// Include the Alexa Library.
const Alexa = require('alexa-sdk');

// This is the function that AWS Lambda calls every time Alexa uses your skill.
exports.handler = function(event, context, callback) {
  // Create an instance of the Alexa library and pass it the requested command.
    var alexa = Alexa.handler(event, context);

    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
  'LaunchRequest': function () {
      this.emit('HelloWorldIntent');
  },

  'HelloWorldIntent': function () {
      this.response.speak('Hello World from Alexa!')
      this.emit(':responseReady');
  }
};
