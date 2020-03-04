# Setting Up Your First Lambda Role

If you're reading this page, you're probably setting up your first role for a Lambda function.  While it's an easy process, we want to make sure you understand all of the "whys" that go into this process.

1.  **Choose "Create a custom role" from the Role dropdown.**  This will launch a new tab in your browser, so make sure that popups are enabled when you attempt this.

    ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/lambda-role/1-choose-custom-role._TTH_.png)

2.  **You are now creating a new IAM role.**  IAM stands for Identity and Access Management.  ([You can read more about IAM here.](http://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html))  By creating this role, you are enabling your Lambda function to be able to create Amazon CloudWatch logs for your function.  ([You can read more about managing permissions with IAM roles here.](https://docs.aws.amazon.com/lambda/latest/dg/intro-permission-model.html#lambda-intro-execution-role))

3.  **You don't need to make any changes.  Click the Allow button in the bottom right corner.**

    ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/lambda-role/3-allow-button._TTH_.png)

4.  **This should close the new tab, and populate your Lambda function appropriately.**  If your "Lambda function handler and role" section doesn't look like the screenshot below, try refreshing your page and selecting your new role from the "existing role" dropdown.

    ![](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/lambda-role/4-lambda-function-role._TTH_.png)

5.  **You can now return to what you were doing.**
