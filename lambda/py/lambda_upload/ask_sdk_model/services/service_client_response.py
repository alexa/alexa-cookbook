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

if typing.TYPE_CHECKING:
    from typing import TypeVar
    T = TypeVar('T')


class ServiceClientResponse(object):
    """Represents a well-known response object by Service Client.

    :param response_type: Well-known representation of the response
    :type response_type: Response class
    :param status_code: Status code to be attached to the response
    :type status_code: int
    :param message: Message to be attached to the response
    :type message: str
    """

    def __init__(self, response_type, status_code, message):
        # type: (T, int, str) -> None
        """
        Represents a well-known response object by Service Client.

        :param response_type: Well-known representation of the response
        :type response_type: Response class
        :param status_code: Status code to be attached to the response
        :type status_code: int
        :param message: Message to be attached to the response
        :type message: str
        """
        self.response_type = response_type
        self.status_code = status_code
        self.message = message
