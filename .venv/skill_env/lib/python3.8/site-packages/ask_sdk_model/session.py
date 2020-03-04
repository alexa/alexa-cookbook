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
    from ask_sdk_model.application import Application
    from ask_sdk_model.user import User


class Session(object):
    """
    Represents a single execution of the alexa service


    :param new: A boolean value indicating whether this is a new session. Returns true for a new session or false for an existing session.
    :type new: (optional) bool
    :param session_id: A string that represents a unique identifier per a user’s active session.
    :type session_id: (optional) str
    :param user: An object that describes the user making the request.
    :type user: (optional) ask_sdk_model.user.User
    :param attributes: A map of key-value pairs. The attributes map is empty for requests where a new session has started with the property new set to true. When returning your response, you can include data you need to persist during the session in the sessionAttributes property. The attributes you provide are then passed back to your skill on the next request.
    :type attributes: (optional) dict(str, object)
    :param application: 
    :type application: (optional) ask_sdk_model.application.Application

    """
    deserialized_types = {
        'new': 'bool',
        'session_id': 'str',
        'user': 'ask_sdk_model.user.User',
        'attributes': 'dict(str, object)',
        'application': 'ask_sdk_model.application.Application'
    }  # type: Dict

    attribute_map = {
        'new': 'new',
        'session_id': 'sessionId',
        'user': 'user',
        'attributes': 'attributes',
        'application': 'application'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, new=None, session_id=None, user=None, attributes=None, application=None):
        # type: (Optional[bool], Optional[str], Optional[User], Optional[Dict[str, object]], Optional[Application]) -> None
        """Represents a single execution of the alexa service

        :param new: A boolean value indicating whether this is a new session. Returns true for a new session or false for an existing session.
        :type new: (optional) bool
        :param session_id: A string that represents a unique identifier per a user’s active session.
        :type session_id: (optional) str
        :param user: An object that describes the user making the request.
        :type user: (optional) ask_sdk_model.user.User
        :param attributes: A map of key-value pairs. The attributes map is empty for requests where a new session has started with the property new set to true. When returning your response, you can include data you need to persist during the session in the sessionAttributes property. The attributes you provide are then passed back to your skill on the next request.
        :type attributes: (optional) dict(str, object)
        :param application: 
        :type application: (optional) ask_sdk_model.application.Application
        """
        self.__discriminator_value = None  # type: str

        self.new = new
        self.session_id = session_id
        self.user = user
        self.attributes = attributes
        self.application = application

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
        if not isinstance(other, Session):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
