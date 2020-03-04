package com.amazon.ask.demo.DeviceLocation.handlers;

import com.amazon.ask.demo.DeviceLocation.Constants;
import com.amazon.ask.dispatcher.request.handler.HandlerInput;
import com.amazon.ask.dispatcher.request.handler.RequestHandler;
import com.amazon.ask.model.Response;

import java.util.Optional;

public class UnsupportedRequestHandler implements RequestHandler {

    @Override
    public boolean canHandle(HandlerInput input) {
        return true;
    }

    @Override
    public Optional<Response> handle(HandlerInput input) {
        return input.getResponseBuilder()
                .withSpeech(Constants.UNHANDLED)
                .withReprompt(Constants.UNHANDLED)
                .build();
    }

}
