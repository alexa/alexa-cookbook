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
    from ask_sdk_model.interfaces.alexa.presentation.apl.component_entity import ComponentEntity
    from ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen_media_tag_state_enum import ComponentVisibleOnScreenMediaTagStateEnum


class ComponentVisibleOnScreenMediaTag(object):
    """
    Media player


    :param position_in_milliseconds: Current position of the play head from the start of the track.
    :type position_in_milliseconds: (optional) int
    :param state: 
    :type state: (optional) ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen_media_tag_state_enum.ComponentVisibleOnScreenMediaTagStateEnum
    :param allow_adjust_seek_position_forward: Whether the user may seek forward relative to the current position.
    :type allow_adjust_seek_position_forward: (optional) bool
    :param allow_adjust_seek_position_backwards: Whether the user may seek backwards relative to the current position.
    :type allow_adjust_seek_position_backwards: (optional) bool
    :param allow_next: Whether the user may move forward to the next track.
    :type allow_next: (optional) bool
    :param allow_previous: Whether the user may move backward to the previous track.
    :type allow_previous: (optional) bool
    :param entities: 
    :type entities: (optional) list[ask_sdk_model.interfaces.alexa.presentation.apl.component_entity.ComponentEntity]
    :param url: The URL of the current media track.
    :type url: (optional) str

    """
    deserialized_types = {
        'position_in_milliseconds': 'int',
        'state': 'ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen_media_tag_state_enum.ComponentVisibleOnScreenMediaTagStateEnum',
        'allow_adjust_seek_position_forward': 'bool',
        'allow_adjust_seek_position_backwards': 'bool',
        'allow_next': 'bool',
        'allow_previous': 'bool',
        'entities': 'list[ask_sdk_model.interfaces.alexa.presentation.apl.component_entity.ComponentEntity]',
        'url': 'str'
    }  # type: Dict

    attribute_map = {
        'position_in_milliseconds': 'positionInMilliseconds',
        'state': 'state',
        'allow_adjust_seek_position_forward': 'allowAdjustSeekPositionForward',
        'allow_adjust_seek_position_backwards': 'allowAdjustSeekPositionBackwards',
        'allow_next': 'allowNext',
        'allow_previous': 'allowPrevious',
        'entities': 'entities',
        'url': 'url'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, position_in_milliseconds=None, state=None, allow_adjust_seek_position_forward=None, allow_adjust_seek_position_backwards=None, allow_next=None, allow_previous=None, entities=None, url=None):
        # type: (Optional[int], Optional[ComponentVisibleOnScreenMediaTagStateEnum], Optional[bool], Optional[bool], Optional[bool], Optional[bool], Optional[List[ComponentEntity]], Optional[str]) -> None
        """Media player

        :param position_in_milliseconds: Current position of the play head from the start of the track.
        :type position_in_milliseconds: (optional) int
        :param state: 
        :type state: (optional) ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen_media_tag_state_enum.ComponentVisibleOnScreenMediaTagStateEnum
        :param allow_adjust_seek_position_forward: Whether the user may seek forward relative to the current position.
        :type allow_adjust_seek_position_forward: (optional) bool
        :param allow_adjust_seek_position_backwards: Whether the user may seek backwards relative to the current position.
        :type allow_adjust_seek_position_backwards: (optional) bool
        :param allow_next: Whether the user may move forward to the next track.
        :type allow_next: (optional) bool
        :param allow_previous: Whether the user may move backward to the previous track.
        :type allow_previous: (optional) bool
        :param entities: 
        :type entities: (optional) list[ask_sdk_model.interfaces.alexa.presentation.apl.component_entity.ComponentEntity]
        :param url: The URL of the current media track.
        :type url: (optional) str
        """
        self.__discriminator_value = None  # type: str

        self.position_in_milliseconds = position_in_milliseconds
        self.state = state
        self.allow_adjust_seek_position_forward = allow_adjust_seek_position_forward
        self.allow_adjust_seek_position_backwards = allow_adjust_seek_position_backwards
        self.allow_next = allow_next
        self.allow_previous = allow_previous
        self.entities = entities
        self.url = url

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
        if not isinstance(other, ComponentVisibleOnScreenMediaTag):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
