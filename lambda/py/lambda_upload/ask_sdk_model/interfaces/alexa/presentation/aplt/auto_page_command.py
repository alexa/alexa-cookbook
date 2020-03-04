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
from ask_sdk_model.interfaces.alexa.presentation.aplt.command import Command


if typing.TYPE_CHECKING:
    from typing import Dict, List, Optional, Union
    from datetime import datetime


class AutoPageCommand(Command):
    """
    Automatically progress through a series of pages displayed in a Pager component. The AutoPage command finishes after the last page has been displayed for the requested time period.


    :param delay: The delay in milliseconds before this command starts executing; must be non-negative. Defaults to 0.
    :type delay: (optional) int
    :param description: A user-provided description of this command.
    :type description: (optional) str
    :param screen_lock: If true, disable the Interaction Timer.
    :type screen_lock: (optional) bool
    :param when: A conditional expression to be evaluated in device. If false, the execution of the command is skipped. Defaults to true.
    :type when: (optional) bool
    :param component_id: The id of the Pager component.
    :type component_id: (optional) str
    :param count: Number of pages to display. Defaults to all of them.
    :type count: (optional) int
    :param duration: Time to wait between pages (in milliseconds). Defaults to 0.
    :type duration: (optional) int

    """
    deserialized_types = {
        'object_type': 'str',
        'delay': 'int',
        'description': 'str',
        'screen_lock': 'bool',
        'when': 'bool',
        'component_id': 'str',
        'count': 'int',
        'duration': 'int'
    }  # type: Dict

    attribute_map = {
        'object_type': 'type',
        'delay': 'delay',
        'description': 'description',
        'screen_lock': 'screenLock',
        'when': 'when',
        'component_id': 'componentId',
        'count': 'count',
        'duration': 'duration'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, delay=None, description=None, screen_lock=None, when=None, component_id=None, count=None, duration=None):
        # type: (Optional[int], Optional[str], Optional[bool], Union[bool, str, None], Optional[str], Union[int, str, None], Union[int, str, None]) -> None
        """Automatically progress through a series of pages displayed in a Pager component. The AutoPage command finishes after the last page has been displayed for the requested time period.

        :param delay: The delay in milliseconds before this command starts executing; must be non-negative. Defaults to 0.
        :type delay: (optional) int
        :param description: A user-provided description of this command.
        :type description: (optional) str
        :param screen_lock: If true, disable the Interaction Timer.
        :type screen_lock: (optional) bool
        :param when: A conditional expression to be evaluated in device. If false, the execution of the command is skipped. Defaults to true.
        :type when: (optional) bool
        :param component_id: The id of the Pager component.
        :type component_id: (optional) str
        :param count: Number of pages to display. Defaults to all of them.
        :type count: (optional) int
        :param duration: Time to wait between pages (in milliseconds). Defaults to 0.
        :type duration: (optional) int
        """
        self.__discriminator_value = "AutoPage"  # type: str

        self.object_type = self.__discriminator_value
        super(AutoPageCommand, self).__init__(object_type=self.__discriminator_value, delay=delay, description=description, screen_lock=screen_lock, when=when)
        self.component_id = component_id
        self.count = count
        self.duration = duration

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
        if not isinstance(other, AutoPageCommand):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
