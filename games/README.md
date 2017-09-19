
### Alexa Skill Building Cookbook
## Games <a id="title"></a>


#### Welcome! <a id="intro"></a>

Gaming skills are a fun and engaging way to interact with Alexa.
You may be familiar with popular skills such as the [Jeopardy skill](https://www.amazon.com/Sony-Pictures-Television-Jeopardy/dp/B019G0M2WS/ref=sr_1_1?s=digital-skills&ie=UTF8&qid=1497841510&sr=1-1&keywords=jeopardy) or the [Animal Game](https://www.amazon.com/Alex-Rublinetsky-Animal-Game/dp/B017OBYNZU/ref=sr_1_1?s=digital-skills&ie=UTF8&qid=1497841561&sr=1-1&keywords=game).

While games are easy to play, building a new game skill may require significant design and development work.

A key concept for game skills is the use of session attributes, to set and get the state of gameplay.
In a simple case, a user's score might be incremented by 1 point at various times during the play:

```
this.attributes["score"] = this.attributes["score"] + 1;
```

At the end of the game, Alexa can get this attribute and say the score to the user:

```
var finalScore = this.attributes["score"];
this.emit(':ask','your score was ' + finalScore);
```

#### Ready to begin?

Click to [FlashCards](FlashCards), and scroll down to review the README.


<hr />

Back to the [github.com/alexa/alexa-cookbook](https://github.com/alexa/alexa-cookbook) home page.

