/*
 * Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * function creating an AskSdk error.
 * @param {string} errorName
 * @param {string} errorMessage
 * @returns {Error}
 */
function createAskSdkError(errorName, errorMessage) {
    var error = new Error(errorMessage);
    error.name = "AskSdk." + errorName + " Error";
    return error;
}
exports.createAskSdkError = createAskSdkError;
/**
 * function creating an AskSdk user agent.
 * @param {string} customUserAgent
 * @returns {string}
 */
function createAskSdkUserAgent(customUserAgent) {
    var packageInfo = require('../../package.json');
    var customUserAgentString = customUserAgent ? (' ' + customUserAgent) : '';
    return "ask-node/" + packageInfo.version + " Node/" + process.version + customUserAgentString;
}
exports.createAskSdkUserAgent = createAskSdkUserAgent;
//# sourceMappingURL=AskSdkUtils.js.map