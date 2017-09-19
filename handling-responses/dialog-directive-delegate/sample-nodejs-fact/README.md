This sample adds the delegate dialog directive to the fact skill.

1) Build the fact skill using the detailed instructions at https://github.com/alexa/skill-sample-nodejs-fact. The high level steps are.


- Go to aws.amazon.com, create a new lambda function
- BLUEPRINT: alexa-skill-kit-sdk-factskill
- TRIGGER: Alexa Skills Kit
- NAME is up to you
- CODE: replace the code with this [dialog directive fact code](https://github.com/Alexa/alexa-cookbook/tree/master/handling-responses/dialog-directive-delegate/sample-nodejs-fact/src/index.js)
- ROLE: "Create new role from template"
- ROLE NAME is up to you
- POLICY TEMPLATE: Simple Microservice Permissions

2) Sign into to developer.amazon.com and go to https://developer.amazon.com/edw/home.html#/skills


- Add a new skill
- SKILL NAME is up to you
- INNVOCATION NAME is up to you
- On the interaction model page, click "Launch Skill Builder Beta"
- Click ```Code Editor```
- Paste the [interaction model](https://github.com/Alexa/alexa-cookbook/tree/master/handling-responses/dialog-directive-delegate/sample-nodejs-fact/speech-assets/InteractionModel.json)
- Choose ```Build Model``` and then ```configuration```
- copy the ARN from your AWS Lambda function and paste it into the ```North America``` field.

3) Test your skill on a device. Open your skill using your invocation name and then say "Calculate Travel Time"

4) Things to try
- Add a GetJoke intent without any slots
- Add an optional slot for vehicle and utterances with values of car, jet, concorde, rocket, and light.
- Add a GetWeather intent that expects a slot called Planet
