# Retrieving A Slot Value

When building a skill, you will often need to retrieve the value your user indicated as a slot.  You can directly check `handlerInput.requestEnvelope.request.intent.slots.SLOTNAME.value` in each case, but this doesn't offer you the safety of validating that the slot actually exists before your request.

You can add the the following helper function, `getSlotValue()` with parameters of **request** and **slotName** into your code to provide a safe, easy way to retrieve your slot values.

```javascript
    function getSlotValue(request, slotName)
    {
        if (request.intent && request.intent.slots && request.slots[slotName] && request.intent.slots[slotName].value) return request.intent.slots[slotName].value;
        else return "";
    }
```

From your intent, you can call `getSlotValue(slotname)`, and it will return the value of the slot if it exists. For example, if you have a slot named **activities**, add this code:

```javascript
    const activitiesSlotValue = getSlotValue(handlerInput.requestEnvelope.request, 'activities');
```
