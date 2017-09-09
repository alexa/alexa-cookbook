'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this:  var APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
const APP_ID = undefined;

//This function returns a descriptive sentence about your data.  Before a user starts a quiz, they can ask about a specific data element,
//like "Ohio."  The skill will speak the sentence from this function, pulling the data values from the appropriate record in your data.
function getSpeechDescription(item)
{
    var sentence = item.StateName + " is the " + item.StatehoodOrder + "th state, admitted to the Union in " + item.StatehoodYear + ".  The capital of " + item.StateName + " is " + item.Capital + ", and the abbreviation for " + item.StateName + " is <break strength='strong'/><say-as interpret-as='spell-out'>" + item.Abbreviation + "</say-as>.  I've added " + item.StateName + " to your Alexa app.  Which other state or capital would you like to know about?";
    return sentence;
}

//We have provided two ways to create your quiz questions.  The default way is to phrase all of your questions like: "What is X of Y?"
//If this approach doesn't work for your data, take a look at the commented code in this function.  You can write a different question
//structure for each property of your data.
function getQuestion(counter, property, item)
{
    return "Here is your " + counter + "th question.  What is the " + formatCasing(property) + " of "  + item.StateName + "?";

    /*
    switch(property)
    {
        case "City":
            return "Here is your " + counter + "th question.  In what city do the " + item.League + "'s "  + item.Mascot + " play?";
        break;
        case "Sport":
            return "Here is your " + counter + "th question.  What sport do the " + item.City + " " + item.Mascot + " play?";
        break;
        case "HeadCoach":
            return "Here is your " + counter + "th question.  Who is the head coach of the " + item.City + " " + item.Mascot + "?";
        break;
        default:
            return "Here is your " + counter + "th question.  What is the " + formatCasing(property) + " of the "  + item.Mascot + "?";
        break;
    }
    */
}

//This is the function that returns an answer to your user during the quiz.  Much like the "getQuestion" function above, you can use a
//switch() statement to create different responses for each property in your data.  For example, when this quiz has an answer that includes
//a state abbreviation, we add some SSML to make sure that Alexa spells that abbreviation out (instead of trying to pronounce it.)
function getAnswer(property, item)
{
    switch(property)
    {
        case "Abbreviation":
            return "The " + formatCasing(property) + " of " + item.StateName + " is <say-as interpret-as='spell-out'>" + item[property] + "</say-as>. ";
        break;
        default:
            return "The " + formatCasing(property) + " of " + item.StateName + " is " + item[property] + ". ";
        break;
    }
}

//This is a list of positive speechcons that this skill will use when a user gets a correct answer.  For a full list of supported
//speechcons, go here: https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference
const speechConsCorrect = ["Booya", "All righty", "Bam", "Bazinga", "Bingo", "Boom", "Bravo", "Cha Ching", "Cheers", "Dynomite",
"Hip hip hooray", "Hurrah", "Hurray", "Huzzah", "Oh dear.  Just kidding.  Hurray", "Kaboom", "Kaching", "Oh snap", "Phew",
"Righto", "Way to go", "Well done", "Whee", "Woo hoo", "Yay", "Wowza", "Yowsa"];

//This is a list of negative speechcons that this skill will use when a user gets an incorrect answer.  For a full list of supported
//speechcons, go here: https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference
const speechConsWrong = ["Argh", "Aw man", "Blarg", "Blast", "Boo", "Bummer", "Darn", "D'oh", "Dun dun dun", "Eek", "Honk", "Le sigh",
"Mamma mia", "Oh boy", "Oh dear", "Oof", "Ouch", "Ruh roh", "Shucks", "Uh oh", "Wah wah", "Whoops a daisy", "Yikes"];

//This is the welcome message for when a user starts the skill without a specific intent.
const WELCOME_MESSAGE = "Welcome to the United States Quiz Game!  You can ask me about any of the fifty states and their capitals, or you can ask me to start a quiz.  What would you like to do?";

//This is the message a user will hear when they start a quiz.
const START_QUIZ_MESSAGE = "OK.  I will ask you 10 questions about the United States.";

