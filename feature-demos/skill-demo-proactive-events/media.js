// Alexa Proactive API sample script

const https = require('https');
const fs = require('fs');

const mode = 'dev'; // or 'prod'

const clientID = `amzn1.application-oa2-client.72677....`;

const clientSecret = `39ea4....`;

const nextEvent = getNextEvent('./skill/lambda/custom/schedule.txt');

if(nextEvent.daysTillEvent === 1 || true) { // adjust as needed

    notify(nextEvent.mediaEventName, nextEvent.mediaEventTime, nextEvent.mediaEventProvider );  // Multicast

}

async function notify(mediaEventName, mediaEventTime, mediaEventProvider) {
    const token = await getToken();
    const status = await sendEvent(token,  mediaEventName, mediaEventTime, mediaEventProvider);

    console.log(`Sent notification for ${mediaEventName} at ${mediaEventTime} on ${mediaEventProvider}`);

    return status;
}

function getProactiveOptions(token, postLength){

    return {
        hostname: 'api.amazonalexa.com',  // api.eu.amazonalexa.com (Europe) api.fe.amazonalexa.com (Far East)
        port: 443,
        path: '/v1/proactiveEvents/' + (mode && mode === 'prod' ? '' : 'stages/development'),  // mode: global var
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': postLength,
            'Authorization' : 'Bearer ' + token
        }
    };
}


function getMediaEvent(mediaEventName, mediaEventTime, mediaEventProvider) {

    let timestamp = new Date();
    let expiryTime = new Date();
    let startTime = new Date(mediaEventTime);

    expiryTime.setMinutes(expiryTime.getHours() + 24);

    let referenceId = "SampleReferenceId" + new Date().getTime();  // cross reference to records in your existing systems

    const eventJson = {
        "timestamp": timestamp.toISOString(),
        "referenceId": referenceId,
        "expiryTime": expiryTime.toISOString(),
        "event": {
            "name": "AMAZON.MediaContent.Available",
            "payload": {
                "availability": {
                    "startTime" : startTime.toISOString(),
                    "provider": {
                        "name": "localizedattribute:providerName"
                    },
                    "method": "STREAM"
                },
                "content": {
                    "name": "localizedattribute:contentName",
                    "contentType": "GAME"
                }
            },
        },
        "localizedAttributes": [
            {
                "locale": "en-US",
                "providerName": mediaEventProvider,
                "contentName": mediaEventName
            },
            {
                "locale": "en-GB",
                "providerName": mediaEventProvider,
                "contentName": mediaEventName
            }
        ],
        "relevantAudience": {
            "type": "Multicast",
            "payload": {}
        }
    };
    // console.log(JSON.stringify(eventJson, null, 2));
    return eventJson;

}


// ----------------------------------------------------------------------------

function getTokenOptions(postLength){
    // const TokenPostData = getTokenPostData();
    return {
        hostname: 'api.amazon.com',
        port: 443,
        path: '/auth/O2/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postLength // TokenPostData.length
        }
    }
}
function getTokenPostData() {

    return 'grant_type=client_credentials&client_id=' + clientID + '&client_secret=' + clientSecret + '&scope=alexa::proactive_events';
}

function getToken() {
    return new Promise(resolve => {
        const TokenPostData = getTokenPostData();
        const req = https.request(getTokenOptions(TokenPostData.length), (res) => {
            res.setEncoding('utf8');
            let returnData = '';

            res.on('data', (chunk) => { returnData += chunk; });

            res.on('end', () => {
                const tokenRequestId = res.headers['x-amzn-requestid'];
                // console.log(`Token requestId: ${tokenRequestId}`);
                resolve(JSON.parse(returnData).access_token);
            });
        });
        req.write(TokenPostData);
        req.end();

    });
}

// ----------------------------------------------------------------------------

function sendEvent(token, mediaEventName, mediaEventTime, mediaEventProvider) {
    return new Promise(resolve => {

        // const ProactivePostData = JSON.stringify(getProactivePostData(eventType, userId, message));
        const ProactivePostData = JSON.stringify(getMediaEvent(mediaEventName, mediaEventTime, mediaEventProvider));

        // console.log(`\nProactivePostData\n${JSON.stringify(JSON.parse(ProactivePostData), null, 2)}\n-----------`);

        const ProactiveOptions = getProactiveOptions(token, ProactivePostData.length);
        // console.log(`ProactiveOptions\n${JSON.stringify(ProactiveOptions, null, 2)}`);

        const req = https.request(ProactiveOptions, (res) => {
            res.setEncoding('utf8');

            if ([200, 202].includes(res.statusCode)) {
                // console.log('successfully sent event');
                // console.log(`requestId: ${res.headers['x-amzn-requestid']}`);

            } else {

                console.log(`Error https response: ${res.statusCode}`);
                console.log(`requestId: ${res.headers['x-amzn-requestid']}`);

                if ([403].includes(res.statusCode)) {
                    resolve(`error ${res.statusCode}`);
                }
            }

            let returnData;
            res.on('data', (chunk) => { returnData += chunk; });


            res.on('end', () => {
                const requestId = res.headers['x-amzn-requestid'];
                // console.log(`requestId: ${requestId}`);
                //console.log(`return headers: ${JSON.stringify(res.headers, null, 2)}`);
                resolve(`sent event ${mediaEventName}`);
            });
        });
        req.write(ProactivePostData);
        req.end();

    });

}

function getNextEvent(dataFile) {

    let now = new Date();
    const scheduleFile = fs.readFileSync(dataFile, function (err, data) {
        if (err) { console.log('error reading file: ' + dataFile + '\n' + err); }
    });

    scheduleArray = scheduleFile.toString().split(`\n`);
    let nextMediaEvent = 0;
    let timeUntil = 0;

// iterate through the schedule to find the next future event
    for(let i=0; i<scheduleArray.length; i++) {
        let lineData = scheduleArray[i].split(',');
        let eventDate = new Date(Date.parse(lineData[0]));
        timeUntil = timeDelta(now, eventDate);
        if(timeUntil.timeSpanMIN > 0 ) {
            nextMediaEvent = i;
            i = scheduleArray.length; // break
        }
    }
    const daysTillEvent = Math.floor(timeUntil/24);

    const mediaEvent = scheduleArray[nextMediaEvent].split(',');
    const mediaEventTime = mediaEvent[0];
    const mediaEventName = mediaEvent[1].replace(/['"]+/g, '');
    const mediaEventProvider = mediaEvent[2].replace(/['"]+/g, '');

    return {
        "mediaEventName":mediaEventName,
        "mediaEventTime":mediaEventTime,
        "mediaEventProvider":mediaEventProvider,
        "daysTillEvent": daysTillEvent
    }

}
function timeDelta(t1, t2) {

    const dt1 = new Date(t1);
    const dt2 = new Date(t2);
    const timeSpanMS = dt2.getTime() - dt1.getTime();
    const span = {
        "timeSpanMIN": Math.floor(timeSpanMS / (1000 * 60 )),
        "timeSpanHR": Math.floor(timeSpanMS / (1000 * 60 * 60)),
        "timeSpanDAY": Math.floor(timeSpanMS / (1000 * 60 * 60 * 24)),
        "timeSpanDesc" : ""
    };

    return span;

}