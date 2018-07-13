const https = require('https');
const WikiEventsParseClient = require('./WikiEventsParseClient');

const hostname = 'en.wikipedia.org';
const PATH_PREFIX = '/w/api.php?action=query&prop=extracts&format=json&explaintext=&exsectionformat=plain&redirects=&titles=';

class WikiRequestClient {
  constructor(wikiEventsParseClient) {
    this.wikiEventsParseClient = wikiEventsParseClient || WikiEventsParseClient;
  }

  getEventsFromWiki(month, date) {
    const requestOptions = this.__getRequestOptions(month, date);
    return new Promise((resolve, reject) => {
      const wikiRequest = https.request(requestOptions, (response) => {
        const chunks = [];
        response.on('data', (chunk) => {
          chunks.push(chunk);
        });
        response.on('end', () => {
          const responseString = chunks.join('');
          resolve(this.wikiEventsParseClient.parseEventsFromWiki(responseString));
        });
      });
      wikiRequest.on('error', (err) => {
        reject(err);
      });
      wikiRequest.end();
    });
  }

  __getRequestOptions(month, date) {
    return {
      hostname: hostname,
      path: PATH_PREFIX + month + '_' + date,
      method: 'GET',
    };
  }
}

module.exports = WikiRequestClient;
