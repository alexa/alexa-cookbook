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


class CanFulfillSlotValues(Enum):
    """
    This field indicates whether skill can fulfill relevant action for the slot, that has been partially or fully understood. The definition of fulfilling the slot is dependent on skill and skill is required to have logic in place to determine whether a slot value can be fulfilled in the context of skill or not. Return YES if Skill can certainly fulfill the relevant action for this slot value. Return NO if skill cannot fulfill the relevant action for this slot value. For specific recommendations to set the value refer to the developer docs for more details.



    Allowed enum values: [YES, NO]
    """
    YES = "YES"
    NO = "NO"

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
        if not isinstance(other, CanFulfillSlotValues):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
