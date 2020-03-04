package com.amazon.ask.channelguide.handlers;

import com.amazon.ask.dispatcher.request.handler.HandlerInput;
import com.amazon.ask.dispatcher.request.handler.RequestHandler;
import com.amazon.ask.model.LaunchRequest;
import com.amazon.ask.model.Response;

import java.util.Optional;

import static com.amazon.ask.request.Predicates.requestType;

public class LaunchRequestHandler implements RequestHandler {
    @Override
    public boolean canHandle(HandlerInput input) {
        return input.matches(requestType(LaunchRequest.class));
    }

    @Override
    public Optional<Response> handle(HandlerInput input) {
        String speechText = "Welcome to Channel Guide. You can ask, when is the next episode of Kings and Thrones. Which show would you like to know more information about?";
        String repromptText = "Which show would you like to know more information about?";
        return input.getResponseBuilder()
                .withSimpleCard("Channel Guide", speechText)
                .withSpeech(speechText)
                .withReprompt(repromptText)
                .build();
    }
}
