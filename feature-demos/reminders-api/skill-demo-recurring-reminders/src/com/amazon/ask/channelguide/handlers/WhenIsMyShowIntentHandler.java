package com.amazon.ask.channelguide.handlers;

import com.amazon.ask.channelguide.model.Show;
import com.amazon.ask.dispatcher.request.handler.HandlerInput;
import com.amazon.ask.dispatcher.request.handler.RequestHandler;
import com.amazon.ask.model.Intent;
import com.amazon.ask.model.IntentRequest;
import com.amazon.ask.model.Request;
import com.amazon.ask.model.Response;
import com.amazon.ask.model.Slot;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static com.amazon.ask.channelguide.model.Constants.PREVIOUS_INTENT_KEY;
import static com.amazon.ask.channelguide.model.Constants.SHOWS;
import static com.amazon.ask.channelguide.model.Constants.SHOW_KEY;
import static com.amazon.ask.channelguide.model.Constants.SHOW_SLOT;
import static com.amazon.ask.channelguide.model.Constants.WHEN_IS_MY_SHOW_INTENT;
import static com.amazon.ask.request.Predicates.intentName;

public class WhenIsMyShowIntentHandler implements RequestHandler {

    @Override
    public boolean canHandle(HandlerInput input) {
        return input.matches(intentName(WHEN_IS_MY_SHOW_INTENT));
    }

    @Override
    public Optional<Response> handle(HandlerInput input) {

        Request request = input.getRequestEnvelope().getRequest();
        IntentRequest intentRequest = (IntentRequest) request;
        Intent intent = intentRequest.getIntent();
        Map<String, Slot> slots = intent.getSlots();

        Slot showSlot = slots.get(SHOW_SLOT);
        String speechText;

        if (showSlot == null) {
            return createResponse(input, "Please provide a show to lookup.", false);
        }

        Optional<Show> showMatch = lookupShow(showSlot.getValue());
        if(!showMatch.isPresent()) {
            speechText = String.format("Couldn't find any show called %s", showSlot.getValue());
            return createResponse(input, speechText, true);
        }

        Show show = showMatch.get();

        Map<String, Object> attributes = new HashMap<>();
        attributes.put(SHOW_KEY, show);
        attributes.put(PREVIOUS_INTENT_KEY, WHEN_IS_MY_SHOW_INTENT);
        input.getAttributesManager().setSessionAttributes(attributes);

        speechText = String.format("%s airs %s. Would you like me to " +
                "remind you when it airs?", show.getName(), show.getShowTime().getSpeakableText());

        return createResponse(input, speechText, false);
    }

    private Optional<Response> createResponse(HandlerInput input, String speechText, boolean endSession) {
        return input.getResponseBuilder()
                .withSimpleCard("Channel Guide", speechText)
                .withSpeech(speechText)
                .withShouldEndSession(endSession)
                .build();
    }

    private Optional<Show> lookupShow(final String show) {
        return SHOWS.stream().filter(s -> s.getName().equalsIgnoreCase(show)).findFirst();
    }

}