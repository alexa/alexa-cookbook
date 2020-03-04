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

from .abstract_template_loader import AbstractTemplateLoader
from .abstract_template_enumerator import AbstractTemplateEnumerator
from .abstract_template_cache import AbstractTemplateCache
from .abstract_template_renderer import AbstractTemplateRenderer
from .abstract_template_factory import AbstractTemplateFactory