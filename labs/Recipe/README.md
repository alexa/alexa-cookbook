[Detailed Setup](Detailed-Setup-Instructions/voice-user-interface)
## What You Will Learn
Have you ever played music and needed to pause in the middle of a song? What about ordering a pizza online? If you've started an order, then leave the page, when you come back you have the option to complete your previous order. In both cases, upon our return, we have the option of continuing right where we left off, or starting over from the beginning. By persisting information in a database, we can give Alexa the capability to store a memory of a recent conversation just as a human would. Which will lead to a more natural, conversational feel to your skill from a user's perspective.

This lab will teach you how to use a database to persist information so users can pause and resume a skill, or exit then return to the same place in the conversation that they had left off.

*  [AWS Lambda](http://aws.amazon.com/lambda)
*  [Alexa Skills Kit (ASK)](https://developer.amazon.com/alexa-skills-kit)
*  Voice User Interface (VUI) Design
*  Skill Certification
*  Session Attributes
*  Cross session persistence

## What You Will Need
*  [Amazon Developer Portal Account](http://developer.amazon.com)
*  [Amazon Web Services Account](http://aws.amazon.com/)
*  The sample code on [GitHub](#).

## What your Skill Will Do <a id="intro"></a>
This skill will walk the user through the steps of a recipe and remember what step you were on.

### Task 1: Build the Skill
Create your skill using the Lambda code given in [src/index.js](src/index.js) and the [Interaction Model](speechAssets/InteractionModel.json) (We've also included a simple [test file](test.json) for your lambda function). If you're comfortable completing this step on your own, feel free to complete it with the steps below as a reference and move to Task 2 once complete. Otherwise, follow the steps in the [Detailed Setup Instructions](Detailed-Setup-Instructions/voice-user-interface).

*1.1 Create a new AWS Lambda function:*
  1. Choose the **Fact** blueprint template.
  1. Setup "Alexa Skills Kit" as the function trigger.
  1. Name the function. Choose any name. We used: ```BreakfastSandwich```
  1. Replace the existing code by pasting in the code from [src/index.js](src/index.js).
  1. Choose your default role ```lambda_basic_execution```
  1. Click "Create Function"

*1.2 Create a new skill*
  1. Call the skill "Breakfast Sandwich" with invocation name of your choice. We used ```breakfast sandwich```
  1. Launch "Skill Builder Beta"
  1. Click the Code Editor tab (just below the turqoise Dashboard tab on the top left)
  1. Copy and paste the ```speechAssets/InteractionModel.json``` contents into the field over the existing text.
  1. Click Save, then click Build
  1. Advance to the Configuration page, choose AWS Lambda ARN, and paste in the ARN from the function you just created.

### Task 2: Enable Permissions
We can configure a DynamoDB database table to remember which step the user was on when they stop or pause the skill.
When you create a new skill, the default permissions are set to the lowest-needed to run a basic skill. We want our skill to do more, so we will need to add the permission to have full access to DynamoDB.
Once our database is configured, we can have our skill prompt the user to continue with the next step when re-launching the skill.

We will need to prepare our skill's Lambda function to use a database called [DynamoDB](https://aws.amazon.com/dynamodb/).

If you've never done this before or need a refresher, follow the steps below which walk you through how to enable permission for a database before we define it within our Lambda function. If you're comfortable doing this on your own, go ahead and move on to Task 3 once you've added the permission.

#### Configure Permissions for DynamoDB
Steps:
1. Open a browser to the [AWS Console](https://aws.amazon.com/console). Or, simply go to that tab if you've still got it open, then click the orange cube in the top left corner to return to the AWS main page.
1. In the search box titled **AWS services**, type ```IAM``` then click the option reading **IAM** (Manage User Access and Encryption Keys)
1. On the new page reading **Welcome To Identity and Access Management** your navbar to the left should have an option called **Roles**. Click that.
1. On this page, you should see the name of your standard Lambda role, ```lambda_basic_execution```. Click the role name.
1. In the **Permissions** tab, under "Managed Policies", click the blue button titled "Attach Policy"
1. In the filter field, type "dynamo" and then locate the policy named ```DynamoDBFullAccess``` and click the checkbox.
1. Click "Attach Policy"

### Task 3: Enable Database
Now that we've added permission to our database, it's time to enable it within our Lambda function. In the source code provided, uncomment the line that looks like this: ```// alexa.dynamoDBTableName = 'RecipeSkillTable'; ``` Again, if you are familiar with this process or understand what you just did, move on to the next task. If not, refer to the section below.

#### Enable the table within your Lambda code
Steps:
1. Review your Lambda function code within the AWS Lambda console.
1. Locate the line ```// alexa.dynamoDBTableName = 'RecipeSkillTable'; ```
1. Uncomment this line by removing the first two ```//``` characters.
1. Scroll up and click the blue "Save" button.
1. Click Save.
1. Click Test.  
1. Open the skill using [echosim.io](https://echosim.io). Once it's up and ready, say "begin cooking", and then say "stop".  You may encounter errors the first couple of times the skill runs.  This is okay.  The skill code is setting up a new table in DynamoDB which may take 60 seconds to complete.

### Task 4: Test

Practice speaking to the skill a few times to learn all the features of the skill.
When you ask for "ingredients", you will hear both a list of ingredients, and see a picture of a breakfast sandwich on your Alexa app or Echo Show screen, if you have one.

When you ask to "begin cooking", the skill will guide you through each step in the process.

### Extra Credit
These are some suggestions for building and customizing this recipe skill

#### Add Additional Recipes

Currently this skill tells you how to make one kind of sandwich. Expand your skill to allow users to choose a recipe first, and then hear the recipe. You'll probably want to add some new intents to prompt your users for a type of sandwich if they fail to specify (Hint: If you opt for a custom slot, you may want to make it required to fulfill the intent. The skill builder tool has a way to do this.) Reading and understanding the code provided, then modifying it is a great way to understand what you just built.

#### Add More Card images

If you looked through the source code for this skill, you probably noticed that we have a welcome card image being used. Enhance your current skill by displaying different images according to the state of your skill.
