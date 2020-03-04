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


class ErrorCode(Enum):
    """
    A more precise error code. Some of these codes may not apply to some APIs. - INVALID_KEY: the setting key is not supported - INVALID_VALUE: the setting value is not valid - INVALID_TOKEN: the token is invalid - INVALID_URI: the uri is invalid - DEVICE_UNREACHABLE: the device is offline - UNKNOWN_ERROR: internal service error



    Allowed enum values: [INVALID_KEY, INVALID_VALUE, INVALID_TOKEN, INVALID_URI, DEVICE_UNREACHABLE, UNKNOWN_ERROR]
    """
    INVALID_KEY = "INVALID_KEY"
    INVALID_VALUE = "INVALID_VALUE"
    INVALID_TOKEN = "INVALID_TOKEN"
    INVALID_URI = "INVALID_URI"
    DEVICE_UNREACHABLE = "DEVICE_UNREACHABLE"
    UNKNOWN_ERROR = "UNKNOWN_ERROR"

    def to_dict(self):
        # type: () -> Dict[str, object]
        """Returns the model properties as a dict"""
        result = {self.name: self.value}
        return result

    def to_str(self):
        # type: () -> str
        """Returns the string representation of the model"""
        return pprint.pformat(self.value)

    def __repr__(self):
        # type: () -> str
        """For `print` and `pprint`"""
        return self.to_str()

    def __eq__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are equal"""
        if not isinstance(other, ErrorCode):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
