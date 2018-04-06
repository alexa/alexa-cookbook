
  // 1. Text strings =====================================================================================================
  //    Modify these strings and messages to change the behavior of your Lambda function

  const languageStrings = {
      'en': {
          'translation': {
              'WELCOME' : "Welcome to the Breakfast Sandwich Recipe skill. ",
              'TITLE'   : "Breakfast Sandwich",
              'HELP'    : "This skill will show you how to make a breakfast sandwich.  You can ask for the list of ingredients, or just say begin cooking if you are ready. Once you are cooking, just say Next to advance to the next step in the recipe. You can also pause the recipe at any time by saying Pause.",
              'STOP'    : "Okay, see you next time! "
          }
      }
      // , 'de-DE': { 'translation' : { 'WELCOME'   : "Guten Tag etc." } }
  };
  const data = {
    // TODO: Replace this data with your own.
      "ingredients" :
          [
              {"name": "bread",  "qty": 2, "units": "pieces of"},
              {"name": "egg",    "qty": 1, "units": ""  },
              {"name": "cheese", "qty": 1, "units": "slice of" }
          ],
      "steps" :
      [
          "Heat a frying pan on your stove over medium heat.",
          "Crack an egg in the skillet and heat until the egg becomes firm.",
          "Flip the egg with a spatula.",
          "Lay the cheese on top of the egg.",
          "Using a spatula, remove egg and cheese and place on one piece of bread.",
          "Place second piece of bread over the egg and cheese.",
          "Serve."
      ]
  };

  const welcomeCardImg = {
      smallImageUrl: 'https://s3.amazonaws.com/webappvui/img/breakfast_sandwich_small.png',
      largeImageUrl: 'https://s3.amazonaws.com/webappvui/img/breakfast_sandwich_large.png'
  };
  // 2. Skill Code =======================================================================================================

  const Alexa = require('alexa-sdk');
  const AWS = require('aws-sdk');  // this is defined to enable a DynamoDB connection from local testing
  const AWSregion = 'us-east-1';   // eu-west-1
  var persistenceEnabled;
  AWS.config.update({
      region: AWSregion
  });

  exports.handler = function(event, context, callback) {
      var alexa = Alexa.handler(event, context);
      // alexa.appId = 'amzn1.echo-sdk-ams.app.1234';
      // alexa.dynamoDBTableName = 'RecipeSkillTable'; // creates new table for session.attributes
      if (alexa.dynamoDBTableName == 'RecipeSkillTable' ){
        persistenceEnabled=true;
      } else {
        persistenceEnabled=false;
      }
      alexa.resources = languageStrings;
      alexa.registerHandlers(handlers);
      alexa.execute();

  };

  const handlers = {
      'LaunchRequest': function () {
          if (!this.attributes['currentStep'] ) {

              var say = this.t('WELCOME') + ' ' + this.t('HELP');

              this.response.cardRenderer(this.t('TITLE'), this.t('WELCOME'), welcomeCardImg);

          } else {

              var say = 'Welcome back.  You were on step '
                  + this.attributes['currentStep']
                  + '. Say restart if you want to start over. '
                  + ' Ready to continue with step '
                  + (parseInt(this.attributes['currentStep']) + 1 ).toString() + '?';

              this.response.cardRenderer('Continue?', "\n" + say);
          }
          this.response.speak(say).listen(say);
          this.emit(':responseReady');
      },

      'IngredientsIntent': function () {

          var say = "";
          var list = [];
          for (var i = 0; i < data.ingredients.length; i++) {
              var item = data.ingredients[i];
              list.push(item.qty + ' ' + item.units + ' ' + item.name);
          }
          say += sayArray(list,'and');
          say = 'The ingredients you will need are, ' + say + '. Are you ready to cook? ';
          var reprompt = 'Say yes if you are ready to begin cooking the recipe.';

          var cardlist = list.toString().replace(/\,/g, '\n');

          this.response.cardRenderer(this.t('TITLE') + ' shopping list', cardlist);
          this.response.speak(say).listen(reprompt);

          this.emit(':responseReady');

      },
      'CookIntent': function () {
          this.emit('AMAZON.NextIntent');
      },
      'AMAZON.YesIntent': function () {
          this.emit('AMAZON.NextIntent');

      },
      'AMAZON.NoIntent': function () {
          this.response.speak('Okay, see you next time!');
          this.emit(':responseReady');
      },
      'AMAZON.PauseIntent': function () {

          var say = "If you pause, you'll lose your progress. Do you want to go to the next step?";
          var reprompt = "Do you want to go to the next step?";

          // cross-session persistence is enabled
          if (persistenceEnabled){
            say = 'Okay, you can come back to this skill to pick up where you left off.';
          }
          this.response.speak(say);
          this.emit(':responseReady');
      },

      'AMAZON.NextIntent': function () {
          var currentStep = incrementStep.call(this, 1);
          var say = 'Step ' + currentStep + ', ' + data.steps[currentStep - 1];
          var reprompt = 'You can say Pause, Stop, or Next.';
          var sayOnScreen = data.steps[currentStep - 1];

          if(currentStep == data.steps.length ) {

              delete this.attributes['currentStep'];

              say += '. <say-as interpret-as="interjection">bon appetit</say-as>';
              this.response.cardRenderer(this.t('TITLE'), 'Bon Appetit!', welcomeCardImg);

          } else {
              reprompt += currentStep;
              this.response.cardRenderer('Step ' + currentStep, sayOnScreen);
              this.response.listen(reprompt);
          }
          this.response.speak(say);
          this.emit(':responseReady');
      },
      'AMAZON.PreviousIntent': function () {
        // subtract 2 because we will add 1 in AMAZON.NextIntent
        // for a net decrease of 1 which gives us the previous step.
        incrementStep.call(this, -2);
        this.emit('AMAZON.NextIntent');
      },
      'AMAZON.RepeatIntent': function () {
          if (!this.attributes['currentStep'] ) {
              this.attributes['currentStep'] = 0;
          } else {
              this.attributes['currentStep'] = this.attributes['currentStep'] - 1;
          }
          this.emit('AMAZON.NextIntent');
      },
      'AMAZON.HelpIntent': function () {
          if (!this.attributes['currentStep']) {  // new session
              this.response.speak(this.t('HELP')).listen(this.t('HELP'));
          } else {
              var currentStep = this.attributes['currentStep'];
              var say = 'you are on step ' + currentStep + ' of the ' + this.t('TITLE') + ' recipe. ';
              var reprompt = 'Say Next to continue or Ingredients to hear the list of ingredients.';
              this.response.speak(say + reprompt).listen(reprompt);
          }
          this.emit(':responseReady');
      },
      'AMAZON.StartOverIntent': function () {
          delete this.attributes['currentStep'];
          this.emit('LaunchRequest');
      },
      'AMAZON.NoIntent': function () {
          this.emit('AMAZON.StopIntent');
      },
      'AMAZON.HelpIntent': function () {
          this.response.speak(this.t('HELP')).listen(this.t('HELP'));
          this.emit(':responseReady');
      },
      'AMAZON.CancelIntent': function () {
          this.response.speak(this.t('STOP'));
          this.emit(':responseReady');
      },
      'AMAZON.StopIntent': function () {
          this.emit('SessionEndedRequest');
      },
      'SessionEndedRequest': function () {
          console.log('session ended!');
          this.response.speak(this.t('STOP'));
          this.emit(':responseReady');
      }
  };

  //    END of Intent Handlers {} ========================================================================================
  // 3. Helper Function  =================================================================================================

  function incrementStep(increment){
    if (!this.attributes['currentStep'] ) {
        this.attributes['currentStep'] = 1;
    } else {
        this.attributes['currentStep'] = this.attributes['currentStep'] + increment;
        if (this.attributes['currentStep'] < 0) {
          this.attributes['currentStep']=0;
        }
    }
    return this.attributes['currentStep'];
  }


  function sayArray(myData, andor) {
      //say items in an array with commas and conjunctions.
      // the first argument is an array [] of items
      // the second argument is the list penultimate word; and/or/nor etc.

      var listString = '';

      if (myData.length == 1) {
          //just say the one item
          listString = myData[0];
      } else {
          if (myData.length == 2) {
              //add the conjuction between the two words
              listString = myData[0] + ' ' + andor + ' ' + myData[1];
          } else if (myData.length == 4 && andor=='and'){
              //read the four words in pairs when the conjuction is and
              listString=myData[0]+" and "+myData[1]+", as well as, "
                  + myData[2]+" and "+myData[3];

          }  else {
              //build an oxford comma separated list
              for (var i = 0; i < myData.length; i++) {
                  if (i < myData.length - 2) {
                      listString = listString + myData[i] + ', ';
                  } else if (i == myData.length - 2) {            //second to last
                      listString = listString + myData[i] + ', ' + andor + ' ';
                  } else {                                        //last
                      listString = listString + myData[i];
                  }
              }
          }
      }

      return(listString);
  }

  function randomArrayElement(array) {
      var i = 0;
      i = Math.floor(Math.random() * array.length);
      return(array[i]);
  }
