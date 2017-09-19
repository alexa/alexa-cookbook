# This is an AWS CLI shell command to publish the web app file to an S3 bucket
aws s3 sync . s3://fact-service --profile 58