//This is the message a user will hear when they try to cancel or stop the skill, or when they finish a quiz.
const EXIT_SKILL_MESSAGE = "Thank you for playing the United States Quiz Game!  Let's play again soon!";

//This is the message a user will hear after they ask (and hear) about a specific data element.
const REPROMPT_SPEECH = "Which other state or capital would you like to know about?";

//This is the message a user will hear when they ask Alexa for help in your skill.
const HELP_MESSAGE = "I know lots of things about the United States.  You can ask me about a state or a capital, and I'll tell you what I know.  You can also test your knowledge by asking me to start a quiz.  What would you like to do?";


//This is the response a user will receive when they ask about something we weren't expecting.  For example, say "pizza" to your
//skill when it starts.  This is the response you will receive.
function getBadAnswer(item) { return "I'm sorry. " + item + " is not something I know very much about in this skill. " + HELP_MESSAGE; }

//This is the message a user will receive after each question of a quiz.  It reminds them of their current score.
function getCurrentScore(score, counter) { return "Your current score is " + score + " out of " + counter + ". "; }

//This is the message a user will receive after they complete a quiz.  It tells them their final score.
function getFinalScore(score, counter) { return "Your final score is " + score + " out of " + counter + ". "; }

//These next four values are for the Alexa cards that are created when a user asks about one of the data elements.
//This only happens outside of a quiz.

//If you don't want to use cards in your skill, set the USE_IMAGES_FLAG to false.  If you set it to true, you will need an image for each
//item in your data.
const USE_IMAGES_FLAG = true;

//This is what your card title will be.  For our example, we use the name of the state the user requested.
function getCardTitle(item) { return item.StateName;}

//This is the small version of the card image.  We use our data as the naming convention for our images so that we can dynamically
//generate the URL to the image.  The small image should be 720x400 in dimension.
function getSmallImage(item) { return "https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/state_flag/720x400/" + item.Abbreviation + "._TTH_.png"; }

//This is the large version of the card image.  It should be 1200x800 pixels in dimension.
function getLargeImage(item) { return "https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/state_flag/1200x800/" + item.Abbreviation + "._TTH_.png"; }

// backgroundImage for Echo Show body templates
function getBackgroundImage(item) { return "https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/state_flag/1024x600/" + item.Abbreviation + "._TTH_.png"; }

