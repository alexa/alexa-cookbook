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


class CanUnderstandSlotValues(Enum):
    """
    This field indicates whether skill has understood the slot value. In most typical cases, skills will do some form of entity resolution by looking up a catalog or list to determine whether they recognize the slot or not. Return YES if skill have a perfect match or high confidence match (for eg. synonyms) with catalog or list maintained by skill. Return NO if skill cannot understand or recognize the slot value. Return MAYBE if skill have partial confidence or partial match. This will be true when the slot value doesn’t exist as is, in the catalog, but a variation or a fuzzy match may exist. For specific recommendations to set the value refer to the developer docs for more details.



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
        if not isinstance(other, CanUnderstandSlotValues):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
