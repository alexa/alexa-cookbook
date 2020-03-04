// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: LicenseRef-.amazon.com.-AmznSL-1.0
// Licensed under the Amazon Software License  http://aws.amazon.com/asl/

// Import the sdk
const Alexa = require('ask-smapi-sdk');
// Import your authentication info
const Token = require('./tokens.js');
// And the util library will make for more readable output
const util = require('util');

// specify the refreshTokenConfig with clientId and clientSecret 
// from your Login with Amazon client config 
// and access/refresh tokens generated via the ASK CLI
const refreshTokenConfig = {
  "clientId": Token.client_Id,
  "clientSecret": Token.client_Secret, 
  "refreshToken": Token.refresh_token,
  "accessToken": Token.access_token
}

//build the SMAPI client
const smapiClient = new Alexa.StandardSmapiClientBuilder()
    .withRefreshTokenConfig(refreshTokenConfig)
    .client();

// This retrieves a list of the skills associated with
// your vendorId. You can use that info for other demos.
smapiClient.listSkillsForVendorV1(Token.vendorId)
    .then((response) => {
        console.log(util.inspect(response, {"showHidden":false, "depth":4, "colors": true, "compact": false}));
    })
    .catch((err) => {
        console.log(err.message);
        console.log(util.inspect(err, {"showHidden":false, "depth":4, "colors": true, "compact": false}));;
    });
