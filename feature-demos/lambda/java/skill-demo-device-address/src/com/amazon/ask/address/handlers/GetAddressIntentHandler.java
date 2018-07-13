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
import com.amazon.ask.dispatcher.request.handler.HandlerInput;
import com.amazon.ask.dispatcher.request.handler.RequestHandler;
import com.amazon.ask.model.Permissions;
import com.amazon.ask.model.Response;
import com.amazon.ask.model.services.deviceAddress.Address;
import com.amazon.ask.model.services.deviceAddress.DeviceAddressServiceClient;

import java.util.Collections;
import java.util.Optional;

import static com.amazon.ask.request.Predicates.intentName;

public class GetAddressIntentHandler implements RequestHandler {
    @Override
    public boolean canHandle(HandlerInput input) {
        return input.matches(intentName("GetAddressIntent"));
    }

    @Override
    public Optional<Response> handle(HandlerInput input) {
        Permissions permission = input.getRequestEnvelope().getContext().getSystem().getUser().getPermissions();
        if (permission != null) {
            String deviceId = input.getRequestEnvelope().getContext().getSystem().getDevice().getDeviceId();
            DeviceAddressServiceClient deviceAddressServiceClient = input.getServiceClientFactory().getDeviceAddressService();
            Address address = deviceAddressServiceClient.getFullAddress(deviceId);
            if (address == null) {
                return input.getResponseBuilder()
                        .withSpeech(Constants.NO_ADDRESS)
                        .build();
            } else {
                String addressMessage = Constants.ADDRESS_AVAILABLE + " " + address.getAddressLine1() + " " + address.getStateOrRegion() + " " + address.getPostalCode();
                return input.getResponseBuilder()
                        .withSpeech(addressMessage)
                        .build();
            }
        } else {
            return input.getResponseBuilder()
                    .withSpeech(Constants.NOTIFY_MISSING_PERMISSIONS)
                    .withAskForPermissionsConsentCard(Collections.singletonList(Constants.ALL_ADDRESS_PERMISSION))
                    .build();
        }
    }
}
