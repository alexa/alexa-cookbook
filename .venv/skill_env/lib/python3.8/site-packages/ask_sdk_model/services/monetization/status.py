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


class Status(Enum):
    """
    Transaction status for in skill product purchases. * &#39;PENDING_APPROVAL_BY_PARENT&#39; - The transaction is pending approval from parent. * &#39;APPROVED_BY_PARENT&#39; - The transaction was approved by parent and fulfilled successfully.. * &#39;DENIED_BY_PARENT&#39; - The transaction was declined by parent and hence not fulfilled. * &#39;EXPIRED_NO_ACTION_BY_PARENT&#39; - The transaction was expired due to no response from parent and hence not fulfilled. * &#39;ERROR&#39; - The transaction was not fullfiled as there was an error while processing the transaction.



    Allowed enum values: [PENDING_APPROVAL_BY_PARENT, APPROVED_BY_PARENT, DENIED_BY_PARENT, EXPIRED_NO_ACTION_BY_PARENT, ERROR]
    """
    PENDING_APPROVAL_BY_PARENT = "PENDING_APPROVAL_BY_PARENT"
    APPROVED_BY_PARENT = "APPROVED_BY_PARENT"
    DENIED_BY_PARENT = "DENIED_BY_PARENT"
    EXPIRED_NO_ACTION_BY_PARENT = "EXPIRED_NO_ACTION_BY_PARENT"
    ERROR = "ERROR"

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
        if not isinstance(other, Status):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
