# -*- coding: utf-8 -*-

import random
import logging

from ask_sdk_core.skill_builder import CustomSkillBuilder
from ask_sdk_core.api_client import DefaultApiClient
from ask_sdk_core.dispatch_components import (
    AbstractRequestHandler, AbstractExceptionHandler,
    AbstractRequestInterceptor, AbstractResponseInterceptor)
from ask_sdk_core.utils import (
    is_request_type, is_intent_name,
    get_api_access_token, get_device_id)
from ask_sdk_core.handler_input import HandlerInput

from ask_sdk_model import Response
from ask_sdk_model.services import ServiceException
from ask_sdk_model.ui import AskForPermissionsConsentCard

# =========================================================================================================================================
WELCOME = 'Welcome to the Sample Device Address API Skill!  You can ask for the device address by saying what is my address.  What do you want to ask?'
WHAT_DO_YOU_WANT = 'What do you want to ask?'
NOTIFY_MISSING_PERMISSIONS = 'Please enable Location permissions in the Amazon Alexa app.'
NO_ADDRESS = 'It looks like you don\'t have an address set. You can set your address from the companion app.'
ADDRESS_AVAILABLE = 'Here is your full address: {}, {}, {}'
ERROR = 'There was an error with the skill. Please check the logs.'
LOCATION_FAILURE = 'There was an error with the Device Address API.'
GOODBYE = 'Bye! Thanks for using the Sample Device Address API Skill!'
HELP = 'You can use this skill by asking something like: whats my address?'

# =========================================================================================================================================

PERMISSIONS = ['read::alexa:device:all:address']

# =========================================================================================================================================

sb = CustomSkillBuilder(api_client=DefaultApiClient())
logger = logging.getLogger(__name__)
logger.setLevel(logging.DEBUG)

# Built-in Intent Handlers
class GetAddressIntentHandler(AbstractRequestHandler):
    """Handler for Help Intent."""
    def can_handle(self, handler_input):
        # type: (HandlerInput) -> bool
        return (is_request_type("LaunchRequest")(handler_input)
                or (is_intent_name("GetAddressIntent")(handler_input)))

    def handle(self, handler_input):
        # type: (HandlerInput) -> Response
        logger.info("In GetAddressIntentHandler")

        service_client_fact = handler_input.service_client_factory
        response_builder = handler_input.response_builder

        if not (get_api_access_token(handler_input)):
            logger.info("no api access token")
            response_builder.speak(NOTIFY_MISSING_PERMISSIONS)
            response_builder.set_card(
                AskForPermissionsConsentCard(permissions=PERMISSIONS))
            return response_builder.response

        try:
            device_id = get_device_id(handler_input)
            device_addr_client = service_client_fact.get_device_address_service()
            addr = device_addr_client.get_full_address(device_id)

            logger.info('Location API response retrieved, now building response')

            if addr.address_line1 is None and addr.state_or_region is None:
                response_builder.speak(NO_ADDRESS)
            else:
                response_builder.speak(ADDRESS_AVAILABLE.format(
                    addr.address_line1, addr.state_or_region, addr.postal_code))
            return response_builder.response
        except ServiceException as e:
            logger.error("error reported by device location service")
            raise e
        except Exception as e:
            logger.error(e, exc_info=True)
            return handler_input.response_builder.speak(ERROR)
    
class GetAddressErrorHandler(AbstractExceptionHandler):
    """Catch getAddress error handler, log exception and
    respond with custom message.
    """
    def can_handle(self, handler_input, exception):
        # type: (HandlerInput, Exception) -> bool
        return (isinstance(exception, ServiceException))

    def handle(self, handler_input, exception):
        # type: (HandlerInput, Exception) -> Response
        logger.info("In GetAddressErrorHandler")
        logger.error(exception , exc_info=True)

        if (exception.status_code==403):
            return (handler_input.response_builder
                .speak(NOTIFY_MISSING_PERMISSIONS)
                .set_card(
                    AskForPermissionsConsentCard(permissions=PERMISSIONS))
                .response
            )

        # not a permissions issue, so just return general failure
        return (handler_input.response_builder
            .speak(LOCATION_FAILURE)
            .response
        )

class HelpIntentHandler(AbstractRequestHandler):
    """Handler for Help Intent."""
    def can_handle(self, handler_input):
        # type: (HandlerInput) -> bool
        return is_intent_name("AMAZON.HelpIntent")(handler_input)

    def handle(self, handler_input):
        # type: (HandlerInput) -> Response
        logger.info("In HelpIntentHandler")

        handler_input.response_builder.speak(HELP).ask(HELP)
        return handler_input.response_builder.response

class CancelOrStopIntentHandler(AbstractRequestHandler):
    """Single handler for Cancel and Stop Intent."""
    def can_handle(self, handler_input):
        # type: (HandlerInput) -> bool
        return (is_intent_name("AMAZON.CancelIntent")(handler_input) or
                is_intent_name("AMAZON.StopIntent")(handler_input))

    def handle(self, handler_input):
        # type: (HandlerInput) -> Response
        logger.info("In CancelOrStopIntentHandler")

        handler_input.response_builder.speak(GOODBYE)
        return handler_input.response_builder.response

class SessionEndedRequestHandler(AbstractRequestHandler):
    """Handler for Session End."""
    def can_handle(self, handler_input):
        # type: (HandlerInput) -> bool
        return is_request_type("SessionEndedRequest")(handler_input)

    def handle(self, handler_input):
        # type: (HandlerInput) -> Response
        logger.info("In SessionEndedRequestHandler")

        logger.info("Session ended reason: {}".format(
            handler_input.request_envelope.request.reason))
        return handler_input.response_builder.response

# Request and Response loggers
class RequestLogger(AbstractRequestInterceptor):
    """Log the alexa requests."""
    def process(self, handler_input):
        # type: (HandlerInput) -> None
        logger.debug("Alexa Request: {}".format(
            handler_input.request_envelope.request))


class ResponseLogger(AbstractResponseInterceptor):
    """Log the alexa responses."""
    def process(self, handler_input, response):
        # type: (HandlerInput, Response) -> None
        logger.debug("Alexa Response: {}".format(response))


# Register intent handlers
sb.add_request_handler(GetAddressIntentHandler())
sb.add_request_handler(HelpIntentHandler())
sb.add_request_handler(CancelOrStopIntentHandler())
sb.add_request_handler(SessionEndedRequestHandler())

# Register exception handlers
sb.add_exception_handler(GetAddressErrorHandler())

# TODO: Uncomment the following lines of code for request, response logs.
# sb.add_global_request_interceptor(RequestLogger())
# sb.add_global_response_interceptor(ResponseLogger())

# Handler name that is used on AWS lambda
lambda_handler = sb.lambda_handler()
