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


class AccessTokenRequest(object):
    """Request for retrieving an access token from LWA.

    :param client_id: The ClientId value from developer console
    :type client_id: str
    :param client_secret: The ClientSecret value from developer console
    :type client_secret: str
    :param scope: The required scope for which the access token is
        requested for
    :type scope: str
    :param refresh_token: Client refresh_token required to get access token for API calls.
    :type refresh_token: str
    """
    deserialized_types = {
        'client_id': 'str',
        'client_secret': 'str',
        'refresh_token': 'str',
        'scope': 'str'
    }

    attribute_map = {
        'client_id': 'client_id',
        'client_secret': 'client_secret',
        'refresh_token': 'refresh_token',
        'scope': 'scope'
    }

    def __init__(self, client_id=None, client_secret=None, scope=None, refresh_token=None):
        # type: (Optional[str], Optional[str], Optional[str], Optional[str]) -> None
        """Request for retrieving an access token from LWA.

        :param client_id: The ClientId value from developer console
        :type client_id: str
        :param client_secret: The ClientSecret value from developer console
        :type client_secret: str
        :param scope: The required scope for which the access token is
            requested for
        :type scope: str
        :param refresh_token: Client refresh_token required to get access token for API calls.
        :type refresh_token: str
        """
        self.__discriminator_value = None

        self.client_id = client_id
        self.client_secret = client_secret
        self.scope = scope
        self.refresh_token = refresh_token

    def to_dict(self):
        # type: () -> Dict
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
        if not isinstance(other, AccessTokenRequest):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
