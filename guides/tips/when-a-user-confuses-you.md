# Creating a Message When the User Confuses You

Because of the nature of voice interactions, there will be times where a user says something that your skill just didn't anticipate.  In those cases, it is helpful to acknowledge what the user said, and indicate that you didn't know how to handle their request.

In some cases, Alexa might have just misunderstood the user.  By repeating what Alexa heard, the user can try to correct their request to get it right the second time.  In other cases, your skill just doesn't know how to handle their request.  This still lets them know that you're aware, and gives them an opportunity to try something else.

To address this situation, create a function named `getRandomConfusionMessage(value)` with a parameter of `value`.  An example (with the required helper function) is:

```javascript
    function getRandom(min, max)
    {
        return Math.floor(Math.random() * (max-min+1)+min);
    }

    function getRandomConfusionMessage(value)
    {
        var spokenWords = "I heard you say " + value + " ";
        var messages = ["I don't seem to know how to answer that one yet, but I'll work on it.",
                    "Hmmm.  I can't seem to figure that one out.",
                    "There's a chance I misunderstood you, but I don't know how to answer your question.",
                    "I'm sorry. I don't know how to help you with that.",
                    "I don't have an answer for you today, but I'll add it to my list of things I should learn soon!"];
        var random = getRandom(0, messages.length-1);
        return spokenWords + "<break time='500ms'/>" + messages[random];
    }
```

From your intent handling code, you can call `getRandomConfusionMessage(value)`, and it will return a message indicating the miss to your user.  The "value" is the slot text that you received.  (To easily grab a slot value, check out [Retrieving A Slot Value](./getting-a-slot-value.md).) Here is an example:

```javascript
    var speechText = getRandomConfusionMessage(value);
```

The list of messages you include can vary based on your skill and the amount of 'personality' you want them to have. You will also need different ones for each locale/language your skill supports.

This approach could be used with the **AMAZON.FallbackIntent**, however you won't get a slot value in that case, so your message will be generic and should include guidance that can help point the customer in the right direction, for example:

> **Alexa:** :loud_sound: _The Super Hero Game skill can't help you with that, but can play games related to super heroes. To learn more, ask for help. What can I do for you?_
