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
    from ask_sdk_model.interfaces.viewport.shape import Shape
    from ask_sdk_model.interfaces.viewport.presentation_type import PresentationType
    from ask_sdk_model.interfaces.viewport.apl.viewport_configuration import ViewportConfiguration


class APLViewportState(TypedViewportState):
    """
    This object contains the characteristics related to the APL device&#39;s viewport.


    :param id: unique identifier of a viewport object
    :type id: (optional) str
    :param shape: 
    :type shape: (optional) ask_sdk_model.interfaces.viewport.shape.Shape
    :param dpi: The pixel density of the viewport.
    :type dpi: (optional) float
    :param presentation_type: 
    :type presentation_type: (optional) ask_sdk_model.interfaces.viewport.presentation_type.PresentationType
    :param can_rotate: Indicates if the viewport can be rotated through 90 degrees.
    :type can_rotate: (optional) bool
    :param configuration: 
    :type configuration: (optional) ask_sdk_model.interfaces.viewport.apl.viewport_configuration.ViewportConfiguration

    """
    deserialized_types = {
        'id': 'str',
        'object_type': 'str',
        'shape': 'ask_sdk_model.interfaces.viewport.shape.Shape',
        'dpi': 'float',
        'presentation_type': 'ask_sdk_model.interfaces.viewport.presentation_type.PresentationType',
        'can_rotate': 'bool',
        'configuration': 'ask_sdk_model.interfaces.viewport.apl.viewport_configuration.ViewportConfiguration'
    }  # type: Dict

    attribute_map = {
        'id': 'id',
        'object_type': 'type',
        'shape': 'shape',
        'dpi': 'dpi',
        'presentation_type': 'presentationType',
        'can_rotate': 'canRotate',
        'configuration': 'configuration'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, id=None, shape=None, dpi=None, presentation_type=None, can_rotate=None, configuration=None):
        # type: (Optional[str], Optional[Shape], Optional[float], Optional[PresentationType], Optional[bool], Optional[ViewportConfiguration]) -> None
        """This object contains the characteristics related to the APL device&#39;s viewport.

        :param id: unique identifier of a viewport object
        :type id: (optional) str
        :param shape: 
        :type shape: (optional) ask_sdk_model.interfaces.viewport.shape.Shape
        :param dpi: The pixel density of the viewport.
        :type dpi: (optional) float
        :param presentation_type: 
        :type presentation_type: (optional) ask_sdk_model.interfaces.viewport.presentation_type.PresentationType
        :param can_rotate: Indicates if the viewport can be rotated through 90 degrees.
        :type can_rotate: (optional) bool
        :param configuration: 
        :type configuration: (optional) ask_sdk_model.interfaces.viewport.apl.viewport_configuration.ViewportConfiguration
        """
        self.__discriminator_value = "APL"  # type: str

        self.object_type = self.__discriminator_value
        super(APLViewportState, self).__init__(id=id, object_type=self.__discriminator_value)
        self.shape = shape
        self.dpi = dpi
        self.presentation_type = presentation_type
        self.can_rotate = can_rotate
        self.configuration = configuration

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
        if not isinstance(other, APLViewportState):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
