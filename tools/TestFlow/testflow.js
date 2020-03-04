// testflow - a multiple intent test script for Alexa Lambda code
// testflow reads your Intent sequence from a dialog sequence file, saved to the /dialogs folder
// Launch testflow from a Terminal Prompt.  Examples:
//
// node testflow
// node testflow mydialog.txt
const fs = require("fs");

const SourceCodeFile = './sampleskill/index.js';
const handlerName =  'handler'; //'lambda_handler'


let MyDialog = './dialogs/default.txt';

if (process.argv[2]) {
    MyDialog = './dialogs/' + process.argv[2];
}

// Toggle on or off various debugging outputs
const options = {
    delay        : 2.0,     // seconds between requests
    stdout       : true,    // standard output, show any errors or console.log() messages
    attributes   : true,   // true, false, or a string with the name of an attribute such as 'history' or 'favoriteColor'
    speechOutput : true,
    reprompt     : false,
    slots        : true,
    cards        : false,
    display      : true,
    userId       : '123',  // final 3 chars of test user Id, can be overridden
    timestamp    : ''      // defaults to now, can set via '2018-04-03T21:47:49Z'
    // , requestEvent : false,    // show the request JSON sent to your code
};

if (options.timestamp === '') {
    options.timestamp = new Date().toISOString();
}

let userId = options.userId;

const appId = 'amzn1.echo-sdk-ams.app.1234';  // set this to match your skill's alexa.appId to remove warnings
const locale = 'en-US';

let MyLambdaFunction;
let SourceLang = 'javascript';
if (SourceCodeFile.slice(-2).toLowerCase()  === 'py') {
    SourceLang = 'python';
} else {
    MyLambdaFunction = require(SourceCodeFile); // Your Lambda source with exports.handler
}


// console.log();
// console.log('================================================================================');
console.log('Running testflow on ' + SourceCodeFile + ' using dialog sequence file ', MyDialog);
console.log();

const OriginalConsoleLog = console.log;

let slotname = '';
let slotvalue = '';
let sa = {};
let current_line = 1;
let lineArray = [];
let Intent = '';
let prompt = false;
let newSession = true;
let userIdLast3 = options.userId;
let timeOffset = '0m'; // run test by adding a span, time formats like 3m, 3h, or 3d


