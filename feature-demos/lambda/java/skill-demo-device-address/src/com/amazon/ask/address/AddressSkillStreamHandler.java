package com.amazon.ask.address;

import com.amazon.ask.Skill;
import com.amazon.ask.Skills;
import com.amazon.ask.SkillStreamHandler;
import com.amazon.ask.address.handlers.ServiceExceptionHandler;
import com.amazon.ask.address.handlers.CancelandStopIntentHandler;
import com.amazon.ask.address.handlers.GenericExceptionHandler;
import com.amazon.ask.address.handlers.GetAddressIntentHandler;
import com.amazon.ask.address.handlers.HelpIntentHandler;
import com.amazon.ask.address.handlers.LaunchRequestHandler;
import com.amazon.ask.address.handlers.SessionEndedRequestHandler;
import com.amazon.ask.address.handlers.UnsupportedRequestHandler;

public class AddressSkillStreamHandler extends SkillStreamHandler {

    private static Skill getSkill() {
        return Skills.standard()
                .addRequestHandlers(
                        new CancelandStopIntentHandler(),
                        new GetAddressIntentHandler(),
                        new HelpIntentHandler(),
                        new LaunchRequestHandler(),
                        new SessionEndedRequestHandler(),
                        new UnsupportedRequestHandler())
                .addExceptionHandler(new ServiceExceptionHandler())
                .addExceptionHandler(new GenericExceptionHandler())
                // Add your skill id below
                //.withSkillId("")
                .build();
    }

    public AddressSkillStreamHandler() {
        super(getSkill());
    }

}
