#### Alexa Skill Building Cookbook
## AWS Services <a id="title"></a>

### Intro <a id="intro"></a>
Alexa skill developers can take advantage of the various services available within Amazon Web Services.

AWS offers a range of developer and IT services, including: database, file storage, messaging, virtual servers, and IOT connected devices.

Your skill code can call AWS services by incorporating into your project the AWS SDK for Node.js.

    var AWS = require('aws-sdk');

This Node module is automatically included and available to all AWS Lambda functions.

You can further configure the AWS connection via the Config.  Certain functions require the region to be set.
Alexa skill developers will likely be using AWS in one of two possible regions: ```eu-west-1``` or ```us-east-1```

    AWS.config.update({region: 'us-east-1'});  // eu-west-1

See the [AWS SDK reference docs](https://aws.amazon.com/sdk-for-node-js/).

### Table of Contents
 * [Amazon-S3](Amazon-S3#title), a file store
 * [Amazon-DynamoDB](Amazon-DynamoDB#title), a nosql database service
 * [Amazon-SES](Amazon-SES#title), an email sending service
 * [Amazon-SNS](Amazon-SNS#title), an SMS text messaging service


### IAM Roles

Lambda functions execute in the context of a given IAM Role.  [IAM](https://aws.amazon.com/iam), or Identity and Access Management, manages various security controls within AWS.
An IAM Role is a collection of various permissions that a process can assume to perform its work.

Your AWS Lambda function code does not need a `accessKeyId` or `secretAccessKey` to be defined as would an application external to AWS.

You set up a default role when you created your very first lambda function.
This role is typically called `lambda_basic_execution`.

Lambda functions that call out to other AWS services require additional permissions.
You can add permissions by attaching a Policy to your role.

Continue reading the [Guide to adding IAM Policies](./IAM_POLICIES.md#title) to your role.

<hr />

Back to the [Home Page](../README.md#title)