let context = { // lambda functions may finish by calling context.succeed OR the callback function passed as the third argument
    'succeed': function (data) {
        // console.log('context.succeed:\n' + JSON.stringify(data,null, 2));

        if (data.response.shouldEndSession || typeof data.response.shouldEndSession === 'undefined') {
            sa = {};
        } else {
            sa = data.sessionAttributes;  // for next time
        }

        let textToSay = data.response.outputSpeech.ssml || data.response.outputSpeech.text;

        textToSay = textToSay.replace('<speak>', '    ');
        textToSay = textToSay.replace('</speak>', '');

        if (options.speechOutput) {
            console.log = OriginalConsoleLog;
            console.log('\x1b[36m%s\x1b[0m ', textToSay);
        }

        if (data.response.reprompt && data.response.reprompt.outputSpeech && data.response.reprompt.outputSpeech.ssml) {

            let textReprompt = data.response.reprompt.outputSpeech.ssml;
            textReprompt = textReprompt.replace('<speak>', '    ');
            textReprompt = textReprompt.replace('</speak>', '');

            if (options.reprompt) {
                console.log = OriginalConsoleLog;

                // console.log('%s \x1b[33m\x1b[1m%s\x1b[0m \x1b[2m%s\x1b[0m', currentLine+1, Intent, sdkState);

                console.log('\x1b[36m \x1b[2m%s\x1b[0m ', textReprompt);
            }
        }

        if (options.cards) {
            if (data.response.card) {
                let cardWidth = 20;
                let linePadding = 0;

                let cardTitle = data.response.card.title || '';
                let cardContent = data.response.card.content || data.response.card.text;
                if (!cardContent || cardContent =='' ) {
                    cardContent = ' ';
                }
                cardContentLines = cardContent.split('\n');

                 if (cardTitle.length > cardWidth) {
                    cardWidth = cardTitle.length;
                }
                for(let i = 0; i < cardContentLines.length; i++) {
                    if (cardContentLines[i].length > cardWidth) {
                        cardWidth = cardContentLines[i].length;
                    }
                }
                console.log();
                linePadding = (cardWidth < cardTitle.length ? 0 : cardWidth - cardTitle.length);
                console.log('\x1b[44m\x1b[4m\x1b[37m%s\x1b[0m\x1b[0m ', cardTitle + ' '.repeat(linePadding));

                for(let i = 0; i < cardContentLines.length; i++) {
                    linePadding = (cardWidth < cardContentLines[i].length ? 0 : cardWidth - cardContentLines[i].length);
                    console.log('\x1b[44m\x1b[37m%s\x1b[0m ', cardContentLines[i] + ' '.repeat(linePadding));
                }
                // console.log('      \x1b[44m\x1b[37m%s\x1b[0m ', cardContent);
            }

        }

        if (typeof options.attributes == 'boolean') {

            if (options.attributes) {
                console.log = OriginalConsoleLog;
                console.log('\x1b[35m%s\x1b[0m ', JSON.stringify(sa, null, 2)); // for formatted JSON
            }
        } else {  // you can define an attribute to display by setting options.attribute to a string, such as 'STATE'
            let printAttributeObject = {};
            console.log = OriginalConsoleLog;
            let printAttributeName = options.attributes.toString();
            let printAttribute = sa[printAttributeName];
            if (!printAttribute) {
                printAttribute = '';
            } else if (typeof printAttribute == 'object') {
                printAttributeObject = printAttribute;
            } else {
                printAttributeObject = JSON.parse('{"' + printAttributeName + '":"' + printAttribute + '"}');
            }
            console.log('\x1b[35m%s\x1b[0m ', JSON.stringify(printAttributeObject)); // , null, 2)); // for formatted JSON

        }


        if (data.response.shouldEndSession || typeof data.response.shouldEndSession === 'undefined') {
            console.log('================================================================');
            newSession = true; // for next time
        } else {
            console.log('----------------------------------------------------------------\n');
            newSession = false; // for next time
        }
        // =====================

        if (current_line < lineArray.length ) {


            // blocking pause
            let waitTill = new Date(new Date().getTime() + options.delay * 1000);
            while(waitTill > new Date()){}

            // console.log();

            runSingleTest(lineArray, current_line++, sa);

        } else {
            console.log();
            process.exit();

        }


    },
    'fail': function (err) {
        console.log('context.fail occurred');
        console.log(JSON.stringify(err, null,'\t') );
    }

};

fs.readFile(MyDialog, function (err, data) {  // open dialog sequence file and read Intents
    if (err) {
        console.log('error reading file: '+ MyDialog);
        process.exit(1);
    }
    let request = {};

    lineArray = cleanArray(data.toString().split('\n')); // remove empty or comment lines (# or //)

    runSingleTest(lineArray, 0, {});

});


