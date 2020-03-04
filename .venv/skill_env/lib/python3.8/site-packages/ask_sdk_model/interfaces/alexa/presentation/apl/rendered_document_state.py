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
    from ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen import ComponentVisibleOnScreen


class RenderedDocumentState(object):
    """
    Provides context for any APL content shown on screen.


    :param token: The token specified in the RenderDocument directive which rendered the content shown on screen.
    :type token: (optional) str
    :param version: The APL version of the document which rendered the content shown on screen.
    :type version: (optional) str
    :param components_visible_on_screen: List of the visible APL components currently shown on screen.
    :type components_visible_on_screen: (optional) list[ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen.ComponentVisibleOnScreen]

    """
    deserialized_types = {
        'token': 'str',
        'version': 'str',
        'components_visible_on_screen': 'list[ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen.ComponentVisibleOnScreen]'
    }  # type: Dict

    attribute_map = {
        'token': 'token',
        'version': 'version',
        'components_visible_on_screen': 'componentsVisibleOnScreen'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, token=None, version=None, components_visible_on_screen=None):
        # type: (Optional[str], Optional[str], Optional[List[ComponentVisibleOnScreen]]) -> None
        """Provides context for any APL content shown on screen.

        :param token: The token specified in the RenderDocument directive which rendered the content shown on screen.
        :type token: (optional) str
        :param version: The APL version of the document which rendered the content shown on screen.
        :type version: (optional) str
        :param components_visible_on_screen: List of the visible APL components currently shown on screen.
        :type components_visible_on_screen: (optional) list[ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen.ComponentVisibleOnScreen]
        """
        self.__discriminator_value = None  # type: str

        self.token = token
        self.version = version
        self.components_visible_on_screen = components_visible_on_screen

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
        if not isinstance(other, RenderedDocumentState):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