//=========================================================================================================================================
//TODO: Replace this data with your own.
//=========================================================================================================================================
const data = [
                {StateName: "Alabama",        Abbreviation: "AL", Capital: "Montgomery",     StatehoodYear: 1819, StatehoodOrder: 22 },
                {StateName: "Alaska",         Abbreviation: "AK", Capital: "Juneau",         StatehoodYear: 1959, StatehoodOrder: 49 },
                {StateName: "Arizona",        Abbreviation: "AZ", Capital: "Phoenix",        StatehoodYear: 1912, StatehoodOrder: 48 },
                {StateName: "Arkansas",       Abbreviation: "AR", Capital: "Little Rock",    StatehoodYear: 1836, StatehoodOrder: 25 },
                {StateName: "California",     Abbreviation: "CA", Capital: "Sacramento",     StatehoodYear: 1850, StatehoodOrder: 31 },
                {StateName: "Colorado",       Abbreviation: "CO", Capital: "Denver",         StatehoodYear: 1876, StatehoodOrder: 38 },
                {StateName: "Connecticut",    Abbreviation: "CT", Capital: "Hartford",       StatehoodYear: 1788, StatehoodOrder: 5 },
                {StateName: "Delaware",       Abbreviation: "DE", Capital: "Dover",          StatehoodYear: 1787, StatehoodOrder: 1 },
                {StateName: "Florida",        Abbreviation: "FL", Capital: "Tallahassee",    StatehoodYear: 1845, StatehoodOrder: 27 },
                {StateName: "Georgia",        Abbreviation: "GA", Capital: "Atlanta",        StatehoodYear: 1788, StatehoodOrder: 4 },
                {StateName: "Hawaii",         Abbreviation: "HI", Capital: "Honolulu",       StatehoodYear: 1959, StatehoodOrder: 50 },
                {StateName: "Idaho",          Abbreviation: "ID", Capital: "Boise",          StatehoodYear: 1890, StatehoodOrder: 43 },
                {StateName: "Illinois",       Abbreviation: "IL", Capital: "Springfield",    StatehoodYear: 1818, StatehoodOrder: 21 },
                {StateName: "Indiana",        Abbreviation: "IN", Capital: "Indianapolis",   StatehoodYear: 1816, StatehoodOrder: 19 },
                {StateName: "Iowa",           Abbreviation: "IA", Capital: "Des Moines",     StatehoodYear: 1846, StatehoodOrder: 29 },
                {StateName: "Kansas",         Abbreviation: "KS", Capital: "Topeka",         StatehoodYear: 1861, StatehoodOrder: 34 },
                {StateName: "Kentucky",       Abbreviation: "KY", Capital: "Frankfort",      StatehoodYear: 1792, StatehoodOrder: 15 },
                {StateName: "Louisiana",      Abbreviation: "LA", Capital: "Baton Rouge",    StatehoodYear: 1812, StatehoodOrder: 18 },
                {StateName: "Maine",          Abbreviation: "ME", Capital: "Augusta",        StatehoodYear: 1820, StatehoodOrder: 23 },
                {StateName: "Maryland",       Abbreviation: "MD", Capital: "Annapolis",      StatehoodYear: 1788, StatehoodOrder: 7 },
                {StateName: "Massachusetts",  Abbreviation: "MA", Capital: "Boston",         StatehoodYear: 1788, StatehoodOrder: 6 },
                {StateName: "Michigan",       Abbreviation: "MI", Capital: "Lansing",        StatehoodYear: 1837, StatehoodOrder: 26 },
                {StateName: "Minnesota",      Abbreviation: "MN", Capital: "St. Paul",       StatehoodYear: 1858, StatehoodOrder: 32 },
                {StateName: "Mississippi",    Abbreviation: "MS", Capital: "Jackson",        StatehoodYear: 1817, StatehoodOrder: 20 },
                {StateName: "Missouri",       Abbreviation: "MO", Capital: "Jefferson City", StatehoodYear: 1821, StatehoodOrder: 24 },
                {StateName: "Montana",        Abbreviation: "MT", Capital: "Helena",         StatehoodYear: 1889, StatehoodOrder: 41 },
                {StateName: "Nebraska",       Abbreviation: "NE", Capital: "Lincoln",        StatehoodYear: 1867, StatehoodOrder: 37 },
                {StateName: "Nevada",         Abbreviation: "NV", Capital: "Carson City",    StatehoodYear: 1864, StatehoodOrder: 36 },
                {StateName: "New Hampshire",  Abbreviation: "NH", Capital: "Concord",        StatehoodYear: 1788, StatehoodOrder: 9 },
                {StateName: "New Jersey",     Abbreviation: "NJ", Capital: "Trenton",        StatehoodYear: 1787, StatehoodOrder: 3 },
                {StateName: "New Mexico",     Abbreviation: "NM", Capital: "Santa Fe",       StatehoodYear: 1912, StatehoodOrder: 47 },
                {StateName: "New York",       Abbreviation: "NY", Capital: "Albany",         StatehoodYear: 1788, StatehoodOrder: 11 },
                {StateName: "North Carolina", Abbreviation: "NC", Capital: "Raleigh",        StatehoodYear: 1789, StatehoodOrder: 12 },
                {StateName: "North Dakota",   Abbreviation: "ND", Capital: "Bismarck",       StatehoodYear: 1889, StatehoodOrder: 39 },
                {StateName: "Ohio",           Abbreviation: "OH", Capital: "Columbus",       StatehoodYear: 1803, StatehoodOrder: 17 },
                {StateName: "Oklahoma",       Abbreviation: "OK", Capital: "Oklahoma City",  StatehoodYear: 1907, StatehoodOrder: 46 },
                {StateName: "Oregon",         Abbreviation: "OR", Capital: "Salem",          StatehoodYear: 1859, StatehoodOrder: 33 },
                {StateName: "Pennsylvania",   Abbreviation: "PA", Capital: "Harrisburg",     StatehoodYear: 1787, StatehoodOrder: 2 },
                {StateName: "Rhode Island",   Abbreviation: "RI", Capital: "Providence",     StatehoodYear: 1790, StatehoodOrder: 13 },
                {StateName: "South Carolina", Abbreviation: "SC", Capital: "Columbia",       StatehoodYear: 1788, StatehoodOrder: 8 },
                {StateName: "South Dakota",   Abbreviation: "SD", Capital: "Pierre",         StatehoodYear: 1889, StatehoodOrder: 40 },
                {StateName: "Tennessee",      Abbreviation: "TN", Capital: "Nashville",      StatehoodYear: 1796, StatehoodOrder: 16 },
                {StateName: "Texas",          Abbreviation: "TX", Capital: "Austin",         StatehoodYear: 1845, StatehoodOrder: 28 },
                {StateName: "Utah",           Abbreviation: "UT", Capital: "Salt Lake City", StatehoodYear: 1896, StatehoodOrder: 45 },
                {StateName: "Vermont",        Abbreviation: "VT", Capital: "Montpelier",     StatehoodYear: 1791, StatehoodOrder: 14 },
                {StateName: "Virginia",       Abbreviation: "VA", Capital: "Richmond",       StatehoodYear: 1788, StatehoodOrder: 10 },
                {StateName: "Washington",     Abbreviation: "WA", Capital: "Olympia",        StatehoodYear: 1889, StatehoodOrder: 42 },
                {StateName: "West Virginia",  Abbreviation: "WV", Capital: "Charleston",     StatehoodYear: 1863, StatehoodOrder: 35 },
                {StateName: "Wisconsin",      Abbreviation: "WI", Capital: "Madison",        StatehoodYear: 1848, StatehoodOrder: 30 },
                {StateName: "Wyoming",        Abbreviation: "WY", Capital: "Cheyenne",       StatehoodYear: 1890, StatehoodOrder: 44 }
            ];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

