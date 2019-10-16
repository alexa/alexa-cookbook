# Banana Stand Reminders API Demo

This code sample walks you through how to integrate the Reminders API into your skill. For addtional information, see the following complimentary material to the code:
- [Blog Tutorial](https://developer.amazon.com/blogs/alexa/post/2b4de691-9cad-4c82-86e0-98e674786742/integrate-the-reminders-api-with-your-skill-to-deepen-customer-engagement1)
- [YouTube Tutorial](https://youtu.be/eF7R4BEFu5c)

## What You Will Need
*  [Amazon Developer Account](http://developer.amazon.com/alexa)
*  [Amazon Web Services Account](http://aws.amazon.com/)
*  The sample code on [GitHub](https://github.com/alexa/alexa-cookbook/tree/master/feature-demos/skill-demo-reminders-api-banana-stand/).
*  An Alexa device which supports reminders (e.g. Amazon Echo)

## Setting Up the Demo
This folder contains the interaction model and skill code.  It is structured to make it easy to deploy if you have the ASK CLI already setup.  If you would like to use the Developer Portal, you can follow the steps outlined in the [Hello World](https://github.com/alexa/skill-sample-nodejs-hello-world) example, substituting the [Model](./models/en-US.json) and the [skill code](./lambda/custom/index.js) when called for.

## Running the Demo
```
You: Alexa, open banana stand.

Alexa: Welcome to the banana stand, would you like a reminder a one p. m. to get a banana?

You: Yes.

Alexa: You succesfully scheduled a daily reminder at one p. m. to get a banana.
```
#### Note: 
- You will need to grant reminders permissions to the skill using the Alexa app.
- Attempting a one shot to create the reminder may trigger the built in reminder functionality.
- Reminders are not supported in the Alexa developer console simulator.

## Related Content

- [Alexa Reminders API Overview](https://developer.amazon.com/docs/smapi/alexa-reminders-overview.html)
- [Alexa Reminders Guidelines for Usage](https://developer.amazon.com/docs/smapi/alexa-reminders-guidelines-for-usage.html)
- [Alexa Reminders API Reference](https://developer.amazon.com/docs/smapi/alexa-reminders-api-reference.html)
- [Alexa Reminders API Best Practices](https://developer.amazon.com/docs/smapi/alexa-reminders-guidelines-for-usage.html#best-practices-for-coding-reminders-in-your-skill)
- [Calling Alexa Service APIs](https://ask-sdk-for-nodejs.readthedocs.io/en/latest/Calling-Alexa-Service-APIs.html)
- [Reminder Management Service Client](https://ask-sdk-for-nodejs.readthedocs.io/en/latest/Calling-Alexa-Service-APIs.html#remindermanagementserviceclient)
- [Example Reminders API Skill on GitHub](https://github.com/alexa/alexa-cookbook/blob/master/feature-demos/skill-demo-reminders/lambda/custom/index.js)
- [Moment.js Timezone](https://momentjs.com/timezone/)
- [Obtain User’s Timezone with Alexa Settings API](https://developer.amazon.com/docs/smapi/alexa-settings-api-reference.html#get-the-time-zone)
- [Setting Up an Alexa-hosted Skill YouTube Video](https://youtu.be/2NcvI7wTXrU)
- [Integrate the Reminders API with Your Skill to Deepen Customer Engagement YouTube Video](https://youtu.be/eF7R4BEFu5c)
