'use strict';

const directiveType     = 'Connections.SendRequest';
const setupDirective    = {
    name: 'Setup',
};

const chargeDirective   = {
    name: 'Charge',
};

function createDirective( name, payload, token ) {
    var directive       = {};
    directive.type      = directiveType;
    directive.name      = name;
    directive.payload   = payload;
    directive.token     = token;

    return directive;
}

function createSetupDirective( payload, token ) {
    return createDirective( setupDirective.name, payload, token );
}

function createChargeDirective( payload, token ) {
    return createDirective( chargeDirective.name, payload, token );
}

module.exports = {
    'createSetupDirective':     createSetupDirective,
    'createChargeDirective':    createChargeDirective,
    'setupDirectiveName':       setupDirective.name,
    'chargeDirectiveName':      chargeDirective.name,
};