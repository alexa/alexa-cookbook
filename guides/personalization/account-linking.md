# Personalization using Account Linking
In addition to using Account Linking for Smart Home, connecting to your own back-end systems for transaction processing and more, Account Linking can be used to help with personalizing your skill.  There are two main ways it can do that.  First, it can connect to your back-end to get data the user has provided through other means, like your mobile app or website.  This means the customer won't have to enter the information again, and the skill experience will be personalized to the customer.  Even if you don't have a back-end system with personalization information in it, you can use Account Linking to connect (or link) data you've stored across enablements.  Normally you would use the provided directed userId as a key for storing data about the customer within your skill's data store (e.g. persistent attributes in the ASK SDK).  If you have data which needs to stay connected with the customer even if the skill is disabled and re-enabled, you'll need an identifier that isn't reset.  Setting up Account Linking will do that for you.

## Resources

For a detailed walkthrough of setting up Account Linking using Login with Amazon as the OAuth provider, see this [blog](https://developer.amazon.com/blogs/alexa/post/Tx3CX1ETRZZ2NPC/alexa-account-linking-5-steps-to-seamlessly-link-your-alexa-skill-with-login-with-amazon).

For more information about Account Linking check out the docs: https://alexa.design/accountlinking

For Account Linking best practices: https://developer.amazon.com/docs/custom-skills/account-linking-best-practices.html

\###