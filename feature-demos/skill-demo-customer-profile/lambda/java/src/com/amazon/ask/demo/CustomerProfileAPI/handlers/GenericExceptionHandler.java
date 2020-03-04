package com.amazon.ask.demo.CustomerProfileAPI.handlers;

import com.amazon.ask.demo.CustomerProfileAPI.Constants;
import com.amazon.ask.dispatcher.exception.ExceptionHandler;
import com.amazon.ask.dispatcher.request.handler.HandlerInput;
import com.amazon.ask.model.Response;

import java.util.Optional;

public class GenericExceptionHandler implements ExceptionHandler {
    @Override
    public boolean canHandle(HandlerInput handlerInput, Throwable throwable) {
        return true;
    }

    @Override
    public Optional<Response> handle(HandlerInput handlerInput, Throwable throwable) {
        throwable.printStackTrace();
        return handlerInput.getResponseBuilder()
                .withSpeech(Constants.ERROR)
                .build();
    }
}
