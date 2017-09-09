'use strict';

const https = require('https');

/**
 * Small wrapper client for the Alexa List API
 *
 * @class AlexaListClient
 */
class AlexaListClient {
    /**
     * Creates an instance of AlexaListClient.
     * @param {string} consentToken valid consent token
     * @param {string} apiEndpoint the endpoint of the Alexa APIs
     * @memberof AlexaListClient
     */
    constructor(consentToken, apiEndpoint) {
        this.consentToken = consentToken;
        this.endpoint = apiEndpoint.replace(/^https?:\/\//i, "");
    }

    /**
     * This will make a request to the Alexa List API using the listId, itemId
     * and consent token provided when the AlexaListClient was initialized
     * This will retrieve list item information for the specified listId and itemId
     * @param {string} listId list id to search
     * @param {string} itemId item id to search
     * @returns {Promise} promise for the request in flight
     * @memberof AlexaListClient
     */
    getListItem(listId, itemId) {
        const options = this.__getRequestOptions('GET',
            `/v2/householdlists/${listId}/items/${itemId}`);

        return this.__handleRequest(options)
            .then((result) => {
                switch(result.statusCode) {
                    case 200:
                        return result.body;
                    case 403:
                        throw new Error('customer authorization token is not valid/expired');
                    case 404:
                        throw new Error('list was not found');
                    case 500:
                        throw new Error('Alexa encountered a server error');
                }
            });
    }

    /**
     * Helper method that makes request to the Alexa API
     * @param {Object} options https request options
     * @returns {Promise} the request in flight
     * @memberof AlexaListClient
     */
    __handleRequest(options) {
        return new Promise((resolve, reject) => {
            let request = https.request(options, (response) => {
                const responseChunks = [];

                response.on('data', (data) => {
                    responseChunks.push(data);
                });

                response.on('end', () => {
                    const responseBodyStr = responseChunks.join('');
                    let responseBody = null;
                    try {
                        responseBody = JSON.parse(responseBodyStr);
                    } catch(err) {
                        console.error('error parsing response body');
                        throw err;
                    }

                    const listResponse = {
                        statusCode: response.statusCode,
                        body: responseBody
                    };
                    resolve(listResponse);
                });
            }).on('error', (err) => {
                console.error(err);
                reject();
            }).end();
        });
    }

    /**
     * Helper method for retrieving request options
     * @param {string} method HTTP Verb to use`
     * @param {string} path the path that you want to hit against the API provided by the skill event.
     * @returns {{hostname: string, path: *, method: string, headers: {Authorization: string}}}
     * @private
     * @memberof AlexaListClient
     */
    __getRequestOptions(method, path) {
        return {
            hostname: this.endpoint,
            path: path,
            method: method,
            'headers': {
                'Authorization': 'Bearer ' + this.consentToken
            }
        };
    }
}

module.exports = AlexaListClient;