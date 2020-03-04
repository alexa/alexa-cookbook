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
from abc import ABCMeta, abstractmethod
from typing import Optional, TypeVar, Generic

TemplateContent = TypeVar('TemplateContent')


class AbstractTemplateCache(Generic[TemplateContent]):
    """Cache Interface for template caching."""
    __metaclass__ = ABCMeta

    @abstractmethod
    def get(self, key):
        # type: (str) -> Optional[TemplateContent]
        """Retrieve :py:class:`ask_sdk_core.view_resolvers.TemplateContent`
        from cache.

        :param key: Template identifier
        :type key: str
        :return: TemplateContent if cache hits else None
        :rtype:  :py:class:`ask_sdk_core.view_resolvers.TemplateContent`
        """
        pass

    @abstractmethod
    def put(self, key, template_content):
        # type: (str, TemplateContent) -> None
        """Insert TemplateContent into cache, assign identifier to entry.

        :param key: Template identifier
        :type key: str
        :param template_content: TemplateContent object to insert in cache
        :type template_content: :py:class:`ask_sdk_core.view_resolvers.TemplateContent`
        :return: None
        """
        pass
