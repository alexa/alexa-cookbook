### About

VoiceInsights provides all Alexa developers powerful insights and tools to understand voice patterns, re-engage at-risk users, and build more compelling voice experiences.

Get started at http://www.voicelabs.co

### Getting started

Before you get started, you'll need an application token. Feel free to head over to http://insights.voicelabs.co/getstarted to create your analytics account and get your application token.

Typical integrations take less than 10 minutes, from account creation to seeing events in your analytics dashboard.

The Voice Insights SDK is dead simple and compatible with all popular Node.js Alexa frameworks:
 - The original Alexa Skills Kit: https://github.com/amzn/alexa-skills-kit-js
 - The new Alexa Skills Kit: https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs
 - The alexa-app framework: https://www.npmjs.com/package/alexa-app


#### End User Docs

For detailed usage information and framework-specific API docs, head out here:
http://insights.voicelabs.co/getstarted

Create your free analytics account and go to the docs section for more details:
http://insights.voicelabs.co/analytics#/settings/docs


#### Getting help
If you need help installing or using the library, please contact VoiceLabs Support at help@voicelabs.co first. VoiceLabs' customer success team is well-versed in everything related to the SDK, and will reply within 24 hours.

If you've instead found a bug in the library or would like new features added, go ahead and open issues or pull requests against this repo!

#### Quick Example

The below is an example using the original Alexa Skills Kit.

##### Initializing

Within your Alexa src/ folder, issue the following command:

```
npm install voice-insights-sdk --save
```

Note that if uploading to Lambda, it will automatically look for your node dependencies inside the node_modules folder created by installing this SDK.

Once you've installed the module, you can initialize VoiceInsights and start tracking events:

```
var APP_ID = 'amzn1.echo-sdk-ams.app.********-****-****-****-************';
...

var VoiceInsights = require('voice-insights-sdk'),
    VI_APP_TOKEN = '<your_app_token>';
```

In your Alexa app's entry point, you will need to initialize VoiceInsights before tracking events:

```
  VoiceInsights.initialize(session, VI_APP_TOKEN);
```

##### Tracking usage

Note that several of the parameters passed in are optional, but highly recommended to get the most out of your skill's analytics:

```
VoiceInsights.track(intentName, intentMetadata, speechText, callback)

@param  {String} intentName -- this is the name of the event, usually the intent name
@param  {Object} intentMetadata -- an object usually containing at least the intent slots (optional)
@param  {String} speechText -- the speech text Alexa will speak to the user (optional)
@param  {Function} callback -- required callback returns (error, response)
@return {Object} VoiceInsights
```

You can track events by simply adding this single line when handling intent requests (or other types of requests):

```
"HelloWorldIntent": function (intent, session, response) {

  ...

  VoiceInsights.track(intent.name, intent.slots, speechOutput.speech,(error, response) => {
    response.ask(speechOutput, repromptOutput);
  });

}
```
