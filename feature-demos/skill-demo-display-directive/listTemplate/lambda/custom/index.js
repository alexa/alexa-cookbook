/* eslint-disable  func-names */
/* eslint-disable  no-console */
/* eslint-disable  no-restricted-syntax */

// IMPORTANT: Please note that this template uses Dispay Directives,
// Display Interface for your skill should be enabled through the Amazon developer console
// See this screenshot - https://alexa.design/enabledisplay

const Alexa = require('ask-sdk-core');

/* INTENT HANDLERS */
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === `LaunchRequest`;
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(welcomeMessage)
      .reprompt(helpMessage)
      .getResponse();
  },
};

const VerticalTemplateHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    console.log("Inside VerticalTemplateHandler");
    console.log(JSON.stringify(request));
    return request.type === "IntentRequest" &&
           (request.intent.name === "VerticalTemplateIntent" || request.intent.name === "AMAZON.StartOverIntent");
  },
  handle(handlerInput) {
    console.log("Inside VerticalTemplateHandler - handle");
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const response = handlerInput.responseBuilder;
    attributes.state = states.QUIZ;
    attributes.counter = 0;
    attributes.quizScore = 0;

    var question = askQuestion(handlerInput);
    var speakOutput = startQuizMessage + question;
    var repromptOutput = question;

    const item = attributes.quizItem;
    const property = attributes.quizProperty;

    if (supportsDisplay(handlerInput) || isSimulator(handlerInput)) {
      console.log("This device supports display");
      const title = `I list things Vertically (listTemplate1)`;
      const primaryText = new Alexa.RichTextContentHelper().withPrimaryText(getListHeader(property, item)).getTextContent();
      const backgroundImage = new Alexa.ImageHelper().addImageInstance(getBackgroundImage(attributes.quizItem.Abbreviation)).getImage();
      const statesList = [];
      getStateNames(data).forEach((x, i) => {
        statesList.push(
          {
            "token" : x,
            "textContent" : new Alexa.PlainTextContentHelper().withPrimaryText(x).getTextContent(),
          }
        );
      });
      response.addRenderTemplateDirective({
        type : 'ListTemplate1',
        token : 'Question',
        backButton : 'hidden',
        backgroundImage,
        title,
        listItems : statesList,
      });
    }

    return response.speak(speakOutput)
                   .reprompt(repromptOutput)
                   .getResponse();
  },
};

const HorizontalTemplateHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    console.log("Inside HorizontalTemplateHandler");
    console.log(JSON.stringify(request));
    return request.type === "IntentRequest" &&
           (request.intent.name === "HorizontalTemplateIntent" || request.intent.name === "AMAZON.StartOverIntent");
  },
  handle(handlerInput) {
    console.log("Inside HorizontalTemplateHandler - handle");
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const response = handlerInput.responseBuilder;
    attributes.state = states.QUIZ;
    attributes.counter = 0;
    attributes.quizScore = 0;

    var question = askQuestion(handlerInput);
    var speakOutput = startQuizMessage + question;
    var repromptOutput = question;

    const item = attributes.quizItem;
    const property = attributes.quizProperty;

    if (supportsDisplay(handlerInput) || isSimulator(handlerInput)) {
      console.log("This device supports display");
      const title = `I list things Horizontally (listTemplate2)`;
      const primaryText = new Alexa.RichTextContentHelper().withPrimaryText(getListHeader(property, item)).getTextContent();
      const backgroundImage = new Alexa.ImageHelper().addImageInstance(getBackgroundImage(attributes.quizItem.Abbreviation)).getImage();
      const statesList = [];
      getStateNames(data).forEach((x, i) => {
        statesList.push(
          {
            "token" : x,
            "textContent" : new Alexa.PlainTextContentHelper().withPrimaryText(x).getTextContent(),
          }
        );
      });
      response.addRenderTemplateDirective({
        type : 'ListTemplate2',
        token : 'Question',
        backButton : 'hidden',
        backgroundImage,
        title,
        listItems : itemList,
      });
    }

    return response.speak(speakOutput)
                   .reprompt(repromptOutput)
                   .getResponse();
  },
};

