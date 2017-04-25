#### Ingredients
## httpsPost <a id="title"></a>

AWS Lambda functions running Node.JS can make calls over the Internet to APIs and services using the `https` module, like this:

    var https = require('https');

You can make a POST call to a web service such as:

```
https://cp6gckjt97.execute-api.us-east-1.amazonaws.com/prod/stateresource
```

Unlike an HTTPS GET, you cannot test a POST URL in your browser to see the web service in action.
A POST service expects a specially formatted request message to be packaged and transmitted by your code to the service endpoint.

The configuration for your service should follow the pattern below:

```
var post_data = {"usstate": myData};

var post_options = {
    host:  'cp6gckjt97.execute-api.us-east-1.amazonaws.com',
    port: '443',
    path: '/prod/stateresource',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(JSON.stringify(post_data))
    }
};
```

Once the web service call has been set up, you can execute it by sending in your `post_data` object:

    post_req.write(JSON.stringify(post_data));
    post_req.end();

This particular service returns a JSON object.
Your code will need to parse and process the response data from your web service.
Here is a sample response:

    {"Name":"New Jersey","population":9000000,"rank":11}


Read the full documentation on [Node.JS https](https://nodejs.org/api/https.html#https_https_request_options_callback) 
including how to add options to define x509 certificate keys, if required.


#### Instructions for deploying this sample skill
[Part 2 - Create the skill](./PAGE2.md#title)

<hr />

Back to the [Home Page](../../README.md#title)
