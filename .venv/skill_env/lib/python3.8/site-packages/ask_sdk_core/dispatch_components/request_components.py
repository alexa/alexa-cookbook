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
from abc import abstractmethod

from ask_sdk_runtime.dispatch_components.request_components import (
    AbstractRequestHandler as GenericRequestHandler,
    AbstractRequestInterceptor as GenericRequestInterceptor,
    AbstractResponseInterceptor as GenericResponseInterceptor)

if typing.TYPE_CHECKING:
    from typing import Union
    from ask_sdk_model import Response
    from ..handler_input import HandlerInput


class AbstractRequestHandler(GenericRequestHandler):
    """Request Handlers are responsible for processing Request inside
    the Handler Input and generating Response.

    Custom request handlers needs to implement ``can_handle`` and
    ``handle`` methods. ``can_handle`` returns True if the handler can
    handle the current request. ``handle`` processes the Request and
    may return a Response.
    """

    @abstractmethod
    def can_handle(self, handler_input):
        # type: (HandlerInput) -> bool
        """Returns true if Request Handler can handle the Request
        inside Handler Input.

        :param handler_input: Handler Input instance with
            Request Envelope containing Request.
        :type handler_input: HandlerInput
        :return: Boolean value that tells the dispatcher if the
            current request can be handled by this handler.
        :rtype: bool
        """
        raise NotImplementedError

    @abstractmethod
    def handle(self, handler_input):
        # type: (HandlerInput) -> Union[None, Response]
        """Handles the Request inside handler input and provides a
        Response for dispatcher to return.

        :param handler_input: Handler Input instance with
            Request Envelope containing Request.
        :type handler_input: HandlerInput
        :return: Response for the dispatcher to return or None
        :rtype: Union[Response, None]
        """
        raise NotImplementedError


class AbstractRequestInterceptor(GenericRequestInterceptor):
    """Interceptor that runs before the handler is called.

    The ``process`` method has to be implemented, to run custom logic on
    the input, before it is handled by the Handler.
    """
    @abstractmethod
    def process(self, handler_input):
        # type: (HandlerInput) -> None
        """Process the input before the Handler is run.

        :param handler_input: Handler Input instance.
        :type handler_input: HandlerInput
        :rtype: None
        """
        raise NotImplementedError


class AbstractResponseInterceptor(GenericResponseInterceptor):
    """Interceptor that runs after the handler is called.

    The ``process`` method has to be implemented, to run custom logic on
    the input and the response generated after the handler is executed
    on the input.
    """
    @abstractmethod
    def process(self, handler_input, response):
        # type: (HandlerInput, Response) -> None
        """Process the input and the response after the Handler is run.

        :param handler_input: Handler Input instance.
        :type handler_input: HandlerInput
        :param response: Execution result of the Handler on
            handler input.
        :type response: Union[None, :py:class:`ask_sdk_model.response.Response`]
        :rtype: None
        """
        raise NotImplementedError
