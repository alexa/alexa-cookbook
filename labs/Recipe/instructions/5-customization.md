# Build An Alexa Recipe Skill
[![Voice User Interface](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-locked._TTH_.png)](./1-voice-user-interface.md)[![Lambda Function](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-locked._TTH_.png)](./2-lambda-function.md)[![Connect VUI to Code](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-locked._TTH_.png)](./3-connect-vui-to-code.md)[![Testing](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-locked._TTH_.png)](./4-testing.md)[![Customization](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-on._TTH_.png)](./5-customization.md)[![Publication](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-off._TTH_.png)](./6-publication.md)

## Customize the Skill to be Yours

At this point, you should have a working copy of our Recipe skill.  In order to make it your own, you will need to customize it with data and responses that you create.  Here are the things you will need to change:

1.  **Add additional recipes** Currently this skill tells you how to make one kind of sandwich. Expand your skill to allow users to choose a recipe first, and then hear the recipe. You'll probably want to add some new intents to prompt your users for a type of sandwich if they fail to specify (Hint: If you opt for a custom slot, you may want to make it required to fulfill the intent. The skill builder tool has a way to do this.) Reading and understanding the code provided, then modifying it is a great way to understand what you just built.

    1.  **Open a copy of index.js.** If you haven't already downloaded the code for this project, [you can find a copy of index.js here on GitHub](../lambda/custom/index.js).  You can use a simple, lightweight code editor like [Atom](http://atom.io), [Sublime Text](http://sublimetext.com), or [VSCode](http://code.visualstudio.com), but you also have the option to edit the code directly in your Lambda function.

    2.  **Search for the comment "TODO: Replace this data with your own."**  This is the data for our skill.  You can see that it is a recipe for a simple (albeit tasty!) sandwich.

    3.  **When you have replaced the data in index.js, copy the contents of your file to your Lambda function.**  This should be as simple as copying the text, and pasting it into the code box for your Lambda.

        <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/fact/5-1-5-lambda-code-box._TTH_.png" />

2. **Allow a user to exit the skill then resume the instructions where they left off.**

    1. **Enable Permissions**  We can configure a DynamoDB database table to remember which step the user was on when they stop or pause the skill.
    When you create a new skill, the default permissions are set to the lowest-needed to run a basic skill. We want our skill to do more, so we will need to add the permission to have full access to DynamoDB.
    Once our database is configured, we can have our skill prompt the user to continue with the next step when re-launching the skill.

    We will need to prepare our skill's Lambda function to use a database called [DynamoDB](https://aws.amazon.com/dynamodb/).

    If you've never done this before or need a refresher, follow the steps below which walk you through how to enable permission for a database before we define it within our Lambda function. If you're comfortable doing this on your own, go ahead and move on to Task 3 once you've added the permission.

      1. **Configure Permissions for DynamoDB**
        Steps:
        1. Open a browser to the [AWS Console](https://aws.amazon.com/console). Or, simply go to that tab if you've still got it open, then click the orange cube in the top left corner to return to the AWS main page.
        2. In the search box titled **AWS services**, type ```IAM``` then click the option reading **IAM** (Manage User Access and Encryption Keys)
        3. On the new page reading **Welcome To Identity and Access Management** your navbar to the left should have an option called **Roles**. Click that.
        4. On this page, you should see the name of your standard Lambda role, ```lambda_basic_execution```. Click the role name.
        5. In the **Permissions** tab, under "Managed Policies", click the blue button titled "Attach Policy"
        6. In the filter field, type "dynamo" and then locate the policy named ```DynamoDBFullAccess``` and click the checkbox.
        7. Click "Attach Policy"

      2. **Enable Database**  Now that we've added permission to our database, it's time to enable it within our Lambda function. In the source code provided, uncomment the line (around line 53) that looks like this: ```// alexa.dynamoDBTableName = 'RecipeSkillTable'; ``` Also, verify or modify the region setting around line 44.  For developers building in the Ireland region, set this region to ```eu-west-1``` instead of the default ```us-east-1```.  Again, if you are familiar with this process or understand what you just did, move on to the next task. If not, refer to the section below.

        1. **Enable the table within your Lambda code**
          Steps:
          1. Review your Lambda function code within the AWS Lambda console.
          2. Locate the line ```// alexa.dynamoDBTableName = 'RecipeSkillTable'; ```
          3. Uncomment this line by removing the first two ```//``` characters.
          4. Scroll up and click the blue "Save" button.
          5. Click Save.
          6. Click Test.  
          7. Test the skill using the testing method covered in the [previous step](./4-testing.md). To start, say "begin cooking", and then say "stop".  You may encounter errors the first couple of times the skill runs.  This is okay.  The skill code is setting up a new table in DynamoDB which may take 60 seconds to complete.

3. **Add more card images**  If you looked through the source code for this skill, you probably noticed that we have a welcome card image being used. Enhance your current skill by displaying different images according to the state of your skill.

4.  **New sentences to respond to your users.** There are several sentences and responses that you will want to customize for your skill.

    1.  **Go back to your copy of [index.js]((../lambda/custom/index.js)).**

    2.  **Look for the collection of phrases title "languageStrings"** This is the beginning of the section where you need to customize several text strings for your skill.

    3.  **Continue through the set of phrases until you reach the bottom of the file.**  This will ensure that you cover each of the values that you need to update.

5.  **New language.** If you are creating this skill for another language other than English, you will need to make sure Alexa's responses are also in that language.

    *  For example, if you are creating your skill in German, every single response that Alexa makes has to be in German.  You can't use English responses or your skill will fail certification.

6.  **Once you have made the updates listed on this page, you can click "Next" to move on to Publishing and Certification of your skill.**

    <a href="./6-publication.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/3-7-next-button._TTH_.png" /></a>

<br/><br/>
<a href="./6-publication.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_next_publication._TTH_.png" /></a>

<img height="1" width="1" src="https://www.facebook.com/tr?id=1847448698846169&ev=PageView&noscript=1"/>