var counter = 0;

const states = {
    START: "_START",
    QUIZ: "_QUIZ"
};

const handlers = {
     "LaunchRequest": function() {
        this.handler.state = states.START;
        this.emitWithState("Start");
     },
    "QuizIntent": function() {
        this.handler.state = states.QUIZ;
        this.emitWithState("Quiz");
    },
    "AnswerIntent": function() {
        this.handler.state = states.START;
        this.emitWithState("AnswerIntent");
    },
    "AMAZON.HelpIntent": function() {
        this.response.speak(HELP_MESSAGE).listen(HELP_MESSAGE);
        this.emit(":responseReady");
    },
    "Unhandled": function() {
        this.handler.state = states.START;
        this.emitWithState("Start");
    },
    "AMAZON.PreviousIntent": function() {
        this.handler.state = states.START;
        this.emitWithState("Start");
    },
    "AMAZON.NextIntent": function() {
        this.handler.state = states.START;
        this.emitWithState("Start");
    }
};

const startHandlers = Alexa.CreateStateHandler(states.START,{
    "Start": function() {
        this.response.speak(WELCOME_MESSAGE).listen(HELP_MESSAGE);
        this.emit(":responseReady");
    },
    "AnswerIntent": function() {
       console.log("Answer Intent event: "+JSON.stringify(this.event));
        var item = getItem(this.event.request.intent.slots);

        if (item && item[Object.getOwnPropertyNames(data[0])[0]] !== undefined) {
            if (supportsDisplay.call(this)||isSimulator.call(this)) {
              //this device supports a display

              let content = {
                    "hasDisplaySpeechOutput" : getSpeechDescription(item),
                    "hasDisplayRepromptText" : REPROMPT_SPEECH,
                    "noDisplaySpeechOutput" : getSpeechDescription(item),
                    "noDisplayRepromptText" : REPROMPT_SPEECH,
                    "simpleCardTitle" : getCardTitle(item),
                    "simpleCardContent" : getTextDescription(item),
                    "bodyTemplateTitle" : getCardTitle(item),
                    "bodyTemplateContent" : getTextDescription(item),
                    "templateToken" : "ItemDetailsView",
                    "askOrTell": ":ask",
                    "sessionAttributes" : this.attributes
                };
                if (USE_IMAGES_FLAG) {
                  content["imageSmallUrl"]=getSmallImage(item);
                  content["imageLargeUrl"]=getLargeImage(item);
                }
                renderTemplate.call(this,content);



            } else {
              //this device does not support a display
              if (USE_IMAGES_FLAG) {
                //we have images so produce a card
                var imageObj = {smallImageUrl: getSmallImage(item), largeImageUrl: getLargeImage(item)};
                this.response.cardRenderer(getCardTitle(item), getTextDescription(item), imageObj);
              }
              this.response.speak(getSpeechDescription(item)).listen(REPROMPT_SPEECH);
              this.emit(":responseReady");
            }

        } else {
            this.response.speak(getBadAnswer(item)).listen(getBadAnswer(item));
            this.emit(":responseReady");
        }
    },
    "QuizIntent": function() {
        this.handler.state = states.QUIZ;
        this.attributes['STATE'] = this.handler.state;
        console.log("IN QUIZ INTENT " + this.handler.state);
        console.log("IN QUIZ INTENT " + JSON.stringify(this.attributes));
        this.emitWithState("Quiz");
    },
    "AMAZON.StopIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(':responseReady');
    },
    "AMAZON.CancelIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(':responseReady');
    },
    "AMAZON.HelpIntent": function() {
        this.response.speak(HELP_MESSAGE).listen(HELP_MESSAGE);
        this.emit(":responseReady");
    },
    "Unhandled": function() {
        this.response.speak(HELP_MESSAGE).listen(HELP_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.PreviousIntent": function() {
        this.response.speak(HELP_MESSAGE).listen(HELP_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.NextIntent": function() {
        this.response.speak(HELP_MESSAGE).listen(HELP_MESSAGE);
        this.emit(":responseReady");
    }
});


