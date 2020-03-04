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

from .api_client_message import ApiClientMessage

if typing.TYPE_CHECKING:
    from typing import List, Tuple


class ApiClientResponse(ApiClientMessage):
    """Represents a response returned by :py:class:`ask_sdk_model.services.api_client.ApiClient` implementation to a Service Client.

    :param headers: List of header tuples
    :type headers: list[tuple[str, str]]
    :param body: Body of the message
    :type body: str
    :param status_code: Status code of the response
    :type status_code: int
    """

    def __init__(self, headers=None, body=None, status_code=None):
        # type: (List[Tuple[str, str]], str, int) -> None
        """Represents a response returned by :py:class:`ask_sdk_model.services.api_client.ApiClient` implementation to a Service Client.

        :param headers: List of header tuples
        :type headers: list[tuple[str, str]]
        :param body: Body of the message
        :type body: str
        :param status_code: Status code of the response
        :type status_code: int
        """
        super(ApiClientResponse, self).__init__(headers=headers, body=body)
        self.status_code = status_code
