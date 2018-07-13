'use strict';

/**
    A detailed list simulation strings to use in sandboxMode can be found here:
    https://pay.amazon.com/us/developer/documentation/lpwa/201956480#201956480
**/


// Used for testing simulation strings in sandbox mode
function getSimulationString( type ) {
	let simulationString = '';

	switch( type ) {
		case 'InvalidPaymentMethod':
			// PaymentMethodUpdateTimeInMins only works with Async authorizations to change BA back to OPEN; Sync authorizations will not revert
			simulationString = '{ "SandboxSimulation": { "State":"Declined", "ReasonCode":"InvalidPaymentMethod", "PaymentMethodUpdateTimeInMins":1, "SoftDecline":"true" } }';
			break;
		case 'AmazonRejected':
			simulationString = '{ "SandboxSimulation": { "State":"Declined", "ReasonCode":"AmazonRejected" } }';
			break;
		case 'TransactionTimedOut':
			simulationString = '{ "SandboxSimulation": { "State":"Declined", "ReasonCode":"TransactionTimedOut" } }';
			break;
		default:
			simulationString = '';
	}

	return simulationString;
}

// Sometimes you just need a random string right?
function generateRandomString( length ) {
    let randomString 	= '';
    const stringValues 	= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for ( let i = 0; i < length; i++ )
        randomString += stringValues.charAt( Math.floor( Math.random( ) * stringValues.length ) );

    return randomString;
}

function getConsentToken( handlerInput ) {
	const consentToken = handlerInput.requestEnvelope.context.System.apiAccessToken;

	return consentToken;
}

module.exports = {
    'generateRandomString': generateRandomString,
    'getConsentToken': 		getConsentToken,
    'getSimulationString': 	getSimulationString
};