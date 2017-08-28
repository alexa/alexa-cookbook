#### Alexa Skill Building Cookbook
## AWS IAM Roles <a id="title"></a>

### Intro <a id="intro"></a>
When your code runs within AWS, it will run under a certain **IAM Role** which allows your code to perform certain limited functions.

* Lambda functions that call out to other AWS services require additional permissions.  You can add permissions by attaching a Policy to your role.


### IAM Policies
To add permissions to your role:

1. Login to your AWS Account Console, then locate the **IAM** service, then click [Roles](https://console.aws.amazon.com/iam/home?roles#/home).
1. Locate the role you would like to modify, such as ```lambda_basic_execution``` and click on it.
1. Click the blue **Attach Policy** button to add to your role.
1. Within the *Attach Policy* list, type in the name of the AWS service you are interested in using.
  + For example, search for  ```S3```, ```Dynamo```, or ```SES```, etc.
1. Locate a role that corresponds to the permissions you will need.
  + For example
     + ```AmazonS3ReadOnlyAccess``` allows your function to read S3 files
     + ```AmazonS3FullAccess```     allows your function to perform any S3 action including read and write
1. Click the checkbox next to the Policy, and then click the blue **Attach Policy** button.
1. Return to your Lambda function and test.  Your code should now be able to access the services you granted to your role.

### Advanced Policies (optional)
For finer grained security, you can define a more specific policy that grants access to only certain actions and resources within AWS.

Within the Role details page, instead of clicking the "Attach Policy" button, scroll down and click the second blue button: **Create Role Policy** and define the specific actions and resources your role will need.


### Further Reading
Read more about [Lambda IAM Roles & Policies](http://docs.aws.amazon.com/lambda/latest/dg/with-userapp-walkthrough-custom-events-create-iam-role.html)


<hr />
Back to the [Home Page](./README.md#title)
