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

from ask_sdk_core.exceptions import TemplateLoaderException, TemplateRendererException
from ask_sdk_core.utils.view_resolver import assert_not_null

if typing.TYPE_CHECKING:
    from typing import Dict, List, Any
    from ask_sdk_runtime.view_resolvers import (
        AbstractTemplateLoader, AbstractTemplateRenderer)
    from ask_sdk_model import Response
    from ask_sdk_core.handler_input import HandlerInput
    from ask_sdk_core.view_resolvers import TemplateContent


class TemplateFactory(object):
    """TemplateFactory implementation to chain :py:class:`ask_sdk_core.view_resolver.AbstractTemplateLoader`
    and :py:class:`ask_sdk_core.view_resolver.AbstractTemplateRenderer`.

    It is responsible to pass in template name, data map to get
    response output for skill request.

    :param template_loaders: List of loaders to load the template
    :type template_loaders: :py:class:`ask_sdk_core.view_resolver.AbstractTemplateLoader`
    :param template_renderer: Renderer to render the template.
    :type template_renderer: :py:class:`ask_sdk_core.view_resolver.AbstractTemplateRenderer`
    """

    def __init__(self, template_loaders, template_renderer):
        # type: (List[AbstractTemplateLoader], AbstractTemplateRenderer) -> None
        """TemplateFactory implementation to chain :py:class:`ask_sdk_core.view_resolver.AbstractTemplateLoader`
        and :py:class:`ask_sdk_core.view_resolver.AbstractTemplateRenderer`.

        It is responsible to pass in template name, data map to get
        response output for skill request.

        :param template_loaders: List of loaders to load the template
        :type template_loaders: :py:class:`ask_sdk_core.view_resolver.AbstractTemplateLoader`
        :param template_renderer: Renderer to render the template.
        :type template_renderer: :py:class:`ask_sdk_core.view_resolver.AbstractTemplateRenderer`
        """
        self.template_loaders = template_loaders
        self.renderer = template_renderer

    def process_template(self, template_name, data_map, handler_input, **kwargs):
        # type: (str, Dict, HandlerInput, Any) -> Response
        """Process template and data using provided list of
        :py:class:`ask_sdk_core.view_resolver.AbstractTemplateLoader` and
        :py:class:`ask_sdk_core.view_resolver.AbstractTemplateRenderer` to
        generate skill response output.

        The additional arguments can contain information for the loader
        for eg: file extension of the templates.

        :param template_name: name of response template
        :type template_name: str
        :param data_map: map contains injecting data
        :type data_map: Dict[str, object]
        :param handler_input: Handler Input instance with Request Envelope
            containing Request.
        :type  handler_input: :py:class:`ask_sdk_core.handler_input.HandlerInput`
        :param kwargs: Additional keyword arguments for loader and renderer.
        :return: Skill Response output
        :rtype: :py:class:`ask_sdk_model.response.Response`
        """
        assert_not_null(template_name, "Template Name")
        assert_not_null(data_map, "Data Map")
        assert_not_null(self.template_loaders, "Template Loaders list")
        assert_not_null(self.renderer, "Template Renderer")
        template_content = self._load_template(template_name, handler_input, **kwargs)
        response = self._render_response(template_content, data_map, **kwargs)
        return response

    def _load_template(self, template_name, handler_input, **kwargs):
        # type: (str, HandlerInput, Any) -> TemplateContent
        """Iterate through the list of loaders and load the given template.

        :param template_name: name of response template
        :type template_name: str
        :param handler_input: Handler Input instance with Request Envelope
            containing Request.
        :type  handler_input: :py:class:`ask_sdk_core.handler_input.HandlerInput`
        :param kwargs: Additional keyword arguments for loader and renderer.
        :return: Template Content object
        :rtype: :py:class:`ask_sdk_core.view_resolvers.TemplateContent`
        :raises: :py:class:`ask_sdk_core.exceptions.TemplateResolverException`
            if none of the loaders failed to load the template or any exception
            raised during loading of the template.
        """
        for template_loader in self.template_loaders:
            try:
                template_content = template_loader.load(
                    handler_input, template_name, **kwargs)
                if template_content is not None:
                    return template_content
            except Exception as e:
                raise TemplateLoaderException("Failed to load the template:"
                                                " {} using {} with error : {}"
                                              .format(template_name,
                                                        template_loader, str(e)))
        raise TemplateLoaderException("Unable to load template: {} using "
                                        "provided loaders.".format(template_name))

    def _render_response(self, template_content, data_map, **kwargs):
        # type: (TemplateContent, Dict, Any) -> Response
        """Render the template content injecting the data in map to generate
        a response output for skill request.

        :param template_content: TemplateContent object containing template.
        :type template_content: :py:class:`ask_sdk_core.view_resolvers.TemplateContent`
        :param data_map: map contains injecting data
        :type data_map: Dict[str, object]
        :return: Skill Response output
        :rtype: :py:class:`ask_sdk_model.response.Response`
        :raises: :py:class:`ask_sdk_core.exceptions.TemplateResolverException`
            if rendering template fails while generating response.
        """
        try:
            return self.renderer.render(template_content, data_map, **kwargs)
        except Exception as e:
            raise TemplateRendererException("Failed to render template: {} "
                                            "using {} with error: {}"
                                          .format(template_content,
                                                    self.renderer, str(e)))
