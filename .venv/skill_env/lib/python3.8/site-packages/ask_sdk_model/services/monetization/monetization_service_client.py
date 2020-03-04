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
    from ask_sdk_model.services.monetization.error import Error
    from ask_sdk_model.services.monetization.in_skill_product import InSkillProduct
    from ask_sdk_model.services.monetization.in_skill_products_response import InSkillProductsResponse
    from ask_sdk_model.services.monetization.in_skill_product_transactions_response import InSkillProductTransactionsResponse
    import bool


class MonetizationServiceClient(BaseServiceClient):
    """ServiceClient for calling the MonetizationService APIs.

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
        super(MonetizationServiceClient, self).__init__(api_configuration)
        self.user_agent = user_agent_info(sdk_version="1.0.0", custom_user_agent=custom_user_agent)

    def get_in_skill_products(self, accept_language, **kwargs):
        # type: (str, **Any) -> Union[ApiResponse, Error, InSkillProductsResponse]
        """
        Gets In-Skill Products based on user's context for the Skill.

        :param accept_language: (required) User's locale/language in context
        :type accept_language: str
        :param purchasable: Filter products based on whether they are purchasable by the user or not. * 'PURCHASABLE' - Products that are purchasable by the user. * 'NOT_PURCHASABLE' - Products that are not purchasable by the user.
        :type purchasable: str
        :param entitled: Filter products based on whether they are entitled to the user or not. * 'ENTITLED' - Products that the user is entitled to. * 'NOT_ENTITLED' - Products that the user is not entitled to.
        :type entitled: str
        :param product_type: Product type. * 'SUBSCRIPTION' - Once purchased, customers will own the content for the subscription period. * 'ENTITLEMENT' - Once purchased, customers will own the content forever. * 'CONSUMABLE' - Once purchased, customers will be entitled to the content until it is consumed. It can also be re-purchased.
        :type product_type: str
        :param next_token: When response to this API call is truncated (that is, isTruncated response element value is true), the response also includes the nextToken element, the value of which can be used in the next request as the continuation-token to list the next set of objects. The continuation token is an opaque value that In-Skill Products API understands. Token has expiry of 24 hours.
        :type next_token: str
        :param max_results: sets the maximum number of results returned in the response body. If you want to retrieve fewer than upper limit of 100 results, you can add this parameter to your request. maxResults should not exceed the upper limit. The response might contain fewer results than maxResults, but it will never contain more. If there are additional results that satisfy the search criteria, but these results were not returned because maxResults was exceeded, the response contains isTruncated = true.
        :type max_results: float
        :param full_response: Boolean value to check if response should contain headers and status code information.
            This value had to be passed through keyword arguments, by default the parameter value is set to False. 
        :type full_response: boolean
        :rtype: Union[ApiResponse, Error, InSkillProductsResponse]
        """
        operation_name = "get_in_skill_products"
        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'accept_language' is set
        if ('accept_language' not in params) or (params['accept_language'] is None):
            raise ValueError(
                "Missing the required parameter `accept_language` when calling `" + operation_name + "`")

        resource_path = '/v1/users/~current/skills/~current/inSkillProducts'
        resource_path = resource_path.replace('{format}', 'json')

        path_params = {}  # type: Dict

        query_params = []  # type: List
        if 'purchasable' in params:
            query_params.append(('purchasable', params['purchasable']))
        if 'entitled' in params:
            query_params.append(('entitled', params['entitled']))
        if 'product_type' in params:
            query_params.append(('productType', params['product_type']))
        if 'next_token' in params:
            query_params.append(('nextToken', params['next_token']))
        if 'max_results' in params:
            query_params.append(('maxResults', params['max_results']))

        header_params = []  # type: List
        if 'accept_language' in params:
            header_params.append(('Accept-Language', params['accept_language']))

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
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.monetization.in_skill_products_response.InSkillProductsResponse", status_code=200, message="Returns a list of In-Skill products on success."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.monetization.error.Error", status_code=400, message="Invalid request"))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.monetization.error.Error", status_code=401, message="The authentication token is invalid or doesn&#39;t have access to make this request"))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.monetization.error.Error", status_code=500, message="Internal Server Error"))

        api_response = self.invoke(
            method="GET",
            endpoint=self._api_endpoint,
            path=resource_path,
            path_params=path_params,
            query_params=query_params,
            header_params=header_params,
            body=body_params,
            response_definitions=error_definitions,
            response_type="ask_sdk_model.services.monetization.in_skill_products_response.InSkillProductsResponse")

        if full_response:
            return api_response
        return api_response.body

    def get_in_skill_product(self, accept_language, product_id, **kwargs):
        # type: (str, str, **Any) -> Union[ApiResponse, Error, InSkillProduct]
        """
        Get In-Skill Product information based on user context for the Skill.

        :param accept_language: (required) User's locale/language in context
        :type accept_language: str
        :param product_id: (required) Product Id.
        :type product_id: str
        :param full_response: Boolean value to check if response should contain headers and status code information.
            This value had to be passed through keyword arguments, by default the parameter value is set to False. 
        :type full_response: boolean
        :rtype: Union[ApiResponse, Error, InSkillProduct]
        """
        operation_name = "get_in_skill_product"
        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'accept_language' is set
        if ('accept_language' not in params) or (params['accept_language'] is None):
            raise ValueError(
                "Missing the required parameter `accept_language` when calling `" + operation_name + "`")
        # verify the required parameter 'product_id' is set
        if ('product_id' not in params) or (params['product_id'] is None):
            raise ValueError(
                "Missing the required parameter `product_id` when calling `" + operation_name + "`")

        resource_path = '/v1/users/~current/skills/~current/inSkillProducts/{productId}'
        resource_path = resource_path.replace('{format}', 'json')

        path_params = {}  # type: Dict
        if 'product_id' in params:
            path_params['productId'] = params['product_id']

        query_params = []  # type: List

        header_params = []  # type: List
        if 'accept_language' in params:
            header_params.append(('Accept-Language', params['accept_language']))

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
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.monetization.in_skill_product.InSkillProduct", status_code=200, message="Returns an In-Skill Product on success."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.monetization.error.Error", status_code=400, message="Invalid request."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.monetization.error.Error", status_code=401, message="The authentication token is invalid or doesn&#39;t have access to make this request"))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.monetization.error.Error", status_code=404, message="Requested resource not found."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.monetization.error.Error", status_code=500, message="Internal Server Error."))

        api_response = self.invoke(
            method="GET",
            endpoint=self._api_endpoint,
            path=resource_path,
            path_params=path_params,
            query_params=query_params,
            header_params=header_params,
            body=body_params,
            response_definitions=error_definitions,
            response_type="ask_sdk_model.services.monetization.in_skill_product.InSkillProduct")

        if full_response:
            return api_response
        return api_response.body

    def get_in_skill_products_transactions(self, accept_language, **kwargs):
        # type: (str, **Any) -> Union[ApiResponse, Error, InSkillProductTransactionsResponse]
        """
        Returns transactions of all in skill products purchases of the customer

        :param accept_language: (required) User's locale/language in context
        :type accept_language: str
        :param product_id: Product Id.
        :type product_id: str
        :param status: Transaction status for in skill product purchases. * 'PENDING_APPROVAL_BY_PARENT' - The transaction is pending approval from parent. * 'APPROVED_BY_PARENT' - The transaction was approved by parent and fulfilled successfully.. * 'DENIED_BY_PARENT' - The transaction was declined by parent and hence not fulfilled. * 'EXPIRED_NO_ACTION_BY_PARENT' - The transaction was expired due to no response from parent and hence not fulfilled. * 'ERROR' - The transaction was not fullfiled as there was an error while processing the transaction.
        :type status: str
        :param from_last_modified_time: Filter transactions based on last modified time stamp, FROM duration in format (UTC ISO 8601) i.e. yyyy-MM-dd'T'HH:mm:ss.SSS'Z'
        :type from_last_modified_time: datetime
        :param to_last_modified_time: Filter transactions based on last modified time stamp, TO duration in format (UTC ISO 8601) i.e. yyyy-MM-dd'T'HH:mm:ss.SSS'Z'
        :type to_last_modified_time: datetime
        :param next_token: When response to this API call is truncated, the response also includes the nextToken in metadata, the value of which can be used in the next request as the continuation-token to list the next set of objects. The continuation token is an opaque value that In-Skill Products API understands. Token has expiry of 24 hours.
        :type next_token: str
        :param max_results: sets the maximum number of results returned in the response body. If you want to retrieve fewer than upper limit of 100 results, you can add this parameter to your request. maxResults should not exceed the upper limit. The response might contain fewer results than maxResults, but it will never contain more. If there are additional results that satisfy the search criteria, but these results were not returned because maxResults was exceeded, the response contains nextToken which can be used to fetch next set of result.
        :type max_results: float
        :param full_response: Boolean value to check if response should contain headers and status code information.
            This value had to be passed through keyword arguments, by default the parameter value is set to False. 
        :type full_response: boolean
        :rtype: Union[ApiResponse, Error, InSkillProductTransactionsResponse]
        """
        operation_name = "get_in_skill_products_transactions"
        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            params[key] = val
        del params['kwargs']
        # verify the required parameter 'accept_language' is set
        if ('accept_language' not in params) or (params['accept_language'] is None):
            raise ValueError(
                "Missing the required parameter `accept_language` when calling `" + operation_name + "`")

        resource_path = '/v1/users/~current/skills/~current/inSkillProductsTransactions'
        resource_path = resource_path.replace('{format}', 'json')

        path_params = {}  # type: Dict

        query_params = []  # type: List
        if 'product_id' in params:
            query_params.append(('productId', params['product_id']))
        if 'status' in params:
            query_params.append(('status', params['status']))
        if 'from_last_modified_time' in params:
            query_params.append(('fromLastModifiedTime', params['from_last_modified_time']))
        if 'to_last_modified_time' in params:
            query_params.append(('toLastModifiedTime', params['to_last_modified_time']))
        if 'next_token' in params:
            query_params.append(('nextToken', params['next_token']))
        if 'max_results' in params:
            query_params.append(('maxResults', params['max_results']))

        header_params = []  # type: List
        if 'accept_language' in params:
            header_params.append(('Accept-Language', params['accept_language']))

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
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.monetization.in_skill_product_transactions_response.InSkillProductTransactionsResponse", status_code=200, message="Returns a list of transactions of all in skill products purchases in last 30 days on success."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.monetization.error.Error", status_code=400, message="Invalid request"))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.monetization.error.Error", status_code=401, message="The authentication token is invalid or doesn&#39;t have access to make this request"))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.monetization.error.Error", status_code=403, message="Forbidden request"))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.monetization.error.Error", status_code=404, message="Product id doesn&#39;t exist / invalid / not found."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.monetization.error.Error", status_code=412, message="Non-Child Directed Skill is not supported."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.monetization.error.Error", status_code=429, message="The request is throttled."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.monetization.error.Error", status_code=500, message="Internal Server Error"))

        api_response = self.invoke(
            method="GET",
            endpoint=self._api_endpoint,
            path=resource_path,
            path_params=path_params,
            query_params=query_params,
            header_params=header_params,
            body=body_params,
            response_definitions=error_definitions,
            response_type="ask_sdk_model.services.monetization.in_skill_product_transactions_response.InSkillProductTransactionsResponse")

        if full_response:
            return api_response
        return api_response.body

    def get_voice_purchase_setting(self, **kwargs):
        # type: (**Any) -> Union[ApiResponse, bool, Error]
        """
        Returns whether or not voice purchasing is enabled for the skill

        :param full_response: Boolean value to check if response should contain headers and status code information.
            This value had to be passed through keyword arguments, by default the parameter value is set to False. 
        :type full_response: boolean
        :rtype: Union[ApiResponse, bool, Error]
        """
        operation_name = "get_voice_purchase_setting"
        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            params[key] = val
        del params['kwargs']

        resource_path = '/v1/users/~current/skills/~current/settings/voicePurchasing.enabled'
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
        error_definitions.append(ServiceClientResponse(response_type="bool", status_code=200, message="Returns a boolean value for voice purchase setting on success."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.monetization.error.Error", status_code=400, message="Invalid request."))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.monetization.error.Error", status_code=401, message="The authentication token is invalid or doesn&#39;t have access to make this request"))
        error_definitions.append(ServiceClientResponse(response_type="ask_sdk_model.services.monetization.error.Error", status_code=500, message="Internal Server Error."))

        api_response = self.invoke(
            method="GET",
            endpoint=self._api_endpoint,
            path=resource_path,
            path_params=path_params,
            query_params=query_params,
            header_params=header_params,
            body=body_params,
            response_definitions=error_definitions,
            response_type="bool")

        if full_response:
            return api_response
        return api_response.body
