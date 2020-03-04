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
    from typing import List, Tuple


class ApiClientMessage(object):
    """Represents the interface between :py:class:`ask_sdk_model.services.api_client.ApiClient` implementation and a Service Client.

    :param headers: List of header tuples
    :type headers: list[tuple[str, str]]
    :param body: Body of the message
    :type body: str
    """

    def __init__(self, headers=None, body=None):
        # type: (List[Tuple[str, str]], str) -> None
        """Represents the interface between :py:class:`ask_sdk_model.services.api_client.ApiClient` implementation and a Service Client.

        :param headers: List of header tuples
        :type headers: list[tuple[str, str]]
        :param body: Body of the message
        :type body: str
        """
        if headers is None:
            headers = []
        self.headers = headers
        self.body = body
