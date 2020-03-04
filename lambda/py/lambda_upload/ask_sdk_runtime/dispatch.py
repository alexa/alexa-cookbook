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

from .exceptions import DispatchException

if typing.TYPE_CHECKING:
    from typing import Union, TypeVar
    from .skill import RuntimeConfiguration
    Input = TypeVar('Input')
    Output = TypeVar('Output')


class AbstractRequestDispatcher(object):
    """Dispatcher which handles dispatching input request to the
    corresponding handler.

    User needs to implement the dispatch method, to handle the
    processing of the incoming request in the handler input. A response
    may be expected out of the dispatch method.
    """
    __metaclass__ = ABCMeta

    @abstractmethod
    def dispatch(self, handler_input):
        # type: (Input) -> Union[Output, None]
        """Dispatches an incoming request to the appropriate request
        handler and returns the output.

        :param handler_input: generic input to the dispatcher
        :type handler_input: Input
        :return: generic output returned by handler in the dispatcher
        :rtype: Union[None, Output]
        """
        pass


class GenericRequestDispatcher(AbstractRequestDispatcher):
    """Generic implementation of :py:class:`AbstractRequestDispatcher`.

    The runtime configuration contains the components required for the
    dispatcher, which is passed during initialization.

    When the dispatch method is invoked, using a list of
    :py:class:`ask_sdk_runtime.dispatch_components.request_components.RequestMapper`
    , the Dispatcher finds a handler for the request and delegates the
    invocation to the supported
    :py:class:`ask_sdk_runtime.dispatch_components.request_components.HandlerAdapter`
    . If the handler raises any exception, it is delegated to
    :py:class:`ask_sdk_runtime.dispatch_components.exception_components.ExceptionMapper`
    to handle or raise it to the upper stack.
    """

    def __init__(self, options):
        # type: (RuntimeConfiguration) -> None
        """Generic implementation of :py:class:`RequestDispatcher`.

        :param options: Runtime configuration instance, containing list of
            dispatch components required for Dispatcher Initialization.
        :type options: RuntimeConfiguration
        """
        if options.handler_adapters is None:
            options.handler_adapters = []

        if options.request_mappers is None:
            options.request_mappers = []

        if options.request_interceptors is None:
            options.request_interceptors = []

        if options.response_interceptors is None:
            options.response_interceptors = []

        self.handler_adapters = options.handler_adapters
        self.request_mappers = options.request_mappers
        self.exception_mapper = options.exception_mapper
        self.request_interceptors = options.request_interceptors
        self.response_interceptors = options.response_interceptors

    def dispatch(self, handler_input):
        # type: (Input) -> Union[Output, None]
        """Dispatches an incoming request to the appropriate
        request handler and returns the output.

        Before running the request on the appropriate request handler,
        dispatcher runs any predefined global request interceptors.
        On successful response returned from request handler, dispatcher
        runs predefined global response interceptors, before returning
        the response.

        :param handler_input: generic input to the dispatcher
        :type handler_input: Input
        :return: generic output handled by the handler, optionally
            containing a response
        :rtype: Union[None, Output]
        :raises: :py:class:`ask_sdk_runtime.exceptions.DispatchException`
        """
        try:
            for request_interceptor in self.request_interceptors:
                request_interceptor.process(handler_input=handler_input)

            output = self.__dispatch_request(handler_input)  # type: Union[Output, None]

            for response_interceptor in self.response_interceptors:
                response_interceptor.process(
                    handler_input=handler_input, response=output)

            return output
        except Exception as e:
            if self.exception_mapper is not None:
                exception_handler = self.exception_mapper.get_handler(
                    handler_input, e)
                if exception_handler is None:
                    raise e
                return exception_handler.handle(handler_input, e)
            else:
                raise e

    def __dispatch_request(self, handler_input):
        # type: (Input) -> Union[Output, None]
        """Process the request and return handler output.

        When the method is invoked, using the registered list of
        :py:class:`RequestMapper`, a Handler Chain is found that can
        handle the request. The handler invocation is delegated to the
        supported :py:class:`HandlerAdapter`. The registered
        request interceptors in the handler chain are processed before
        executing the handler. The registered response interceptors in
        the handler chain are processed after executing the handler.

        :param handler_input: generic input to the dispatcher containing
            incoming request and other context.
        :type handler_input: Input
        :return: Output from the 'handle' method execution of the
            supporting handler.
        :rtype: Union[None, Output]
        :raises DispatchException if there is no supporting
            handler chain or adapter
        """
        request_handler_chain = None
        for mapper in self.request_mappers:
            request_handler_chain = mapper.get_request_handler_chain(
                handler_input)
            if request_handler_chain is not None:
                break

        if request_handler_chain is None:
            raise DispatchException(
                "Unable to find a suitable request handler")

        request_handler = request_handler_chain.request_handler
        supported_handler_adapter = None
        for adapter in self.handler_adapters:
            if adapter.supports(request_handler):
                supported_handler_adapter = adapter
                break

        if supported_handler_adapter is None:
            raise DispatchException(
                "Unable to find a suitable request adapter")

        local_request_interceptors = request_handler_chain.request_interceptors
        for interceptor in local_request_interceptors:
            interceptor.process(handler_input=handler_input)

        output = supported_handler_adapter.execute(
            handler_input=handler_input, handler=request_handler)  # type: Union[Output, None]

        local_response_interceptors = (
            request_handler_chain.response_interceptors)
        for response_interceptor in local_response_interceptors:
            response_interceptor.process(
                handler_input=handler_input, response=output)

        return output
