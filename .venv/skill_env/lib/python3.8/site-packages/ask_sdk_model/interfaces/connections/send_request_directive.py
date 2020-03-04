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
from ask_sdk_model.directive import Directive


if typing.TYPE_CHECKING:
    from typing import Dict, List, Optional, Union
    from datetime import datetime


class SendRequestDirective(Directive):
    """
    This is the directive that a skill can send as part of their response to a session based request to execute a predefined Connections. This will also return a result to the referring skill. (No Guarantee response will be returned)


    :param name: This defines the name of the Connection skill is trying to execute. It must be a valid and supported Connection name.
    :type name: (optional) str
    :param payload: This is an object sent between the two skills for processing a ConnectionsRequest or ConnectionsResponse. The contract for the object is based on the schema of the Action used in the SendRequestDirective. Invalid payloads will result in errors sent back to the referrer.
    :type payload: (optional) dict(str, object)
    :param token: This is an echo back string that skills send when during Connections.SendRequest directive. They will receive it when they get the ConnectionsResponse. It is never sent to the skill handling the request.
    :type token: (optional) str

    """
    deserialized_types = {
        'object_type': 'str',
        'name': 'str',
        'payload': 'dict(str, object)',
        'token': 'str'
    }  # type: Dict

    attribute_map = {
        'object_type': 'type',
        'name': 'name',
        'payload': 'payload',
        'token': 'token'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, name=None, payload=None, token=None):
        # type: (Optional[str], Optional[Dict[str, object]], Optional[str]) -> None
        """This is the directive that a skill can send as part of their response to a session based request to execute a predefined Connections. This will also return a result to the referring skill. (No Guarantee response will be returned)

        :param name: This defines the name of the Connection skill is trying to execute. It must be a valid and supported Connection name.
        :type name: (optional) str
        :param payload: This is an object sent between the two skills for processing a ConnectionsRequest or ConnectionsResponse. The contract for the object is based on the schema of the Action used in the SendRequestDirective. Invalid payloads will result in errors sent back to the referrer.
        :type payload: (optional) dict(str, object)
        :param token: This is an echo back string that skills send when during Connections.SendRequest directive. They will receive it when they get the ConnectionsResponse. It is never sent to the skill handling the request.
        :type token: (optional) str
        """
        self.__discriminator_value = "Connections.SendRequest"  # type: str

        self.object_type = self.__discriminator_value
        super(SendRequestDirective, self).__init__(object_type=self.__discriminator_value)
        self.name = name
        self.payload = payload
        self.token = token

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
        if not isinstance(other, SendRequestDirective):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
