#### Alexa Skill Building Cookbook
## External Calls <a id="title"></a>

### Intro <a id="intro"></a>
Alexa skill developers can take advantage of external APIs and web services available on the public Internet.
Skill code could perform an external search based on the value of a spoken slot,
call another application to update a record, or control a robot or device.


We can design functions to simplify the process of sending and receiving data from a service.
The service function will hide all the details of the function call and allow us to simply send arguments and receive data.
The examples assume your skill code is written as a Lambda Node.js function.

Skill code can use the built-in HTTPS module to make service POST and GET calls.
See the [HTTPS reference docs](https://nodejs.org/api/https.html).


### Table of Contents
+ [GET web service call](httpsGet#title)
+ [POST web service call](httpsPost#title)


<hr />

Back to the [Home Page](../README.md#title)
