Want to quickly and easily setup an Alexa Skill Development environment, complete with the ASK-CLI?  Here's how you can do just that using [AWS Cloud 9](https://aws.amazon.com/cloud9/)!

> Note: New AWS customers who are eligible for the AWS Free Tier can use AWS Cloud9 for free. If your AWS Cloud9 environment makes use of resources beyond the free tier, you are charged the normal AWS rates for those resources.  For an example of AWS Cloud9 pricing, or more details on AWS Cloud9 pricing, check out: https://aws.amazon.com/cloud9/pricing/

## Amazon Developer Account

1. Visit https://developer.amazon.com in your browser.
1. Log in using an existing set of credentials or create a new account.
1. Be sure to enter all the company information.

## Amazon Web Services (AWS) Account

1. Visit https://aws.amazon.com in your browser.
1. Log in using an existing account, or create a new one.
> Note: You will need a credit card and access to a phone in order to create a new account.  Although a credit card is required to open a new AWS account, the required resources all fit into the AWS Free Tier.  If the Free Tier has expired for your account, you may be charged for the use of the resources at the standard rates.

## Alexa Skills Kit Command Line Interface (ASK CLI)

1. Sign in to your AWS Account.  https://console.aws.amazon.com
1. Navigate to Cloud9 (browse for Cloud9 under Developer Tools, or type Cloud9 in the search box).
1. Click **Create an environment**.
1. Enter a name and optional description.  Click **Next step**.
1. Accept the defaults and click **Next step**.
1. Review and click **Create Environment**.
1. Wait a few minutes while the environment is being created.
1. Once the environment is ready, you will see the Cloud9 IDE.  In the lower pane a default terminal session has been started for you.  In this window, enter the command `npm install ask-cli -g` to install the ASK CLI.
1. Configure the ASK CLI by entering the command `ask init --no-browser`.  This will guide you through the setup process where you'll specify the AWS credentials to be used as well as the Developer Account to be used.  The no-browser flag indicates that a URL should be displayed instead of automatically opening the URL in the default browser.
1. Press **ENTER** to use the default profile.  This will use the temporary AWS credentials managed by Cloud9.  Click [here](https://docs.aws.amazon.com/cloud9/latest/user-guide/auth-and-access-control.html#auth-and-access-control-temporary-managed-credentials) to learn more about Temporary Credentials.
1. Click the link which is generated.  Click **Open** in the pop-up menu.  This will open a new tab in your browser.  Sign in to your Amazon Developer account.
1. Once you grant permissions, a code will appear in the browser. Copy this code.
1. Switch back to the Cloud9 terminal.  Paste the code at the prompt.
1. If you have more than one Vendor ID associated with your login, select the one you want to use.
   > If your Vendor ID cannot be retrieved (error message is 'call list-vendors error' / 401 / 'You are not authorized to access this operation'), it typically means you haven't fully created your Developer Account.  Return to https://developer.amazon.com/alexa-skills-kit and finish providing the requested data.
1. Now that the ASK CLI is installed and configured, there's one last step to get it to work with Cloud9 Temporary Credentials.  Enter this command `echo 'export ASK_DEPLOY_ROLE_PREFIX=Cloud9-' >> ~/.bashrc`.  This will allow the ASK CLI to create IAM roles compatible with Cloud9 Temporary Credential restrictions.  By appending it to the .bashrc file, it will be automatically set each time you use Cloud9.

That's it!  Now that you've created your Cloud9 development environment, you can use it for developing your skills.  You can reconnect to it whenever you want to continue working on it, and it'll be in the same state as you left it.  To make reconnecting easier, simply bookmark the URL.

What's next?  Check out [common CLI use cases](./common-cli-use-cases.md).

\###