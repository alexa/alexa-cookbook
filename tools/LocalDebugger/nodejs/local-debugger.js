/*
 * Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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

const net = require('net');
const fs = require('fs');

const localDebugger = net.createServer();

const HTTP_HEADER_DELIMITER = '\r\n';
const HTTP_BODY_DELIMITER = '\r\n\r\n';
const DEFAULT_HANDLER_NAME = 'handler';
const HOST_NAME = 'localhost';
const DEFAULT_PORT = 0;

/**
 * Resolves the skill invoker class dependency from the user provided
 * skill entry file.
 */

// eslint-disable-next-line import/no-dynamic-require
const skillInvoker = require(getAndValidateSkillInvokerFile());
const portNumber = getAndValidatePortNumber();
const lambdaHandlerName = getLambdaHandlerName();

/**
 * Starts listening on the port for incoming skill requests.
 */

localDebugger.listen(portNumber, HOST_NAME, () => {
    console.log(`Starting server on port: ${localDebugger.address().port}.`);
});

/**
 * For a new incoming skill request a new socket connection is established.
 * From the data received on the socket the request body is extracted, parsed into
 * JSON and passed to the skill invoker's lambda handler.
 * The response from the lambda handler is parsed as a HTTP 200 message format as specified
 * here - https://developer.amazon.com/docs/custom-skills/request-and-response-json-reference.html#http-header-1
 * The response is written onto the socket connection.
 */

localDebugger.on('connection', (socket) => {
    console.log(`Connection from: ${socket.remoteAddress}:${socket.remotePort}`);
    socket.on('data', (data) => {
        const body = JSON.parse(data.toString().split(HTTP_BODY_DELIMITER).pop());
        console.log(`Request envelope: ${JSON.stringify(body)}`);
        skillInvoker[lambdaHandlerName](body, null, (_invokeErr, response) => {
            response = JSON.stringify(response);
            console.log(`Response envelope: ${response}`);
            socket.write(`HTTP/1.1 200 OK${HTTP_HEADER_DELIMITER}Content-Type: application/json;charset=UTF-8${HTTP_HEADER_DELIMITER}Content-Length: ${response.length}${HTTP_BODY_DELIMITER}${response}`);
        });
    });
});

/**
 * Validates user specified port number is in legal range [0, 65535].
 * Defaults to 0.
 */

function getAndValidatePortNumber() {
    const portNumberArgument = Number(getArgument('portNumber', DEFAULT_PORT));
    if (!Number.isInteger(portNumberArgument)) {
        throw new Error(`Port number has to be an integer - ${portNumberArgument}.`);
    }
    if (portNumberArgument < 0 || portNumberArgument > 65535) {
        throw new Error(`Port out of legal range: ${portNumberArgument}. The port number should be in the range [0, 65535]`);
    }
    if (portNumberArgument === 0) {
        console.log('The TCP server will listen on a port that is free.'
        + 'Check logs to find out what port number is being used');
    }
    return portNumberArgument;
}

/**
 * Gets the lambda handler name.
 * Defaults to "handler".
 */

function getLambdaHandlerName() {
    return getArgument('lambdaHandler', DEFAULT_HANDLER_NAME);
}

/**
 * Validates that the skill entry file exists on the path specified.
 * This is a required field.
 */

// eslint-disable-next-line consistent-return
function getAndValidateSkillInvokerFile() {
    const fileNameArgument = getArgument('skillEntryFile');
    if (!fs.existsSync(fileNameArgument)) {
        throw new Error(`File not found: ${fileNameArgument}`);
    }
    return fileNameArgument;
}

/**
 * Helper function to fetch the value for a given argument
 * @param {argumentName} argumentName name of the argument for which the value needs to be fetched
 * @param {defaultValue} defaultValue default value of the argument that is returned if the value doesn't exist
 */

function getArgument(argumentName, defaultValue) {
    const index = process.argv.indexOf(`--${argumentName}`);
    if (index === -1 || typeof process.argv[index + 1] === 'undefined') {
        if (defaultValue === undefined) {
            throw new Error(`Required argument - ${argumentName} not provided.`);
        } else {
            return defaultValue;
        }
    }
    return process.argv[index + 1];
}
