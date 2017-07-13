// TODO: reprompts, Quiz handler, HELP

var Alexa = require('alexa-sdk');

const options = {
    QUESTIONS_PER_QUIZ: 5,
    TITLE: 'College'
};

var languageStrings = {
    'en-US': {
        'translation': {
            'TITLE'  : "College",
            'WELCOME_LAUNCH':"Welcome to %s Flash Cards. For each card, I will say the name of a U.S. college or university, and you tell me which state the college is in.  You can say practice to practice all the cards, or say quiz to take a quiz. say Practice or Quiz",
            'WELCOME_PRACTICE': "Okay, Let\'s practice.  I will ask you all %s questions!  Answer by saying the name of a U.S. State. Are you ready to start?",
            'WELCOME_QUIZ': "Okay, I will ask you %s questions! Answer by saying the name of a U.S. State. Ready to start the quiz?",
            'HELP_MESSAGE': "I will ask you a series of questions. You can say practice to have me read all %s of the questions, or take a quiz of just %s questions. "
        }
    },
    // 'de-DE': {
    //     'translation' : {
    //         'TITLE'   : "Universität",
    //         'WELCOME_PRACTICE' : "",
    //         'WELCOME_QUIZ': ""
    //     }
    // }
};

const questionList = [
    { question:"Brown",       answer:["Rhode Island","Providence"]   },
    { question:"Drexel",      answer:["Pennsylvania","Philadelphia"] },
    { question:"Duke",        answer:["North Carolina","Durham"]     },
    { question:"Gonzaga",     answer:["Washington","Spokane"]        },
    { question:"Holy Cross",  answer:["Massachusetts","Worcester"]   },
    { question:"Villanova",   answer:["Pennsylvania","Villanova"]    },
    { question:"Hampton",     answer:["Virginia","Hampton"]          },
    { question:"Emory",       answer:["Georgia","Atlanta"]           },
    { question:"Columbia",    answer:["New York"]                    },
    { question:"Smith",       answer:["Massachusetts","Northampton"] },
    // { question:"Navy",        answer:["Maryland","Annapolis"]        },
    // { question:"Army",        answer:["New York","West Point"]       },
    // { question:"Bucknell",    answer:["Pennsylvania","Lewisburg"]    },
    // { question:"Marquette",   answer:["Wisconsin","Milwaukee"]       },
    // { question:"Rice",        answer:["Texas","Houston"]             },
    // { question:"Vanderbilt",  answer:["Tennessee","Nashville"]       },
    // { question:"Baylor",      answer:["Texas","Waco"]                },
    // { question:"Butler",      answer:["Indiana","Indianapolis"]      },
    // { question:"Northwestern",answer:["Illinois","Chicago"]          },
    // { question:"Syracuse",    answer:["New York","Syracuse"]         }

];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);

    alexa.resources = languageStrings;

    // alexa.appId = 'amzn1.echo-sdk-ams.app.1234';
    ///alexa.dynamoDBTableName = 'YourTableName'; // creates new table for session.attributes

    alexa.registerHandlers(
          newSessionHandlers
        , startSessionHandlers

        , practiceHandlers
        , quizHandlers

        , recapPracticeHandlers
        , recapQuizHandlers

        , scoreHandlers

    );
    alexa.execute();
};


var states = {
    START:           "_START",

    PRACTICE:        "_PRACTICE",
    PRACTICE_START:  "_PRACTICE_START",

    QUIZ:            "_QUIZ",
    QUIZ_START:      "_QUIZ_START",

    RECAP_PRACTICE:  "_RECAP_PRACTICE",
    RECAP_QUIZ:      "_RECAP_QUIZ",
};

var newSessionHandlers = {
    'NewSession': function() {
        this.handler.state = states.START;
        this.emitWithState('NewSession');
    }
};

