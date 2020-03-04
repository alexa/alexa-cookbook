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


class Experience(object):
    """
    An experience represents a viewing mode used to interact with the device.


    :param arc_minute_width: The number of horizontal arc minutes the viewport occupies in the user&#39;s visual field when viewed within this experience.
    :type arc_minute_width: (optional) float
    :param arc_minute_height: The number of vertical arc minutes the viewport occupies in the user&#39;s visual field when viewed within this experience.
    :type arc_minute_height: (optional) float
    :param can_rotate: Indicates if the viewport can be rotated through 90 degrees.
    :type can_rotate: (optional) bool
    :param can_resize: Indicates if the viewport can be resized, limiting the area which can be used to render the APL response.
    :type can_resize: (optional) bool

    """
    deserialized_types = {
        'arc_minute_width': 'float',
        'arc_minute_height': 'float',
        'can_rotate': 'bool',
        'can_resize': 'bool'
    }  # type: Dict

    attribute_map = {
        'arc_minute_width': 'arcMinuteWidth',
        'arc_minute_height': 'arcMinuteHeight',
        'can_rotate': 'canRotate',
        'can_resize': 'canResize'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, arc_minute_width=None, arc_minute_height=None, can_rotate=None, can_resize=None):
        # type: (Optional[float], Optional[float], Optional[bool], Optional[bool]) -> None
        """An experience represents a viewing mode used to interact with the device.

        :param arc_minute_width: The number of horizontal arc minutes the viewport occupies in the user&#39;s visual field when viewed within this experience.
        :type arc_minute_width: (optional) float
        :param arc_minute_height: The number of vertical arc minutes the viewport occupies in the user&#39;s visual field when viewed within this experience.
        :type arc_minute_height: (optional) float
        :param can_rotate: Indicates if the viewport can be rotated through 90 degrees.
        :type can_rotate: (optional) bool
        :param can_resize: Indicates if the viewport can be resized, limiting the area which can be used to render the APL response.
        :type can_resize: (optional) bool
        """
        self.__discriminator_value = None  # type: str

        self.arc_minute_width = arc_minute_width
        self.arc_minute_height = arc_minute_height
        self.can_rotate = can_rotate
        self.can_resize = can_resize

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
        if not isinstance(other, Experience):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
