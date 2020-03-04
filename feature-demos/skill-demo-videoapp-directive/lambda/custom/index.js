const Alexa = require('ask-sdk-core');

const HELP_MESSAGE = 'This is a simple demo. Just open the skill to see the video.';
const ERROR_MESSAGE = 'Sorry, an error occurred in the demo. Please check the logs.';
const STOP_MESSAGE = 'Goodbye!';
// NOTE: set the video url location below

function supportsVideo(handlerInput) {
  const hasVideo =
    handlerInput.requestEnvelope.context &&
    handlerInput.requestEnvelope.context.System &&
    handlerInput.requestEnvelope.context.System.device &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
    handlerInput.requestEnvelope.context.System.device.supportedInterfaces.VideoApp;

  console.log(`Supported Interfaces are ${JSON.stringify(handlerInput.requestEnvelope.context.System.device.supportedInterfaces)}`);
  return hasVideo;
}

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    // video location
    const videoUrl = 'https://s3.amazonaws.com/ask-samples-resources/videos/underconfirmation.mp4';
    // Use this isntead if you want to use your own video and your skill is Alexa-hosted. Be sure to require the util.js file
    // const util = require('util.js');
    // const videoUrl = util.getS3PreSignedUrl('Media/myVideo.mp4');
    
    if (supportsVideo(handlerInput)) {
      handlerInput.responseBuilder.addVideoAppLaunchDirective(videoUrl, 'Video Sample Title', 'Video Subtitle');

      return handlerInput.responseBuilder.speak('Here\'s your video. Enjoy!').getResponse();
    }
    return handlerInput.responseBuilder
      .speak('This demo includes a video. Please use a device which supports video, for example, the Echo Show.')
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
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
    console.log(`Error handled: ${error.stack}`);

    return handlerInput.responseBuilder
      .speak(ERROR_MESSAGE)
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    HelpIntentHandler,
    ExitHandler,
    SessionEndedRequestHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .withCustomUserAgent('cookbook/videoapp-directive/v1')
  .lambda();
