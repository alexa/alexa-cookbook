#### Ingredients
## Random Phrase <a id="title"></a>

### What you will learn

You can make Alexa say a random phrase to the user that will vary each time the skill is invoked.  This will give Alexa a more unpredictable, human behaviour.

For example, you can define a list of possible greetings:

    var myRequest = ['hello','howdy','hi', 'good day'];

You pass in this array and the function will select and return one of the items at random.

    this.emit(':tell', 'the welcome message is, ' + randomPhrase(myRequest) );


### Instructions for deploying this sample skill
[Part 2 - Create the skill](./PAGE2.md#title)

<hr />

Back to the [Home Page](../../README.md#title)
