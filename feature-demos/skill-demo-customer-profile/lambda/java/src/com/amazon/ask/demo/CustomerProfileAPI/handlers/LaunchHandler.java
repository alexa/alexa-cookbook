package com.amazon.ask.demo.CustomerProfileAPI.handlers;

import com.amazon.ask.demo.CustomerProfileAPI.Constants;
import com.amazon.ask.dispatcher.request.handler.HandlerInput;
import com.amazon.ask.dispatcher.request.handler.impl.LaunchRequestHandler;
import com.amazon.ask.model.LaunchRequest;
import com.amazon.ask.model.Response;

import java.util.Optional;

public class LaunchHandler implements LaunchRequestHandler {
    @Override
    public boolean canHandle(HandlerInput handlerInput, LaunchRequest launchRequest) {
        return true;
    }

    @Override
    public Optional<Response> handle(HandlerInput handlerInput, LaunchRequest launchRequest) {
        return handlerInput.getResponseBuilder()
                .withSpeech(Constants.WELCOME)
                .withReprompt(Constants.WHAT_DO_YOU_WANT)
                .build();
    }
}