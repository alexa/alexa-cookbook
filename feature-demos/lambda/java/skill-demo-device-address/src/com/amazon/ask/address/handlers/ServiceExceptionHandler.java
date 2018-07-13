/*
     Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
     Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file
     except in compliance with the License. A copy of the License is located at
         http://aws.amazon.com/apache2.0/
     or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for
     the specific language governing permissions and limitations under the License.
*/

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
