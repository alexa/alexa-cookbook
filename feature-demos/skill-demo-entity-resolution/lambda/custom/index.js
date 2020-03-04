const Alexa = require('ask-sdk-core');

const helpOutput = 'You can demonstrate entity resolution by providing varied answers to the questions asked.  Try saying lets play a game.';
const helpReprompt = 'Try saying "start over".';

const questions = [
  {
    answer: 'Thomas Edison',
    question: 'Who is credited with suggesting the word "hello" be used when answering the telephone?',
    synonyms: ['Edison', 'Menlo Park'],
  },
  {
    answer: 'North America',
    question: 'The Passenger Pigeon, now extinct, was endemic to which continent?',
    synonyms: ['Northern America', 'Canada', 'Mexico', 'America'],
  },
  {
    answer: 'Auguste Rodin',
    question: 'Which artist created the sculpture "The Thinker"?',
    synonyms: ['Rodin', 'Auguste', 'august', 'august rodin'],
  },
  {
    answer: 'The Canary Islands',
    question: 'What is the name of the Spanish islands that lie off the Northwest coast of Africa?',
    synonyms: ['Canary Islands', 'Canary Island', 'the Canaries'],
  },
];

// This is a list of positive speechcons that this skill will use when a user gets
// a correct answer.  For a full list of supported speechcons, go here:
// https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference
const speechConsCorrect = ['Booya', 'All righty', 'Bam', 'Bazinga', 'Bingo', 'Boom', 'Bravo', 'Cha Ching', 'Cheers', 'Dynomite',
  'Hip hip hooray', 'Hurrah', 'Hurray', 'Huzzah', 'Oh dear.  Just kidding.  Hurray', 'Kaboom', 'Kaching', 'Oh snap', 'Phew',
  'Righto', 'Way to go', 'Well done', 'Whee', 'Woo hoo', 'Yay', 'Wowza', 'Yowsa'];

// This is a list of negative speechcons that this skill will use when a user gets
// an incorrect answer.  For a full list of supported speechcons, go here:
// https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speechcon-reference
const speechConsWrong = ['Argh', 'Aw man', 'Blarg', 'Blast', 'Boo', 'Bummer', 'Darn', 'D\'oh', 'Dun dun dun', 'Eek', 'Honk', 'Le sigh',
  'Mamma mia', 'Oh boy', 'Oh dear', 'Oof', 'Ouch', 'Ruh roh', 'Shucks', 'Uh oh', 'Wah wah', 'Whoops a daisy', 'Yikes'];

// handlers

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest' ||
      (request.type === 'IntentRequest' && request.intent.name === 'NewGameIntent');
  },
  handle(handlerInput) {
    return nextQuestion(handlerInput, 'Welcome, ');
  },
};

const AnswerHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'AnswerIntent';
  },
  handle(handlerInput) {
    // get the Answer
    const slotValues = getSlotValues(handlerInput.requestEnvelope.request.intent.slots);

    // check the Answer
    // where answer is my slot name
    // what synonym the person said - slotValues.answer.synonym
    // what that resolved to - slotValues.answer.resolved
    return checkAnswer(handlerInput, slotValues.answer.resolved);

    // report the results and ask a new quesiton
  },
};

const AmazonHelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const responseBuilder = handlerInput.responseBuilder;
    return responseBuilder
      .speak(helpOutput)
      .reprompt(helpReprompt)
      .getResponse();
  },
};

const AmazonCancelStopHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' &&
      (request.intent.name === 'AMAZON.CancelIntent' || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const responseBuilder = handlerInput.responseBuilder;
    const speechOutput = 'Okay, talk to you later! ';

    return responseBuilder
      .speak(speechOutput)
      .withShouldEndSession(true)
      .getResponse();
  },
};

const SessionEndedHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    const request = handlerInput.requestEnvelope.request;

    console.log(`Original Request was: ${JSON.stringify(request, null, 2)}`);
    console.log(`Error handled: ${error}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can not understand the command.  Please say again.')
      .reprompt('Sorry, I can not understand the command.  Please say again.')
      .getResponse();
  },
};

// helpers

function nextQuestion(handlerInput, preface) {
  const responseBuilder = handlerInput.responseBuilder;
  const attributesManager = handlerInput.attributesManager;
  const sessionAttributes = attributesManager.getSessionAttributes();

  // get a question
  const data = getRandomQuestion(questions);
  sessionAttributes.currentQuestionIndex = data.index;

  // ask the question
  return responseBuilder
    .speak(preface + data.text.question)
    .reprompt(`Here's your question again ${data.text.question}`)
    .getResponse();
}

function checkAnswer(handlerInput, givenAnswer) {
  const attributesManager = handlerInput.attributesManager;
  const sessionAttributes = attributesManager.getSessionAttributes();

  if (sessionAttributes.currentQuestionIndex) {
    const correctAnswer = questions[sessionAttributes.currentQuestionIndex].answer;
    if (correctAnswer.toUpperCase() === givenAnswer.toUpperCase()) {
      // correct
      return nextQuestion(handlerInput, `${getSpeechCon(true)} you got it, ${givenAnswer} was right. here's another, `);
    }
    // incorrect
    return nextQuestion(handlerInput, `${getSpeechCon(false)} the answer was ${correctAnswer}. let's try again, `);
  }
  // no current question
  return nextQuestion(handlerInput, 'Here\'s a new question ');
}

function getSpeechCon(type) {
  if (type) {
    return `<say-as interpret-as='interjection'>${getRandomPhrase(speechConsCorrect)}! </say-as><break strength='strong'/>`;
  }
  return `<say-as interpret-as='interjection'>${getRandomPhrase(speechConsWrong)} </say-as><break strength='strong'/>`;
}

function getRandomPhrase(array) {
  // the argument is an array [] of words or phrases
  const i = Math.floor(Math.random() * array.length);
  return (array[i]);
}

function getSlotValues(filledSlots) {
  const slotValues = {};

  Object.keys(filledSlots).forEach((item) => {
    const name = filledSlots[item].name;
    slotValues[name] = {};

    // Extract the nested key 'code' from the ER resolutions in the request
    let erStatusCode;
    try {
      erStatusCode = ((((filledSlots[item] || {}).resolutions ||
        {}).resolutionsPerAuthority[0] || {}).status || {}).code;
    } catch (e) {
      // console.log('erStatusCode e:' + e)
    }

    switch (erStatusCode) {
      case 'ER_SUCCESS_MATCH':
        slotValues[name].synonym = filledSlots[item].value;
        slotValues[name].resolved = filledSlots[item].resolutions
          .resolutionsPerAuthority[0].values[0].value.name;
        slotValues[name].isValidated = filledSlots[item].value ===
          filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name;
        slotValues[name].statusCode = erStatusCode;
        break;

      default: // ER_SUCCESS_NO_MATCH, undefined
        slotValues[name].synonym = filledSlots[item].value;
        slotValues[name].resolved = filledSlots[item].value;
        slotValues[name].isValidated = false;
        slotValues[name].statusCode = erStatusCode === undefined ? 'undefined' : erStatusCode;
        break;
    }
  }, this);

  return slotValues;
}

function getRandomQuestion(array) {
  // the argument is an array [] of words or phrases
  const i = Math.floor(Math.random() * array.length);
  return ({
    text: array[i],
    index: i,
  });
}

// exports

const skillBuilder = Alexa.SkillBuilders.custom();
exports.handler = skillBuilder
  .addRequestHandlers(
    AmazonCancelStopHandler,
    AmazonHelpHandler,
    AnswerHandler,
    LaunchRequestHandler,
    SessionEndedHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .withCustomUserAgent('cookbook/entity-resolution/v1')
  .lambda();
