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
from abc import ABCMeta, abstractmethod


if typing.TYPE_CHECKING:
    from typing import Dict, List, Optional, Union
    from datetime import datetime


class AnimatedProperty(object):
    """

    :param object_property: The name of the property to animate
    :type object_property: (optional) str

    .. note::

        This is an abstract class. Use the following mapping, to figure out
        the model class to be instantiated, that sets ``property`` variable.

        | opacity: :py:class:`ask_sdk_model.interfaces.alexa.presentation.apl.animated_opacity_property.AnimatedOpacityProperty`,
        |
        | transform: :py:class:`ask_sdk_model.interfaces.alexa.presentation.apl.animated_transform_property.AnimatedTransformProperty`

    """
    deserialized_types = {
        'object_property': 'str'
    }  # type: Dict

    attribute_map = {
        'object_property': 'property'
    }  # type: Dict
    supports_multiple_types = False

    discriminator_value_class_map = {
        'opacity': 'ask_sdk_model.interfaces.alexa.presentation.apl.animated_opacity_property.AnimatedOpacityProperty',
        'transform': 'ask_sdk_model.interfaces.alexa.presentation.apl.animated_transform_property.AnimatedTransformProperty'
    }

    json_discriminator_key = "property"

    __metaclass__ = ABCMeta

    @abstractmethod
    def __init__(self, object_property=None):
        # type: (Optional[str]) -> None
        """

        :param object_property: The name of the property to animate
        :type object_property: (optional) str
        """
        self.__discriminator_value = None  # type: str

        self.object_property = object_property

    @classmethod
    def get_real_child_model(cls, data):
        # type: (Dict[str, str]) -> Optional[str]
        """Returns the real base class specified by the discriminator"""
        discriminator_value = data[cls.json_discriminator_key]
        return cls.discriminator_value_class_map.get(discriminator_value)

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
        if not isinstance(other, AnimatedProperty):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
