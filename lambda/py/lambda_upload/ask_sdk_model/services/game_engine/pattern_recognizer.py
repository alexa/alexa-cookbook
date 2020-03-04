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
from ask_sdk_model.services.game_engine.recognizer import Recognizer


if typing.TYPE_CHECKING:
    from typing import Dict, List, Optional, Union
    from datetime import datetime
    from ask_sdk_model.services.game_engine.pattern import Pattern
    from ask_sdk_model.services.game_engine.pattern_recognizer_anchor_type import PatternRecognizerAnchorType


class PatternRecognizer(Recognizer):
    """
    This recognizer is true when all of the specified events have occurred in the specified order.


    :param anchor: 
    :type anchor: (optional) ask_sdk_model.services.game_engine.pattern_recognizer_anchor_type.PatternRecognizerAnchorType
    :param fuzzy: When true, the recognizer will ignore additional events that occur between the events specified in the pattern.
    :type fuzzy: (optional) bool
    :param gadget_ids: The gadget IDs of the Echo Buttons to consider in this pattern recognizer.
    :type gadget_ids: (optional) list[str]
    :param actions: The actions to consider in this pattern recognizer. All other actions will be ignored.
    :type actions: (optional) list[str]
    :param pattern: An object that provides all of the events that need to occur, in a specific order, for this recognizer to be true. Omitting any parameters in this object means \&quot;match anything\&quot;.
    :type pattern: (optional) list[ask_sdk_model.services.game_engine.pattern.Pattern]

    """
    deserialized_types = {
        'object_type': 'str',
        'anchor': 'ask_sdk_model.services.game_engine.pattern_recognizer_anchor_type.PatternRecognizerAnchorType',
        'fuzzy': 'bool',
        'gadget_ids': 'list[str]',
        'actions': 'list[str]',
        'pattern': 'list[ask_sdk_model.services.game_engine.pattern.Pattern]'
    }  # type: Dict

    attribute_map = {
        'object_type': 'type',
        'anchor': 'anchor',
        'fuzzy': 'fuzzy',
        'gadget_ids': 'gadgetIds',
        'actions': 'actions',
        'pattern': 'pattern'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, anchor=None, fuzzy=None, gadget_ids=None, actions=None, pattern=None):
        # type: (Optional[PatternRecognizerAnchorType], Optional[bool], Optional[List[object]], Optional[List[object]], Optional[List[Pattern]]) -> None
        """This recognizer is true when all of the specified events have occurred in the specified order.

        :param anchor: 
        :type anchor: (optional) ask_sdk_model.services.game_engine.pattern_recognizer_anchor_type.PatternRecognizerAnchorType
        :param fuzzy: When true, the recognizer will ignore additional events that occur between the events specified in the pattern.
        :type fuzzy: (optional) bool
        :param gadget_ids: The gadget IDs of the Echo Buttons to consider in this pattern recognizer.
        :type gadget_ids: (optional) list[str]
        :param actions: The actions to consider in this pattern recognizer. All other actions will be ignored.
        :type actions: (optional) list[str]
        :param pattern: An object that provides all of the events that need to occur, in a specific order, for this recognizer to be true. Omitting any parameters in this object means \&quot;match anything\&quot;.
        :type pattern: (optional) list[ask_sdk_model.services.game_engine.pattern.Pattern]
        """
        self.__discriminator_value = "match"  # type: str

        self.object_type = self.__discriminator_value
        super(PatternRecognizer, self).__init__(object_type=self.__discriminator_value)
        self.anchor = anchor
        self.fuzzy = fuzzy
        self.gadget_ids = gadget_ids
        self.actions = actions
        self.pattern = pattern

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
        if not isinstance(other, PatternRecognizer):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
