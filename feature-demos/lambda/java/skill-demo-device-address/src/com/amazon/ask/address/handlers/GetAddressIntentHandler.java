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
