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
from abc import ABCMeta, abstractmethod


if typing.TYPE_CHECKING:
    from typing import Dict, List, Optional, Union
    from datetime import datetime
    from ask_sdk_model.interfaces.display.back_button_behavior import BackButtonBehavior


class Template(object):
    """

    :param object_type: 
    :type object_type: (optional) str
    :param token: 
    :type token: (optional) str
    :param back_button: 
    :type back_button: (optional) ask_sdk_model.interfaces.display.back_button_behavior.BackButtonBehavior

    .. note::

        This is an abstract class. Use the following mapping, to figure out
        the model class to be instantiated, that sets ``type`` variable.

        | ListTemplate2: :py:class:`ask_sdk_model.interfaces.display.list_template2.ListTemplate2`,
        |
        | ListTemplate1: :py:class:`ask_sdk_model.interfaces.display.list_template1.ListTemplate1`,
        |
        | BodyTemplate7: :py:class:`ask_sdk_model.interfaces.display.body_template7.BodyTemplate7`,
        |
        | BodyTemplate6: :py:class:`ask_sdk_model.interfaces.display.body_template6.BodyTemplate6`,
        |
        | BodyTemplate3: :py:class:`ask_sdk_model.interfaces.display.body_template3.BodyTemplate3`,
        |
        | BodyTemplate2: :py:class:`ask_sdk_model.interfaces.display.body_template2.BodyTemplate2`,
        |
        | BodyTemplate1: :py:class:`ask_sdk_model.interfaces.display.body_template1.BodyTemplate1`

    """
    deserialized_types = {
        'object_type': 'str',
        'token': 'str',
        'back_button': 'ask_sdk_model.interfaces.display.back_button_behavior.BackButtonBehavior'
    }  # type: Dict

    attribute_map = {
        'object_type': 'type',
        'token': 'token',
        'back_button': 'backButton'
    }  # type: Dict
    supports_multiple_types = False

    discriminator_value_class_map = {
        'ListTemplate2': 'ask_sdk_model.interfaces.display.list_template2.ListTemplate2',
        'ListTemplate1': 'ask_sdk_model.interfaces.display.list_template1.ListTemplate1',
        'BodyTemplate7': 'ask_sdk_model.interfaces.display.body_template7.BodyTemplate7',
        'BodyTemplate6': 'ask_sdk_model.interfaces.display.body_template6.BodyTemplate6',
        'BodyTemplate3': 'ask_sdk_model.interfaces.display.body_template3.BodyTemplate3',
        'BodyTemplate2': 'ask_sdk_model.interfaces.display.body_template2.BodyTemplate2',
        'BodyTemplate1': 'ask_sdk_model.interfaces.display.body_template1.BodyTemplate1'
    }

    json_discriminator_key = "type"

    __metaclass__ = ABCMeta

    @abstractmethod
    def __init__(self, object_type=None, token=None, back_button=None):
        # type: (Optional[str], Optional[str], Optional[BackButtonBehavior]) -> None
        """

        :param object_type: 
        :type object_type: (optional) str
        :param token: 
        :type token: (optional) str
        :param back_button: 
        :type back_button: (optional) ask_sdk_model.interfaces.display.back_button_behavior.BackButtonBehavior
        """
        self.__discriminator_value = None  # type: str

        self.object_type = object_type
        self.token = token
        self.back_button = back_button

    @classmethod
    def get_real_child_model(cls, data):
        # type: (Dict[str, str]) -> Optional[str]
        """Returns the real base class specified by the discriminator"""
        discriminator_value = data[cls.json_discriminator_key]
        return cls.discriminator_value_class_map.get(discriminator_value)

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
        if not isinstance(other, Template):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
