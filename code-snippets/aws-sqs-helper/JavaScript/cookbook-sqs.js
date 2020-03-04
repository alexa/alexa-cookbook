// Alexa Cookbook - Amazon SQS Helper Module
// version 0.1.0

const AWS = require('aws-sdk');

// =========== request builders ==============
function buildSendMessagePayload(queueUrl, messageText) {
  return {
    MessageBody: messageText,
    QueueUrl: queueUrl,
  };
}

function buildRetrieveMessagesPayload(queueUrl, maxMessages, timeout) {
  return {
    QueueUrl: queueUrl,
    MaxNumberOfMessages: maxMessages,
    VisibilityTimeout: timeout,
  };
}

function buildGetQueueAttributesPayload(queueUrl, attributeList) {
  return {
    QueueUrl: queueUrl,
    AttributeNames: attributeList,
  };
}

function buildGetQueueUrlPayload(queueName, queueAccountId) {
  if (queueAccountId) {
    return {
      QueueName: queueName,
      QueueOwnerAWSAccountId: queueAccountId,
    };
  }
  return {
    QueueName: queueName,
  };
}

function buildDeleteMessagePayload(queueUrl, receiptHandle) {
  return {
    QueueUrl: queueUrl,
    ReceiptHandle: receiptHandle,
  };
}

// =========== wrapper functions ================
class SQSQueue {
  constructor(queueName, queueRegion, queueAccountId) {
    this.type = 'sqsQueue';
    this.SQS = new AWS.SQS();
    AWS.config.update({ region: queueRegion });
    this.name = queueName;
    this.accountId = queueAccountId;
    this.queueUrl = '';
  }

  async getQueueUrl() {
    try {
      if (this.queueUrl !== '') { return this.queueUrl; }
      const payload = buildGetQueueUrlPayload(this.name, this.accountId);
      const result = await this.SQS.getQueueUrl(payload).promise();
      this.queueUrl = result.QueueUrl;
      return result.QueueUrl;
    } catch (err) {
      console.log(err, err.stack);
      throw err;
    }
  }

  async sendMessage(messageText) {
    try {
      const queueUrl = await this.getQueueUrl();
      const payload = buildSendMessagePayload(queueUrl, messageText);
      const result = await this.SQS.sendMessage(payload).promise();
      return result.MessageId;
    } catch (err) {
      console.log(err, err.stack);
      throw err;
    }
  }

  async getQueueAttributes(attributeList) {
    try {
      const queueUrl = await this.getQueueUrl();
      const payload = buildGetQueueAttributesPayload(queueUrl, attributeList);
      const result = await this.SQS.getQueueAttributes(payload).promise();
      return result.Attributes;
    } catch (err) {
      console.log(err, err.stack);
      throw err;
    }
  }

  async retrieveMessage(maxMessages, visibilityTimeout) {
    try {
      const queueUrl = await this.getQueueUrl();
      const payload = buildRetrieveMessagesPayload(queueUrl, maxMessages, visibilityTimeout);
      const result = await this.SQS.receiveMessage(payload).promise();
      return result.Messages;
    } catch (err) {
      console.log(err, err.stack);
      throw err;
    }
  }

  async deleteMessage(receiptHandle) {
    try {
      const queueUrl = await this.getQueueUrl();
      const payload = buildDeleteMessagePayload(queueUrl, receiptHandle);
      await this.SQS.deleteMessage(payload).promise();
    } catch (err) {
      console.log(err, err.stack);
      throw err;
    }
  }
}

module.exports = {
  SQSQueue,
};
