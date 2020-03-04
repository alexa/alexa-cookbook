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
    from ask_sdk_model.services.reminder_management.get_reminders_response import GetRemindersResponse
    from ask_sdk_model.services.reminder_management.get_reminder_response import GetReminderResponse
    from ask_sdk_model.services.reminder_management.reminder_response import ReminderResponse
    from ask_sdk_model.services.reminder_management.reminder_request import ReminderRequest
    from ask_sdk_model.services.reminder_management.error import Error


class ReminderManagementServiceClient(BaseServiceClient):
    """ServiceClient for calling the ReminderManagementService APIs.

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
        super(ReminderManagementServiceClient, self).__init__(api_configuration)
        self.user_agent = user_agent_info(sdk_version="1.0.0", custom_user_agent=custom_user_agent)

    def delete_reminder(self, alert_token, **kwargs):
        # type: (str, **Any) -> Union[ApiResponse, Error]
        """
        This API is invoked by the skill to delete a single reminder. 

        :param alert_token: (required) 
        :type alert_token: str
        :param full_response: Boolean value to check if response should contain headers and status code information.
            This value had to be passed through keyword arguments, by default the parameter value is set to False. 
        :type full_response: boolean
        :rtype: Union[ApiResponse, Error]
        """
        operation_name = "delete_reminder"
        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'alert_token' is set
        if ('alert_token' not in params) or (params['alert_token'] is None):
            raise ValueError(
                "Missing the required parameter `alert_token` when calling `" + operation_name + "`")

        resource_path = '/v1/alerts/reminders/{alertToken}'
        resource_path = resource_path.replace('{format}', 'json')

        path_params = {}  # type: Dict
        if 'alert_token' in params:
            path_params['alertToken'] = params['alert_token']

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
        error_definitions.append(ServiceClientResponse(response_type=None, status_code=200, message="Success"))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.reminder_management.error.Error", status_code=401, message="UserAuthenticationException. Request is not authorized/authenticated e.g. If customer does not have permission to create a reminder."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.reminder_management.error.Error", status_code=429, message="RateExceededException e.g. When the skill is throttled for exceeding the max rate"))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.reminder_management.error.Error", status_code=500, message="Internal Server Error"))

        api_response = self.invoke(
            method="DELETE",
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
        

    def get_reminder(self, alert_token, **kwargs):
        # type: (str, **Any) -> Union[ApiResponse, GetReminderResponse, Error]
        """
        This API is invoked by the skill to get a single reminder. 

        :param alert_token: (required) 
        :type alert_token: str
        :param full_response: Boolean value to check if response should contain headers and status code information.
            This value had to be passed through keyword arguments, by default the parameter value is set to False. 
        :type full_response: boolean
        :rtype: Union[ApiResponse, GetReminderResponse, Error]
        """
        operation_name = "get_reminder"
        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'alert_token' is set
        if ('alert_token' not in params) or (params['alert_token'] is None):
            raise ValueError(
                "Missing the required parameter `alert_token` when calling `" + operation_name + "`")

        resource_path = '/v1/alerts/reminders/{alertToken}'
        resource_path = resource_path.replace('{format}', 'json')

        path_params = {}  # type: Dict
        if 'alert_token' in params:
            path_params['alertToken'] = params['alert_token']

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
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.reminder_management.get_reminder_response.GetReminderResponse", status_code=200, message="Success"))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.reminder_management.error.Error", status_code=401, message="UserAuthenticationException. Request is not authorized/authenticated e.g. If customer does not have permission to create a reminder."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.reminder_management.error.Error", status_code=429, message="RateExceededException e.g. When the skill is throttled for exceeding the max rate"))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.reminder_management.error.Error", status_code=500, message="Internal Server Error"))

        api_response = self.invoke(
            method="GET",
            endpoint=self._api_endpoint,
            path=resource_path,
            path_params=path_params,
            query_params=query_params,
            header_params=header_params,
            body=body_params,
            response_definitions=error_definitions,
            response_type="ask_sdk_model.services.reminder_management.get_reminder_response.GetReminderResponse")

        if full_response:
            return api_response
        return api_response.body

    def update_reminder(self, alert_token, reminder_request, **kwargs):
        # type: (str, ReminderRequest, **Any) -> Union[ApiResponse, ReminderResponse, Error]
        """
        This API is invoked by the skill to update a reminder. 

        :param alert_token: (required) 
        :type alert_token: str
        :param reminder_request: (required) 
        :type reminder_request: ask_sdk_model.services.reminder_management.reminder_request.ReminderRequest
        :param full_response: Boolean value to check if response should contain headers and status code information.
            This value had to be passed through keyword arguments, by default the parameter value is set to False. 
        :type full_response: boolean
        :rtype: Union[ApiResponse, ReminderResponse, Error]
        """
        operation_name = "update_reminder"
        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'alert_token' is set
        if ('alert_token' not in params) or (params['alert_token'] is None):
            raise ValueError(
                "Missing the required parameter `alert_token` when calling `" + operation_name + "`")
        # verify the required parameter 'reminder_request' is set
        if ('reminder_request' not in params) or (params['reminder_request'] is None):
            raise ValueError(
                "Missing the required parameter `reminder_request` when calling `" + operation_name + "`")

        resource_path = '/v1/alerts/reminders/{alertToken}'
        resource_path = resource_path.replace('{format}', 'json')

        path_params = {}  # type: Dict
        if 'alert_token' in params:
            path_params['alertToken'] = params['alert_token']

        query_params = []  # type: List

        header_params = []  # type: List

        body_params = None
        if 'reminder_request' in params:
            body_params = params['reminder_request']
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
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.reminder_management.reminder_response.ReminderResponse", status_code=200, message="Success"))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.reminder_management.error.Error", status_code=400, message="Bad Request"))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.reminder_management.error.Error", status_code=404, message="NotFoundException e.g. Retured when reminder is not found"))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.reminder_management.error.Error", status_code=409, message="UserAuthenticationException. Request is not authorized/authenticated e.g. If customer does not have permission to create a reminder."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.reminder_management.error.Error", status_code=429, message="RateExceededException e.g. When the skill is throttled for exceeding the max rate"))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.reminder_management.error.Error", status_code=500, message="Internal Server Error"))

        api_response = self.invoke(
            method="PUT",
            endpoint=self._api_endpoint,
            path=resource_path,
            path_params=path_params,
            query_params=query_params,
            header_params=header_params,
            body=body_params,
            response_definitions=error_definitions,
            response_type="ask_sdk_model.services.reminder_management.reminder_response.ReminderResponse")

        if full_response:
            return api_response
        return api_response.body

    def get_reminders(self, **kwargs):
        # type: (**Any) -> Union[ApiResponse, GetRemindersResponse, Error]
        """
        This API is invoked by the skill to get a all reminders created by the caller. 

        :param full_response: Boolean value to check if response should contain headers and status code information.
            This value had to be passed through keyword arguments, by default the parameter value is set to False. 
        :type full_response: boolean
        :rtype: Union[ApiResponse, GetRemindersResponse, Error]
        """
        operation_name = "get_reminders"
        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            params[key] = val
        del params['kwargs']

        resource_path = '/v1/alerts/reminders/'
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
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.reminder_management.get_reminders_response.GetRemindersResponse", status_code=200, message="Success"))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.reminder_management.error.Error", status_code=401, message="UserAuthenticationException. Request is not authorized/authenticated e.g. If customer does not have permission to create a reminder."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.reminder_management.error.Error", status_code=429, message="RateExceededException e.g. When the skill is throttled for exceeding the max rate"))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.reminder_management.error.Error", status_code=500, message="Internal Server Error"))

        api_response = self.invoke(
            method="GET",
            endpoint=self._api_endpoint,
            path=resource_path,
            path_params=path_params,
            query_params=query_params,
            header_params=header_params,
            body=body_params,
            response_definitions=error_definitions,
            response_type="ask_sdk_model.services.reminder_management.get_reminders_response.GetRemindersResponse")

        if full_response:
            return api_response
        return api_response.body

    def create_reminder(self, reminder_request, **kwargs):
        # type: (ReminderRequest, **Any) -> Union[ApiResponse, ReminderResponse, Error]
        """
        This API is invoked by the skill to create a new reminder. 

        :param reminder_request: (required) 
        :type reminder_request: ask_sdk_model.services.reminder_management.reminder_request.ReminderRequest
        :param full_response: Boolean value to check if response should contain headers and status code information.
            This value had to be passed through keyword arguments, by default the parameter value is set to False. 
        :type full_response: boolean
        :rtype: Union[ApiResponse, ReminderResponse, Error]
        """
        operation_name = "create_reminder"
        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'reminder_request' is set
        if ('reminder_request' not in params) or (params['reminder_request'] is None):
            raise ValueError(
                "Missing the required parameter `reminder_request` when calling `" + operation_name + "`")

        resource_path = '/v1/alerts/reminders/'
        resource_path = resource_path.replace('{format}', 'json')

        path_params = {}  # type: Dict

        query_params = []  # type: List

        header_params = []  # type: List

        body_params = None
        if 'reminder_request' in params:
            body_params = params['reminder_request']
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
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.reminder_management.reminder_response.ReminderResponse", status_code=200, message="Success"))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.reminder_management.error.Error", status_code=400, message="Bad Request"))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.reminder_management.error.Error", status_code=403, message="Forbidden"))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.reminder_management.error.Error", status_code=429, message="RateExceededException e.g. When the skill is throttled for exceeding the max rate"))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.reminder_management.error.Error", status_code=500, message="Internal Server Error"))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.reminder_management.error.Error", status_code=503, message="Service Unavailable"))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.reminder_management.error.Error", status_code=504, message="Gateway Timeout"))

        api_response = self.invoke(
            method="POST",
            endpoint=self._api_endpoint,
            path=resource_path,
            path_params=path_params,
            query_params=query_params,
            header_params=header_params,
            body=body_params,
            response_definitions=error_definitions,
            response_type="ask_sdk_model.services.reminder_management.reminder_response.ReminderResponse")

        if full_response:
            return api_response
        return api_response.body
