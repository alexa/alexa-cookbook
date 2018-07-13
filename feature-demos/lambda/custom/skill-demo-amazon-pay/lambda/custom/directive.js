'use strict';

/** 
	Directives are messages sent from AVS telling a client to perform a specific action
	Read more here about the interaction model: https://developer.amazon.com/docs/alexa-voice-service/interaction-model.html
**/


function buildDirective( type, name, payload, directiveName, token ) {

    var directive = {
            'type': type,
            'name': name,
            'payload': {}, // Set dynamically below
            'token': token
    };		

    directive.payload[ directiveName ] = payload;

	return directive;
}

module.exports = {
    'buildDirective': buildDirective
};