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


class SellerBillingAgreementAttributes(object):
    """
    Provides more context about the billing agreement that is represented by this Billing Agreement object.


    :param seller_billing_agreement_id: The merchant-specified identifier of this billing agreement. At least one request parameter must be specified. Amazon recommends that you use only the following characters:- lowercase a-z, uppercase A-Z, numbers 0-9, dash (-), underscore (_).
    :type seller_billing_agreement_id: (optional) str
    :param store_name: The identifier of the store from which the order was placed. This overrides the default value in Seller Central under Settings &gt; Account Settings. It is displayed to the buyer in their emails and transaction history on the Amazon Payments website.
    :type store_name: (optional) str
    :param custom_information: Any additional information that you wish to include with this billing agreement. At least one request parameter must be specified.
    :type custom_information: (optional) str

    """
    deserialized_types = {
        'seller_billing_agreement_id': 'str',
        'store_name': 'str',
        'custom_information': 'str'
    }  # type: Dict

    attribute_map = {
        'seller_billing_agreement_id': 'sellerBillingAgreementId',
        'store_name': 'storeName',
        'custom_information': 'customInformation'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, seller_billing_agreement_id=None, store_name=None, custom_information=None):
        # type: (Optional[str], Optional[str], Optional[str]) -> None
        """Provides more context about the billing agreement that is represented by this Billing Agreement object.

        :param seller_billing_agreement_id: The merchant-specified identifier of this billing agreement. At least one request parameter must be specified. Amazon recommends that you use only the following characters:- lowercase a-z, uppercase A-Z, numbers 0-9, dash (-), underscore (_).
        :type seller_billing_agreement_id: (optional) str
        :param store_name: The identifier of the store from which the order was placed. This overrides the default value in Seller Central under Settings &gt; Account Settings. It is displayed to the buyer in their emails and transaction history on the Amazon Payments website.
        :type store_name: (optional) str
        :param custom_information: Any additional information that you wish to include with this billing agreement. At least one request parameter must be specified.
        :type custom_information: (optional) str
        """
        self.__discriminator_value = None  # type: str

        self.seller_billing_agreement_id = seller_billing_agreement_id
        self.store_name = store_name
        self.custom_information = custom_information

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
        if not isinstance(other, SellerBillingAgreementAttributes):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
