package com.amazon.ask.channelguide.handlers;

import com.amazon.ask.dispatcher.request.handler.HandlerInput;
import com.amazon.ask.dispatcher.request.handler.RequestHandler;
import com.amazon.ask.model.Response;

import java.util.Optional;

import static com.amazon.ask.channelguide.model.Constants.HELP_INTENT;
import static com.amazon.ask.request.Predicates.intentName;

public class HelpRequestHandler implements RequestHandler {
    @Override
    public boolean canHandle(HandlerInput input) {
        return input.matches(intentName(HELP_INTENT));
    }

    @Override
    public Optional<Response> handle(HandlerInput input) {
        return input.getResponseBuilder()
                .withSpeech("You can ask, when is the next episode of Kings and Thrones. Which show would you like to know more information about?")
                .withShouldEndSession(false)
                .build();
    }
}
