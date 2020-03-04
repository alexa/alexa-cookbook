# Amazon Pay for Alexa Demo
This is a demo showing Amazon Pay for Alexa Skills.  

Amazon Pay for Alexa Skills is currently available for the en-US locale, for US based merchants.

## What You Will Need
*  [Amazon Developer Account](http://developer.amazon.com/alexa)
*  [Amazon Web Services Account](http://aws.amazon.com/)
*  [Amazon Pay Merchant Account](https://pay.amazon.com/us)
*  [Amazon Pay Sandbox Testing Account](https://sellercentral.amazon.com/gp/pyop/seller/testing/)
*  The sample code on [GitHub](https://github.com/alexa/alexa-cookbook/tree/master/feature-demos/skill-demo-amazon-pay/).

## Setting Up the Demo
This folder contains the interaction model and skill code.  It is structured to make it easy to deploy if you have the ASK CLI already setup.  If you would like to use the Alexa Developer Console, you can follow the steps outlined in the [Hello World](https://github.com/alexa/skill-sample-nodejs-hello-world) example, substituting the [Model](./models/en-US.json) and the [skill code](./lambda/custom/index.js) when called for.  In addition, you will need to create the additional supporting javascript files found in the custom folder.

1. Clone repository and navigate the demo's root folder (with the skill.json file).
1. Open [config.js](./lambda/custom/config.js) and update values `appID`, `sellerId`, and `sandboxCustomerEmailId`
   * the `appID` is the skill id
   * the `sellerId` is your Seller Id.  You can find that [here](https://sellercentral.amazon.com/hz/me/integration/details)
   * the `sandboxCustomerEmailId` is the email address of the test account you created or otherwise have access to.  This is not an account usable on the www.amazon.com website.
1. Give your skill permission to use your Amazon Pay account.  You can do that [here](https://sellercentral.amazon.com/external-payments/integration/alexa/).  The documentation is [here](https://developer.amazon.com/docs/amazon-pay/integrate-skill-with-amazon-pay-v2.html#link_sc)..
1. Enable the skill using the Alexa app.  Be sure to click Settings to show the permissions page if you do not see it.  Provide permission to use Amazon Pay.

## Exploring Amazon Pay for Alexa Skills
If you would like to explore the skill, the areas to pay attention to are the Amazon Pay permission in the Alexa Developer Console, and the Connections.SendRequest directive and the Connections.Response request type.

## Running the Demo
Launch the demo, 'Alexa, open payments demo', and you'll be immediately directed to the purchase flow.  If you receive the message `Thank you for ordering form Blitz and Chips` then you have successfully configured your skill! If you receive an error, proceed to the [troubleshooting section](#troubleshooting).

![alt text](https://i.imgur.com/joMdlZl.png)

You will get a payment record in your email and your Alexa app home screen.

## Next Steps
Read the integration guide: https://developer.amazon.com/docs/amazon-pay/amazon-pay-overview.html

## Troubleshooting

If you are encountering issues with your skill, double check that you have completed the following:

1. Confirm that your Seller Central account is in good standing by selecting the Production environment and verify there are no errors on your account.
1. Check the correct skill was linked in Sandbox using in Seller Central.
1. Verify your sandbox test user is usable.
1. Verify Amazon Pay permissions are enabled for your skill under Build > Permissions > Amazon Pay.
1. Verify the config.js contains the appropriate values.
1. Verify the correct skill Id is used in your Lambda function.
1. Enable your skill in your Alexa App
1. Consent and give permissions to Amazon Pay in your Alexa App
1. Enable Voice Purchasing in your Alexa App (with or without the voice code).

All other errors and decline handling can be found here: https://developer.amazon.com/docs/amazon-pay/payment-declines-and-processing-errors.html
