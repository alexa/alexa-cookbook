# -*- coding: utf-8 -*-
#
# Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License"). You may
# not use this file except in compliance with the License. A copy of the
# License is located at
#
# http://aws.amazon.com/apache2.0/
#
# or in the "license" file accompanying this file. This file is distributed
# on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
# express or implied. See the License for the specific language governing
# permissions and limitations under the License.
#
import typing

if typing.TYPE_CHECKING:
    from typing import List, Tuple


class ApiResponse(object):
    """Represents a response returned by the Service Client.

    :param headers: List of header tuples
    :type headers: list[tuple[str, str]]
    :param body: Body of the response
    :type body: object
    :param status_code: Status code of the response
    :type status_code: int
    """

    def __init__(self, headers=None, body=None, status_code=None):
        # type: (List[Tuple[str, str]], object, int) -> None
        """Represents a response returned by the Service Client.

        :param headers: List of header tuples
        :type headers: list[tuple[str, str]]
        :param body: Body of the response
        :type body: object
        :param status_code: Status code of the response
        :type status_code: int
        """
        if headers is None:
            headers = []
        self.headers = headers
        self.body = body
        self.status_code = status_code