var startSessionHandlers = Alexa.CreateStateHandler(states.START, {
    'NewSession': function() {

        this.attributes['questionList'] = questionList;
        this.attributes['correctCount'] = 0;
        this.attributes['wrongCount'] = 0;
        this.attributes['wrongList'] = [];
        this.emit(':ask', this.t("WELCOME_LAUNCH", this.t("TITLE") ));

    },
    "PracticeIntent": function() {
        this.handler.state = states.PRACTICE_START;
        this.emit(':ask', this.t("WELCOME_PRACTICE", questionList.length));
    },
    "QuizIntent": function() {
        this.handler.state = states.QUIZ_START;
        this.emit(':ask', this.t("WELCOME_QUIZ", options.QUESTIONS_PER_QUIZ ));
    },
    "AMAZON.HelpIntent": function() {
        this.emit(':ask', this.t("HELP_MESSAGE", questionList.length, options.QUESTIONS_PER_QUIZ));
    },
    "AMAZON.CancelIntent": function() {
        this.emit(':tell', "Goodbye!");
    },
    "AMAZON.StopIntent": function() {
        this.emit(':tell', "Goodbye!");
    },
    'Unhandled': function() {  // if we get any intents other than the above
        this.emit(':ask', 'Sorry, I didn\'t get that. You can say practice to Practice all the cards, or say Quiz to take a quiz.', 'Try again');
    }

});

var practiceStartHandlers = Alexa.CreateStateHandler(states.PRACTICE_START, {
     
    'AMAZON.YesIntent': function() {  // Yes, I want to start the practice
        this.handler.state = states.PRACTICE;

        var say = '';

        this.attributes['currentQuestionIndex'] = 0;

        if (this.attributes['wrongList'].length > 0) {  // we have taken the practice already and need to repeat
            this.attributes['sessionQuestionList'] = randomizeArray(this.attributes['wrongList']);  // only practice those answered wrong
            this.attributes['wrongList'] = [];
            this.attributes['wrongCount'] = 0;
            this.attributes['correctCount'] = 0;
        } else {
            this.attributes['sessionQuestionList'] = randomizeArray(this.attributes['questionList']);
        }
        say = 'First question of ' + this.attributes['sessionQuestionList'].length + ', '
        say += 'Where was ' + this.attributes['sessionQuestionList'][0].question + ' born?';

        this.emit(':ask',  say, say);
    },

    'AMAZON.NoIntent': function () { 
        this.handler.state = states.START;
        var say = 'Okay, see you next time, goodbye!';
        this.emit(':tell', say);
    },
    "AMAZON.CancelIntent": function() {
        this.handler.state = states.START;
        this.emit(':tell', "Goodbye!");
    },
    'AMAZON.StopIntent': function () {
        this.handler.state = states.START;
        this.emit(':tell', 'Goodbye' );
    },
    'AMAZON.HelpIntent': function () {  // practice help

        this.emit(':ask', 'You can say Yes to practice all the flash cards or No to start over' );
    },
    'Unhandled': function() {
        this.emit(':ask', 'Sorry, I didn\'t get that. Try again.', 'Try again.');
    }
});

var quizStartHandlers = Alexa.CreateStateHandler(states.QUIZ_START, {
     
    'AMAZON.YesIntent': function () {
        this.handler.state = states.QUIZ;
        var say = '';

        this.attributes['currentQuestionIndex'] = 0;

        this.attributes['wrongCount'] = 0;
        this.attributes['correctCount'] = 0;

        this.attributes['sessionQuestionList'] = randomizeArray(this.attributes['questionList'], options.QUESTIONS_PER_QUIZ);

        say = 'where was ' + this.attributes['sessionQuestionList'][0].question + ' born?';

        this.emit(':ask', 'First question, ' + say);

    },
    'AMAZON.NoIntent': function() {
        this.handler.state = states.START;
        this.emit(':tell', 'Okay, see you next time, goodbye!');
    },
    "AMAZON.CancelIntent": function() {
        this.handler.state = states.START;
        this.emit(':tell', "Goodbye!");
    },
    'AMAZON.StopIntent': function () {
        this.handler.state = states.START;
        this.emit(':tell', 'Goodbye' );
    },
    'AMAZON.HelpIntent': function () {  // quiz help

        this.emit(':ask', 'You can say Yes to practice all the flash cards or No to start over' );
    },
    'Unhandled': function() {
        this.emit(':ask', 'Sorry, I didn\'t get that. Try again.', 'Try again.');
    }
});

