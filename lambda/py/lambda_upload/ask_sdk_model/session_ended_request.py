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
from ask_sdk_model.request import Request


if typing.TYPE_CHECKING:
    from typing import Dict, List, Optional, Union
    from datetime import datetime
    from ask_sdk_model.session_ended_error import SessionEndedError
    from ask_sdk_model.session_ended_reason import SessionEndedReason


class SessionEndedRequest(Request):
    """
    A SessionEndedRequest is an object that represents a request made to an Alexa skill to notify that a session was ended. Your service receives a SessionEndedRequest when a currently open session is closed for one of the following reasons: &lt;ol&gt;&lt;li&gt;The user says “exit”&lt;/li&gt;&lt;li&gt;the user does not respond or says something that does not match an intent defined in your voice interface while the device is listening for the user’s response&lt;/li&gt;&lt;li&gt;an error occurs&lt;/li&gt;&lt;/ol&gt;


    :param request_id: Represents the unique identifier for the specific request.
    :type request_id: (optional) str
    :param timestamp: Provides the date and time when Alexa sent the request as an ISO 8601 formatted string. Used to verify the request when hosting your skill as a web service.
    :type timestamp: (optional) datetime
    :param locale: A string indicating the user’s locale. For example: en-US. This value is only provided with certain request types.
    :type locale: (optional) str
    :param reason: Describes why the session ended.
    :type reason: (optional) ask_sdk_model.session_ended_reason.SessionEndedReason
    :param error: An error object providing more information about the error that occurred.
    :type error: (optional) ask_sdk_model.session_ended_error.SessionEndedError

    """
    deserialized_types = {
        'object_type': 'str',
        'request_id': 'str',
        'timestamp': 'datetime',
        'locale': 'str',
        'reason': 'ask_sdk_model.session_ended_reason.SessionEndedReason',
        'error': 'ask_sdk_model.session_ended_error.SessionEndedError'
    }  # type: Dict

    attribute_map = {
        'object_type': 'type',
        'request_id': 'requestId',
        'timestamp': 'timestamp',
        'locale': 'locale',
        'reason': 'reason',
        'error': 'error'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, request_id=None, timestamp=None, locale=None, reason=None, error=None):
        # type: (Optional[str], Optional[datetime], Optional[str], Optional[SessionEndedReason], Optional[SessionEndedError]) -> None
        """A SessionEndedRequest is an object that represents a request made to an Alexa skill to notify that a session was ended. Your service receives a SessionEndedRequest when a currently open session is closed for one of the following reasons: &lt;ol&gt;&lt;li&gt;The user says “exit”&lt;/li&gt;&lt;li&gt;the user does not respond or says something that does not match an intent defined in your voice interface while the device is listening for the user’s response&lt;/li&gt;&lt;li&gt;an error occurs&lt;/li&gt;&lt;/ol&gt;

        :param request_id: Represents the unique identifier for the specific request.
        :type request_id: (optional) str
        :param timestamp: Provides the date and time when Alexa sent the request as an ISO 8601 formatted string. Used to verify the request when hosting your skill as a web service.
        :type timestamp: (optional) datetime
        :param locale: A string indicating the user’s locale. For example: en-US. This value is only provided with certain request types.
        :type locale: (optional) str
        :param reason: Describes why the session ended.
        :type reason: (optional) ask_sdk_model.session_ended_reason.SessionEndedReason
        :param error: An error object providing more information about the error that occurred.
        :type error: (optional) ask_sdk_model.session_ended_error.SessionEndedError
        """
        self.__discriminator_value = "SessionEndedRequest"  # type: str

        self.object_type = self.__discriminator_value
        super(SessionEndedRequest, self).__init__(object_type=self.__discriminator_value, request_id=request_id, timestamp=timestamp, locale=locale)
        self.reason = reason
        self.error = error

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
        if not isinstance(other, SessionEndedRequest):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
