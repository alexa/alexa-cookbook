#### Ingredients
## SSML Audio <a id="title"></a>

#### What you will learn

Alexa has a Text-To-Speech engine that will pronounce the words your code sends as speech output.
Within this text, you can add SSML tags to add or modify the sound of the output.
SSML stands for Speech Synthesis Markup Language.

The official [SSML Reference](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speech-synthesis-markup-language-ssml-reference)
is always available on the [Developer Portal](https://developer.amazon.com/edw/home.html#/skills/list)
on a link just above the service simulator test box.

Examples:
```
There is a three second pause here <break time="3s"/> then the speech continues.

<audio src='https://s3.amazonaws.com/my-ssml-samples/Flourish.mp3' />
<audio src='https://s3.amazonaws.com/my-ssml-samples/cheap_thrills.mp3' />
```

For example, you could make Alexa say words and sound effects by preparing an output string like this:

```
var say = " news flash <audio src='https://s3.amazonaws.com/my-ssml-samples/Flourish.mp3' /> my code is working";
this.emit(':ask', say, 'try again');
```

Read the [SSML Reference, Audio page](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speech-synthesis-markup-language-ssml-reference#audio) on how to prepare and host MP3 audio clips in the required format.
You will need to use a tool such as **ffmpeg** or **vlc** to down-sample your existing MP3 content.
You can host the MP3s on your own website, or within the AWS S3 service.
Simply create an S3 bucket, upload your files, and set the files to be public, and note file properties which contain the public URL to the file.


#### Instructions for deploying this sample skill
[Part 2 - Create the skill](./PAGE2.md#title)

<hr />

Back to the [Home Page](../../README.md#title)
