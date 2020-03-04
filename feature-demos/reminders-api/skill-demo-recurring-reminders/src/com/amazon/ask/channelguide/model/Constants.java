package com.amazon.ask.channelguide.model;

import com.amazon.ask.model.services.reminderManagement.RecurrenceDay;

import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;

public class Constants {
    public static final List<Show> SHOWS = Arrays.asList(
            new Show(
                    "Kings and Thrones",
                    new ShowTime(
                            Arrays.asList(RecurrenceDay.SU),
                            LocalTime.of(20, 0, 0))),
            new Show(
                    "Heaven's cuisine",
                    new ShowTime(
                            Arrays.asList(RecurrenceDay.MO, RecurrenceDay.TU, RecurrenceDay.WE, RecurrenceDay.TH,
                                    RecurrenceDay.FR),
                            LocalTime.of(21, 0, 0))),
            new Show(
                    "Blind Ninja",
                    new ShowTime(
                            Arrays.asList(RecurrenceDay.TU),
                            LocalTime.of(22, 0, 0))),
            new Show(
                    "Running Zombies",
                    new ShowTime(
                            Arrays.asList(RecurrenceDay.TH),
                            LocalTime.of(20, 0, 0))),
            new Show(
                    "True Investigators",
                    new ShowTime(
                            Arrays.asList(RecurrenceDay.SA, RecurrenceDay.SU),
                            LocalTime.of(21, 0, 0)))
    );

    public static final String SHOW_KEY = "show";
    public static final String PREVIOUS_INTENT_KEY = "previousIntent";

    public static final String SHOW_SLOT = "Show";

    public static final String WHEN_IS_MY_SHOW_INTENT = "WhenIsMyShowIntent";
    public static final String YES_INTENT = "AMAZON.YesIntent";
    public static final String NO_INTENT = "AMAZON.NoIntent";
    public static final String HELP_INTENT = "AMAZON.HelpIntent";
    public static final String CANCEL_INTENT = "AMAZON.CancelIntent";
    public static final String STOP_INTENT = "AMAZON.StopIntent";
    public static final String FALLBACK_INTENT = "AMAZON.FallbackIntent";

    public static final String REMINDERS_PERMISSION = "alexa::alerts:reminders:skill:readwrite";
}
