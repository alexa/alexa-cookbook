package com.amazon.ask.demo.CustomerProfileAPI;

import com.amazon.ask.Skill;
import com.amazon.ask.SkillStreamHandler;
import com.amazon.ask.Skills;
import com.amazon.ask.demo.CustomerProfileAPI.handlers.CancelIntentHandler;
import com.amazon.ask.demo.CustomerProfileAPI.handlers.EmailIntentHandler;
import com.amazon.ask.demo.CustomerProfileAPI.handlers.GenericExceptionHandler;
import com.amazon.ask.demo.CustomerProfileAPI.handlers.HelpIntentHandler;
import com.amazon.ask.demo.CustomerProfileAPI.handlers.LaunchHandler;
import com.amazon.ask.demo.CustomerProfileAPI.handlers.NameIntentHandler;
import com.amazon.ask.demo.CustomerProfileAPI.handlers.NumberIntentHandler;
import com.amazon.ask.demo.CustomerProfileAPI.handlers.ServiceExceptionHandler;
import com.amazon.ask.demo.CustomerProfileAPI.handlers.SessionEndedHandler;
import com.amazon.ask.demo.CustomerProfileAPI.handlers.StopIntentHandler;
import com.amazon.ask.demo.CustomerProfileAPI.handlers.UnhandledIntentHandler;

public class CustomerProfileStreamHandler extends SkillStreamHandler {

    private static Skill getSkill() {
        return Skills.standard()
                .addRequestHandlers(
                        new LaunchHandler(),
                        new EmailIntentHandler(),
                        new NameIntentHandler(),
                        new NumberIntentHandler(),
                        new CancelIntentHandler(),
                        new StopIntentHandler(),
                        new HelpIntentHandler(),
                        new SessionEndedHandler(),
                        new UnhandledIntentHandler())
                .addExceptionHandler(new ServiceExceptionHandler())
                .addExceptionHandler(new GenericExceptionHandler())
                .build();
    }

    public CustomerProfileStreamHandler() {
        super (getSkill());
    }
}