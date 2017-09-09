// Minimized client.recordings.list function
// This works beautifully as well

const config = require('./twilio-config.js')
const accountSid = config.accountSid
const authToken = config.authToken

const client = require('twilio')(accountSid, authToken);
var arr =[];

module.exports = {
    "getRecordings": function(callback){
        client.recordings.list().then(function(data) {
          data.forEach(function(recording) {
              var uri = "https://api.twilio.com" + recording.uri.replace('json','mp3');
              arr.push({title:"title",url:uri});
          });
            callback(arr);
          });
      }
    }
