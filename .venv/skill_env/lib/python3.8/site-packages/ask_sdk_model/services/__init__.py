# coding: utf-8

#
# Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the 'License'). You may not use this file
# except in compliance with the License. A copy of the License is located at
#
# http://aws.amazon.com/apache2.0/
#
# or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for
# the specific language governing permissions and limitations under the License.
#
from __future__ import absolute_import

from .base_service_client import BaseServiceClient
from .api_response import ApiResponse
from .api_client_response import ApiClientResponse
from .service_client_factory import ServiceClientFactory
from .api_client import ApiClient
from .serializer import Serializer
from .api_configuration import ApiConfiguration
from .service_client_response import ServiceClientResponse
from .service_exception import ServiceException
from .api_client_request import ApiClientRequest
from .api_client_message import ApiClientMessage
from .authentication_configuration import AuthenticationConfiguration
