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


class CanFulfillIntentValues(Enum):
    """
    Overall if skill can understand and fulfill the intent with detected slots. Respond YES when skill understands all slots, can fulfill all slots, and can fulfill the request in its entirety. Respond NO when skill either cannot understand the intent, cannot understand all the slots, or cannot fulfill all the slots. Respond MAYBE when skill can understand the intent, can partially or fully understand the slots, and can partially or fully fulfill the slots. The only cases where should respond MAYBE is when skill partially understand the request and can potentially complete the request if skill get more data, either through callbacks or through a multi-turn conversation with the user.



    Allowed enum values: [YES, NO, MAYBE]
    """
    YES = "YES"
    NO = "NO"
    MAYBE = "MAYBE"

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
        if not isinstance(other, CanFulfillIntentValues):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
