# Build An Alexa Recipe Skill
[![Voice User Interface](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-locked._TTH_.png)](../voice-user-interface)[![Lambda Function](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-locked._TTH_.png)](../Lambda-Function)[![Connect VUI to Code](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-locked._TTH_.png)](../connect-vui-to-code)[![Testing](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-locked._TTH_.png)](../testing)[![Customization](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-locked._TTH_.png)](../customization)[![Publication](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-on._TTH_.png)](../publication)


[Click Here](../README.md) to return to the Recipe guide.
## Get Your Skill Certified and Published

We are almost done!  The last step is to add the metadata that your skill will use in the [Alexa app](http://amazon.com/skills).  This page will walk you through the remaining steps, and give you some tips on how to avoid the common mistakes developers make that result in a failed certification.

1.  **Go to your skill's Publishing Information tab on the [Amazon Developer Portal](https://developer.amazon.com/edw/home.html#/skills/list).**

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/6-1-publishing-information._TTH_.png" />

2.  **Complete the Global Fields data.**  These fields apply across all of the languges that your skill supports.

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/6-2-global-fields._TTH_.png" />

    *  **For Category, we are building a fact skill, so select "Games, Trivia, and Accessories."**  You will also be presented with a **Sub-Category** option.  For this skill, choose "Knowledge and Trivia."

    *  **Provide testing instructions.** Testing instructions give you an opportunity to explain your skill, and any special or possibly confusing features, to the certification team.  A value is required in this box.

        *  Since you are using our Recipe Sample, make sure to add this sentence to your Testing Instructions:

           ```
           This was built using the Recipe Sample.
           ```

           This will let the testing team understand what you're providing them, and should decrease the testing time required.        

    *  **Countries and Region can be for "all countries", unless you have a specific reason to exclude a specific location.**  This gives Amazon the ability to distribute your skill globally. Remember that you will need to create additional versions of your skill in the other available languages before they will be available in those countries.

3.  **Write your skill descriptions.**

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/6-3-descriptions._TTH_.png" />

    *  **Spend some time coming up with an enticing, succinct description.**  This is one of the few places you have an opportunity to attract new users, so make the most of it!  These descriptions show up in the list of skills available in the [Alexa app](http://alexa.amazon.com/spa/index.html#skills).

4.  **For your example phrases, come up with the three most exciting ways a user can talk to your skill.**

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/6-4-example-phrases._TTH_.png" />

    *  **Make sure that each of your example phrases are a perfect match with one of your Sample Utterances.**  Incorrect example phrases are one of the most common reasons that skills fail certification, so we have provided a short list of things to consider as you write your example phrases:

       | Common Failure Points for Example Phrases |
       | ----------------------------------------- |
       | Example phrases **must** adhere to the [supported phrases](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/supported-phrases-to-begin-a-conversation). |
       | Example phrases **must** be based on sample utterances specified in your Intent Schema. |
       | Your first example phrase **must** include a wake word and your invocation name. |
       | Example phrases **must** provide a contextual response. |

    *  **Choose three example phrases that are likely to be the most common ways that users will attempt to interact with your skill.**  Make sure that each of them works well, and provides an excellent user experience.

5.  **Provide a comprehensive list of keywords for users that are searching for new skills.**  This is an optional field, and searching the [Alexa app](http://alexa.amazon.com) will also find the words in your Skill Name and descriptions, so you don't need to overdo it.  That being said, if there are words that you want users to find your skill with, you should include them here.  Separate the keywords with commas.

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/6-5-keywords._TTH_.png" />

6.  **Create your skill's icons.**  You need two sizes of your icon: 108x108px and 512x512px.

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/6-6-icons._TTH_.png" />

    *  **Make sure you have the rights to the icons you create.** Please don't violate any trademarks or copyrights.
    *  **If you don't have software to make icons, try one of these free options:**

       *  [GIMP](https://www.gimp.org/) (Windows/Mac/Linux)
       *  [Paint.NET](http://www.getpaint.net/index.html) (Windows)
       *  [Inkscape](http://inkscape.org) (Windows/Mac/Linux)
       *  [Iconion](http://iconion.com/) (Windows/Mac)

    *  To make it easier to get started, we've created blank versions of these icons in both sizes for many formats:

       *  [PSD](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/icon-templates/psd._TTH_.zip)
       *  [PNG](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/icon-templates/png._TTH_.zip)
       *  [GIF](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/icon-templates/gif._TTH_.zip)
       *  [PDF](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/icon-templates/pdf._TTH_.zip)
       *  [JPG](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/icon-templates/jpg._TTH_.zip)
       *  [SVG](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/icon-templates/svg._TTH_.zip)
       *  [PDN](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/icon-templates/pdn._TTH_.zip) - for [Paint.NET](http://www.getpaint.net/index.html)
       *  [XCF](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/icon-templates/xcf._TTH_.zip) - for [GIMP](https://www.gimp.org/)

7.  **Open the Privacy & Compliance tab on the left side of your skill in the [Developer Portal](https://developer.amazon.com/edw/home.html#/skills/list).**

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/6-7-privacy-and-compliance._TTH_.png"/>

8.  **Answer each of the Global Fields questions using the guidance below.**  These fields also apply across all of the languages that your skill supports.

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/6-8-global-fields._TTH_.png"/>

    *  **Does this skill allow users to make purchases or spend real money?** For this fact skill, the answer is no.  For future skills, make sure you answer this appropriately.

    *  **Does this Alexa skill collect users' personal information?** Again, for this fact skill, the answer is no.  If you do collect information about a user, such as names, email addresses, phone numbers, and so forth, ensure that you answer Yes to this question.
        *  Answering "yes" to this question will also require you to provide a link to your Privacy Policy at the bottom of the page.

    *  **Is your skill directed to children under the age of 13?** Because you customized this skill with data you provided, it is possible that you created a skill that targets children under the age of 13.  For this fact skill, the answer is **no** because it doesn't target a specific age group.
        * Factors to consider in determining if this skill is directed to children under 13 include:
            * Subject matter of the skill
            * Presence of child-oriented activities and incentives
            * Type of language used in the skill
            * Music and other audio content in the skill
            * How the skill is described and marketed
            * Intended audience for the skill

            If you're not sure, please see the [FTC's COPPA Guidance and FAQ](https://www.ftc.gov/tips-advice/business-center/guidance/complying-coppa-frequently-asked-questions) for more information.

9.  **Export Compliance.** Be certain that you agree with all of the conditions.  If you do, make sure to check this box, as Amazon requires this permission to distribute your skill around the globe.  

10. **Privacy Policy URL.** This is an optional field, and should not be required for this Fact skill sample.  You can leave it blank.

11. **Terms of Use URL.** This is also optional, and you can leave it blank.

12. **Click the Save button at the bottom of the page.**

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/6-12-save-button._TTH_.png"/>

13. **Each checkmark should be green, as shown.**

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/6-13-all-six-checkmarks._TTH_.png"/>

14. **If you feel that your skill is ready for certification, click the "Submit for Certification" button at the bottom of the page.**

    <img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/6-14-submit-for-certification._TTH_.png"/>

15. **You're done with your submission!**  Here are a few things you might need to know:

    *  **Certification can take several days to complete.** Please be patient.  It takes time because we want to get it right.

    *  **Did something go wrong?** Our team of evangelists run [online office hours every Tuesday from 1-2pm Pacific Time](https://attendee.gotowebinar.com/rt/8389200425172113931).  They can help answer any questions you might have.

    *  **Want the coolest t-shirt you've ever seen?** Every month, we create a brand-new Alexa Developer t-shirt or hoodie, and send them out to developers that published a skill that month.  [You can get yours here if you live in the US](https://developer.amazon.com/alexa-skills-kit/alexa-developer-skill-promotion), [here for the UK](https://developer.amazon.com/en-gb/alexa-skills-kit/alexa-developer-skill-promotion), and [here for Germany](https://developer.amazon.com/de-de/alexa-skills-kit/alexa-developer-skill-promotion).

<img height="1" width="1" src="https://www.facebook.com/tr?id=1847448698846169&ev=PageView&noscript=1"/>
