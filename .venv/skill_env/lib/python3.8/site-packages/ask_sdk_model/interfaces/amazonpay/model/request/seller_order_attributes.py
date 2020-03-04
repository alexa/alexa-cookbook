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
from ask_sdk_model.interfaces.amazonpay.model.request.base_amazon_pay_entity import BaseAmazonPayEntity


if typing.TYPE_CHECKING:
    from typing import Dict, List, Optional, Union
    from datetime import datetime


class SellerOrderAttributes(BaseAmazonPayEntity):
    """
    This object includes elements shown to buyers in emails and in their transaction history. See the “SellerOrderAttributes” section of the Amazon Pay API reference guide for details about this object.


    :param seller_order_id: The merchant-specified identifier of this order. This is shown to the buyer in their emails and transaction history on the Amazon Pay website.
    :type seller_order_id: (optional) str
    :param store_name: The identifier of the store from which the order was placed. This overrides the default value in Seller Central under Settings &gt; Account Settings. It is displayed to the buyer in their emails and transaction history on the Amazon Payments website.
    :type store_name: (optional) str
    :param custom_information: Any additional information that you want to include with this order reference.
    :type custom_information: (optional) str
    :param seller_note: This represents a description of the order that is displayed in emails to the buyer.
    :type seller_note: (optional) str
    :param version: Version of the Amazon Pay Entity. Can be 1 or greater.
    :type version: (optional) str

    """
    deserialized_types = {
        'seller_order_id': 'str',
        'store_name': 'str',
        'custom_information': 'str',
        'seller_note': 'str',
        'object_type': 'str',
        'version': 'str'
    }  # type: Dict

    attribute_map = {
        'seller_order_id': 'sellerOrderId',
        'store_name': 'storeName',
        'custom_information': 'customInformation',
        'seller_note': 'sellerNote',
        'object_type': '@type',
        'version': '@version'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, seller_order_id=None, store_name=None, custom_information=None, seller_note=None, version=None):
        # type: (Optional[str], Optional[str], Optional[str], Optional[str], Optional[str]) -> None
        """This object includes elements shown to buyers in emails and in their transaction history. See the “SellerOrderAttributes” section of the Amazon Pay API reference guide for details about this object.

        :param seller_order_id: The merchant-specified identifier of this order. This is shown to the buyer in their emails and transaction history on the Amazon Pay website.
        :type seller_order_id: (optional) str
        :param store_name: The identifier of the store from which the order was placed. This overrides the default value in Seller Central under Settings &gt; Account Settings. It is displayed to the buyer in their emails and transaction history on the Amazon Payments website.
        :type store_name: (optional) str
        :param custom_information: Any additional information that you want to include with this order reference.
        :type custom_information: (optional) str
        :param seller_note: This represents a description of the order that is displayed in emails to the buyer.
        :type seller_note: (optional) str
        :param version: Version of the Amazon Pay Entity. Can be 1 or greater.
        :type version: (optional) str
        """
        self.__discriminator_value = "SellerOrderAttributes"  # type: str

        self.object_type = self.__discriminator_value
        super(SellerOrderAttributes, self).__init__(object_type=self.__discriminator_value, version=version)
        self.seller_order_id = seller_order_id
        self.store_name = store_name
        self.custom_information = custom_information
        self.seller_note = seller_note

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
        if not isinstance(other, SellerOrderAttributes):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
