package com.amazon.ask.demo.CustomerProfileAPI.handlers;

import com.amazon.ask.demo.CustomerProfileAPI.Constants;
import com.amazon.ask.dispatcher.exception.ExceptionHandler;
import com.amazon.ask.dispatcher.request.handler.HandlerInput;
import com.amazon.ask.model.Response;
import com.amazon.ask.model.services.ServiceException;
import org.slf4j.Logger;

import java.util.Arrays;
import java.util.Optional;

import static org.slf4j.LoggerFactory.getLogger;

public class ServiceExceptionHandler implements ExceptionHandler {
    private static Logger LOG = getLogger(ServiceException.class);
    @Override
    public boolean canHandle(HandlerInput handlerInput, Throwable throwable) {
        return throwable instanceof ServiceException;
    }

    @Override
    public Optional<Response> handle(HandlerInput handlerInput, Throwable throwable) {
        LOG.debug("Error message : " + throwable.getMessage());
        ServiceException e = (ServiceException)throwable;
        if (e.getStatusCode() == 403) {
            return handlerInput.getResponseBuilder()
                    .withSpeech(Constants.NOTIFY_MISSING_PERMISSIONS)
                    .withAskForPermissionsConsentCard(Arrays.asList(Constants.NAME_PERMISSION, Constants.EMAIL_PERMISSION, Constants.MOBILE_NUMBER_PERMISSION))
                    .build();
        }
        return handlerInput.getResponseBuilder()
                .withSpeech(Constants.API_FAILURE)
                .withReprompt(Constants.API_FAILURE)
                .build();
    }
}