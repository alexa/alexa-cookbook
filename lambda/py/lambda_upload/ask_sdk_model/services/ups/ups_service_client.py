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
    from ask_sdk_model.services.ups.phone_number import PhoneNumber
    from ask_sdk_model.services.ups.distance_units import DistanceUnits
    import str
    from ask_sdk_model.services.ups.error import Error
    from ask_sdk_model.services.ups.temperature_unit import TemperatureUnit


class UpsServiceClient(BaseServiceClient):
    """ServiceClient for calling the UpsService APIs.

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
        super(UpsServiceClient, self).__init__(api_configuration)
        self.user_agent = user_agent_info(sdk_version="1.0.0", custom_user_agent=custom_user_agent)

    def get_profile_email(self, **kwargs):
        # type: (**Any) -> Union[ApiResponse, str, Error]
        """
        Gets the email address of the customer associated with the current enablement. Requires customer consent for scopes: [alexa::profile:email:read] 

        :param full_response: Boolean value to check if response should contain headers and status code information.
            This value had to be passed through keyword arguments, by default the parameter value is set to False. 
        :type full_response: boolean
        :rtype: Union[ApiResponse, str, Error]
        """
        operation_name = "get_profile_email"
        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            params[key] = val
        del params['kwargs']

        resource_path = '/v2/accounts/~current/settings/Profile.email'
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
        error_definitions.append(ServiceClientResponse(response_type="str", status_code=200, message="Successfully retrieved the requested information."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.error.Error", status_code=204, message="The query did not return any results."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.error.Error", status_code=401, message="The authentication token is malformed or invalid."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.error.Error", status_code=403, message="The authentication token does not have access to resource."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.error.Error", status_code=429, message="The skill has been throttled due to an excessive number of requests."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.error.Error", status_code=0, message="An unexpected error occurred."))

        api_response = self.invoke(
            method="GET",
            endpoint=self._api_endpoint,
            path=resource_path,
            path_params=path_params,
            query_params=query_params,
            header_params=header_params,
            body=body_params,
            response_definitions=error_definitions,
            response_type="str")

        if full_response:
            return api_response
        return api_response.body

    def get_profile_given_name(self, **kwargs):
        # type: (**Any) -> Union[ApiResponse, str, Error]
        """
        Gets the given name (first name) of the customer associated with the current enablement. Requires customer consent for scopes: [alexa::profile:given_name:read] 

        :param full_response: Boolean value to check if response should contain headers and status code information.
            This value had to be passed through keyword arguments, by default the parameter value is set to False. 
        :type full_response: boolean
        :rtype: Union[ApiResponse, str, Error]
        """
        operation_name = "get_profile_given_name"
        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            params[key] = val
        del params['kwargs']

        resource_path = '/v2/accounts/~current/settings/Profile.givenName'
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
        error_definitions.append(ServiceClientResponse(response_type="str", status_code=200, message="Successfully retrieved the requested information."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.error.Error", status_code=204, message="The query did not return any results."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.error.Error", status_code=401, message="The authentication token is malformed or invalid."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.error.Error", status_code=403, message="The authentication token does not have access to resource."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.error.Error", status_code=429, message="The skill has been throttled due to an excessive number of requests."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.error.Error", status_code=0, message="An unexpected error occurred."))

        api_response = self.invoke(
            method="GET",
            endpoint=self._api_endpoint,
            path=resource_path,
            path_params=path_params,
            query_params=query_params,
            header_params=header_params,
            body=body_params,
            response_definitions=error_definitions,
            response_type="str")

        if full_response:
            return api_response
        return api_response.body

    def get_profile_mobile_number(self, **kwargs):
        # type: (**Any) -> Union[ApiResponse, PhoneNumber, Error]
        """
        Gets the mobile phone number of the customer associated with the current enablement. Requires customer consent for scopes: [alexa::profile:mobile_number:read] 

        :param full_response: Boolean value to check if response should contain headers and status code information.
            This value had to be passed through keyword arguments, by default the parameter value is set to False. 
        :type full_response: boolean
        :rtype: Union[ApiResponse, PhoneNumber, Error]
        """
        operation_name = "get_profile_mobile_number"
        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            params[key] = val
        del params['kwargs']

        resource_path = '/v2/accounts/~current/settings/Profile.mobileNumber'
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
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.phone_number.PhoneNumber", status_code=200, message="Successfully retrieved the requested information."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.error.Error", status_code=204, message="The query did not return any results."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.error.Error", status_code=401, message="The authentication token is malformed or invalid."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.error.Error", status_code=403, message="The authentication token does not have access to resource."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.error.Error", status_code=429, message="The skill has been throttled due to an excessive number of requests."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.error.Error", status_code=0, message="An unexpected error occurred."))

        api_response = self.invoke(
            method="GET",
            endpoint=self._api_endpoint,
            path=resource_path,
            path_params=path_params,
            query_params=query_params,
            header_params=header_params,
            body=body_params,
            response_definitions=error_definitions,
            response_type="ask_sdk_model.services.ups.phone_number.PhoneNumber")

        if full_response:
            return api_response
        return api_response.body

    def get_profile_name(self, **kwargs):
        # type: (**Any) -> Union[ApiResponse, str, Error]
        """
        Gets the full name of the customer associated with the current enablement. Requires customer consent for scopes: [alexa::profile:name:read] 

        :param full_response: Boolean value to check if response should contain headers and status code information.
            This value had to be passed through keyword arguments, by default the parameter value is set to False. 
        :type full_response: boolean
        :rtype: Union[ApiResponse, str, Error]
        """
        operation_name = "get_profile_name"
        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            params[key] = val
        del params['kwargs']

        resource_path = '/v2/accounts/~current/settings/Profile.name'
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
        error_definitions.append(ServiceClientResponse(response_type="str", status_code=200, message="Successfully retrieved the requested information."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.error.Error", status_code=204, message="The query did not return any results."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.error.Error", status_code=401, message="The authentication token is malformed or invalid."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.error.Error", status_code=403, message="The authentication token does not have access to resource."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.error.Error", status_code=429, message="The skill has been throttled due to an excessive number of requests."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.error.Error", status_code=0, message="An unexpected error occurred."))

        api_response = self.invoke(
            method="GET",
            endpoint=self._api_endpoint,
            path=resource_path,
            path_params=path_params,
            query_params=query_params,
            header_params=header_params,
            body=body_params,
            response_definitions=error_definitions,
            response_type="str")

        if full_response:
            return api_response
        return api_response.body

    def get_system_distance_units(self, device_id, **kwargs):
        # type: (str, **Any) -> Union[ApiResponse, Error, DistanceUnits]
        """
        Gets the distance measurement unit of the device. Does not require explict customer consent. 

        :param device_id: (required) The device Id
        :type device_id: str
        :param full_response: Boolean value to check if response should contain headers and status code information.
            This value had to be passed through keyword arguments, by default the parameter value is set to False. 
        :type full_response: boolean
        :rtype: Union[ApiResponse, Error, DistanceUnits]
        """
        operation_name = "get_system_distance_units"
        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'device_id' is set
        if ('device_id' not in params) or (params['device_id'] is None):
            raise ValueError(
                "Missing the required parameter `device_id` when calling `" + operation_name + "`")

        resource_path = '/v2/devices/{deviceId}/settings/System.distanceUnits'
        resource_path = resource_path.replace('{format}', 'json')

        path_params = {}  # type: Dict
        if 'device_id' in params:
            path_params['deviceId'] = params['device_id']

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
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.distance_units.DistanceUnits", status_code=200, message="Successfully get the setting"))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.error.Error", status_code=204, message="The query did not return any results."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.error.Error", status_code=401, message="The authentication token is malformed or invalid."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.error.Error", status_code=403, message="The authentication token does not have access to resource."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.error.Error", status_code=429, message="The skill has been throttled due to an excessive number of requests."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.error.Error", status_code=0, message="An unexpected error occurred."))

        api_response = self.invoke(
            method="GET",
            endpoint=self._api_endpoint,
            path=resource_path,
            path_params=path_params,
            query_params=query_params,
            header_params=header_params,
            body=body_params,
            response_definitions=error_definitions,
            response_type="ask_sdk_model.services.ups.distance_units.DistanceUnits")

        if full_response:
            return api_response
        return api_response.body

    def get_system_temperature_unit(self, device_id, **kwargs):
        # type: (str, **Any) -> Union[ApiResponse, TemperatureUnit, Error]
        """
        Gets the temperature measurement units of the device. Does not require explict customer consent. 

        :param device_id: (required) The device Id
        :type device_id: str
        :param full_response: Boolean value to check if response should contain headers and status code information.
            This value had to be passed through keyword arguments, by default the parameter value is set to False. 
        :type full_response: boolean
        :rtype: Union[ApiResponse, TemperatureUnit, Error]
        """
        operation_name = "get_system_temperature_unit"
        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'device_id' is set
        if ('device_id' not in params) or (params['device_id'] is None):
            raise ValueError(
                "Missing the required parameter `device_id` when calling `" + operation_name + "`")

        resource_path = '/v2/devices/{deviceId}/settings/System.temperatureUnit'
        resource_path = resource_path.replace('{format}', 'json')

        path_params = {}  # type: Dict
        if 'device_id' in params:
            path_params['deviceId'] = params['device_id']

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
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.temperature_unit.TemperatureUnit", status_code=200, message="Successfully get the setting"))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.error.Error", status_code=204, message="The query did not return any results."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.error.Error", status_code=401, message="The authentication token is malformed or invalid."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.error.Error", status_code=403, message="The authentication token does not have access to resource."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.error.Error", status_code=429, message="The skill has been throttled due to an excessive number of requests."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.error.Error", status_code=0, message="An unexpected error occurred."))

        api_response = self.invoke(
            method="GET",
            endpoint=self._api_endpoint,
            path=resource_path,
            path_params=path_params,
            query_params=query_params,
            header_params=header_params,
            body=body_params,
            response_definitions=error_definitions,
            response_type="ask_sdk_model.services.ups.temperature_unit.TemperatureUnit")

        if full_response:
            return api_response
        return api_response.body

    def get_system_time_zone(self, device_id, **kwargs):
        # type: (str, **Any) -> Union[ApiResponse, str, Error]
        """
        Gets the time zone of the device. Does not require explict customer consent. 

        :param device_id: (required) The device Id
        :type device_id: str
        :param full_response: Boolean value to check if response should contain headers and status code information.
            This value had to be passed through keyword arguments, by default the parameter value is set to False. 
        :type full_response: boolean
        :rtype: Union[ApiResponse, str, Error]
        """
        operation_name = "get_system_time_zone"
        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'device_id' is set
        if ('device_id' not in params) or (params['device_id'] is None):
            raise ValueError(
                "Missing the required parameter `device_id` when calling `" + operation_name + "`")

        resource_path = '/v2/devices/{deviceId}/settings/System.timeZone'
        resource_path = resource_path.replace('{format}', 'json')

        path_params = {}  # type: Dict
        if 'device_id' in params:
            path_params['deviceId'] = params['device_id']

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
        error_definitions.append(ServiceClientResponse(response_type="str", status_code=200, message="Successfully get the setting"))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.error.Error", status_code=204, message="The query did not return any results."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.error.Error", status_code=401, message="The authentication token is malformed or invalid."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.error.Error", status_code=403, message="The authentication token does not have access to resource."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.error.Error", status_code=429, message="The skill has been throttled due to an excessive number of requests."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.ups.error.Error", status_code=0, message="An unexpected error occurred."))

        api_response = self.invoke(
            method="GET",
            endpoint=self._api_endpoint,
            path=resource_path,
            path_params=path_params,
            query_params=query_params,
            header_params=header_params,
            body=body_params,
            response_definitions=error_definitions,
            response_type="str")

        if full_response:
            return api_response
        return api_response.body
