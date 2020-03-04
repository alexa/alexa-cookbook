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
from typing import List, TypeVar, Any, Generic
from abc import ABCMeta, abstractmethod
from .exceptions import RuntimeConfigException
from .dispatch_components import (
    AbstractRequestHandler, AbstractRequestInterceptor,
    AbstractResponseInterceptor, AbstractExceptionHandler,
    GenericRequestHandlerChain, GenericRequestMapper,
    GenericHandlerAdapter, GenericExceptionMapper)
from .view_resolvers import (
    AbstractTemplateLoader, AbstractTemplateRenderer)


T = TypeVar('T')
SkillInput = TypeVar('SkillInput')
SkillOutput = TypeVar('SkillOutput')


class RuntimeConfiguration(object):
    """Configuration Object that represents standard components
    needed to build the dispatcher in the :py:class:`AbstractSkill`.

    :param request_mappers: List of request mapper instances.
    :type request_mappers: list(GenericRequestMapper)
    :param handler_adapters: List of handler adapter instances.
    :type handler_adapters: list(GenericHandlerAdapter)
    :param request_interceptors: List of
        request interceptor instances.
    :type request_interceptors: list(AbstractRequestInterceptor)
    :param response_interceptors: List of
        response interceptor instances.
    :type response_interceptors: list(AbstractResponseInterceptor)
    :param exception_mapper: Exception mapper instance.
    :type exception_mapper: GenericExceptionMapper
    """

    def __init__(
            self, request_mappers, handler_adapters,
            request_interceptors=None, response_interceptors=None,
            exception_mapper=None, loaders=None, renderer=None):
        # type: (List[GenericRequestMapper], List[GenericHandlerAdapter], List[AbstractRequestInterceptor], List[AbstractResponseInterceptor], GenericExceptionMapper, List[AbstractTemplateLoader], AbstractTemplateRenderer) -> None
        """Configuration object that represents standard components
        needed for building :py:class:`Skill`.

        :param request_mappers: List of request mapper instances.
        :type request_mappers: list(GenericRequestMapper)
        :param handler_adapters: List of handler adapter instances.
        :type handler_adapters: list(GenericHandlerAdapter)
        :param request_interceptors: List of
            request interceptor instances.
        :type request_interceptors: list(AbstractRequestInterceptor)
        :param response_interceptors: List of
            response interceptor instances.
        :type response_interceptors: list(AbstractResponseInterceptor)
        :param exception_mapper: Exception mapper instance.
        :type exception_mapper: GenericExceptionMapper
        :param loaders: List of loaders instance.
        :type loaders: list(AbstractTemplateLoader)
        :param renderer: Renderer instance.
        :type renderer: AbstractTemplateRenderer
        """
        if request_mappers is None:
            request_mappers = []
        self.request_mappers = request_mappers

        if handler_adapters is None:
            handler_adapters = []
        self.handler_adapters = handler_adapters

        if request_interceptors is None:
            request_interceptors = []
        self.request_interceptors = request_interceptors

        if response_interceptors is None:
            response_interceptors = []
        self.response_interceptors = response_interceptors

        self.exception_mapper = exception_mapper

        if loaders is None:
            loaders = []
        self.loaders = loaders

        self.renderer = renderer


