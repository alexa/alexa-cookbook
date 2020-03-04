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


class Address(object):
    """
    Represents the full address response from the service.


    :param address_line1: 
    :type address_line1: (optional) str
    :param address_line2: 
    :type address_line2: (optional) str
    :param address_line3: 
    :type address_line3: (optional) str
    :param country_code: 
    :type country_code: (optional) str
    :param state_or_region: 
    :type state_or_region: (optional) str
    :param city: 
    :type city: (optional) str
    :param district_or_county: 
    :type district_or_county: (optional) str
    :param postal_code: 
    :type postal_code: (optional) str

    """
    deserialized_types = {
        'address_line1': 'str',
        'address_line2': 'str',
        'address_line3': 'str',
        'country_code': 'str',
        'state_or_region': 'str',
        'city': 'str',
        'district_or_county': 'str',
        'postal_code': 'str'
    }  # type: Dict

    attribute_map = {
        'address_line1': 'addressLine1',
        'address_line2': 'addressLine2',
        'address_line3': 'addressLine3',
        'country_code': 'countryCode',
        'state_or_region': 'stateOrRegion',
        'city': 'city',
        'district_or_county': 'districtOrCounty',
        'postal_code': 'postalCode'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, address_line1=None, address_line2=None, address_line3=None, country_code=None, state_or_region=None, city=None, district_or_county=None, postal_code=None):
        # type: (Optional[str], Optional[str], Optional[str], Optional[str], Optional[str], Optional[str], Optional[str], Optional[str]) -> None
        """Represents the full address response from the service.

        :param address_line1: 
        :type address_line1: (optional) str
        :param address_line2: 
        :type address_line2: (optional) str
        :param address_line3: 
        :type address_line3: (optional) str
        :param country_code: 
        :type country_code: (optional) str
        :param state_or_region: 
        :type state_or_region: (optional) str
        :param city: 
        :type city: (optional) str
        :param district_or_county: 
        :type district_or_county: (optional) str
        :param postal_code: 
        :type postal_code: (optional) str
        """
        self.__discriminator_value = None  # type: str

        self.address_line1 = address_line1
        self.address_line2 = address_line2
        self.address_line3 = address_line3
        self.country_code = country_code
        self.state_or_region = state_or_region
        self.city = city
        self.district_or_county = district_or_county
        self.postal_code = postal_code

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
        if not isinstance(other, Address):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
