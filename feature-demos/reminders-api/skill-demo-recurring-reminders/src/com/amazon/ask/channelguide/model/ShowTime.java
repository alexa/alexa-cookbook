package com.amazon.ask.channelguide.model;

import com.amazon.ask.model.services.reminderManagement.RecurrenceDay;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalTime;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ShowTime {
    private List<RecurrenceDay> recurrenceDays;

    private LocalTime localTime;

    public ShowTime(@JsonProperty("recurrenceDays") List<RecurrenceDay> recurrenceDays,
                    @JsonProperty("localTime") LocalTime localTime) {
        this.recurrenceDays = recurrenceDays;
        this.localTime = localTime;
    }

    public List<RecurrenceDay> getRecurrenceDays() {
        return recurrenceDays;
    }

    public LocalTime getLocalTime() {
        return localTime;
    }

    public String getSpeakableText() {
        String speakableText = "every ";
        for (int i = 0; i < recurrenceDays.size(); ++i) {

            if (i == (recurrenceDays.size() - 1) && i != 0) {
                speakableText = speakableText.concat(" and ");
            } else if (i > 0) {
                speakableText = speakableText.concat(", ");
            }

            switch (recurrenceDays.get(i)) {
                case MO:
                    speakableText = speakableText.concat("Monday");
                    break;
                case TU:
                    speakableText = speakableText.concat("Tuesday");
                    break;
                case WE:
                    speakableText = speakableText.concat("Wednesday");
                    break;
                case TH:
                    speakableText = speakableText.concat("Thursday");
                    break;
                case FR:
                    speakableText = speakableText.concat("Friday");
                    break;
                case SA:
                    speakableText = speakableText.concat("Saturday");
                    break;
                case SU:
                    speakableText = speakableText.concat("Sunday");
                    break;
            }
        }

        speakableText = speakableText.concat(" at ");
        speakableText = speakableText.concat(localTime.toString());

        return speakableText;
    }

    public void setRecurrenceDays(List<RecurrenceDay> recurrenceDays) {
        this.recurrenceDays = recurrenceDays;
    }

    public void setLocalTime(LocalTime localTime) {
        this.localTime = localTime;
    }
}
