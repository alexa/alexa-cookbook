const Alexa = require('ask-sdk-core');

/* CONSTANTS */
const skillBuilder = Alexa.SkillBuilders.custom();
const imagePath = 'https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/state_flag/1200x800/{A}._AC_BG00,00,00_SR{W},{H}TTH_.png';
const backgroundImagePath = 'https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/state_flag/1200x800/{A}._AC_GR_BG00,00,00_SR{W},{H}TTH_.png';
const data = [
  {
    StateName: 'Alaska', Abbreviation: 'AK', Capital: 'Juneau', StatehoodYear: 1959, StatehoodOrder: 49,
  },
  {
    StateName: 'Colorado', Abbreviation: 'CO', Capital: 'Denver', StatehoodYear: 1876, StatehoodOrder: 38,
  },
  {
    StateName: 'Minnesota', Abbreviation: 'MN', Capital: 'St. Paul', StatehoodYear: 1858, StatehoodOrder: 32,
  },
  {
    StateName: 'New Mexico', Abbreviation: 'NM', Capital: 'Santa Fe', StatehoodYear: 1912, StatehoodOrder: 47,
  },
  {
    StateName: 'Washington', Abbreviation: 'WA', Capital: 'Olympia', StatehoodYear: 1889, StatehoodOrder: 42,
  },
];
const defaultItemToken = 'WA';

const welcomeMessage = 'Welcome to the Display Template Demo!  To see a particular list orientation, just say horizontal or vertical. ';
const exitSkillMessage = 'Bye';
const repromptOutput = 'What would you like to see?';
const helpMessage = 'I know lots of things about display templates.  You can ask me for a list or a specific body template, and I\'ll show you what I\'ve got.  You can see it in a horizontal or vertically scrolling list.  What would you like to do?';

/* INTENT HANDLERS */
const ListTemplateHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (
      handlerInput.requestEnvelope.request.type === 'LaunchRequest' ||
      (
        request.type === 'IntentRequest' &&
        (
          request.intent.name === 'HorizontalTemplateIntent' ||
          request.intent.name === 'VerticalTemplateIntent' ||
          request.intent.name === 'AMAZON.StartOverIntent'
        )
      )
    );
  },
  handle(handlerInput) {
    const responseBuilder = handlerInput.responseBuilder;
    const request = handlerInput.requestEnvelope.request;
    let templateDirection = 'vertical';
    let templateNumber = 1;
    const imgHeight = [88];
    const imgWidth = [88];
    if (request.intent && request.intent.name === 'HorizontalTemplateIntent') {
      templateDirection = 'horizontal';
      templateNumber = 2;
      imgHeight[0] = 280;
      imgWidth[0] = 372;
    }
    let speechOutput = `This is the ${templateDirection} list template, also known as list template ${templateNumber}. The detail view of each state uses a different body template.  Select by touch, state name or template name.`;

    if (supportsDisplay(handlerInput)) {
      const statesList = [];
      data.forEach((x) => {
        const stateImage = new Alexa.ImageHelper().withDescription(`${x.StateName} state flag`);
        for (let y = 0; y < imgHeight.length; y += 1) {
          stateImage.addImageInstance(getImageUrl(imgHeight[y], imgWidth[y], x.Abbreviation));
        }
        statesList.push({
          token: x.Abbreviation,
          textContent: new Alexa.PlainTextContentHelper()
            .withPrimaryText(x.StateName)
            .withSecondaryText(`Abbreviation: ${x.Abbreviation}`)
            .withTertiaryText(`Capital: ${x.Capital}`)
            .getTextContent(),
          image: stateImage.getImage(),
        });
      });
      responseBuilder.addRenderTemplateDirective({
        type: `ListTemplate${templateNumber}`,
        token: 'listToken',
        backButton: 'hidden',
        title: `I list things ${templateDirection}ly (listTemplate${templateNumber})`,
        listItems: statesList,
      });
    }

    if (handlerInput.requestEnvelope.request.type === 'LaunchRequest') {
      speechOutput = welcomeMessage + speechOutput;
    }

    return responseBuilder.speak(speechOutput)
      .reprompt(repromptOutput)
      .getResponse();
  },
};

const BodyTemplateHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (
      (
        request.type === 'IntentRequest' &&
        request.intent.name === 'BodyTemplateSelectionIntent'
      ) || (request.type === 'Display.ElementSelected')
    );
  },
  handle(handlerInput) {
    const responseBuilder = handlerInput.responseBuilder;
    const request = handlerInput.requestEnvelope.request;
    let selectedState;
    let speechOutput;

    if (handlerInput.requestEnvelope.request.type === 'Display.ElementSelected') {
      // need to fetch token and then look up item from that
      const selectedToken = handlerInput.requestEnvelope.request.token;
      selectedState = getItemByAbbreviation(selectedToken);
    } else {
      // must be an intent
      let slotIdValue;
      if (request.intent.slots &&
          request.intent.slots.templateSelection &&
          request.intent.slots.templateSelection.value &&
          request.intent.slots.templateSelection.resolutions &&
          request.intent.slots.templateSelection.resolutions.resolutionsPerAuthority &&
          request.intent.slots.templateSelection.resolutions.resolutionsPerAuthority[0] &&
          request.intent.slots.templateSelection.resolutions.resolutionsPerAuthority[0].values &&
          request.intent.slots.templateSelection.resolutions.resolutionsPerAuthority[0].values[0] &&
          request.intent.slots.templateSelection.resolutions.resolutionsPerAuthority[0].values[0].value &&
          request.intent.slots.templateSelection.resolutions.resolutionsPerAuthority[0].values[0].value.name) {
        slotIdValue = request.intent.slots.templateSelection.resolutions.resolutionsPerAuthority[0].values[0].value.id;
        selectedState = getItemByAbbreviation(slotIdValue);
      }
    }

    if (!selectedState) {
      selectedState = getItemByAbbreviation(defaultItemToken);
    }

    responseBuilder.withStandardCard(
      getCardTitle(selectedState),
      getTextDescription(selectedState),
      getSmallImage(selectedState.Abbreviation),
      getLargeImage(selectedState.Abbreviation),
    );

    speechOutput = getSpeechDescription(selectedState);

    if (supportsDisplay(handlerInput)) {
      const image = new Alexa.ImageHelper()
        .addImageInstance(getLargeImage(selectedState.Abbreviation))
        .getImage();
      const bgImage = new Alexa.ImageHelper()
        .addImageInstance(getBackgroundImage(800, 1200, selectedState.Abbreviation))
        .getImage();
      const title = getCardTitle(selectedState);
      const bodyTemplate = bodyTemplateChoice(getCardTitle(selectedState));
      const primaryText = new Alexa.RichTextContentHelper()
        .withPrimaryText(getTextDescription(selectedState, '<br/>'))
        .getTextContent();
      responseBuilder.addRenderTemplateDirective({
        type: bodyTemplate,
        backButton: 'visible',
        backgroundImage: bgImage,
        image,
        title,
        textContent: primaryText,
      });
      speechOutput = `This is the ${getBodyTemplateName(bodyTemplate)} template, also known as body template number ${getBodyTemplateNumber(bodyTemplate)}. `;
    }


    return responseBuilder.speak(speechOutput + repromptOutput)
      .reprompt(repromptOutput)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    console.log('Inside HelpHandler');
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' &&
           request.intent.name === 'AMAZON.HelpHandler';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(helpMessage)
      .reprompt(helpMessage)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    console.log('Inside ExitHandler');
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest' && (
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
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${JSON.stringify(handlerInput.requestEnvelope)}`);
    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    console.log('Inside ErrorHandler');
    return true;
  },
  handle(handlerInput, error) {
    console.log('Inside ErrorHandler - handle');
    console.log(`Error handled: ${JSON.stringify(error)}`);
    console.log(`Handler Input: ${JSON.stringify(handlerInput)}`);

    return handlerInput.responseBuilder
      .speak(`Something went wrong. ${helpMessage}`)
      .reprompt(helpMessage)
      .getResponse();
  },
};


/* HELPER FUNCTIONS */

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
}

function getBodyTemplateName(templateType) {
  switch (templateType) {
    case 'BodyTemplate1':
      return 'full width text';
    case 'BodyTemplate2':
      return 'image on right with short text on left';
    case 'BodyTemplate3':
      return 'image on left with long text on right';
    case 'BodyTemplate6':
      return 'multi-turn scenario with short text';
    case 'BodyTemplate7':
      return 'scalable foreground image with optional background image';
    default:
      break;
  }
  return 'unknown body template';
}

function getBodyTemplateNumber(templateType) {
  switch (templateType) {
    case 'BodyTemplate1':
      return '1';
    case 'BodyTemplate2':
      return '2';
    case 'BodyTemplate3':
      return '3';
    case 'BodyTemplate6':
      return '6';
    case 'BodyTemplate7':
      return '7';
    default:
      break;
  }
  return 'unknown body template';
}


// returns true if the skill is running on a device with a display (show|spot)
function supportsDisplay(handlerInput) {
  const hasDisplay =
    handlerInput.requestEnvelope.context &&
    handlerInput.requestEnvelope.context.System &&
    handlerInput.requestEnvelope.context.System.device &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display;
  return hasDisplay;
}

function getCardTitle(item) {
  return item.StateName;
}

function getSmallImage(stateAbbreviation) {
  return getImageUrl(400, 720, stateAbbreviation);
}

function getLargeImage(stateAbbreviation) {
  return getImageUrl(800, 1200, stateAbbreviation);
}

function getImageUrl(height, width, stateAbbreviation) {
  return imagePath.replace('{H}', height)
    .replace('{W}', width)
    .replace('{A}', stateAbbreviation);
}

function getBackgroundImage(height, width, stateAbbreviation) {
  return backgroundImagePath.replace('{H}', height)
    .replace('{W}', width)
    .replace('{A}', stateAbbreviation);
}

function getSpeechDescription(item) {
  return `${item.StateName} is the ${item.StatehoodOrder}th state, admitted to the Union in ${item.StatehoodYear}.  The capital of ${item.StateName} is ${item.Capital}, and the abbreviation for ${item.StateName} is <break strength='strong'/><say-as interpret-as='spell-out'>${item.Abbreviation}</say-as>.  I've added ${item.StateName} to your Alexa app. `;
}

function formatCasing(key) {
  return key.split(/(?=[A-Z])/).join(' ');
}

function getItemByAbbreviation(abbreviation) {
  const propertyArray = Object.getOwnPropertyNames(data[0]);
  let slotValue;

  for (const property in propertyArray) {
    if (Object.prototype.hasOwnProperty.call(propertyArray, property)) {
      const item = data.filter(x => x[propertyArray[property]]
        .toString().toLowerCase() === abbreviation.toLowerCase());
      if (item.length > 0) {
        return item[0];
      }
    }
  }
  return slotValue;
}

function getTextDescription(item) {
  let text = 'Here are some facts about the state you selected: \n';

  for (const key in item) {
    if (Object.prototype.hasOwnProperty.call(item, key)) {
      text += `${formatCasing(key)}: ${item[key]}\n`;
    }
  }
  return text;
}

/* LAMBDA SETUP */
exports.handler = skillBuilder
  .addRequestHandlers(
    ListTemplateHandler,
    BodyTemplateHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
