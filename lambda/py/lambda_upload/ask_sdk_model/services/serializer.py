# -*- coding: utf-8 -*-
#
# Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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
import typing
from abc import ABCMeta, abstractmethod

if typing.TYPE_CHECKING:
    from typing import TypeVar, Optional, Union
    T = TypeVar('T')


class Serializer(object):
    """Represents an abstract object used for Serialization tasks"""
    __metaclass__ = ABCMeta

    @abstractmethod
    def serialize(self, obj):
        # type: (T) -> str
        """Serializes an object into a string.

        :param obj: object to serialize
        :return: serialized object in string format
        :rtype: str
        """
        pass

    @abstractmethod
    def deserialize(self, payload, obj_type):
        # type: (Optional[str], Union[str,T]) -> T
        """Deserializes the payload to object of provided obj_type.

        :param payload: String to deserialize
        :type payload: str
        :param obj_type: Target type of deserialization
        :type obj_type: object
        :return: Deserialized object
        :rtype: object
        """
        pass
