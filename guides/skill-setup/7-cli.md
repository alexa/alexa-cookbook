# Build An Alexa Hello World Skill
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/header._TTH_.png" />

## Setup w/ ASK CLI

### About
This readme assumes you have your developer environment ready to go and that you have some familiarity with CLI (Command Line Interface) Tools, [AWS](https://aws.amazon.com/), and the [ASK Developer Portal](https://developer.amazon.com/alexa-skills-kit?&sc_category=Owned&sc_channel=RD&sc_campaign=Evangelism2018&sc_publisher=github&sc_content=Content&sc_detail=hello-world-nodejs-V2_CLI-1&sc_funnel=Convert&sc_country=WW&sc_medium=Owned_RD_Evangelism2018_github_Content_hello-world-nodejs-V2_CLI-1_Convert_WW_beginnersdevs&sc_segment=beginnersdevs). If not, [click here](./1-voice-user-interface.md) for a more detailed walkthrough.

### Pre-requisites

* Node.js (> v8)
* Register for an [AWS Account](https://aws.amazon.com/)
* Register for an [Amazon Developer Account](https://developer.amazon.com?&sc_category=Owned&sc_channel=RD&sc_campaign=Evangelism2018&sc_publisher=github&sc_content=Content&sc_detail=hello-world-nodejs-V2_CLI-1&sc_funnel=Convert&sc_country=WW&sc_medium=Owned_RD_Evangelism2018_github_Content_hello-world-nodejs-V2_CLI-1_Convert_WW_beginnersdevs&sc_segment=beginnersdevs)
* Install and Setup [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html?&sc_category=Owned&sc_channel=RD&sc_campaign=Evangelism2018&sc_publisher=github&sc_content=Content&sc_detail=hello-world-nodejs-V2_CLI-1&sc_funnel=Convert&sc_country=WW&sc_medium=Owned_RD_Evangelism2018_github_Content_hello-world-nodejs-V2_CLI-1_Convert_WW_beginnersdevs&sc_segment=beginnersdevs)

### Installation
1. **Make sure** you are running the latest version of the CLI

	```bash
	npm update -g ask-cli
	```

1. If it's your first time using it, **initialize** the [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html?&sc_category=Owned&sc_channel=RD&sc_campaign=Evangelism2018&sc_publisher=github&sc_content=Content&sc_detail=hello-world-nodejs-V2_CLI-1&sc_funnel=Convert&sc_country=WW&sc_medium=Owned_RD_Evangelism2018_github_Content_hello-world-nodejs-V2_CLI-1_Convert_WW_beginnersdevs&sc_segment=beginnersdevs) by navigating into the repository and running npm command: `ask init`. Follow the prompts.

	```bash
	ask init
	```
1. **Create** the skill from a template by using the wizard or specifying the template source
	1. Start the wizard by using the `ask new` command: (For the sake of this guide, we'll choose **Node.js V8** and **Hello World**, however a comparable process can be used if you select Python or any other of the templates.)
		```bash
		ask new

		? Please select the runtime (Use arrow keys)
		> Node.js V8
  		Python3

		? List of templates you can choose (Use arrow keys)
		> Hello World
			Buttons ColorChanger
			City Guide
			Decision Tree
			Fact
			Feed
			Foodie
		(Move up and down to reveal more choices)

		? Please type in your skill name:  (skill-sample-nodejs-hello-world) <skill-name>

		Skill "<skill-name>" has been created based on the chosen template		
		```
	1. Alternatively, create the skill by specifying the template source when using the `ask new` command with the `--url` option:
		```bash
		ask new --url https://github.com/alexa/skill-sample-nodejs-hello-world.git
		```

1. (Optional) Prior to deploying, the ASK CLI will automatically install any required dependencies specified in the package.json.  You can do this manually by navigating into the `/lambda/custom` directory and running the npm command: `npm install`

	```bash
	cd lambda/custom
	npm install
	```
> Note: the dependencies can also be installed by using AWS Lambda Layers.  For more information on how to do that, click [here](https://alexa.design/using-lambda-layers)

### Deployment

ASK CLI **will create the skill and the Lambda function for you**. The Lambda function will be created in ```us-east-1 (Northern Virginia)``` by default.

1. Navigate to the project's root directory. you should see a file named 'skill.json' there.
1. Deploy the skill and the Lambda function in one step by running the following command:

	```bash
	ask deploy
	```

### Testing

1. Enabling testing for the skill should be the last step in the deploy process.  The following steps assume you are still in the project's root directory.

1. Simulate verbal interaction with your skill through the command line using the following example:

	```bash
	ask simulate -l en-US -t "start Hello World"

	 ✓ Simulation created for simulation id: 4a7a9ed8-94b2-40c0-b3bd-fb63d9887fa7
	◡ Waiting for simulation response{
	  "status": "SUCCESSFUL",
	  ...
	 ```
1. Start a dialog with your skill using the `ask dialog` command.
```bash
ask dialog -l en-US
```

1. You can also test out your skill on devices associated with the developer account. Speak to Alexa from any enabled device, from your browser at [echosim.io](https://echosim.io/welcome), using Alexa for PC, or through your Amazon Mobile App and say :

	```text
	Alexa, start hello world
	```
## Customization

1. ```./skill.json```

   Change the skill name, example phrase, icons, testing instructions etc ...

   Remember than many information are locale-specific and must be changed for each locale (e.g. en-US, en-GB, de-DE, etc.)

   See the Skill [Manifest Documentation](https://developer.amazon.com/docs/smapi/skill-manifest.html?&sc_category=Owned&sc_channel=RD&sc_campaign=Evangelism2018&sc_publisher=github&sc_content=Survey&sc_detail=hello-world-nodejs-V2_CLI-3&sc_funnel=Convert&sc_country=WW&sc_medium=Owned_RD_Evangelism2018_github_Survey_hello-world-nodejs-V2_CLI-3_Convert_WW_beginnersdevs&sc_segment=beginnersdevs) for more information.

2. ```./lambda/custom/index.js```

   Modify messages, and data from the source code to customize the skill.

3. ```./models/*.json```

	Change the model definition to replace the invocation name and the sample phrase for each intent.  Repeat the operation for each locale you are planning to support.

4. Remember to re-deploy your skill and Lambda function for your changes to take effect.

	```bash
	ask deploy
	```
