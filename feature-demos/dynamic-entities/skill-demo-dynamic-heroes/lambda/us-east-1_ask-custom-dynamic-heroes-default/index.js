/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

const randomNumber = (max)  => Math.floor(Math.random() * Math.floor(max))

/* 
  Define a Character class that can be used to create characters and set their unique attributes.
*/

class Character {
  constructor(name, attackOptions) {
      this.name = name,
      this.level = randomNumber(5),
      this.health = randomNumber(5),
      this.strength = randomNumber(3),
      this.defense = randomNumber(5),
      this.speed = randomNumber(10),
      this.attackOptions = [{ name: 'pocket sand',  impact: '10000' }, ...attackOptions]
  }

  decreaseHealth(impact) {
    return this.health - impact
  }

  attack(opponent, option) {
    return opponent.decreaseHealth(option.impact)
  }

  defend(opponentStrength) {
    return this.defense - opponentStrength
  }

  run(opponentSpeed) {
    return this.speed > opponentSpeed
  }

  getAttackOptionNames() {
    return this.attackOptions.map((option) => option.name)
  }
}

/* 
  Define characters and their abilities
*/

const dynamicAttackOptions = {
    roy: [{name: 'sous vide', impact: 100}],
    olivia: [{name: 'katsu', impact: 11}],
    andrew: [{name:'hand sanitizer', impact: 5}],
    pan: [{name: 'spicy instant ramen', impact: 8}]
}


const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = `Welcome to Dynamic Heros. Choose one of the following characters. ${characterNames.join('. ')}`;

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

/* 
  Provide users with a list of possible characters to choose from. 
*/
const SelectCharacterIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'SelectCharacterIntent';
  },
  handle(handlerInput) {
    const characterName = handlerInput.requestEnvelope.request.intent.slots.character.value.toLowerCase(),
          character = new Character(characterName, dynamicAttackOptions[characterName]),
          selectionText = `You selected ${character.name}. With ${character.getAttackOptionNames().join(". ")} as a special.`,
          encounterText = 'You encountered a random person with a briefcase. Will you fight or run?',
          speechText = `${selectionText} ${encounterText}`,
          attributes = handlerInput.attributesManager.getSessionAttributes()
    attributes.character = character
    /*
      After a character is selected, store the character in SessionAttributes
      to use in subsequent sessions.
    */
    handlerInput.attributesManager.setSessionAttributes(attributes)
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(encounterText)
      .getResponse();
  },
};

/* 
  When the user encounters an enemy, ask the user to select an engagement (attack or run).
*/
const EngagementIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'EngagementIntent';
  },
  handle(handlerInput) {
    const engagementAction = handlerInput.requestEnvelope.request.intent.slots.engagement_action.value.toLowerCase(),
          attributes = handlerInput.attributesManager.getSessionAttributes(),
          { character } = attributes,
          encounterText = 'You encountered a random person with a briefcase. Will you fight or run?'
    var response = handlerInput.responseBuilder,
        speechText = ""

    if(engagementAction === "fight") {
      console.log(`You choose fight`)
      speechText = `How do you want to attack? ${character.attackOptions.map((option) => option.name).join('. ')}`
    } else {
      speechText = `You ran away. As you are taking a breath ${encounterText}`
    }

    /*
      Use Dynamic Entities to bias the recognition for the character's specific attack engagement.
    */
    const replaceEntityDirective = {
      type: 'Dialog.UpdateDynamicEntities',
      updateBehavior: 'REPLACE',
      types: [
        {
          name: 'AttackAction',
          values: character.attackOptions.map((option) => {
            return {
              name: {
                value: option.name
              }
            }
          })
        }
      ]
    }

    return response
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .reprompt(speechText)
      .addDirective(replaceEntityDirective)
      .getResponse();
  },
}


/*
  When a user selects an attack, this handler will look up how much damage it deals to the opponent.
  Then update the data in the session attribute appropriately.
*/
const AttackIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AttackIntent';
  },
  handle(handlerInput) {
    const attackName = handlerInput.requestEnvelope.request.intent.slots.attack_action.value.toLowerCase(),
          attributes = handlerInput.attributesManager.getSessionAttributes(),
          { character } = attributes,
          attackAction = character.attackOptions.filter(option => option.name === attackName)[0],
          speechText = `You attacked with ${attackAction.name} and dealt ${attackAction.impact} damage`;
    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can choose a hero lsited or action for your character.';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Thanks for playing Dynamic Heroes!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
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
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    SelectCharacterIntentHandler,
    EngagementIntentHandler,
    AttackIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
