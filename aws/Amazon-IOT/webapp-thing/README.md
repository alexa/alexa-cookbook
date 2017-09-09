#### Ingredients
## Webapp Thing<a id="title"></a>

1. [Setup Thing](../setup-thing/README.md#title) || 2. [Create The Skill](../update-shadow/PAGE2.md#title) || 3. [Create The Lambda Function](../update-shadow/PAGE3.md#title) || 4. [Connect Skill To Lambda & Add IOT Permissions](../update-shadow/PAGE4.md#title) || 5. [Webapp-Thing](../webapp-thing/README.md#title)

The browser app at ```thing1.html``` can be configured to point to your IOT Thing and receive updates triggered by Alexa requests.

#### Steps

Create a new AWS Cognito Identity Pool

1. Login to the AWS Cognito console
1. Click the second blue button called "Manage Federated Identities"
1. Click "Create new identity pool" such as ```MyPool```
  + Check the box to "Enable access to unauthenticated providers"
1. The next page states "Your Cognito identites require access to your resources."  This is fine, just click the blue "Allow" button to continue.
  + Two new empty IAM roles are created for you, called ```Cognito_MyPoolAuth_Role``` and ```Cognito_MyPoolUnauth_Role```.
1. Once your pool is created, click on the "Sample Code" menu item
1. Within your code, find the RED string called Identity Pool ID and record this as your IdentityPoolId.

Add permissions to users of your Identity Pool:
1. Go to the AWS IAM Console
1. Click Roles
1. Click on the new Unauth role, such as Cognito_MyPoolUnauth_Role
1. Click the "Attach Policy" button to add the appropriate permissions to your role
1. For the IOT webapp, choose ```AWSIoTDataAccess``` or define a specific set of permissions.

Apply all settings:
1. Open the Amazon-IOT/webapp-thing/js folder and locate the file ```aws_config.js```
1. Modify the fields labeled REGION and mqttEndpoint and IdentityPoolId

#### Launch the page

Be sure you are working from a local laptop repository, cloned or downloaded from github.com/alexa/alexa-cookbook.

 + Open in the page thing1.html in your favorite browser.
   + You can open the page right from within your project folder, you do not need to host it on a website.
 + The page should display with a green status label saying "CONNECTED"

#### Test your skill
1. Say: Alexa, open city browser
1. Say: go to Frankfurt
1. Say: go to Belfast
1. Say: stop

The browser page should automatically create a new child window pop-up, that points to an Image Search URL for the city you requested!

#### Debug
 * If there is any issue, open your browser's Debug Console and look for any Javascript errors for clues.
 * Check for any suppressed popup window within your browser's URL bar.



Back to the [Home Page](../README.md#title)
