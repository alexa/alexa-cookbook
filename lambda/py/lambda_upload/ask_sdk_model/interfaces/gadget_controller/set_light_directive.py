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
from ask_sdk_model.directive import Directive


if typing.TYPE_CHECKING:
    from typing import Dict, List, Optional, Union
    from datetime import datetime
    from ask_sdk_model.services.gadget_controller.set_light_parameters import SetLightParameters


class SetLightDirective(Directive):
    """
    Sends Alexa a command to modify the behavior of connected Echo Buttons.


    :param version: The version of the directive. Must be set to 1.
    :type version: (optional) int
    :param target_gadgets: The gadget IDs that will receive the command. An empty array, or leaving this parameter out, signifies that all gadgets will receive the command.
    :type target_gadgets: (optional) list[str]
    :param parameters: 
    :type parameters: (optional) ask_sdk_model.services.gadget_controller.set_light_parameters.SetLightParameters

    """
    deserialized_types = {
        'object_type': 'str',
        'version': 'int',
        'target_gadgets': 'list[str]',
        'parameters': 'ask_sdk_model.services.gadget_controller.set_light_parameters.SetLightParameters'
    }  # type: Dict

    attribute_map = {
        'object_type': 'type',
        'version': 'version',
        'target_gadgets': 'targetGadgets',
        'parameters': 'parameters'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, version=None, target_gadgets=None, parameters=None):
        # type: (Optional[int], Optional[List[object]], Optional[SetLightParameters]) -> None
        """Sends Alexa a command to modify the behavior of connected Echo Buttons.

        :param version: The version of the directive. Must be set to 1.
        :type version: (optional) int
        :param target_gadgets: The gadget IDs that will receive the command. An empty array, or leaving this parameter out, signifies that all gadgets will receive the command.
        :type target_gadgets: (optional) list[str]
        :param parameters: 
        :type parameters: (optional) ask_sdk_model.services.gadget_controller.set_light_parameters.SetLightParameters
        """
        self.__discriminator_value = "GadgetController.SetLight"  # type: str

        self.object_type = self.__discriminator_value
        super(SetLightDirective, self).__init__(object_type=self.__discriminator_value)
        self.version = version
        self.target_gadgets = target_gadgets
        self.parameters = parameters

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
        if not isinstance(other, SetLightDirective):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
