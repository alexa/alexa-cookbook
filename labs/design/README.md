
### Alexa Skill Building Cookbook
## Labs <a id="title">Alexa Design Lab</a>

In this lab, you'll use a design process to help you think through making a voice experience.

Human conversation is about exchanging meaning in ways that make sense in the current situation. Expressing and extracting meaning is not as simple as it may seem, and you’ll need to design conversations between Alexa and your customers carefully and intentionally. A great voice experience allows for the many ways people might express meaning and intent.

Conversational UI consists of turns starting with a person saying something, followed by Alexa responding. This is a new form of interaction for many people, so make sure that you’re aware of the ways in which users participate in the conversation so that you can design for it.

[Learn more about Intents, Utterances, and slots in this video](https://youtu.be/JwUxY2-kIbg)


### Task 1: Dialog Sketch ###
  Start with what people want to accomplish, and determine the capabilities of your skill and the benefits of using it.
#### 1.1 Identify purpose ####
  Describe one or more scenarios in which people will find your skill useful and desirable. Determine the capabilities of the skill by asking the following questions:
  * What is the purpose of the skill? Why will people want to use it?
  * What will the person be doing before, during, and after interacting with the skill?
  * What will people get from the skill that they cannot get another way?

#### 1.2 Write happy path scripts ####
Show the core value and experiences by writing 1-4 scripts between the user and Alexa. For this lab, assume that everything works perfectly. These are happy path scripts. For this, you can use a word processor, or paper and a template like this: [Alexa Dialogue Design](https://www.amazon.com/clouddrive/share/5WMoGXcKHSWWSoRiC3VNFmBnEveQBdPnLZq711Iu3d?ref_=cd_ph_share_link_copy)

### Task 2: Add User Flows ###
A basic script doesn’t fully represent how people will interact with your skill in real life. Users may say too little, too much, or say things that you weren’t expecting. Use the following techniques to expand your script and catch various ways in which a user might accomplish tasks
#### 2.1 Identify Intents ####
Intents represent the unique things that your skill is able to do. A skill for planning a trip might have five intents, for example PlanATrip, BookTheTrip, Stop, Cancel, and Help.
#### 2.2 Identify Utterances ####
Utterances include the robust list of words, phrases, and sentences users will say to engage and fulfill the intent. For example, to use the PlanATrip intent, the user might say “Plan a trip,” “Plan a trip for next Friday,” or “Plan a hiking trip to Portland.”
#### 2.3 Identify Slots ####
Slots allow people to specify variable parts of an utterance, for example city or date. Slots are common in task- and information-focused skills. Design how the slots show up in utterances, and then choose slot values from the built-in catalog or provide your own slot values. In the following example utterances, {toCity} and {travelDate} are slots:

* “I’d like to go to {toCity}”
* “book a trip for {travelDate}”
* “plan a vacation to {toCity}”

For this task, you can use [more detailed dialog sketches](https://www.amazon.com/clouddrive/share/PLKDyDip6Jv1HK450NTTGzJZJB4QjDyYxTMlQgmWDCQ?ref_=cd_ph_share_link_copy)

### Task 3: Implement your design in skill builder ###
You'll bring your design to life using the Alexa Skill Builder. This is where you add your intents, utterances, and slots to create an interaction model.

#### 3.1 Create a new skill ####
Go to the [Amazon Developer Portal](https://developer.amazon.com) and add a new skill. Then, after filling out the skill information, click the skill builder beta on the interaction model page. For detailed step by step instructions [see steps 1-6 ](https://github.com/alexa/alexa-cookbook/blob/master/handling-responses/dialog-directive-delegate/step-by-step/1-voice-user-interface.md)
#### 3.2 Create intents, utterances, and slots ####
In the skill builder, click the intent ```ADD+``` button and add your intents.

![Add Intent Button](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/1-8-intents-button._TTH_.png)

Then, for each intent, add your sample utterances and slots. For example, “I’d like to go to {toCity}” and “book a trip for {travelDate}” where ```{toCity}``` and ```{travelDate}``` are slots. Finally, for each slot, assign or create a slot type. For detailed step by step instructions [see steps 7.2-7.10 ](https://github.com/alexa/alexa-cookbook/blob/master/handling-responses/dialog-directive-delegate/step-by-step/1-voice-user-interface.md)
Click on the **Save Model** button, and then click on the **Build Model** button.

  ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/1-12-skill-builder-build-save-model._TTH_.png)

#### 3.3 Create the full skill ####
Now that you have your VUI design sketched out and implemented in the skill builder, it's time to create the web service backend where all the logic will happen.

##### 3.3.1 create a lambda function #####
Create an alexa skill [AWS Lambda](https://aws.amazon.com/lambda/) function using the blueprint for "alexa-skill-kit-sdk-factskill". We'll replace all the code for that skill but it's a fast way to get up and running. In case you need, here's a [step by step guide](https://github.com/alexa/skill-sample-nodejs-fact/blob/master/step-by-step/2-lambda-function.md) for building a skill using that blueprint.

##### 3.3.2 generate the code from your interaction model #####
From the skill builder, click ```code editor``` and copy your interaction model. Then paste that into the [skill code generator](https://skillinator.io) and click ```Generate```. This will produce code for your Lambda function. Copy this code (from the Lambda Template box) and paste it over the fact skill code you created in step 3.3.1. To do this, go to [your lambda function](https://aws.amazon.com/lambda/) and click the code tab. Select all the code and delete it. Then paste in the code for your new skill (from the Lambda Template box) and click save. As a final step, copy the ARN value from the top right corner of the screen. You will need this value in the next section of this guide.
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/fact/2-12-copy-ARN._TTH_.png" />

##### 3.3.3 Connect your VUI to your Lambda Function and test #####
Go to your skill on developer.amazon.com and click on the configuration tab (you may already be there). Choose AWS, North America, and paste your ARN and you're ready to test. For detailed steps see the [step by step guide](https://github.com/alexa/skill-sample-nodejs-fact/blob/master/step-by-step/3-connect-vui-to-code.md).
