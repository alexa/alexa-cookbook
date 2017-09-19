## alexa-cookbook sample code

## There are three sections, Text Strings, Skill Code, and Helper Function(s).
## You can copy and paste the entire file contents as the code for a new Lambda function,
##  or copy & paste section #3, the helper function, to the bottom of your existing Lambda code.


## 1. Text strings =====================================================================================================
##    Modify these strings and messages to change the behavior of your Lambda function

myData = 'New York'
myUrl = 'https://cp6gckjt97.execute-api.us-east-1.amazonaws.com/prod/stateresource?usstate='


## 2. Skill Code =======================================================================================================

def speechResponse(say, endSession, sessionAttributes):
    print('say = ' + say);
    print
    return {
        'version': '1.0',
        'sessionAttributes': sessionAttributes,
        'response': {
            'outputSpeech': {
                'type': 'SSML',
                'ssml': say
            },
            'shouldEndSession': endSession
        }
    }

def lambda_handler(event, context):
    #print("Received event: " + json.dumps(event, indent=2))

    if event['request']['type'] == "LaunchRequest":

        pop = httpsGet(myData)   ## see the helper function defined below

        say =  "The population of " + myData + " is " + str(pop)

        return speechResponse(say, True, {})

    elif event['request']['type'] == "IntentRequest":

        intentName = event['request']['intent']['name']
        print('handling Intent', intentName)

        say = 'I heard your intent ' + intentName

        return speechResponse(say, False, {})

    elif event['request']['type'] == "SessionEndedRequest":
        say = 'goodbye'
        return speechResponse(say, True, {})


## 3. Helper Function  =================================================================================================
import json
import urllib2

 ## Requests: a separate Python Library   http://docs.python-requests.org/en/master/
 ##           to install with Python PIP:
 ##              open a command prompt in your /src folder and type
 ##              pip install requests -t .

import requests

def httpsGet(myData):

    global myUrl
    myLocalUrl = myUrl + urllib2.quote(myData)

    r = requests.get(myLocalUrl)

    myJs = r.json()

    if 'population' in myJs:
        return myJs['population']
    else:
        print 'Error, web service return data not in expected format'
        return 0




