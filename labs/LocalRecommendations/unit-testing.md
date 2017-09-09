#Unit Testing Your Alexa Skills

There are many ways to test your Alexa skill code, and I'm sure others will have similar or superior solutions, but this just works.  And it works well!

To start, we are going to use three things to make all of this work.  The first is AWS Lambda, of course.  If you haven't built a skill for Alexa before, you're going to want to learn that first before you dive into unit testing those skills.  Once you've gotten your Lambda function set up, however, you're most of the way there.

The second step involves another AWS product, API Gateway.  It will become the HTTP front end to your Lambda function.  It will catch the POST messages that we want to pass to our function, and funnels the JSON response back, so that we can validate our request against our specific testing criteria.  Let's look at setting this up.

##Configuring API Gateway
1. To start, go to [AWS API Gateway](https://aws.amazon.com/api-gateway/) and sign in to the console.

2. From there, you are going to click on the "Create API" button near the top of the page.

3. First, make sure that you have chosen "New API" from the radio buttons at the top of the page.

4. Next, you need to give your API a name and description.  For this example, name your API "Alexa Skill API."  The description can be anything you want.  Click the "Create API" button in the bottom right of the screen.

5. Our next step is to create a resource inside our API.  Click the "Actions" button at the top of the page, and choose "Create Resource."

6. Give your New Child Resource the name "Alexa Resource."  It should populate the Resource Path automatically for you with "alexa-resource."  After this, you can click the "Create Resource button in the bottom right corner of the screen.

7. You should see your new resource in the Resources pane.  Click the Actions button again, and choose "Create Method."

8. We need to make our resource able to catch POST requests, so in the new dropdown box that was created, choose POST from the options, and click the round checkbox button.

9. For the setup of your POST function, you can leave the Integration Type at "Lambda Function."  For the Lambda Region, choose the region where your Lambda function lives.  (Most commonly, this is "us-east-1.").

10. In the Lambda Function box, start typing the name of your Lambda function.  It should autocomplete for you.  Click the "Save" button at the bottom right corner of the screen.

11. One last time, we need to open the Actions button, and this time choose "Deploy API."  In the Deploy API box that appears, choose "[New Stage]" for Deployment stage.  For the other three values (Stage Name, Stage description, and Deployment description), you can just use the word "Test" for all of them.  The values don't matter, it's just so that you know what the purpose of this new API is for.  

12. Click the Deploy Button.

13. Copy the Invoke URL from the blue box at the top of the screen, remembering that the Resource name you used was "alexa-resource."  Your API is set up and ready to roll.

##Using Postman to Test Your Lambda
1. If you don't already have this tool, make sure to download [Postman](https://www.getpostman.com/).

2. Create a profile, and log in to the Postman software.

3. Near the top center of the screen is a box with the words "Enter request URL."  Paste the Invoke URL from your API Gateway setup into this box.

4. Change the GET dropdown to POST.

5. Below the textbox, click the Headers tab.  For the key, use "Content-Type", and for the value, use "application/json."

6. On the Body tab, choose "raw" from the radio buttons, and paste a Lambda request in the large text box.

7. You should now be able to click the large blue Send button near the top right corner of the page. In the bottom half of the page, you should see another Body tab for the response.  Opening this should show you the actual response recieved from your Lambda function.

8. Once you've verified that you can successfully communicate with your Lambda, we can start building a suite of tests.

9. Back up at the top of the screen (but below the request URL textbox), there is another tab called "Tests."  In this tab, you can create as many tests as you would like for this request event.  For example, you want to verify that when you pass the value "K" to your Lambda function, that it returns the value "Potassium," (assuming you're building a skill related to the Periodic Table of Elements.)  To do this, you can use one of the convenient links on the right, or just use this text:

   '''JAVASCRIPT
   tests["Submitted 'K' as first name, expect 'Potassium' in response."] = responseBody === "Potassium";
   '''

10. Click the Send button again should show the Tests tab in the lower half with results similar to (1/1) or (0/1).  Clicking on this Tests tab at the bottom should show a list of all of your tests for this response, as well as their status. (Pass/Fail).

11. To save this for future use, there is a Save button next to the Send button we have been using in the top right corner of the screen.  CLick it to save this request and its tests.

12. In the box that appears, give your Request name something meaningful to your test, like "Submitted 'K', should receive 'Potassium.'"

13. The description is optional, but always helpful to remind yourself what the purpose of this test/request is.

14. Finally, create a new collection name.  I recommend naming it after your skill, as this will be where you can keep all of your tests for that skill.

15. On the left side of Postman, you have probably been operating in the History tab, where it shows you a result of each time you've pressed the Send button.  Click on the Collections tab, and you should now see a new collection with the same name as the one you just created.

16. You can click on an individual test to open/edit/run one of them, and you can can click on the three dots after a test to edit, duplicate, or delete it.

17. If you click the arrow that is next to your collection, there is a blue Run button that will run all of your requests and their tests at once, giving you instant verification about the status of your skill.

That is all!

