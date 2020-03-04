## testflow Setup


### Pre-requisites

* Some familiarity with command line tools like terminal (mac) or CMD or bash shell (Windows).
* [Node.JS](https://nodejs.org/en/download/) version 6 or higher installed on your laptop

**Recommended**
* [Git](https://git-scm.com/downloads) for cloning this project
* [AWS CLI](https://aws.amazon.com/cli/) or [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html) for zipping and deploying your project to AWS Lambda.

### Clone repository

1. Clone this repository to your laptop:
  * Open a command prompt (black background is best)
  * Type ```git clone https://github.com/robm26/testflow```
  * Or, download and extract the repository from the green button on the [project home page](../README.md).

### Configure

The test project is ready to run, however you can review or update configuration settings defined in the testflow.js file.
1. Open ```testflow.js``` in your favorite text editor
1. Review ```SourceCodeFile``` and ```handlerName``` values.
These currently point to an included sample project source file and function.  Adjust these as necessary.

```
const SourceCodeFile = './sampleskill/index.js';
const handlerName =  'handler'; // 'lambda_handler'
```

1. Notice the folder ```/dialogs``` which contains dialog sequence files.
The default dialog file is called default.txt but you can override this when executing a command.
```
let MyDialog = './dialogs/default.txt';
```
1. Review the options object.  These values can be changed as you wish.


### Test
Your code project likely contains some dependencies on other Node modules.
These are listed at the end of the [package.json](../sampleskill/package.json) file.
You can install all required dependencies by typing ```npm install``` from within your project folder.

1. From the command prompt, CD into the [sampleskill](../sampleskill) folder
1. Type ```node install``` to install required dependencies.  If this fails, try ```sudo node install```
1. Execute ```node testflow``` and observe the skill code respond to a LaunchRequest, Help, and Stop command.
1. Execute ```node testflow breakfast.txt``` and observe the skill code respond to a custom dialog sequence.

### Optimize

Note: You may want to install the [AWS-SDK](https://www.npmjs.com/package/aws-sdk) globally for use by any project.
Simply run ```npm install aws-sdk --global```
This will setup your laptop with the AWS-SDK, similar to the AWS Lambda runtime environment,
which also has the AWS-SDK available.
All other Node.JS packages must be installed directly into your project and included in the zip file you publish to AWS Lambda.

You can further optimize your project by removing the aws-sdk folder from your node_modules folder.
The ask-sdk installs it, however if you are using AWS Lambda then it would already be available.
Removing this one module should greatly reduce the size of your project, so that it is small enough to support the AWS Lambda Code9 code editor.


### Install in your custom project

You can copy testflow into your own project folder.

1. Copy and paste the ```testflow.js``` file and ```/dialogs``` folder to your project folder.
1. Customize the settings within the top of the ```testflow.js``` file
  * Adjust the path defined by ```const MyLambdaFunction``` to the location of your source file, typically ```'./lambda/custom/index.js'```;
1. Create a new dialog sequence file with your Intents in sequence, such as ```mytest.txt```
1. Run from the command line: ```node testflow mytest.txt```

### Learn
Follow the tutorial to learn more! [TUTORIAL](./TUTORIAL.md)
