# Demo Calling Amazon SQS from a Skill

## Prerequisites
* Amazon Developer Account (https://developer.amazon.com)
* AWS Account (recommended)
* ASK CLI (recommended)

## Dependencies
* Assumes code will run in AWS Lambda and the AWS SDK is automatically available. If run elsewhere, the AWS SDK must be included.

## Setup
1. Load this [aws-demo-amazon-sqs.yaml](./aws-demo-amazon-sqs.yaml) template into your AWS account using [AWS CloudFormation](https://console.aws.amazon.com/cloudformation). This will create the Amazon SQS Queue used by the demo and the AWS Lambda function execution role. When you create the stack, you will need to acknowledge that the template will create an IAM role. You will be able to accept all the defaults presented as you click through the screens.
    > The CloudFormation template's parameter values match the default values of the skill name (found in skill.json) and the queue name (found in index.js). These parameters need to be kept in sync with their respective items. 
    > This template creates the IAM role used by the Lambda function created by the ASK CLI. It will only create and not update the IAM role, so the CloudFormation template needs to be executed prior to using the ASK CLI to create the skill. 
1. Use the ASK CLI to deploy the skill.
    > To deploy the skill without using the ASK CLI, follow the standard steps to setup a self-hosted skill (i.e. using your AWS account and not Alexa-hosted). Configure the Lambda function to use the IAM role created by the CloudFormation template (or grant permissions to the SQS Queue).
    > To use Alexa-hosted skills with this demo, cross-account access will be required. Follow [these instructions](https://developer.amazon.com/docs/hosted-skills/build-a-skill-end-to-end-using-an-alexa-hosted-skill.html) to adapt the demo and configure IAM security. This is an advanced configuration and not recommended for those new to AWS and IAM.

## Running the Demo

To run the demo, simply launch the skill, "Alexa, open s. q. s. demo".  This will place a new entry in the queue and tell you about any previous entries in the queue.

To view the queue, locate the queue in the [Amazon SQS console](https://console.aws.amazon.com/sqs).

## Resources

[Amazon SQS Developer Guide](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html)

[Amazon SQS API Reference](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/)
