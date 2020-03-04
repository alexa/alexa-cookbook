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


class ComponentVisibleOnScreenListTag(object):
    """
    An ordered list of items


    :param item_count: The total number of items in the list.
    :type item_count: (optional) int
    :param lowest_index_seen: The index of the lowest item seen.
    :type lowest_index_seen: (optional) int
    :param highest_index_seen: The index of the highest item seen.
    :type highest_index_seen: (optional) int
    :param lowest_ordinal_seen: The ordinal of the lowest ordinal-equipped item seen.
    :type lowest_ordinal_seen: (optional) int
    :param highest_ordinal_seen: The ordinal of the highest ordinal-equipped item seen.
    :type highest_ordinal_seen: (optional) int

    """
    deserialized_types = {
        'item_count': 'int',
        'lowest_index_seen': 'int',
        'highest_index_seen': 'int',
        'lowest_ordinal_seen': 'int',
        'highest_ordinal_seen': 'int'
    }  # type: Dict

    attribute_map = {
        'item_count': 'itemCount',
        'lowest_index_seen': 'lowestIndexSeen',
        'highest_index_seen': 'highestIndexSeen',
        'lowest_ordinal_seen': 'lowestOrdinalSeen',
        'highest_ordinal_seen': 'highestOrdinalSeen'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, item_count=None, lowest_index_seen=None, highest_index_seen=None, lowest_ordinal_seen=None, highest_ordinal_seen=None):
        # type: (Optional[int], Optional[int], Optional[int], Optional[int], Optional[int]) -> None
        """An ordered list of items

        :param item_count: The total number of items in the list.
        :type item_count: (optional) int
        :param lowest_index_seen: The index of the lowest item seen.
        :type lowest_index_seen: (optional) int
        :param highest_index_seen: The index of the highest item seen.
        :type highest_index_seen: (optional) int
        :param lowest_ordinal_seen: The ordinal of the lowest ordinal-equipped item seen.
        :type lowest_ordinal_seen: (optional) int
        :param highest_ordinal_seen: The ordinal of the highest ordinal-equipped item seen.
        :type highest_ordinal_seen: (optional) int
        """
        self.__discriminator_value = None  # type: str

        self.item_count = item_count
        self.lowest_index_seen = lowest_index_seen
        self.highest_index_seen = highest_index_seen
        self.lowest_ordinal_seen = lowest_ordinal_seen
        self.highest_ordinal_seen = highest_ordinal_seen

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
        if not isinstance(other, ComponentVisibleOnScreenListTag):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
