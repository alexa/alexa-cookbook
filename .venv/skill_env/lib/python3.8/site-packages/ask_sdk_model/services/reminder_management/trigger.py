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
    from ask_sdk_model.services.reminder_management.trigger_type import TriggerType
    from ask_sdk_model.services.reminder_management.recurrence import Recurrence


class Trigger(object):
    """
    Trigger information for Reminder


    :param object_type: 
    :type object_type: (optional) ask_sdk_model.services.reminder_management.trigger_type.TriggerType
    :param scheduled_time: Valid ISO 8601 format - Intended trigger time
    :type scheduled_time: (optional) datetime
    :param offset_in_seconds: If reminder is set using relative time, use this field to specify the time after which reminder ll ring (in seconds)
    :type offset_in_seconds: (optional) int
    :param time_zone_id: Intended reminder&#39;s timezone
    :type time_zone_id: (optional) str
    :param recurrence: 
    :type recurrence: (optional) ask_sdk_model.services.reminder_management.recurrence.Recurrence

    """
    deserialized_types = {
        'object_type': 'ask_sdk_model.services.reminder_management.trigger_type.TriggerType',
        'scheduled_time': 'datetime',
        'offset_in_seconds': 'int',
        'time_zone_id': 'str',
        'recurrence': 'ask_sdk_model.services.reminder_management.recurrence.Recurrence'
    }  # type: Dict

    attribute_map = {
        'object_type': 'type',
        'scheduled_time': 'scheduledTime',
        'offset_in_seconds': 'offsetInSeconds',
        'time_zone_id': 'timeZoneId',
        'recurrence': 'recurrence'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, object_type=None, scheduled_time=None, offset_in_seconds=None, time_zone_id=None, recurrence=None):
        # type: (Optional[TriggerType], Optional[datetime], Optional[int], Optional[str], Optional[Recurrence]) -> None
        """Trigger information for Reminder

        :param object_type: 
        :type object_type: (optional) ask_sdk_model.services.reminder_management.trigger_type.TriggerType
        :param scheduled_time: Valid ISO 8601 format - Intended trigger time
        :type scheduled_time: (optional) datetime
        :param offset_in_seconds: If reminder is set using relative time, use this field to specify the time after which reminder ll ring (in seconds)
        :type offset_in_seconds: (optional) int
        :param time_zone_id: Intended reminder&#39;s timezone
        :type time_zone_id: (optional) str
        :param recurrence: 
        :type recurrence: (optional) ask_sdk_model.services.reminder_management.recurrence.Recurrence
        """
        self.__discriminator_value = None  # type: str

        self.object_type = object_type
        self.scheduled_time = scheduled_time
        self.offset_in_seconds = offset_in_seconds
        self.time_zone_id = time_zone_id
        self.recurrence = recurrence

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
        if not isinstance(other, Trigger):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
