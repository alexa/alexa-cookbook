The Device Address API enables skills to request and access the configured address in the customer’s device settings. This means you can build skills with the context to understand the customers who use the skill, then use the data to customize the voice experience. Your skill, for example, can deliver food and groceries to a customer’s home or provide directions to a nearby gym. You can also see where your most active users are. Check out our documentation to learn more.

When a user enables a skill with the Alexa app that wants to use location data, the user will be prompted to provide consent for location data to be made available. There are two levels of location data you can request:

Full address, which includes street address, city, state, zip, and country Country and postal code only When a user enables a skill that wants to use this location data, the user will be prompted in the Alexa app to consent to the location data being shared with the skill. It is important to note that when a user enables a skill via voice, the user will not be prompted for this information and the default choice will be "none." In this case, you can use cards to prompt the user to provide consent using the Alexa app.

[Device Address sample](https://github.com/alexa/skill-sample-node-device-address-api)
