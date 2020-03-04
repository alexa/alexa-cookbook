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
    from ask_sdk_model.interfaces.connections.entities.postal_address import PostalAddress


class ScheduleTaxiReservationRequest(BaseRequest):
    """
    ScheduleTaxiReservationRequest for booking taxi reservation


    :param version: version of the request
    :type version: (optional) str
    :param pickup_time: pickup time
    :type pickup_time: (optional) str
    :param party_size: party size
    :type party_size: (optional) str
    :param pickup_location: pick up location
    :type pickup_location: (optional) ask_sdk_model.interfaces.connections.entities.postal_address.PostalAddress
    :param drop_off_location: drop off location
    :type drop_off_location: (optional) ask_sdk_model.interfaces.connections.entities.postal_address.PostalAddress

    """
    deserialized_types = {
        'object_type': 'str',
        'version': 'str',
        'pickup_time': 'str',
        'party_size': 'str',
        'pickup_location': 'ask_sdk_model.interfaces.connections.entities.postal_address.PostalAddress',
        'drop_off_location': 'ask_sdk_model.interfaces.connections.entities.postal_address.PostalAddress'
    }  # type: Dict

    attribute_map = {
        'object_type': '@type',
        'version': '@version',
        'pickup_time': 'pickupTime',
        'party_size': 'partySize',
        'pickup_location': 'pickupLocation',
        'drop_off_location': 'dropOffLocation'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, version=None, pickup_time=None, party_size=None, pickup_location=None, drop_off_location=None):
        # type: (Optional[str], Optional[str], Optional[str], Optional[PostalAddress], Optional[PostalAddress]) -> None
        """ScheduleTaxiReservationRequest for booking taxi reservation

        :param version: version of the request
        :type version: (optional) str
        :param pickup_time: pickup time
        :type pickup_time: (optional) str
        :param party_size: party size
        :type party_size: (optional) str
        :param pickup_location: pick up location
        :type pickup_location: (optional) ask_sdk_model.interfaces.connections.entities.postal_address.PostalAddress
        :param drop_off_location: drop off location
        :type drop_off_location: (optional) ask_sdk_model.interfaces.connections.entities.postal_address.PostalAddress
        """
        self.__discriminator_value = "ScheduleTaxiReservationRequest"  # type: str

        self.object_type = self.__discriminator_value
        super(ScheduleTaxiReservationRequest, self).__init__(object_type=self.__discriminator_value, version=version)
        self.pickup_time = pickup_time
        self.party_size = party_size
        self.pickup_location = pickup_location
        self.drop_off_location = drop_off_location

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
        if not isinstance(other, ScheduleTaxiReservationRequest):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
