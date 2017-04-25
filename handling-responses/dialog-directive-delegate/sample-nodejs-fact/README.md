This sample adds the delegate dialog directive to the fact skill.

1. Build the fact skill using the detailed instructions at https://github.com/alexa/skill-sample-nodejs-fact. The high-level steps are:
    1. Go to aws.amazon.com, create a new lambda function
    1. BLUEPRINT: alexa-skill-kit-sdk-factskill
    1. TRIGGER: Alexa Skills Kit
    1. NAME is up to you
    1. CODE: replace the code with this [dialog directive fact code](https://github.com/Alexa/alexa-cookbook/tree/master/handling-responses/dialog-directive-delegate/sample-nodejs-fact/src/index.js)
    1. ROLE: "Create new role from template"
    1. ROLE NAME is up to you
    1. POLICY TEMPLATE: Simple Microservice Permissions

2) Sign into to developer.amazon.com and go to https://developer.amazon.com/edw/home.html#/skills
    1. Add a new skill
    1. SKILL NAME is up to you
    1. INVOCATION NAME is up to you
    1. On the interaction model page, click "Launch Skill Builder Beta"
    1. Click ```Code Editor```
    1. Paste the [interaction model](https://github.com/Alexa/alexa-cookbook/tree/master/handling-responses/dialog-directive-delegate/sample-nodejs-fact/speech-assets/InteractionModel.json)
    1. Choose ```Build Model``` and then `configuration`
    1. Copy the ARN from your AWS Lambda function and paste it into the `North America` field.

3) Test your skill on a device. Open your skill using your invocation name and then say "Calculate Travel Time"

4) Things to try
    1. Add a GetJoke intent without any slots
    1. Add an optional slot for vehicle and utterances with values of car, jet, concorde, rocket, and light.
    1. Add a **GetWeather** intent that expects a slot called Planet
