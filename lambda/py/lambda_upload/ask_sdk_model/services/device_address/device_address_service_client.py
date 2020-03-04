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
    from ask_sdk_model.services.device_address.short_address import ShortAddress
    from ask_sdk_model.services.device_address.error import Error
    from ask_sdk_model.services.device_address.address import Address


class DeviceAddressServiceClient(BaseServiceClient):
    """ServiceClient for calling the DeviceAddressService APIs.

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
        super(DeviceAddressServiceClient, self).__init__(api_configuration)
        self.user_agent = user_agent_info(sdk_version="1.0.0", custom_user_agent=custom_user_agent)

    def get_country_and_postal_code(self, device_id, **kwargs):
        # type: (str, **Any) -> Union[ApiResponse, ShortAddress, Error]
        """
        Gets the country and postal code of a device 

        :param device_id: (required) The device Id for which to get the country and postal code
        :type device_id: str
        :param full_response: Boolean value to check if response should contain headers and status code information.
            This value had to be passed through keyword arguments, by default the parameter value is set to False. 
        :type full_response: boolean
        :rtype: Union[ApiResponse, ShortAddress, Error]
        """
        operation_name = "get_country_and_postal_code"
        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'device_id' is set
        if ('device_id' not in params) or (params['device_id'] is None):
            raise ValueError(
                "Missing the required parameter `device_id` when calling `" + operation_name + "`")

        resource_path = '/v1/devices/{deviceId}/settings/address/countryAndPostalCode'
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
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.device_address.short_address.ShortAddress", status_code=200, message="Successfully get the country and postal code of the deviceId"))
        error_definitions.append(ServiceClientResponse(response_type=None, status_code=204, message="No content could be queried out"))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.device_address.error.Error", status_code=403, message="The authentication token is invalid or doesn&#39;t have access to the resource"))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.device_address.error.Error", status_code=405, message="The method is not supported"))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.device_address.error.Error", status_code=429, message="The request is throttled"))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.device_address.error.Error", status_code=0, message="Unexpected error"))

        api_response = self.invoke(
            method="GET",
            endpoint=self._api_endpoint,
            path=resource_path,
            path_params=path_params,
            query_params=query_params,
            header_params=header_params,
            body=body_params,
            response_definitions=error_definitions,
            response_type="ask_sdk_model.services.device_address.short_address.ShortAddress")

        if full_response:
            return api_response
        return api_response.body

    def get_full_address(self, device_id, **kwargs):
        # type: (str, **Any) -> Union[ApiResponse, Address, Error]
        """
        Gets the address of a device 

        :param device_id: (required) The device Id for which to get the address
        :type device_id: str
        :param full_response: Boolean value to check if response should contain headers and status code information.
            This value had to be passed through keyword arguments, by default the parameter value is set to False. 
        :type full_response: boolean
        :rtype: Union[ApiResponse, Address, Error]
        """
        operation_name = "get_full_address"
        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'device_id' is set
        if ('device_id' not in params) or (params['device_id'] is None):
            raise ValueError(
                "Missing the required parameter `device_id` when calling `" + operation_name + "`")

        resource_path = '/v1/devices/{deviceId}/settings/address'
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
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.device_address.address.Address", status_code=200, message="Successfully get the address of the device"))
        error_definitions.append(ServiceClientResponse(response_type=None, status_code=204, message="No content could be queried out"))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.device_address.error.Error", status_code=403, message="The authentication token is invalid or doesn&#39;t have access to the resource"))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.device_address.error.Error", status_code=405, message="The method is not supported"))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.device_address.error.Error", status_code=429, message="The request is throttled"))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.device_address.error.Error", status_code=0, message="Unexpected error"))

        api_response = self.invoke(
            method="GET",
            endpoint=self._api_endpoint,
            path=resource_path,
            path_params=path_params,
            query_params=query_params,
            header_params=header_params,
            body=body_params,
            response_definitions=error_definitions,
            response_type="ask_sdk_model.services.device_address.address.Address")

        if full_response:
            return api_response
        return api_response.body
