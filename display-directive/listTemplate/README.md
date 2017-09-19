# Display Interface Skill for Echo Show

## What you will learn
This sample modifies the node.js Fact skill sample to:
- Detect a request from an Echo Show (which supports the [display directive](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/display-interface-reference)) or the Echo Show renderer simulator
- Use the [Display.RenderTemplate](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/display-interface-reference#form-of-the-displayrendertemplate-directive) directive to display a [bodyTemplate](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/display-interface-reference#bodytemplate1) and a [listTemplate](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/display-interface-reference#listtemplate1)
- how to do capability detection to determine if the requesting device supports Display directives (ex: Echo Show), does not (Echo, Echo dot, Fire TV), or is the simulator.
- This skill uses state management (ex: START, QUIZ, and not set). So, for example, the AnswerIntent does one thing in the START state (tells you about a state) and another thing in the QUIZ state (progresses you through the quiz). If you're not aware of this, following the flow of the code can be confusing. You can read more on [State in the SDK documentation](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs#making-skill-state-management-simpler)

## Install Steps
### Create a Quiz Game Skill

 * Build a quiz game skill using [this tutorial](https://github.com/alexa/skill-sample-nodejs-quiz-game)
 * Be sure to run ```npm install``` to get the lastest node SDK. You need version 1.0.11

### On your Skill Information cover page, click Render Template = Yes and save

### Replace your Lambda function code with the provided ```index.js```

 * Download the deployment package from your Lambda Function, (Actions > Export Function > Download Deployment Package) replace [index.js](index.js)
 * One time, run ```npm install``` to get the lastest node SDK. You need version 1.0.11
 * Compress and upload your package to Lambda. NOTE: compress the index file and the node_modules folder. DO NOT include their parent folder. Index must be at the root of your compressed file.


### Test Your Skill
  You can test your skill using:

  - Your Echo Show
  - The new Simulator panel on the very bottom of the Test page of your skill in developer.amazon.com
  - The AWS Lambda console using the sample unit test requests found in the [test_events](test_events) folder

**Highlighted changes**


- ```supportsDisplay()``` returns true if the device supports the Display directive
- ```isSimulator()``` returns true if the request is from the simulator
- ```renderTemplate()``` creates the display template. Inside this function, create the templates you want for your scenario. Then, call this function with which of your templates you want to use and the content that will populate that template.
- ```ElementSelected``` event handler. This is where you handle touch events

**See Also**
- [Build for Echo Show](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/build-skills-for-echo-show)
- [Display Interface Reference](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/display-interface-reference)
- [Design Guide Videos for Echo Show](https://developer.amazon.com/designing-for-voice/what-alexa-says/)
- [Design Guide on Choosing the Right Template](https://developer.amazon.com/designing-for-voice/what-alexa-says/#choose-the-right-template-on-echo-show)
- [Announce Post](https://developer.amazon.com/blogs/alexa/post/50d2ed06-6a81-415c-a842-b335c7f967df/build-skills-for-echo-show-new-alexa-skills-kit-features-for-display-and-video-interfaces)
