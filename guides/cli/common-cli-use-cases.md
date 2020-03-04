The Alexa Skills Kit Command Line Interface (ASK-CLI, or just CLI) is a handy tool for interacting with the skills you are developing.  Here are some common use cases and tasks you might want to accomplish using the CLI.

Don't have the CLI setup?  Check out this [guide for setting up the ASK-CLI](./cli-cloud9.md)

# Cloning a skill

You may have created a skill using the Developer Console or another tool.  To use it with the CLI, you can clone it.  This will copy your skill configuration, interaction model(s), in-skill product(s) and even your Lambda function to the machine running the CLI.  You will then be ready to modify and upload the skill.

```ask clone```

When you run this command, you will get a list of skills to choose from, so you don't need to look up the skill id.  If you know the skill id already, more power to ya!

> ***Note - when you clone a skill it will overwrite any local changes you have if you are not cloning into an empty directory.  Use with caution!***

# Deploying a skill

Once you have made changes to your skill, you should deploy those changes.  The first time (ever) that you've deployed your skill will require using `ask deploy` to deploy all the parts of your skill.  However later on, you only have to deploy those things which have changed.  By specifying the `--target` option, you can only deploy the parts you have changed.

```
ask deploy --target lambda
ask deploy --target isp
```

# Testing a skill

The `ask simulate` command is handy to quickly test your skill, or when setting up some automation around testing your skill.  You might get tired of providing the locale each time you issue the command.  If that's the case, you can set the `ASK_DEFAULT_DEVICE_LOCALE` enviroment variable to your default locale.

Linux/Mac/Cloud9: `echo 'export ASK_DEFAULT_DEVICE_LOCALE=en-US' >> ~/.bashrc`
(or for just one session: `export ASK_DEFAULT_DEVICE_LOCALE=en-US`)

Windows: `setx ASK_DEFAULT_DEVICE_LOCALE en-US`

Now you can use just `ask simulate -t "open space facts"` instead of `ask simulate -l en-US -t "open space facts"`.

# Working in both the CLI and Developer Console



\###