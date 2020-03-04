# Alexa Cookbook - Amazon SQS Helper Module

This module simplifies usage of Amazon SQS.

## Prerequisites / Dependencies

* Amazon SQS Queue
* Permissions to access to the SQS Queue

### Node.js

#### Syntax
```javascript
const attributes = await queue.getQueueAttributes(attributeList);
const messageId = await queue.sendMessage(messageText);
const messages = await retrieveMessages(maxMessages, visibilityTimeout);
await queue.deleteMessage(receiptHandle);
```

##### Parameter Values

| Parameter  | Type | Description |
| ------------- | ------------- | ---------- |
| queueName  | String | The name of the SQS queue. |
| queueRegion | String | The AWS region where the SQS queue is hosted. |
| attributeList | Array of Strings | The list of queue attributes to be retrieved. 'ALL' will get all attributes. |
| messageText | String | Text of the message. |
| maxMessages | Number | Maximum number of messages to be retrieved |
| visibilityTimeout | Number | Number of seconds to suppress visibility of the message in the queue. |
| receiptHandle | string | The receipt handle for the message to be deleted. |

##### Return Values

| Function | Return Value | Type | Description |
| ------------- | ------------- | ---- | ------- |
| getQueueAttributes  | attributes | Map | Name / Value map of requested attributes |
| sendMessage | messageId | string | Message Id of the sent message |
| retrieveMessage | messages | Array | Array of message objects retrieved from the queue |
| deleteMessage | n/a | | |

#### Usage

```javascript
// imports module
const CookbookSQS = require('./cookbook-sqs.js');
// sets parameters used to initialize the queue object
const queueName = 'MyQueueName';
const queueRegion = process.env.AWS_REGION; // e.g. us-east-1
// creates the queue object (not the queue itself)
const queue = new CookbookSQS.SQSQueue(queueName, queueRegion);
// usage of the functions
const attributes = await queue.getQueueAttributes(['AttributeNames']);
const messageId = await queue.sendMessage(messageText);
const messages = await retrieveMessage(maxMessages, visibilityTimeout);
await queue.deleteMessage(receiptHandle);
```

## Resources

[Amazon SQS Developer Guide](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html)

[Amazon SQS API Reference](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/)