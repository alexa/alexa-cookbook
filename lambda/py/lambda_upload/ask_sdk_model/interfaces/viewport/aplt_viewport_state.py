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
from ask_sdk_model.interfaces.viewport.typed_viewport_state import TypedViewportState


if typing.TYPE_CHECKING:
    from typing import Dict, List, Optional, Union
    from datetime import datetime
    from ask_sdk_model.interfaces.viewport.aplt.viewport_profile import ViewportProfile
    from ask_sdk_model.interfaces.viewport.aplt.inter_segment import InterSegment
    from ask_sdk_model.interfaces.viewport.aplt.character_format import CharacterFormat


class APLTViewportState(TypedViewportState):
    """
    This object contains the characteristics related to the text device&#39;s viewport.


    :param id: unique identifier of a viewport object
    :type id: (optional) str
    :param supported_profiles: List of profiles that device can emulate.
    :type supported_profiles: (optional) list[ask_sdk_model.interfaces.viewport.aplt.viewport_profile.ViewportProfile]
    :param line_length: horizontal dimension of text display in number of characters
    :type line_length: (optional) int
    :param line_count: vertical dimension of text display in number of rows
    :type line_count: (optional) int
    :param character_format: 
    :type character_format: (optional) ask_sdk_model.interfaces.viewport.aplt.character_format.CharacterFormat
    :param inter_segments: list of inter-segment objects
    :type inter_segments: (optional) list[ask_sdk_model.interfaces.viewport.aplt.inter_segment.InterSegment]

    """
    deserialized_types = {
        'id': 'str',
        'object_type': 'str',
        'supported_profiles': 'list[ask_sdk_model.interfaces.viewport.aplt.viewport_profile.ViewportProfile]',
        'line_length': 'int',
        'line_count': 'int',
        'character_format': 'ask_sdk_model.interfaces.viewport.aplt.character_format.CharacterFormat',
        'inter_segments': 'list[ask_sdk_model.interfaces.viewport.aplt.inter_segment.InterSegment]'
    }  # type: Dict

    attribute_map = {
        'id': 'id',
        'object_type': 'type',
        'supported_profiles': 'supportedProfiles',
        'line_length': 'lineLength',
        'line_count': 'lineCount',
        'character_format': 'characterFormat',
        'inter_segments': 'interSegments'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, id=None, supported_profiles=None, line_length=None, line_count=None, character_format=None, inter_segments=None):
        # type: (Optional[str], Optional[List[ViewportProfile]], Optional[int], Optional[int], Optional[CharacterFormat], Optional[List[InterSegment]]) -> None
        """This object contains the characteristics related to the text device&#39;s viewport.

        :param id: unique identifier of a viewport object
        :type id: (optional) str
        :param supported_profiles: List of profiles that device can emulate.
        :type supported_profiles: (optional) list[ask_sdk_model.interfaces.viewport.aplt.viewport_profile.ViewportProfile]
        :param line_length: horizontal dimension of text display in number of characters
        :type line_length: (optional) int
        :param line_count: vertical dimension of text display in number of rows
        :type line_count: (optional) int
        :param character_format: 
        :type character_format: (optional) ask_sdk_model.interfaces.viewport.aplt.character_format.CharacterFormat
        :param inter_segments: list of inter-segment objects
        :type inter_segments: (optional) list[ask_sdk_model.interfaces.viewport.aplt.inter_segment.InterSegment]
        """
        self.__discriminator_value = "APLT"  # type: str

        self.object_type = self.__discriminator_value
        super(APLTViewportState, self).__init__(id=id, object_type=self.__discriminator_value)
        self.supported_profiles = supported_profiles
        self.line_length = line_length
        self.line_count = line_count
        self.character_format = character_format
        self.inter_segments = inter_segments

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
        if not isinstance(other, APLTViewportState):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
