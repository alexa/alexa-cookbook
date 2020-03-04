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
import io

from ask_sdk_runtime.view_resolvers import (
    AbstractTemplateLoader, AbstractTemplateEnumerator, AbstractTemplateCache)
from ask_sdk_core.view_resolvers.template_content import TemplateContent
from ask_sdk_core.view_resolvers.locale_template_enumerator import (
    LocaleTemplateEnumerator)
from ask_sdk_core.view_resolvers.lru_cache import LRUCache
from ask_sdk_core.exceptions import TemplateLoaderException
from ask_sdk_core.utils.view_resolver import (
    append_extension_if_not_exists, assert_not_null)

if typing.TYPE_CHECKING:
    from typing import Any, Optional
    from ask_sdk_core.handler_input import HandlerInput


class FileSystemTemplateLoader(AbstractTemplateLoader):
    """Template loader to load the corresponding templates from
    given path in the local file system.

    If the enumerator is not passed during FileSystemTemplateLoader
    initialization we create a default
    :py:class:`ask_sdk_core.view_resolver.LocaleTemplateEnumerator` instance
    and set it as enumerator, similarly if the cache instance is not
    passed we create a default :py:class:`ask_sdk_core.view_resolver.LRUCache`
    instance and set it as cache. If no encoding value is passed the
    default encoding is used to byte encode the template data stored in
    TemplateContent.

    :param dir_path: directory path to fetch templates from file system
    :type dir_path: str
    :param enumerator: Enumerator object to iterate over path combinations
    :type enumerator: :py:class:`ask_sdk_core.view_resolver.AbstractTemplateEnumerator`
    :param cache: Cache object to cache template data
    :type cache: :py:class:`ask_sdk_core.view_resolver.AbstractTemplateCache`
    """

    default_encoding = 'utf-8'

    def __init__(self, dir_path, encoding=default_encoding, enumerator=None,
                 cache=None):
        # type: (str, str, AbstractTemplateEnumerator, AbstractTemplateCache) -> None
        """Template loader with directory path and enumerator.

        If the enumerator is not passed during FileSystemTemplateLoader
        initialization we create a default
        :py:class:`ask_sdk_core.view_resolver.LocaleTemplateEnumerator` instance
        and set it as enumerator, similarly if the cache instance is not
        passed we create a default :py:class:`ask_sdk_core.view_resolver.LRUCache`
        instance and set it as cache. If no encoding value is passed the
        default encoding is used to byte encode the template data stored in
        TemplateContent.

        :param dir_path: directory path to fetch templates from file system
        :type dir_path: str
        :param enumerator: Enumerator object to iterate over path combinations
        :type enumerator: :py:class:`ask_sdk_core.view_resolver.AbstractTemplateEnumerator`
        :param cache: Cache object to cache template data
        :type cache: :py:class:`ask_sdk_core.view_resolver.AbstractTemplateCache`
        """
        self.dir_path = assert_not_null(attribute=dir_path,
                                        value='Directory path')
        self.encoding = encoding
        self.enumerator = FileSystemTemplateLoader.validate_enumerator(
            enumerator=enumerator)
        self.template_cache = FileSystemTemplateLoader.validate_cache(
            cache=cache)

    def load(self, handler_input, template_name, **kwargs):
        # type: (HandlerInput, str, Any) -> Optional[TemplateContent]
        """Loads the given input template into a TemplateContent object.

        This function takes in handlerInput and template_name as args and
        iterate over generated path combinations obtained from enumerator
        and find the absolute file path of the template and loads its content
        as a string to :py:class:`ask_sdk_core.view_resolvers.TemplateContent`
        object.In optional keyword arguments we can pass the file extension of the
        template to be loaded.

        :param handler_input: Handler Input instance with
            Request Envelope containing Request.
        :type  handler_input: :py:class:`ask_sdk_core.handler_input.HandlerInput`
        :param template_name: Template name to be loaded
        :type template_name: str
        :param **kwargs: Optional arguments that loader takes.
        :return: (optional) TemplateContent
        :rtype:  :py:class:`ask_sdk_core.view_resolvers.TemplateContent`
        :raises: :py:class:`ask_sdk_core.exceptions.TemplateResolverException`
            if loading of the template fails and ValueError if template_name
            is null
        """
        template_name = assert_not_null(attribute=template_name,
                                        value='Template Name')
        try:
            file_extension = kwargs.get('file_ext', None)
            for file_path in self.enumerator.generate_combinations(
                    handler_input=handler_input, template_name=template_name):
                file_path = append_extension_if_not_exists(
                    file_path, file_extension)
                abs_file_path = os.path.join(self.dir_path, file_path)
                cache_content = self.template_cache.get(key=abs_file_path)
                if cache_content is None:
                    if os.path.exists(abs_file_path):
                        with io.open(abs_file_path, mode="r",
                                     encoding=self.encoding) as f:
                            template_content = TemplateContent(
                                content_data=f.read().encode(self.encoding),
                                encoding=self.encoding)
                        self.template_cache.put(key=abs_file_path,
                                                template_content=template_content)
                        return template_content
                else:
                    return cache_content
            return None
        except Exception as e:
            raise TemplateLoaderException(
                "Failed to load the template : {} "
                "error : {}".format(template_name, str(e)))

    @staticmethod
    def validate_enumerator(enumerator=None):
        # type: (AbstractTemplateEnumerator) -> AbstractTemplateEnumerator
        """Check enumerator type and return a default locale enumerator if null.

        :param enumerator: Enumerator object to iterate over path combinations
        :type enumerator: :py:class:`ask_sdk_core.view_resolver.AbstractTemplateEnumerator`
        :return: Provided enumerator or LocaleEnumerator object to enumerate
        :rtype: :py:class:`ask_sdk_core.view_resolver.AbstractTemplateEnumerator`
        :raises: TypeError if enumerator instance is not of type
         :py:class:`ask_sdk_core.view_resolver.AbstractTemplateEnumerator`
        """
        if not enumerator:
            return LocaleTemplateEnumerator()
        else:
            if not isinstance(enumerator, AbstractTemplateEnumerator):
                raise TypeError("The provided enumerator is not of "
                                "type AbstractTemplateEnumerator")
        return enumerator

    @staticmethod
    def validate_cache(cache=None):
        # type: (AbstractTemplateCache) -> AbstractTemplateCache
        """Check cache type and return a default lru cache if null.

        :param cache: Cache object to get template content faster
        :type cache: :py:class:`ask_sdk_core.view_resolver.AbstractTemplateCache`
        :return: Provided cache or LRU Cache object
        :rtype: :py:class:`ask_sdk_core.view_resolver.AbstractTemplateCache`
        :raises: TypeError if cache instance is not of type
         :py:class:`ask_sdk_core.view_resolver.AbstractTemplateCache`
        """
        if not cache:
            return LRUCache()
        else:
            if not isinstance(cache, AbstractTemplateCache):
                raise TypeError("The provided cache is not of "
                                "type AbstractTemplateCache")
        return cache
