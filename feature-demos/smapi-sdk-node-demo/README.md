# Alexa Skills Management API (SMAPI) SDK Demo for Node.js 
This demonstration shows how to set up a Node.js project with the Alexa Skills Management API SDK and run some sample API calls to list skills for a vendor ID or get analytics data with the [Alexa Skill Metrics API](https://developer.amazon.com/en-US/docs/alexa/smapi/metrics-api.html/). 

## Prerequisites / Dependencies
* Node.js and NPM (https://nodejs.com)
* An Amazon Developer Account (https://developer.amazon.com)
* The ASK CLI (https://www.npmjs.com/package/ask-cli)

## Setup
After you've set up the prerequisites, you'll need to get your authentication information. This is comprised of three steps.

### Install the Node modules

Run `npm install` from the command line in the same directory with the demo files.

### Register a Login with Amazon Security Profile for a Web App

Make sure you're logged into developer.amazon.com with the same account you use for developing Alexa Skills.

Follow the instructions here: https://developer.amazon.com/docs/login-with-amazon/register-web.html#create-a-new-security-profile

You'll need the client ID and secret key from the profile. Add them to the tokens.js file. You can copy and paste them from there in the next step. 

### Get an access token for the API

Using the ASK CLI, run: `ask util generate-lwa-tokens`. You will be asked to provide the Client ID and Client Secret keys from the previous step. This will return the following JSON with a Refresh Token:
```javascript
{
  "access_token": "ACCESS_TOKEN",
  "refresh_token": "REFRESH_TOKEN",
  "token_type": "bearer",
  "expires_in": 3600,
  "expires_at": "2019-11-19T20:25:06.584Z"
}
```

Add that information to your tokens.js file for easy access.

## Running the Demos

### List your Alexa skills for the account

Go to https://developer.amazon.com/mycid.html to get your VendorID. Add it to your tokens.js file.

From the command line, run `node listSkills.js`. It will output a JSON list of your skills.

### Get metrics data

You'll need the skill ID from one of your skills. This can be found in the Skills Developer Console. Under each skill in your skill list, there's a small link to view the skill ID.

The [Alexa Metrics API documentation](https://developer.amazon.com/en-US/docs/alexa/smapi/metrics-api.html/) explains the different values you can (or must) use in this API call.

## Resources

SMAPI SDK: https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/tree/2.0.x/ask-smapi-sdk
Metrics API: https://developer.amazon.com/en-US/docs/alexa/smapi/metrics-api.html