function runSingleTest(myLineArray, currentLine, sa) {

    prompt = false;

    let tokenArray = myLineArray[currentLine].split(' ');


    if (tokenArray[0].replace('\r','') == '?') {  // pause and prompt the user to confirm
        prompt = true;
        // console.log(' ----------------- > prompt');
        tokenArray.shift();  // removes first item
    }

    if (tokenArray[0].replace('\r','') == 'end') {  // quit and skip remaining lines
        process.exit(1);
    }

    if (tokenArray[0].replace('\r','') == '~') { // gather user ID

        tokenArray.shift();  // removes first item
        userIdLast3 = tokenArray[0].replace('\r','');

        console.log('  \x1b[37m\x1b[2m%s\x1b[0m', '[userId set to *' + userIdLast3 + ']');

        myLineArray.shift();
        // currentLine = currentLine + 1;
        tokenArray = myLineArray[currentLine].split(' ');
        // runSingleTest(lineArray, current_line++, sa);
    }

    if (tokenArray[0].replace('\r','') == '@') { // gather time offset

        tokenArray.shift();  // removes first item
        timeOffset = tokenArray[0].replace('\r','');

        console.log('  \x1b[37m\x1b[2m%s\x1b[0m', '[timeOffset set to ' + timeOffset + ']');

        myLineArray.shift();

        tokenArray = myLineArray[currentLine].split(' ');

    }

    let requestType = tokenArray[0].replace('\r','');
    tokenArray.shift();

    if (requestType =='LaunchRequest') {
        newSession = true;
        let eventTime = addTime(new Date(options.timestamp), timeOffset);

        request =  {
            "type": requestType,
            "locale": locale,
            "requestId": "amzn1.echo-api.request.90e15a67-dd2d-4cf2-93bd-7a1234d0139f",
            "shouldLinkResultBeReturned": false,
            "timestamp":  eventTime // options.timestamp
        };

        // console.log(' ========== %s. Request  \x1b[31m\x1b[1m%s\x1b[0m', currentLine+1, requestType);

        console.log('%s \x1b[31m\x1b[1m%s\x1b[0m', currentLine+1, requestType); // print header for each test

        prepareTestRequest(sa, newSession, request);

    } else {

        Intent = requestType;
        slotArray = [];

        let sdkState = '';

        if(sa['STATE']){
            sdkState = sa['STATE'];
        }

        // console.log(' ========== %s. Intent  \x1b[33m\x1b[1m%s\x1b[0m', currentLine+1, Intent);
        console.log('%s \x1b[33m\x1b[1m%s\x1b[0m \x1b[2m%s\x1b[0m', currentLine+1, Intent, sdkState);


        processArray(tokenArray, function(request) {
            prepareTestRequest(sa, newSession, request);

        });


    }

}

slotArray = [];

function processArray(arr, cb) {  // process multiple slots as array
    const UTCnow = new Date().toISOString();

    if(arr.length > 0) {

        let equalsPosition = arr[0].indexOf('=');
        slotname = arr[0].substr(0, equalsPosition);
        slotvalue = decodeURI(arr[0].substr(equalsPosition+1, 300)).replace('\r','');

        promptForSlot(prompt, slotname, slotvalue, (newValue) => {

            // console.log('slotname, slotvalue, newValue');
            // console.log(slotname, slotvalue, newValue);

            let answer = newValue.toString().trim();

            // console.log('***** slot value is ' + answer);

            if(answer == '') {
                answer = slotvalue;
            }

            //if (answer != '') {

            let slotObj = buildSlotObj(slotname, answer);
            slotArray.push(slotObj);

            //}

            arr.shift();
            processArray(arr, cb);  // RECURSION

        });



    } else {  // nothing left in slot array


        let slotArrayString = '{' + slotArray.toString() + '}';

        let slotObj = JSON.parse(slotArrayString);
        let eventTime = addTime(new Date(options.timestamp), timeOffset);

        let req =  {
            "type": "IntentRequest",
            "timestamp": eventTime, // options.timestamp
            "requestId": "amzn1.echo-api.request.90e15a67-dd2d-4cf2-93bd-7a1234d0139f",
            "shouldLinkResultBeReturned": false,
            "intent": {
                "name": Intent,
                "slots" : slotObj
            },
            "locale": locale
        };

        cb(req);
        // process.exit();

    }

}

