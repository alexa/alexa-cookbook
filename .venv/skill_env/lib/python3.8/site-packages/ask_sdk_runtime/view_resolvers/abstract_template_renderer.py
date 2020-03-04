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
from abc import ABCMeta, abstractmethod
from typing import Dict, Any, TypeVar, Generic

Input = TypeVar('Input')
Output = TypeVar('Output')


class AbstractTemplateRenderer(Generic[Input, Output]):
    """Render interface for template rendering and response conversion."""
    __metaclass__ = ABCMeta

    @abstractmethod
    def render(self, template_content, data_map, **kwargs):
        # type: (Input, Dict, Any) -> Output
        """Map data map into template content and render output.
        
        :param template_content: Template Content data
        :type template_content: Input
        :param data_map: Map of template content slot values
        :type data_map: Dict[str, object]
        :param **kwargs: Optional arguments that renderer takes.
        :return: Skill Response output
        :rtype: Response
        """
        pass
