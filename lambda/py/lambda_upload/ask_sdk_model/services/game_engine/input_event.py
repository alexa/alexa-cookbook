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
    from ask_sdk_model.services.game_engine.input_event_action_type import InputEventActionType


class InputEvent(object):
    """

    :param gadget_id: The identifier of the Echo Button in question. It matches the gadgetId that you will have discovered in roll call.
    :type gadget_id: (optional) str
    :param timestamp: The event&#39;s original moment of occurrence, in ISO format.
    :type timestamp: (optional) str
    :param action: 
    :type action: (optional) ask_sdk_model.services.game_engine.input_event_action_type.InputEventActionType
    :param color: The hexadecimal RGB values of the button LED at the time of the event.
    :type color: (optional) str
    :param feature: For gadgets with multiple features, this is the feature that the event represents. Echo Buttons have one feature only, so this is always &#x60;press&#x60;.
    :type feature: (optional) str

    """
    deserialized_types = {
        'gadget_id': 'str',
        'timestamp': 'str',
        'action': 'ask_sdk_model.services.game_engine.input_event_action_type.InputEventActionType',
        'color': 'str',
        'feature': 'str'
    }  # type: Dict

    attribute_map = {
        'gadget_id': 'gadgetId',
        'timestamp': 'timestamp',
        'action': 'action',
        'color': 'color',
        'feature': 'feature'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, gadget_id=None, timestamp=None, action=None, color=None, feature=None):
        # type: (Optional[str], Optional[str], Optional[InputEventActionType], Optional[str], Optional[str]) -> None
        """

        :param gadget_id: The identifier of the Echo Button in question. It matches the gadgetId that you will have discovered in roll call.
        :type gadget_id: (optional) str
        :param timestamp: The event&#39;s original moment of occurrence, in ISO format.
        :type timestamp: (optional) str
        :param action: 
        :type action: (optional) ask_sdk_model.services.game_engine.input_event_action_type.InputEventActionType
        :param color: The hexadecimal RGB values of the button LED at the time of the event.
        :type color: (optional) str
        :param feature: For gadgets with multiple features, this is the feature that the event represents. Echo Buttons have one feature only, so this is always &#x60;press&#x60;.
        :type feature: (optional) str
        """
        self.__discriminator_value = None  # type: str

        self.gadget_id = gadget_id
        self.timestamp = timestamp
        self.action = action
        self.color = color
        self.feature = feature

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
        if not isinstance(other, InputEvent):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
