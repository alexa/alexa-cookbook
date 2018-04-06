# Locale detection for Multi-Language Alexa Skill.

Say you're building a audio skill that has several audio files for different languages and you want to serve the audio file based upon the user's locale.
For instance, if your skill supports both German and English (IN), the same code must:

    Take a German request and respond to the user with German Audio file.
    Take an English (IN) request and respond to the user with Hindi audio file.

You can determine the language/locale used to invoke the skill by checking the locale property  included in all requests sent to your service (for example, 'LaunchRequest' or 'IntentRequest').

The locale property is part of the request object:

    {
      "request": {
        "type": "LaunchRequest",
        "requestId": "EdwRequestId.00000000-0000-0000-0000-000000000000",
        "timestamp": "2016-06-14T20:59:24Z",
        "locale": "en-US"
      }
    }

You can check this using `this.event.request.locale` 

You can drop the following helper code,to easily provide locale based resources.
```
//Initialize the data for various locales
//Initializing all English language resources
let en = { 
  url: 'https://audio1.maxi80.com',
  startJingle : 'https://s3.amazonaws.com/alexademo.ninja/maxi80/jingle.m4a'
}

//Initializing English India resources
let india = {
  url: 'https://audio1.maxi80.com',
  startJingle : 'https://s3.amazonaws.com/alexademo.ninja/maxi80/jingle.m4a'
}

//Initializing German resources
let de = {
  url: 'https://audio1.maxi80.com',
  startJingle : 'https://s3.amazonaws.com/alexademo.ninja/maxi80/jingle.m4a'
};

//Map the resource data to locale value sent in every Alexa request
let globalResourceData = {
    'en-US': en,
    'en-GB': en,
    'en-CA': en,
    'en-IN': india,
    'en-AU': en,
    'de-DE': de
};

function resourceData(request) {
    let DEFAULT_LOCALE = 'en-US';
    var locale = request === undefined ? DEFAULT_LOCALE : request.locale;
    if (locale === undefined) {
        locale = DEFAULT_LOCALE
    };
    return globalResourceData[locale];
}
```

Sample code to test this helper function inside an intent handler
```
let request = this.event.request;
console.log("URL value is "+resourceData(request).url);
```

For a more in-depth look at using locale specific values and leveraging this helper function see [Single Stream Audio Skill](https://github.com/alexa/skill-sample-nodejs-audio-player/blob/mainline/single-stream).
Check out the [audioAssets.js](https://github.com/alexa/skill-sample-nodejs-audio-player/blob/mainline/single-stream/lambda/src/audioAssets.js).

## Food for thought

As written this code determines the users locale to fetch the data dynamically.If you are serving resources like images/audio/video files in your skill using AWS S3, It might be a good idea to host these resources on a S3 bucket hosted in AWS region closer to the end user,You can use this code as a starting point and modify as necessary to fetch the S3 url's as per user's locale.
Doing so will reduce the latency in serving these static assets.