const quizHandlers = Alexa.CreateStateHandler(states.QUIZ,{
    "Quiz": function() {
        this.attributes["response"] = "";
        this.attributes["counter"] = 0;
        this.attributes["quizscore"] = 0;
        this.emitWithState("AskQuestion");
    },
    "AskQuestion": function() {
        console.log("in askQuestion: "+JSON.stringify(this.attributes));
        if (this.attributes["counter"] == 0)
        {
            this.attributes["response"] = START_QUIZ_MESSAGE + " ";
        }

        var random = getRandom(0, data.length-1);
        var item = data[random];

        var propertyArray = Object.getOwnPropertyNames(item);
        var property = propertyArray[getRandom(1, propertyArray.length-1)];

        // store correct answers in session attributes
        this.attributes["quizitem"] = item;
        this.attributes["quizproperty"] = property;
        this.attributes["counter"]++;

        // Create list of possible answers to display on Echo Show (3 wrong, 1 right).

        var answerList = [];
        answerList.push(item[property]);
        for (var i = 0; i < 2; i++) {
          var randomItem = data[getRandom(0, data.length-1)];
          answerList.push(randomItem[property]);
          //TODO could push same the same item more than once
        }
        //console.log("answerList: "+JSON.stringify(answerList));

        var question = getQuestion(this.attributes["counter"], property, item);
        var speech = this.attributes["response"] + question;


        if (USE_IMAGES_FLAG) {

        //TODO if (this.event.context.System.device.supportedInterfaces.Display) {
              var shuffledMultipleChoiceList = shuffle(answerList);

              let listItems = shuffledMultipleChoiceList.map((x) => {
                return { "token" : x,
                  "textContent" : {
                    "primaryText":
                    {
                      "text": x,
                      "type": "PlainText"
                    }
                  }
                }
              })



              let content = {
                    "hasDisplaySpeechOutput" : speech,
                    "hasDisplayRepromptText" : question,
                    "noDisplaySpeechOutput" : speech,
                    "noDisplayRepromptText" : question,
                    "simpleCardTitle" : getCardTitle(item),
                    "simpleCardContent" : getTextDescription(item),
                    "listTemplateTitle" : this.attributes["quizscore"]+" / "+this.attributes["counter"]+": "+getCardTitle(item),
                    //"listTemplateContent" : getTextDescription(item),
                    "templateToken" : "MultipleChoiceListView",
                    "askOrTell": ":ask",
                    "listItems" : listItems,
                    "hint" : "Add a hint here",
                    "sessionAttributes" : this.attributes
                };

                if (USE_IMAGES_FLAG) {
                  content["backgroundImageLargeUrl"]=getBackgroundImage(item);
                }
                console.log("ASK Question event: "+JSON.stringify(this.event));

                renderTemplate.call(this,content);



        } else {
            this.response.speak(speech).listen(question);
            this.emit(":responseReady");
        }

    },
    "ElementSelected" : function() {
      // We will look for the value in this.event.request.token in the AnswerIntent call to compareSlots
      console.log("in ElementSelected QUIZ state");
      this.emitWithState("AnswerIntent");
    },
    "AnswerIntent": function() {
        var response = "";
        var item = this.attributes["quizitem"];
        var property = this.attributes["quizproperty"];

        var correct = compareSlots.call(this, item[property]);

        if (correct)
        {
            response = getSpeechCon(true);
            this.attributes["quizscore"]++;
        }
        else
        {
            response = getSpeechCon(false);
        }

        response += getAnswer(property, item);

        if (this.attributes["counter"] < 10)
        {
            response += getCurrentScore(this.attributes["quizscore"], this.attributes["counter"]);
            this.attributes["response"] = response;
            this.emitWithState("AskQuestion");
        }
        else
        {
          response += getFinalScore(this.attributes["quizscore"], this.attributes["counter"]);
          if (supportsDisplay.call(this)||isSimulator.call(this)) {
            //this device supports a display

            let content = {
                  "hasDisplaySpeechOutput" : response + " " + EXIT_SKILL_MESSAGE,
                  "bodyTemplateContent" : getFinalScore(this.attributes["quizscore"], this.attributes["counter"]),
                  "templateToken" : "FinalScoreView",
                  "askOrTell": ":tell",
                  "sessionAttributes" : this.attributes
              };
              if (USE_IMAGES_FLAG) {
                content["backgroundImageUrl"]=getBackgroundImage(item);
              }
              renderTemplate.call(this,content);



          } else {

            this.response.speak(response + " " + EXIT_SKILL_MESSAGE);
            this.emit(":responseReady");
          }
        }
    },
    "AMAZON.StartOverIntent": function() {
        this.emitWithState("Quiz");
    },
    "AMAZON.StopIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.CancelIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.HelpIntent": function() {
        this.response.speak(HELP_MESSAGE).listen(HELP_MESSAGE);
        this.emit(":responseReady");
    },
    "Unhandled": function() {
        this.emitWithState("AnswerIntent");
    },
    "AMAZON.PreviousIntent": function() {
          this.emitWithState("AnswerIntent");
    },
    "AMAZON.NextIntent": function() {
          this.emitWithState("AnswerIntent");
    }
});