function prepareTestRequest(sa, newSession, request){

    let supportedInterfaces = {"AudioPlayer": {}};

    if (options.display) {
        supportedInterfaces.Display = {
            "templateVersion": "1.0",
            "markupVersion": "1.0"
        };

    }

    const eventJSON =
        {

            "context": {
                "AudioPlayer": {
                    "playerActivity": "IDLE"
                },
                "Display": {
                    "token": ""
                },
                "System": {
                    "application": {
                        "applicationId": "amzn1.ask.skill.50ef6df2-ffb8-4692-8e18-c9b485cc03b0"
                    },
                    "user": {
                        "userId": "amzn1.ask.account.AG4BEMGBJIJYRAGKP5YLYGJDISRIQVPWOEABD3OQW66MTPOF4JRHLAEETH5TBIOT652I3KUYZSWA5MAZ33GUTIBLEMUQ4YQBPKXVG4YSFHLQL27UEC6YQDXTEYH5MD4NMK4M7UJ4FWTRPKTSII4R733EX3TVC3UKLKOBMHXXM5CHOX2TDUV2WPF6NCWF5KLJETNGQ5YC7UID" + userIdLast3
                    },
                    "device": {
                        "deviceId": "amzn1.ask.device.AFUWNBZ2FSMDESJDWWA7GSZQBYX4DBS52RV7CHECNUTBCVMT6WW5SVO56SLUZ6D6TIJM5J2S6XNXKHAUU2RCXXQKUI75C37IOPVAA6HCVK5E5NV5EBVC5YUFAMIGD4FYZ4XFA4OEPDNCJYCHXN2RRGDQOZYQ",
                        "supportedInterfaces": supportedInterfaces
                    },
                    "apiEndpoint": "https://api.amazonalexa.com",
                    "apiAccessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpJRI6IjEifQ.eyJhdWQiOiJodHRwczovL2FwaS5hbWF6b25hbGV4YS5jb20iLCJpc3MiOiJBbGV4YVNraWxsS2l0Iiwic3ViIjoiYW16bjEuYXNrLnNraWxsLjUwZWY2ZGYyLWZmYjgtNDY5Mi04ZTE4LWM5YjQ4NWNjMDNiMCIsImV4cCI6MTUyMjcwOTI2OSwiaWF0IjoxNTIyNzA1NjY5LCJuYmYiOjE1MjI3MDU2NjksInByaXZhdGVDbGFpbXMiOnsiY29uc2VudFRva2VuIjpudWxsLCJkZXZpY2VJZCI6ImFtem4xLmFzay5kZXZpY2UuQUZVV05CWjJGU01ERlJKRFdXQTdHU1pRQllYNERCUzUyUlY3Q0hFQ05VVEJDVk1UNldXNVNWTzU2U0xVWjZENlRJSk01SjJTNlhOWEtIQVVVMlJDWFhRS1VJNzVDMzdJT1BWQUE2SENWSzVFNU5WNUVCVkM1WVVGQU1JR0Q0RllaNFhGQTRPRVBETkNKWUNIWE4yUlJHRFFPWllRIiwidXNlcklkIjoiYW16bjEuYXNrLmFjY291bnQuQUc0QkVNR0JKSUpZUkFHS1A1WUxZR0pESVNSSVFWUFdPRUFCRDNPUVc2Nk1UUE9GNEpSSExBRUVUSDVUQklPVDY1MkkzS1VZWlNXQTVNQVo1NUdVVElCTEVNVVE0WVFCUEtYVkc0WVNGSExRTDI3VUVDNllRRFhURVlINU1ENE5NSzRNN1VKNEZXVFJQS1RTSUk0UjczM0VYM1RWQzNVS0xLT0JNSFhYTTVDSE9YMlREVVYyV1BGNk5DV0Y1S0xKRVROR1E1WUM3RU9VREJBIn19.dPbWxnmKZb-KCCDIFayLc7JkuFI1LQGsmHPvHMHAX4dnAwO0PmjGejdl-rlTwjXcIIPIDPT5Y65dIIf0D63SgVIYe2LC0M5alW327UhT5FVjJu8TmtEbiPEoVwKYWqmMbGYi95Zyi5q9XFGRTq6u9idaDALZLT7LjBdY_DQLmks5fSeI819n1AGuxPecwCO29s0GRHg6JNrLVyCsovJIMB0_9yvz_KoOzwXOHp9YfkA9jtOkBWuEjXe1_DKq1HM5VfuAyiTrM1IYmfw9yoctVcH2xCfqL0QmmIYL9TCuh3mTd3yK5S-0NC-uFijeT-Qyg0o6hjmr2v0zfG0NgHQpQA"
                }
            },

            "session": {
                "sessionId": "SessionId.f9e6dcbb-b7da-4b47-905c.etc.etc",
                "application": {
                    "applicationId": appId
                },
                "attributes": sa,
                "user": {
                    "userId": "amzn1.ask.account.AG4BEMGBJIJYRAGKP5YLYGJDISRIQVPWOEABD3OQW66MTPOF4JRHLAEETH5TBIOT652I3KUYZSWA5MAZ33GUTIBLEMUQ4YQBPKXVG4YSFHLQL27UEC6YQDXTEYH5MD4NMK4M7UJ4FWTRPKTSII4R733EX3TVC3UKLKOBMHXXM5CHOX2TDUV2WPF6NCWF5KLJETNGQ5YC7UID" + userIdLast3
                },
                "new": newSession
            },
            request,
            "version": "1.0"
        };

    if (options.requestEvent) {
        console.log(JSON.stringify(request, null, 2));
    }

    // blocking pause
    let waitTill = new Date(new Date().getTime() + options.delay * 1000);
    while(waitTill > new Date()){}

    // console.log(JSON.stringify(eventJSON, null, 2));
    // console.log('***** request:\n'+ JSON.stringify(request, null, 2));

    // call the function
    if (SourceLang === 'javascript') {

        if (options.stdout) {

            MyLambdaFunction[handlerName] (eventJSON, context, callback);

        }  else {
            console.log = function() {};
            MyLambdaFunction[handlerName] (eventJSON, context, callback);
            console.log = OriginalConsoleLog;
        }

    } else {  // PYTHON

        let sourcePath = SourceCodeFile.substring(0, SourceCodeFile.lastIndexOf("/"));
        let sourceFileName = SourceCodeFile.substring(SourceCodeFile.lastIndexOf("/") + 1, SourceCodeFile.length - 3);

        // console.log('sourcePath ' + sourcePath);
        // console.log('sourceFileName ' + sourceFileName);
        // sys.path.insert(0, '/path/to/application/app/folder')

        let spawn = require("child_process").spawn;
        const pycodeArray = [
            'import json, sys',
            'sys.path.insert(0, \'' + sourcePath + '\')',
            'from ' + sourceFileName + ' import ' + handlerName ,
            'sys.stdout.write(\'{"stdout":"\')',
            'response = lambda_handler(json.loads(\'' + JSON.stringify(eventJSON) + '\'), "")',
            'sys.stdout.write(\'","body":\')',
            'sys.stdout.write(json.dumps(response))',
            'sys.stdout.write(\'}\')'
            //,'sys.stdout.flush()'
        ];

        let pyCommands = '';

        for (let i = 0; i < pycodeArray.length; i++) {
            pyCommands += pycodeArray[i] + '\n\n'
        }

        let pythonProcess = spawn('python',["-c", pyCommands]);

        pythonProcess.stdout.on('data', function (data){

            const responseraw = '' + data;

            const responseJSON = responseraw.replace(/\n/g, "\\n");

            const responseJSONobj = JSON.parse(responseJSON);
            const stdout = JSON.stringify(responseJSONobj.stdout, null, 2).replace(/\\n/g, "\n");
            const responseBody = responseJSONobj.body;
            if (options.stdout) {
                console.log(stdout.substr(1).slice(0, -1));
            }
            context.succeed(responseBody);

        });
    }
}

