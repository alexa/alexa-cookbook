## Title 
Saving the information from dialog 

### What does this helper function do
This sample code illustrates how you can save the information in the dialog. Using this helper function you could save all the slots that you fill in the middle of dialog, even if you jump to other intents before dialog finishes, all the information could still be saved. 

### Why use this helper function
Suppose you are in the middle of a dialog, you think about other intents and start talk to Alexa about other things, when you want to go back to the previous dialog, you don't want to reprompt for the same information. 

Example:
User: Plan My Trip.
Alexa: Where do you want to go? 
User: I want to go to Seattle.
Alexa: Where are you leaving from? 
User: I will leave from New York. 
Alexa: When are you flying out?
User: What date is today? (This is an example of jumping to another intent)
Alexa: Today is November 1st. Do you want to say "plan a trip" to finish your trip planning? 
User: Plan a trip.
Alexa: When are you flying out? (Continue with the previous dialog)
User: November 1st.
Alexa: Congratulations! You will be flying from New York to Seattle on November 1st. 

### Syntax
```
delegateSlotCollectionAndSaveSlotInfo
```

#### Parameter Values
No Parameter

### How to use this helper function
Here's an example of how you can use randomPhrase helper function to generate a random welcome greeting.

```js
For the sample dialog model code, instead of using delegateSlotCollection, use this helper function delegateSlotCollectionAndSaveSlotInfo, besides that nothing needs to be changed. 

'PlanMyTrip': function() {
        var filledSlots = delegateSlotCollectionAndSaveSlotInfo.call(this);

```

### Code Snippet
```
function delegateSlotCollectionAndSaveSlotInfo() {
    console.log("in delegateSlotCollection and save information from a dialog");
    console.log("current dialogState: " + this.event.request.dialogState);
    if (this.event.request.dialogState === "STARTED") {
        console.log("in Beginning");

        var updatedIntent = this.event.request.intent;
        if (this.event.request.dialogState === "STARTED") {
            console.log("in Beginning");
            var updatedIntentSlots = updatedIntent.slots;

            for (var key in updatedIntentSlots) {
                if (updatedIntentSlots.hasOwnProperty(key)) {
                    var val = updatedIntentSlots[key];
                    if (this.attributes[val.name]) {
                        val.value = this.attributes[val.name];
                    } else {
                        this.attributes[val.name] = val.value;
                    }
                }
            }
            console.log(updatedIntent);
            this.emit(":delegate", updatedIntent);
        }
    } else if (this.event.request.dialogState !== "COMPLETED") {
        console.log("in not completed");
        var updatedIntentInProgress = this.event.request.intent;
        var updatedIntentInProgressSlots = updatedIntentInProgress.slots;
        
        for (var key in updatedIntentInProgressSlots) {
            if (updatedIntentInProgressSlots.hasOwnProperty(key)) {
                var val_inprogress = updatedIntentInProgressSlots[key];
                if (this.attributes[val_inprogress.name]) {
                    val_inprogress.value = this.attributes[val_inprogress.name];
                } else {
                    this.attributes[val_inprogress.name] = val_inprogress.value;
                }
            }
        }
        // return a Dialog.Delegate directive with no updatedIntent property.
        console.log(updatedIntentInProgress);
        this.emit(":delegate");
    } else {
        console.log("in completed");
        console.log("returning: " + JSON.stringify(this.event.request.intent));
        // Dialog is now complete and all required slots should be filled,
        // so call your normal intent handler.
        return this.event.request.intent;
    }
}

### References
Forum question: 
https://forums.developer.amazon.com/questions/112156/using-helpintent-or-another-intent-during-dialog-m.html