var practiceHandlers = Alexa.CreateStateHandler(states.PRACTICE, {
    'NewSession': function () {
        this.emit('NewSession'); // Uses the handler in newSessionHandlers
    },
    'AMAZON.YesIntent': function() {  // Yes, I want to start the practice

        var say = '';

        this.attributes['currentQuestionIndex'] = 0;

        if (this.attributes['wrongList'].length > 0) {  // we have taken the practice already and need to repeat
            this.attributes['sessionQuestionList'] = randomizeArray(this.attributes['wrongList']);  // only practice those answered wrong
            this.attributes['wrongList'] = [];
            this.attributes['wrongCount'] = 0;
            this.attributes['correctCount'] = 0;
        } else {
            this.attributes['sessionQuestionList'] = randomizeArray(this.attributes['questionList']);
        }
        say = 'First question of ' + this.attributes['sessionQuestionList'].length + ', '
        say += 'Where is ' + this.attributes['sessionQuestionList'][0].question + '?';

        this.emit(':ask',  say, say);
    },

    'AnswerIntent': function() {
        var myState = '';

        if ( !this.event.request.intent.slots.usstate || this.event.request.intent.slots.usstate.value == '') {
            this.emitWithState('AMAZON.HelpIntent');  // emitWithState = local version of this handler

        } else {
            myState = this.event.request.intent.slots.usstate.value;

            this.emit('rateAnswer', myState, (say) => {

                var currentQuestionIndex = this.attributes['currentQuestionIndex'];

                if (currentQuestionIndex < this.attributes['sessionQuestionList'].length) {  // MORE QUESTIONS

                    say = say +  ' Next question, where is ' + this.attributes['sessionQuestionList'][currentQuestionIndex].question + '? ';

                    this.emit(':ask', say);

                } else {   // YOU ARE DONE

                    this.handler.state = states.RECAP_PRACTICE;
                    this.emitWithState('RecapSession', say);
                }

            });
        }

    },

    'AMAZON.StopIntent': function () {

        this.emit(':tell', 'Goodbye' );
    },
    'AMAZON.HelpIntent': function () {  // practice help

        this.emit(':ask', 'please say the name of a U.S. State, such as Florida.' );
    },

    'Unhandled': function() {  // if we get any intents other than the above
        this.emit(':ask', 'Sorry, I didn\'t get that.', 'Try again');
    }
});


var quizHandlers = Alexa.CreateStateHandler(states.QUIZ, {
    'NewSession': function () {
        this.emit('NewSession'); // Uses the handler in newSessionHandlers
    },
    'AMAZON.YesIntent': function () {

        var say = '';

        this.attributes['currentQuestionIndex'] = 0;

        this.attributes['wrongCount'] = 0;
        this.attributes['correctCount'] = 0;

        this.attributes['sessionQuestionList'] = randomizeArray(this.attributes['questionList'], options.QUESTIONS_PER_QUIZ);

        say = 'where is ' + this.attributes['sessionQuestionList'][0].question + '?';

        this.emit(':ask', 'First question, ' + say);

    },
    'AnswerIntent': function() {
        var myState = '';

        if ( !this.event.request.intent.slots.usstate || this.event.request.intent.slots.usstate.value == '') {
            this.emitWithState('AMAZON.HelpIntent');  // emitWithState = local version of this handler

        } else {
            myState = this.event.request.intent.slots.usstate.value;

            this.emit('rateAnswer', myState, (say) => {
                var currentQuestionIndex = this.attributes['currentQuestionIndex'];

                if (currentQuestionIndex < this.attributes['sessionQuestionList'].length) {  // MORE QUESTIONS

                    say = say +  ' Next question, where is ' + this.attributes['sessionQuestionList'][currentQuestionIndex].question + '? ';

                    this.emit(':ask', say);

                } else {   // YOU ARE DONE

                    this.handler.state = states.RECAP_QUIZ;

                    this.emitWithState('RecapSession', say);
                }

            });
        }
    },
    'AMAZON.NoIntent': function() {
        this.emit(':tell', 'Okay, see you next time, goodbye!');
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', 'Okay, see you next time, goodbye!');
    },
    'Unhandled': function() {
        this.emit(':ask', 'Sorry, I didn\'t get that. Try again.', 'Try again.');
    }
});

