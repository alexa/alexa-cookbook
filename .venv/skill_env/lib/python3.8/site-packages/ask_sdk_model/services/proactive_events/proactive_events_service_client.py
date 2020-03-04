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

from ask_sdk_model.services.authentication_configuration import AuthenticationConfiguration
from ask_sdk_model.services.lwa.lwa_client import LwaClient
from ask_sdk_model.services.proactive_events.skill_stage import SkillStage


if typing.TYPE_CHECKING:
    from typing import Dict, List, Union, Any
    from datetime import datetime
    from ask_sdk_model.services.proactive_events.error import Error
    from ask_sdk_model.services.proactive_events.create_proactive_event_request import CreateProactiveEventRequest


class ProactiveEventsServiceClient(BaseServiceClient):
    """ServiceClient for calling the ProactiveEventsService APIs.

    :param api_configuration: Instance of ApiConfiguration
    :type api_configuration: ask_sdk_model.services.api_configuration.ApiConfiguration
    """
    def __init__(self, api_configuration, authentication_configuration, lwa_client=None, custom_user_agent=None):
        # type: (ApiConfiguration, AuthenticationConfiguration, LwaClient, str) -> None
        """
        :param api_configuration: Instance of :py:class:`ask_sdk_model.services.api_configuration.ApiConfiguration`
        :type api_configuration: ask_sdk_model.services.api_configuration.ApiConfiguration
        :param authentication_configuration: Instance of :py:class:`ask_sdk_model.services.authentication_configuration.AuthenticationConfiguration`
        :type api_configuration: ask_sdk_model.services.authentication_configuration.AuthenticationConfiguration
        :param lwa_client: (Optional) Instance of :py:class:`ask_sdk_model.services.lwa.LwaClient`,
            can be passed when the LwaClient configuration is different from the authentication 
            and api configuration passed
        :type lwa_client: ask_sdk_model.services.lwa.LwaClient
        :param custom_user_agent: Custom User Agent string provided by the developer.
        :type custom_user_agent: str
        """
        super(ProactiveEventsServiceClient, self).__init__(api_configuration)
        self.user_agent = user_agent_info(sdk_version="1.0.0", custom_user_agent=custom_user_agent)

        if lwa_client is None:
            self._lwa_service_client = LwaClient(
                api_configuration=ApiConfiguration(
                    serializer=api_configuration.serializer, 
                    api_client=api_configuration.api_client),
                authentication_configuration=authentication_configuration,
                grant_type=None)
        else:
            self._lwa_service_client = lwa_client

    def create_proactive_event(self, create_proactive_event_request, stage, **kwargs):
        # type: (CreateProactiveEventRequest, SkillStage, **Any) -> Union[ApiResponse, Error]
        """
        Create a new proactive event in live stage.

        :param create_proactive_event_request: (required) Request to create a new proactive event.
        :type create_proactive_event_request: ask_sdk_model.services.proactive_events.create_proactive_event_request.CreateProactiveEventRequest
        :param full_response: Boolean value to check if response should contain headers and status code information.
            This value had to be passed through keyword arguments, by default the parameter value is set to False. 
        :type full_response: boolean
        :rtype: Union[ApiResponse, Error]
        """
        operation_name = "create_proactive_event"
        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'create_proactive_event_request' is set
        if ('create_proactive_event_request' not in params) or (params['create_proactive_event_request'] is None):
            raise ValueError(
                "Missing the required parameter `create_proactive_event_request` when calling `" + operation_name + "`")

        resource_path = '/v1/proactiveEvents'
        if stage == SkillStage.DEVELOPMENT:
            resource_path += "/stages/development"
        resource_path = resource_path.replace('{format}', 'json')

        path_params = {}  # type: Dict

        query_params = []  # type: List

        header_params = []  # type: List

        body_params = None
        if 'create_proactive_event_request' in params:
            body_params = params['create_proactive_event_request']
        header_params.append(('Content-type', 'application/json'))
        header_params.append(('User-Agent', self.user_agent))

        # Response Type
        full_response = False
        if 'full_response' in params:
            full_response = params['full_response']

        # Authentication setting
        access_token = self._lwa_service_client.get_access_token_for_scope(
            "alexa::proactive_events")
        authorization_value = "Bearer " + access_token
        header_params.append(('Authorization', authorization_value))

        error_definitions = []  # type: List
        error_definitions.append(ServiceClientResponse(response_type=None, status_code=202, message="Request accepted"))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.proactive_events.error.Error", status_code=400, message="A required parameter is not present or is incorrectly formatted, or the requested creation of a resource has already been completed by a previous request. "))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.proactive_events.error.Error", status_code=403, message="The authentication token is invalid or doesn&#39;t have authentication to access the resource"))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.proactive_events.error.Error", status_code=409, message="A skill attempts to create duplicate events using the same referenceId for the same customer."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.proactive_events.error.Error", status_code=429, message="The client has made more calls than the allowed limit."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.proactive_events.error.Error", status_code=500, message="The ProactiveEvents service encounters an internal error for a valid request."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.proactive_events.error.Error", status_code=0, message="Unexpected error"))

        api_response = self.invoke(
            method="POST",
            endpoint=self._api_endpoint,
            path=resource_path,
            path_params=path_params,
            query_params=query_params,
            header_params=header_params,
            body=body_params,
            response_definitions=error_definitions,
            response_type=None)

        if full_response:
            return api_response
        