class RuntimeConfigurationBuilder(object):
    """Builder class for creating a runtime configuration object, from
    base dispatch components.
    """

    def __init__(self):
        # type: () -> None
        """Builder class for creating a runtime configuration object,
        from base dispatch components.
        """
        self.request_handler_chains = []  # type: List
        self.global_request_interceptors = []  # type: List
        self.global_response_interceptors = []  # type: List
        self.exception_handlers = []  # type: List
        self.loaders = []  # type: List
        self.renderer = None  # type: Any

    def add_request_handler(self, request_handler):
        # type: (AbstractRequestHandler) -> None
        """Register input to the request handlers list.

        :param request_handler: Request Handler instance to be
            registered.
        :type request_handler: AbstractRequestHandler
        :return: None
        """
        if request_handler is None:
            raise RuntimeConfigException(
                "Valid Request Handler instance to be provided")

        if not isinstance(request_handler, AbstractRequestHandler):
            raise RuntimeConfigException(
                "Input should be a RequestHandler instance")

        self.request_handler_chains.append(GenericRequestHandlerChain(
            request_handler=request_handler))

    def add_request_handlers(self, request_handlers):
        # type: (List[AbstractRequestHandler]) -> None
        """Register input to the request handlers list.

        :param request_handlers: List of Request Handler instances to be
            registered.
        :type request_handlers: list(AbstractRequestHandler)
        :return: None
        """
        for request_handler in request_handlers:
            self.add_request_handler(request_handler)

    def add_exception_handler(self, exception_handler):
        # type: (AbstractExceptionHandler) -> None
        """Register input to the exception handlers list.

        :param exception_handler: Exception Handler instance to be
            registered.
        :type exception_handler: AbstractExceptionHandler
        :return: None
        """
        if exception_handler is None:
            raise RuntimeConfigException(
                "Valid Exception Handler instance to be provided")

        if not isinstance(exception_handler, AbstractExceptionHandler):
            raise RuntimeConfigException(
                "Input should be an ExceptionHandler instance")

        self.exception_handlers.append(exception_handler)

    def add_global_request_interceptor(self, request_interceptor):
        # type: (AbstractRequestInterceptor) -> None
        """Register input to the global request interceptors list.

        :param request_interceptor: Request Interceptor instance to be
            registered.
        :type request_interceptor: AbstractRequestInterceptor
        :return: None
        """
        if request_interceptor is None:
            raise RuntimeConfigException(
                "Valid Request Interceptor instance to be provided")

        if not isinstance(request_interceptor, AbstractRequestInterceptor):
            raise RuntimeConfigException(
                "Input should be a RequestInterceptor instance")

        self.global_request_interceptors.append(request_interceptor)

    def add_global_response_interceptor(self, response_interceptor):
        # type: (AbstractResponseInterceptor) -> None
        """Register input to the global response interceptors list.

        :param response_interceptor: Response Interceptor instance to
            be registered.
        :type response_interceptor: AbstractResponseInterceptor
        :return: None
        """
        if response_interceptor is None:
            raise RuntimeConfigException(
                "Valid Response Interceptor instance to be provided")

        if not isinstance(response_interceptor, AbstractResponseInterceptor):
            raise RuntimeConfigException(
                "Input should be a ResponseInterceptor instance")

        self.global_response_interceptors.append(response_interceptor)

    def add_loader(self, loader):
        # type: (AbstractTemplateLoader) -> None
        """Register input to the loaders list.

        :param loader: Loader to load the template
        :type loader:  :py:class:`ask_sdk_runtime.view_resolvers.AbstractTemplateLoader`
        """
        if loader is None:
            raise RuntimeConfigException(
                "Valid Loader instance to be provided")

        if not isinstance(loader, AbstractTemplateLoader):
            raise RuntimeConfigException(
                "{} should be a AbstractTemplateLoader instance".format(loader))

        self.loaders.append(loader)

    def add_loaders(self, loaders):
        # type: (List[AbstractTemplateLoader]) -> None
        """Register input to the loaders list.

        :param loaders: List of loaders
        :type loaders:  :py:class:`ask_sdk_runtime.view_resolvers.AbstractTemplateLoader`
        """
        for loader in loaders:
            self.add_loader(loader)

    def add_renderer(self, renderer):
        # type: (AbstractTemplateRenderer) -> None
        """Register input to the renderer.

        :param renderer: Renderer to render the template
        :type renderer:  :py:class:`ask_sdk_runtime.view_resolvers.AbstractTemplateRenderer`
        """
        if renderer is None:
            raise RuntimeConfigException(
                "Valid Renderer instance to be provided")

        if not isinstance(renderer, AbstractTemplateRenderer):
            raise RuntimeConfigException(
                "Input should be a AbstractTemplateRenderer instance")

        self.renderer = renderer

    def get_runtime_configuration(self):
        # type: () -> RuntimeConfiguration
        """Build the runtime configuration object from the registered
        components.

        :return: Runtime Configuration Object
        :rtype: RuntimeConfiguration
        """
        request_mapper = GenericRequestMapper(
            request_handler_chains=self.request_handler_chains)
        exception_mapper = GenericExceptionMapper(
            exception_handlers=self.exception_handlers)
        handler_adapter = GenericHandlerAdapter()

        runtime_configuration = RuntimeConfiguration(
            request_mappers=[request_mapper],
            handler_adapters=[handler_adapter],
            exception_mapper=exception_mapper,
            request_interceptors=self.global_request_interceptors,
            response_interceptors=self.global_response_interceptors,
            loaders=self.loaders,
            renderer=self.renderer)

        return runtime_configuration


class AbstractSkill(Generic[SkillInput, SkillOutput, T]):
    """Abstract class that acts as entry level container for skill
    invocation.

    Domain SDKs should implement the `supports` and `invoke` methods.
    """
    __metaclass__ = ABCMeta

    @abstractmethod
    def supports(self, event, context):
        # type: (SkillInput, T) -> bool
        """Check if the skill supports the corresponding input.

        :param event: input instance containing request information.
        :type event: SkillInput
        :param context: Context passed during invocation
        :type context: Any
        :return: boolean if this type of request can be handled by this
            skill.
        :rtype: bool
        """
        raise NotImplementedError

    @abstractmethod
    def invoke(self, event, context):
        # type: (SkillInput, T) -> SkillOutput
        """Invokes the dispatcher, to handle the skill input and
        return a skill output.

        :param event: input instance containing request information.
        :type event: SkillInput
        :param context: Context passed during invocation
        :type context: Any
        :return: output generated by handling the request.
        :rtype: SkillOutput
        """
        raise NotImplementedError
