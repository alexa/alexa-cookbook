// alexa-cookbook sample code

// There are three sections, Text Strings, Skill Code, and Helper Function(s).
// You can copy and paste the entire file contents as the code for a new Lambda function,
//  or copy & paste section #3, the helper function, to the bottom of your existing Lambda code.


// 1. Text strings =====================================================================================================
//    Modify these strings and messages to change the behavior of your Lambda function

const speechOutput = "aha, this is a phrase with speechcons, well done.";  // Array of items

// 2. Skill Code =======================================================================================================


const Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    // alexa.appId = 'amzn1.echo-sdk-ams.app.1234';
    // alexa.dynamoDBTableName = 'YourTableName'; // creates new table for session.attributes
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    'LaunchRequest': function () {
        //add SSML tags to any speechcons in the string
        speechOutput = addSpeehconSSML(speechOutput);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'Unhandled': function () {
        this.emit('LaunchRequest');
    }
};

//    END of Intent Handlers {} ========================================================================================
// 3. Helper Function  =================================================================================================


function addSpeehconSSML (text) {
    //if the text contains a speechcon, add the proper SMML around the speechcon
    speechcons.forEach(function(element){
      var elementWithSSML=',<say-as interpret-as="interjection">'+element+'</say-as>,';
      text = text.replace(element,elementWithSSML);
    });
    console.log(text);
    return text;
}

//list of valid speechcons
const speechcons = ["abracadabra","achoo","aha","ahem","ahoy","all righty","aloha",
"aooga","argh","arrivederci","as you wish","au revoir","aw man","baa",
"bada bing bada boom","bah humbug","bam","bang","batter up","bazinga",
"beep beep","bingo","blah","blarg","blast","boing","bon appetit","bonjour",
"bon voyage","boo","boo hoo","boom","booya","bravo","bummer","caw","cha ching",
"checkmate","cheerio","cheers","cheer up","chirp","choo choo","clank",
"click clack","cock a doodle doo","coo","cowabunga","darn","ding dong","ditto",
"d’oh","dot dot dot","duh","dum","dun dun dun","dynomite","eek","eep",
"encore","en gard","eureka","fancy that","geronimo","giddy up","good grief",
"good luck","good riddance","gotcha","great scott","heads up","hear hear",
"hip hip hooray","hiss","honk","howdy","hurrah","hurray","huzzah","jeepers creepers",
"jiminy cricket","jinx","just kidding","kaboom","kablam","kaching","kapow",
"katchow","kazaam","kerbam","kerboom","kerching","kerchoo","kerflop",
"kerplop","kerplunk","kerpow","kersplat","kerthump","knock knock","le sigh",
"look out","mamma mia","man overboard","mazel tov","meow","merci","moo",
"nanu nanu","neener neener","no way","now now","oh boy","oh brother","oh dear",
"oh my","oh snap","oink","okey dokey","oof","ooh la la","open sesame","ouch",
"oy","phew","phooey","ping","plop","poof","pop","pow","quack","read ‘em and weep",
"ribbit","righto","roger","ruh roh","shucks","splash","spoiler alert","squee",
"swish","swoosh","ta da","ta ta","tee hee","there there","thump","tick tick tick",
"tick-tock","touche","tsk tsk","tweet","uh huh","uh oh","voila","vroom",
"wahoo","wah wah","watch out","way to go","well done","well well","wham",
"whammo","whee","whew","woof","whoops a daisy","whoosh","woo hoo","wow",
"wowza","wowzer","yadda yadda yadda","yay","yikes","yippee","yoink","yoo hoo",
"you bet","yowza","yowzer","yuck","yum","zap","zing","zoinks",];
