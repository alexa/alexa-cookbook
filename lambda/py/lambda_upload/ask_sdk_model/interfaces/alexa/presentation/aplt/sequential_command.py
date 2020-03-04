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
from ask_sdk_model.interfaces.alexa.presentation.aplt.command import Command


if typing.TYPE_CHECKING:
    from typing import Dict, List, Optional, Union
    from datetime import datetime
    from ask_sdk_model.interfaces.alexa.presentation.aplt.command import Command


class SequentialCommand(Command):
    """
    A sequential command executes a series of commands in order. The sequential command executes the command list in order, waiting for the previous command to finish before executing the next. The sequential command is finished when all of its child commands have finished. When the Sequential command is terminated early, the currently executing command is terminated and no further commands are executed.


    :param delay: The delay in milliseconds before this command starts executing; must be non-negative. Defaults to 0.
    :type delay: (optional) int
    :param description: A user-provided description of this command.
    :type description: (optional) str
    :param screen_lock: If true, disable the Interaction Timer.
    :type screen_lock: (optional) bool
    :param when: A conditional expression to be evaluated in device. If false, the execution of the command is skipped. Defaults to true.
    :type when: (optional) bool
    :param catch: An ordered list of commands to execute if this sequence is prematurely terminated.
    :type catch: (optional) list[ask_sdk_model.interfaces.alexa.presentation.aplt.command.Command]
    :param commands: An array of commands to execute. The commands execute in order; each command must finish before the next can begin. Please note that the delay of sequential command and the delay of the first command in the sequence are additive.
    :type commands: (optional) list[ask_sdk_model.interfaces.alexa.presentation.aplt.command.Command]
    :param object_finally: An ordered list of commands to execute after the normal commands and the catch commands.
    :type object_finally: (optional) list[ask_sdk_model.interfaces.alexa.presentation.aplt.command.Command]
    :param repeat_count: The number of times to repeat this series of commands. Defaults to 0. Negative values will be ignored. Note that the delay assigned to overall sequential command only applies the first time. For example, in the sample sequential command below the first SendEvent fires at 3000 milliseconds, the second at 5000, the first SendEvent fires again at 7000 milliseconds, and so forth. {\&quot;type\&quot;: \&quot;Sequential\&quot;,\&quot;delay\&quot;: 1000,\&quot;repeatCount\&quot;: 2,\&quot;commands\&quot;: [{ \&quot;type\&quot;: \&quot;SendEvent\&quot;,\&quot;delay\&quot;: 2000},{\&quot;type\&quot;: \&quot;SendEvent\&quot;,\&quot;delay\&quot;: 2000}]}
    :type repeat_count: (optional) int

    """
    deserialized_types = {
        'object_type': 'str',
        'delay': 'int',
        'description': 'str',
        'screen_lock': 'bool',
        'when': 'bool',
        'catch': 'list[ask_sdk_model.interfaces.alexa.presentation.aplt.command.Command]',
        'commands': 'list[ask_sdk_model.interfaces.alexa.presentation.aplt.command.Command]',
        'object_finally': 'list[ask_sdk_model.interfaces.alexa.presentation.aplt.command.Command]',
        'repeat_count': 'int'
    }  # type: Dict

    attribute_map = {
        'object_type': 'type',
        'delay': 'delay',
        'description': 'description',
        'screen_lock': 'screenLock',
        'when': 'when',
        'catch': 'catch',
        'commands': 'commands',
        'object_finally': 'finally',
        'repeat_count': 'repeatCount'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, delay=None, description=None, screen_lock=None, when=None, catch=None, commands=None, object_finally=None, repeat_count=None):
        # type: (Optional[int], Optional[str], Optional[bool], Union[bool, str, None], Optional[List[Command]], Optional[List[Command]], Optional[List[Command]], Union[int, str, None]) -> None
        """A sequential command executes a series of commands in order. The sequential command executes the command list in order, waiting for the previous command to finish before executing the next. The sequential command is finished when all of its child commands have finished. When the Sequential command is terminated early, the currently executing command is terminated and no further commands are executed.

        :param delay: The delay in milliseconds before this command starts executing; must be non-negative. Defaults to 0.
        :type delay: (optional) int
        :param description: A user-provided description of this command.
        :type description: (optional) str
        :param screen_lock: If true, disable the Interaction Timer.
        :type screen_lock: (optional) bool
        :param when: A conditional expression to be evaluated in device. If false, the execution of the command is skipped. Defaults to true.
        :type when: (optional) bool
        :param catch: An ordered list of commands to execute if this sequence is prematurely terminated.
        :type catch: (optional) list[ask_sdk_model.interfaces.alexa.presentation.aplt.command.Command]
        :param commands: An array of commands to execute. The commands execute in order; each command must finish before the next can begin. Please note that the delay of sequential command and the delay of the first command in the sequence are additive.
        :type commands: (optional) list[ask_sdk_model.interfaces.alexa.presentation.aplt.command.Command]
        :param object_finally: An ordered list of commands to execute after the normal commands and the catch commands.
        :type object_finally: (optional) list[ask_sdk_model.interfaces.alexa.presentation.aplt.command.Command]
        :param repeat_count: The number of times to repeat this series of commands. Defaults to 0. Negative values will be ignored. Note that the delay assigned to overall sequential command only applies the first time. For example, in the sample sequential command below the first SendEvent fires at 3000 milliseconds, the second at 5000, the first SendEvent fires again at 7000 milliseconds, and so forth. {\&quot;type\&quot;: \&quot;Sequential\&quot;,\&quot;delay\&quot;: 1000,\&quot;repeatCount\&quot;: 2,\&quot;commands\&quot;: [{ \&quot;type\&quot;: \&quot;SendEvent\&quot;,\&quot;delay\&quot;: 2000},{\&quot;type\&quot;: \&quot;SendEvent\&quot;,\&quot;delay\&quot;: 2000}]}
        :type repeat_count: (optional) int
        """
        self.__discriminator_value = "Sequential"  # type: str

        self.object_type = self.__discriminator_value
        super(SequentialCommand, self).__init__(object_type=self.__discriminator_value, delay=delay, description=description, screen_lock=screen_lock, when=when)
        self.catch = catch
        self.commands = commands
        self.object_finally = object_finally
        self.repeat_count = repeat_count

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
        if not isinstance(other, SequentialCommand):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
