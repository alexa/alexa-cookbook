const welcomeOutput = 'Welcome to History buff. What day do you want events for?';
const welcomeReprompt = 'which day do you want events for?';
const helpOutput = 'With History Buff, you can get historical events for any day of the year. For example, you could say today, or August thirtieth. Now, which day do you want?';
const helpReprompt = 'which day do you want events for?';
const CONNECTERROR = 'There is a problem connecting to Wikipedia at this time. Please try again later.';
const GODEEPER = 'Wanna go deeper in history?';
const CARDTITLE = 'More events on this day in history';
const MOREREPROMPTTEXT = 'Do you want to know more about what happened on this date?';
const NOMORE = 'There are no more events for this date. Try another date by saying, get events for august thirtieth.';
const HELPREPROMPTTEXT = 'Which day do you want?';
const DIRECTIVESERVICEMESSAGE = 'Please wait while I look up information about';
const DIRECTIVEERRORMESSAGE = 'Cannot enqueue a progressive direcitve.';
const GETEVENTSERRORMESSAGE = 'Cannot get events from wiki, thanks for using the history buff skill';
const GOODBYE = 'Bye! Thanks for using the history buff skill';
const UNHANDLED = 'This skill doesn\'t support that. Please ask something else.';

module.exports = {
  welcomeOutput,
  welcomeReprompt,
  helpOutput,
  helpReprompt,
  CONNECTERROR,
  GODEEPER,
  CARDTITLE,
  MOREREPROMPTTEXT,
  NOMORE,
  HELPREPROMPTTEXT,
  DIRECTIVESERVICEMESSAGE,
  DIRECTIVEERRORMESSAGE,
  GETEVENTSERRORMESSAGE,
  GOODBYE,
  UNHANDLED,
};
