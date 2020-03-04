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
    from ask_sdk_model.services.game_engine.recognizer import Recognizer
    from ask_sdk_model.services.game_engine.event import Event


class StartInputHandlerDirective(Directive):
    """

    :param timeout: The maximum run time for this Input Handler, in milliseconds. Although this parameter is required, you can specify events with conditions on which to end the Input Handler earlier.
    :type timeout: (optional) int
    :param proxies: Names for unknown gadget IDs to use in recognizers, allocated on a first-come, first-served basis.
    :type proxies: (optional) list[str]
    :param recognizers: Conditions that, at any moment, are either true or false. You use recognizers when you specify the conditions under which your skill is notified of Echo Button input. 
    :type recognizers: (optional) dict(str, ask_sdk_model.services.game_engine.recognizer.Recognizer)
    :param events: The logic that determines when your skill is notified of Echo Button input. Events are listed here as object keys, where the keys specify the name of an event. 
    :type events: (optional) dict(str, ask_sdk_model.services.game_engine.event.Event)

    """
    deserialized_types = {
        'object_type': 'str',
        'timeout': 'int',
        'proxies': 'list[str]',
        'recognizers': 'dict(str, ask_sdk_model.services.game_engine.recognizer.Recognizer)',
        'events': 'dict(str, ask_sdk_model.services.game_engine.event.Event)'
    }  # type: Dict

    attribute_map = {
        'object_type': 'type',
        'timeout': 'timeout',
        'proxies': 'proxies',
        'recognizers': 'recognizers',
        'events': 'events'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, timeout=None, proxies=None, recognizers=None, events=None):
        # type: (Optional[int], Optional[List[object]], Optional[Dict[str, Recognizer]], Optional[Dict[str, Event]]) -> None
        """

        :param timeout: The maximum run time for this Input Handler, in milliseconds. Although this parameter is required, you can specify events with conditions on which to end the Input Handler earlier.
        :type timeout: (optional) int
        :param proxies: Names for unknown gadget IDs to use in recognizers, allocated on a first-come, first-served basis.
        :type proxies: (optional) list[str]
        :param recognizers: Conditions that, at any moment, are either true or false. You use recognizers when you specify the conditions under which your skill is notified of Echo Button input. 
        :type recognizers: (optional) dict(str, ask_sdk_model.services.game_engine.recognizer.Recognizer)
        :param events: The logic that determines when your skill is notified of Echo Button input. Events are listed here as object keys, where the keys specify the name of an event. 
        :type events: (optional) dict(str, ask_sdk_model.services.game_engine.event.Event)
        """
        self.__discriminator_value = "GameEngine.StartInputHandler"  # type: str

        self.object_type = self.__discriminator_value
        super(StartInputHandlerDirective, self).__init__(object_type=self.__discriminator_value)
        self.timeout = timeout
        self.proxies = proxies
        self.recognizers = recognizers
        self.events = events

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
        if not isinstance(other, StartInputHandlerDirective):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