function promptForSlot(prompt, slotname, slotvalue, callback) {
// if line begins with "?" then prompt the user to enter a new slot value or accept default

    if (prompt) {
        process.stdout.write('  \x1b[34m' + slotname + ' \x1b[0m\x1b[32m [' + slotvalue + ']\x1b[0m: ');

        // console.log('\x1b[34m%s :\x1b[0m\x1b[32m %s\x1b[0m ', slotname,  slotvalue  );

        process.stdin.once('data', function (data) {
            let answer = data.toString().trim();

            // console.log(answer);

            if(answer == '') {
                if(slotvalue == '') {
                    // no default, user must type something
                    console.error('Error: No default slot value defined, user must type a slot value.');
                    process.exit();

                } else {
                    answer = slotvalue;
                }
            }

            callback(answer);
        });

    } else {
        if (options.slots) {
            console.log('  \x1b[34m%s :\x1b[0m\x1b[32m %s\x1b[0m ', slotname,  slotvalue  );
        }

        callback(slotvalue);
    }
}

function callback(error, data) {
    if(error) {
        console.log('error: ' + error);
    } else {
        context.succeed(data);
    }
};

function cleanArray(myArray) {
    let cleanedArray = [];

    for (let i = 0; i < myArray.length; i++ ) {
        if(myArray[i] != '' && myArray[i].substring(0,1) != '#'  && myArray[i].substring(0,2) != '//') {
            cleanedArray.push(myArray[i]);
        }
    }
    return cleanedArray;
}
function addTime(startDateTime, delta) {
    let timeOffsetMultiplier = 0;
    let timeUnit = delta.slice(-1).toUpperCase();
    let timeTicks = delta.slice(0, -1);

    if (timeUnit == 'M' || timeUnit == 'H' || timeUnit == 'D') {

        if (timeUnit == 'M') {
            timeOffsetMultiplier = 60 * 1000;
        }
        if (timeUnit == 'H') {
            timeOffsetMultiplier = 60 * 60 * 1000;
        }
        if (timeUnit == 'D') {
            timeOffsetMultiplier = 24 * 60 * 60 * 1000;
        }

    } else {
        console.log('invalid time offset.  An example format for 6 hours back is : -6H');
    }

    let d2 = new Date(startDateTime.getTime() + (timeOffsetMultiplier * timeTicks));

    return d2;
}

