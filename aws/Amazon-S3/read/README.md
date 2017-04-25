#### Ingredients
## S3 read <a id="title"></a>

#### Instructions for deploying this sample skill

1. Create a new file on your laptop called ```hello.txt```.
  Save the file with the following contents : ```hello from cookbook``` or right-click and download the 
  [sample file](https://s3-eu-west-1.amazonaws.com/alexabucket12/hello.txt).
1. Go to the [S3 Console](https://console.aws.amazon.com/s3/home) and create a new S3 bucket with a unique name.
1. Click the **Upload** button to upload the file into your bucket.
1. Review the [src/index.js](src/index.js) file above.
   Notice the bucket name is set to ```alexabucket12```.
   You will need to change this to the name of *your new S3 bucket* that you just created.


#### Add IAM Role Permissions
Before testing your skill, you will need to add permissions to your IAM Role to allow your Lambda function to read from S3.
See the [IAM Policies](../../IAM_POLICIES.md) guide and add the  **```AmazonS3ReadOnlyAccess```** policy.


#### Continue to the next step
[Part 2 - Create the skill](./PAGE2.md#title)


<hr />

*You can learn more about S3 from the [Getting Started with S3](http://docs.aws.amazon.com/AmazonS3/latest/gsg/GetStartedWithS3.html) documentation.*

Back to the [Home Page](../../README.md#title)
