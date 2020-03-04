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

import sys
import os
import re
import six
import typing

from ask_sdk_model.services.base_service_client import BaseServiceClient
from ask_sdk_model.services.api_configuration import ApiConfiguration
from ask_sdk_model.services.service_client_response import ServiceClientResponse
from ask_sdk_model.services.api_response import ApiResponse
from ask_sdk_model.services.utils import user_agent_info



if typing.TYPE_CHECKING:
    from typing import Dict, List, Union, Any
    from datetime import datetime
    from ask_sdk_model.services.endpoint_enumeration.endpoint_enumeration_response import EndpointEnumerationResponse
    from ask_sdk_model.services.endpoint_enumeration.error import Error


class EndpointEnumerationServiceClient(BaseServiceClient):
    """ServiceClient for calling the EndpointEnumerationService APIs.

    :param api_configuration: Instance of ApiConfiguration
    :type api_configuration: ask_sdk_model.services.api_configuration.ApiConfiguration
    """
    def __init__(self, api_configuration, custom_user_agent=None):
        # type: (ApiConfiguration, str) -> None
        """
        :param api_configuration: Instance of :py:class:`ask_sdk_model.services.api_configuration.ApiConfiguration`
        :type api_configuration: ask_sdk_model.services.api_configuration.ApiConfiguration
        :param custom_user_agent: Custom User Agent string provided by the developer.
        :type custom_user_agent: str
        """
        super(EndpointEnumerationServiceClient, self).__init__(api_configuration)
        self.user_agent = user_agent_info(sdk_version="1.0.0", custom_user_agent=custom_user_agent)

    def get_endpoints(self, **kwargs):
        # type: (**Any) -> Union[ApiResponse, EndpointEnumerationResponse, Error]
        """
        This API is invoked by the skill to retrieve endpoints connected to the Echo device. 

        :param full_response: Boolean value to check if response should contain headers and status code information.
            This value had to be passed through keyword arguments, by default the parameter value is set to False. 
        :type full_response: boolean
        :rtype: Union[ApiResponse, EndpointEnumerationResponse, Error]
        """
        operation_name = "get_endpoints"
        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            params[key] = val
        del params['kwargs']

        resource_path = '/v1/endpoints/'
        resource_path = resource_path.replace('{format}', 'json')

        path_params = {}  # type: Dict

        query_params = []  # type: List

        header_params = []  # type: List

        body_params = None
        header_params.append(('Content-type', 'application/json'))
        header_params.append(('User-Agent', self.user_agent))

        # Response Type
        full_response = False
        if 'full_response' in params:
            full_response = params['full_response']

        # Authentication setting
        authorization_value = "Bearer " + self._authorization_value
        header_params.append(("Authorization", authorization_value))

        error_definitions = []  # type: List
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.endpoint_enumeration.endpoint_enumeration_response.EndpointEnumerationResponse", status_code=200, message="Successfully retrieved the list of connected endpoints."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.endpoint_enumeration.error.Error", status_code=400, message="Bad request. Returned when a required parameter is not present or badly formatted."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.endpoint_enumeration.error.Error", status_code=401, message="Unauthenticated. Returned when the request is not authenticated."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.endpoint_enumeration.error.Error", status_code=403, message="Forbidden. Returned when the request is authenticated but does not have sufficient permission."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.endpoint_enumeration.error.Error", status_code=500, message="Server Error. Returned when the server encountered an error processing the request."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.endpoint_enumeration.error.Error", status_code=503, message="Service Unavailable. Returned when the server is not ready to handle the request."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.endpoint_enumeration.error.Error", status_code=0, message="Unexpected error"))

        api_response = self.invoke(
            method="GET",
            endpoint=self._api_endpoint,
            path=resource_path,
            path_params=path_params,
            query_params=query_params,
            header_params=header_params,
            body=body_params,
            response_definitions=error_definitions,
            response_type="ask_sdk_model.services.endpoint_enumeration.endpoint_enumeration_response.EndpointEnumerationResponse")

        if full_response:
            return api_response
        return api_response.body
