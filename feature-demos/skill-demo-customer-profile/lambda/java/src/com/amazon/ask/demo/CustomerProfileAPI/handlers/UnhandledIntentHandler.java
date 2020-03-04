package com.amazon.ask.demo.CustomerProfileAPI.handlers;

import com.amazon.ask.demo.CustomerProfileAPI.Constants;
import com.amazon.ask.dispatcher.request.handler.HandlerInput;
import com.amazon.ask.dispatcher.request.handler.RequestHandler;
import com.amazon.ask.model.Response;

import java.util.Optional;

public class UnhandledIntentHandler implements RequestHandler {
    @Override
    public boolean canHandle(HandlerInput handlerInput) {
        return true;
    }

    @Override
    public Optional<Response> handle(HandlerInput handlerInput) {
        return handlerInput.getResponseBuilder()
                .withSpeech(Constants.UNHANDLED)
                .withReprompt(Constants.UNHANDLED)
                .build();
    }
}