function compareSlots(value) {
  //are there slots
  var isSlot=
    this.event.request &&
    this.event.request.intent &&
    this.event.request.intent.slots;

  //are there tokens
  var isToken=
    this.event.request &&
    this.event.request.token;

  if(isSlot){
  let slots=this.event.request.intent.slots;
    for (var slot in slots){
        if (slots[slot].value != undefined){
            if (slots[slot].value.toString().toLowerCase() == value.toString().toLowerCase()) return true;
        }
    }
  }
  if(isToken){
    if (this.event.request.token.toString().toLowerCase() == value.toString().toLowerCase()) return true;
    console.log(this.event.request.token.toString().toLowerCase());
  }
    return false;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

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
}

function getRandom(min, max)
{
    return Math.floor(Math.random() * (max-min+1)+min);
}

function getRandomSymbolSpeech(symbol)
{
    return "<say-as interpret-as='spell-out'>" + symbol + "</say-as>";
}

function getItem(slots)
{
    var propertyArray = Object.getOwnPropertyNames(data[0]);
    var value;

    for (var slot in slots)
    {
        if (slots[slot].value !== undefined)
        {
            value = slots[slot].value;
            for (var property in propertyArray)
            {
                var item = data.filter(x => x[propertyArray[property]].toString().toLowerCase() === slots[slot].value.toString().toLowerCase());
                if (item.length > 0)
                {
                    return item[0];
                }
            }
        }
    }
    return value;
}

