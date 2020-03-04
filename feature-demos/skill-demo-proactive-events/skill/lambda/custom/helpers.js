
const constants = require('./constants.js');
const helpers = require('./helpers.js');
const path = require("path");
const fs = require('fs');


module.exports = {

    'getNextEvent': function(dataFile){
        let now = new Date();
        const resolvedFile = path.resolve(__dirname, dataFile);
        const scheduleFile = fs.readFileSync(resolvedFile, function (err, data) {
            if (err) { console.log('error reading file: ' + dataFile + '\n' + err); }
        });

        scheduleArray = scheduleFile.toString().split(`\n`);
        let nextMediaEvent = 0;
        let timeUntil = 0;

        // iterate through the schedule to find the next future event
        for(let i=0; i<scheduleArray.length; i++) {
            let lineData = scheduleArray[i].split(',');
            let eventDate = new Date(Date.parse(lineData[0]));
            timeUntil = module.exports.timeDelta(now, eventDate);

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

    },
    'randomArrayElement': function(myArray) {
        return(myArray[Math.floor(Math.random() * myArray.length)]);
    },
    'capitalize': function(myString) {
        return myString.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
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
        return arr.sort();
        // return arr.sort(function(a,b) {return (a.value > b.value) ? -1 : ((b.value > a.value) ? 1 : 0);} );
    },

};

// another way to define helpers: extend a native type with a new function
Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

