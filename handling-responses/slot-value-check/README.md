#### Ingredients
## slot-value-check <a id="title"></a>
<hr />


#### What you will learn

Users may not say everything you expect.  They may just say "my name is".
We can use a function that returns either null, or the value of the slot.

For example, if you had set slotName = "FirstName", you could check it via:

```js
var slotValue = isSlotValid(this.event.request, slotName); //slot value or false
        if  (slotValue) {  } else {   }
```

#### Instructions for deploying this sample skill

1. Create a new AWS Lambda function using the fact blueprint.
1. Delete the code, replace with [index.js](index.js)
1. Locate and Copy the AWS Lambda ARN for the new function.
1. Create a skill with a slot called Item
1. On the Configuration page, paste in your Lambda ARN as the endpoint.
1. Test your skill, both with and without saying slot words.

* Copy the ```isSlotValid()``` helper function to use in your code.

<hr />


