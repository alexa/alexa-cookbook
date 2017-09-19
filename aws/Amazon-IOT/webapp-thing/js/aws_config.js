// Change these settings to point this web app to your IOT Thing

// 1. Login to AWS IOT console, and select a Region at the top-right
//      such as Ireland (eu-west-1)  or N. Virginia (us-east-1)

const REGION         = 'us-east-1';  // eu-west-1

// 2. Click on Registry, and add a new Thing, such as waterPump

// IOT Thing
const ThingName      = 'thing1';
const SubscribeTopic = '$aws/things/' + ThingName + '/shadow/update/accepted';

// 3. Click on the Interact menu item, to reveal the API Endpoint:
const mqttEndpoint   = "a3npzlqqmmzqo.iot.us-east-1.amazonaws.com";


// 4. Login to the AWS Cognito console
//  Click "Manage Federated Identities"
//  Click "Create new identity pool" such as MyPool
//  Name your pool and check the box to "Enable access to unauthenticated providers"
//  Once your pool is created, click on the "Sample Code" menu item
//  Within your code, find the RED string called Identity Pool ID and paste this value in the variable below
//
//  Go to the AWS IAM Console
//  Click Roles
//  Click on the new Unauth role, such as Cognito_MyPoolUnauth_Role
//  Click the "Attach Policy" button to add the appropriate permissions to your role
//   For this IOT webapp, choose AWSIoTDataAccess or define a specific set of permissions
//

// Cognito Identity Pool ID
const IdentityPoolId = 'us-east-1:583dd84a-7792-49a6-9ce5-5624f80378e7';
