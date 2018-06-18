var Voice = require('./core');

global.VoiceInsights = function(session, token){
  Voice.initialize(session, token);
};

module.exports = Voice;
