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
    from ask_sdk_model.services.gadget_controller.animation_step import AnimationStep


class LightAnimation(object):
    """

    :param repeat: The number of times to play this animation. 
    :type repeat: (optional) int
    :param target_lights: An array of strings that represent the light addresses on the target gadgets that this animation will be applied to. Because the Echo Button has one light only, use [\&quot;1\&quot;] to signify that this animation should be sent to light one.
    :type target_lights: (optional) list[str]
    :param sequence: The animation steps to render in order. The maximum number of steps that you can define is 38. The minimum is 0. Each step must have the following fields, all of which are required.
    :type sequence: (optional) list[ask_sdk_model.services.gadget_controller.animation_step.AnimationStep]

    """
    deserialized_types = {
        'repeat': 'int',
        'target_lights': 'list[str]',
        'sequence': 'list[ask_sdk_model.services.gadget_controller.animation_step.AnimationStep]'
    }  # type: Dict

    attribute_map = {
        'repeat': 'repeat',
        'target_lights': 'targetLights',
        'sequence': 'sequence'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, repeat=None, target_lights=None, sequence=None):
        # type: (Optional[int], Optional[List[object]], Optional[List[AnimationStep]]) -> None
        """

        :param repeat: The number of times to play this animation. 
        :type repeat: (optional) int
        :param target_lights: An array of strings that represent the light addresses on the target gadgets that this animation will be applied to. Because the Echo Button has one light only, use [\&quot;1\&quot;] to signify that this animation should be sent to light one.
        :type target_lights: (optional) list[str]
        :param sequence: The animation steps to render in order. The maximum number of steps that you can define is 38. The minimum is 0. Each step must have the following fields, all of which are required.
        :type sequence: (optional) list[ask_sdk_model.services.gadget_controller.animation_step.AnimationStep]
        """
        self.__discriminator_value = None  # type: str

        self.repeat = repeat
        self.target_lights = target_lights
        self.sequence = sequence

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
        if not isinstance(other, LightAnimation):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
