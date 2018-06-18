var Enums = require('./enums'),
    Event = require('./event'),
    md5 = require('MD5'),
    _ = require('./utils'),
    /**
     * Error messages
     * @type {Object}
     */
    errors = {
      exception: '[VoiceInsights ERROR] Unexpected Exception',
      noTokenError: '[VoiceInsights ERROR]: You must initialize with a valid token before tracking.',
      invalidSessionError: '[VoiceInsights ERROR]: You must provide a valid session object.',
      invalidSessionId: '[VoiceInsights ERROR]: You must provide a valid session ID.',
      invalidInputsError: '[VoiceInsights ERROR] Invalid inputs object passed through request.',
      invalidUserError: '[VoiceInsights ERROR]: A valid user ID must be provided, got null',
      invalidConversationError: '[VoiceInsights ERROR] Invalid conversation object passed through request.',
      invalidIntentNameError: '[VoiceInsights ERROR] Invalid intentName passed through.',
    },
    /**
     * Session event and payload data
     * @type {Object}
     */
    config = {},
    initialized = false,
    /**
     * Helper function to keep triggering events DRY
     * @param  {String}   type     String containing the event name
     * @param  {Object}   event    Voice Event object
     * @param  {Object}   payload  Object containing session, token, etc...
     * @param  {Function} callback Callback function to execute after event trigger
     * @return {Object}            The Voice instance
     */
    trigger = function(type, payload, cb){

        var event = new Event(type, payload);

        try {
          return event.send(cb);
        }
        catch(error){
          if(_.isFunction(cb)){
            cb(error, null);
          }
          console.error(errors.exception, error);
        }
    };

/**
 * Voice constructor
 * @constructor
 * @param  {Object} session Object containing session data
 * @param  {String} token   String containing the unique app token
 * @return {Void}
 */
var Voice = function(session, token){
  var uid = null;

  if(!_.isObject(session)){
    console.error(errors.invalidSessionError);
  }

  if(!session || !session.sessionId){
    console.error(errors.invalidSessionId);
  }

  if(!session.user || !session.user.userId){
    console.error(errors.invalidUserError);
  }else{
    uid = md5(session.user.userId);
  }

  if(!token || token && !token.length || token && !_.isString(token)){
    console.error(errors.noTokenError);
  }

  if(!config.session_id || session.new){
    initialized = false;
  }

  config.app_token = token;
  config.session_id = session.sessionId;
  config.user_hashed_id = uid;
};

_.extend(Voice, {
  /**
   * Fires the initialize event and executes the callback
   * @param  {Object} session Object containing session data
   * @param  {String} token   String containing the unique app token
   * @return {Void}
   */
  initialize: function(session, token){
    return Voice(session, token);
  },

  /**
   * Fires the track event and executes the callback
   * function with the speech output SSML + response
   * @param  {String}   intentName            The intent string
   * @param  {Object}   intentMetadata        Object containing intent metadata like slots
   * @param  {String}   speechText            String speech out by Alexa
   * @param  {Function} cb                    Callback function for success
   * @return {Void}
   */
  track: function(intentName, intentMetadata, speechText, cb){
    var error = false;

    //Error check to make sure we have everything we need
    if(!config.app_token || !config.app_token.length || !_.isString(config.app_token)){
      console.error(errors.noTokenError);
      error = true;
    }

    if(!config.session_id){
      console.error(errors.invalidSessionId);
      error = true;
    }

    if(!config.user_hashed_id){
      console.error(errors.invalidUserError);
      error = true;
    }

    if(!intentName) {
      console.error(errors.invalidIntentNameError);
      error = true;
    }

    if(error){
      if(_.isFunction(cb)){
        cb({
          error: 'Invalid arguments passed to track(). See standard error for details.'
        });
      }

      return;
    }

    var payload = {
      app_token: config.app_token,
      user_hashed_id: config.user_hashed_id,
      session_id: config.session_id,
      intent: intentName,
      data: {
        metadata: intentMetadata,
        speech: speechText,
      },
    };

    // check if session exists
    if(!initialized){
      initialized = true;
      config.agent = 'alexa';

      // trigger session event
      trigger(Enums.eventTypes.INITIALIZE, config, function(){
        // trigger speech event
        trigger(Enums.eventTypes.SPEECH, payload, cb);
      });
    }else{
      // trigger speech event
      trigger(Enums.eventTypes.SPEECH, payload, cb);
    }
  }
});

module.exports = Voice;