const BodyTemplateSelectionHandler = {
 canHandle(handlerInput) {
   console.log("Inside BodyTemplateSelectionHandler");
   const attributes = handlerInput.attributesManager.getSessionAttributes();
   const request = handlerInput.requestEnvelope.request;

   return request.type === "IntentRequest" &&
          (request.intent.name === "BodyTemplateSelectionIntent");

 },
 handle(handlerInput) {
   console.log("Inside BodyTemplateSelection - handle");
   //GRABBING ALL SLOT VALUES AND RETURNING THE MATCHING DATA OBJECT.
   const item = getItem(handlerInput.requestEnvelope.request.intent.slots);
   const response = handlerInput.responseBuilder;

   //IF THE DATA WAS FOUND
   if (item && item[Object.getOwnPropertyNames(data[0])[0]] !== undefined) {
     if (useCardsFlag) {
       response.withStandardCard(
         getCardTitle(item),
         getTextDescription(item),
         getSmallImage(item),
         getLargeImage(item))
     }

     if(supportsDisplay(handlerInput)) {
       const image = new Alexa.ImageHelper().addImageInstance(getLargeImage(item)).getImage();
       const title = getCardTitle(item);
       const bodyTemplate = bodyTemplateChoice(getCardTitle(item));
       const primaryText = new Alexa.RichTextContentHelper().withPrimaryText(getTextDescription(item, "<br/>")).getTextContent();
       response.addRenderTemplateDirective({
         type: bodyTemplate,
         backButton: 'visible',
         image,
         title,
         textContent: primaryText,
       });
     }
     return response.speak(getSpeechDescription(item))
             .reprompt(repromptSpeech)
             .getResponse();
   }
   //IF THE DATA WAS NOT FOUND
   else
   {
     return response.speak(getBadAnswer(item))
             .reprompt(getBadAnswer(item))
             .getResponse();
   }
 }
};

