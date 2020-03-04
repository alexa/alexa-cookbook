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
import time
from ask_sdk_core.utils.view_resolver import assert_not_null
import typing

if typing.TYPE_CHECKING:
    from ask_sdk_core.view_resolvers import TemplateContent


class AccessOrderedTemplateContent(object):
    """Time based wrapper of :py:class:`ask_sdk_core.view_resolvers.TemplateContent`
    for :py:class:`ask_sdk_core.view_resolvers.LRUCache` to manage.

    AccessOrderedTemplateContent class is used for adding a timestamp in
    milliseconds for the template_content object which is used during
    caching to determine if the data is stale and needs to be evicted from
    the cache after it crosses its time to live threshold value.

    System time at particular instant is used for timestamp values hence
    note the cache implementation depends on the time being constant.

    i.e System clock can go backwards and time stamp is affected by this
    updates.
    https://docs.python.org/3/library/time.html#time.time

    :param template_content: Template Content
    :type template_content: py:class:`ask_sdk_core.view_resolvers.TemplateContent`
    """
    def __init__(self, template_content):
        # type: (TemplateContent) -> None
        """Wrap the TemplateContent object with a timestamp for LRU caching.

        :param template_content: Template Content
        :type template_content: py:class:`ask_sdk_core.view_resolvers.TemplateContent`
        """
        self.template_content = assert_not_null(template_content,
                                                "Template Content")
        self.time_stamp_millis = int(round(time.time() * 1000))

