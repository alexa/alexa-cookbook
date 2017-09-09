# Ingredients

1. [Setup Thing](./step-1.md#title) || 2. [Create The Skill](./step-2.md#title) || 3. [Create The Lambda Function](./step-3.md#title) || 4. [Connect Skill To Lambda & Add IOT Permissions](./step-4.md#title) || 5. [Webapp-Thing](./step-5.md#title)

## Webapp Thing<a id="title"></a>

The browser app at `thing1.html` can be configured to point to your IOT Thing and receive updates triggered by Alexa requests.

#### Steps

Create a new AWS Cognito Identity Pool

1. Login to the AWS Cognito console
1. Click the button called "Manage Federated Identities"
1. Click "Create new identity pool" such as `MyPool`
  * Check the box to "Enable access to unauthenticated providers"
1. The next page states "Your Cognito identites require access to your resources."  This is fine, just click the "Allow" button to continue.
  * Two new empty IAM roles are created for you, called `Cognito_MyPoolAuth_Role` and `Cognito_MyPoolUnauth_Role`.
1. Once your pool is created, click on the "Sample Code" menu item
1. Within your code, find the string called Identity Pool ID and record this as your IdentityPoolId.

Add permissions to users of your Identity Pool:
1. Go to the AWS IAM Console
1. Click `Roles`
1. Click on the new Unauth role, such as `Cognito_MyPoolUnauth_Role`
1. Click the `Attach Policy` button to add the appropriate permissions to your role
1. For the IOT webapp, choose `AWSIoTDataAccess` or define a specific set of permissions.

Apply all settings:
1. In another browser tab, open the [aws_config](./webapp-thing/js/aws_config.js) file.
1. Replace the default values with your own for:
 * `REGION`
 * `mqttEndpoint`
 * `IdentityPoolId`

#### Launch the page

Be sure you are working from a local repository, cloned or downloaded from `github.com/alexa/alexa-cookbook`.


* Open the page thing1.html in your favorite browser.
  * You can open the page right from within your project folder, you do not need to host it on a website.
* The page should display with a green status label saying "CONNECTED"

#### Test your skill
1. Say: Alexa, open city browser
1. Say: go to Frankfurt
1. Say: go to Belfast
1. Say: stop

The browser page should automatically create a new child window pop-up, that points to an Image Search URL for the city you requested!

#### Debug
* If there are any issues, open your browser's Debug Console and look for any Javascript errors for clues.
* Check for any suppressed popup window within your browser's URL bar.

Back to the [Home Page](./README.md#title)
