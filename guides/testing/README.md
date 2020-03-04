## Testing <a id="title"></a>
### Does my skill work?

 You can test your skill in a number of ways.   You do NOT need to publish your skill before you can begin testing and using it on any of your devices.

 + Type in your utterance to the Service Simulator, within the Test page of your skill on the [Developer Portal](https://developer.amazon.com/edw/home.html#/skills/list).
 + Launch [EchoSim.IO](https://echosim.io), the browser based testing tool.  Toggle your Language setting via a link near the top right, such as ```EN-US```, ```EN-GB```, ```DE-DE```.
 + Your skill can be launched on any Alexa device you own or have registered, such as [Echo](https://www.amazon.com/echo), [Tap](https://www.amazon.com/tap), or [Dot](https://www.amazon.com/dot).
 + You can test your Lambda code from the [Lambda Console](https://console.aws.amazon.com/lambda/home). Click **Actions**, **Configure Test Event**, and select or paste in some test request json.
 + You can review the [Cloudwatch Logs](https://console.aws.amazon.com/cloudwatch/home#logs:) to see standard output from your Lambda function executions.  Just click on Logs and then click on the log group with the same name as your function.

#### Local Testing

If you manage your Lambda code in a local folder on your laptop, you can test your code with a unit test command.  Choose any one of the testing options here:

   + You can write another javascript script that calls your skill code directly.  Navigate to the tests folder, such as [Cookbook/ExternalCalls/httpsGet/tests](https://github.com/alexa/alexa-cookbook/tree/master/external-calls/httpsGet/tests) and type ```node test.js```
   + You can define and run a local test in your ```src/package.json``` configuration file, under the ```scripts``` section.  Verify the *test* command and then type in the command: ```npm test``` to a terminal prompt.
   + You can define and use a remote test in your ```src/package.json``` configuration file, under the ```scripts``` section.  Verify the *invoke* command and then type in the command: ```npm invoke``` to a terminal prompt.  This will test the function that exists within AWS Lambda.  You will need to have previously installed and configured the [AWS CLI](https://developer.amazon.com/blogs/post/Tx1UE9W1NQ0GYII/publishing-your-skill-code-to-lambda-via-the-command-line-interface) for this to work.

If the test works, you should see a formatted JSON response similar to this:

```
{
	"version": "1.0",
	"response": {
		"outputSpeech": {
			"type": "SSML",
			"ssml": "<speak> The population of New Jersey is 9000000 </speak>"
		},
		"shouldEndSession": true
	},
	"sessionAttributes": {}
}
```

#### TestFlow
You can run a sequence of conversation events as a local test and view formatted results in your console window.

Go to [TestFlow](TestFlow)

<img src="https://m.media-amazon.com/images/G/01/cookbook/testflow_default._TTH_.png" alt="TestFlow" width="411" height="245">


#### See also
Read about Node.JS and other tools in the folder: [tools](../tools#title)


<hr />

Back to the [Home Page](../README.md#title)

