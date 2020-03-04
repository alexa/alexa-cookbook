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
    from ask_sdk_model.interfaces.amazonpay.model.v1.billing_agreement_status import BillingAgreementStatus
    from ask_sdk_model.interfaces.amazonpay.model.v1.destination import Destination
    from ask_sdk_model.interfaces.amazonpay.model.v1.release_environment import ReleaseEnvironment


class BillingAgreementDetails(object):
    """
    The result attributes from successful SetupAmazonPay call.


    :param billing_agreement_id: Billing agreement id which can be used for one time and recurring purchases
    :type billing_agreement_id: (optional) str
    :param creation_timestamp: Time at which billing agreement details created.
    :type creation_timestamp: (optional) datetime
    :param destination: The default shipping address of the buyer. Returned if needAmazonShippingAddress is set to true.
    :type destination: (optional) ask_sdk_model.interfaces.amazonpay.model.v1.destination.Destination
    :param checkout_language: Merchant&#39;s preferred language of checkout.
    :type checkout_language: (optional) str
    :param release_environment: 
    :type release_environment: (optional) ask_sdk_model.interfaces.amazonpay.model.v1.release_environment.ReleaseEnvironment
    :param billing_agreement_status: 
    :type billing_agreement_status: (optional) ask_sdk_model.interfaces.amazonpay.model.v1.billing_agreement_status.BillingAgreementStatus

    """
    deserialized_types = {
        'billing_agreement_id': 'str',
        'creation_timestamp': 'datetime',
        'destination': 'ask_sdk_model.interfaces.amazonpay.model.v1.destination.Destination',
        'checkout_language': 'str',
        'release_environment': 'ask_sdk_model.interfaces.amazonpay.model.v1.release_environment.ReleaseEnvironment',
        'billing_agreement_status': 'ask_sdk_model.interfaces.amazonpay.model.v1.billing_agreement_status.BillingAgreementStatus'
    }  # type: Dict

    attribute_map = {
        'billing_agreement_id': 'billingAgreementId',
        'creation_timestamp': 'creationTimestamp',
        'destination': 'destination',
        'checkout_language': 'checkoutLanguage',
        'release_environment': 'releaseEnvironment',
        'billing_agreement_status': 'billingAgreementStatus'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, billing_agreement_id=None, creation_timestamp=None, destination=None, checkout_language=None, release_environment=None, billing_agreement_status=None):
        # type: (Optional[str], Optional[datetime], Optional[Destination], Optional[str], Optional[ReleaseEnvironment], Optional[BillingAgreementStatus]) -> None
        """The result attributes from successful SetupAmazonPay call.

        :param billing_agreement_id: Billing agreement id which can be used for one time and recurring purchases
        :type billing_agreement_id: (optional) str
        :param creation_timestamp: Time at which billing agreement details created.
        :type creation_timestamp: (optional) datetime
        :param destination: The default shipping address of the buyer. Returned if needAmazonShippingAddress is set to true.
        :type destination: (optional) ask_sdk_model.interfaces.amazonpay.model.v1.destination.Destination
        :param checkout_language: Merchant&#39;s preferred language of checkout.
        :type checkout_language: (optional) str
        :param release_environment: 
        :type release_environment: (optional) ask_sdk_model.interfaces.amazonpay.model.v1.release_environment.ReleaseEnvironment
        :param billing_agreement_status: 
        :type billing_agreement_status: (optional) ask_sdk_model.interfaces.amazonpay.model.v1.billing_agreement_status.BillingAgreementStatus
        """
        self.__discriminator_value = None  # type: str

        self.billing_agreement_id = billing_agreement_id
        self.creation_timestamp = creation_timestamp
        self.destination = destination
        self.checkout_language = checkout_language
        self.release_environment = release_environment
        self.billing_agreement_status = billing_agreement_status

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
        if not isinstance(other, BillingAgreementDetails):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
