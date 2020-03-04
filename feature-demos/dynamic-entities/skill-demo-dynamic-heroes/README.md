# Dynamic Heroes Game Demo
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/header._TTH_.png" />

This tutorial demonstrates how to implement a role-playing game (RPG) using [Dynamic Entities](https://developer.amazon.com/docs/custom-skills/use-dynamic-entities-for-customized-interactions.html) and [Session Attributes](https://developer.amazon.com/docs/custom-skills/manage-skill-session-and-session-attributes.html). The scenario of the game is based on the famous [_pocket sand_ meme](https://youtu.be/QLpUq__iQqw), where a character encounters random people with a breifcase. As the player, you can fight or run. If you choose to fight the skill will use Dynamic Entities to dynamically bias recognition for the speicific character's attack slot values in addition to the the pocket sand attack. All of the game play data is persisted through SessionAttributes.

## What You Will Need
*  [Amazon Developer Account](http://developer.amazon.com/alexa)
*  [Amazon Web Services Account](http://aws.amazon.com/)
*  [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html)
*  The sample code on [GitHub](https://github.com/alexa/alexa-cookbook/tree/master/feature-demos/dynamic-entities/dynamic-heroes).

## Setting Up the Demo

This folder contains the following:

1. interaction model
1. skill code

It is structured to make it easy to deploy if you have the ASK CLI already setup.  

## Running the Demo
```
You: "Alexa, open Dynamic Heroes."

Alexa: "Welcome to Dynamic Heros. Choose one of the following characters. Pan, Olivia, Andrew, Roy."

You: "Pan."

Alexa: "You selected Pan. With Spicy Instant Ramen as a special. You encountered a random person with a briefcase. Will you fight or run?"

You: "Fight."

Alexa: "How do you want to attack? Pocket Sand or Spicy Instant Ramen."

You: "Pocket Sand."

Alexa: "You attacked with Pocket Sand and dealt ten thousand damage."
```

**Note**: Dynamic Entities only biases the recognition, but does not guarantee the recognition.

## References
- [Dynamic Entities Tech Docs](https://developer.amazon.com/docs/custom-skills/use-dynamic-entities-for-customized-interactions.html)
- [SessionAttributes](https://developer.amazon.com/docs/custom-skills/manage-skill-session-and-session-attributes.html)