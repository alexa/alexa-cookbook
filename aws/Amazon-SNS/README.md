#### Ingredients
## Amazon SNS - Simple Notification Service <a id="title"></a>
AWS Simple Notification Service lets you send SMS text messages to a mobile phone number.

#### Instructions for deploying this sample skill
You will need to grant SNS permissions via IAM;
1. From the AWS console, click on IAM.
1. Locate and click on the role you use with your Lambda functions, such as `lambda_basic_execution`.
1. Click the **Attach Policy** button.
1. For a quick demo, filter on "sns" and attach the AmazonSNSFullAccess policy.
1. For a production scenario, choose a more fine-grained policy granting access to certain resources.
    1. Review http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_manage.html
1. Modify the destination mobile addresses, and the body text.

#### Add IAM Role Permissions
Before testing your skill, you will need to add permissions to your IAM Role to allow your Lambda function to call to SNS.  See the [IAM Policies](../IAM_POLICIES.md) guide and add the  **```AmazonSESFullAccess```** policy.

[Part 2 - Create the skill](./PAGE2.md#title)


<hr />

*You can learn more about SES from the [Getting Started with SES](http://docs.aws.amazon.com/ses/latest/DeveloperGuide/getting-started.html) documentation.*

Back to the [Home Page](../../README.md#title)

