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

from ask_sdk_model.services import ServiceClientFactory, ApiConfiguration
from ask_sdk_model import ResponseEnvelope

from ask_sdk_runtime.skill import AbstractSkill, RuntimeConfiguration
from ask_sdk_runtime.dispatch import GenericRequestDispatcher
from ask_sdk_runtime.exceptions import AskSdkException

from .serialize import DefaultSerializer
from .handler_input import HandlerInput
from .attributes_manager import AttributesManager
from .view_resolvers import TemplateFactory
from .utils import RESPONSE_FORMAT_VERSION, user_agent_info
from .__version__ import __version__

if typing.TYPE_CHECKING:
    from typing import List, Dict, Any
    from ask_sdk_model.services import ApiClient
    from ask_sdk_model import RequestEnvelope, Response
    from ask_sdk_runtime.dispatch_components import (
        GenericRequestMapper, GenericHandlerAdapter, GenericExceptionMapper,
        AbstractRequestInterceptor, AbstractResponseInterceptor)
    from .attributes_manager import AbstractPersistenceAdapter


class SkillConfiguration(RuntimeConfiguration):
    """Configuration Object that represents standard components
    needed to build :py:class:`Skill`.

    :param request_mappers: List of request mapper instances.
    :type request_mappers: list(GenericRequestMapper)
    :param handler_adapters: List of handler adapter instances.
    :type handler_adapters: list(GenericHandlerAdapter)
    :param request_interceptors: List of
        request interceptor instances.
    :type request_interceptors: list(
        ask_sdk_core.dispatch_components.request_components.AbstractRequestInterceptor)
    :param response_interceptors: List of
        response interceptor instances.
    :type response_interceptors: list(
        ask_sdk_core.dispatch_components.request_components.AbstractResponseInterceptor)
    :param exception_mapper: Exception mapper instance.
    :type exception_mapper: GenericExceptionMapper
    :param persistence_adapter: Persistence adapter instance.
    :type persistence_adapter: AbstractPersistenceAdapter
    :param api_client: Api Client instance.
    :type api_client: ask_sdk_model.services.api_client.ApiClient
    :param custom_user_agent: Custom User Agent string
    :type custom_user_agent: str
    :param skill_id: ID of the skill.
    :type skill_id: str
    """

    def __init__(
            self, request_mappers, handler_adapters,
            request_interceptors=None, response_interceptors=None,
            exception_mapper=None, persistence_adapter=None,
            api_client=None, custom_user_agent=None, skill_id=None):
        # type: (List[GenericRequestMapper], List[GenericHandlerAdapter], List[AbstractRequestInterceptor], List[AbstractResponseInterceptor], GenericExceptionMapper, AbstractPersistenceAdapter, ApiClient, str, str) -> None
        """Configuration object that represents standard components
        needed for building :py:class:`Skill`.

        :param request_mappers: List of request mapper instances.
        :type request_mappers: list(GenericRequestMapper)
        :param handler_adapters: List of handler adapter instances.
        :type handler_adapters: list(GenericHandlerAdapter)
        :param request_interceptors: List of
            request interceptor instances.
        :type request_interceptors: list(
            ask_sdk_core.dispatch_components.request_components.AbstractRequestInterceptor)
        :param response_interceptors: List of
            response interceptor instances.
        :type response_interceptors: list(
            ask_sdk_core.dispatch_components.request_components.AbstractResponseInterceptor)
        :param exception_mapper: Exception mapper instance.
        :type exception_mapper: GenericExceptionMapper
        :param persistence_adapter: Persistence adapter instance.
        :type persistence_adapter: AbstractPersistenceAdapter
        :param api_client: Api Client instance.
        :type api_client: ask_sdk_model.services.api_client.ApiClient
        :param custom_user_agent: Custom User Agent string
        :type custom_user_agent: str
        :param skill_id: ID of the skill.
        :type skill_id: str
        """
        super(SkillConfiguration, self).__init__(
            request_mappers=request_mappers,
            handler_adapters=handler_adapters,
            request_interceptors=request_interceptors,
            response_interceptors=response_interceptors,
            exception_mapper=exception_mapper)
        self.persistence_adapter = persistence_adapter
        self.api_client = api_client
        self.custom_user_agent = custom_user_agent
        self.skill_id = skill_id


class CustomSkill(AbstractSkill):
    """Top level container for Request Dispatcher,
    Persistence Adapter and Api Client.

    :param skill_configuration: Configuration object that holds
        information about different components needed to build the
        skill object.
    :type skill_configuration: SkillConfiguration
    """

    def __init__(self, skill_configuration):
        # type: (SkillConfiguration) -> None
        """Top level container for Request Dispatcher,
        Persistence Adapter and Api Client.

        :param skill_configuration: Configuration object that holds
            information about different components needed to build the
            skill object.
        :type skill_configuration: SkillConfiguration
        """
        self.persistence_adapter = skill_configuration.persistence_adapter
        self.api_client = skill_configuration.api_client
        self.serializer = DefaultSerializer()
        self.skill_id = skill_configuration.skill_id
        self.custom_user_agent = skill_configuration.custom_user_agent
        self.loaders = skill_configuration.loaders
        self.renderer = skill_configuration.renderer

        self.request_dispatcher = GenericRequestDispatcher(
            options=skill_configuration
        )

    def supports(self, request_envelope, context):
        # type: (Dict[str, Any], Any) -> bool
        """Check if request envelope is of the expected skill format.

        :param request_envelope: input instance containing request information.
        :type request_envelope: Dict[str, Any]
        :param context: Context passed during invocation
        :type context: Any
        :return: boolean if this type of request can be handled by this
            skill.
        :rtype: bool
        """
        return 'request' in request_envelope

    def invoke(self, request_envelope, context):
        # type: (RequestEnvelope, Any) -> ResponseEnvelope
        """Invokes the dispatcher, to handle the request envelope and
        return a response envelope.

        :param request_envelope: Request Envelope instance containing
            request information
        :type request_envelope: RequestEnvelope
        :param context: Context passed during invocation
        :type context: Any
        :return: Response Envelope generated by handling the request
        :rtype: ResponseEnvelope
        """
        if (self.skill_id is not None and
                request_envelope.context.system.application.application_id !=
                self.skill_id):
            raise AskSdkException("Skill ID Verification failed!!")

        if self.api_client is not None:
            api_token = request_envelope.context.system.api_access_token
            api_endpoint = request_envelope.context.system.api_endpoint
            api_configuration = ApiConfiguration(
                serializer=self.serializer, api_client=self.api_client,
                authorization_value=api_token,
                api_endpoint=api_endpoint)
            factory = ServiceClientFactory(api_configuration=api_configuration)
        else:
            factory = None

        template_factory = TemplateFactory(
            template_loaders=self.loaders,
            template_renderer=self.renderer)

        attributes_manager = AttributesManager(
            request_envelope=request_envelope,
            persistence_adapter=self.persistence_adapter)

        handler_input = HandlerInput(
            request_envelope=request_envelope,
            attributes_manager=attributes_manager,
            context=context,
            service_client_factory=factory,
            template_factory=template_factory)

        response = self.request_dispatcher.dispatch(
            handler_input=handler_input)  # type: Response
        session_attributes = None

        if request_envelope.session is not None:
            session_attributes = (
                handler_input.attributes_manager.session_attributes)

        return ResponseEnvelope(
            response=response, version=RESPONSE_FORMAT_VERSION,
            session_attributes=session_attributes,
            user_agent=user_agent_info(
                sdk_version=__version__,
                custom_user_agent=self.custom_user_agent))
