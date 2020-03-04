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
    from ask_sdk_model.services.reminder_management.recurrence_freq import RecurrenceFreq
    from ask_sdk_model.services.reminder_management.recurrence_day import RecurrenceDay


class Recurrence(object):
    """
    Recurring date/time using the RFC 5545 standard in JSON object form


    :param freq: 
    :type freq: (optional) ask_sdk_model.services.reminder_management.recurrence_freq.RecurrenceFreq
    :param by_day: 
    :type by_day: (optional) list[ask_sdk_model.services.reminder_management.recurrence_day.RecurrenceDay]
    :param interval: contains a positive integer representing at which intervals the recurrence rule repeats
    :type interval: (optional) int
    :param start_date_time: Valid ISO 8601 format - optional start DateTime of recurrence.
    :type start_date_time: (optional) datetime
    :param end_date_time: Valid ISO 8601 format - optional end DateTime of recurrence
    :type end_date_time: (optional) datetime
    :param recurrence_rules: 
    :type recurrence_rules: (optional) list[str]

    """
    deserialized_types = {
        'freq': 'ask_sdk_model.services.reminder_management.recurrence_freq.RecurrenceFreq',
        'by_day': 'list[ask_sdk_model.services.reminder_management.recurrence_day.RecurrenceDay]',
        'interval': 'int',
        'start_date_time': 'datetime',
        'end_date_time': 'datetime',
        'recurrence_rules': 'list[str]'
    }  # type: Dict

    attribute_map = {
        'freq': 'freq',
        'by_day': 'byDay',
        'interval': 'interval',
        'start_date_time': 'startDateTime',
        'end_date_time': 'endDateTime',
        'recurrence_rules': 'recurrenceRules'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, freq=None, by_day=None, interval=None, start_date_time=None, end_date_time=None, recurrence_rules=None):
        # type: (Optional[RecurrenceFreq], Optional[List[RecurrenceDay]], Optional[int], Optional[datetime], Optional[datetime], Optional[List[object]]) -> None
        """Recurring date/time using the RFC 5545 standard in JSON object form

        :param freq: 
        :type freq: (optional) ask_sdk_model.services.reminder_management.recurrence_freq.RecurrenceFreq
        :param by_day: 
        :type by_day: (optional) list[ask_sdk_model.services.reminder_management.recurrence_day.RecurrenceDay]
        :param interval: contains a positive integer representing at which intervals the recurrence rule repeats
        :type interval: (optional) int
        :param start_date_time: Valid ISO 8601 format - optional start DateTime of recurrence.
        :type start_date_time: (optional) datetime
        :param end_date_time: Valid ISO 8601 format - optional end DateTime of recurrence
        :type end_date_time: (optional) datetime
        :param recurrence_rules: 
        :type recurrence_rules: (optional) list[str]
        """
        self.__discriminator_value = None  # type: str

        self.freq = freq
        self.by_day = by_day
        self.interval = interval
        self.start_date_time = start_date_time
        self.end_date_time = end_date_time
        self.recurrence_rules = recurrence_rules

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
        if not isinstance(other, Recurrence):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
