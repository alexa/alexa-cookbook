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
    from ask_sdk_model.services.proactive_events.relevant_audience import RelevantAudience
    from ask_sdk_model.services.proactive_events.event import Event


class CreateProactiveEventRequest(object):
    """

    :param timestamp: The date and time of the event associated with this request, in ISO 8601 format.
    :type timestamp: (optional) datetime
    :param reference_id: Client-supplied ID for correlating the event with external entities. The allowed characters for the referenceId field are alphanumeric and ~, and the length of the referenceId field must be 1-100 characters. 
    :type reference_id: (optional) str
    :param expiry_time: The date and time, in ISO 8601 format, when the service will automatically delete the notification if it is still in the pending state. 
    :type expiry_time: (optional) datetime
    :param event: 
    :type event: (optional) ask_sdk_model.services.proactive_events.event.Event
    :param localized_attributes: A list of items, each of which contains the set of event attributes that requires localization support.
    :type localized_attributes: (optional) list[object]
    :param relevant_audience: 
    :type relevant_audience: (optional) ask_sdk_model.services.proactive_events.relevant_audience.RelevantAudience

    """
    deserialized_types = {
        'timestamp': 'datetime',
        'reference_id': 'str',
        'expiry_time': 'datetime',
        'event': 'ask_sdk_model.services.proactive_events.event.Event',
        'localized_attributes': 'list[object]',
        'relevant_audience': 'ask_sdk_model.services.proactive_events.relevant_audience.RelevantAudience'
    }  # type: Dict

    attribute_map = {
        'timestamp': 'timestamp',
        'reference_id': 'referenceId',
        'expiry_time': 'expiryTime',
        'event': 'event',
        'localized_attributes': 'localizedAttributes',
        'relevant_audience': 'relevantAudience'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, timestamp=None, reference_id=None, expiry_time=None, event=None, localized_attributes=None, relevant_audience=None):
        # type: (Optional[datetime], Optional[str], Optional[datetime], Optional[Event], Optional[List[object]], Optional[RelevantAudience]) -> None
        """

        :param timestamp: The date and time of the event associated with this request, in ISO 8601 format.
        :type timestamp: (optional) datetime
        :param reference_id: Client-supplied ID for correlating the event with external entities. The allowed characters for the referenceId field are alphanumeric and ~, and the length of the referenceId field must be 1-100 characters. 
        :type reference_id: (optional) str
        :param expiry_time: The date and time, in ISO 8601 format, when the service will automatically delete the notification if it is still in the pending state. 
        :type expiry_time: (optional) datetime
        :param event: 
        :type event: (optional) ask_sdk_model.services.proactive_events.event.Event
        :param localized_attributes: A list of items, each of which contains the set of event attributes that requires localization support.
        :type localized_attributes: (optional) list[object]
        :param relevant_audience: 
        :type relevant_audience: (optional) ask_sdk_model.services.proactive_events.relevant_audience.RelevantAudience
        """
        self.__discriminator_value = None  # type: str

        self.timestamp = timestamp
        self.reference_id = reference_id
        self.expiry_time = expiry_time
        self.event = event
        self.localized_attributes = localized_attributes
        self.relevant_audience = relevant_audience

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
        if not isinstance(other, CreateProactiveEventRequest):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
