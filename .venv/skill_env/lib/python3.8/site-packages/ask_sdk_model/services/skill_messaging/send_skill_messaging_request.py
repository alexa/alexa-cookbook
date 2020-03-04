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


class SendSkillMessagingRequest(object):
    """
    The message that needs to be sent to the skill 


    :param data: The payload data to send with the message. The data must be in the form of JSON-formatted key-value pairs. Both keys and values must be of type String. The total size of the data cannot be greater than 6KB. For calculation purposes, this includes keys and values, the quotes that surround them, the \&quot;:\&quot; character that separates them, the commas that separate the pairs, and the opening and closing braces around the field. However, any whitespace between key/value pairs is not included in the calculation of the payload size. If the message does not include payload data, as in the case of a sync message, you can pass in an empty JSON object \&quot;{}\&quot;. 
    :type data: (optional) object
    :param expires_after_seconds: The number of seconds that the message will be retained to retry if message delivery is not successful. Allowed values are from 60 (1 minute) to 86400 (1 day), inclusive. The default is 3600 (1 hour). Multiple retries may occur during this interval. The retry logic is exponential. The first retry executes after 30 seconds, and this time period doubles on every retry. The retries will end when the total time elapsed since the message was first sent has exceeded the value you provided for expiresAfterSeconds. Message expiry is rarely a problem if the message handler has been set up correctly. With a correct setup, you will receive the message once promptly. This mechanism for retries is provided as a safeguard in case your skill goes down during a message delivery. 
    :type expires_after_seconds: (optional) int

    """
    deserialized_types = {
        'data': 'object',
        'expires_after_seconds': 'int'
    }  # type: Dict

    attribute_map = {
        'data': 'data',
        'expires_after_seconds': 'expiresAfterSeconds'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, data=None, expires_after_seconds=None):
        # type: (Optional[object], Optional[int]) -> None
        """The message that needs to be sent to the skill 

        :param data: The payload data to send with the message. The data must be in the form of JSON-formatted key-value pairs. Both keys and values must be of type String. The total size of the data cannot be greater than 6KB. For calculation purposes, this includes keys and values, the quotes that surround them, the \&quot;:\&quot; character that separates them, the commas that separate the pairs, and the opening and closing braces around the field. However, any whitespace between key/value pairs is not included in the calculation of the payload size. If the message does not include payload data, as in the case of a sync message, you can pass in an empty JSON object \&quot;{}\&quot;. 
        :type data: (optional) object
        :param expires_after_seconds: The number of seconds that the message will be retained to retry if message delivery is not successful. Allowed values are from 60 (1 minute) to 86400 (1 day), inclusive. The default is 3600 (1 hour). Multiple retries may occur during this interval. The retry logic is exponential. The first retry executes after 30 seconds, and this time period doubles on every retry. The retries will end when the total time elapsed since the message was first sent has exceeded the value you provided for expiresAfterSeconds. Message expiry is rarely a problem if the message handler has been set up correctly. With a correct setup, you will receive the message once promptly. This mechanism for retries is provided as a safeguard in case your skill goes down during a message delivery. 
        :type expires_after_seconds: (optional) int
        """
        self.__discriminator_value = None  # type: str

        self.data = data
        self.expires_after_seconds = expires_after_seconds

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
        if not isinstance(other, SendSkillMessagingRequest):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
