package com.amazon.ask.address;

public class Constants {
    public static final String WELCOME = "Welcome to the Sample Device Address API Skill!  You can ask for the device address by saying what is my address.  What do you want to ask?";
    public static final String WHAT_DO_YOU_WANT = "What do you want to ask?";
    public static final String NOTIFY_MISSING_PERMISSIONS = "Please enable Location permissions in the Amazon Alexa app.";
    public static final String NO_ADDRESS = "It looks like you don't have an address set. You can set your address from the companion app.";
    public static final String ADDRESS_AVAILABLE = "Here is your full address: ";
    public static final String ERROR = "Uh Oh. Looks like something went wrong.";
    public static final String LOCATION_FAILURE = "There was an error with the Device Address API. Please try again.";
    public static final String GOODBYE = "Bye! Thanks for using the Sample Device Address API Skill!";
    public static final String UNHANDLED = "This skill doesn\'t support that. Please ask something else.";
    public static final String HELP = "You can use this skill by asking something like: whats my address?";

    /**
     * The permissions that this skill relies on for retrieving addresses. If the consent token isn't
     * available or invalid, we will request the user to grant us the following permission
     * via a permission card.
     *
     * Another Possible value if you only want permissions for the country and postal code is:
     * read::alexa:device:all:address:country_and_postal_code
     * Be sure to check your permissions settings for your skill on https://developer.amazon.com/
     */
    public static final String ALL_ADDRESS_PERMISSION = "read::alexa:device:all:address";

}
