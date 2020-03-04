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

if typing.TypeVar:
    from typing import TypeVar, List, Tuple, Optional
    T = TypeVar('T')


class ServiceException(Exception):
    """Exception thrown by a Service client when an error response was received or some operation failed.

    :param message: Description of the error
    :type message: str
    :param status_code: Status code of the HTTP Response
    :type status_code: int
    :param headers: Headers of the Http response that return the failure
    :type headers: list(tuple(str, str))
    :param body: Body of the HTTP Response
    :type body: object
    """

    def __init__(self, message, status_code, headers, body):
        # type: (str, int, Optional[List[Tuple[str, str]]], Optional[T]) -> None
        """
        Exception thrown by a Service client when an error response was received or some operation failed.

        :param message: Description of the error
        :type message: str
        :param status_code: Status code of the HTTP Response
        :type status_code: int
        :param headers: Headers of the Http response that return the failure
        :type headers: list(tuple(str, str))
        :param body: Body of the HTTP Response
        :type body: object
        """
        super(ServiceException, self).__init__(message)

        self.status_code = status_code
        self.headers = headers
        self.body = body