function buildSlotObj(slotname, val) {
    let obj = '';
    let slashPos = val.indexOf('/');

    let ERstatus = '';

    if (!val || val === '') { // empty slot value
        obj = '"' + slotname + '": {"name":"' + slotname + '"}';

    } else {
        let synonymList = '';

        if (slashPos <= 0) {
            // console.log('***** simple slot');
            ERstatus = 'SimpleSlot';
            obj = '"' + slotname + '": {"name":"' + slotname + '","value":"' + val + '"}';

        } else {
            // console.log('***** ER slot');
            let heardVal = val.substring(0, slashPos);
            let resolvedVal = val.substring(slashPos+1, 1000);

            if (resolvedVal === '') {
                ERstatus = 'ER_SUCCESS_NO_MATCH';


            } else {

                ERstatus = 'ER_SUCCESS_MATCH';
                let resolutionsSlashPos = resolvedVal.indexOf('/');
                if (resolutionsSlashPos <= 0) {

                    synonymList = '{"value":{"name":"' + resolvedVal + '"}}' ;

                } else {

                    let resolvedVals = resolvedVal.split('/');

                    for(let i = 0; i< resolvedVals.length; i++) {

                        synonymList += '{"value":{"name":"' + resolvedVals[i] + '"}},';
                    }

                    synonymList = synonymList.substring(0, synonymList.length - 1);


                }
            }


            let mockAuthority = "amzn1.er-authority.echo-sdk.amzn1.ask.skill.9eb191fc-6c02-4444-a38a-6e2da4f0000.MySlotType";

            let ERvalues = '';
            if (ERstatus == 'ER_SUCCESS_MATCH') {

                ERvalues = ', "values":[';

                ERvalues += synonymList;

                // ERvalues += '{"value":{"name":"' + resolvedVal + '"}}' ;

                ERvalues +=    ']';
            }

            let resolutions = '"resolutions":{"resolutionsPerAuthority":[{"authority":"' + mockAuthority + '","status":{"code":"' + ERstatus + '"}' + ERvalues + '}]}';

            // console.log('***** heardVal: ' + heardVal);
            // console.log('***** resolvedVal: ' + resolvedVal);

            obj = '"' + slotname + '": {"name":"' + slotname + '","value":"' + heardVal + '", ' + resolutions + ' }';

        }

    }

    // console.log('***** ERstatus: ' + ERstatus);

    return obj;

}
//
// const fontcolor = {
//     Reset = "\x1b[0m",
//     Bright = "\x1b[1m",
//     Dim = "\x1b[2m",
//     Underscore = "\x1b[4m",
//     Blink = "\x1b[5m",
//     Reverse = "\x1b[7m",
//     Hidden = "\x1b[8m",
//
//     FgBlack = "\x1b[30m",
//     FgRed = "\x1b[31m",
//     FgGreen = "\x1b[32m",
//     FgYellow = "\x1b[33m",
//     FgBlue = "\x1b[34m",
//     FgMagenta = "\x1b[35m",
//     FgCyan = "\x1b[36m",
//     FgWhite = "\x1b[37m",
//
//     BgBlack = "\x1b[40m",
//     BgRed = "\x1b[41m",
//     BgGreen = "\x1b[42m",
//     BgYellow = "\x1b[43m",
//     BgBlue = "\x1b[44m",
//     BgMagenta = "\x1b[45m",
//     BgCyan = "\x1b[46m",
//     BgWhite = "\x1b[47m"
// };