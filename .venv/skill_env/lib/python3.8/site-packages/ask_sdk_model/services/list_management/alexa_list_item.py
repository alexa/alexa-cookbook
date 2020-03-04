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
    from ask_sdk_model.services.list_management.list_item_state import ListItemState


class AlexaListItem(object):
    """

    :param id: 
    :type id: (optional) str
    :param version: 
    :type version: (optional) int
    :param value: 
    :type value: (optional) str
    :param status: 
    :type status: (optional) ask_sdk_model.services.list_management.list_item_state.ListItemState
    :param created_time: 
    :type created_time: (optional) str
    :param updated_time: 
    :type updated_time: (optional) str
    :param href: URL to retrieve the item from.
    :type href: (optional) str

    """
    deserialized_types = {
        'id': 'str',
        'version': 'int',
        'value': 'str',
        'status': 'ask_sdk_model.services.list_management.list_item_state.ListItemState',
        'created_time': 'str',
        'updated_time': 'str',
        'href': 'str'
    }  # type: Dict

    attribute_map = {
        'id': 'id',
        'version': 'version',
        'value': 'value',
        'status': 'status',
        'created_time': 'createdTime',
        'updated_time': 'updatedTime',
        'href': 'href'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, id=None, version=None, value=None, status=None, created_time=None, updated_time=None, href=None):
        # type: (Optional[str], Optional[int], Optional[str], Optional[ListItemState], Optional[str], Optional[str], Optional[str]) -> None
        """

        :param id: 
        :type id: (optional) str
        :param version: 
        :type version: (optional) int
        :param value: 
        :type value: (optional) str
        :param status: 
        :type status: (optional) ask_sdk_model.services.list_management.list_item_state.ListItemState
        :param created_time: 
        :type created_time: (optional) str
        :param updated_time: 
        :type updated_time: (optional) str
        :param href: URL to retrieve the item from.
        :type href: (optional) str
        """
        self.__discriminator_value = None  # type: str

        self.id = id
        self.version = version
        self.value = value
        self.status = status
        self.created_time = created_time
        self.updated_time = updated_time
        self.href = href

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
        if not isinstance(other, AlexaListItem):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
