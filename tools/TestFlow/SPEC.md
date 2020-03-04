# Testflow Dialog Sequence file Specification

Testflow introduces the concept of a dialog sequence file, a text file containing a list of events to be tested, one per line.
The goal of the sequence file is to make it simple to define a test sequence  part of the developers manual code/test/debug process.
The file can have any name and live in any folder.  As part of configuring the main Testflow script,
you can manually adjust the location of the script files.

The best way to define the format for this file is by reviewing some examples.

### Example #1: Defaults

This file is the default file that will be executed if you do not specify a filename on the command line, i.e. by typing just ```node testflow```

*dialogs/default.txt* :
```
LaunchRequest
AMAZON.HelpIntent
AMAZON.StopIntent
```

Here we see three default events that every skill should handle.


### Example #2: Slots

*dialogs/slots.txt* :
```
LaunchRequest
MyColorSetIntent    color=red
BookmarkSetIntent   page=28
TravelIntent        city=Sydney guests=3
TravelIntent        city=New%20York guests=4
AMAZON.StopIntent
```

This example shows how to define Intents and any slot values as key=value pairs.
Multi-word slots should be separated by the encoded space char, %20.

### Example #3: Entity Resolution

*dialogs/slots.txt* :
```
LaunchRequest
MyColorSetIntent color=
MyColorSetIntent color=red
MyColorSetIntent color=red/red
MyColorSetIntent color=crimson/red
MyColorSetIntent color=pizza/hawaiian/veggie/cheese
MyColorSetIntent color=dragon/
AMAZON.StopIntent
```

This example shows how to test:
 * a null slot
 * a traditional slot value
 * a Entity Resolution ER_SUCCESS_MATCH
 * a Entity Resolution ER_SUCCESS_MATCH with synonym and canonical value
 * a Entity Resolution ER_SUCCESS_MATCH with synonym and multiple canonical values
 * a ER_SUCCESS_NOMATCH


### Example #4: Prompting

*dialogs/slots.txt* :
```
LaunchRequest
BookmarkGetIntent
? BookmarkSetIntent page=31
BookmarkGetIntent
AMAZON.StopIntent

```

When Testflow encounters a line starting with "?",
it will pause and prompt the user to accept the proposed slot value or type in a new value.

### Example #4: Skipping Lines

*dialogs/skip.txt* :
```
LaunchRequest
# BookmarkGetIntent
BookmarkSetIntent page=31
end
BookmarkGetIntent
AMAZON.StopIntent

```

When Testflow encounters a line starting with "#" it will treat the line like a comment.
Testflow will stop execution when detecting the word "end".
In this example, only the LaunchRequest and BookmarkSetIntent would be run.


### Example #5: Defining Unique Users

*dialogs/users.txt* :
```
~ 222
LaunchRequest
MyColorSetIntent color=green
AMAZON.StopIntent

~ 333
LaunchRequest
MyColorSetIntent color=red
AMAZON.StopIntent

~ 222
LaunchRequest
MyColorGetIntent
AMAZON.StopIntent

```

Lines starting with the squiggly tilde "~" indicate that Testflow should run the test as a unique user.
After the tilde, you can define a three-digit ID which will become the trailing three digits of the userID field on each test request.


### Example #6: Time Dimension

*dialogs/time.txt* :
```
@ -7d
LaunchRequest
AMAZON.StopIntent
@ -6h
LaunchRequest
AMAZON.StopIntent
@ -30m
LaunchRequest
AMAZON.StopIntent
@ 0m
LaunchRequest
AMAZON.StopIntent
```

Lines starting with the @ sign indicate that Testflow should run the test at an offset from the current time.

After the @ sign, you can define an offset as measured in minutes, hours, or days.
For example, to run a test as of six hours ago, you can define @ -6h to adjust the timestamp of your test.


