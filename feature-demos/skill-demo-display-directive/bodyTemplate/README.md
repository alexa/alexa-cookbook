# Display Interface Skill for Echo Show

## What you will learn
This sample modifies the node.js Fact skill sample to:
- Detect a request from an Echo Show (which supports the [display directive](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/display-interface-reference)) or the Echo Show renderer simulator
- Use the [Display.RenderTemplate](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/display-interface-reference#form-of-the-displayrendertemplate-directive) directive to display a [bodyTemplate1](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/display-interface-reference#bodytemplate1)

## Install Steps
### Create a Fact Skill

 * Build a fact skill using [this tutorial](https://github.com/alexa/skill-sample-nodejs-fact)
 * Be sure to run ```npm install``` to get the lastest node SDK. You need version 1.0.11

### On your Skill Information cover page, click Render Template = Yes and save

### Replace your Lambda function code with the provided ```index.js```

 * Open your Lambda Function, select all the code, delete, and paste in the contents of [index.js](index.js) and save.

* OPTIONAL: to use the ```listTemplate``` and ```ElementSelected``` which are not shown in this sample, you also need to run ```npm install``` to get the lastest node SDK. You need version 1.0.11. See the [listTemplate](https://github.com/alexa/alexa-cookbook/tree/master/display-directive/listTemplate) sample for more detail.

### Test Your Skill
  You can test your skill using:

  - Your Echo Show
  - The new Simulator panel on the very bottom of the Test page of your skill in developer.amazon.com
  - The AWS Lambda console using the sample unit test requests found in the [test_events](test_events) folder

**Highlighted changes**

- ```supportsDisplay()``` returns true if the device supports the Display directive
- ```isSimulator()``` returns true if the request is from the simulator
- ```renderTemplate()``` creates the display template. Inside this function, create the templates you want for your scenario. Then, call this function with which of your templates you want to use and the content that will populate that template.
- Look in the GetFact event handler to see how to use these three functions together.

**See Also**
- [Build for Echo Show](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/build-skills-for-echo-show)
- [Display Interface Reference](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/display-interface-reference)
- [Design Guide Videos for Echo Show](https://developer.amazon.com/designing-for-voice/what-alexa-says/)
- [Design Guide on Choosing the Right Template](https://developer.amazon.com/designing-for-voice/what-alexa-says/#choose-the-right-template-on-echo-show)
- [Announce Post](https://developer.amazon.com/blogs/alexa/post/50d2ed06-6a81-415c-a842-b335c7f967df/build-skills-for-echo-show-new-alexa-skills-kit-features-for-display-and-video-interfaces)
