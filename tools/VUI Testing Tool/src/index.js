'use strict';

const Alexa = require('alexa-sdk');

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {
    //By having a single 'Unhandled' handler, we ensure all requests are route to it
    'Unhandled': function () {
        //log the event sent by the Alexa Service in human readable format
        console.log(JSON.stringify(this.event));
        let skillId, requestType, dialogState, intent ,intentName, intentConfirmationStatus, slotArray, slots, count;

        try {
            //Parse necessary data from JSON object using dot notation
            //build output strings and check for undefined
            skillId = this.event.session.application.applicationId;
            requestType = "The request type is, "+this.event.request.type+" .";
            dialogState = this.event.request.dialogState;
            intent = this.event.request.intent;
            if (intent != undefined) {
                intentName = " The intent name is, "+this.event.request.intent.name+" .";
                slotArray = this.event.request.intent.slots;
                intentConfirmationStatus = this.event.request.intent.confirmationStatus;

                if (intentConfirmationStatus != "NONE" && intentConfirmationStatus != undefined ) {
                    intentConfirmationStatus = " and its confirmation status is "+ intentConfirmationStatus+" . ";
                    intentName = intentName+intentConfirmationStatus;
                }
            } else {
                intentName = "";
                slotArray = "";
                intentConfirmationStatus = "";
            }

            slots = "";
            count = 0;

            if (slotArray == undefined || slots == undefined) {
                slots = "";
            }

            //Iterating through slot array
            for (let slot in slotArray) {
                count += 1;
                let slotName = slotArray[slot].name;
                let slotValue = slotArray[slot].value;
                let slotConfirmationStatus = slotArray[slot].confirmationStatus;
                slots = slots + "The <say-as interpret-as='ordinal'>"+count+"</say-as> slot is, " + slotName + ", its value is, " +slotValue;

                if (slotConfirmationStatus!= undefined && slotConfirmationStatus != "NONE") {
                  slots = slots+" and its confirmation status is "+slotConfirmationStatus+" . ";
                } else {
                  slots = slots+" . ";
                }
            }

            //Delegate to Dialog Manager when needed
            //<reference to docs>
            if (dialogState == "STARTED" || dialogState == "IN_PROGRESS") {
              this.emit(":delegate");
            }
        } catch(err) {
            console.log("Error: " + err.message);
        }

        let speechOutput = "Your end point received a request, here's a breakdown. " + requestType + " " + intentName + slots;
        let cardTitle = "Skill ID: " + skillId;
        let cardContent = speechOutput;

        this.response.cardRenderer(cardTitle, cardContent);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
  }
};
