# Resources: Intents and Slots
In this folder you will find intents you can use as a starting point for your skill.  They are grouped by general use case, and if there is an intent that is designed to work with a slot of a specific type, that slot type will be included as part of the resource. In some cases, the resource is just a slot type, which you can add to your interaction model.

> You will get the best recognition results when using [built-in intents](https://developer.amazon.com/docs/custom-skills/built-in-intent-library.html) and [built-in slots](https://developer.amazon.com/docs/custom-skills/slot-type-reference.html). Before using a custom intent or slot, check the list of available built-in intents and slots for one suitable to your use case.

[Jump straight to Resource Categories](#categories)

## Using Cookbook Intents
For each intent, there are two formats supplied.  The content is identical, so choose the format that works best for you.  The first is a simple list of utterances.  This is useful when you want to copy/paste the utterances into the [Bulk Edit](https://developer.amazon.com/docs/custom-skills/create-intents-utterances-and-slots.html#edit-or-upload-sample-utterances-in-bulk) option when creating an intent.  The second is when you want to integrate the intent into a JSON-based interaction model (either through the [developer console](https://developer.amazon.com/docs/custom-skills/create-intents-utterances-and-slots.html#json-for-intents-and-utterances-interaction-model-schema) or through another tool).

In the case of using the simple list, you will first need to create the intent.  When you create the intent, we strongly encourage you to use the intent name as provided.  This will allow you (or those who follow you) to know it was sourced from the Alexa Cookbook.  You will be able to return to the Alexa Cookbook to refresh/update your sample utterances with any newly added ones.

If you have additional sample utterances to add, please create an issue or a pull request on the specific intent page.

## Using Cookbook Slots
For each slot type, there are two formats supplied.  The content is identical, so choose the format that works best for you.  The first is a comma-separated list of values.  This is useful when you want to copy/paste the utterances into the Bulk Edit option when creating a slot type.  The second is when you want to integrate the intent into a JSON-based interaction model (either through the developer console or through another tool).

In the case of using the CSV list, you will first need to create the slot type.  When you create the slot type, we strongly encourage you to use the slot type name as provided.  This will allow you (or those who follow you) to know it was sourced from the Alexa Cookbook.  You will be able to return to the Alexa Cookbook to refresh/update your the slot type with any newly added values.

If you have additional values or synonyms to add, please create an issue or a pull request on the specific slot type’s page.

## Categories
- [General](./general)
- [Monetization (general)](./monetization)
- [Real-World Goods and Services](./physical-commerce)
