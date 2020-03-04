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
from ask_sdk_model.interfaces.connections.requests.base_request import BaseRequest


if typing.TYPE_CHECKING:
    from typing import Dict, List, Optional, Union
    from datetime import datetime


class PrintImageRequest(BaseRequest):
    """
    Payload Request object for PrintImage


    :param version: version of the request
    :type version: (optional) str
    :param title: title of the image
    :type title: (optional) str
    :param url: url of the image
    :type url: (optional) str
    :param description: description of the image
    :type description: (optional) str
    :param image_type: type of the image
    :type image_type: (optional) str

    """
    deserialized_types = {
        'object_type': 'str',
        'version': 'str',
        'title': 'str',
        'url': 'str',
        'description': 'str',
        'image_type': 'str'
    }  # type: Dict

    attribute_map = {
        'object_type': '@type',
        'version': '@version',
        'title': 'title',
        'url': 'url',
        'description': 'description',
        'image_type': 'imageType'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, version=None, title=None, url=None, description=None, image_type=None):
        # type: (Optional[str], Optional[str], Optional[str], Optional[str], Optional[str]) -> None
        """Payload Request object for PrintImage

        :param version: version of the request
        :type version: (optional) str
        :param title: title of the image
        :type title: (optional) str
        :param url: url of the image
        :type url: (optional) str
        :param description: description of the image
        :type description: (optional) str
        :param image_type: type of the image
        :type image_type: (optional) str
        """
        self.__discriminator_value = "PrintImageRequest"  # type: str

        self.object_type = self.__discriminator_value
        super(PrintImageRequest, self).__init__(object_type=self.__discriminator_value, version=version)
        self.title = title
        self.url = url
        self.description = description
        self.image_type = image_type

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
        if not isinstance(other, PrintImageRequest):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
