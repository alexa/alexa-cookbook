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
    from .serializer import Serializer
    from .api_client import ApiClient


class ApiConfiguration(object):
    """Represents a class that provides API configuration options needed by service clients.

    :param serializer: serializer implementation for encoding/decoding JSON from/to Object models.
    :type serializer: (optional) ask_sdk_model.services.serializer.Serializer
    :param api_client: API Client implementation
    :type api_client: (optional) ask_sdk_model.services.api_client.ApiClient
    :param authorization_value: Authorization value to be used on any calls of the service client instance
    :type authorization_value: (optional) str
    :param api_endpoint: Endpoint to hit by the service client instance
    :type api_endpoint: (optional) str
    """

    def __init__(self, serializer=None, api_client=None, authorization_value=None, api_endpoint=None):
        # type: (Serializer, ApiClient, str, str) -> None
        """Represents a class that provides API configuration options needed by service clients.

        :param serializer: serializer implementation for encoding/decoding JSON from/to Object models.
        :type serializer: (optional) ask_sdk_model.services.serializer.Serializer
        :param api_client: API Client implementation
        :type api_client: (optional) ask_sdk_model.services.api_client.ApiClient
        :param authorization_value: Authorization value to be used on any calls of the service client instance
        :type authorization_value: (optional) str
        :param api_endpoint: Endpoint to hit by the service client instance
        :type api_endpoint: (optional) str
        """
        self.serializer = serializer
        self.api_client = api_client
        self.authorization_value = authorization_value
        self.api_endpoint = api_endpoint
