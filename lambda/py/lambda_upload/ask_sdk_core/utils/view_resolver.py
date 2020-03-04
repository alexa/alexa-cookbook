# -*- coding: utf-8 -*-
#
# Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights
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

import os
import re

if typing.TYPE_CHECKING:
    from typing import Any, Sequence, Optional


def split_locale(locale):
    # type: (str) -> Sequence[Optional[str]]
    """Function to extract language and country codes from the locale.

    :param locale: A string indicating the user’s locale. For example: en-US.
    :type locale: str
    :return: Tuple of (language, country)
    :rtype: (optional) Tuple(str,str)
    :raises: ValueError for invalid locale values
    """
    if not locale:
        return None, None
    match = re.match(r'^([a-z]{2})-([A-Z]{2})$', locale)
    if match is None:
        raise ValueError("Invalid locale: {}".format(locale))
    return match.groups()


def append_extension_if_not_exists(file_path, file_extension):
    # type: (str, str) -> str
    """Function to check if the file path already has file extension added to
    it else append it with file extension argument if available.

    :param file_path: Input file to check for extension existence
    :type file_path: str
    :param file_extension: File extension of the template to be loaded
    :type file_extension: str
    :return: File path with file extension
    :rtype: str
    """
    if not file_extension:
        return file_path
    extension = os.path.splitext(file_path)[-1]
    if not extension:
        return "{}.{}".format(file_path, file_extension)
    return file_path


def assert_not_null(attribute, value):
    # type: (Any, str) -> Any
    """Asserts that the given object is non-null and returns it.

    :param attribute: Object to assert on
    :param value: Field name to display in exception message if null
    :return: Object if non null
    :raises: ValueError if object is null
    """
    if not attribute:
        raise ValueError("{} is null".format(value))
    return attribute
