#### Ingredients
## httpsGet <a id="title"></a>

#### What you will learn

AWS Lambda functions running Node.JS can make calls over the Internet to APIs and services using the ```https``` module included in Javascript.

In this example, your Lambda function references the `https` module like this:

    var https = require('https');

We want to make a `GET` call to a service such as:

https://cp6gckjt97.execute-api.us-east-1.amazonaws.com/prod/stateresource?usstate=New%20Jersey

To do this, break apart the web service URL into components:

```
var options = {
    host: 'cp6gckjt97.execute-api.us-east-1.amazonaws.com',
    port: 443,
    path: '/prod/stateresource?usstate=' + encodeURIComponent('New Jersey'),
    method: 'GET'
};
```

This particular web service returns a JSON object.
Your code will need to parse and process the response data from your web service.
Here is a sample response:

    {"Name":"New Jersey","population":9000000,"rank":11}

Read the full documentation on [Node.JS https](https://nodejs.org/api/https.html#https_https_request_options_callback)
including how to add options to define x509 certificate keys, if required.


#### Instructions for deploying this sample skill
[Part 2 - Create the skill](./PAGE2.md#title)

<hr />

Back to the [Home Page](../../README.md#title)
