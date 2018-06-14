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
var url = require("url");
var AskSdkUtils_1 = require("../util/AskSdkUtils");
/**
 * Default implementation of {@link services.ApiClient} which uses the native HTTP/HTTPS library of Node.JS.
 */
var DefaultApiClient = /** @class */ (function () {
    function DefaultApiClient() {
    }
    /**
     * Dispatches a request to an API endpoint described in the request.
     * An ApiClient is expected to resolve the Promise in the case an API returns a non-200 HTTP
     * status code. The responsibility of translating a particular response code to an error lies with the
     * caller to invoke.
     * @param {services.ApiClientRequest} request request to dispatch to the ApiClient
     * @returns {Promise<services.ApiClientResponse>} response from the ApiClient
     */
    DefaultApiClient.prototype.invoke = function (request) {
        var _this = this;
        var urlObj = url.parse(request.url);
        var clientRequestOptions = {
            // tslint:disable:object-literal-sort-keys
            hostname: urlObj.hostname,
            path: urlObj.path,
            port: urlObj.port,
            protocol: urlObj.protocol,
            auth: urlObj.auth,
            headers: arrayToObjectHeader(request.headers),
            method: request.method,
        };
        var client = clientRequestOptions.protocol === 'https:' ? require('https') : require('http');
        return new Promise(function (resolve, reject) {
            var clientRequest = client.request(clientRequestOptions, function (response) {
                var chunks = [];
                response.on('data', function (chunk) {
                    chunks.push(chunk);
                });
                response.on('end', function () {
                    var responseStr = chunks.join('');
                    var responseObj = {
                        statusCode: response.statusCode,
                        body: responseStr,
                        headers: objectToArrayHeader(response.headers),
                    };
                    resolve(responseObj);
                });
            });
            clientRequest.on('error', function (err) {
                reject(AskSdkUtils_1.createAskSdkError(_this.constructor.name, err.message));
            });
            if (request.body) {
                clientRequest.write(request.body);
            }
            clientRequest.end();
        });
    };
    return DefaultApiClient;
}());
exports.DefaultApiClient = DefaultApiClient;
/**
 * Converts the header array in {@link services.ApiClientRequest} to compatible JSON object.
 * @private
 * @param {{key : string, value : string}[]} header header array from ApiClientRequest}
 * @returns {Object.<string, string[]>} header object to pass into HTTP client
 */
function arrayToObjectHeader(header) {
    var reducer = function (obj, item) {
        if (obj[item.key]) {
            obj[item.key].push(item.value);
        }
        else {
            obj[item.key] = [item.value];
        }
        return obj;
    };
    return header.reduce(reducer, {});
}
/**
 * Converts JSON header object to header array required for {services.ApiClientResponse}
 * @private
 * @param {Object.<string, (string|string[])>} header JSON header object returned by HTTP client
 * @returns {{key : string, value : string}[]}
 */
function objectToArrayHeader(header) {
    var arrayHeader = [];
    Object.keys(header).forEach(function (key) {
        var headerArray = Array.isArray(header[key]) ? header[key] : [header[key]];
        for (var _i = 0, _a = headerArray; _i < _a.length; _i++) {
            var value = _a[_i];
            arrayHeader.push({
                key: key,
                value: value,
            });
        }
    });
    return arrayHeader;
}
//# sourceMappingURL=DefaultApiClient.js.map