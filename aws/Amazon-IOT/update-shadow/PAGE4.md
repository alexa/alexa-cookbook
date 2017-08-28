#### Ingredients
## 4. Connect your skill to Lambda <a id="title"></a>

1. [Setup Thing](./step-1.md#title) || 2. [Create The Skill](./step-2.md#title) || 3. [Create The Lambda Function](./step-3.md#title) || 4. [Connect Skill To Lambda & Add IOT Permissions](./step-4.md#title) || 5. [Webapp-Thing](./step-5.md#title)

<hr />

Here is how to copy and paste your Lambda function ARN to the Skill endpoint.

1. Within the AWS Lambda function page, the ARN, or Amazon Resource Name, is shown near the top right, such as
 *  ``` arn:aws:lambda:us-east-1:333304287777:function:HelloWorld ```
1. Copy this ARN
 + ![Amazon Resource Name](https://m.media-amazon.com/images/G/01/cookbook/arn._TTH_.png)
1. Go to the browser tab at ```developer.amazon.com``` and navigate into your skill's Configuration page.
1. Click the radio button for Service Endpoint Type: AWS Lambda ARN
1. Pick a geographical region that is closest to your target customers
1. Click into the textbox that appears, and Paste.
1. Scroll down and click Save.
1. You should see a green checkbox next to the Configuration menu item.
1. If you get an error, confirm you have previously added an ASK Trigger to your Lambda function.



#### Add IOT permissions to your Lambda IAM Role

1. Within the AWS IAM console, locate and click on the role used by your Lambda function, such as ```lambda_basic_execution```
1. Click the blue button to add ```AWSIoTFullAccess``` policy. to this role.

```AWSIoTFullAccess``` will work fine for testing, however in a production setting, you would want to define a finer-grained set of limited permissions for your Lambda function role.

The following IAM Policy can be modified and attached to your Lambda function's IAM role to only allow updating a specific Thing.
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
      "Resource":["arn:aws:iot:eu-west-1:589662380000:thing/thing1"],
    }
  ]
}
```

 *You can learn more from the [Getting Started with AWS IOT](https://aws.amazon.com/iot-platform/getting-started/) documentation.*


#### Test your skill

* Open your skill and say 'hello'.  Verify the response is as expected.
* Say something like "reisen nach Frankfurt" or "go to Belfast" or "go to Berlin".


#### Add the dynamic web page
 * Create the single-page [webapp-thing](../webapp-thing/README.md#title)

 ```

  * [Part 5 - Do the webapp-thing](../webapp-thing/README.md#title)


Back to the [Home Page](../README.md#title)
