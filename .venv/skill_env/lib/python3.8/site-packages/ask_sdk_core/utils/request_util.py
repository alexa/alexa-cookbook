# -*- coding: utf-8 -*-
#
# Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights
# Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License").
# You may not use this file except in compliance with the License.
# A copy of the License is located at
#
# http://aws.amazon.com/apache2.0/
#
# or in the "license" file accompanying this file. This file is
# distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
# OF ANY KIND, either express or implied. See the License for the
# specific language governing permissions and limitations under the
# License.
#
import typing

from ask_sdk_model.intent_request import IntentRequest
from ask_sdk_model.supported_interfaces import SupportedInterfaces

if typing.TYPE_CHECKING:
    from ..handler_input import HandlerInput
    from typing import Optional, Union
    from ask_sdk_model.slot import Slot
    from ask_sdk_model.dialog_state import DialogState
    AnyStr = Union[str, bytes]


def get_locale(handler_input):
    # type: (HandlerInput) -> AnyStr
    """Return locale value from input request.

    The method returns the ``locale`` value present in the request. More
    information about the locale can be found here :
    https://developer.amazon.com/docs/custom-skills/request-and-response-json-reference.html#request-locale

    :param handler_input: The handler input instance that is generally
        passed in the sdk's request and exception components
    :type handler_input: ask_sdk_core.handler_input.HandlerInput
    :return: Locale value from the request
    :rtype: str
    """
    return handler_input.request_envelope.request.locale


def get_request_type(handler_input):
    # type: (HandlerInput) -> AnyStr
    """Return the type of the input request.

    The method retrieves the request ``type`` of the input request. More
    information about the different request types are mentioned here :
    https://developer.amazon.com/docs/custom-skills/request-and-response-json-reference.html#request-body-parameters

    :param handler_input: The handler input instance that is generally
        passed in the sdk's request and exception components
    :type handler_input: ask_sdk_core.handler_input.HandlerInput
    :return: Type value of the input request
    :rtype: str
    """
    return handler_input.request_envelope.request.object_type


def get_intent_name(handler_input):
    # type: (HandlerInput) -> AnyStr
    """Return the name of the intent request.

    The method retrieves the intent ``name`` from the input request, only if
    the input request is an
    :py:class:`ask_sdk_model.intent_request.IntentRequest`. If the input
    is not an IntentRequest, a :py:class:`TypeError` is raised.

    :param handler_input: The handler input instance that is generally
        passed in the sdk's request and exception components
    :type handler_input: ask_sdk_core.handler_input.HandlerInput
    :return: Name of the intent request
    :rtype: str
    :raises: TypeError
    """
    request = handler_input.request_envelope.request
    if isinstance(request, IntentRequest):
        return request.intent.name

    raise TypeError("The provided request is not an IntentRequest")


def get_account_linking_access_token(handler_input):
    # type: (HandlerInput) -> Optional[AnyStr]
    """Return the access token in the request.

    The method retrieves the user's ``accessToken`` from the input request.
    Once a user successfully enables a skill and links their Alexa
    account to the skill, the input request will have the user's
    access token. A `None` value is returned if there is no access token
    in the input request. More information on this can be found here :
    https://developer.amazon.com/docs/account-linking/add-account-linking-logic-custom-skill.html

    :param handler_input: The handler input instance that is generally
        passed in the sdk's request and exception components
    :type handler_input: ask_sdk_core.handler_input.HandlerInput
    :return: User account linked access token if available. None if not
        available
    :rtype: Optional[str]
    """
    return handler_input.request_envelope.context.system.user.access_token


def get_api_access_token(handler_input):
    # type: (HandlerInput) -> AnyStr
    """Return the api access token in the request.

    The method retrieves the ``apiAccessToken`` from the input request,
    which has the encapsulated information of permissions granted by the
    user. This token can be used to call Alexa-specific APIs. More information
    about this can be found here :
    https://developer.amazon.com/docs/custom-skills/request-and-response-json-reference.html#system-object

    The SDK already includes this token in the API calls done through the
    `service_client_factory` in
    :py:class:`ask_sdk_core.handler_input.HandlerInput`.

    :param handler_input: The handler input instance that is generally
        passed in the sdk's request and exception components
    :type handler_input: ask_sdk_core.handler_input.HandlerInput
    :return: Api access token from the input request, which encapsulates any
        permissions consented by the user
    :rtype: str
    """
    return handler_input.request_envelope.context.system.api_access_token


def get_device_id(handler_input):
    # type: (HandlerInput) -> Optional[AnyStr]
    """Return the device id from the input request.

    The method retrieves the `deviceId` property from the input request.
    This value uniquely identifies the device and is generally used as
    input for some Alexa-specific API calls. More information about this
    can be found here :
    https://developer.amazon.com/docs/custom-skills/request-and-response-json-reference.html#system-object

    If there is no device information in the input request, then a ``None``
    is returned.

    :param handler_input: The handler input instance that is generally
        passed in the sdk's request and exception components
    :type handler_input: ask_sdk_core.handler_input.HandlerInput
    :return: Unique device id of the device used to send the alexa request
        or `None` if device information is not present
    :rtype: Optional[str]
    """
    device = handler_input.request_envelope.context.system.device
    if device:
        return device.device_id
    else:
        return None


