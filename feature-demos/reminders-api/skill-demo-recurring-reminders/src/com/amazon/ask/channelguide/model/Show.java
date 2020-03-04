package com.amazon.ask.channelguide.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Show {
    private String name;

    private ShowTime showTime;

    @JsonCreator
    public Show(@JsonProperty("name") String name,
                @JsonProperty("showTime") ShowTime showTime) {
        this.name = name;
        this.showTime = showTime;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ShowTime getShowTime() {
        return showTime;
    }

    public void setShowTime(ShowTime showTime) {
        this.showTime = showTime;
    }
}
