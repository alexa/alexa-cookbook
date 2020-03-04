# Using the Alexa Skill Kit Command-Line Interface with an Alexa-Hosted Skill

The Alexa Skill Kit Command-Line Interface (ASK CLI) is a powerful development tool that, if configured correctly, can work with a skill that uses an Alexa-Hosted backend. 

## Setup the ASK CLI

Before setting up the CLI to work with an Alexa Hosted Skill, (install the ASK CLI)[https://alexa.design/cli-jump-start] on your computer. Alternatively, you can (install the CLI on AWS Cloud9)[https://alexa.design/cli-on-cloud9]. 

## Create a Profile for Alexa-Hosted Skills

Once you've install the CLI, you will need to create a profile that works with Alexa-Hosted skills.

1. Start the process to create a new profile with the command `ask init`.
    > If you're using AWS Cloud9, be sure to use the `--no-browser` option.
1. Select **Create new profile** and press **Enter**.
   > If this is your first time running `ask init`, you will be prompted to use the default profile. Unless *all* your skills are Alexa-Hosted, I recommend that you create a named profile for accessing Alexa-Hosted skills to prevent potential confusion if you re-use this setup in the future.
1. Enter a name for the profile. I recommend using `hosted`. If you choose something different, be sure to use that profile name when specifying the profile in the commands.
1. A browser tab should open and prompt you to sign in and provide access to the ASK CLI. Once this is complete, close the browser tab.
1. If your account has access to more than one Vendor ID, select the one connected with the Alexa-Hosted skill you want to modify.
1. Next you will be asked if you want to host your skill's backend code in AWS Lambda and associate an AWS profile.  Answer `N` (No) to this question.
    > When you create an Alexa-Hosted skill, you are use AWS Lambda as recommended, however you do not have direct access, so you can't associate an AWS profile with this ASK CLI profile.

Now that you've configured this profile, to use it, add `--profile hosted` to each and every ASK CLI command to use this profile. For example, to clone a skill, use `ask clone --profile hosted` or `ask deploy --profile hosted`. When using the ASK CLI this way, you will only be able to modify the skill configuration, interaction models and in-skill products. You will also be able to use any other commands which don't rely on access to the back-end code.

What's next?  Check out [common CLI use cases](./common-cli-use-cases.md).

\###