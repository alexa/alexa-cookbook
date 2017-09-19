#### Ingredients
## ssml-speechcons <a id="title"></a>
<hr />


#### What you will learn
This ingredient shows how to add special emphasis to key phrases within your speech output response.

```js
var speechOutput = "aha, this is a phrase with speechcons, well done.";

console.log(addSpeehconSSML(speechOutput));  // includes ssml tags

// <say-as interpret-as="interjection"> aha </say-as>

```

#### Instructions for deploying this sample skill

1. Create a new AWS Lambda function using the fact blueprint.
1. Delete the code, replace with [index.js](index.js)
1. Locate and Copy the AWS Lambda ARN for the new function.
1. Create a skill such as Hello World.
1. On the Configuration page, paste in your Lambda ARN as the endpoint.
1. Test your skill by listening for the ssml response.

* Copy the ```addSpeehconSSML()``` helper function to use in your code.

<hr />



