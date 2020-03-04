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

from abc import ABCMeta, abstractmethod
from .skill import RuntimeConfigurationBuilder

from .dispatch_components import (
    AbstractRequestHandler, AbstractRequestInterceptor,
    AbstractResponseInterceptor, AbstractExceptionHandler)
from .exceptions import SkillBuilderException
from .view_resolvers import (
    AbstractTemplateLoader, AbstractTemplateRenderer)


if typing.TYPE_CHECKING:
    from typing import Callable, TypeVar, List
    from .skill import AbstractSkill
    T = TypeVar('T')
    Input = TypeVar('Input')


class AbstractSkillBuilder(object):
    """Abstract Skill Builder with helper functions for building
    :py:class:`ask_sdk_runtime.skill.AbstractSkill` object.

    Domain SDKs has to implement the `create` method that returns
    an instance of the skill implementation for the domain type.
    """
    __metaclass__ = ABCMeta

    def __init__(self):
        # type: () -> None
        self.runtime_configuration_builder = RuntimeConfigurationBuilder()

    def add_request_handler(self, request_handler):
        # type: (AbstractRequestHandler) -> None
        """Register input to the request handlers list.

        :param request_handler: Request Handler instance to be
            registered.
        :type request_handler: ask_sdk_runtime.dispatch_components.request_components.AbstractRequestHandler
        :return: None
        """
        self.runtime_configuration_builder.add_request_handler(
            request_handler)

    def add_exception_handler(self, exception_handler):
        # type: (AbstractExceptionHandler) -> None
        """Register input to the exception handlers list.

        :param exception_handler: Exception Handler instance to be
            registered.
        :type exception_handler: ask_sdk_runtime.dispatch_components.request_components.AbstractExceptionHandler
        :return: None
        """
        self.runtime_configuration_builder.add_exception_handler(
            exception_handler)

    def add_global_request_interceptor(self, request_interceptor):
        # type: (AbstractRequestInterceptor) -> None
        """Register input to the global request interceptors list.

        :param request_interceptor: Request Interceptor instance to be
            registered.
        :type request_interceptor: ask_sdk_runtime.dispatch_components.request_components.AbstractRequestInterceptor
        :return: None
        """
        self.runtime_configuration_builder.add_global_request_interceptor(
            request_interceptor)

    def add_global_response_interceptor(self, response_interceptor):
        # type: (AbstractResponseInterceptor) -> None
        """Register input to the global response interceptors list.

        :param response_interceptor: Response Interceptor instance to
            be registered.
        :type response_interceptor: ask_sdk_runtime.dispatch_components.request_components.AbstractResponseInterceptor
        :return: None
        """
        self.runtime_configuration_builder.add_global_response_interceptor(
            response_interceptor)

    def add_loaders(self, loaders):
        # type: (List[AbstractTemplateLoader]) -> None
        """Register input to the loaders list.

        :param loaders: List of loaders
        :type loaders:  :py:class:`ask_sdk_runtime.view_resolvers.AbstractTemplateLoader`
        """
        self.runtime_configuration_builder.add_loaders(loaders)

    def add_loader(self, loader):
        # type: (AbstractTemplateLoader) -> None
        """Register input to loaders list.

        :param loader: Loader to load template from a specific data source
        :type loader: :py:class:`ask_sdk_runtime.view_resolvers.AbstractTemplateLoader`
        """
        self.runtime_configuration_builder.add_loader(loader)

    def add_renderer(self, renderer):
        # type: (AbstractTemplateRenderer) -> None
        """Register renderer to generate template responses.

        :param renderer: Renderer to render the template
        :type renderer:  :py:class:`ask_sdk_runtime.view_resolvers.AbstractTemplateRenderer`
        """
        self.runtime_configuration_builder.add_renderer(renderer)

    def request_handler(self, can_handle_func):
        # type: (Callable[[Input], bool]) -> Callable
        """Decorator that can be used to add request handlers easily to
        the builder.

        The can_handle_func has to be a Callable instance, which takes
        a single parameter and no varargs or kwargs. This is because
        of the RequestHandler class signature restrictions. The
        returned wrapper function can be applied as a decorator on any
        function that returns a response object by the skill. The
        function should follow the signature of the handle function in
        :py:class:`ask_sdk_runtime.dispatch_components.request_components.AbstractRequestHandler`
        class.

        :param can_handle_func: The function that validates if the
            request can be handled.
        :type can_handle_func: Callable[[Input], bool]
        :return: Wrapper function that can be decorated on a handle
            function.
        """
        def wrapper(handle_func):
            if not callable(can_handle_func) or not callable(handle_func):
                raise SkillBuilderException(
                    "Request Handler can_handle_func and handle_func "
                    "input parameters should be callable")

            class_attributes = {
                "can_handle": lambda self, handler_input: can_handle_func(
                    handler_input),
                "handle": lambda self, handler_input: handle_func(
                    handler_input)
            }

            request_handler_class = type(
                "RequestHandler{}".format(
                    handle_func.__name__.title().replace("_", "")),
                (AbstractRequestHandler,), class_attributes)

            self.add_request_handler(request_handler=request_handler_class())
            return handle_func
        return wrapper

    def exception_handler(self, can_handle_func):
        # type: (Callable[[Input, Exception], bool]) -> Callable
        """Decorator that can be used to add exception handlers easily
        to the builder.

        The can_handle_func has to be a Callable instance, which takes
        two parameters and no varargs or kwargs. This is because of the
        ExceptionHandler class signature restrictions. The returned
        wrapper function can be applied as a decorator on any function
        that processes the exception raised during dispatcher and
        returns a response object by the skill. The function should
        follow the signature of the handle function in
        :py:class:`ask_sdk_runtime.dispatch_components.exception_components.AbstractExceptionHandler`
        class.

        :param can_handle_func: The function that validates if the
            exception can be handled.
        :type can_handle_func: Callable[[Input, Exception], bool]
        :return: Wrapper function that can be decorated on a handle
            function.
        """
        def wrapper(handle_func):
            if not callable(can_handle_func) or not callable(handle_func):
                raise SkillBuilderException(
                    "Exception Handler can_handle_func and handle_func input "
                    "parameters should be callable")

            class_attributes = {
                "can_handle": (
                    lambda self, handler_input, exception: can_handle_func(
                        handler_input, exception)),
                "handle": lambda self, handler_input, exception: handle_func(
                    handler_input, exception)
            }

            exception_handler_class = type(
                "ExceptionHandler{}".format(
                    handle_func.__name__.title().replace("_", "")),
                (AbstractExceptionHandler,), class_attributes)

            self.add_exception_handler(
                exception_handler=exception_handler_class())
            return handle_func
        return wrapper

    def global_request_interceptor(self):
        # type: () -> Callable
        """Decorator that can be used to add global request
        interceptors easily to the builder.

        The returned wrapper function can be applied as a decorator on
        any function that processes the input. The function should
        follow the signature of the process function in
        :py:class:`ask_sdk_runtime.dispatch_components.request_components.AbstractRequestInterceptor`
        class.

        :return: Wrapper function that can be decorated on a
            interceptor process function.
        """
        def wrapper(process_func):
            if not callable(process_func):
                raise SkillBuilderException(
                    "Global Request Interceptor process_func input parameter "
                    "should be callable")

            class_attributes = {
                "process": lambda self, handler_input: process_func(
                    handler_input)
            }

            request_interceptor = type(
                "RequestInterceptor{}".format(
                    process_func.__name__.title().replace("_", "")),
                (AbstractRequestInterceptor,), class_attributes)

            self.add_global_request_interceptor(
                request_interceptor=request_interceptor())
            return process_func
        return wrapper

    def global_response_interceptor(self):
        # type: () -> Callable
        """Decorator that can be used to add global
        response interceptors easily to the builder.

        The returned wrapper function can be applied as a decorator
        on any function that processes the input and the response
        generated by the request handler. The function should follow
        the signature of the process function in
        :py:class:`ask_sdk_runtime.dispatch_components.request_components.AbstractResponseInterceptor`
        class.

        :return: Wrapper function that can be decorated on a
            interceptor process function.
        """
        def wrapper(process_func):
            if not callable(process_func):
                raise SkillBuilderException(
                    "Global Response Interceptor process_func input "
                    "parameter should be callable")

            class_attributes = {
                "process": (
                    lambda self, handler_input, response: process_func(
                        handler_input, response))
            }

            response_interceptor = type(
                "ResponseInterceptor{}".format(
                    process_func.__name__.title().replace("_", "")),
                (AbstractResponseInterceptor,), class_attributes)

            self.add_global_response_interceptor(
                response_interceptor=response_interceptor())
            return process_func
        return wrapper

    @abstractmethod
    def create(self):
        # type: () -> AbstractSkill
        """Create a skill object using the registered components.

        :return: a skill object that can be used for invocation.
        :rtype: AbstractSkill
        """
        raise NotImplementedError
