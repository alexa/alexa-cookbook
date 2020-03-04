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


class ComponentVisibleOnScreenPagerTag(object):
    """
    A collection of items that are displayed one at a time.


    :param index: The index of the current page.
    :type index: (optional) int
    :param page_count: The total number of pages.
    :type page_count: (optional) int
    :param allow_forward: Indicates whether the pager will accept a forward command.
    :type allow_forward: (optional) bool
    :param allow_backwards: Indicates whether the pager will accept a backward command.
    :type allow_backwards: (optional) bool

    """
    deserialized_types = {
        'index': 'int',
        'page_count': 'int',
        'allow_forward': 'bool',
        'allow_backwards': 'bool'
    }  # type: Dict

    attribute_map = {
        'index': 'index',
        'page_count': 'pageCount',
        'allow_forward': 'allowForward',
        'allow_backwards': 'allowBackwards'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, index=None, page_count=None, allow_forward=None, allow_backwards=None):
        # type: (Optional[int], Optional[int], Optional[bool], Optional[bool]) -> None
        """A collection of items that are displayed one at a time.

        :param index: The index of the current page.
        :type index: (optional) int
        :param page_count: The total number of pages.
        :type page_count: (optional) int
        :param allow_forward: Indicates whether the pager will accept a forward command.
        :type allow_forward: (optional) bool
        :param allow_backwards: Indicates whether the pager will accept a backward command.
        :type allow_backwards: (optional) bool
        """
        self.__discriminator_value = None  # type: str

        self.index = index
        self.page_count = page_count
        self.allow_forward = allow_forward
        self.allow_backwards = allow_backwards

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
        if not isinstance(other, ComponentVisibleOnScreenPagerTag):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
