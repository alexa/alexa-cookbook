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
    from ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen import ComponentVisibleOnScreen
    from ask_sdk_model.interfaces.alexa.presentation.apl.component_entity import ComponentEntity
    from ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen_tags import ComponentVisibleOnScreenTags


class ComponentVisibleOnScreen(object):
    """
    Definition of a visible APL element shown on screen.


    :param children: All child elements of the displayed element.
    :type children: (optional) list[ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen.ComponentVisibleOnScreen]
    :param entities: The entities which were attached to the element.
    :type entities: (optional) list[ask_sdk_model.interfaces.alexa.presentation.apl.component_entity.ComponentEntity]
    :param id: The id of the element.
    :type id: (optional) str
    :param position: Global position of the element (as seen by the device user).
    :type position: (optional) str
    :param tags: The tags which were attached to the element.
    :type tags: (optional) ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen_tags.ComponentVisibleOnScreenTags
    :param transform: The transform which was applied to the element&#39;s position, specified as a 6-element numeric array containing the 2D homogeneous transformation matrix. The center of the transformation coordinate system is the center of the component. The transformation array is ordered as [A,B,C,D,Tx,Ty]. For more information refer to the W3C&#39;s CSS transforms documentation. 
    :type transform: (optional) list[float]
    :param object_type: The visual appearance of the element.
    :type object_type: (optional) str
    :param uid: The system-generated uid of the element.
    :type uid: (optional) str
    :param visibility: The relative visibility of the element. 0 &#x3D; not visible, 1 &#x3D; fully visible on screen.
    :type visibility: (optional) float

    """
    deserialized_types = {
        'children': 'list[ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen.ComponentVisibleOnScreen]',
        'entities': 'list[ask_sdk_model.interfaces.alexa.presentation.apl.component_entity.ComponentEntity]',
        'id': 'str',
        'position': 'str',
        'tags': 'ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen_tags.ComponentVisibleOnScreenTags',
        'transform': 'list[float]',
        'object_type': 'str',
        'uid': 'str',
        'visibility': 'float'
    }  # type: Dict

    attribute_map = {
        'children': 'children',
        'entities': 'entities',
        'id': 'id',
        'position': 'position',
        'tags': 'tags',
        'transform': 'transform',
        'object_type': 'type',
        'uid': 'uid',
        'visibility': 'visibility'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, children=None, entities=None, id=None, position=None, tags=None, transform=None, object_type=None, uid=None, visibility=None):
        # type: (Optional[List[ComponentVisibleOnScreen]], Optional[List[ComponentEntity]], Optional[str], Optional[str], Optional[ComponentVisibleOnScreenTags], Optional[List[object]], Optional[str], Optional[str], Optional[float]) -> None
        """Definition of a visible APL element shown on screen.

        :param children: All child elements of the displayed element.
        :type children: (optional) list[ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen.ComponentVisibleOnScreen]
        :param entities: The entities which were attached to the element.
        :type entities: (optional) list[ask_sdk_model.interfaces.alexa.presentation.apl.component_entity.ComponentEntity]
        :param id: The id of the element.
        :type id: (optional) str
        :param position: Global position of the element (as seen by the device user).
        :type position: (optional) str
        :param tags: The tags which were attached to the element.
        :type tags: (optional) ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen_tags.ComponentVisibleOnScreenTags
        :param transform: The transform which was applied to the element&#39;s position, specified as a 6-element numeric array containing the 2D homogeneous transformation matrix. The center of the transformation coordinate system is the center of the component. The transformation array is ordered as [A,B,C,D,Tx,Ty]. For more information refer to the W3C&#39;s CSS transforms documentation. 
        :type transform: (optional) list[float]
        :param object_type: The visual appearance of the element.
        :type object_type: (optional) str
        :param uid: The system-generated uid of the element.
        :type uid: (optional) str
        :param visibility: The relative visibility of the element. 0 &#x3D; not visible, 1 &#x3D; fully visible on screen.
        :type visibility: (optional) float
        """
        self.__discriminator_value = None  # type: str

        self.children = children
        self.entities = entities
        self.id = id
        self.position = position
        self.tags = tags
        self.transform = transform
        self.object_type = object_type
        self.uid = uid
        self.visibility = visibility

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
        if not isinstance(other, ComponentVisibleOnScreen):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
