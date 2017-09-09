
### Alexa Skill Building Cookbook
## Flash Cards <a id="title"></a>


#### Welcome! <a id="intro"></a>

Have you ever wanted to learn some information fast?
Maybe in school you were required to learn the capitals of each state, or the meaning of 20 new vocabulary words each week, or the various questions in learning the 12 x 12 multiplication table.
You may have created a stack of flash cards, each one with a question on one side and the answer on the reverse side.
You would shuffle the stack, and then go through each of the questions and see how many you could answer correctly.
Any cards you did not know the answer to, you would have put into a separate pile for extra practice.
Eventually this practice pile would get down to zero as you practiced them over and over.
At this point you were ready to take an actual quiz, to see how well you scored.

#### College Flash Cards
You can enable the skill [College Flash Cards](https://www.amazon.com/Robert-McCauley-College-Flash-Cards/dp/B072R1PN7T/ref=sr_1_1?s=digital-skills&ie=UTF8&qid=1497843203&sr=1-1&keywords=college+flash+cards)
to see this skill in action.

Here is the description:

  * *It's March Madness, or graduation time, or time to apply to colleges. People are throwing out college names, but you may not have heard of them or be able to picture which part of the U.S. the school is in. College Flash Cards has a rotating list of 10 colleges and universities, and will ask you to name the state where each college is based. You can choose Practice mode to review all questions, or choose Quiz to be tested and graded on 5 random questions.*

#### Question List

Near the top of the ```index.js``` file, there is an array of facts called questionList.
Each line contains the question and one or more possible correct answers.
Alexa prompts the user to say the name of a U.S. state as the answer format, however if the user says the correct city, that is also acceptible.


```
    { question:"Drexel",  answer:["Pennsylvania","Philadelphia"] },
```

#### Practice vs Quiz

The game has four main modes, Practice, Quiz, Practice Recap, and Quiz Recap.
Users typically start by saying "Practice" and then Alexa will guide them through each and every card.
There is a special function called ```rateAnswer``` that decides if the answer is correct, and if not, appends the question to the ```wrongList``` session attribute, for the user to re-practice.
This wrongList is returned to the user via ```this.emit(":askWithCard", ... )``` so that the user can see and review all wrong answered questions on their Alexa app or via the cards shown on [alexa.amazon.com](https://alexa.amazon.com).

#### Get Started
Install the skill via the /speechAssets files and link it to a new AWS Lambda function created from the /src/index.js file.

*Full Tutorial coming soon.*


<hr />

Back to the [github.com/alexa/alexa-cookbook](https://github.com/alexa/alexa-cookbook) home page.

