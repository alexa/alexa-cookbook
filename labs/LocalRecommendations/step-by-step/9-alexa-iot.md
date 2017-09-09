# Build An Alexa Local Recommendations Skill
[Voice User Interface](../step-by-step/1-voice-user-interface.md) || [Lambda Function](../step-by-step/2-lambda-function.md) || [Connect VUI to Code](../step-by-step/3-connect-vui-to-code.md) || [Testing](../step-by-step/4-testing.md) || [Customization](../step-by-step/5-customization.md) || [Intents and Slots](../step-by-step/6-intents-slots.md) || [Smart Recommendations](../step-by-step/7-smart-recommendations.md) || [Publication](../step-by-step/10-publication.md)




<!--<a href="../step-by-step/1-voice-user-interface.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/1-locked._TTH_.png" /></a><a href="../step-by-step/2-lambda-function.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/2-locked._TTH_.png" /></a><a href="../step-by-step/3-connect-vui-to-code.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/3-locked._TTH_.png" /></a><a href="../step-by-step/4-testing.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/4-locked._TTH_.png" /></a><a href="../step-by-step/5-customization.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/5-locked._TTH_.png" /></a><a href="../step-by-step/10-publication.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/navigation/6-on._TTH_.png" /></a>-->

## Use Alexa to Control IoT Devices

# Controlling IOT Devices

## Amazon IOT <a id="title"></a>

#### What you will learn

Amazon [AWS IoT](https://aws.amazon.com/iot), or Internet of Things, is a set of services to interact with physical things.
A Thing may be a motor, a fan, a robot, etc.

You can start by creating a virtual Thing within AWS that can be controlled by your Lambda code.
Later, you could configure a physical thing, such as an Intel Edison Arduino device, to connect to the IOT network (using certificates) and receive updates to stay in sync with the virtual Thing.
The virtual Thing is known as a "thing shadow".  Read more on the [AWS IOT Thing Shadow Guide](http://docs.aws.amazon.com/iot/latest/developerguide/using-thing-shadows.html).

### Table of Contents (setup steps)
Follow these three steps to build a skill that can update an IOT thing.  Step 3 has you configure a web browser page in place of a real thing.  Once configured, the page will load images of the city you ask for.

1. [setup-thing](https://github.com/alexa/alexa-cookbook/tree/master/aws/Amazon-IOT/setup-thing#title)
1. [update-shadow](https://github.com/alexa/alexa-cookbook/tree/master/aws/Amazon-IOT/update-shadow#title)
1. [webapp-thing](https://github.com/alexa/alexa-cookbook/tree/master/aws/Amazon-IOT/webapp-thing)



### Key configuration settings for IOT

When you setup a virtual Thing in a particular region, you will be given the name of an endpoint.
Together with the Thing name and the name of your region, you can uniquely describe your thing.  Both the back-end (Skill Lambda function) and front end (Device or web app) will point to this thing to exchange data.

```
var config = {};
config.IOT_BROKER_ENDPOINT      = "a2eshrcp6u0000.iot.us-east-1.amazonaws.com";  // also called the REST API endpoint
config.IOT_BROKER_REGION        = "us-east-1";  // corresponds to the N.Virginia Region.  Use ```eu-west-1``` instead for the Ireland region
config.IOT_THING_NAME           = "thing1";

```



<hr />

<br/><br/>
<a href="../step-by-step/10-publication.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_next_publication._TTH_.png" /></a>

<img height="1" width="1" src="https://www.facebook.com/tr?id=1847448698846169&ev=PageView&noscript=1"/>
