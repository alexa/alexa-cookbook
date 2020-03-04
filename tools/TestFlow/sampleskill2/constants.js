/**
 * Created by mccaul on 5/11/18.
 */

let AWS = require('aws-sdk');
AWS.config.region = process.env.AWS_REGION || 'us-east-1';

const DYNAMODB_TABLE = process.env.DYNAMODB_TABLE || 'askMemorySkillTable';
// console.log('DYNAMODB_TABLE ' + DYNAMODB_TABLE);

module.exports = {
        'AWS': AWS,
        'DYNAMODB_TABLE': DYNAMODB_TABLE,

        'getMemoryAttributes': function() {
            const memoryAttributes = {

            "history":[],

            "launchCount":0,
            "lastUseTimestamp":0,
            "joinRank": 1,
            "skillUserCount": 1,
            "bookmark":0,
            "factHistory":[],
            "favoriteColor":"",
            // "mobileNumber":"",

            "speakingSpeed":"medium"

            // "name":"",
            // "namePronounce":"",
            // "email":"",
            // "mobileNumber":"",
            // "city":"",
            // "state":"",
            // "postcode":"",
            // "birthday":"",
            // "wishlist":[],
        };

        return memoryAttributes;
    },
    'getWelcomeCardImg': function() {
        return {
            smallImageUrl: "https://s3.amazonaws.com/skill-images-789/cards/card_plane720_480.png",
            largeImageUrl: "https://s3.amazonaws.com/skill-images-789/cards/card_plane1200_800.png"
        };
    },
    'getDisplayImg1': function() {
        return {
            title: 'Jet Plane',
            url: 'https://s3.amazonaws.com/skill-images-789/display/plane340_340.png'
        };
    },
    'getDisplayImg2': function() {
        return  {
                    title: 'Starry Sky',
                    url: 'https://s3.amazonaws.com/skill-images-789/display/background1024_600.png'

        };
    },



    'getFacts' : function() {
            return [ // include at least 5 facts
                "Chameleon tongues can be as long as 28 inches.",
                "It is estimated that over 100 billion people have lived on the earth so far.",
                "The temperature on Venus is at least 462 degrees Celsius, which is about 864 degrees Fahrenheit.",
                "The world's fastest land animal is Sarah, a cheetah that ran 100 meters in 5.95 seconds.",
                "The quietest natural place on earth is in Washington State's Olympic National Park, within the Hoh Rainforest.",
                "A liger is a hybrid offspring of a male lion and a female tiger.",
                "Boston's Fenway Park has been the home of the Red Sox baseball team since 1912."
            ];

    } ,

    'getMaxHistorySize': function() {  // number of intent/request events to store
        return 3;
    },

    'getDontRepeatLastN': function() {
            return 3;
    },
    'getEmoji': function(emojiName) {

        const emoji = {
            'thumbsup': '\uD83D\uDC4D',
            'smile': '\uD83D\uDE0A',
            'star': '\uD83C\uDF1F',
            'robot': '\uD83E\uDD16',
            'germany': '\ud83c\udde9\ud83c\uddea',
            'uk': '\ud83c\uddec\ud83c\udde7',
            'usa': '\ud83c\uddfa\ud83c\uddf8'
            // Escaped Unicode for other emoji:  https://github.com/wooorm/gemoji/blob/master/support.md

        };

        if (emojiName in emoji) {
            return emoji[emojiName];
        } else {
            return 'NotFound';
        }
    }

};

