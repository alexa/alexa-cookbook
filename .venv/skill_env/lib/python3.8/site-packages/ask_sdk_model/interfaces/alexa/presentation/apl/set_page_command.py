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
from ask_sdk_model.interfaces.alexa.presentation.apl.command import Command


if typing.TYPE_CHECKING:
    from typing import Dict, List, Optional, Union
    from datetime import datetime
    from ask_sdk_model.interfaces.alexa.presentation.apl.position import Position


class SetPageCommand(Command):
    """
    Change the page displayed in a Pager component. The SetPage command finishes when the item is fully in view.


    :param delay: The delay in milliseconds before this command starts executing; must be non-negative. Defaults to 0.
    :type delay: (optional) int
    :param description: A user-provided description of this command.
    :type description: (optional) str
    :param when: If false, the execution of the command is skipped. Defaults to true.
    :type when: (optional) bool
    :param component_id: The id of the Pager component.
    :type component_id: (optional) str
    :param position: 
    :type position: (optional) ask_sdk_model.interfaces.alexa.presentation.apl.position.Position
    :param value: The distance to move. May be an absolute value or a relative value.
    :type value: (optional) int

    """
    deserialized_types = {
        'object_type': 'str',
        'delay': 'int',
        'description': 'str',
        'when': 'bool',
        'component_id': 'str',
        'position': 'ask_sdk_model.interfaces.alexa.presentation.apl.position.Position',
        'value': 'int'
    }  # type: Dict

    attribute_map = {
        'object_type': 'type',
        'delay': 'delay',
        'description': 'description',
        'when': 'when',
        'component_id': 'componentId',
        'position': 'position',
        'value': 'value'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, delay=None, description=None, when=None, component_id=None, position=None, value=None):
        # type: (Union[int, str, None], Optional[str], Optional[bool], Optional[str], Optional[Position], Union[int, str, None]) -> None
        """Change the page displayed in a Pager component. The SetPage command finishes when the item is fully in view.

        :param delay: The delay in milliseconds before this command starts executing; must be non-negative. Defaults to 0.
        :type delay: (optional) int
        :param description: A user-provided description of this command.
        :type description: (optional) str
        :param when: If false, the execution of the command is skipped. Defaults to true.
        :type when: (optional) bool
        :param component_id: The id of the Pager component.
        :type component_id: (optional) str
        :param position: 
        :type position: (optional) ask_sdk_model.interfaces.alexa.presentation.apl.position.Position
        :param value: The distance to move. May be an absolute value or a relative value.
        :type value: (optional) int
        """
        self.__discriminator_value = "SetPage"  # type: str

        self.object_type = self.__discriminator_value
        super(SetPageCommand, self).__init__(object_type=self.__discriminator_value, delay=delay, description=description, when=when)
        self.component_id = component_id
        self.position = position
        self.value = value

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
        if not isinstance(other, SetPageCommand):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
