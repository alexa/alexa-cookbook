package com.amazon.ask.demo.DeviceLocation;

import com.amazon.ask.Skill;
import com.amazon.ask.Skills;
import com.amazon.ask.SkillStreamHandler;
import com.amazon.ask.demo.DeviceLocation.handlers.ServiceExceptionHandler;
import com.amazon.ask.demo.DeviceLocation.handlers.CancelandStopIntentHandler;
import com.amazon.ask.demo.DeviceLocation.handlers.GenericExceptionHandler;
import com.amazon.ask.demo.DeviceLocation.handlers.GetAddressIntentHandler;
import com.amazon.ask.demo.DeviceLocation.handlers.HelpIntentHandler;
import com.amazon.ask.demo.DeviceLocation.handlers.LaunchRequestHandler;
import com.amazon.ask.demo.DeviceLocation.handlers.SessionEndedRequestHandler;
import com.amazon.ask.demo.DeviceLocation.handlers.UnsupportedRequestHandler;

public class DeviceLocationDemoStreamHandler extends SkillStreamHandler {

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

    public DeviceLocationDemoStreamHandler() {
        super(getSkill());
    }

}
