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

from ask_sdk_runtime.dispatch_components.exception_components import (
    AbstractExceptionHandler as GenericExceptionHandler
)

from ..exceptions import DispatchException

if typing.TYPE_CHECKING:
    from typing import Union
    from ask_sdk_model import Response
    from ..handler_input import HandlerInput


class AbstractExceptionHandler(GenericExceptionHandler):
    """Handles exception types and optionally produce a response.

    The abstract class is similar to Request Handler, with methods
    can_handle and handle. The ``can_handle`` method checks if the handler
    can support the input and the exception. The ``handle`` method
    processes the input and exception, to optionally produce a response.
    """
    @abstractmethod
    def can_handle(self, handler_input, exception):
        # type: (HandlerInput, Exception) -> bool
        """Checks if the handler can support the exception raised
        during dispatch.

        :param handler_input: Handler Input instance.
        :type handler_input: HandlerInput
        :param exception: Exception raised during dispatch.
        :type exception: Exception
        :return: Boolean whether handler can handle exception or not.
        :rtype: bool
        """
        raise NotImplementedError

    @abstractmethod
    def handle(self, handler_input, exception):
        # type: (HandlerInput, Exception) -> Union[Response, None]
        """Process the handler input and exception.

        :param handler_input: Handler Input instance.
        :type handler_input: HandlerInput
        :param exception: Exception raised during dispatch.
        :type exception: Exception
        :return: Optional response object to serve as dispatch return.
        :rtype: Union[None, Response]
        """
        raise NotImplementedError
