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


class AskSdkException(Exception):
    """Base class for exceptions raised by the SDK."""
    pass


class DispatchException(AskSdkException):
    """Class for exceptions raised during dispatch logic."""
    pass


class SerializationException(AskSdkException):
    """Class for exceptions raised during
    serialization/deserialization.
    """
    pass


class SkillBuilderException(AskSdkException):
    """Base exception class for Skill Builder exceptions."""
    pass


class RuntimeConfigException(AskSdkException):
    """Base exception class for Runtime Configuration Builder exceptions."""
    pass
