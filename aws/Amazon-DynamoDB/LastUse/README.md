#### Ingredients
## Last Use <a id="title"></a>
Your skill can set and get custom attributes using `alexa-sdk` and DynamoDB to keep track of the time since the user has last used the skill.
The skill can then give appropriate responses.
For example, the skill may give a shorter Help message if the user has used the skill recently,
or may give a special welcome message for the very first time the user launches the skill.


### Instructions for deploying this sample skill

1. Complete Lab 8 within [labs/HelloWorld](https://github.com/alexa/alexa-cookbook/blob/master/labs/HelloWorld/README.md) to configure your AWS environment for persistent database storage.

 * Your Lambda IAM role, typically called ```lambda_basic_execution```, will now have rights to use DynamoDB.
 * You should also have a DynamoDB table, such as ```YourTableName``` . This table can be used by multiple skills.
 

#### Continue to the next step
[Part 2 - Create the skill](./PAGE2.md#title)

<hr />

Back to the [Home Page](../../README.md#title)
