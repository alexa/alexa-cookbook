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
    from ask_sdk_model.interfaces.custom_interface_controller.endpoint import Endpoint
    from ask_sdk_model.interfaces.custom_interface_controller.header import Header


class SendDirectiveDirective(Directive):
    """
    The directive to be delivered to the gadgets. Each directive is targeted to one gadget  (that is, one endpointId). To target the same directive to multiple gadgets, include one  directive for each gadget in the response.


    :param header: The object that contains the header of the directive.
    :type header: (optional) ask_sdk_model.interfaces.custom_interface_controller.header.Header
    :param payload: The free form JSON object.
    :type payload: (optional) object
    :param endpoint: Identifies the gadget where the directive should be sent to. Each directive is targeted to one gadget (that is, one endpointId). If the same directive is be sent to multiple gadgets,  include one directive for each gadget in the response.
    :type endpoint: (optional) ask_sdk_model.interfaces.custom_interface_controller.endpoint.Endpoint

    """
    deserialized_types = {
        'object_type': 'str',
        'header': 'ask_sdk_model.interfaces.custom_interface_controller.header.Header',
        'payload': 'object',
        'endpoint': 'ask_sdk_model.interfaces.custom_interface_controller.endpoint.Endpoint'
    }  # type: Dict

    attribute_map = {
        'object_type': 'type',
        'header': 'header',
        'payload': 'payload',
        'endpoint': 'endpoint'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, header=None, payload=None, endpoint=None):
        # type: (Optional[Header], Optional[object], Optional[Endpoint]) -> None
        """The directive to be delivered to the gadgets. Each directive is targeted to one gadget  (that is, one endpointId). To target the same directive to multiple gadgets, include one  directive for each gadget in the response.

        :param header: The object that contains the header of the directive.
        :type header: (optional) ask_sdk_model.interfaces.custom_interface_controller.header.Header
        :param payload: The free form JSON object.
        :type payload: (optional) object
        :param endpoint: Identifies the gadget where the directive should be sent to. Each directive is targeted to one gadget (that is, one endpointId). If the same directive is be sent to multiple gadgets,  include one directive for each gadget in the response.
        :type endpoint: (optional) ask_sdk_model.interfaces.custom_interface_controller.endpoint.Endpoint
        """
        self.__discriminator_value = "CustomInterfaceController.SendDirective"  # type: str

        self.object_type = self.__discriminator_value
        super(SendDirectiveDirective, self).__init__(object_type=self.__discriminator_value)
        self.header = header
        self.payload = payload
        self.endpoint = endpoint

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
        if not isinstance(other, SendDirectiveDirective):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
