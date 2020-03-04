# Amazon Pay
-------------------------------------------

Amazon Pay for Alexa Skills uses Amazon's simple voice purchasing flow to sell physical goods or services (like event tickets, transportation, and flower delivery). Amazon Pay for Alexa Skills enables Alexa users to pay seamlessly using payment information already in their Amazon account. Users don't need to leave the voice experience to enter payment information like credit card details or a shipping address before using your skill to pay for a purchase. Instead, your Alexa users grant your skill their permission to use payment information and address details already configured in their Amazon account.
These pages will guide you through the process of integrating an Alexa skill with Amazon Pay. To integrate Amazon Pay with your skill, you need the following:

* An Amazon Developer account to create and launch your skill.
* Alexa Skills Kit SDK.
* An Amazon Pay Merchant account to handle the payment processing flows.

Your integration might also be aided by having an AWS account to build and run your Lambda functions, which are used to control the voice interaction flow and integration with Amazon Pay. For more information, compare hosting your own [backend](https://developer.amazon.com/docs/custom-skills/host-a-custom-skill-as-a-web-service.html) and hosting on [Lambda] (https://developer.amazon.com/docs/custom-skills/host-a-custom-skill-as-an-aws-lambda-function.html).

Source: https://developer.amazon.com/docs/amazon-pay/integrate-skill-with-amazon-pay-v2.html

##### Register as an Amazon Pay merchant

In order to link your Alexa skill with Amazon Pay and process transactions, you need to set up your Amazon Pay account and have it ready for configuring your Alexa skill.
Sign up for an Amazon Pay account (or provision an existing account) from the Amazon Pay website, at https://pay.amazon.com/us/merchant.

##### Gather your credentials.

You can find the following credentials in Seller Central on the Amazon Pay and Login with Amazon Integration Settings page (from the Integration menu, click MWS Access Key):

-        Merchant ID (Seller ID)
-       MWS Access Key ID and MWS Secret Access Key
    Set up Amazon Pay Sandbox test accounts.
    
You need to set up Amazon Pay Sandbox accounts for testing. The Sandbox environment allows you to simulate your customers' experience using Amazon Pay, but without using real money. For more information on setting up Sandbox test accounts, see the Setting up an Amazon Pay Sandbox test account section in the Amazon Pay and Login with Amazon integration guide.