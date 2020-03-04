# Alexa Skills Kit (ASK) Development Quickstart
------

Welcome! We've organized a list of Alexa Skills Development resources to help you get started quickly. This document is categorized into the following sections:

* [**Guides**](#guide) contain step-by-step walkthroughs of building and configuring various Alexa capabilities. ***We reccommend visiting these guides first.***

* [**Code Samples**](#code-samples) showcase the source code for entire skills. These can be built, deployed, and tested. Code samples are also useful as templates or starting points.

* [**Recipes**](#recipes) host technical commentary and code snippets on specific functionality (e.g. making an HTTP request from an Alexa Skill). These would be worth taking a look at once you've started development.

* [**Videos**](#videos) include live coding, best practices and key design related concepts.

* [**Additional Resources**](#additional-resources) consist of links to inpsiration, external tutorials, help, and other items of extended interest.


------
### Guides
Contain step-by-step walkthroughs of building and configuring various Alexa capabilities.

Link                     | Description 
 ----------------------- | -----------
[Setting Up The ASK SDK](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/wiki/Setting-Up-The-ASK-SDK) | Shows how to install the SDK as a dependency in your NPM project.
[Developing Your First Skill](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/wiki/Developing-Your-First-Skill) |  Walks through step-by-step instructions for building the Hello World sample.
[Request Processing](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/wiki/Request-Processing) | Covers how to build request handlers, exception handlers, and request and response interceptors.
[Skill Attributes](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/wiki/Skill-Attributes) | Covers how to use skill attributes to store and retrieve skill data.
[Response Building](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/wiki/Response-Building) | Covers how to use the ResponseBuilder to compose multiple elements like text, cards, and audio into a single response.
[Alexa Service Clients](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/wiki/Alexa-Service-Clients) | Covers how to use service clients in your skill to access Alexa APIs.
[Skill Builders](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/wiki/Skill-Builders) | Covers how to configure and construct a skill instance.
[Managing In-Skill Purchases](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/wiki/Managing-In-Skill-Purchases) | Covers how to manage in-skill products and the purchase experience in your skills.
[Voice Design Guide](https://developer.amazon.com/designing-for-voice/) | Contains key design principles, concepts and best practices for creating compleeling, and successful voice interactions.
[Setup the ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html) | Instructions to setup the ASK Command Line Interface, a tool to manage skills, related Lambda functions.

### Code Samples
Showcase the source code for entire skills. These samples can be built, deployed, and tested.

- [Hello World](https://github.com/alexa/skill-sample-nodejs-hello-world)
	- Sample that familiarizes you with the Alexa Skills Kit and AWS Lambda by allowing you to hear a response from Alexa when you trigger the sample.

- [Fact](https://github.com/alexa/skill-sample-nodejs-fact)
	- Template for a basic fact skill. You’ll provide a list of interesting facts about a topic, Alexa will select a fact at random and tell it to the user when the skill is invoked.

- [How To](https://github.com/alexa/skill-sample-nodejs-howto)
	- Template for a parameter-based skill called 'Minecraft Helper'. When the user asks how to craft an item in the game Minecraft, the skill provides instructions.

- [Trivia](https://github.com/alexa/skill-sample-nodejs-trivia)
	- Template for a trivia-style game with score keeping. Alexa asks the user multiple-choice questions and seeks a response. Correct and incorrect answers to questions are recorded.

- [Quiz Game](https://github.com/alexa/skill-sample-nodejs-quiz-game)
	- Template for a basic quiz game skill. Alexa quizzes the user with facts from a list you provide.

- [City Guide](https://github.com/alexa/skill-sample-nodejs-city-guide)
	- Template for a local recommendations skill. Alexa uses the data that you provide to offer recommendations according to the user's stated preferences.

- [Pet Match](https://github.com/alexa/skill-sample-nodejs-petmatch)
	- Sample skill that matches the user with a pet. Alexa prompts the user for the information it needs to determine a match. Once all of the required information is collected, the skill sends the data to an external web service that processes the data and returns the match.

- [High Low Game](https://github.com/alexa/skill-sample-nodejs-highlowgame)
	- Template for a basic high-low game skill. When the user guesses a number, Alexa tells the user whether the number she has in mind is higher or lower.

- [Decision Tree](https://github.com/alexa/skill-sample-nodejs-decision-tree)
	- Template for a basic decision tree skill. Alexa asks the user a series of questions to get to a career suggestion.

- [Device Address API](https://github.com/alexa/skill-sample-node-device-address-api)
	- Sample skill that shows how to request and access the configured address in the user’s device settings.

### Recipes
Host technical commentary and code snippets on specific functionality.


* [Making HTTP Requests to Get Data from an External API](https://developer.amazon.com/blogs/alexa/post/a9ef18b2-ef68-44d4-86eb-dbdb293853bb/alexa-skill-recipe-making-http-requests-to-get-data-from-an-external-api)

* [Using the Device Address API to Request Information](https://developer.amazon.com/blogs/alexa/post/0c975fc7-17dd-4f5c-8343-a37024b66c99/alexa-skill-recipe-using-the-device-address-api-to-request-information)

* [Improving the Perceived Latency of API calls Using the Progressive Response API](https://developer.amazon.com/blogs/alexa/post/f952eca8-7f6f-4490-85d8-a805b50f6d25/alexa-skill-recipe-improving-the-perceived-latency-of-api-calls-using-the-progressive-response-api)

* [Using Session Attributes to Enable Repeat Responses](https://developer.amazon.com/blogs/alexa/post/2279543b-ed7b-48b4-a3aa-d273f7aab609/alexa-skill-recipe-using-session-attributes-to-enable-repeat-responses)

* [Making the Most of Devices that Support Displays](https://developer.amazon.com/blogs/alexa/post/6839eb1c-f718-41cd-ad0c-6ba59c5360f5/alexa-skill-recipe-making-the-most-of-devices-that-support-display)

* [Randomize Responses to add Variety to your Skill](https://developer.amazon.com/blogs/alexa/post/37e732b7-48fa-4940-9f12-9ffde7eeeaf8/alexa-skill-recipe-randomize-your-responses-to-add-variety-to-your-skill)

### Videos
Include live coding, best practices and key design related concepts.

* Monetization
	* [Adding Subscriptions](https://www.twitch.tv/videos/262380061?collection=S5XU_o_CLxWRcg)
	* [Adding In Skill Purchasing](https://www.twitch.tv/videos/264614234?collection=S5XU_o_CLxWRcg)
	* [Make Money with Alexa Skills: Introduction](https://www.twitch.tv/videos/264614234?collection=S5XU_o_CLxWRcg)
	* [Getting Started](https://www.twitch.tv/videos/262022441?collection=S5XU_o_CLxWRcg)
* Smarthome
	* [Alexa Smarthome API](https://www.twitch.tv/videos/236254801) 
* Design
	* [How Building for Voice Differs from Buiding for the Screen](https://www.twitch.tv/videos/257516300)	 

You can visit our twitch channel here for more: [https://www.twitch.tv/amazonalexa/videos/all](https://www.twitch.tv/amazonalexa/videos/all)

### Additional Resources
DevPost
Hackster
Alexa Forums
Official Github
Official Twitter Channel
Codecademy