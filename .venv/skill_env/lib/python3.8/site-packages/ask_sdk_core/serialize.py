# -*- coding: utf-8 -*-
#
# Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights
# Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License").
# You may not use this file except in compliance with the License.
# A copy of the License is located at
#
# http://aws.amazon.com/apache2.0/
#
# or in the "license" file accompanying this file. This file is
# distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
# OF ANY KIND, either express or implied. See the License for the
# specific language governing permissions and limitations under the
# License.
#
import sys
import re
import json
import typing
import decimal
from datetime import date, datetime

from six import iteritems
from six import text_type
from six import integer_types
from enum import Enum

from typing import cast, Any

from ask_sdk_model.services import Serializer

from .exceptions import SerializationException

unicode_type = text_type

try:
    long  # type: ignore
except NameError:
    long = int

if typing.TYPE_CHECKING:
    from typing import (
        TypeVar, Dict, List, Tuple, Union, Any, Optional)
    T = TypeVar('T')


class DefaultSerializer(Serializer):
    PRIMITIVE_TYPES = (float, bool, bytes, text_type) + integer_types
    NATIVE_TYPES_MAPPING = {
        'int': int,
        'long': long,
        'float': float,
        'str': str,
        'bool': bool,
        'date': date,
        'datetime': datetime,
        'object': object,
    }

    def serialize(self, obj):  # type: ignore
        # type: (Any) -> Union[Dict[str, Any], List, Tuple, str, int, float, bytes, None]
        """Builds a serialized object.

        * If obj is None, return None.
        * If obj is str, int, long, float, bool, return directly.
        * If obj is datetime.datetime, datetime.date convert to
          string in iso8601 format.
        * If obj is list, serialize each element in the list.
        * If obj is dict, return the dict with serialized values.
        * If obj is ask sdk model, return the dict with keys resolved
          from the union of model's ``attribute_map`` and
          ``deserialized_types`` and values serialized based on
          ``deserialized_types``.
        * If obj is a generic class instance, return the dict with keys
          from instance's ``deserialized_types`` and values serialized
          based on ``deserialized_types``.

        :param obj: The data to serialize.
        :type obj: object
        :return: The serialized form of data.
        :rtype: Union[Dict[str, Any], List, Tuple, str, int, float, bytes, None]
        """
        if obj is None:
            return None
        elif isinstance(obj, self.PRIMITIVE_TYPES):
            return obj
        elif isinstance(obj, list):
            return [self.serialize(sub_obj) for sub_obj in obj]
        elif isinstance(obj, tuple):
            return tuple(self.serialize(sub_obj) for sub_obj in obj)
        elif isinstance(obj, (datetime, date)):
            return obj.isoformat()
        elif isinstance(obj, Enum):
            return obj.value
        elif isinstance(obj, decimal.Decimal):
            if obj % 1 == 0:
                return int(obj)
            else:
                return float(obj)

        if isinstance(obj, dict):
            obj_dict = obj
        else:
            # Convert model obj to dict
            # All the non null attributes under `deserialized_types`
            # map are considered for serialization.
            # The `attribute_map` provides the key names to be used
            # in the dict. In case of missing `attribute_map` mapping,
            # the original attribute name is retained as the key name.
            class_attribute_map = getattr(obj, 'attribute_map', {})
            class_attribute_map.update(
                {
                    k: k for k in obj.deserialized_types.keys()
                    if k not in class_attribute_map
                }
            )

            obj_dict = {
                class_attribute_map[attr]: getattr(obj, attr)
                for attr, _ in iteritems(obj.deserialized_types)
                if getattr(obj, attr) is not None
            }

        return {key: self.serialize(val) for key, val in iteritems(obj_dict)}

    def deserialize(self, payload, obj_type):
        # type: (Optional[str], Union[T, str]) -> Any
        """Deserializes payload into an instance of provided ``obj_type``.

        The ``obj_type`` parameter can be a primitive type, a generic
        model object or a list / dict of model objects.

        The list or dict object type has to be provided as a string
        format. For eg:

        * ``'list[a.b.C]'`` if the payload is a list of instances of
          class ``a.b.C``.
        * ``'dict(str, a.b.C)'`` if the payload is a dict containing
          mappings of ``str : a.b.C`` class instance types.

        The method looks for a ``deserialized_types`` dict in the model
        class, that mentions which payload values has to be
        deserialized. In case the payload key names are different than
        the model attribute names, the corresponding mapping can be
        provided in another special dict ``attribute_map``. The model
        class should also have the ``__init__`` method with default
        values for arguments. Check
        :py:class:`ask_sdk_model.request_envelope.RequestEnvelope`
        source code for an example implementation.

        :param payload: data to be deserialized.
        :type payload: str
        :param obj_type: resolved class name for deserialized object
        :type obj_type: Union[object, str]
        :return: deserialized object
        :rtype: object
        :raises: :py:class:`ask_sdk_core.exceptions.SerializationException`
        """
        if payload is None:
            return None

        try:
            payload = json.loads(payload)
        except Exception:
            raise SerializationException(
                "Couldn't parse response body: {}".format(payload))

        return self.__deserialize(payload, obj_type)

    def __deserialize(self, payload, obj_type):
        # type: (Optional[str], Union[T, str]) -> Any
        """Deserializes payload into a model object.

        :param payload: data to be deserialized.
        :type payload: str
        :param obj_type: resolved class name for deserialized object
        :type obj_type: Union[object, str]
        :return: deserialized object
        :rtype: object
        """
        if payload is None:
            return None

        if isinstance(obj_type, str):
            if obj_type.startswith('list['):
                # Get object type for each item in the list
                # Deserialize each item using the object type.
                sub_obj_type =  re.match(
                    'list\[(.*)\]', obj_type)
                if sub_obj_type is None:
                    return []
                sub_obj_types = sub_obj_type.group(1)
                deserialized_list = []  # type: List
                if "," in sub_obj_types:
                    # list contains objects of different types
                    for sub_payload, sub_obj_types in zip(
                            payload, sub_obj_types.split(",")):
                        deserialized_list.append(self.__deserialize(
                            sub_payload, sub_obj_types.strip()))
                else:
                    for sub_payload in payload:
                        deserialized_list.append(self.__deserialize(
                            sub_payload, sub_obj_types.strip()))
                return deserialized_list

            if obj_type.startswith('dict('):
                # Get object type for each k,v pair in the dict
                # Deserialize each value using the object type of v.
                sub_obj_type = re.match(
                    'dict\(([^,]*), (.*)\)', obj_type)
                if sub_obj_type is None:
                    return {}
                sub_obj_types = sub_obj_type.group(2)
                return {
                    k: self.__deserialize(v, sub_obj_types)
                    for k, v in iteritems(cast(Any, payload))
                }
            # convert str to class
            if obj_type in self.NATIVE_TYPES_MAPPING:
                obj_type = self.NATIVE_TYPES_MAPPING[obj_type]  # type: ignore
            else:
                # deserialize models
                obj_type = self.__load_class_from_name(obj_type)

        if obj_type in self.PRIMITIVE_TYPES:
            return self.__deserialize_primitive(payload, obj_type)
        elif obj_type == object:
            return payload
        elif obj_type == date:
            return self.__deserialize_datetime(payload, obj_type)
        elif obj_type == datetime:
            return self.__deserialize_datetime(payload, obj_type)
        else:
            return self.__deserialize_model(payload, obj_type)

    def __load_class_from_name(self, class_name):
        # type: (str) -> T
        """Load the class from the ``class_name`` provided.

        Resolve the class name from the ``class_name`` provided, load
        the class on path and return the resolved class. If the module
        information is not provided in the ``class_name``, then look
        for the class on sys ``modules``.

        :param class_name: absolute class name to be loaded
        :type class_name: str
        :return: Resolved class reference
        :rtype: object
        :raises: :py:class:`ask_sdk_core.exceptions.SerializationException`
        """
        try:
            module_class_list = class_name.rsplit(".", 1)
            if len(module_class_list) > 1:
                module_name = module_class_list[0]
                resolved_class_name = module_class_list[1]
                module = __import__(
                    module_name, fromlist=[resolved_class_name])
                resolved_class = getattr(module, resolved_class_name)
            else:
                resolved_class_name = module_class_list[0]
                resolved_class = getattr(
                    sys.modules[__name__], resolved_class_name)
            return resolved_class
        except Exception as e:
            raise SerializationException(
                "Unable to resolve class {} from installed "
                "modules: {}".format(class_name, str(e)))

    def __deserialize_primitive(self, payload, obj_type):
        # type: (str, Union[T, str]) -> Any
        """Deserialize primitive datatypes.

        :param payload: data to be deserialized
        :type payload: str
        :param obj_type: primitive datatype str
        :type obj_type: Union[object, str]
        :return: deserialized primitive datatype object
        :rtype: object
        :raises: :py:class:`ask_sdk_core.exceptions.SerializationException`
        """
        obj_cast = cast(Any, obj_type)
        try:
            return obj_cast(payload)
        except UnicodeEncodeError:
            return unicode_type(payload)
        except TypeError:
            return payload
        except ValueError:
            raise SerializationException(
                "Failed to parse {} into '{}' object".format(
                    payload, obj_cast.__name__))

    def __deserialize_datetime(self, payload, obj_type):
        # type: (str, Union[T, str]) -> Any
        """Deserialize datetime instance in ISO8601 format to
        date/datetime object.

        :param payload: data to be deserialized in ISO8601 format
        :type payload: str
        :param obj_type: primitive datatype str
        :type obj_type: Union[object, str]
        :return: deserialized primitive datatype object
        :rtype: object
        :raises: :py:class:`ask_sdk_core.exceptions.SerializationException`
        """
        obj_cast = cast(Any, obj_type)
        try:
            from dateutil.parser import parse
            parsed_datetime = parse(payload)
            if obj_type is date:
                return parsed_datetime.date()
            else:
                return parsed_datetime
        except ImportError:
            return payload
        except ValueError:
            raise SerializationException(
                "Failed to parse {} into '{}' object".format(
                    payload, obj_cast.__name__))

    def __deserialize_model(self, payload, obj_type):
        # type: (str, Union[T, str]) -> Any
        """Deserialize instance to model object.

        :param payload: data to be deserialized
        :type payload: str
        :param obj_type: sdk model class
        :type obj_type: Union[object, str]
        :return: deserialized sdk model object
        :rtype: object
        :raises: :py:class:`ask_sdk_core.exceptions.SerializationException`
        """
        try:
            obj_cast = cast(Any, obj_type)
            if issubclass(obj_cast, Enum):
                return obj_cast(payload)

            if hasattr(obj_cast, 'deserialized_types'):
                if hasattr(obj_cast, 'get_real_child_model'):
                    obj_cast = self.__get_obj_by_discriminator(
                        payload, obj_cast)

                class_deserialized_types = obj_cast.deserialized_types
                class_attribute_map = getattr(obj_cast, 'attribute_map', {})
                class_attribute_map.update(
                    {
                        k: k for k in obj_cast.deserialized_types.keys()
                        if k not in class_attribute_map
                    }
                )

                deserialized_model = obj_cast()
                for class_param_name, payload_param_name in iteritems(
                        class_attribute_map):
                    if payload_param_name in payload:
                        setattr(
                            deserialized_model,
                            class_param_name,
                            self.__deserialize(
                                payload[payload_param_name],
                                class_deserialized_types[class_param_name]))

                additional_params = [
                    param for param in payload
                    if param not in class_attribute_map.values()]

                for add_param in additional_params:
                    setattr(deserialized_model, add_param, payload[cast(Any,add_param)])
                return deserialized_model
            else:
                return payload
        except Exception as e:
            raise SerializationException(str(e))

    def __get_obj_by_discriminator(self, payload, obj_type):
        # type: (str, Union[T, str]) -> T
        """Get correct subclass instance using the discriminator in
        payload.

        :param payload: Payload for deserialization
        :type payload: str
        :param obj_type: parent class for deserializing payload into
        :type obj_type: Union[object, str]
        :return: Subclass of provided parent class, that resolves to
            the discriminator in payload.
        :rtype: object
        :raises: :py:class:`ask_sdk_core.exceptions.SerializationException`
        """
        obj_cast = cast(Any, obj_type)
        namespaced_class_name = obj_cast.get_real_child_model(payload)
        if not namespaced_class_name:
            raise SerializationException(
                "Couldn't resolve object by discriminator type "
                "for {} class".format(obj_type))

        return self.__load_class_from_name(namespaced_class_name)
