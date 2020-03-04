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
import typing
import requests
import six
import json

from urllib3.util import parse_url

from ask_sdk_model.services import ApiClient, ApiClientResponse

from .exceptions import ApiClientException

if typing.TYPE_CHECKING:
    from typing import Callable, Dict, List, Tuple, Optional
    from ask_sdk_model.services import ApiClientRequest


class DefaultApiClient(ApiClient):
    """Default ApiClient implementation of
    :py:class:`ask_sdk_model.services.api_client.ApiClient` using the
    `requests` library.
    """

    def invoke(self, request):
        # type: (ApiClientRequest) -> ApiClientResponse
        """Dispatches a request to an API endpoint described in the
        request.

        Resolves the method from input request object, converts the
        list of header tuples to the required format (dict) for the
        `requests` lib call and invokes the method with corresponding
        parameters on `requests` library. The response from the call is
        wrapped under the `ApiClientResponse` object and the
        responsibility of translating a response code and response/
        error lies with the caller.

        :param request: Request to dispatch to the ApiClient
        :type request: ApiClientRequest
        :return: Response from the client call
        :rtype: ApiClientResponse
        :raises: :py:class:`ask_sdk_core.exceptions.ApiClientException`
        """
        try:
            http_method = self._resolve_method(request)
            http_headers = self._convert_list_tuples_to_dict(
                headers_list=request.headers)

            parsed_url = parse_url(request.url)
            if parsed_url.scheme is None or parsed_url.scheme != "https":
                raise ApiClientException(
                    "Requests against non-HTTPS endpoints are not allowed.")

            raw_data = None  # type: Optional[str]
            if request.body:
                body_content_type = http_headers.get("Content-type", None)
                if (body_content_type is not None and
                        "json" in body_content_type):
                    raw_data = json.dumps(request.body)
                else:
                    raw_data = request.body

            http_response = http_method(
                url=request.url, headers=http_headers, data=raw_data)

            return ApiClientResponse(
                headers=self._convert_dict_to_list_tuples(
                    http_response.headers),
                status_code=http_response.status_code,
                body=http_response.text)
        except Exception as e:
            raise ApiClientException(
                "Error executing the request: {}".format(str(e)))

    def _resolve_method(self, request):
        # type: (ApiClientRequest) -> Callable
        """Resolve the method from request object to `requests` http
        call.

        :param request: Request to dispatch to the ApiClient
        :type request: ApiClientRequest
        :return: The HTTP method that maps to the request call.
        :rtype: Callable
        :raises :py:class:`ask_sdk_core.exceptions.ApiClientException`
            if invalid http request method is being called
        """
        try:
            if request.method is not None:
                return getattr(requests, request.method.lower())
            else:
                raise ApiClientException(
            "Invalid request method: {}".format(request.method))
        except AttributeError:
            raise ApiClientException(
                "Invalid request method: {}".format(request.method))

    def _convert_list_tuples_to_dict(self, headers_list):
        # type: (List[Tuple[str, str]]) -> Dict[str, str]
        """Convert list of tuples from headers of request object to
        dictionary format.

        :param headers_list: List of tuples made up of two element
            strings from `ApiClientRequest` headers variable
        :type headers_list: List[Tuple[str, str]]
        :return: Dictionary of headers in keys as strings and values
            as comma separated strings
        :rtype: Dict[str, str]
        """
        headers_dict = {}  # type: Dict
        if headers_list is not None:
            for header_tuple in headers_list:
                key, value = header_tuple[0], header_tuple[1]
                if key in headers_dict:
                    headers_dict[key] = "{}, {}".format(
                        headers_dict[key], value)
                else:
                    headers_dict[header_tuple[0]] = value
        return headers_dict

    def _convert_dict_to_list_tuples(self, headers_dict):
        # type: (Dict[str, str]) -> List[Tuple[str, str]]
        """Convert headers dict to list of string tuples format for
        `ApiClientResponse` headers variable.

        :param headers_dict: Dictionary of headers in keys as strings
            and values as comma separated strings
        :type headers_dict: Dict[str, str]
        :return: List of tuples made up of two element strings from
            headers of client response
        :rtype: List[Tuple[str, str]]
        """
        headers_list = []
        if headers_dict is not None:
            for key, values in six.iteritems(headers_dict):
                for value in values.split(","):
                    value = value.strip()
                    if value is not None and value != '':
                        headers_list.append((key, value.strip()))
        return headers_list
