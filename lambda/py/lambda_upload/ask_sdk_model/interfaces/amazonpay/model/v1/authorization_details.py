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
    from ask_sdk_model.interfaces.amazonpay.model.v1.authorization_status import AuthorizationStatus
    from ask_sdk_model.interfaces.amazonpay.model.v1.price import Price


class AuthorizationDetails(object):
    """
    This object encapsulates details about an Authorization object including the status, amount captured and fee charged.


    :param amazon_authorization_id: This is AmazonPay generated identifier for this authorization transaction.
    :type amazon_authorization_id: (optional) str
    :param authorization_reference_id: This is 3P seller&#39;s identifier for this authorization transaction. This identifier must be unique for all of your authorization transactions.
    :type authorization_reference_id: (optional) str
    :param seller_authorization_note: A description for the transaction that is included in emails to the user. Appears only when AuthorizeAndCapture is chosen.
    :type seller_authorization_note: (optional) str
    :param authorization_amount: 
    :type authorization_amount: (optional) ask_sdk_model.interfaces.amazonpay.model.v1.price.Price
    :param captured_amount: 
    :type captured_amount: (optional) ask_sdk_model.interfaces.amazonpay.model.v1.price.Price
    :param authorization_fee: 
    :type authorization_fee: (optional) ask_sdk_model.interfaces.amazonpay.model.v1.price.Price
    :param id_list: list of AmazonCaptureId identifiers that have been requested on this Authorization object.
    :type id_list: (optional) list[str]
    :param creation_timestamp: This is the time at which the authorization was created.
    :type creation_timestamp: (optional) datetime
    :param expiration_timestamp: This is the time at which the authorization expires.
    :type expiration_timestamp: (optional) datetime
    :param authorization_status: 
    :type authorization_status: (optional) ask_sdk_model.interfaces.amazonpay.model.v1.authorization_status.AuthorizationStatus
    :param soft_decline: This indicates whether an authorization resulted in a soft decline.
    :type soft_decline: (optional) bool
    :param capture_now: This indicates whether a direct capture against the payment contract was specified.
    :type capture_now: (optional) bool
    :param soft_descriptor: This is the description to be shown on the buyer&#39;s payment instrument statement if AuthorizeAndCapture was chosen.
    :type soft_descriptor: (optional) str

    """
    deserialized_types = {
        'amazon_authorization_id': 'str',
        'authorization_reference_id': 'str',
        'seller_authorization_note': 'str',
        'authorization_amount': 'ask_sdk_model.interfaces.amazonpay.model.v1.price.Price',
        'captured_amount': 'ask_sdk_model.interfaces.amazonpay.model.v1.price.Price',
        'authorization_fee': 'ask_sdk_model.interfaces.amazonpay.model.v1.price.Price',
        'id_list': 'list[str]',
        'creation_timestamp': 'datetime',
        'expiration_timestamp': 'datetime',
        'authorization_status': 'ask_sdk_model.interfaces.amazonpay.model.v1.authorization_status.AuthorizationStatus',
        'soft_decline': 'bool',
        'capture_now': 'bool',
        'soft_descriptor': 'str'
    }  # type: Dict

    attribute_map = {
        'amazon_authorization_id': 'amazonAuthorizationId',
        'authorization_reference_id': 'authorizationReferenceId',
        'seller_authorization_note': 'sellerAuthorizationNote',
        'authorization_amount': 'authorizationAmount',
        'captured_amount': 'capturedAmount',
        'authorization_fee': 'authorizationFee',
        'id_list': 'idList',
        'creation_timestamp': 'creationTimestamp',
        'expiration_timestamp': 'expirationTimestamp',
        'authorization_status': 'authorizationStatus',
        'soft_decline': 'softDecline',
        'capture_now': 'captureNow',
        'soft_descriptor': 'softDescriptor'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, amazon_authorization_id=None, authorization_reference_id=None, seller_authorization_note=None, authorization_amount=None, captured_amount=None, authorization_fee=None, id_list=None, creation_timestamp=None, expiration_timestamp=None, authorization_status=None, soft_decline=None, capture_now=None, soft_descriptor=None):
        # type: (Optional[str], Optional[str], Optional[str], Optional[Price], Optional[Price], Optional[Price], Optional[List[object]], Optional[datetime], Optional[datetime], Optional[AuthorizationStatus], Optional[bool], Optional[bool], Optional[str]) -> None
        """This object encapsulates details about an Authorization object including the status, amount captured and fee charged.

        :param amazon_authorization_id: This is AmazonPay generated identifier for this authorization transaction.
        :type amazon_authorization_id: (optional) str
        :param authorization_reference_id: This is 3P seller&#39;s identifier for this authorization transaction. This identifier must be unique for all of your authorization transactions.
        :type authorization_reference_id: (optional) str
        :param seller_authorization_note: A description for the transaction that is included in emails to the user. Appears only when AuthorizeAndCapture is chosen.
        :type seller_authorization_note: (optional) str
        :param authorization_amount: 
        :type authorization_amount: (optional) ask_sdk_model.interfaces.amazonpay.model.v1.price.Price
        :param captured_amount: 
        :type captured_amount: (optional) ask_sdk_model.interfaces.amazonpay.model.v1.price.Price
        :param authorization_fee: 
        :type authorization_fee: (optional) ask_sdk_model.interfaces.amazonpay.model.v1.price.Price
        :param id_list: list of AmazonCaptureId identifiers that have been requested on this Authorization object.
        :type id_list: (optional) list[str]
        :param creation_timestamp: This is the time at which the authorization was created.
        :type creation_timestamp: (optional) datetime
        :param expiration_timestamp: This is the time at which the authorization expires.
        :type expiration_timestamp: (optional) datetime
        :param authorization_status: 
        :type authorization_status: (optional) ask_sdk_model.interfaces.amazonpay.model.v1.authorization_status.AuthorizationStatus
        :param soft_decline: This indicates whether an authorization resulted in a soft decline.
        :type soft_decline: (optional) bool
        :param capture_now: This indicates whether a direct capture against the payment contract was specified.
        :type capture_now: (optional) bool
        :param soft_descriptor: This is the description to be shown on the buyer&#39;s payment instrument statement if AuthorizeAndCapture was chosen.
        :type soft_descriptor: (optional) str
        """
        self.__discriminator_value = None  # type: str

        self.amazon_authorization_id = amazon_authorization_id
        self.authorization_reference_id = authorization_reference_id
        self.seller_authorization_note = seller_authorization_note
        self.authorization_amount = authorization_amount
        self.captured_amount = captured_amount
        self.authorization_fee = authorization_fee
        self.id_list = id_list
        self.creation_timestamp = creation_timestamp
        self.expiration_timestamp = expiration_timestamp
        self.authorization_status = authorization_status
        self.soft_decline = soft_decline
        self.capture_now = capture_now
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
        if not isinstance(other, AuthorizationDetails):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
