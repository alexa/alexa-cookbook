#### Ingredients
## Amazon IOT <a id="title"></a>

1. [Setup Thing](./step-1.md#title) || 2. [Create The Skill](./step-2.md#title) || 3. [Create The Lambda Function](./step-3.md#title) || 4. [Connect Skill To Lambda & Add IOT Permissions](./step-4.md#title) || 5. [Webapp-Thing](./step-5.md#title)

#### What you will learn

Amazon [AWS IoT](https://aws.amazon.com/iot), or Internet of Things, is a set of services to interact with physical things.
A Thing may be a motor, a fan, a robot, etc.

You can start by creating a virtual Thing within AWS that can be controlled by your Lambda code.
Later, you could configure a physical thing, such as an Intel Edison Arduino device, to connect to the IOT network (using certificates) and receive updates to stay in sync with the virtual Thing.
The virtual Thing is known as a "thing shadow".  Read more on the [AWS IOT Thing Shadow Guide](http://docs.aws.amazon.com/iot/latest/developerguide/using-thing-shadows.html).

### Table of Contents (setup steps)
Follow these three steps to build a skill that can update an IOT thing.  Step 3 has you configure a web browser page in place of a real thing.  Once configured, the page will load images of the city you ask for.

1. Part 1: [setup-thing](./step-1.md#title)
1. Part 2: [update-shadow](./step-2.md#title) (steps 2 through 4)
1. Part 3: [webapp-thing](./step-5.md#title)



### Key configuration settings for AWS IOT

When you setup a virtual Thing in a particular region, you will be given the name of an endpoint.
Together with the Thing name and the name of your region, you can uniquely describe your thing.  Both the back-end (Skill Lambda function) and front end (Device or web app) will point to this thing to exchange data.

`Example Configuration:`

```
var config = {};
config.IOT_BROKER_ENDPOINT      = "a2eshrcp6u0000.iot.us-east-1.amazonaws.com";  // also called the REST API endpoint
config.IOT_BROKER_REGION        = "us-east-1";  // corresponds to the N.Virginia Region.  Use ```eu-west-1``` instead for the Ireland region
config.IOT_THING_NAME           = "thing1";

```

To get started, go to [Step 1](./step-1.md#title).

Back to the [Home Page](./README.md#title)
