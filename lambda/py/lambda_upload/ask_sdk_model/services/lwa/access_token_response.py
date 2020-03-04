# -*- coding: utf-8 -*-
#
# Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights
# Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License").
# You may not use this file except in compliance with the License.
# A copy of the License is located at
#
# http://aws.amazon.com/apache2.0/
#
# or in the "license" file accompanying this file. This file is
# distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
# OF ANY KIND, either express or implied. See the License for the
# specific language governing permissions and limitations under the
# License.
#
import pprint
import six
import typing
from enum import Enum


if typing.TYPE_CHECKING:
    from typing import Dict, Optional


class AccessTokenResponse(object):
    """LWA response for retrieving an access token.

    :param access_token: The access token from LWA
    :type access_token: str
    :param expires_in: The duration in seconds of the access token
        lifetime
    :type expires_in: int
    :param scope: The scope specified in the access token request
    :type scope: str
    :param token_type: The type of token issued
    :type token_type: str
    """
    deserialized_types = {
        'access_token': 'str',
        'expires_in': 'int',
        'scope': 'str',
        'token_type': 'str'
    }

    attribute_map = {
        'access_token': 'access_token',
        'expires_in': 'expires_in',
        'scope': 'scope',
        'token_type': 'token_type'
    }

    def __init__(
            self, access_token=None, expires_in=None,
            scope=None, token_type=None):
        # type: (Optional[str], Optional[int], Optional[str], Optional[str]) -> None
        """LWA response for retrieving an access token.

        :param access_token: The access token from LWA
        :type access_token: str
        :param expires_in: The duration in seconds of the access token
            lifetime
        :type expires_in: int
        :param scope: The scope specified in the access token request
        :type scope: str
        :param token_type: The type of token issued
        :type token_type: str
        """
        self.__discriminator_value = None

        self.access_token = access_token
        self.expires_in = expires_in
        self.scope = scope
        self.token_type = token_type

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
        if not isinstance(other, AccessTokenResponse):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
