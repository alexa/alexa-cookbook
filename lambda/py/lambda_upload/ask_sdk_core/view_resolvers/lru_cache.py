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
import time
from threading import RLock
from collections import OrderedDict
from ask_sdk_runtime.view_resolvers import AbstractTemplateCache
from ask_sdk_core.view_resolvers import AccessOrderedTemplateContent

if typing.TYPE_CHECKING:
    from typing import Optional
    from ask_sdk_core.view_resolvers import TemplateContent


class LRUCache(AbstractTemplateCache):
    """TemplateCache implementation to cache
    :py:class:`ask_sdk_core.view_resolvers.TemplateContent` using LRU replacement
    policy on access order.

    The cache can be initialized with a certain capacity range in bytes for
    storing template content and it has a time to live value which is used to
    determine the time a template content is valid inside cache and will be
    evicted once its passes the threshold value.

    If no capacity is specified, default value of 5 MB is set also if no
    time to live threshold specified, it is set to default value of 1 day.

    :param capacity: size of LRU cache in MB
    :type capacity : int
    :param time_to_live: Time the content is valid inside cache in milliseconds
    :type: int
    """
    default_capacity = 1024 * 1024 * 5
    default_time_to_live_threshold = 1000 * 60 * 60 * 24

    def __init__(self, capacity=default_capacity,
                 time_to_live=default_time_to_live_threshold):
        # type: (int, int) -> None
        """LRU Cache based on access order.

        If no capacity is specified, default value of 5 MB is set also if no
        time to live threshold specified, it is set to default value of 1 day.

        :param capacity: size of LRU cache in MB
        :type capacity : int
        :param time_to_live: Time the content is valid inside cache in milliseconds
        :type: int
        """
        self._max_capacity = capacity
        self._time_to_live = time_to_live
        self._template_data_map = OrderedDict()  # type: OrderedDict
        self._current_capacity = 0
        self._lock = RLock()

    def _is_fresh(self, access_ordered_template_content):
        # type: (AccessOrderedTemplateContent) -> bool
        """Check if the template_content is not stale to be inside cache.

        The function validates the timestamp present in the template object
        with the current time of the system if it is within the time to live
        threshold value for cache entries.

        System time at particular instant is used for timestamp values hence
        note the cache implementation depends on the time being constant.
        :param access_ordered_template_content: Template content to be verified.
        :type access_ordered_template_content: :py:class:`ask_sdk_core.view_resolvers.AccessOrderedTemplateContent`
        :return: True if data is not stale else False
        :rtype: Boolean
        """
        current_time = int(round(time.time() * 1000))
        data_time_stamp = access_ordered_template_content.time_stamp_millis
        return (current_time - data_time_stamp) < self._time_to_live

    def _deduct_cache_capacity(self, template):
        # type: (AccessOrderedTemplateContent) -> None
        """Function to update the cache size.

        :param template: TemplateContent data loaded into cache
        :type template: :py:class:`ask_sdk_core.view_resolvers.AccessOrderedTemplateContent`
        :return: None
        """
        self._current_capacity -= len(template.template_content.content_data)

    def get(self, key):
        # type: (str) -> Optional[TemplateContent]
        """Return the TemplateContent if exists in cache and it is fresh,
        otherwise return null.

        :param key: Template identifier
        :type key: str
        :return: TemplateContent if cache hits else None
        :rtype:  :py:class:`ask_sdk_core.view_resolvers.TemplateContent`
        """
        with self._lock:
            if key in self._template_data_map:
                ordered_template = self._template_data_map.pop(key)
                if self._is_fresh(ordered_template):
                    self._template_data_map[key] = ordered_template
                    return ordered_template.template_content
                self._deduct_cache_capacity(template=ordered_template)
            return None

    def put(self, key, template_content):
        # type: (str, TemplateContent) -> None
        """If the template size is larger than total cache capacity, no caching.
        If there's not enough capacity for new entry, remove least recently
        used ones until have capacity to insert.

        :param key: Template identifier
        :type key: str
        :param template_content: TemplateContent object to insert in cache
        :type template_content: :py:class:`ask_sdk_core.view_resolvers.TemplateContent`
        :return: None
        """
        with self._lock:
            size = len(template_content.content_data)
            if size > self._max_capacity:
                return
            if key in self._template_data_map:
                template = self._template_data_map.pop(key)
                self._deduct_cache_capacity(template)
            while size + self._current_capacity > self._max_capacity:
                _, template_value = self._template_data_map.popitem(
                    last=False)
                self._deduct_cache_capacity(template_value)
            data = AccessOrderedTemplateContent(template_content)
            self._template_data_map[key] = data
            self._current_capacity += size
