var Request = require('request'),
    Enums = require('./enums'),
    Constants = require('./constants'),
    _ = require('./utils');

/**
 * VoiceEvent constructor
 * @constructor
 * @param  {String} name String containing the event name (ex: INITIALIZE, SESSION_START, etc...)
 * @param  {Object} data Object containing metadata for the event
 * @return {Void}
 */
var VoiceEvent = function(name, data){
  if(!Enums.eventTypes[name]){
    throw '[VoiceInsights ERROR] Event type is not supported: ' + name;
  }

  if(!data){
    data = {};
  }

  this.name = name;
  this.data = data;
  this.data.event_type = name;
}

_.extend(VoiceEvent.prototype, {
  /**
   * Post action to events API endpoint
   * @param  {Function} cb Callback to execute on request successful completion
   * @return {Void}
   */
  send: function(cb){

    var URL = Constants.authURL(Constants.api.baseURL + Constants.api.eventsAPI, this.data.app_token);

    return Request.post(URL, { timeout: 1500, json: this.data }, function(error, response, body){

      var status = response ? response.statusCode : 500
          output = {
            status: status
          };

      if(!error && status >= 200 && status < 300 || status === 304){
        output.response = body;

        if(_.isFunction(cb)){
          cb(null, output);
        }
      }else{
        if(_.isFunction(cb)){
          cb(error, output);
        }
      }
    });
  }
});

module.exports = VoiceEvent;
