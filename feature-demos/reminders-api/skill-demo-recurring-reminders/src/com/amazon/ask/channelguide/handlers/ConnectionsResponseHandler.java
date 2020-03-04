package com.amazon.ask.channelguide.handlers;

import com.amazon.ask.channelguide.model.Show;
import com.amazon.ask.channelguide.util.ReminderUtil;
import com.amazon.ask.dispatcher.request.handler.HandlerInput;
import com.amazon.ask.model.Response;
import com.amazon.ask.model.interfaces.connections.ConnectionsResponse;
import com.amazon.ask.model.services.ServiceException;
import com.amazon.ask.model.services.reminderManagement.ReminderResponse;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

import static com.amazon.ask.channelguide.model.Constants.REMINDERS_PERMISSION;
import static com.amazon.ask.channelguide.model.Constants.SHOW_KEY;

public class ConnectionsResponseHandler implements com.amazon.ask.dispatcher.request.handler.impl.ConnectionsResponseHandler {

    private static final Logger log = LoggerFactory.getLogger(ConnectionsResponseHandler.class);

    @Override
    public boolean canHandle(HandlerInput input, ConnectionsResponse connectionsResponse) {
        return connectionsResponse.getName().equalsIgnoreCase("AskFor");
    }

    @Override
    public Optional<Response> handle(HandlerInput input, ConnectionsResponse connectionsResponse) {
        String code = connectionsResponse.getStatus().getCode();
        if (code.equalsIgnoreCase("200")) {
            String permissionRequestResult = (String) connectionsResponse.getPayload().getOrDefault("status", "");

            switch (permissionRequestResult) {
                case "ACCEPTED":
                    // The customer has granted the permissions, either in response to the last request or previously.
                    // Action: Continue with creating the reminder.
                    final ObjectMapper mapper = new ObjectMapper();
                    mapper.registerModule(new JavaTimeModule());

                    // Read stored attributes from token.
                    String token = connectionsResponse.getToken();
                    Show show;

                    try {
                        show = mapper.readValue(token, Show.class);
                    } catch (IOException e) {
                        log.error("Error deserializing token", e);
                        return input.getResponseBuilder()
                                .withSpeech("There was an error when setting the reminder.")
                                .withShouldEndSession(true)
                                .build();
                    }

                    try {
                        ReminderResponse response = ReminderUtil.createReminderForShow(input, show);

                        String speechText = String.format("Reminder for %s set", show.getName());

                        return input.getResponseBuilder()
                                .withSimpleCard("Channel Guide", speechText)
                                .withSpeech(speechText)
                                .withShouldEndSession(true)
                                .build();
                    } catch (ServiceException e) {
                        log.error("Error creating reminder", e);
                        if (e.getStatusCode() == 403) {
                            return input.getResponseBuilder()
                                    .withSpeech("Sorry, this device doesn\'t support reminders.")
                                    .withShouldEndSession(true)
                                    .build();
                        } else {
                            return input.getResponseBuilder()
                                    .withSpeech("There was an error when setting the reminder.")
                                    .withShouldEndSession(true)
                                    .build();
                        }
                    }
                case "DENIED":
                    // The customer has refused the permissions.
                    // Action: Quit.
                    //
                    // Skill should record this negative response to the permissions request, so that the customer
                    // does not receive an offer to set a reminder for another 7 days. If customers are inundated with
                    // the same request frequently, it runs the risk of having customers disabling the skill
                    // (similar to how someone might turn off app notifications for a mobile device).

                    return input.getResponseBuilder()
                            .withShouldEndSession(true)
                            .build();
                case "NOT_ANSWERED":
                default:
                    // The customer did not answer the request for permissions, or the response was not understood.
                    // In this case, Alexa will send a card to the Alexa app.
                    // Action: Tell customer that Alexa sent a permissions request card to the Alexa app.
                    return input.getResponseBuilder()
                            .withSpeech("Please enable Reminder permissions in the Amazon Alexa app using the card I\'ve sent to your Alexa app.")
                            .withShouldEndSession(true)
                            .build();
            }

        } else {
            // Something went wrong
            log.error("ConnectionsResponse indicated failure. Error: " + connectionsResponse.getStatus().getMessage());
            return input.getResponseBuilder()
                    .withSpeech("Please enable Reminder permissions in the Amazon Alexa app using the card I\'ve sent to your Alexa app.")
                    .withAskForPermissionsConsentCard(Collections.singletonList(REMINDERS_PERMISSION))
                    .withShouldEndSession(true)
                    .build();
        }
    }
}
