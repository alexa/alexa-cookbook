#### Ingredients
## Amazon-DynamoDB <a id="title"></a>

#### What you will learn

The Amazon [DynamoDB](https://aws.amazon.com/dynamodb), is a NoSQL database service.
You first create a table, which is like traditional SQL table.  Each table must have a primary key defined, such as `id`.


### Table of Contents
 * [read](read#title)


### IAM Role Permissions

The following IAM Policy can be modified and added to your Lambda function's IAM role to allow reading and writing to a specific table.
See the [IAM Policies](../IAM_POLICIES.md) page for more details.

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:PutItem",
        "dynamodb:GetItem"
      ],
      "Resource":["arn:aws:dynamodb:eu-west-1:589662300000:table/myTable"],
    }
  ]
}
```

*You can learn more about DynamoDB from the [Getting Started with DynamoDB](http://docs.aws.amazon.com/amazondynamodb/latest/gettingstartedguide/Welcome.html) documentation.*


<hr />

Back to the [Home Page](../../README.md#title)

