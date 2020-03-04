
const constants = require('./constants.js');
const AWS = constants.AWS;
const DYNAMODB_TABLE = constants.DYNAMODB_TABLE;
const model = require('./model.json'); // a static copy of your model, used to suggest custom slot values

module.exports = {

    'randomArrayElement': function(myArray) {
        return(myArray[Math.floor(Math.random() * myArray.length)]);

    },

    'capitalize': function(myString) {
        return myString.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });

    },

    'supportsDisplay': function(handlerInput) // returns true if the skill is running on a device with a display (Echo Show, Echo Spot, etc.)
    {                                      //  Enable your skill for display as shown here: https://alexa.design/enabledisplay
        const hasDisplay =
            handlerInput.requestEnvelope.context &&
            handlerInput.requestEnvelope.context.System &&
            handlerInput.requestEnvelope.context.System.device &&
            handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
            handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display;

        return hasDisplay;
    },

    'timeDelta': function(t1, t2) {

        const dt1 = new Date(t1);
        const dt2 = new Date(t2);
        const timeSpanMS = dt2.getTime() - dt1.getTime();
        const span = {
            "timeSpanMIN": Math.floor(timeSpanMS / (1000 * 60 )),
            "timeSpanHR": Math.floor(timeSpanMS / (1000 * 60 * 60)),
            "timeSpanDAY": Math.floor(timeSpanMS / (1000 * 60 * 60 * 24)),
            "timeSpanDesc" : ""
        };

        if (span.timeSpanHR < 2) {
            span.timeSpanDesc = span.timeSpanMIN + " minutes";
        } else if (span.timeSpanDAY < 2) {
            span.timeSpanDesc = span.timeSpanHR + " hours";
        } else {
            span.timeSpanDesc = span.timeSpanDAY + " days";
        }

        return span;

    },
    'sayArray': function(myData, penultimateWord = 'and') {
        // the first argument is an array [] of items
        // the second argument is the list penultimate word; and/or/nor etc.  Default to 'and'
        let result = '';

        myData.forEach(function(element, index, arr) {

            if (index === 0) {
                result = element;
            } else if (index === myData.length - 1) {
                result += ` ${penultimateWord} ${element}`;
            } else {
                result += `, ${element}`;
            }
        });
        return result;
    },
    'stripTags': function(str) {
        return str.replace(/<\/?[^>]+(>|$)/g, "");
    },

    'getSampleUtterance': function(intent) {

        return randomElement(intent.samples);
    },


    'getSlotValues': function(filledSlots) {
        const slotValues = {};

        Object.keys(filledSlots).forEach((item) => {
            const name  = filledSlots[item].name;

            if (filledSlots[item] &&
                filledSlots[item].resolutions &&
                filledSlots[item].resolutions.resolutionsPerAuthority[0] &&
                filledSlots[item].resolutions.resolutionsPerAuthority[0].status &&
                filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
                switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
                    case 'ER_SUCCESS_MATCH':

                        let resolutions = [];
                        let vals = filledSlots[item].resolutions.resolutionsPerAuthority[0].values;
                        for (let i = 0; i < vals.length; i++) {
                            resolutions.push(vals[i].value.name);
                        }
                        slotValues[name] = {
                            heardAs: filledSlots[item].value,

                            resolved: filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name,
                            resolutions: resolutions,

                            ERstatus: 'ER_SUCCESS_MATCH'
                        };
                        break;
                    case 'ER_SUCCESS_NO_MATCH':
                        slotValues[name] = {
                            heardAs: filledSlots[item].value,
                            resolved: '',
                            ERstatus: 'ER_SUCCESS_NO_MATCH'
                        };
                        break;
                    default:
                        break;
                }
            } else {
                slotValues[name] = {
                    heardAs: filledSlots[item].value,
                    resolved: '',
                    ERstatus: ''
                };
            }
        }, this);

        return slotValues;
    },

    'getExampleSlotValues': function(intentName, slotName) {

        let examples = [];
        let slotType = '';
        let slotValuesFull = [];

        let intents = model.interactionModel.languageModel.intents;
        for (let i = 0; i < intents.length; i++) {
            if (intents[i].name == intentName) {
                let slots = intents[i].slots;
                for (let j = 0; j < slots.length; j++) {
                    if (slots[j].name === slotName) {
                        slotType = slots[j].type;

                    }
                }
            }

        }
        let types = model.interactionModel.languageModel.types;
        for (let i = 0; i < types.length; i++) {
            if (types[i].name === slotType) {
                slotValuesFull = types[i].values;
            }
        }

        slotValuesFull =  module.exports.shuffleArray(slotValuesFull);

        examples.push(slotValuesFull[0].name.value);
        examples.push(slotValuesFull[1].name.value);
        if (slotValuesFull.length > 2) {
            examples.push(slotValuesFull[2].name.value);
        }


        return examples;
    },

    'getRecordCount': function(callback) {

        const params = {
            TableName: DYNAMODB_TABLE
        };

        let docClient = new AWS.DynamoDB.DocumentClient();

        docClient.scan(params, (err, data) => {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));

            } else {
                const skillUserCount = data.Items.length;

                callback(skillUserCount);
            }
        });

    },

    'changeProsody' : function(attribute, current, change) {
        let newValue = '';
        if (attribute === 'rate') {
            switch(current + '.' + change) {
                case 'x-slow.slower':
                case 'slow.slower':
                    newValue = 'x-slow';
                    break;
                case 'medium.slower':
                case 'x-slow.faster':
                    newValue = 'slow';
                    break;
                case 'fast.slower':
                case 'slow.faster':
                    newValue = 'medium';
                    break;
                case 'x-fast.slower':
                case 'medium.faster':
                    newValue = 'fast';
                    break;
                case 'x-fast.faster':
                case 'fast.faster':
                    newValue = 'x-fast';
                    break;
                default:
                    newValue = 'medium';

            }
        }

        return newValue;
    },


    'sendTxtMessage': function(params, locale, callback) {

        let mobileNumber = params.PhoneNumber.toString();

        if (locale === 'en-US') {
            if (mobileNumber.length < 10 ){
                const errMsg = 'mobileNumber provided is too short: ' + mobileNumber + '. ';
                callback(errMsg);
            }
            if (mobileNumber.length == 10 ) {
                mobileNumber = '1' + mobileNumber;
            }
        } else {
            if (locale === 'other locales tbd') {
                // add validation and format code
            }
        }

        if (mobileNumber.substring(0,1) !== '+') {
            mobileNumber = '+' + mobileNumber;
        }

        let snsParams = params;
        snsParams.PhoneNumber = mobileNumber;

        const SNS = new AWS.SNS();

        SNS.publish(snsParams, function(err, data){

            // console.log('sending message to ' + mobileNumber );

            if (err) console.log(err, err.stack);

            callback('I sent you a text message. ');

        });
    },


    'generatePassPhrase': function() {
        // 'correct', 'horse', 'battery', 'staple'
        const word1 = ['nice', 'good', 'clear', 'kind', 'red', 'green', 'orange', 'yellow', 'brown', 'careful',
            'powerful', 'vast', 'happy', 'deep', 'warm', 'cold', 'heavy', 'dry', 'quiet', 'sweet',
            'short', 'long', 'late', 'early', 'quick', 'fast', 'slow', 'other','public','clean','proud',
            'flat','round', 'loud', 'funny', 'free', 'tall', 'short', 'big', 'small'];

        const word2 = ['person', 'day', 'car', 'tree', 'fish', 'wheel', 'chair', 'sun', 'moon', 'star',
            'story', 'voice', 'job', 'fact', 'record', 'computer', 'ocean', 'building', 'cat', 'dog', 'rabbit',
            'carrot', 'orange', 'bread', 'soup', 'spoon', 'fork', 'straw', 'napkin', 'fold', 'pillow', 'radio',
            'towel', 'pencil', 'table', 'mark', 'teacher', 'student', 'developer', 'raisin', 'pizza', 'movie',
            'book', 'cup', 'plate', 'wall', 'door', 'window', 'shoes', 'hat', 'shirt', 'bag', 'page', 'clock',
            'glass', 'button', 'bump', 'paint', 'song', 'story', 'memory', 'school', 'corner', 'wire', 'cable'
        ];
        const numLimit = 999;

        const phraseObject = {
            'word1': randomArrayElement(word1),
            'word2': randomArrayElement(word2),
            'number': Math.floor(Math.random() * numLimit)
        };
        return phraseObject;
    },
    'shuffleArray': function(array) {  // Fisher Yates shuffle!

        let currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    },


    'incrementArray': function(arr, element) {

        for(let i = 0; i < arr.length; i++) {
            if (arr[i].name === element) {
                arr[i].value += 1;
                return arr;
            }
        }
        // no match, create new element
        arr.push({'name':element, 'value': 1});

        return arr;

    },
    'sortArray': function(arr) {
        return arr.sort(function(a,b) {return (a.value > b.value) ? -1 : ((b.value > a.value) ? 1 : 0);} );
    },

    'rankArray': function(arr) {  // assumes sorted array
        let rank = 0;
        let previousValue = 0;
        let tiesAll = {};
        let ties = [];

        for(let i = 0; i < arr.length; i++) {

            if (arr[i].value !== previousValue) {
                rank += 1;
                ties = [];
            }
            ties.push(arr[i].name);

            arr[i].rank = rank;

            arr[i].ties = ties;

            previousValue = arr[i].value;

        }

        // list other elements tied at the same rank
        for(let i = 0; i < arr.length; i++) {

            let tiesCleaned = [];
            for (let j = 0; j < arr[i].ties.length; j++) {
                if (arr[i].ties[j] !== arr[i].name) {
                    tiesCleaned.push(arr[i].ties[j]);
                }
            }

            arr[i].ties = tiesCleaned;

        }

        return arr;
    }


};

// another way to define helpers: extend a native type with a new function
Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

