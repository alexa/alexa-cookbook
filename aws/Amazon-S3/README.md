#### Ingredients
## Amazon-S3 <a id="title"></a>

#### What you will learn

The Amazon [Simple Storage Service](https://aws.amazon.com/s3), or S3, is an object store service.  You can think of it like a filesystem.
You first create a bucket, which is like a hard drive.  Then you can upload files, and create folders to organize your files.


### Table of Contents
 * [read](read#title)
 * [write](write#title)


### IAM Role Permissions

The following IAM Policy can be modified and added to your Lambda function's IAM role to allow reading and writing to a specific S3 bucket.
See the [IAM Policies](../IAM_POLICIES.md) page for more details.

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject"
      ],
      "Resource":["arn:aws:s3:::mysuperbucket/*"]
    }
  ]
}
```

 *You can learn more about S3 from the [Getting Started with S3](http://docs.aws.amazon.com/AmazonS3/latest/gsg/GetStartedWithS3.html) documentation.*


<hr />
Back to the [Home Page](../../README.md#title)

