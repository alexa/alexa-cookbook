# -*- coding: utf-8 -*-
#
# Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights
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
import six

from dateutil import tz
from datetime import datetime, timedelta
from ..base_service_client import BaseServiceClient
from ..service_client_response import ServiceClientResponse
from .access_token_request import AccessTokenRequest
from .access_token import AccessToken

if typing.TYPE_CHECKING:
    from .access_token_response import AccessTokenResponse
    from ..api_configuration import ApiConfiguration
    from ..authentication_configuration import AuthenticationConfiguration
    from typing import Any, Dict, List, Optional


class LwaClient(BaseServiceClient):
    """Client to call Login with Amazon (LWA) to retrieve access tokens.

    :param api_configuration: ApiConfiguration instance with valid
        Serializer and ApiClient. The authorization value and api endpoint
        is not used by the LWA Client.
    :type api_configuration:
        ask_sdk_model.services.api_configuration.ApiConfiguration
    :param authentication_configuration: AuthenticationConfiguration
        instance with valid client id and client secret, for making LWA
        calls.
    :type authentication_configuration: ask_sdk_model.services.authentication_configuration.AuthenticationConfiguration
    :param grant_type: The grant type which is used to make the HTTP request.
    :type grant_type: (optional) str
    :raises: :py:class:`ValueError` if authentication configuration is not
        provided.
    """
    EXPIRY_OFFSET_IN_MILLIS = 60000
    DEFAULT_LWA_ENDPOINT = "https://api.amazon.com"
    REFRESH_ACCESS_TOKEN = "refresh_access_token"
    CLIENT_CREDENTIALS_GRANT_TYPE = "client_credentials"
    LWA_CREDENTIALS_GRANT_TYPE = "refresh_token"

    def __init__(self, api_configuration, authentication_configuration,
                 grant_type=None):
        # type: (ApiConfiguration, AuthenticationConfiguration, str) -> None
        """Client to call Login with Amazon (LWA) to retrieve access tokens.

        :param api_configuration: ApiConfiguration instance with valid
            Serializer and ApiClient. The authorization value and api endpoint
            is not used by the LWA Client.
        :type api_configuration:
            ask_sdk_model.services.api_configuration.ApiConfiguration
        :param authentication_configuration: AuthenticationConfiguration
            instance with valid client id and client secret, for making LWA
            calls.
        :type authentication_configuration: ask_sdk_model.services.authentication_configuration.AuthenticationConfiguration
        :param grant_type: The grant type which is used to make the HTTP request.
        :type grant_type: (optional) str
        :raises: :py:class:`ValueError` if authentication configuration is not
            provided.
        """
        super(LwaClient, self).__init__(api_configuration=api_configuration)

        if authentication_configuration is None:
            raise ValueError("authentication_configuration must be provided")
        self._authentication_configuration = authentication_configuration
        if grant_type is None:
            self._grant_type = self.CLIENT_CREDENTIALS_GRANT_TYPE
        else:
            self._grant_type = grant_type
        self._scoped_token_cache = dict()  # type: Dict

    def get_access_token_from_refresh_token(self):
        # type: () -> str
        """Retrieve access token for Skill Management API calls.

        :return: Retrieved access token for the given refresh_token and
            configured client id, client secret
        :rtype: str
        """
        return self._get_access_token()

    def get_access_token_for_scope(self, scope):
        # type: (str) -> str
        """Retrieve access token for given scope.

        :param scope: Target scope for the access token
        :type scope: str
        :return: Retrieved access token for the given scope and
            configured client id, client secret
        :rtype: str
        :raises: :py:class:`ValueError` is no scope is passed.
        """
        if scope is None:
            raise ValueError("scope must be provided")
        return self._get_access_token(scope)

    def _get_access_token(self, scope=None):
        # type: (str) -> str
        """Retrieve access token.

        Return the access token from the ``scoped_token_cache``
        if the token is unexpired. If it is expired or is not present,
        then retrieve a new access token using the client id, client secret
        and refresh_token or scope based on API request in the input
        :py:class:`ask_sdk_model.services.authentication_configuration.AuthenticationConfiguration`
        instance.

        :param scope: Target scope for the access token
        :type scope: str
        :return: Retrieved access token for configured client id, client secret
        :rtype: str
        :raises: :py:class:`ValueError` is no scope is passed and
            :py:class:`ValueError` if LWA AccessTokenResponse is None.
        """
        if scope is None:
            cache_key = self.REFRESH_ACCESS_TOKEN
        else:
            cache_key = scope

        access_token = self._scoped_token_cache.get(cache_key, None)
        local_now = datetime.now(tz.tzutc())

        if (access_token is not None and
            access_token.expiry >
                local_now + timedelta(
                    milliseconds=self.EXPIRY_OFFSET_IN_MILLIS)):
            return access_token.token

        access_token_request = AccessTokenRequest(
            client_id=self._authentication_configuration.client_id,
            client_secret=self._authentication_configuration.client_secret)

        if self._authentication_configuration.refresh_token is None:
            access_token_request.scope = scope
        else:
            access_token_request.refresh_token = (
                self._authentication_configuration.refresh_token)

        lwa_response = self._generate_access_token(
            access_token_request=access_token_request)

        if lwa_response is None or lwa_response.expires_in is None:
            raise ValueError("Invalid response from LWA Client generate "
                             "access token call")

        access_token = AccessToken(
            token=lwa_response.access_token,
            expiry=local_now + timedelta(seconds=lwa_response.expires_in)
        )

        self._scoped_token_cache[cache_key] = access_token
        return access_token.token

    def _generate_access_token(self, access_token_request, **kwargs):
        # type: (AccessTokenRequest, **Any) -> Optional[AccessTokenResponse]
        """Generate access token by calling the LWA API.

        :param access_token_request: The access token request with client
            information that is used during the API call.
        :type access_token_request:
            ask_sdk_model.services.lwa.access_token_request.AccessTokenRequest
        :return: The access token response from the LWA call.
        :rtype:
            ask_sdk_model.services.lwa.access_token_response.AccessTokenResponse
        """
        operation_name = "get_access_token"
        params = locals()
        for key, val in six.iteritems(params['kwargs']):
            params[key] = val
        del params['kwargs']

        if self._api_endpoint:
            endpoint = self._api_endpoint
        else:
            endpoint = self.DEFAULT_LWA_ENDPOINT
        resource_path = '/auth/O2/token'.replace('{format}', 'json')
        path_params = {}  # type: Dict
        query_params = []  # type: List
        header_params = [
            ('Content-type', 'application/x-www-form-urlencoded')]

        grant_type_param = "grant_type={}".format(self._grant_type)
        client_id_param = "client_id={}".format(access_token_request.client_id)
        client_secret_param = "client_secret={}".format(
            access_token_request.client_secret)

        body_params = "&".join(
            [grant_type_param, client_id_param, client_secret_param])
        if self._grant_type == self.LWA_CREDENTIALS_GRANT_TYPE:
            param_info = "refresh_token={}".format(
                access_token_request.refresh_token)
        else:
            param_info = "scope={}".format(access_token_request.scope)
        body_params += "&{}".format(param_info)
        error_definitions = list()  # type: List
        error_definitions.append(ServiceClientResponse(
            response_type=(
                "ask_sdk_model.services.lwa.access_token_response."
                "AccessTokenResponse"),
            status_code=200, message="Success"))
        error_definitions.append(ServiceClientResponse(
            response_type="ask_sdk_model.services.lwa.error.Error",
            status_code=400,
            message="Bad Request"))
        error_definitions.append(ServiceClientResponse(
            response_type="ask_sdk_model.services.lwa.error.Error",
            status_code=401,
            message="Authentication failed"))
        error_definitions.append(ServiceClientResponse(
            response_type="ask_sdk_model.services.lwa.error.Error",
            status_code=500,
            message="Internal Server Error"))
        error_definitions.append(ServiceClientResponse(
            response_type="ask_sdk_model.services.lwa.error.Error",
            status_code=503,
            message="Service Unavailable"))

        api_response = self.invoke(method="POST", endpoint=endpoint,
                                   path=resource_path, path_params=path_params,
                                   query_params=query_params,
                                   header_params=header_params,
                                   body=body_params,
                                   response_definitions=error_definitions,
                                   response_type=("ask_sdk_model.services.lwa."
                                                  "access_token_response."
                                                  "AccessTokenResponse"))
        return api_response.body  # type: ignore
