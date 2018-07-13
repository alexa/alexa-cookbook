package com.amazon.ask.address.handlers;

import com.amazon.ask.address.Constants;
import com.amazon.ask.dispatcher.exception.ExceptionHandler;
import com.amazon.ask.dispatcher.request.handler.HandlerInput;
import com.amazon.ask.model.Response;

import java.util.Optional;

public class GenericExceptionHandler implements ExceptionHandler {
    @Override
    public boolean canHandle(HandlerInput input, Throwable throwable) {
        return true;
    }

    @Override
    public Optional<Response> handle(HandlerInput input, Throwable throwable) {
        throwable.printStackTrace();
        return input.getResponseBuilder()
                .withSpeech(Constants.ERROR)
                .build();
    }
}
