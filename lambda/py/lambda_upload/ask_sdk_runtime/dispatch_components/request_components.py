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
from abc import ABCMeta, abstractmethod
from typing import Union, List, TypeVar, Generic, Optional

from ..exceptions import DispatchException

Input = TypeVar('Input')
Output = TypeVar('Output')


class AbstractRequestHandler(Generic[Input, Output]):
    """Request Handlers are responsible for processing dispatch inputs
    and generating output.

    Custom request handlers needs to implement ``can_handle`` and
    ``handle`` methods. ``can_handle`` returns True if the handler can
    handle the current input. ``handle`` processes the input and
    may return a output.
    """
    __metaclass__ = ABCMeta

    @abstractmethod
    def can_handle(self, handler_input):
        # type: (Input) -> bool
        """Returns true if Request Handler can handle the dispatch input.

        :param handler_input: Generic input passed to the
            dispatcher.
        :type handler_input: Input
        :return: Boolean value that tells the dispatcher if the
            current input can be handled by this handler.
        :rtype: bool
        """
        raise NotImplementedError

    @abstractmethod
    def handle(self, handler_input):
        # type: (Input) -> Union[None, Output]
        """Handles the dispatch input and provides an output for
        dispatcher to return.

        :param handler_input: Generic input passed to the
            dispatcher.
        :type handler_input: Input
        :return: Generic Output for the dispatcher to return or None
        :rtype: Union[Output, None]
        """
        raise NotImplementedError


class AbstractRequestInterceptor(Generic[Input]):
    """Interceptor that runs before the handler is called.

    The ``process`` method has to be implemented, to run custom logic on
    the input, before it is handled by the Handler.
    """
    __metaclass__ = ABCMeta

    @abstractmethod
    def process(self, handler_input):
        # type: (Input) -> None
        """Process the input before the Handler is run.

        :param handler_input: Generic input passed to the
            dispatcher.
        :type handler_input: Input
        :rtype: None
        """
        raise NotImplementedError


class AbstractResponseInterceptor(Generic[Input, Output]):
    """Interceptor that runs after the handler is called.

    The ``process`` method has to be implemented, to run custom logic on
    the input and the dispatch output generated after the handler is
    executed on the input.
    """
    __metaclass__ = ABCMeta

    @abstractmethod
    def process(self, handler_input, response):
        # type: (Input, Output) -> None
        """Process the input and the output after the Handler is run.

        :param handler_input: Generic input passed to the
            dispatcher.
        :type handler_input: Input
        :param response: Execution result of the Handler on
            dispatch input.
        :type response: Union[None, Output]
        :rtype: None
        """
        raise NotImplementedError


class AbstractRequestHandlerChain(object):
    """Abstract class containing Request Handler and corresponding
    Interceptors.
    """
    __metaclass__ = ABCMeta

    @abstractmethod
    def request_handler(self):
        # type: () -> object
        """

        :return: Registered Request Handler instance.
        :rtype: object
        """
        raise NotImplementedError

    @abstractmethod
    def request_interceptors(self):
        # type: () -> List[AbstractRequestInterceptor]
        """
        :return: List of registered Request Interceptors.
        :rtype: list(
            ask_sdk_runtime.dispatch_components.request_components.AbstractRequestInterceptor)
        """
        raise NotImplementedError

    @abstractmethod
    def response_interceptors(self):
        # type: () -> List[AbstractResponseInterceptor]
        """

        :return: List of registered Response Interceptors.
        :rtype: list(
            ask_sdk_runtime.dispatch_components.request_components.AbstractResponseInterceptor)
        """
        raise NotImplementedError


