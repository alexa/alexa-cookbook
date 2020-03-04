'use strict';

const config = require( 'config' );

/**
    A detailed list of attributes available to build the payload can be found here:
    https://developer.integ.amazon.com/docs/amazon-pay/amazon-pay-apis-for-alexa.html
**/


// Builds payload for Setup action
function buildSetup ( consentToken ) {
    const payload = {
        'consentToken':                             consentToken,
        'checkoutLanguage':                         config.checkoutLanguage,
        'countryOfEstablishment':                   config.countryOfEstablishment,
        'ledgerCurrency':                           config.ledgerCurrency,
        'sandboxCustomerEmailId':                   config.sandboxCustomerEmailId,
        'sandboxMode':                              config.sandboxMode,
        'sellerId':                                 config.sellerId,
        'billingAgreementAttributes': {
            'platformId': 							config.platformId,
            'sellerNote': 							config.sellerNote,
            'sellerBillingAgreementAttributes': {
                'sellerBillingAgreementId': 		config.sellerBillingAgreementId,
                'storeName': 						config.storeName,
                'customInformation': 				config.customInformation
            }
        },
        'needAmazonShippingAddress': 				config.needAmazonShippingAddress
    };

    return payload;
}

// Builds payload for Charge action
function buildCharge ( consentToken, billingAgreementId ) {
    const payload = {
        'consentToken':                 consentToken,
        'sellerId':                     config.sellerId,
        'billingAgreementId':           billingAgreementId,
        'paymentAction':                config.paymentAction,
        'authorizeAttributes': {
            'authorizationReferenceId': config.authorizationReferenceId,
            'authorizationAmount': {
                'amount':               config.amount,
                'currencyCode':         config.currencyCode
            },
            'transactionTimeout':       config.transactionTimeout,
            'sellerAuthorizationNote':  config.sellerAuthorizationNote,
            'softDescriptor':           config.softDescriptor
        },
        'sellerOrderAttributes': {
            'sellerOrderId':            config.sellerOrderId,
            'storeName':                config.storeName,
            'customInformation':        config.customInformation,
            'sellerNote':               config.sellerNote
        }
    };

    return payload;
}

module.exports = {
    'buildSetup':       buildSetup,
    'buildCharge':      buildCharge	
};