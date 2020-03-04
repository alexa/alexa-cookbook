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


if typing.TYPE_CHECKING:
    from typing import Dict, List, Optional, Union
    from datetime import datetime
    from ask_sdk_model.services.game_engine.event_reporting_type import EventReportingType


class Event(object):
    """
    The events object is where you define the conditions that must be met for your skill to be notified of Echo Button input. You must define at least one event.


    :param should_end_input_handler: Whether the Input Handler should end after this event fires. If true, the Input Handler will stop and no further events will be sent to your skill unless you call StartInputHandler again.
    :type should_end_input_handler: (optional) bool
    :param meets: 
    :type meets: (optional) list[str]
    :param fails: 
    :type fails: (optional) list[str]
    :param reports: 
    :type reports: (optional) ask_sdk_model.services.game_engine.event_reporting_type.EventReportingType
    :param maximum_invocations: Enables you to limit the number of times that the skill is notified about the same event during the course of the Input Handler. The default value is 1. This property is mutually exclusive with triggerTimeMilliseconds. 
    :type maximum_invocations: (optional) int
    :param trigger_time_milliseconds: Adds a time constraint to the event. Instead of being considered whenever a raw button event occurs, an event that has this parameter will only be considered once at triggerTimeMilliseconds after the Input Handler has started. Because a time-triggered event can only fire once, the maximumInvocations value is ignored. Omit this property entirely if you do not want to time-constrain the event. 
    :type trigger_time_milliseconds: (optional) int

    """
    deserialized_types = {
        'should_end_input_handler': 'bool',
        'meets': 'list[str]',
        'fails': 'list[str]',
        'reports': 'ask_sdk_model.services.game_engine.event_reporting_type.EventReportingType',
        'maximum_invocations': 'int',
        'trigger_time_milliseconds': 'int'
    }  # type: Dict

    attribute_map = {
        'should_end_input_handler': 'shouldEndInputHandler',
        'meets': 'meets',
        'fails': 'fails',
        'reports': 'reports',
        'maximum_invocations': 'maximumInvocations',
        'trigger_time_milliseconds': 'triggerTimeMilliseconds'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, should_end_input_handler=None, meets=None, fails=None, reports=None, maximum_invocations=None, trigger_time_milliseconds=None):
        # type: (Optional[bool], Optional[List[object]], Optional[List[object]], Optional[EventReportingType], Optional[int], Optional[int]) -> None
        """The events object is where you define the conditions that must be met for your skill to be notified of Echo Button input. You must define at least one event.

        :param should_end_input_handler: Whether the Input Handler should end after this event fires. If true, the Input Handler will stop and no further events will be sent to your skill unless you call StartInputHandler again.
        :type should_end_input_handler: (optional) bool
        :param meets: 
        :type meets: (optional) list[str]
        :param fails: 
        :type fails: (optional) list[str]
        :param reports: 
        :type reports: (optional) ask_sdk_model.services.game_engine.event_reporting_type.EventReportingType
        :param maximum_invocations: Enables you to limit the number of times that the skill is notified about the same event during the course of the Input Handler. The default value is 1. This property is mutually exclusive with triggerTimeMilliseconds. 
        :type maximum_invocations: (optional) int
        :param trigger_time_milliseconds: Adds a time constraint to the event. Instead of being considered whenever a raw button event occurs, an event that has this parameter will only be considered once at triggerTimeMilliseconds after the Input Handler has started. Because a time-triggered event can only fire once, the maximumInvocations value is ignored. Omit this property entirely if you do not want to time-constrain the event. 
        :type trigger_time_milliseconds: (optional) int
        """
        self.__discriminator_value = None  # type: str

        self.should_end_input_handler = should_end_input_handler
        self.meets = meets
        self.fails = fails
        self.reports = reports
        self.maximum_invocations = maximum_invocations
        self.trigger_time_milliseconds = trigger_time_milliseconds

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
        if not isinstance(other, Event):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