class GenericRequestHandlerChain(AbstractRequestHandlerChain):
    """Generic implementation of
    :py:class:`AbstractRequestHandlerChain`.

    Generic Request Handler Chain accepts request handler of any type.

    :param request_handler: Registered Request Handler instance of
        generic type.
    :type request_handler:
        ask_sdk_runtime.dispatch_components.request_components.AbstractRequestHandler
    :param request_interceptors:  List of registered Request
        Interceptors.
    :type request_interceptors: list(
        ask_sdk_runtime.dispatch_components.request_components.AbstractRequestInterceptor)
    :param response_interceptors: List of registered Response
        Interceptors.
    :type response_interceptors: list(
        ask_sdk_runtime.dispatch_components.request_components.AbstractResponseInterceptor)
    """
    def __init__(
            self, request_handler, request_interceptors=None,
            response_interceptors=None):
        # type: (AbstractRequestHandler, List[AbstractRequestInterceptor], List[AbstractResponseInterceptor]) -> None
        """Generic implementation of
        :py:class:`AbstractRequestHandlerChain`.

        :param request_handler: Registered Request Handler instance of
            generic type.
        :type request_handler:
            ask_sdk_runtime.dispatch_components.request_components.AbstractRequestHandler
        :param request_interceptors:  List of registered Request
            Interceptors.
        :type request_interceptors: list(
            ask_sdk_runtime.dispatch_components.request_components.AbstractRequestInterceptor)
        :param response_interceptors: List of registered Response
            Interceptors.
        :type response_interceptors: list(
            ask_sdk_runtime.dispatch_components.request_components.AbstractResponseInterceptor)
        """
        self.request_handler = request_handler
        
        if request_interceptors is None:
            request_interceptors = []
        self.request_interceptors = request_interceptors

        if response_interceptors is None:
            response_interceptors = []
        self.response_interceptors = response_interceptors

    @property
    def request_handler(self):
        # type: () -> AbstractRequestHandler
        return self._request_handler

    @request_handler.setter
    def request_handler(self, request_handler):
        # type: (AbstractRequestHandler) -> None
        if request_handler is None:
            raise DispatchException("No Request Handler provided")
        self._request_handler = request_handler

    @property
    def request_interceptors(self):
        # type: () -> List[AbstractRequestInterceptor]
        return self._request_interceptors

    @request_interceptors.setter
    def request_interceptors(self, request_interceptors):
        # type: (List[AbstractRequestInterceptor]) -> None
        if request_interceptors is None:
            request_interceptors = []
        self._request_interceptors = request_interceptors

    @property
    def response_interceptors(self):
        # type: () -> List[AbstractResponseInterceptor]
        return self._response_interceptors

    @response_interceptors.setter
    def response_interceptors(self, response_interceptors):
        # type: (List[AbstractResponseInterceptor]) -> None
        if response_interceptors is None:
            response_interceptors = []
        self._response_interceptors = response_interceptors

    def add_request_interceptor(self, interceptor):
        # type: (AbstractRequestInterceptor) -> None
        """Add interceptor to Request Interceptors list.

        :param interceptor: Request Interceptor instance.
        :type interceptor: ask_sdk_runtime.dispatch_components.request_components.AbstractRequestInterceptor
        """
        self.request_interceptors.append(interceptor)

    def add_response_interceptor(self, interceptor):
        # type: (AbstractResponseInterceptor) -> None
        """Add interceptor to Response Interceptors list.

        :param interceptor: Response Interceptor instance.
        :type interceptor: ask_sdk_runtime.dispatch_components.request_components.AbstractResponseInterceptor
        """
        self.response_interceptors.append(interceptor)


class AbstractRequestMapper(object):
    """Class for request routing to the appropriate handler chain.

    User needs to implement ``get_request_handler_chain`` method, to
    provide a routing mechanism of the input to the appropriate request
    handler chain containing the handler and the interceptors.
    """
    __metaclass__ = ABCMeta

    @abstractmethod
    def get_request_handler_chain(self, handler_input):
        # type: (Input) -> Optional[AbstractRequestHandlerChain]
        """Get the handler chain that can process the handler input.

        :param handler_input: Generic input passed to the
            dispatcher.
        :type handler_input: Input
        :return: Handler Chain that can handle the request under
            dispatch input.
        :rtype: AbstractRequestHandlerChain
        """
        pass


