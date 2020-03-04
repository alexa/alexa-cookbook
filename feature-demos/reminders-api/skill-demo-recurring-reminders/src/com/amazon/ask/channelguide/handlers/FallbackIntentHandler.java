package com.amazon.ask.channelguide.handlers;

import com.amazon.ask.dispatcher.request.handler.HandlerInput;
import com.amazon.ask.dispatcher.request.handler.RequestHandler;
import com.amazon.ask.model.Response;

import java.util.Optional;

import static com.amazon.ask.channelguide.model.Constants.FALLBACK_INTENT;
import static com.amazon.ask.request.Predicates.intentName;

public class FallbackIntentHandler  implements RequestHandler {
    @Override
    public boolean canHandle(HandlerInput input) {
        return input.matches(intentName(FALLBACK_INTENT));
    }

    @Override
    public Optional<Response> handle(HandlerInput input) {
        return input.getResponseBuilder()
                .withSpeech("Hmm. I'm not sure how to help you with that. This skill can set reminders for when shows will be on TV. What show did you want to know about?")
                .withShouldEndSession(false)
                .build();
    }
}
