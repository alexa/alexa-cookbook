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
# Importing the most commonly used component classes, for
# short-circuiting purposes.

from .access_ordered_template_content import AccessOrderedTemplateContent
from .file_system_template_loader import FileSystemTemplateLoader
from .locale_template_enumerator import LocaleTemplateEnumerator
from .lru_cache import LRUCache
from .template_content import TemplateContent
from .template_factory import TemplateFactory