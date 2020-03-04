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
    from ask_sdk_model.interfaces.alexa.presentation.html.transformer_type import TransformerType


class Transformer(object):
    """
    Properties for performing text to speech transformations. These are the same properties that [APL transformers](https://developer.amazon.com/docs/alexa-presentation-language/apl-data-source.html#transformer-properties-and-conversion-rules) use. 


    :param transformer: 
    :type transformer: (optional) ask_sdk_model.interfaces.alexa.presentation.html.transformer_type.TransformerType
    :param input_path: A JSON path that points to either a single entity in the message object, or a set of entities using wildcard or unresolved arrays. Examples &#39;family[*].name&#39;, &#39;address.street&#39;. See [APL transformer properties](https://developer.amazon.com/docs/alexa-presentation-language/apl-data-source.html#transformer-properties-and-conversion-rules) for more details. 
    :type input_path: (optional) str
    :param output_name: Name of the output property to add to the message object. For example, if the inputPath is \&quot;address.street\&quot;, the transformer output will be stored at \&quot;address.outputName\&quot;. If no outputName is supplied, the transformer output will override the value at inputPath. 
    :type output_name: (optional) str

    """
    deserialized_types = {
        'transformer': 'ask_sdk_model.interfaces.alexa.presentation.html.transformer_type.TransformerType',
        'input_path': 'str',
        'output_name': 'str'
    }  # type: Dict

    attribute_map = {
        'transformer': 'transformer',
        'input_path': 'inputPath',
        'output_name': 'outputName'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, transformer=None, input_path=None, output_name=None):
        # type: (Optional[TransformerType], Optional[str], Optional[str]) -> None
        """Properties for performing text to speech transformations. These are the same properties that [APL transformers](https://developer.amazon.com/docs/alexa-presentation-language/apl-data-source.html#transformer-properties-and-conversion-rules) use. 

        :param transformer: 
        :type transformer: (optional) ask_sdk_model.interfaces.alexa.presentation.html.transformer_type.TransformerType
        :param input_path: A JSON path that points to either a single entity in the message object, or a set of entities using wildcard or unresolved arrays. Examples &#39;family[*].name&#39;, &#39;address.street&#39;. See [APL transformer properties](https://developer.amazon.com/docs/alexa-presentation-language/apl-data-source.html#transformer-properties-and-conversion-rules) for more details. 
        :type input_path: (optional) str
        :param output_name: Name of the output property to add to the message object. For example, if the inputPath is \&quot;address.street\&quot;, the transformer output will be stored at \&quot;address.outputName\&quot;. If no outputName is supplied, the transformer output will override the value at inputPath. 
        :type output_name: (optional) str
        """
        self.__discriminator_value = None  # type: str

        self.transformer = transformer
        self.input_path = input_path
        self.output_name = output_name

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
        if not isinstance(other, Transformer):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
