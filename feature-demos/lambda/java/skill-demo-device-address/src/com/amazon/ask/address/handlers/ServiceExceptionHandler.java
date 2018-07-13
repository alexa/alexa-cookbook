package com.amazon.ask.address.handlers;

import com.amazon.ask.address.Constants;
import com.amazon.ask.dispatcher.exception.ExceptionHandler;
import com.amazon.ask.dispatcher.request.handler.HandlerInput;
import com.amazon.ask.model.Response;
import com.amazon.ask.model.services.ServiceException;
import org.slf4j.Logger;

import java.util.Collections;
import java.util.Optional;

import static org.slf4j.LoggerFactory.getLogger;

public class ServiceExceptionHandler implements ExceptionHandler {
    private static Logger LOG = getLogger(ServiceException.class);

    @Override
    public boolean canHandle(HandlerInput input, Throwable throwable) {
        return throwable instanceof ServiceException;
    }

    @Override
    public Optional<Response> handle(HandlerInput input, Throwable throwable) {
        LOG.debug("Error message : " + throwable.getMessage());
        ServiceException e = (ServiceException)throwable;
        if (e.getStatusCode() == 403) {
            return input.getResponseBuilder()
                    .withSpeech(Constants.NOTIFY_MISSING_PERMISSIONS)
                    .withAskForPermissionsConsentCard(Collections.singletonList(Constants.ALL_ADDRESS_PERMISSION))
                    .build();
        }
        return input.getResponseBuilder()
                .withSpeech(Constants.LOCATION_FAILURE)
                .withReprompt(Constants.LOCATION_FAILURE)
                .build();
    }
}
