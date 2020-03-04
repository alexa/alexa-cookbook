# Local Debugging with Java SDK

If you plan on hosting your Alexa skill code on AWS Lambda, we’ll demonstrate how you can speed up your development process by setting up a local debugging workflow with our provided scripts and other proxy solutions.

## Contents

1. [Setting up debugging workflow](#setup)
2. [Setting up debugging workflow with ASK CLI](#setup-cli)

## <a name="setup"></a> Setup debugging workflow

### 1. Download the debug run script

[Download the local debugger package for Java](com/amazon/ask/debugger) and save it into your skill code project directory. This script will help invoke your skill code in your local environment.

### 2. Forward Alex requests to your skill

To forward Alexa requests to your skill, we'll need to use a proxy service. There are many optional available, but we'll be using ngrok in this guide. Ngrok can be downloaded from [their website](https://ngrok.com/download).

Once downloaded, start ngrok with the following command (we'll be using port 3001):

```bash
./ngrok http 3001
```

This will output something like the following:

```
ngrok by @inconshreveable                                       (Ctrl+C to quit)

Session Status                online
Session Expires               7 hours, 59 minutes
Update                        update available (version 2.3.34, Ctrl-U to update
Version                       2.3.29
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://abc123.ngrok.io -> http://localhost:3001
Forwarding                    https://abc123.ngrok.io -> http://localhost:3001

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

Note the HTTPS URL provided (in the above, that would be `https://abc123.ngrok.io`).

From the [ASK developer console](https://developer.amazon.com/alexa/console/ask) **Build** tab, select **Endpoint** from the sidebar and paste the the HTTPS URL into the **Default Region** field. Select option 2 **Wildcard Certificate** from the certificate dropdown. Finally save your update with **Save Endpoints**.

### 3. Start your debugger

To debug your skill with VS Code, you'll need to add a launch configuration to your skill project. From the menu, select **Debug > Add Configuration...**. Copy and paste the following configuration to generated `launch.json` file:

```jsonc
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "java",
            "request": "launch",
            "name": "Launch Program",
            // Specify name of local adapter(for java) class
            "mainClass": "com.amazon.ask.debugger.LocalDebugger",
            "args": [
                // port number on your local host where the alexa requests will be routed to
                "--portNumber", (Example)"3001",
                // name of your java stream handler class name
                "--skillStreamHandlerClass", (Example)"com.amazon.ask.helloworld.HelloWorldStreamHandler"
            ],
        }
    ]
}

```

Be sure to update the `--skillStreamHandlerClass` with your stream handler class name.
If `--portNumber` isn't specfied, a free port will be chosen. The port number will be displayed in the console log when the debugger is started.

### 4. Invoke your skill and debug

To invoke your skill, visit the **Test** tab in the [ASK developer console](https://developer.amazon.com/alexa/console/ask). If you haven't already, enable your skill for testing by selecting the **Development** environment from the dropdown.

Finally, invoke your skill by typing or speaking to Alexa. All requests sent from the Alex asimulator will be forwarded your local running skill code, triggering any breakpoints you've set.

## <a name="setup-cli"></a> Setup debugging workflow with ASK CLI

### 1. Download the debug run script

[Download a copy of the script for Java](local-debugger.js) and save it into your skill code project directory. This script will help invoke your skill code in your local environment.

### 2. Forward Alex requests to your skill

To forward Alexa requests to your skill, we'll need to use a proxy service. There are many optional available, but we'll be using ngrok in this guide. Ngrok can be downloaded from [their website](https://ngrok.com/download).

Once downloaded, start ngrok with the following command (we'll be using port 3001):

```bash
./ngrok http 3001
```

This will output something like the following:

```
ngrok by @inconshreveable                                       (Ctrl+C to quit)

Session Status                online
Session Expires               7 hours, 59 minutes
Update                        update available (version 2.3.34, Ctrl-U to update
Version                       2.3.29
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://abc123.ngrok.io -> http://localhost:3001
Forwarding                    https://abc123.ngrok.io -> http://localhost:3001

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

Note the HTTPS URL provided (in the above, that would be `https://abc123.ngrok.io`).

To forward requests from Alexa through ngrok to your local machine, you’ll need to add the `uri` attribute with the above ngrok-provided HTTPS URL, and a `sslCertificateType` attribute set to `Wildcard` in your `skill.json` file:

```jsonc
{
  "manifest": {
    "publishingInformation": {
     ...
    },
    "apis": {
      "custom": {
        "endpoint": {
          "uri": "https://abc123.ngrok.io",
          "sslCertificateType": "Wildcard"
        }
      }
    },
    "manifestVersion": "1.0"
  }
}
```

Next, deploy your skill and interaction model:

```bash
$ ask deploy --target skill # deploy skill.json
$ ask deploy --target model # deploy and build interaction model
```

### 3. Start your debugger

To debug your skill with VS Code, follow the same instructions above in *[3. Start your debugger](#start-debugger)*.

### 4. Invoke your skill and debug from the ASK CLI

To invoke your skill, first ensure that it has been enabled for development testing:

```bash
$ ask api enable-skill -s <SKILL_ID>
```
> NOTE: Your skill's ID can be found in the developer console in the **Build** tab, in the **Endpoint** section from the sidebar

Finally, use the `dialog` command to access the Alexa simulator from the CLI:

```bash
$ ask dialog --locale en-US
```
