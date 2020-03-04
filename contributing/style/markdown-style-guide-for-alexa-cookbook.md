# Alexa Cookbook Markdown Style Guide

The documentation found in the Alexa Cookbook will be presented in GitHub Flavored Markdown files (e.g. .md). In order to drive consistency and make it easier for developer to use, the following style guide will provide a baseline for how markdown files will be formatted.

* Use double-asterix, e.g. **bold**, for something the reader should be looking for on the screen.
* Use underscores, e.g. _speech_, for something the reader should be hearing or speaking.
* Use single backticks, e.g. `code`, for something the reader will need to type.
* Use triple-backticks for multi-line / blocks of code, with the language type (e.g. javascript) to ensure proper syntax highlighting.
* Use **1.** for all numbered lists. If a numbered list restarts after some code or a note, indent the code so **1.** can be used.
* For cases where a customer is speaking (to Alexa), use:
  ```
  **Customer:** :speech_balloon: _"Alexa, open name the show"_
  ```
  to get:

  **Customer:** :speech_balloon: _"Alexa, open name the show"_
* For cases where Alexa is speaking, use:
  ```
  **Alexa:** :loud_sound: _"Welcome to Name the Show, the game where you try to guess the show based on the actors in it.  Are you ready to begin?"_
  ```
  to get:
 
  **Alexa:** :loud_sound: _"Welcome to Name the Show, the game where you try to guess the show based on the actors in it.  Are you ready to begin?"_
* Use relative links whenever possible.
* Include links to later sections (if they exist), if the page is longer than two screens.