class GenericRequestMapper(AbstractRequestMapper):
    """Implementation of :py:class:`AbstractRequestMapper` that
    registers :py:class:`RequestHandlerChain`.

    The class accepts request handler chains of type
    :py:class:`GenericRequestHandlerChain` only. The
    ``get_request_handler_chain`` method returns the
    :py:class:`GenericRequestHandlerChain` instance that can
    handle the request in the handler input.

    :param request_handler_chains: List of
            :py:class:`GenericRequestHandlerChain` instances.
    :type request_handler_chains: list(GenericRequestHandlerChain)
    """

    def __init__(self, request_handler_chains):
        # type: (List[GenericRequestHandlerChain]) -> None
        """Implementation of :py:class:`AbstractRequestMapper` that
        registers :py:class:`GenericRequestHandlerChain`.

        The class accepts request handler chains of type
        :py:class:`GenericRequestHandlerChain` only.

        :param request_handler_chains: List of
            :py:class:`GenericRequestHandlerChain` instances.
        :type request_handler_chains: list(GenericRequestHandlerChain)
        """
        self.request_handler_chains = request_handler_chains

    @property
    def request_handler_chains(self):
        # type: () -> List[GenericRequestHandlerChain]
        """

        :return: List of :py:class:`GenericRequestHandlerChain`
            instances.
        :rtype: list(GenericRequestHandlerChain)
        """
        return self._request_handler_chains

    @request_handler_chains.setter
    def request_handler_chains(self, request_handler_chains):
        # type: (List[GenericRequestHandlerChain]) -> None
        """

        :param request_handler_chains: List of
            :py:class:`GenericRequestHandlerChain` instances.
        :type request_handler_chains: list(GenericRequestHandlerChain)
        :raises: :py:class:`ask_sdk_runtime.exceptions.DispatchException`
            when any object inside the input list is of invalid type
        """
        self._request_handler_chains = []  # type: List
        if request_handler_chains is not None:
            for chain in request_handler_chains:
                self.add_request_handler_chain(request_handler_chain=chain)

    def add_request_handler_chain(self, request_handler_chain):
        # type: (GenericRequestHandlerChain) -> None
        """Checks the type before adding it to the
        request_handler_chains instance variable.

        :param request_handler_chain:  Request Handler Chain instance.
        :type request_handler_chain: RequestHandlerChain
        :raises: :py:class:`ask_sdk_runtime.exceptions.DispatchException`
            if a null input is provided or if the input is of invalid type
        """
        if request_handler_chain is None or not isinstance(
                request_handler_chain, GenericRequestHandlerChain):
            raise DispatchException(
                "Request Handler Chain is not a GenericRequestHandlerChain "
                "instance")
        self._request_handler_chains.append(request_handler_chain)

    def get_request_handler_chain(self, handler_input):
        # type: (Input) -> Union[GenericRequestHandlerChain, None]
        """Get the request handler chain that can handle the dispatch
        input.

        :param handler_input: Generic input passed to the
            dispatcher.
        :type handler_input: Input
        :return: Handler Chain that can handle the input.
        :rtype: Union[None, GenericRequestHandlerChain]
        """
        for chain in self.request_handler_chains:
            handler = chain.request_handler  # type: AbstractRequestHandler
            if handler.can_handle(handler_input=handler_input):
                return chain
        return None


class AbstractHandlerAdapter(object):
    """Abstracts handling of a request for specific handler types."""
    __metaclass__ = ABCMeta

    @abstractmethod
    def supports(self, handler):
        # type: (AbstractRequestHandler) -> bool
        """Returns true if adapter supports the handler.

        This method checks if the adapter supports the handler
        execution. This is usually checked by the type of the handler.

        :param handler: Request Handler instance.
        :type handler: object
        :return: Boolean denoting whether the adapter supports the
            handler.
        :rtype: bool
        """
        pass

    @abstractmethod
    def execute(self, handler_input, handler):
        # type: (Input, AbstractRequestHandler) -> Union[None, Output]
        """Executes the handler with the provided dispatch input.

        :param handler_input: Generic input passed to the
            dispatcher.
        :type handler_input: Input
        :param handler: Request Handler instance.
        :type handler: object
        :return: Result executed by passing handler_input to handler.
        :rtype: Union[None, Output]
        """
        pass


class GenericHandlerAdapter(AbstractHandlerAdapter):
    """GenericHandler Adapter for handlers of type
    :py:class:`ask_sdk_runtime.dispatch_components.request_components.AbstractRequestHandler`.
    """

    def supports(self, handler):
        # type: (AbstractRequestHandler) -> bool
        """Returns true if handler is
        :py:class:`ask_sdk_runtime.dispatch_components.request_components.AbstractRequestHandler`
        instance.

        :param handler: Request Handler instance
        :type handler: ask_sdk_runtime.dispatch_components.request_components.AbstractRequestHandler
        :return: Boolean denoting whether the adapter supports the
            handler.
        :rtype: bool
        """
        return isinstance(handler, AbstractRequestHandler)

    def execute(self, handler_input, handler):
        # type: (Input, AbstractRequestHandler) -> Union[None, Output]
        """Executes the handler with the provided handler input.

        :param handler_input: Generic input passed to the
            dispatcher.
        :type handler_input: Input
        :param handler: Request Handler instance.
        :type handler: object
        :return: Result executed by passing handler_input to handler.
        :rtype: Union[None, Output]
        """
        return handler.handle(handler_input)