const HelpHandler = {
  canHandle(handlerInput) {
    console.log("Inside HelpHandler");
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' &&
           request.intent.name === 'AMAZON.HelpHandler';
  },
  handle(handlerInput) {
    console.log("Inside HelpHandler - handle");
    return handlerInput.responseBuilder
      .speak(helpMessage)
      .reprompt(helpMessage)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    console.log("Inside ExitHandler");
    const attributes = handlerInput.attributesManager.getSessionAttributes();
    const request = handlerInput.requestEnvelope.request;

    return request.type === `IntentRequest` && (
              request.intent.name === 'AMAZON.StopIntent' ||
              request.intent.name === 'AMAZON.PauseIntent' ||
              request.intent.name === 'AMAZON.CancelIntent'
           );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(exitSkillMessage)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    console.log("Inside SessionEndedRequestHandler");
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${JSON.stringify(handlerInput.requestEnvelope)}`);
    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    console.log("Inside ErrorHandler");
    return true;
  },
  handle(handlerInput, error) {
    console.log("Inside ErrorHandler - handle");
    console.log(`Error handled: ${JSON.stringify(error)}`);
    console.log(`Handler Input: ${JSON.stringify(handlerInput)}`);

    return handlerInput.responseBuilder
      .speak(helpMessage)
      .reprompt(helpMessage)
      .getResponse();
  },
};

/* CONSTANTS */
const skillBuilder = Alexa.SkillBuilders.custom();
const imagePath = "https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/state_flag/{0}x{1}/{2}._TTH_.png";
const backgroundImagePath = "https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/state_flag/{0}x{1}/{2}._TTH_.png";
const speechConsCorrect = ['Booya', 'All righty', 'Bam', 'Bazinga', 'Bingo', 'Boom', 'Bravo', 'Cha Ching', 'Cheers', 'Dynomite', 'Hip hip hooray', 'Hurrah', 'Hurray', 'Huzzah', 'Oh dear.  Just kidding.  Hurray', 'Kaboom', 'Kaching', 'Oh snap', 'Phew','Righto', 'Way to go', 'Well done', 'Whee', 'Woo hoo', 'Yay', 'Wowza', 'Yowsa'];
const speechConsWrong = ['Argh', 'Aw man', 'Blarg', 'Blast', 'Boo', 'Bummer', 'Darn', "D'oh", 'Dun dun dun', 'Eek', 'Honk', 'Le sigh', 'Mamma mia', 'Oh boy', 'Oh dear', 'Oof', 'Ouch', 'Ruh roh', 'Shucks', 'Uh oh', 'Wah wah', 'Whoops a daisy', 'Yikes'];
const data = [
  {StateName: 'Alaska', Abbreviation: 'AK', Capital: 'Juneau', StatehoodYear: 1959, StatehoodOrder: 49},
  {StateName: 'Colorado', Abbreviation: 'CO', Capital: 'Denver', StatehoodYear: 1876, StatehoodOrder: 38},
  {StateName: 'Minnesota', Abbreviation: 'MN', Capital: 'St. Paul', StatehoodYear: 1858, StatehoodOrder: 32},
  {StateName: 'New Mexico', Abbreviation: 'NM', Capital: 'Santa Fe', StatehoodYear: 1912, StatehoodOrder: 47},
  {StateName: 'Washington', Abbreviation: 'WA', Capital: 'Olympia', StatehoodYear: 1889, StatehoodOrder: 42}
];

const states = {
  START: `_START`,
  QUIZ: `_QUIZ`,
};

const welcomeMessage = `Welcome to the Amazon Template Demonstration!  You can ask me to display body template options in a horizontal or vertical list format, just say horizontal or vertical.  What would you like to do?`;
const startQuizMessage = `OK.  Here is the list in your preferred format. `;
const exitSkillMessage = `Thank you for checking out the United States Template demo!  Come watch it again soon!`;
const repromptSpeech = `Which other list template can I show you?`;
const helpMessage = `I know lots of things about display templates.  You can ask me for a list or a specific body template, and I'll show you what I've got.  You can see it in a horizontal or vertically scrolling list.  What would you like to do?`;
const useCardsFlag = true;

/* HELPER FUNCTIONS */

function getStateNames(stateInfo){
  var stateNames = [];

  stateInfo.forEach((x, i) => {
    stateNames.push(x.StateName)
    })
  return stateNames;
};

function bodyTemplateChoice(pStateName) {
  let templateName;

  switch (pStateName) {
      case 'Alaska':
          templateName = 'BodyTemplate1';
          break;
      case 'Colorado':
          templateName = 'BodyTemplate2';
          break;
      case 'Minnesota':
          templateName = 'BodyTemplate3';
          break;
      case 'New Mexico':
          templateName = 'BodyTemplate6';
          break;
      case 'Washington':
          templateName = 'BodyTemplate7';
          break;
      default:
          templateName = 'BodyTemplate1';
  }
  return templateName;
};


function bodyTemplateTypePicker(pNum) {
    var val;

    switch (pNum) {
        case 1:
            val = new Alexa.templateBuilders.BodyTemplate1Builder();
            break;
        case 2:
            val = new Alexa.templateBuilders.BodyTemplate2Builder();
            break;
        case 3:
            val = new Alexa.templateBuilders.BodyTemplate3Builder();
            break;
        case 6:
            val = new Alexa.templateBuilders.BodyTemplate6Builder();
            break;
        case 7:
            val = new Alexa.templateBuilders.BodyTemplate7Builder();
            break;
        default:
            val = null;
    }
    return val;
}

function bodyTemplateMaker(pBodyTemplateType, pImg, pTitle, pText1, pText2, pOutputSpeech, pReprompt, pHint, pBackgroundIMG) {
    var bodyTemplate = bodyTemplateTypePicker.call(this, pBodyTemplateType);
    var template = bodyTemplate.setTitle(pTitle)
        .build();

    if (pBodyTemplateType != 7) {
        //Text not supported in BodyTemplate7
        bodyTemplate.setTextContent(makeRichText(pText1) || null, makeRichText(pText2) || null) //Add text or null
    }

    if (pImg) {
        bodyTemplate.setImage(makeImage(pImg));
    }

    if (pBackgroundIMG) {
        bodyTemplate.setBackgroundImage(makeImage(pBackgroundIMG));
    }

    this.response.speak(pOutputSpeech)
        .renderTemplate(template)
        .shouldEndSession(null); //Keeps session open without pinging user..

    this.response.hint(pHint || null, "PlainText");
    this.attributes.lastOutputResponse = pOutputSpeech;

    if (pReprompt) {
        this.response.listen(pReprompt); // .. but we will ping them if we add a reprompt
    }

    this.emit(':responseReady');
}

// returns true if the skill is running on a device with a display (show|spot)
function supportsDisplay(handlerInput) {
  var hasDisplay =
    handlerInput.requestEnvelope.context &&
    handlerInput.requestEnvelope.context.System &&
    handlerInput.requestEnvelope.context.System.device &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display;
  return hasDisplay;
}

function isSimulator(handlerInput) {
  var isSimulator = !this.event.context; //simulator doesn't send context
  return false;
}

function getBadAnswer(item) {
  return `I'm sorry. ${item} is not something I know very much about in this skill. ${helpMessage}`;
}

function getCurrentScore(score, counter) {
  return `Your current score is ${score} out of ${counter}. `;
}

function getFinalScore(score, counter) {
  return `Your final score is ${score} out of ${counter}. `;
}

function getCardTitle(item) {
  return item.StateName;
}

function getSmallImage(item) {
  return `https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/state_flag/720x400/${item.Abbreviation}._TTH_.png`;
}

function getLargeImage(item) {
  return `https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/state_flag/1200x800/${item.Abbreviation}._TTH_.png`;
}

function getImage(height, width, label) {
  return imagePath.replace("{0}", height)
    .replace("{1}", width)
    .replace("{2}", label);
}

function getBackgroundImage(label, height = 1024, width = 600) {
  return backgroundImagePath.replace("{0}", height)
    .replace("{1}", width)
    .replace("{2}", label);
}

function getSpeechDescription(item) {
  return `${item.StateName} is the ${item.StatehoodOrder}th state, admitted to the Union in ${item.StatehoodYear}.  The capital of ${item.StateName} is ${item.Capital}, and the abbreviation for ${item.StateName} is <break strength='strong'/><say-as interpret-as='spell-out'>${item.Abbreviation}</say-as>.  I've added ${item.StateName} to your Alexa app.  Which other state or capital would you like to know about?`;
}

function formatCasing(key) {
  return key.split(/(?=[A-Z])/).join(' ');
}

function getQuestion(counter, property, item) {
  return `Here is your ${counter}th question.  What is the ${formatCasing(property)} of ${item.StateName}?`;
}

// getListHeader returns the description of what the list contains.
function getListHeader(property, item) {
  return "Choose any of the states below to see a different body template demonstration.";
}

function getAnswer(property, item) {
  switch (property) {
    case 'Abbreviation':
      return `The ${formatCasing(property)} of ${item.StateName} is <say-as interpret-as='spell-out'>${item[property]}</say-as>. `;
    default:
      return `The ${formatCasing(property)} of ${item.StateName} is ${item[property]}. `;
  }
}

function getRandom(min, max) {
  return Math.floor((Math.random() * ((max - min) + 1)) + min);
}

function askQuestion(handlerInput) {
  console.log("I am in askQuestion()");
  //GENERATING THE RANDOM QUESTION FROM DATA
  const random = getRandom(0, data.length - 1);
  const item = data[random];
  const propertyArray = Object.getOwnPropertyNames(item);
  const property = propertyArray[getRandom(1, propertyArray.length - 1)];

  //GET SESSION ATTRIBUTES
  const attributes = handlerInput.attributesManager.getSessionAttributes();

  //SET QUESTION DATA TO ATTRIBUTES
  attributes.selectedItemIndex = random;
  attributes.quizItem = item;
  attributes.quizProperty = property;
  attributes.counter += 1;

  //SAVE ATTRIBUTES
  handlerInput.attributesManager.setSessionAttributes(attributes);

  const question = getQuestion(attributes.counter, property, item);
  return question;
}

function compareSlots(slots, value) {
  for (const slot in slots) {
    if (Object.prototype.hasOwnProperty.call(slots, slot) && slots[slot].value !== undefined) {
      if (slots[slot].value.toString().toLowerCase() === value.toString().toLowerCase()) {
        return true;
      }
    }
  }

  return false;
}

function getItem(slots) {
  const propertyArray = Object.getOwnPropertyNames(data[0]);
  let slotValue;

  for (const slot in slots) {
    if (Object.prototype.hasOwnProperty.call(slots, slot) && slots[slot].value !== undefined) {
      slotValue = slots[slot].value;
      for (const property in propertyArray) {
        if (Object.prototype.hasOwnProperty.call(propertyArray, property)) {
          const item = data.filter(x => x[propertyArray[property]]
            .toString().toLowerCase() === slots[slot].value.toString().toLowerCase());
          if (item.length > 0) {
            return item[0];
          }
        }
      }
    }
  }
  return slotValue;
}

function getSpeechCon(type) {
  if (type) return `<say-as interpret-as='interjection'>${speechConsCorrect[getRandom(0, speechConsCorrect.length - 1)]}! </say-as><break strength='strong'/>`;
  return `<say-as interpret-as='interjection'>${speechConsWrong[getRandom(0, speechConsWrong.length - 1)]} </say-as><break strength='strong'/>`;
}


function getTextDescription(item) {
  let text = '';

  for (const key in item) {
    if (Object.prototype.hasOwnProperty.call(item, key)) {
      text += `${formatCasing(key)}: ${item[key]}\n`;
    }
  }
  return text;
}

function getAndShuffleMultipleChoiceAnswers(currentIndex, item, property) {
  return shuffle(getMultipleChoiceAnswers(currentIndex, item, property));
}

// This function randomly chooses 3 answers 2 incorrect and 1 correct answer to
// display on the screen using the ListTemplate. It ensures that the list is unique.
function getMultipleChoiceAnswers(currentIndex, item, property) {

  // insert the correct answer first
  let answerList = [item[property]];

  // There's a possibility that we might get duplicate answers
  // 8 states were founded in 1788
  // 4 states were founded in 1889
  // 3 states were founded in 1787
  // to prevent duplicates we need avoid index collisions and take a sample of
  // 8 + 4 + 1 = 13 answers (it's not 8+4+3 because later we take the unique
  // we only need the minimum.)
  let count = 0
  let upperBound = 12

  let seen = new Array();
  seen[currentIndex] = 1;

  while (count < upperBound) {
    let random = getRandom(0, data.length - 1);

    // only add if we haven't seen this index
    if ( seen[random] === undefined ) {
      answerList.push(data[random][property]);
      count++;
    }
  }

  // remove duplicates from the list.
  answerList = answerList.filter((v, i, a) => a.indexOf(v) === i)
  // take the first three items from the list.
  answerList = answerList.slice(0, 5);
  return answerList;
}

// This function takes the contents of an array and randomly shuffles it.
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while ( 0 !== currentIndex ) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

/* LAMBDA SETUP */
exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    VerticalTemplateHandler,
    HorizontalTemplateHandler,
    BodyTemplateSelectionHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
