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


class Heading(object):
    """
    An object containing the heading direction information of the device.


    :param direction_in_degrees: A double representing the direction of the device in degrees.
    :type direction_in_degrees: (optional) float
    :param accuracy_in_degrees: A double representing the accuracy of the heading measurement in degrees.
    :type accuracy_in_degrees: (optional) float

    """
    deserialized_types = {
        'direction_in_degrees': 'float',
        'accuracy_in_degrees': 'float'
    }  # type: Dict

    attribute_map = {
        'direction_in_degrees': 'directionInDegrees',
        'accuracy_in_degrees': 'accuracyInDegrees'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, direction_in_degrees=None, accuracy_in_degrees=None):
        # type: (Optional[float], Optional[float]) -> None
        """An object containing the heading direction information of the device.

        :param direction_in_degrees: A double representing the direction of the device in degrees.
        :type direction_in_degrees: (optional) float
        :param accuracy_in_degrees: A double representing the accuracy of the heading measurement in degrees.
        :type accuracy_in_degrees: (optional) float
        """
        self.__discriminator_value = None  # type: str

        self.direction_in_degrees = direction_in_degrees
        self.accuracy_in_degrees = accuracy_in_degrees

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
        if not isinstance(other, Heading):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
