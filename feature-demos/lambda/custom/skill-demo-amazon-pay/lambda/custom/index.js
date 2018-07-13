'use strict';

const askSDK      = require( 'ask-sdk-core' );
const config      = require( 'config' );
const directive   = require( 'directive' );
const error       = require( 'error-handler' );
const payload     = require( 'payload' );
const utilities   = require( 'utilities' );

/**
	This skill is built for Nodejs using Alexa ASK V2.0.3 
	Download the SDK here: https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/wiki/Setting-Up-The-ASK-SDK
**/


// Do you want to buy something?
const LaunchRequestHandler = {
    canHandle( handlerInput ) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle( handlerInput ) {
        return handlerInput.responseBuilder
				            .speak( config.launchRequestWelcomeResponse + config.launchRequestQuestionResponse )
				            .reprompt( config.launchRequestQuestionResponse )
				            .getResponse( );
    }
};

// No, I do not want to buy something
const NoIntentHandler = {
    canHandle( handlerInput ) {
        return handlerInput.requestEnvelope.request.type       	=== 'IntentRequest' &&
			   handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NoIntent';
    },
    handle( handlerInput ) {
        return handlerInput.responseBuilder
				            .speak( config.noIntentResponse )
				            .withSimpleCard( config.noIntentMessage, config.storeURL )
				            .getResponse( );
    }
};

// Yes, I do want to buy something
const YesIntentHandler = {
    canHandle( handlerInput ) {
        return handlerInput.requestEnvelope.request.type 		=== 'IntentRequest' &&
               handlerInput.requestEnvelope.request.intent.name === 'AMAZON.YesIntent';
    },
    handle( handlerInput ) {
        // If you have a valid billing agreement from a previous session, skip the Setup action and call the Charge action instead         
        const consentToken 				= utilities.getConsentToken( handlerInput );
        const token 					= utilities.generateRandomString( 12 );
        
        // If you do not have a billing agreement set the Setup payload in Skill Connections and send the request directive
        const setupPayload 				= payload.buildSetup( consentToken );        
        const setupRequestDirective 	= directive.buildDirective( config.directiveType, config.connectionSetup, setupPayload, config.directiveSetup,  token );

        return handlerInput.responseBuilder
				        	.addDirective( setupRequestDirective )
				        	.getResponse( );
    }
};

// You requested the Setup or Charge directive and are now receiving the Connections.Response
const ConnectionsResponseHandler = {
    canHandle( handlerInput ) {
        return handlerInput.requestEnvelope.request.type === 'Connections.Response';
    },
    handle( handlerInput ) {
    	const consentToken 						= utilities.getConsentToken( handlerInput );
        const connectionName                  	= handlerInput.requestEnvelope.request.name;
        const connectionResponsePayload       	= handlerInput.requestEnvelope.request.payload;
        const connectionResponseStatusCode    	= handlerInput.requestEnvelope.request.status.code;

    	// If there are integration or runtime errors, do not charge the payment method
        if ( connectionResponseStatusCode != 200 ) {
            return error.handleErrors( handlerInput );
        } else {

	        // Receiving Setup Connections.Response
	        if ( connectionName === config.connectionSetup ) {
	            const token 						= utilities.generateRandomString( 12 );

	            // Get the billingAgreementId and billingAgreementStatus from the Setup Connections.Response
	            const billingAgreementId 			= connectionResponsePayload.billingAgreementDetails.billingAgreementId;
				const billingAgreementStatus 		= connectionResponsePayload.billingAgreementDetails.billingAgreementStatus;

				 // If billingAgreementStatus is valid, Charge the payment method    
				if ( billingAgreementStatus === 'OPEN' ) {

					// Set the Charge payload in Skill Connections and send the request directive
	            	const chargePayload 			= payload.buildCharge( consentToken, billingAgreementId );
	            	const chargeRequestDirective 	= directive.buildDirective( config.directiveType, config.connectionCharge, chargePayload, config.directiveCharge, token );

	            	return handlerInput.responseBuilder
					            		.addDirective( chargeRequestDirective )
					            		.withShouldEndSession( true )
					            		.getResponse( );

	            // If billingAgreementStatus is not valid, do not Charge the payment method	
				} else {
					return error.handleBillingAgreementState( billingAgreementStatus, handlerInput );
				}

	        // Receiving Charge Connections.Response
	        } else if ( connectionName === config.connectionCharge ) {
            	const authorizationStatusState = connectionResponsePayload.authorizationDetails.state;
            	
                // Authorization is declined, tell the user their order was not placed
            	if( authorizationStatusState === 'Declined' ) {
            		const authorizationStatusReasonCode = connectionResponsePayload.authorizationDetails.reasonCode;

            		return error.handleAuthorizationDeclines( authorizationStatusReasonCode, handlerInput );

                // Authorization is approved, tell the user their order was placed    
            	} else {
		            return handlerInput.responseBuilder
						            	.speak( config.orderConfirmationResponse )
						            	.withShouldEndSession( true )
						            	.getResponse( );
            	}
	        }
        }
    }
};

exports.handler = askSDK.SkillBuilders
						.custom( )
						.addRequestHandlers( 
							LaunchRequestHandler, 
							NoIntentHandler, 
							YesIntentHandler, 
							ConnectionsResponseHandler )
						.lambda( );