var recapPracticeHandlers = Alexa.CreateStateHandler(states.RECAP_PRACTICE, {
    'NewSession': function () {
        this.emit('NewSession'); // Uses the handler in newSessionHandlers
    },
    'RecapSession': function (say) {  // append final results to previous answer result

        say = say + ' You are done. You got '
            + this.attributes['correctCount']
            + ' right out of '
            + this.attributes['sessionQuestionList'].length + '. ';

        if (this.attributes['wrongCount'] == 0) {
            say += ' Great job!  You can say stop if you are done. Would you like to try the Quiz now? ';
            this.emit(':ask', say);

        } else {
            say = say   +  ' I have sent the '
                        + pluralize('question', this.attributes['wrongCount'])
                        + ' you got wrong to the Alexa app on your phone. ';
            say += ' Would you like to practice this list again now? ';

            var cardText = '';
            var wrongList = this.attributes['wrongList'];
            for (var i = 0; i < wrongList.length; i++) {
                cardText += '\n\nQuestion : ' + wrongList[i].question;
                cardText += '\nAnswer   : ' + wrongList[i].answer[0];  // show the first acceptable answer
            }

            this.emit(':askWithCard', say, 'You can say yes to practice, or say no to quit.', 'Flash Cards to Practice', cardText);
        }

    },
    'AMAZON.YesIntent': function () {
        if (this.attributes['wrongCount'] == 0) {
            this.handler.state = states.QUIZ;
            this.emitWithState('AMAZON.YesIntent');

        } else {
            this.handler.state = states.PRACTICE;
            this.emitWithState('AMAZON.YesIntent');
        }

    },
    'AMAZON.NoIntent': function () {  //
        var say = 'Okay, see you next time, goodbye!';
        this.emit(':tell', say);
    },
    'Unhandled': function() {
        this.emit(':ask', 'Sorry, I didn\'t get that. Try again.', 'Try again.');
    }
});

var recapQuizHandlers = Alexa.CreateStateHandler(states.RECAP_QUIZ, {
    // 'NewSession': function () {
    //     this.emit('NewSession'); // Uses the handler in newSessionHandlers
    // },
    'RecapSession': function (say) {  // append final results to previous answer result
        var scoreSummary = '';
        scoreSummary += 'You got '
            + this.attributes['correctCount']
            + ' right out of '
            + this.attributes['sessionQuestionList'].length
            + ', for a score of '
            +  Math.floor((100.0 *  this.attributes['correctCount'] / this.attributes['sessionQuestionList'].length)).toString()
            + ' % . ';

        say =  say + ' You are done. '
            + scoreSummary.replace('\n','')
            + ' I have sent this result to the Alexa App on your phone. ';


        if (this.attributes['wrongCount'] == 0) {
            say += ' Great job!  You can say stop if you are done. Would you like to start over? ';
        } else {
            say += ' Would you like to practice some more now? ';
        }
        this.emit(':askWithCard',
            say,
            'Say yes to practice, or say no to quit.',
            options.TITLE +  ' Flash Cards - Quiz Result',
            scoreSummary);
    },

    'AMAZON.YesIntent': function () {
        if (this.attributes['wrongCount'] == 0) {

            this.handler.state = states.START;
            this.emitWithState('NewSession');

        } else {
            this.handler.state = states.PRACTICE;
            this.emitWithState('AMAZON.YesIntent');
        }

    },
    'AMAZON.NoIntent': function () {  //
        var say = 'Okay, see you next time, goodbye!';
        this.emit(':tell', say);
    },
    'Unhandled': function() {
        this.emit(':ask', 'Sorry, I didn\'t get that. Try again.', 'Try again.');
    }
});


var scoreHandlers = {
    'rateAnswer': function (stateGuess, callback) {

        var currentQuestionIndex = this.attributes['currentQuestionIndex'];
        var currentQuestion = this.attributes['sessionQuestionList'][currentQuestionIndex];
        if (currentQuestion.answer.indexOf(stateGuess) >= 0 ) {
            this.attributes['correctCount'] += 1;

            say =  stateGuess + ' is right! ';

        } else {

            this.attributes['wrongCount'] += 1;

            var wrongList = this.attributes['wrongList'];
            wrongList.push(currentQuestion);
            this.attributes['wrongList'] = wrongList;

            say =  stateGuess + ' is wrong! '
                + currentQuestion.question
                + ' is in '
                + currentQuestion.answer[0] + '. ';

        }
        currentQuestionIndex += 1;
        this.attributes['currentQuestionIndex'] = currentQuestionIndex;

        callback(say);
    },


};

function randomizeArray(myArray, recordCount) { // Fisher-Yates shuffle
    var sliceLimit = myArray.length;
    if (recordCount) {
        sliceLimit = recordCount;
    }
    var m = myArray.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = myArray[m];
        myArray[m] = myArray[i];
        myArray[i] = t;
    }

    return myArray.slice(0, sliceLimit);

}
function pluralize(word, qty) {
    var newWord = '';
    if (qty == 1) {
        newWord = word;
    } else {
        newWord = word + 's';
    }
    return qty.toString() + ' ' + newWord;
}
