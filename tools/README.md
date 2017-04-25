## Tools <a id="title"></a>
### Make me productive!

### Design Tools

One-page design sheets can be printed and used to sketch out ideas for a conversation with Alexa.

* [Alexa Dialogue Design](https://www.amazon.com/clouddrive/share/5WMoGXcKHSWWSoRiC3VNFmBnEveQBdPnLZq711Iu3d?ref_=cd_ph_share_link_copy)
* [Alexa Dialogue Design - Detailed](https://www.amazon.com/clouddrive/share/PLKDyDip6Jv1HK450NTTGzJZJB4QjDyYxTMlQgmWDCQ?ref_=cd_ph_share_link_copy)


### Developer Tools

The following tools will enhance your developer experience.

* Have [Node.JS](https://nodejs.org/en/) on your laptop command-line, and become familiar with [NPM](https://www.npmjs.com), the Node Package Manager.
* Have [GIT](https://git-scm.com/downloads) on your laptop.
* Have the AWS Command Line Interface (AWS CLI) [installed](http://docs.aws.amazon.com/cli/latest/userguide/installing.html) and [configured](https://developer.amazon.com/blogs/post/Tx1UE9W1NQ0GYII/publishing-your-skill-code-to-lambda-via-the-command-line-interface).
* Review the [alexa-sdk](https://www.npmjs.com/package/alexa-sdk) documentation.

### Developing Online
When creating a new AWS Lambda function, you can choose the ```alexa-skill-kit-sdk-factskill``` blueprint which automatically bundles in the **alexa-sdk**.  You can delete this code, and paste in sample code from this cookbook.
The online editor will work best if your skill code fits within a single file.


### Working from your Laptop
You may want to develop from a project folder on your local laptop for a number of reasons:
* You can create a project with more than one source file
* You can bundle in external Node.JS modules via NPM
* You can use your favorite text editor or IDE
* You can run unit tests locally
* You can upload your project to your personal GitHub repositoriy easily


#### Download from GitHub
You can download the entire Cookbook to your local hard drive in one of two ways:
* Click the green **Clone or download** button from the home page, and download the zip file.  Be sure to extract everything to a new folder.
* If you have [GIT](https://git-scm.com/downloads) installed, open a command prompt and run : ```git clone https://github.com/alexa/Cookbook```

You can also create a new skill function from scratch.  Create an empty folder, and add a file called ```index.js```


#### Install required modules with NPM
The examples each contain a ```/src``` folder which contains the `index.js` source file.
When the code runs within AWS Lambda it relies on the [alexa-sdk](https://www.npmjs.com/package/alexa-sdk) module,
which is installed by default with the Fact skill blueprint.
In order to test and deploy projects from your local laptop, you will need to bundle in required modules such as 
**alexa-sdk** within your `/src` folder.

Follow these steps to install **alexa-sdk**:

1. Open a command prompt and navigate into the /src folder where your `index.js` lives.
1. Verify you have [Node.JS](https://nodejs.org/en/) installed by typing `npm --version`
1. Type `npm install --save alexa-sdk`
1. You will notice a new folder called `node_modules` which contains an `alexa-sdk` folder.
1. You can repeat and use any other Node modules to your project with the `npm` command.
  * For example, you could install the open source SSML-Builder module via `npm install --save ssml-builder`

 *Note: You can install the*  **`aws-sdk`**  *locally, however it is already available within Lambda and does not need to be bundled into your deployment.*

You can now [test your project from the command line](../Testing#title), or package and deploy it to the AWS Lambda service.


### Publishing to Lambda

Once you are ready to deploy your local code back into AWS Lambda, you can zip the contents of your `/src` folder
(just the contents, not the `/src` parent folder) and publish the Zip archive to your Lambda function.

Manual steps:

1. Within your file explorer tool, double-click into the `/src` folder.
1. Multi-select the index.js file, any other source files, the `node_modules` folder.
1. Right-click and create a new zip file (`zip`, or `send-to: compressed folder`).
1. Within the [AWS Lambda console](https://console.aws.amazon.com/lambda/home?#/functions?display=list), create or locate the Lambda function.
1. Within the **Code** section, locate the **Code entry type** dropdown.
1. Click and select **Upload a .ZIP file**.
1. Locate and double-click on the new zip file you made previously.
1. You will need to click the blue **Save** button, or continue creating your new skill for the upload to complete.

Automated steps:
* You can choose to automate the packaging and publishing of your AWS Lambda project via a command line script.
Read and follow the guide to [Publishing Your Skill Code to Lambda via the Command Line Interface](https://developer.amazon.com/blogs/post/Tx1UE9W1NQ0GYII/publishing-your-skill-code-to-lambda-via-the-command-line-interface)

* Once the [AWS CLI](http://docs.aws.amazon.com/cli/latest/userguide/installing.html) is setup, you can choose to use Node commands to deploy your function.
  * Modify the `function-name` in a few places from the default of `HelloWorld` to a name of your chosing.
  * Navigate to the `src/` folder and type `npm deploy`.  
    This runs the commands defined in the `scripts.deploy` section of the `src/package.json` file.
  

See also [How To Test](../testing#title)

#### Continue to the next step
[Part 2 - Create the Skill](./PAGE2.md#title)

Back to the [Home Page](../README.md#title)
