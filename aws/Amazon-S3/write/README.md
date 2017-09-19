## Write a file to S3 from your Alexa Skill
----

##### Requirements

* [Amazon Developer Account](https://developer.amazon.com)
* [AWS Account](https://console.aws.amazon.com)

#### Instructions for deploying this sample skill


## 1. Create the lambda function

1. Login to [AWS Account](https://console.aws.amazon.com)
1. Be sure that your region is set to **N. Viginia** or **EU (Ireland)** otherwise you will not be able to progress past **step 6**.
1. Navigate to the lambda console by typing **"lambda"** into the AWS Services search box and selecting **Lambda**.
1. Click on **"Create Function**
1. Select the **alexa-skill-kit-sdk-factskill** blue print and click next (Don't check the check box. Click the link).
1. Under *Configure Triggers* add the **Alexa Skills Kit** trigger by clicking on the empty grey dashed box and click next.  
**Fill out the form:**  
   * Function Name: **fileWhisperer**
   * Description: **Write files to s3 from your alexa skill**
1. Copy the code from [src/index.js](https://github.com/alexa/alexa-cookbook/blob/master/aws/Amazon-S3/write/src/index.js) and paste it into the editor overwritting the fact skill boilerplate. 
1. At the bottom of the page click the **next** button
1. Click the **Create Function** button.
1. Congratulations you're done creating the skill!!!! Leave AWS open and do the next step in another tab or window.

## 2. Create the Skill

1. Login to [developer.amazon.com](https://developer.amazon.com)
1. Create a new Alexa Skill
  * Click on **Alexa**`
  * Click on **Get Started** under **Alexa Skills Kit**
  * Click on **Add a new skill**
1. In the **Name** field enter **File Whisperer**
1. In the **Invocation Name** field enter **file whisperer**
1. Click Save
1. Click on the Interaction Model and click on the Builder Beta.
1. Copy the json from [speechAssets/InteractionModel.json](https://github.com/alexa/alexa-cookbook/blob/master/aws/Amazon-S3/write/speechAssets/InteractionModel.json)

## 3. Configure your S3 Bucket & Add trust policy

1. Login to [AWS Account](https://console.aws.amazon.com)
1. Create a bucket or use your existing one.
1. Update your lambda code to point to the bucket.  
  `var myBucket = 'alexabucket12';      // replace with your own bucket name!`
1. Add the trust policy `AmazonS3FullAccess` to your lambda function's role