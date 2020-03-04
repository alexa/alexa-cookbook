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
    from ask_sdk_model.services.monetization.purchasable_state import PurchasableState
    from ask_sdk_model.services.monetization.purchase_mode import PurchaseMode
    from ask_sdk_model.services.monetization.entitled_state import EntitledState
    from ask_sdk_model.services.monetization.product_type import ProductType
    from ask_sdk_model.services.monetization.entitlement_reason import EntitlementReason


class InSkillProduct(object):
    """

    :param product_id: Product Id
    :type product_id: (optional) str
    :param reference_name: Developer selected in-skill product name. This is for developer reference only.
    :type reference_name: (optional) str
    :param name: Name of the product in the language from the \&quot;Accept-Language\&quot; header
    :type name: (optional) str
    :param object_type: 
    :type object_type: (optional) ask_sdk_model.services.monetization.product_type.ProductType
    :param summary: Product summary in the language from the \&quot;Accept-Language\&quot; header
    :type summary: (optional) str
    :param purchasable: 
    :type purchasable: (optional) ask_sdk_model.services.monetization.purchasable_state.PurchasableState
    :param entitled: 
    :type entitled: (optional) ask_sdk_model.services.monetization.entitled_state.EntitledState
    :param entitlement_reason: 
    :type entitlement_reason: (optional) ask_sdk_model.services.monetization.entitlement_reason.EntitlementReason
    :param active_entitlement_count: Total active purchases of the product made by the user. Note - For ENTITLEMENT and SUBSCRIPTION product types, the value is either zero(NOT_ENTITLED) or one(ENTITLED). For CONSUMABLE product type the value is zero or more, as CONSUMABLE can be re-purchased.
    :type active_entitlement_count: (optional) int
    :param purchase_mode: 
    :type purchase_mode: (optional) ask_sdk_model.services.monetization.purchase_mode.PurchaseMode

    """
    deserialized_types = {
        'product_id': 'str',
        'reference_name': 'str',
        'name': 'str',
        'object_type': 'ask_sdk_model.services.monetization.product_type.ProductType',
        'summary': 'str',
        'purchasable': 'ask_sdk_model.services.monetization.purchasable_state.PurchasableState',
        'entitled': 'ask_sdk_model.services.monetization.entitled_state.EntitledState',
        'entitlement_reason': 'ask_sdk_model.services.monetization.entitlement_reason.EntitlementReason',
        'active_entitlement_count': 'int',
        'purchase_mode': 'ask_sdk_model.services.monetization.purchase_mode.PurchaseMode'
    }  # type: Dict

    attribute_map = {
        'product_id': 'productId',
        'reference_name': 'referenceName',
        'name': 'name',
        'object_type': 'type',
        'summary': 'summary',
        'purchasable': 'purchasable',
        'entitled': 'entitled',
        'entitlement_reason': 'entitlementReason',
        'active_entitlement_count': 'activeEntitlementCount',
        'purchase_mode': 'purchaseMode'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, product_id=None, reference_name=None, name=None, object_type=None, summary=None, purchasable=None, entitled=None, entitlement_reason=None, active_entitlement_count=None, purchase_mode=None):
        # type: (Optional[str], Optional[str], Optional[str], Optional[ProductType], Optional[str], Optional[PurchasableState], Optional[EntitledState], Optional[EntitlementReason], Optional[int], Optional[PurchaseMode]) -> None
        """

        :param product_id: Product Id
        :type product_id: (optional) str
        :param reference_name: Developer selected in-skill product name. This is for developer reference only.
        :type reference_name: (optional) str
        :param name: Name of the product in the language from the \&quot;Accept-Language\&quot; header
        :type name: (optional) str
        :param object_type: 
        :type object_type: (optional) ask_sdk_model.services.monetization.product_type.ProductType
        :param summary: Product summary in the language from the \&quot;Accept-Language\&quot; header
        :type summary: (optional) str
        :param purchasable: 
        :type purchasable: (optional) ask_sdk_model.services.monetization.purchasable_state.PurchasableState
        :param entitled: 
        :type entitled: (optional) ask_sdk_model.services.monetization.entitled_state.EntitledState
        :param entitlement_reason: 
        :type entitlement_reason: (optional) ask_sdk_model.services.monetization.entitlement_reason.EntitlementReason
        :param active_entitlement_count: Total active purchases of the product made by the user. Note - For ENTITLEMENT and SUBSCRIPTION product types, the value is either zero(NOT_ENTITLED) or one(ENTITLED). For CONSUMABLE product type the value is zero or more, as CONSUMABLE can be re-purchased.
        :type active_entitlement_count: (optional) int
        :param purchase_mode: 
        :type purchase_mode: (optional) ask_sdk_model.services.monetization.purchase_mode.PurchaseMode
        """
        self.__discriminator_value = None  # type: str

        self.product_id = product_id
        self.reference_name = reference_name
        self.name = name
        self.object_type = object_type
        self.summary = summary
        self.purchasable = purchasable
        self.entitled = entitled
        self.entitlement_reason = entitlement_reason
        self.active_entitlement_count = active_entitlement_count
        self.purchase_mode = purchase_mode

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
        if not isinstance(other, InSkillProduct):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
