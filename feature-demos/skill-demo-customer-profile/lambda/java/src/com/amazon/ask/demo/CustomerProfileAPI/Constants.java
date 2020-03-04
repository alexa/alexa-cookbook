package com.amazon.ask.demo.CustomerProfileAPI;

public class Constants {
    public static final String WELCOME = "Welcome to the Sample Alexa Customer Profile API Skill! You can ask for your name; your email address; or your phone number. What do you want to ask?";
    public static final String WHAT_DO_YOU_WANT =  "What do you want to ask?";
    public static final String NOTIFY_MISSING_PERMISSIONS = "Please enable Customer Profile permissions in the Amazon Alexa app.";
    public static final String NAME_MISSING= "You can set your name either in the Alexa app under calling and messaging; or you can set it at Amazon.com; under log-in and security.";
    public static final String EMAIL_MISSING= "You can set your email at Amazon.com; under log-in and security.";
    public static final String NUMBER_MISSING= "You can set your phone number at Amazon.com; under log-in and security.";
    public static final String NAME_AVAILABLE= "Here is your full name: ";
    public static final String EMAIL_AVAILABLE= "Here is your email address: ";
    public static final String NUMBER_AVAILABLE= "Here is your phone number: ";
    public static final String ERROR= "Uh Oh. Looks like something went wrong.";
    public static final String API_FAILURE= "There was an error with the Alexa Customer Profile API. Please try again.";
    public static final String GOODBYE= "Bye! Thanks for using the Sample Alexa Customer Profile API Skill!";
    public static final String UNHANDLED= "This skill doesn't support that. Please ask something else.";
    public static final String HELP= "You can use this skill by asking something like: whats my name?";
    public static final String STOP= "Bye! Thanks for using the Sample Alexa Customer Profile API Skill!";

    public static final String NAME_PERMISSION = "alexa::profile:name:read";
    public static final String EMAIL_PERMISSION = "alexa::profile::email:read";
    public static final String MOBILE_NUMBER_PERMISSION = "alexa::profile:mobile_number:read";
}