def get_dialog_state(handler_input):
    # type: (HandlerInput) -> Optional[DialogState]
    """Return the dialog state enum from the intent request.

    The method retrieves the `dialogState` from the intent request, if
    the skill's interaction model includes a dialog model. This can be
    used to determine the current status of user conversation and return
    the appropriate dialog directives if the conversation is not yet complete.
    More information on dialog management can be found here :
    https://developer.amazon.com/docs/custom-skills/define-the-dialog-to-collect-and-confirm-required-information.html

    The method returns a ``None`` if there is no dialog model added or
    if the intent doesn't have dialog management. The method raises a
    :py:class:`TypeError` if the input is not an `IntentRequest`.

    :param handler_input: The handler input instance that is generally
        passed in the sdk's request and exception components.
    :type handler_input: ask_sdk_core.handler_input.HandlerInput
    :return: State of the dialog model from the intent request.
    :rtype: Optional[ask_sdk_model.dialog_state.DialogState]
    :raises: TypeError if the input is not an IntentRequest
    """
    request = handler_input.request_envelope.request
    if isinstance(request, IntentRequest):
        return request.dialog_state

    raise TypeError("The provided request is not an IntentRequest")


def get_slot(handler_input, slot_name):
    # type: (HandlerInput, str) -> Optional[Slot]
    """Return the slot information from intent request.

    The method retrieves the slot information
    :py:class:`ask_sdk_model.slot.Slot` from the input intent request
    for the given ``slot_name``. More information on the slots can be
    found here :
    https://developer.amazon.com/docs/custom-skills/request-types-reference.html#slot-object

    If there is no such slot, then a ``None``
    is returned. If the input request is not an
    :py:class:`ask_sdk_model.intent_request.IntentRequest`, a
    :py:class:`TypeError` is raised.

    :param handler_input: The handler input instance that is generally
        passed in the sdk's request and exception components
    :type handler_input: ask_sdk_core.handler_input.HandlerInput
    :param slot_name: Name of the slot that needs to be retrieved
    :type slot_name: str
    :return: Slot information for the provided slot name if it exists,
        or a `None` value
    :rtype: Optional[ask_sdk_model.slot.Slot]
    :raises: TypeError if the input is not an IntentRequest
    """
    request = handler_input.request_envelope.request
    if isinstance(request, IntentRequest):
        if request.intent.slots is not None:
            return request.intent.slots.get(slot_name, None)
        else:
            return None

    raise TypeError("The provided request is not an IntentRequest")


def get_slot_value(handler_input, slot_name):
    # type: (HandlerInput, str) -> AnyStr
    """Return the slot value from intent request.

    The method retrieves the slot value from the input intent request
    for the given ``slot_name``. More information on the slots can be
    found here :
    https://developer.amazon.com/docs/custom-skills/request-types-reference.html#slot-object

    If the input request is not an
    :py:class:`ask_sdk_model.intent_request.IntentRequest`, a
    :py:class:`TypeError` is raised.

    :param handler_input: The handler input instance that is generally
        passed in the sdk's request and exception components
    :type handler_input: ask_sdk_core.handler_input.HandlerInput
    :param slot_name: Name of the slot for which the value has to be retrieved
    :type slot_name: str
    :return: Slot value for the provided slot if it exists
    :rtype: str
    :raises: TypeError if the input is not an IntentRequest.
    """
    slot = get_slot(handler_input=handler_input, slot_name=slot_name)

    if slot is not None:
        return slot.value

    return None


def get_supported_interfaces(handler_input):
    # type: (HandlerInput) -> SupportedInterfaces
    """Retrieves the supported interfaces from input request.

    The method returns an
    :py:class:`ask_sdk_model.supported_interfaces.SupportedInterfaces`
    object instance listing each interface that the device
    supports. For example, if ``supported_interfaces`` includes
    ``audio_player``, then you know that the device supports streaming
    audio using the AudioPlayer interface. More information on
    `supportedInterfaces` can be found here :
    https://developer.amazon.com/docs/custom-skills/request-and-response-json-reference.html#system-object

    :param handler_input: The handler input instance that is generally
        passed in the sdk's request and exception components
    :type handler_input: ask_sdk_core.handler_input.HandlerInput
    :return: Instance of
        :py:class:`ask_sdk_model.supported_interfaces.SupportedInterfaces`
        mentioning which all interfaces the device supports
    :rtype: ask_sdk_model.supported_interfaces.SupportedInterfaces
    """
    return (
        handler_input.request_envelope.context.system.device.
        supported_interfaces)


def is_new_session(handler_input):
    # type: (HandlerInput) -> bool
    """Return if the session is new for the input request.

    The method retrieves the ``new`` value from the input request's
    session, which indicates if it's a new session or not. The
    :py:class:`ask_sdk_model.session.Session` is only included on all
    standard requests except ``AudioPlayer``, ``VideoApp`` and
    ``PlaybackController`` requests. More information can be found here :
    https://developer.amazon.com/docs/custom-skills/request-and-response-json-reference.html#session-object

    A :py:class:`TypeError` is raised if the input request doesn't have
    the ``session`` information.

    :param handler_input: The handler input instance that is generally
        passed in the sdk's request and exception components
    :type handler_input: ask_sdk_core.handler_input.HandlerInput
    :return: Boolean if the session is new for the input request
    :rtype: bool
    :raises: TypeError if the input request doesn't have a session
    """
    session = handler_input.request_envelope.session

    if session is not None:
        return session.new

    raise TypeError("The provided request doesn't have a session")


def get_user_id(handler_input):
    # type: (HandlerInput) -> Optional[AnyStr]
    """Return the userId in the request.

    The method retrieves the ``userId`` from the input request.
    This value uniquely identifies the user and is generally used as input for
    some Alexa-specific API calls.
    More information about this can be found here:
    https://developer.amazon.com/docs/custom-skills/request-and-response-json-reference.html#system-object
    :param handler_input: The handler input instance that is generally
        passed in the sdk's request and exception components
    :type handler_input: ask_sdk_core.handler_input.HandlerInput
    :return: Users userId or None if not available
    :rtype: Optional[str]
    """
    user = handler_input.request_envelope.context.system.user
    return user.user_id if user else None
