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
    from ask_sdk_model.scope import Scope


class Permissions(object):
    """
    Contains a consentToken allowing the skill access to information that the customer has consented to provide, such as address information. Note that the consentToken is deprecated. Use the apiAccessToken available in the context object to determine the user’s permissions.


    :param consent_token: A token listing all the permissions granted for this user.
    :type consent_token: (optional) str
    :param scopes: A map where the key is a LoginWithAmazon(LWA) scope and value is a list of key:value pairs which describe the state of user actions on the LWA scope. For e.g. \&quot;scopes\&quot; :{ \&quot;alexa::devices:all:geolocation:read\&quot;:{\&quot;status\&quot;:\&quot;GRANTED\&quot;}} This value of \&quot;alexa::devices:all:geolocation:read\&quot; will determine if the Geolocation data access is granted by the user, or else it will show a card of type AskForPermissionsConsent to the user to get this permission.
    :type scopes: (optional) dict(str, ask_sdk_model.scope.Scope)

    """
    deserialized_types = {
        'consent_token': 'str',
        'scopes': 'dict(str, ask_sdk_model.scope.Scope)'
    }  # type: Dict

    attribute_map = {
        'consent_token': 'consentToken',
        'scopes': 'scopes'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, consent_token=None, scopes=None):
        # type: (Optional[str], Optional[Dict[str, Scope]]) -> None
        """Contains a consentToken allowing the skill access to information that the customer has consented to provide, such as address information. Note that the consentToken is deprecated. Use the apiAccessToken available in the context object to determine the user’s permissions.

        :param consent_token: A token listing all the permissions granted for this user.
        :type consent_token: (optional) str
        :param scopes: A map where the key is a LoginWithAmazon(LWA) scope and value is a list of key:value pairs which describe the state of user actions on the LWA scope. For e.g. \&quot;scopes\&quot; :{ \&quot;alexa::devices:all:geolocation:read\&quot;:{\&quot;status\&quot;:\&quot;GRANTED\&quot;}} This value of \&quot;alexa::devices:all:geolocation:read\&quot; will determine if the Geolocation data access is granted by the user, or else it will show a card of type AskForPermissionsConsent to the user to get this permission.
        :type scopes: (optional) dict(str, ask_sdk_model.scope.Scope)
        """
        self.__discriminator_value = None  # type: str

        self.consent_token = consent_token
        self.scopes = scopes

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
        if not isinstance(other, Permissions):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
