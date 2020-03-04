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
from ask_sdk_model.interfaces.connections.requests.base_request import BaseRequest


if typing.TYPE_CHECKING:
    from typing import Dict, List, Optional, Union
    from datetime import datetime
    from ask_sdk_model.interfaces.connections.entities.restaurant import Restaurant


class ScheduleFoodEstablishmentReservationRequest(BaseRequest):
    """
    ScheduleFoodEstablishmentReservationRequest for booking restaurant reservation


    :param version: version of the request
    :type version: (optional) str
    :param start_time: start time of the reservation
    :type start_time: (optional) str
    :param party_size: party size
    :type party_size: (optional) str
    :param restaurant: restaurant
    :type restaurant: (optional) ask_sdk_model.interfaces.connections.entities.restaurant.Restaurant

    """
    deserialized_types = {
        'object_type': 'str',
        'version': 'str',
        'start_time': 'str',
        'party_size': 'str',
        'restaurant': 'ask_sdk_model.interfaces.connections.entities.restaurant.Restaurant'
    }  # type: Dict

    attribute_map = {
        'object_type': '@type',
        'version': '@version',
        'start_time': 'startTime',
        'party_size': 'partySize',
        'restaurant': 'restaurant'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, version=None, start_time=None, party_size=None, restaurant=None):
        # type: (Optional[str], Optional[str], Optional[str], Optional[Restaurant]) -> None
        """ScheduleFoodEstablishmentReservationRequest for booking restaurant reservation

        :param version: version of the request
        :type version: (optional) str
        :param start_time: start time of the reservation
        :type start_time: (optional) str
        :param party_size: party size
        :type party_size: (optional) str
        :param restaurant: restaurant
        :type restaurant: (optional) ask_sdk_model.interfaces.connections.entities.restaurant.Restaurant
        """
        self.__discriminator_value = "ScheduleFoodEstablishmentReservationRequest"  # type: str

        self.object_type = self.__discriminator_value
        super(ScheduleFoodEstablishmentReservationRequest, self).__init__(object_type=self.__discriminator_value, version=version)
        self.start_time = start_time
        self.party_size = party_size
        self.restaurant = restaurant

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
        if not isinstance(other, ScheduleFoodEstablishmentReservationRequest):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
