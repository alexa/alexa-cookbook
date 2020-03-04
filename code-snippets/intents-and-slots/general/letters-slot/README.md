# Letters Slot Type

Sometimes a customer needs to say letters to input a code (e.g. tracking number). This slot type helps when those values are individual letters instead of words.

> **WARNING** This slot is the combination of various phonetic alphabets, so there could be words that overlap with other slot values or sample utterances, including built-in's. (E.g. "william" is likely to be part of the AMAZON.US_FIRST_NAME built-in slot.) Be sure to review and remove any conflicting values.

We strongly recommend that you use the slot type name of **COOKBOOK_LettersSlotType** so that you know that you based the slot type on content from the Alexa Cookbook and can return here to refresh/update your slot type with any newly added utterances.

## List of Utterances
Use these values if your tool uses a simple list as the input mechanism (e.g. developer console’s [Bulk Edit](https://developer.amazon.com/docs/custom-skills/create-intents-utterances-and-slots.html#edit-or-upload-sample-utterances-in-bulk)).

> Note: the slot type values are comma separated in this order: value, id, synonym1, synonym2, ...

Available languages/locales:
- [English US](./en-US.txt)
- [English UK](./en-GB.txt)

## SlotType Schema JSON Snippet
Use this JSON Snippet if you are editing the interaction model JSON directly.

Available languages/locales:
- [English US](./en-US.json)
- [English UK](./en-GB.json)

[Return to General category page](..)
