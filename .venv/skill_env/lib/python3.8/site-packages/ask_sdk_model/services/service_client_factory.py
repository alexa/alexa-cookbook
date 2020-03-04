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
from .device_address import DeviceAddressServiceClient
from .directive import DirectiveServiceClient
from .endpoint_enumeration import EndpointEnumerationServiceClient
from .list_management import ListManagementServiceClient
from .monetization import MonetizationServiceClient
from .proactive_events import ProactiveEventsServiceClient
from .reminder_management import ReminderManagementServiceClient
from .skill_messaging import SkillMessagingServiceClient
from .ups import UpsServiceClient

if typing.TYPE_CHECKING:
    from ask_sdk_model.services.api_configuration import ApiConfiguration


class ServiceClientFactory(object):
    """ServiceClientFactory class to help build service clients.

    :param api_configuration: API Configuration for calling services
    :type api_configuration: ask_sdk_model.services.api_configuration.ApiConfiguration
    """
    def __init__(self, api_configuration):
        # type: (ApiConfiguration) -> None
        self.api_configuration = api_configuration

    def get_device_address_service(self):
        # type: () -> DeviceAddressServiceClient
        """Get DeviceAddressServiceClient for device_address_service.

        :return: Client for calling the service
        :rtype: DeviceAddressServiceClient
        :raises: :py:class:`ValueError`
        """
        try:
            return DeviceAddressServiceClient(self.api_configuration)
        except Exception as e:
            raise ValueError(
                "ServiceClientFactory Error while initializing DeviceAddressServiceClient: " + str(e))

    def get_directive_service(self):
        # type: () -> DirectiveServiceClient
        """Get DirectiveServiceClient for directive_service.

        :return: Client for calling the service
        :rtype: DirectiveServiceClient
        :raises: :py:class:`ValueError`
        """
        try:
            return DirectiveServiceClient(self.api_configuration)
        except Exception as e:
            raise ValueError(
                "ServiceClientFactory Error while initializing DirectiveServiceClient: " + str(e))

    def get_endpoint_enumeration_service(self):
        # type: () -> EndpointEnumerationServiceClient
        """Get EndpointEnumerationServiceClient for endpoint_enumeration_service.

        :return: Client for calling the service
        :rtype: EndpointEnumerationServiceClient
        :raises: :py:class:`ValueError`
        """
        try:
            return EndpointEnumerationServiceClient(self.api_configuration)
        except Exception as e:
            raise ValueError(
                "ServiceClientFactory Error while initializing EndpointEnumerationServiceClient: " + str(e))

    def get_list_management_service(self):
        # type: () -> ListManagementServiceClient
        """Get ListManagementServiceClient for list_management_service.

        :return: Client for calling the service
        :rtype: ListManagementServiceClient
        :raises: :py:class:`ValueError`
        """
        try:
            return ListManagementServiceClient(self.api_configuration)
        except Exception as e:
            raise ValueError(
                "ServiceClientFactory Error while initializing ListManagementServiceClient: " + str(e))

    def get_monetization_service(self):
        # type: () -> MonetizationServiceClient
        """Get MonetizationServiceClient for monetization_service.

        :return: Client for calling the service
        :rtype: MonetizationServiceClient
        :raises: :py:class:`ValueError`
        """
        try:
            return MonetizationServiceClient(self.api_configuration)
        except Exception as e:
            raise ValueError(
                "ServiceClientFactory Error while initializing MonetizationServiceClient: " + str(e))

    def get_reminder_management_service(self):
        # type: () -> ReminderManagementServiceClient
        """Get ReminderManagementServiceClient for reminder_management_service.

        :return: Client for calling the service
        :rtype: ReminderManagementServiceClient
        :raises: :py:class:`ValueError`
        """
        try:
            return ReminderManagementServiceClient(self.api_configuration)
        except Exception as e:
            raise ValueError(
                "ServiceClientFactory Error while initializing ReminderManagementServiceClient: " + str(e))

    def get_ups_service(self):
        # type: () -> UpsServiceClient
        """Get UpsServiceClient for ups_service.

        :return: Client for calling the service
        :rtype: UpsServiceClient
        :raises: :py:class:`ValueError`
        """
        try:
            return UpsServiceClient(self.api_configuration)
        except Exception as e:
            raise ValueError(
                "ServiceClientFactory Error while initializing UpsServiceClient: " + str(e))

