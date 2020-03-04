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
    from ask_sdk_model.interfaces.amazonpay.model.request.price import Price


class AuthorizeAttributes(BaseAmazonPayEntity):
    """
    This is an object to set the attributes specified in the AuthorizeAttributes table. See the “AuthorizationDetails” section of the Amazon Pay API reference guide for details about this object.


    :param authorization_reference_id: This is 3P seller&#39;s identifier for this authorization transaction. This identifier must be unique for all of your authorization transactions.
    :type authorization_reference_id: (optional) str
    :param authorization_amount: 
    :type authorization_amount: (optional) ask_sdk_model.interfaces.amazonpay.model.request.price.Price
    :param transaction_timeout: The maximum number of minutes allocated for the Authorize operation call to be processed. After this the authorization is automatically declined and you cannot capture funds against the authorization. The default value for Alexa transactions is 0. In order to speed up checkout time for voice users we recommend to not change this value.
    :type transaction_timeout: (optional) int
    :param seller_authorization_note: A description for the transaction that is included in emails to the user. Appears only when AuthorizeAndCapture is chosen.
    :type seller_authorization_note: (optional) str
    :param soft_descriptor: The description to be shown on the user&#39;s payment instrument statement if AuthorizeAndCapture is chosen. Format of soft descriptor sent to the payment processor is \&quot;AMZ* &lt;soft descriptor specified here&gt;\&quot;. Default is \&quot;AMZ*&lt;SELLER_NAME&gt; amzn.com/ pmts WA\&quot;. Maximum length can be 16 characters.
    :type soft_descriptor: (optional) str
    :param version: Version of the Amazon Pay Entity. Can be 1 or greater.
    :type version: (optional) str

    """
    deserialized_types = {
        'authorization_reference_id': 'str',
        'authorization_amount': 'ask_sdk_model.interfaces.amazonpay.model.request.price.Price',
        'transaction_timeout': 'int',
        'seller_authorization_note': 'str',
        'soft_descriptor': 'str',
        'object_type': 'str',
        'version': 'str'
    }  # type: Dict

    attribute_map = {
        'authorization_reference_id': 'authorizationReferenceId',
        'authorization_amount': 'authorizationAmount',
        'transaction_timeout': 'transactionTimeout',
        'seller_authorization_note': 'sellerAuthorizationNote',
        'soft_descriptor': 'softDescriptor',
        'object_type': '@type',
        'version': '@version'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, authorization_reference_id=None, authorization_amount=None, transaction_timeout=None, seller_authorization_note=None, soft_descriptor=None, version=None):
        # type: (Optional[str], Optional[Price], Optional[int], Optional[str], Optional[str], Optional[str]) -> None
        """This is an object to set the attributes specified in the AuthorizeAttributes table. See the “AuthorizationDetails” section of the Amazon Pay API reference guide for details about this object.

        :param authorization_reference_id: This is 3P seller&#39;s identifier for this authorization transaction. This identifier must be unique for all of your authorization transactions.
        :type authorization_reference_id: (optional) str
        :param authorization_amount: 
        :type authorization_amount: (optional) ask_sdk_model.interfaces.amazonpay.model.request.price.Price
        :param transaction_timeout: The maximum number of minutes allocated for the Authorize operation call to be processed. After this the authorization is automatically declined and you cannot capture funds against the authorization. The default value for Alexa transactions is 0. In order to speed up checkout time for voice users we recommend to not change this value.
        :type transaction_timeout: (optional) int
        :param seller_authorization_note: A description for the transaction that is included in emails to the user. Appears only when AuthorizeAndCapture is chosen.
        :type seller_authorization_note: (optional) str
        :param soft_descriptor: The description to be shown on the user&#39;s payment instrument statement if AuthorizeAndCapture is chosen. Format of soft descriptor sent to the payment processor is \&quot;AMZ* &lt;soft descriptor specified here&gt;\&quot;. Default is \&quot;AMZ*&lt;SELLER_NAME&gt; amzn.com/ pmts WA\&quot;. Maximum length can be 16 characters.
        :type soft_descriptor: (optional) str
        :param version: Version of the Amazon Pay Entity. Can be 1 or greater.
        :type version: (optional) str
        """
        self.__discriminator_value = "AuthorizeAttributes"  # type: str

        self.object_type = self.__discriminator_value
        super(AuthorizeAttributes, self).__init__(object_type=self.__discriminator_value, version=version)
        self.authorization_reference_id = authorization_reference_id
        self.authorization_amount = authorization_amount
        self.transaction_timeout = transaction_timeout
        self.seller_authorization_note = seller_authorization_note
        self.soft_descriptor = soft_descriptor

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
        if not isinstance(other, AuthorizeAttributes):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
