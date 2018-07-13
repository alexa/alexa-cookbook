'use strict';

const config = require( 'config' );

/**
	A detailed list of all payment declines and processing errors can be found here:
	https://developer.integ.amazon.com/docs/amazon-pay/payment-declines-and-processing-errors.html
**/


// These are errors that will not be handled by Amazon Pay; Merchant must handle
function handleErrors( handlerInput ) {
	let   errorMessage 					= '';
	let   permissionsError 				= false;
	const actionResponseStatusCode 		= handlerInput.requestEnvelope.request.status.code;
	const actionResponseStatusMessage 	= handlerInput.requestEnvelope.request.status.message;
	const actionResponsePayloadMessage 	= handlerInput.requestEnvelope.request.payload.errorMessage;

	switch ( actionResponseStatusMessage ) {
		// Permissions errors - These must be resolved before a user can use Amazon Pay
		case 'ACCESS_DENIED':
		case 'ACCESS_NOT_REQUESTED':
		case 'FORBIDDEN':
			permissionsError 	= true;
			errorMessage 		= config.enablePermission;
			break;

		// Integration errors - These must be resolved before Amazon Pay can run
		case 'BuyerEqualsSeller':
		case 'InvalidParameterValue':
		case 'InvalidSandboxCustomerEmail':
		case 'InvalidSellerId':
		case 'UnauthorizedAccess':
		case 'UnsupportedCountryOfEstablishment':
		case 'UnsupportedCurrency':

		// Runtime errors - These must be resolved before a charge action can occur
		case 'DuplicateRequest':
		case 'InternalServerError':
		case 'InvalidAuthorizationAmount':
		case 'InvalidBillingAgreementId':
		case 'InvalidBillingAgreementStatus':
		case 'InvalidPaymentAction':
		case 'PeriodicAmountExceeded':
		case 'ProviderNotAuthorized':
		case 'ServiceUnavailable':
			errorMessage = 	config.errorMessage 		+ 
							config.errorStatusCode 		+ actionResponseStatusCode 		+ '.' +
							config.errorStatusMessage 	+ actionResponseStatusMessage 	+ '.' +
							config.errorPayloadMessage  + actionResponsePayloadMessage;
			break;		

		default:
			errorMessage = config.errorUnknown;
			break;
	}

	debug( handlerInput );

	// If it is a permissions error send a permission consent card to the user, otherwise .speak() error to resolve during testing
	if ( permissionsError ) {
	    return handlerInput.responseBuilder
		    .speak( errorMessage )
		    .withAskForPermissionsConsentCard( [ config.scope ] )
		    .getResponse( );
	} else {
	    return handlerInput.responseBuilder
		    .speak( errorMessage )
		    .getResponse( );
	}
}

// If billing agreement equals any of these states, you need to get the user to update their payment method
// Once payment method is updated, billing agreement state will go back to OPEN and you can charge the payment method
function handleBillingAgreementState( billingAgreementStatus, handlerInput ) {
	let errorMessage = '';

	switch ( billingAgreementStatus ) {	
		case 'CANCELED':
		case 'CLOSED':
		case 'SUSPENDED':
			errorMessage = config.errorBillingAgreement +  billingAgreementStatus + config.errorBillingAgreementMessage;
			break;
		default:
			errorMessage = config.errorUnknown;
	}

	debug( handlerInput );

	return handlerInput.responseBuilder
		.speak( errorMessage )
		.getResponse( );
}

// Ideal scenario in authorization decline is that you save the session, allow the customer to fix their payment method, 
// and allow customer to resume session. This is just a simple message to tell the user their order was not placed.
function handleAuthorizationDeclines( authorizationStatusReasonCode, handlerInput ) {
	let errorMessage = '';

	switch ( authorizationStatusReasonCode ) {
		case 'AmazonRejected':
		case 'InvalidPaymentMethod':
		case 'ProcessingFailure':
		case 'TransactionTimedOut':
			errorMessage = config.authorizationDeclineMessage;	
			break;
		default:
			errorMessage = config.errorUnknown;
	}

	debug( handlerInput );
	
	return handlerInput.responseBuilder
		.speak( errorMessage )
		.getResponse( );	
}

// Output object to console for debugging purposes
function debug( handlerInput ) {
	console.log( config.debug + JSON.stringify( handlerInput ) );
}

module.exports = {
    'handleErrors': 					handleErrors,
    'handleBillingAgreementState': 		handleBillingAgreementState,
    'handleAuthorizationDeclines': 		handleAuthorizationDeclines,
    'debug': 							debug
};