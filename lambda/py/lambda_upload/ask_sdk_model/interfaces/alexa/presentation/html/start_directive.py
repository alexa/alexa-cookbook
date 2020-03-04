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
    from ask_sdk_model.interfaces.alexa.presentation.html.configuration import Configuration
    from ask_sdk_model.interfaces.alexa.presentation.html.start_request import StartRequest
    from ask_sdk_model.interfaces.alexa.presentation.html.transformer import Transformer


class StartDirective(Directive):
    """
    The Start directive provides the data necessary to load an HTML page on the target device. To use this directive, [apply to participate](https://build.amazonalexadev.com/AlexaWebAPIforGamesDeveloperPreview_AlexaWebAPIforGames.html) in the Alexa Web API for Games developer preview. 


    :param data: Optional startup data which will be made available to the runtime for skill startup. Maximum size: 18 KB
    :type data: (optional) object
    :param transformers: An array of objects for performing text-to-speech transformations with message data
    :type transformers: (optional) list[ask_sdk_model.interfaces.alexa.presentation.html.transformer.Transformer]
    :param request: 
    :type request: (optional) ask_sdk_model.interfaces.alexa.presentation.html.start_request.StartRequest
    :param configuration: 
    :type configuration: (optional) ask_sdk_model.interfaces.alexa.presentation.html.configuration.Configuration

    """
    deserialized_types = {
        'object_type': 'str',
        'data': 'object',
        'transformers': 'list[ask_sdk_model.interfaces.alexa.presentation.html.transformer.Transformer]',
        'request': 'ask_sdk_model.interfaces.alexa.presentation.html.start_request.StartRequest',
        'configuration': 'ask_sdk_model.interfaces.alexa.presentation.html.configuration.Configuration'
    }  # type: Dict

    attribute_map = {
        'object_type': 'type',
        'data': 'data',
        'transformers': 'transformers',
        'request': 'request',
        'configuration': 'configuration'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, data=None, transformers=None, request=None, configuration=None):
        # type: (Optional[object], Optional[List[Transformer]], Optional[StartRequest], Optional[Configuration]) -> None
        """The Start directive provides the data necessary to load an HTML page on the target device. To use this directive, [apply to participate](https://build.amazonalexadev.com/AlexaWebAPIforGamesDeveloperPreview_AlexaWebAPIforGames.html) in the Alexa Web API for Games developer preview. 

        :param data: Optional startup data which will be made available to the runtime for skill startup. Maximum size: 18 KB
        :type data: (optional) object
        :param transformers: An array of objects for performing text-to-speech transformations with message data
        :type transformers: (optional) list[ask_sdk_model.interfaces.alexa.presentation.html.transformer.Transformer]
        :param request: 
        :type request: (optional) ask_sdk_model.interfaces.alexa.presentation.html.start_request.StartRequest
        :param configuration: 
        :type configuration: (optional) ask_sdk_model.interfaces.alexa.presentation.html.configuration.Configuration
        """
        self.__discriminator_value = "Alexa.Presentation.HTML.Start"  # type: str

        self.object_type = self.__discriminator_value
        super(StartDirective, self).__init__(object_type=self.__discriminator_value)
        self.data = data
        self.transformers = transformers
        self.request = request
        self.configuration = configuration

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
        if not isinstance(other, StartDirective):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