function getSpeechCon(type)
{
    var speechCon = "";
    if (type) return "<say-as interpret-as='interjection'>" + speechConsCorrect[getRandom(0, speechConsCorrect.length-1)] + "! </say-as><break strength='strong'/>";
    else return "<say-as interpret-as='interjection'>" + speechConsWrong[getRandom(0, speechConsWrong.length-1)] + " </say-as><break strength='strong'/>";
}

function formatCasing(key)
{
    key = key.split(/(?=[A-Z])/).join(" ");
    return key;
}

function getTextDescription(item)
{
    var text = "";

    for (var key in item)
    {
        text += formatCasing(key) + ": " + item[key] + "\n";
    }
    return text;
}

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers, startHandlers, quizHandlers);
    alexa.execute();
};

//==============================================================================
//===================== Echo Show Helper Functions  ============================
//==============================================================================


function supportsDisplay() {
  var hasDisplay =
    this.event.context &&
    this.event.context.System &&
    this.event.context.System.device &&
    this.event.context.System.device.supportedInterfaces &&
    this.event.context.System.device.supportedInterfaces.Display

  return hasDisplay;
}

function isSimulator() {
  var isSimulator = !this.event.context; //simulator doesn't send context
  return false;
}


function renderTemplate (content) {
   console.log("renderTemplate" + content.templateToken);
   //learn about the various templates
   //https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/display-interface-reference#display-template-reference
   //
   switch(content.templateToken) {
       case "WelcomeScreenView":
         //Send the response to Alexa
         this.context.succeed(response);
         break;
       case "FinalScoreView":
        //  "hasDisplaySpeechOutput" : response + " " + EXIT_SKILL_MESSAGE,
        //  "bodyTemplateContent" : getFinalScore(this.attributes["quizscore"], this.attributes["counter"]),
        //  "templateToken" : "FinalScoreView",
        //  "askOrTell": ":tell",
        //  "hint":"start a quiz",
        //  "sessionAttributes" : this.attributes
        //  "backgroundImageUrl"
        var response = {
          "version": "1.0",
          "response": {
            "directives": [
              {
                "type": "Display.RenderTemplate",
                "backButton": "HIDDEN",
                "template": {
                  "type": "BodyTemplate6",
                  //"title": content.bodyTemplateTitle,
                  "token": content.templateToken,
                  "textContent": {
                    "primaryText": {
                      "type": "RichText",
                      "text": "<font size = '7'>"+content.bodyTemplateContent+"</font>"
                    }
                  }
                }
              },{
                  "type": "Hint",
                  "hint": {
                    "type": "PlainText",
                    "text": content.hint
                  }
                }
            ],
            "outputSpeech": {
              "type": "SSML",
              "ssml": "<speak>"+content.hasDisplaySpeechOutput+"</speak>"
            },
            "reprompt": {
              "outputSpeech": {
                "type": "SSML",
                "ssml": ""
              }
            },
            "shouldEndSession": content.askOrTell== ":tell",

          },
          "sessionAttributes": content.sessionAttributes

        }

        if(content.backgroundImageUrl) {
          //when we have images, create a sources object

          let sources = [
            {
              "size": "SMALL",
              "url": content.backgroundImageUrl
            },
            {
              "size": "LARGE",
              "url": content.backgroundImageUrl
            }
          ];
          //add the image sources object to the response
          response["response"]["directives"][0]["template"]["backgroundImage"]={};
          response["response"]["directives"][0]["template"]["backgroundImage"]["sources"]=sources;
        }



         //Send the response to Alexa
         this.context.succeed(response);
         break;

       case "ItemDetailsView":
           var response = {
             "version": "1.0",
             "response": {
               "directives": [
                 {
                   "type": "Display.RenderTemplate",
                   "template": {
                     "type": "BodyTemplate3",
                     "title": content.bodyTemplateTitle,
                     "token": content.templateToken,
                     "textContent": {
                       "primaryText": {
                         "type": "RichText",
                         "text": "<font size = '5'>"+content.bodyTemplateContent+"</font>"
                       }
                     },
                     "backButton": "HIDDEN"
                   }
                 }
               ],
               "outputSpeech": {
                 "type": "SSML",
                 "ssml": "<speak>"+content.hasDisplaySpeechOutput+"</speak>"
               },
               "reprompt": {
                 "outputSpeech": {
                   "type": "SSML",
                   "ssml": "<speak>"+content.hasDisplayRepromptText+"</speak>"
                 }
               },
               "shouldEndSession": content.askOrTell== ":tell",
               "card": {
                 "type": "Simple",
                 "title": content.simpleCardTitle,
                 "content": content.simpleCardContent
               }
             },
             "sessionAttributes": content.sessionAttributes

         }

          if(content.imageSmallUrl && content.imageLargeUrl) {
            //when we have images, create a sources object
            //TODO switch template to one without picture?
            let sources = [
              {
                "size": "SMALL",
                "url": content.imageSmallUrl
              },
              {
                "size": "LARGE",
                "url": content.imageLargeUrl
              }
            ];
            //add the image sources object to the response
            response["response"]["directives"][0]["template"]["image"]={};
            response["response"]["directives"][0]["template"]["image"]["sources"]=sources;
          }
          //Send the response to Alexa
          console.log("ready to respond (ItemDetailsView): "+JSON.stringify(response));
           this.context.succeed(response);
           break;
       case "MultipleChoiceListView":
       console.log ("listItems "+JSON.stringify(content.listItems));
           var response = {
              "version": "1.0",
              "response": {
                "directives": [
                  {
                    "type": "Display.RenderTemplate",
                    "template": {
                      "type": "ListTemplate1",
                      "title": content.listTemplateTitle,
                      "token": content.templateToken,
                      "listItems":content.listItems,
                      "backgroundImage": {
                        "sources": [
                          {
                            "size": "SMALL",
                            "url": content.backgroundImageSmallUrl
                          },
                          {
                            "size": "LARGE",
                            "url": content.backgroundImageLargeUrl
                          }
                        ]
                      },
                      "backButton": "HIDDEN"
                    }
                  }
                ],
                "outputSpeech": {
                  "type": "SSML",
                  "ssml": "<speak>"+content.hasDisplaySpeechOutput+"</speak>"
                },
                "reprompt": {
                  "outputSpeech": {
                    "type": "SSML",
                    "ssml": "<speak>"+content.hasDisplayRepromptText+"</speak>"
                  }
                },
                "shouldEndSession": content.askOrTell== ":tell",
                "card": {
                  "type": "Simple",
                  "title": content.simpleCardTitle,
                  "content": content.simpleCardContent
                }
              },
                "sessionAttributes": content.sessionAttributes

          }

            if(content.backgroundImageLargeUrl) {
              //when we have images, create a sources object
              //TODO switch template to one without picture?
              let sources = [
                {
                  "size": "SMALL",
                  "url": content.backgroundImageLargeUrl
                },
                {
                  "size": "LARGE",
                  "url": content.backgroundImageLargeUrl
                }
              ];
              //add the image sources object to the response
              response["response"]["directives"][0]["template"]["backgroundImage"]={};
              response["response"]["directives"][0]["template"]["backgroundImage"]["sources"]=sources;
            }
            console.log("ready to respond (MultipleChoiceList): "+JSON.stringify(response));
           this.context.succeed(response);
           break;
       default:
          this.response.speak("Thanks for playing, goodbye");
          this.emit(':responseReady');
   }

}
