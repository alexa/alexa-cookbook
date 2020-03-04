package com.amazon.ask.channelguide.handlers;

import com.amazon.ask.channelguide.model.Show;
import com.amazon.ask.channelguide.util.ReminderUtil;
import com.amazon.ask.dispatcher.request.handler.HandlerInput;
import com.amazon.ask.dispatcher.request.handler.RequestHandler;
import com.amazon.ask.model.Response;
import com.amazon.ask.model.interfaces.connections.SendRequestDirective;
import com.amazon.ask.model.services.ServiceException;
import com.amazon.ask.model.services.reminderManagement.ReminderResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Optional;

import static com.amazon.ask.channelguide.model.Constants.PREVIOUS_INTENT_KEY;
import static com.amazon.ask.channelguide.model.Constants.REMINDERS_PERMISSION;
import static com.amazon.ask.channelguide.model.Constants.SHOW_KEY;
import static com.amazon.ask.channelguide.model.Constants.WHEN_IS_MY_SHOW_INTENT;
import static com.amazon.ask.channelguide.model.Constants.YES_INTENT;
import static com.amazon.ask.request.Predicates.intentName;

public class YesIntentHandler implements RequestHandler {

    private static final Logger log = LoggerFactory.getLogger(YesIntentHandler.class);

    @Override
    public boolean canHandle(HandlerInput input) {
        return input.matches(intentName(YES_INTENT));
    }

    @Override
    public Optional<Response> handle(HandlerInput input) {

        String previousIntent = (String) input.getAttributesManager().getSessionAttributes().get(PREVIOUS_INTENT_KEY);

        if (previousIntent != null &&previousIntent.equals(WHEN_IS_MY_SHOW_INTENT)) {
            final ObjectMapper mapper = new ObjectMapper();
            mapper.registerModule(new JavaTimeModule());

            Show show = mapper.convertValue(input.getAttributesManager().getSessionAttributes().get(SHOW_KEY), Show.class);

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
                if(e.getStatusCode() == 401) {
                    // Store relevant attributes within token.
                    String token = "";
                    try {
                        token = mapper.writeValueAsString(show);
                    } catch (Exception e2) {
                        log.error("Error when calling ObjectMapper.writeValueAsString", e);
                    }

                    SendRequestDirective directive = getRequestSkillPermissionRequestDirective(token);

                    return input.getResponseBuilder()
                            .addDirective(directive)
                            .withShouldEndSession(true)
                            .build();
                } else if (e.getStatusCode() == 403) {
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
        }
        else {
            return input.getResponseBuilder()
                    .withSpeech("Hmm. I'm not sure how to help you with that. This skill can set reminders for when shows will be on TV. What show did you want to know about?")
                    .withShouldEndSession(false)
                    .build();
        }
    }

    private SendRequestDirective getRequestSkillPermissionRequestDirective(String token) {
        return SendRequestDirective.builder()
                .withName("AskFor")
                .putPayloadItem("@type", "AskForPermissionsConsentRequest")
                .putPayloadItem("@version", "1")
                .putPayloadItem("permissionScope", REMINDERS_PERMISSION)
                .withToken(token)
                .build();
    }
}
