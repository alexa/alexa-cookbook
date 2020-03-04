package com.amazon.ask.channelguide.handlers;

import com.amazon.ask.dispatcher.request.handler.HandlerInput;
import com.amazon.ask.dispatcher.request.handler.RequestHandler;
import com.amazon.ask.model.Response;

import java.util.Optional;

import static com.amazon.ask.channelguide.model.Constants.CANCEL_INTENT;
import static com.amazon.ask.channelguide.model.Constants.STOP_INTENT;
import static com.amazon.ask.request.Predicates.intentName;

public class CancelStopRequestHandler implements RequestHandler {
    @Override
    public boolean canHandle(HandlerInput input) {
        return input.matches(intentName(CANCEL_INTENT)) || input.matches(intentName(STOP_INTENT)) ;
    }

    @Override
    public Optional<Response> handle(HandlerInput input) {
        return input.getResponseBuilder()
                .withSpeech("Goodbye")
                .withShouldEndSession(true)
                .build();
    }
}
