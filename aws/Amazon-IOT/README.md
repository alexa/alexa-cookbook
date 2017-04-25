#### Ingredients
## Amazon IOT <a id="title"></a>

#### What you will learn

Amazon [AWS IoT](https://aws.amazon.com/iot), or Internet of Things, is a set of services to interact with physical things.
A Thing may be a motor, a fan, a robot, etc.

You can start by creating a virtual Thing within AWS that can be controlled by your Lambda code.
Later, you can configure a physical thing, such as a Raspberry PI device, to connect to the IOT network and receive updates to stay in sync with the virtual Thing.
The virtual Thing is known as a "thing shadow".  Read more on the [AWS IOT Thing Shadow Guide](http://docs.aws.amazon.com/iot/latest/developerguide/using-thing-shadows.html).

### Table of Contents (setup steps)
1. [setup-thing](setup-thing#title)
1. [update-shadow](update-shadow#title)
1. [webapp-thing](webapp-thing#title)

### IOT configuration settings

When you setup a virtual Thing in a particular region, you will be given the name of an endpoint.  Together with the Thing name and your region, you can define the details your Lambda function will need to update the Thing.

```
var config = {};
config.IOT_BROKER_ENDPOINT = "a2eshrcp6u0000.iot.us-east-1.amazonaws.com";  // also called the REST API endpoint
config.IOT_BROKER_REGION   = "eu-west-1";  // corresponds to the Ireland Region.  Use ```us-east-1``` instead for the N. Virginia region
config.IOT_THING_NAME      = "waterPump";
```

### IAM Role Permissions

Your Lambda's IAM role can be setup to include the generic ```AWSIoTDataAccess``` policy.

Or, the following IAM Policy can be modified and added to your Lambda function's IAM role to only allow updating a specific Thing.
See the [IAM Policies](../IAM_POLICIES.md) page for more details.

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "iot:UpdateThingShadow"
      ],
      "Resource":["arn:aws:iot:eu-west-1:589662380000:thing/waterPump"],
    }
  ]
}
```

*You can learn more from the [Getting Started with AWS IOT](https://aws.amazon.com/iot-platform/getting-started/) documentation.*

<hr />

Back to the [Home Page](../../README.md#title)
