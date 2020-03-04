# Alexa Cookbook and Sample Skills Style Guide for Node.js

This Style Guide provides the guidance for how Node.js code used in the Alexa Cookbook and Sample Skills should be formatted and laid out. Please use these guidelines (unless you know better ones -- if you do, open an issue/PR).

## Contents

1. Code Layout
1. General
1. Handlers & Interceptors
1. Functions
1. Internationalization (I18N)

## Code Layout
Ensure that the code in index.js follows this order:
1. License header (if applicable)
1. Constants (not including language strings if multiple languages in the same file)
1. Handlers
1. Functions (if not in separate file)
1. Lambda Setup (export)
1. Language strings (if including multiple languages in the same file)

### Section Labels
1.	Add a header comment for each of these code sections 
-	`/* CONSTANTS */`
-	`/* HANDLERS */`
-	`/* FUNCTIONS */`
-	`/* LAMBDA SETUP */`
- `/* LANGUAGE STRINGS */`

## General
1. Code needs to be internationalized (use language strings, etc.) but does not need to be translated. Minimum support of en-US required.
1. Lint the code according to this [ESLint configuration file](./eslintrc.json). Using ESLint is not required, presuming the result matches. (Config files for other tools accepted as PR's.)
> If you are new to ESLint, get started with [ESLint installation and usage information](https://eslint.org/docs/user-guide/getting-started). 
1. The `.speak` method should take `speakOutput` as its parameter.
1. The `.reprompt` method should take `repromptOutput` or `speakOutput` as its parameter.
1. Comments usage:
    1. Indicate where required/optional action is required.
    1. Mark required actions in comments with `**TODO**`.
    1. Describe key or unusual code.
1. To make code more readable, indent and line break statements with multiple conditionals. Line break before the operator. For example,
    **Do**
    ```javascript
    return request.type === "IntentRequest"
           && (request.intent.name === "QuizIntent"
               || request.intent.name === "AMAZON.StartOverIntent");
    ```
    **Don't**
    This breaks after the operator. Use line break before operator.
    ```javascript
    return request.type === "IntentRequest" &&
              (request.intent.name === "QuizIntent" || request.intent.name === "AMAZON.StartOverIntent");
    ```
    **Don't**
    This line is too long. Use a line break.
    ```javascript
    return request.type === "IntentRequest" && (request.intent.name === "QuizIntent" || request.intent.name === "AMAZON.StartOverIntent");
    ```
    **Don't**
    This line is not indented properly.
    ```javascript
    return request.type === "IntentRequest"
    && (request.intent.name === "QuizIntent" || request.intent.name === "AMAZON.StartOverIntent");
    ```
### Constants, Variables & Attributes
1.	Constants and session attributes should be named in "camelCase".
2.	Use only `const` or let to declare variables. 
1.	`const` should be used for things that would not be altered
2.	`let` should be used for things that would likely altered programmatically
3.	Rename boolean variables to begin with "is", "has", "can" or comparable prefix to indicate boolean.  E.g. "isCorrect", instead of just "correct".

### Standard Constants
The following constants should be included:
```javascript
const debug = getEnvVar('DEBUG', false); // controls if debug messaging should be outputted to CloudWatch logs
const speakError = getEnvVar('SPEAK_ERROR', false); // controls if error message details should be spoken in the response to aid in debugging. requires debug to be enabled in order to work
const errorMessage='I had trouble processing that request. Please try again and if the issue persists, please contact the skill developer. What can I help you with?';
```

## Handlers & Interceptors
1. If a handler handles exactly one intent/request type, name the handler like <event>Handler (without the AMAZON prefix for built-in intents):
    -	LaunchRequestHandler 
    -	SomeRandomIntentHandler
    -	RepeatIntentHandler
    -	SessionEndedRequestHandler
1. The preferred order for the Handlers when constructing the SkillBuilder:
    1. LaunchRequestHandler
    1. ...skill specific intent handlers...
    1. RepeatIntentHandler (if applicable)
    1. HelpIntentHandler
    1. ExitIntentHandler
    1. FallbackIntentHandler
    1. SessionEndedRequestHandler
1. Request and response interceptors should use the suffix **Interceptor** and should include **Request** or **Response** (if specific to that type).
1. The Handlers & Interceptors implementation code should be in the same order as they are added to the SkillBuilder.
1. If a handler is not the only handler for a given intent, include a comment to that effect immediately preceding the canHandle().  I.e.
    ```javascript
    const LaunchRequestHandler = {
        // This LaunchRequestHandler catches LaunchRequests which are not handled by more specific handlers
        canHandle(handlerInput){
          ...
    ```
### Boilerplate Code
The code in these sections should be used for their respective handlers. If the functionality of the code requires changes, use this as a baseline.
#### SessionEndedRequestHandler
```javascript
const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    console.log("Inside SessionEndedRequestHandler - canHandle");
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequestHandler';
  },
  handle(handlerInput) {
    console.log("Inside SessionEndedRequestHandler - handle");
    console.log(`Session ended with reason: ${JSON.stringify(handlerInput.requestEnvelope)}`);
    return handlerInput.responseBuilder.getResponse();
  },
};
```
#### FallbackHandler
```javascript
const FallbackHandler = {
  // This handler will only be triggered by those skills/locales that support
  // the FallbackIntent, so this handler can be safely deployed to any locale.
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
           && request.intent.name === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    return handlerInput.responseBuilder
      .speak(requestAttributes.t('FALLBACK_MESSAGE'))
      .reprompt(requestAttributes.t('FALLBACK_REPROMPT'))
      .getResponse();
  },
};
```
#### ErrorHandler
```javascript
const ErrorHandler = {
  canHandle() {
    console.log("Inside ErrorHandler - canHandle");
    return true;
  },
  handle(handlerInput, error) {
    console.log("Inside ErrorHandler - handle");
    console.log(`Error handled: ${JSON.stringify(error.stack)}`); 
    console.log(`Handler Input: ${JSON.stringify(handlerInput)}`);

    return handlerInput.responseBuilder
      .speak(errorMessage )
      .reprompt(errorMessage)
      .getResponse();
  },
};
```
#### LogRequestInterceptor
```javascript
const LogRequestInterceptor = {
	process(handlerInput) {
    if (debug) {
  		console.log(`REQUEST ENVELOPE = ${JSON.stringify(handlerInput.requestEnvelope)}`
		  );
    }
	}
};
```
#### LogResponseInterceptor
```javascript
const LoggingResponseInterceptor = {
  process(handlerInput, response) {
    if (debug) {
      console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
  }
};
```
## Functions
1. All (non-handler) functions should be named in "camelCase"
2. All functions names should begin with an action verb, so like - getFinalScore, formatCasing, supportsDisplay etc.
3. If a utility function is available in the SDK, the use of it is preferred over using a locally maintain function with comparable functionality.

## Testing
1. No specific test methodology is currently required, but do test your code.  Use unit testing (no voice interaction) in addition to voice testing (full stack).
1. Run ESLint on the code to check for errors, including indentation.
1. Where applicable, include certification testing instructions.

## I18N (Internationalization)
I18N will leverage i18next.
In the require section add:
```javascript
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');
```
Import the desired translations by adding this section (always include all locales in this section, just comment out the ones without translations).
```javascript
const languageStrings = {
//  'de': require('languages\de.js'),
//  'de-DE': require('languages\de-DE.js'),
  'en' : require('languages\en.js'),
//  'en-AU': require('languages\en-AU.js'),
//  'en-CA': require('languages\en-CA.js'),
//  'en-GB': require('languages\en-GB.js'),
//  'en-IN': require('languages\en-IN.js'),
  'en-US': require('languages\en-US.js'),
//  'es' : require('languages\es.js'),
//  'es-ES': require('languages\es-ES.js'),
//  'es-MX': require('languages\es-MX.js'),
//  'es-US': require('languages\es-US.js'),
//  'fr' : require('languages\fr.js'),
//  'fr-CA': require('languages\fr-CA.js'),
//  'fr-FR': require('languages\fr-FR.js'),
//  'it' : require('languages\it.js'),
//  'it-IT': require('languages\it-IT.js'),
//  'ja' : require('languages\ja.js'),
//  'ja-JP': require('languages\ja-JP.js'),
//  'pt' : require('languages\pt.js'),
//  'pt-BR': require('languages\pt-BR.js'),
};
```
Process the translations using this code:
```javascript
const LocalizationInterceptor = {
  process(handlerInput) {
    const localizationClient = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      resources: languageStrings,
      returnObjects: true
    });

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function (...args) {
      return localizationClient.t(...args);
    };
  },
};
```
Enable the Interceptor by adding this to the skillBuilder definition:
```javascript
.addRequestInterceptors(LocalizationInterceptor)
```
Under lambda/custom/languages, add <lang>.js and <lang>-<country>.js as needed.  Those files will be structured as:
```javascript
// en-US.js 
module.exports = {
	translation: {
		'HELLO': 'how are you in the USA?',
		/// ...
	}
}
```
Name the keys with all caps and underscores to separate words.
```javascript
'HELP_REPROMPT'
```
For strings to be translated, first setup with:
```javascript
const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
```
then you can use:
```javascript
speakOutput = requestAttributes.t('RECIPE_NOT_FOUND_MESSAGE');
```
If you want to use the sprintf functionality, use this:
```javascript
sessionAttributes.repromptSpeech = requestAttributes.t('HELP_REPROMPT', item);
```
where
```javascript
HELP_REPROMPT: 'You can say things like, what\'s the recipe for a %s, or you can say exit...Now, what can I help you with?'
```
