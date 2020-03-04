package com.amazon.ask.channelguide;

import com.amazon.ask.Skill;
import com.amazon.ask.SkillStreamHandler;
import com.amazon.ask.Skills;
import com.amazon.ask.channelguide.handlers.CancelStopRequestHandler;
import com.amazon.ask.channelguide.handlers.ConnectionsResponseHandler;
import com.amazon.ask.channelguide.handlers.FallbackIntentHandler;
import com.amazon.ask.channelguide.handlers.HelpRequestHandler;
import com.amazon.ask.channelguide.handlers.LaunchRequestHandler;
import com.amazon.ask.channelguide.handlers.NoIntentHandler;
import com.amazon.ask.channelguide.handlers.SessionEndedRequestHandler;
import com.amazon.ask.channelguide.handlers.WhenIsMyShowIntentHandler;
import com.amazon.ask.channelguide.handlers.YesIntentHandler;

public class ChannelGuideStreamHandler extends SkillStreamHandler{
    private static Skill getSkill() {
        return Skills.standard()
                .addRequestHandlers(
                        new LaunchRequestHandler(),
                        new WhenIsMyShowIntentHandler(),
                        new YesIntentHandler(),
                        new NoIntentHandler(),
                        new ConnectionsResponseHandler(),
                        new CancelStopRequestHandler(),
                        new FallbackIntentHandler(),
                        new HelpRequestHandler(),
                        new SessionEndedRequestHandler())
                .build();
    }

    public ChannelGuideStreamHandler() {
        super(getSkill());
    }
}
