# coding: utf-8

#
# Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file
# except in compliance with the License. A copy of the License is located at
#
# http://aws.amazon.com/apache2.0/
#
# or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for
# the specific language governing permissions and limitations under the License.
#

import pprint
import re  # noqa: F401
import six
import typing
from enum import Enum
from abc import ABCMeta, abstractmethod


if typing.TYPE_CHECKING:
    from typing import Dict, List, Optional, Union
    from datetime import datetime


class Request(object):
    """
    A request object that provides the details of the user’s request. The request body contains the parameters necessary for the service to perform its logic and generate a response.


    :param object_type: Describes the type of the request.
    :type object_type: (optional) str
    :param request_id: Represents the unique identifier for the specific request.
    :type request_id: (optional) str
    :param timestamp: Provides the date and time when Alexa sent the request as an ISO 8601 formatted string. Used to verify the request when hosting your skill as a web service.
    :type timestamp: (optional) datetime
    :param locale: A string indicating the user’s locale. For example: en-US. This value is only provided with certain request types.
    :type locale: (optional) str

    .. note::

        This is an abstract class. Use the following mapping, to figure out
        the model class to be instantiated, that sets ``type`` variable.

        | AlexaSkillEvent.SkillEnabled: :py:class:`ask_sdk_model.events.skillevents.skill_enabled_request.SkillEnabledRequest`,
        |
        | AlexaHouseholdListEvent.ListUpdated: :py:class:`ask_sdk_model.services.list_management.list_updated_event_request.ListUpdatedEventRequest`,
        |
        | Alexa.Presentation.APL.UserEvent: :py:class:`ask_sdk_model.interfaces.alexa.presentation.apl.user_event.UserEvent`,
        |
        | AlexaSkillEvent.SkillDisabled: :py:class:`ask_sdk_model.events.skillevents.skill_disabled_request.SkillDisabledRequest`,
        |
        | AlexaHouseholdListEvent.ItemsCreated: :py:class:`ask_sdk_model.services.list_management.list_items_created_event_request.ListItemsCreatedEventRequest`,
        |
        | SessionResumedRequest: :py:class:`ask_sdk_model.session_resumed_request.SessionResumedRequest`,
        |
        | SessionEndedRequest: :py:class:`ask_sdk_model.session_ended_request.SessionEndedRequest`,
        |
        | AudioPlayer.PlaybackFailed: :py:class:`ask_sdk_model.interfaces.audioplayer.playback_failed_request.PlaybackFailedRequest`,
        |
        | CanFulfillIntentRequest: :py:class:`ask_sdk_model.canfulfill.can_fulfill_intent_request.CanFulfillIntentRequest`,
        |
        | CustomInterfaceController.Expired: :py:class:`ask_sdk_model.interfaces.custom_interface_controller.expired_request.ExpiredRequest`,
        |
        | Alexa.Presentation.HTML.Message: :py:class:`ask_sdk_model.interfaces.alexa.presentation.html.message_request.MessageRequest`,
        |
        | LaunchRequest: :py:class:`ask_sdk_model.launch_request.LaunchRequest`,
        |
        | Reminders.ReminderCreated: :py:class:`ask_sdk_model.services.reminder_management.reminder_created_event_request.ReminderCreatedEventRequest`,
        |
        | Alexa.Presentation.APLT.UserEvent: :py:class:`ask_sdk_model.interfaces.alexa.presentation.aplt.user_event.UserEvent`,
        |
        | AlexaHouseholdListEvent.ItemsUpdated: :py:class:`ask_sdk_model.services.list_management.list_items_updated_event_request.ListItemsUpdatedEventRequest`,
        |
        | AlexaHouseholdListEvent.ListCreated: :py:class:`ask_sdk_model.services.list_management.list_created_event_request.ListCreatedEventRequest`,
        |
        | AudioPlayer.PlaybackStarted: :py:class:`ask_sdk_model.interfaces.audioplayer.playback_started_request.PlaybackStartedRequest`,
        |
        | AudioPlayer.PlaybackNearlyFinished: :py:class:`ask_sdk_model.interfaces.audioplayer.playback_nearly_finished_request.PlaybackNearlyFinishedRequest`,
        |
        | CustomInterfaceController.EventsReceived: :py:class:`ask_sdk_model.interfaces.custom_interface_controller.events_received_request.EventsReceivedRequest`,
        |
        | Reminders.ReminderStatusChanged: :py:class:`ask_sdk_model.services.reminder_management.reminder_status_changed_event_request.ReminderStatusChangedEventRequest`,
        |
        | AlexaHouseholdListEvent.ItemsDeleted: :py:class:`ask_sdk_model.services.list_management.list_items_deleted_event_request.ListItemsDeletedEventRequest`,
        |
        | Reminders.ReminderDeleted: :py:class:`ask_sdk_model.services.reminder_management.reminder_deleted_event_request.ReminderDeletedEventRequest`,
        |
        | Connections.Response: :py:class:`ask_sdk_model.interfaces.connections.connections_response.ConnectionsResponse`,
        |
        | AlexaHouseholdListEvent.ListDeleted: :py:class:`ask_sdk_model.services.list_management.list_deleted_event_request.ListDeletedEventRequest`,
        |
        | GameEngine.InputHandlerEvent: :py:class:`ask_sdk_model.interfaces.game_engine.input_handler_event_request.InputHandlerEventRequest`,
        |
        | PlaybackController.PauseCommandIssued: :py:class:`ask_sdk_model.interfaces.playbackcontroller.pause_command_issued_request.PauseCommandIssuedRequest`,
        |
        | PlaybackController.PlayCommandIssued: :py:class:`ask_sdk_model.interfaces.playbackcontroller.play_command_issued_request.PlayCommandIssuedRequest`,
        |
        | AudioPlayer.PlaybackFinished: :py:class:`ask_sdk_model.interfaces.audioplayer.playback_finished_request.PlaybackFinishedRequest`,
        |
        | AlexaSkillEvent.ProactiveSubscriptionChanged: :py:class:`ask_sdk_model.events.skillevents.proactive_subscription_changed_request.ProactiveSubscriptionChangedRequest`,
        |
        | Display.ElementSelected: :py:class:`ask_sdk_model.interfaces.display.element_selected_request.ElementSelectedRequest`,
        |
        | AlexaSkillEvent.SkillPermissionChanged: :py:class:`ask_sdk_model.events.skillevents.permission_changed_request.PermissionChangedRequest`,
        |
        | Reminders.ReminderUpdated: :py:class:`ask_sdk_model.services.reminder_management.reminder_updated_event_request.ReminderUpdatedEventRequest`,
        |
        | Alexa.Presentation.HTML.RuntimeError: :py:class:`ask_sdk_model.interfaces.alexa.presentation.html.runtime_error_request.RuntimeErrorRequest`,
        |
        | IntentRequest: :py:class:`ask_sdk_model.intent_request.IntentRequest`,
        |
        | Reminders.ReminderStarted: :py:class:`ask_sdk_model.services.reminder_management.reminder_started_event_request.ReminderStartedEventRequest`,
        |
        | AudioPlayer.PlaybackStopped: :py:class:`ask_sdk_model.interfaces.audioplayer.playback_stopped_request.PlaybackStoppedRequest`,
        |
        | PlaybackController.PreviousCommandIssued: :py:class:`ask_sdk_model.interfaces.playbackcontroller.previous_command_issued_request.PreviousCommandIssuedRequest`,
        |
        | AlexaSkillEvent.SkillAccountLinked: :py:class:`ask_sdk_model.events.skillevents.account_linked_request.AccountLinkedRequest`,
        |
        | Messaging.MessageReceived: :py:class:`ask_sdk_model.interfaces.messaging.message_received_request.MessageReceivedRequest`,
        |
        | Connections.Request: :py:class:`ask_sdk_model.interfaces.connections.connections_request.ConnectionsRequest`,
        |
        | System.ExceptionEncountered: :py:class:`ask_sdk_model.interfaces.system.exception_encountered_request.ExceptionEncounteredRequest`,
        |
        | AlexaSkillEvent.SkillPermissionAccepted: :py:class:`ask_sdk_model.events.skillevents.permission_accepted_request.PermissionAcceptedRequest`,
        |
        | PlaybackController.NextCommandIssued: :py:class:`ask_sdk_model.interfaces.playbackcontroller.next_command_issued_request.NextCommandIssuedRequest`

    """
    deserialized_types = {
        'object_type': 'str',
        'request_id': 'str',
        'timestamp': 'datetime',
        'locale': 'str'
    }  # type: Dict

    attribute_map = {
        'object_type': 'type',
        'request_id': 'requestId',
        'timestamp': 'timestamp',
        'locale': 'locale'
    }  # type: Dict
    supports_multiple_types = False

    discriminator_value_class_map = {
        'AlexaSkillEvent.SkillEnabled': 'ask_sdk_model.events.skillevents.skill_enabled_request.SkillEnabledRequest',
        'AlexaHouseholdListEvent.ListUpdated': 'ask_sdk_model.services.list_management.list_updated_event_request.ListUpdatedEventRequest',
        'Alexa.Presentation.APL.UserEvent': 'ask_sdk_model.interfaces.alexa.presentation.apl.user_event.UserEvent',
        'AlexaSkillEvent.SkillDisabled': 'ask_sdk_model.events.skillevents.skill_disabled_request.SkillDisabledRequest',
        'AlexaHouseholdListEvent.ItemsCreated': 'ask_sdk_model.services.list_management.list_items_created_event_request.ListItemsCreatedEventRequest',
        'SessionResumedRequest': 'ask_sdk_model.session_resumed_request.SessionResumedRequest',
        'SessionEndedRequest': 'ask_sdk_model.session_ended_request.SessionEndedRequest',
        'AudioPlayer.PlaybackFailed': 'ask_sdk_model.interfaces.audioplayer.playback_failed_request.PlaybackFailedRequest',
        'CanFulfillIntentRequest': 'ask_sdk_model.canfulfill.can_fulfill_intent_request.CanFulfillIntentRequest',
        'CustomInterfaceController.Expired': 'ask_sdk_model.interfaces.custom_interface_controller.expired_request.ExpiredRequest',
        'Alexa.Presentation.HTML.Message': 'ask_sdk_model.interfaces.alexa.presentation.html.message_request.MessageRequest',
        'LaunchRequest': 'ask_sdk_model.launch_request.LaunchRequest',
        'Reminders.ReminderCreated': 'ask_sdk_model.services.reminder_management.reminder_created_event_request.ReminderCreatedEventRequest',
        'Alexa.Presentation.APLT.UserEvent': 'ask_sdk_model.interfaces.alexa.presentation.aplt.user_event.UserEvent',
        'AlexaHouseholdListEvent.ItemsUpdated': 'ask_sdk_model.services.list_management.list_items_updated_event_request.ListItemsUpdatedEventRequest',
        'AlexaHouseholdListEvent.ListCreated': 'ask_sdk_model.services.list_management.list_created_event_request.ListCreatedEventRequest',
        'AudioPlayer.PlaybackStarted': 'ask_sdk_model.interfaces.audioplayer.playback_started_request.PlaybackStartedRequest',
        'AudioPlayer.PlaybackNearlyFinished': 'ask_sdk_model.interfaces.audioplayer.playback_nearly_finished_request.PlaybackNearlyFinishedRequest',
        'CustomInterfaceController.EventsReceived': 'ask_sdk_model.interfaces.custom_interface_controller.events_received_request.EventsReceivedRequest',
        'Reminders.ReminderStatusChanged': 'ask_sdk_model.services.reminder_management.reminder_status_changed_event_request.ReminderStatusChangedEventRequest',
        'AlexaHouseholdListEvent.ItemsDeleted': 'ask_sdk_model.services.list_management.list_items_deleted_event_request.ListItemsDeletedEventRequest',
        'Reminders.ReminderDeleted': 'ask_sdk_model.services.reminder_management.reminder_deleted_event_request.ReminderDeletedEventRequest',
        'Connections.Response': 'ask_sdk_model.interfaces.connections.connections_response.ConnectionsResponse',
        'AlexaHouseholdListEvent.ListDeleted': 'ask_sdk_model.services.list_management.list_deleted_event_request.ListDeletedEventRequest',
        'GameEngine.InputHandlerEvent': 'ask_sdk_model.interfaces.game_engine.input_handler_event_request.InputHandlerEventRequest',
        'PlaybackController.PauseCommandIssued': 'ask_sdk_model.interfaces.playbackcontroller.pause_command_issued_request.PauseCommandIssuedRequest',
        'PlaybackController.PlayCommandIssued': 'ask_sdk_model.interfaces.playbackcontroller.play_command_issued_request.PlayCommandIssuedRequest',
        'AudioPlayer.PlaybackFinished': 'ask_sdk_model.interfaces.audioplayer.playback_finished_request.PlaybackFinishedRequest',
        'AlexaSkillEvent.ProactiveSubscriptionChanged': 'ask_sdk_model.events.skillevents.proactive_subscription_changed_request.ProactiveSubscriptionChangedRequest',
        'Display.ElementSelected': 'ask_sdk_model.interfaces.display.element_selected_request.ElementSelectedRequest',
        'AlexaSkillEvent.SkillPermissionChanged': 'ask_sdk_model.events.skillevents.permission_changed_request.PermissionChangedRequest',
        'Reminders.ReminderUpdated': 'ask_sdk_model.services.reminder_management.reminder_updated_event_request.ReminderUpdatedEventRequest',
        'Alexa.Presentation.HTML.RuntimeError': 'ask_sdk_model.interfaces.alexa.presentation.html.runtime_error_request.RuntimeErrorRequest',
        'IntentRequest': 'ask_sdk_model.intent_request.IntentRequest',
        'Reminders.ReminderStarted': 'ask_sdk_model.services.reminder_management.reminder_started_event_request.ReminderStartedEventRequest',
        'AudioPlayer.PlaybackStopped': 'ask_sdk_model.interfaces.audioplayer.playback_stopped_request.PlaybackStoppedRequest',
        'PlaybackController.PreviousCommandIssued': 'ask_sdk_model.interfaces.playbackcontroller.previous_command_issued_request.PreviousCommandIssuedRequest',
        'AlexaSkillEvent.SkillAccountLinked': 'ask_sdk_model.events.skillevents.account_linked_request.AccountLinkedRequest',
        'Messaging.MessageReceived': 'ask_sdk_model.interfaces.messaging.message_received_request.MessageReceivedRequest',
        'Connections.Request': 'ask_sdk_model.interfaces.connections.connections_request.ConnectionsRequest',
        'System.ExceptionEncountered': 'ask_sdk_model.interfaces.system.exception_encountered_request.ExceptionEncounteredRequest',
        'AlexaSkillEvent.SkillPermissionAccepted': 'ask_sdk_model.events.skillevents.permission_accepted_request.PermissionAcceptedRequest',
        'PlaybackController.NextCommandIssued': 'ask_sdk_model.interfaces.playbackcontroller.next_command_issued_request.NextCommandIssuedRequest'
    }

    json_discriminator_key = "type"

    __metaclass__ = ABCMeta

    @abstractmethod
    def __init__(self, object_type=None, request_id=None, timestamp=None, locale=None):
        # type: (Optional[str], Optional[str], Optional[datetime], Optional[str]) -> None
        """A request object that provides the details of the user’s request. The request body contains the parameters necessary for the service to perform its logic and generate a response.

        :param object_type: Describes the type of the request.
        :type object_type: (optional) str
        :param request_id: Represents the unique identifier for the specific request.
        :type request_id: (optional) str
        :param timestamp: Provides the date and time when Alexa sent the request as an ISO 8601 formatted string. Used to verify the request when hosting your skill as a web service.
        :type timestamp: (optional) datetime
        :param locale: A string indicating the user’s locale. For example: en-US. This value is only provided with certain request types.
        :type locale: (optional) str
        """
        self.__discriminator_value = None  # type: str

        self.object_type = object_type
        self.request_id = request_id
        self.timestamp = timestamp
        self.locale = locale

    @classmethod
    def get_real_child_model(cls, data):
        # type: (Dict[str, str]) -> Optional[str]
        """Returns the real base class specified by the discriminator"""
        discriminator_value = data[cls.json_discriminator_key]
        return cls.discriminator_value_class_map.get(discriminator_value)

    def to_dict(self):
        # type: () -> Dict[str, object]
        """Returns the model properties as a dict"""
        result = {}  # type: Dict

        for attr, _ in six.iteritems(self.deserialized_types):
            value = getattr(self, attr)
            if isinstance(value, list):
                result[attr] = list(map(
                    lambda x: x.to_dict() if hasattr(x, "to_dict") else
                    x.value if isinstance(x, Enum) else x,
                    value
                ))
            elif isinstance(value, Enum):
                result[attr] = value.value
            elif hasattr(value, "to_dict"):
                result[attr] = value.to_dict()
            elif isinstance(value, dict):
                result[attr] = dict(map(
                    lambda item: (item[0], item[1].to_dict())
                    if hasattr(item[1], "to_dict") else
                    (item[0], item[1].value)
                    if isinstance(item[1], Enum) else item,
                    value.items()
                ))
            else:
                result[attr] = value

        return result

    def to_str(self):
        # type: () -> str
        """Returns the string representation of the model"""
        return pprint.pformat(self.to_dict())

    def __repr__(self):
        # type: () -> str
        """For `print` and `pprint`"""
        return self.to_str()

    def __eq__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are equal"""
        if not isinstance(other, Request):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
