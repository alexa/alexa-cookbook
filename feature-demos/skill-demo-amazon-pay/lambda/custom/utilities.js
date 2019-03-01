'use strict';

/**
    A detailed list simulation strings to use in sandboxMode can be found here:
    https://pay.amazon.com/us/developer/documentation/lpwa/201956480#201956480

    Used for testing simulation strings in sandbox mode
**/

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

// Sometimes you just need a random string, right?
function generateRandomString( length ) {
    let randomString 	= '';
    const stringValues 	= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for ( let i = 0; i < length; i++ )
        randomString += stringValues.charAt( Math.floor( Math.random( ) * stringValues.length ) );

    return randomString;
}

// Get intent slot values
function getSlotValues( filledSlots ) {
	const slotValues = {};

	console.log( `The filled slots: ${JSON.stringify(filledSlots)}` );
	Object.keys( filledSlots ).forEach( ( item ) => {
		const name = filledSlots[ item ].name;

		if ( filledSlots[ item ] &&
			filledSlots[ item ].resolutions &&
			filledSlots[ item ].resolutions.resolutionsPerAuthority[ 0 ] &&
			filledSlots[ item ].resolutions.resolutionsPerAuthority[ 0 ].status &&
			filledSlots[ item ].resolutions.resolutionsPerAuthority[ 0 ].status.code ) {
			switch ( filledSlots[ item ].resolutions.resolutionsPerAuthority[ 0 ].status.code ) {
				case 'ER_SUCCESS_MATCH':
					slotValues[ name ] = {
						synonym: filledSlots[ item ].value,
						resolved: filledSlots[ item ].resolutions.resolutionsPerAuthority[ 0 ].values[ 0 ].value.name,
						isValidated: true,
					};
					break;
				case 'ER_SUCCESS_NO_MATCH':
					slotValues[ name ] = {
						synonym: filledSlots[ item ].value,
						resolved: filledSlots[ item ].value,
						isValidated: false,
					};
					break;
				default:
					break;
			}
		} else {
			slotValues[ name ] = {
				synonym: filledSlots[ item ].value,
				resolved: filledSlots[ item ].value,
				isValidated: false,
			};
		}
	}, this );

	return slotValues;
}

// Prevent a previous session's setup from being called prematurely 
function resetSetup ( handlerInput ) {
	const { attributesManager } 	= handlerInput;
	let attributes                  = attributesManager.getSessionAttributes( );

	attributes.setup                = false;
	attributesManager.setSessionAttributes( attributes );  	
}

module.exports = {
    'generateRandomString': 			generateRandomString,
    'getSimulationString': 				getSimulationString,
	'getSlotValues': 					getSlotValues,
	'resetSetup': 						resetSetup,

};

