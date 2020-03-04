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
    from .api_client_request import ApiClientRequest
    from .api_client_response import ApiClientResponse


class ApiClient(object):
    """Represents a basic contract for API request invocation."""
    __metaclass__ = ABCMeta

    @abstractmethod
    def invoke(self, request):
        # type: (ApiClientRequest) -> ApiClientResponse
        """Dispatches a request to an API endpoint described in the request.

        The ApiClient is expected to resolve in the case an API returns
        a non-200 HTTP status code. The responsibility of translating a
        particular response code to an error lies with the caller.

        :param request: Request to dispatch to the ApiClient
        :type request: ApiClientRequest
        :return: Response from the client call
        :rtype: ApiClientResponse
        """
        pass
