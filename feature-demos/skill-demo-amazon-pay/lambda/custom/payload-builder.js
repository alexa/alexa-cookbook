const utilities = require( 'utilities' );
let config      = require( 'config' );

const setupPayloadVersioning = {
    type: 'SetupAmazonPayRequest',
    version: '2'
};

const processPayloadVersioning = {
    type: 'ChargeAmazonPayRequest',
    version: '2'
};

var setupPayload = function( language ) {
    console.log( language );
    const regionalConfig    = config.REGIONAL[ language ];
    const generalConfig     = config.GENERAL;
    var payload = {
        '@type': setupPayloadVersioning.type,
        '@version': setupPayloadVersioning.version,
        'sellerId': regionalConfig.sellerId,
        'countryOfEstablishment': regionalConfig.countryOfEstablishment,
        'ledgerCurrency': regionalConfig.ledgerCurrency,
        'checkoutLanguage': language,
        'sandboxCustomerEmailId': regionalConfig.sandboxCustomerEmailId,
        'sandboxMode': regionalConfig.sandboxMode,
        'needAmazonShippingAddress': generalConfig.needAmazonShippingAddress,
        'billingAgreementAttributes': {
            '@type': 'BillingAgreementAttributes',
            '@version': '2',
            'sellerNote': regionalConfig.sellerNote,
            'platformId': generalConfig.platformId,
            'sellerBillingAgreementAttributes': {
                '@type': 'SellerBillingAgreementAttributes',
                '@version': '2',
                //'sellerBillingAgreementId': SOME RANDOM STRING,
                'storeName': generalConfig.sellerStoreName,
                'customInformation': regionalConfig.customInformation
            }
        }
    };

    return payload;
};
var chargePayload = function( billingAgreementId, authorizationReferenceId, sellerOrderId, amount, language ) {

    const regionalConfig    = config.REGIONAL[ language ];
    const generalConfig     = config.GENERAL;
    var payload = {
        '@type': processPayloadVersioning.type,
        '@version': processPayloadVersioning.version,
        'sellerId': regionalConfig.sellerId,
        'billingAgreementId': billingAgreementId,
        'paymentAction': generalConfig.paymentAction,
        'authorizeAttributes': {
            '@type': 'AuthorizeAttributes',
            '@version': '2',
            'authorizationReferenceId': authorizationReferenceId,
            'authorizationAmount': {
                '@type': 'Price',
                '@version': '2',
                'amount': amount.toString( ),
                'currencyCode': regionalConfig.ledgerCurrency
            },
            'transactionTimeout': generalConfig.transactionTimeout,
            'sellerAuthorizationNote': regionalConfig.sellerAuthorizationNote, // util.getSimulationString('AmazonRejected'), 
            'softDescriptor': regionalConfig.softDescriptor
        },
        'sellerOrderAttributes': {
            '@type': 'SellerOrderAttributes',
            '@version': '2',
            //           'sellerOrderId': sellerOrderId,
            'storeName': regionalConfig.sellerStoreName,
            'customInformation': regionalConfig.customInformation,
            'sellerNote': regionalConfig.sellerNote
        }
    };
    return payload;
};

module.exports = {
    'setupPayload':     setupPayload,
    'chargePayload':    chargePayload
};