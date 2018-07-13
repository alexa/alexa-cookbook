const SIZE_OF_EVENTS = 10;
const DELIMITER_SIZE = 2;

class WikiEventsParseClient {
  static parseEventsFromWiki(responseString) {
    const events = [];
    const string = responseString.substring(responseString.indexOf('\\nEvents\\n') + SIZE_OF_EVENTS, responseString.indexOf('\\n\\n\\nBirths'));
    let startIndex = 0;
    let endIndex = 0;
    while (endIndex !== -1) {
      endIndex = string.indexOf('\\n', startIndex + DELIMITER_SIZE);
      const eventText = (endIndex === -1 ? string.substring(startIndex) :
        string.substring(startIndex, endIndex));
      const newString = `In ${eventText.replace('\\u2013', '').replace(/^(\d+)/g, '$&,')}`;
      events.push(newString);
      startIndex = endIndex + DELIMITER_SIZE;
    }
    return events.reverse();
  }
}

module.exports = WikiEventsParseClient;
