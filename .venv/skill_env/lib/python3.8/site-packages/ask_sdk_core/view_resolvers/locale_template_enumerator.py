# -- coding: utf-8 --
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
import os
import typing

from ask_sdk_runtime.view_resolvers import AbstractTemplateEnumerator
from ask_sdk_core.utils.view_resolver import split_locale
if typing.TYPE_CHECKING:
    from typing import Iterator, Type
    from ask_sdk_core.handler_input import HandlerInput


class LocaleTemplateEnumerator(AbstractTemplateEnumerator):
    """Enumerator to enumerate template name based on locale property.

    Enumerate possible combinations of template name and given locale
    from the HandlerInput.
    For Example: For locale: 'en-US' and a response template name "template",
    the following combinations will be generated:
    template/en/US
    template/en_US
    template/en
    template_en_US
    template_en
    template
    """
    __instance = None

    def __new__(cls):
        # type: (Type[object]) -> LocaleTemplateEnumerator
        """Creating a singleton class to re-use same enumerator instance for
        different locale and template values.
        """
        if LocaleTemplateEnumerator.__instance is None:
            LocaleTemplateEnumerator.__instance = object.__new__(cls)
        return LocaleTemplateEnumerator.__instance

    def __init__(self):
        # type: () -> None
        """Enumerator to generate different path combinations for a given
        locale to load the template.
        """
        pass

    def generate_combinations(self, handler_input, template_name):
        # type: (HandlerInput, str) -> Iterator[str]
        """Create a generator object to iterate over different combinations
        of template name and locale property.

        :param handler_input: Handler Input instance with
            Request Envelope containing Request.
        :type  handler_input: :py:class:`ask_sdk_core.handler_input.HandlerInput`
        :param template_name: Template name which needs to be loaded
        :type template_name: str
        :return: Generator object which returns
            relative paths of the template file
        :rtype: Iterator[str]
        """
        locale = handler_input.request_envelope.request.locale
        language, country = split_locale(locale=locale)
        if not language and not country:
            yield template_name
        else:
            yield os.path.join(template_name, language, country)
            yield os.path.join(template_name, (language + "_" + country))
            yield os.path.join(template_name, language)
            yield (template_name + "_" + language + "_" + country)
            yield (template_name + "_" + language)
            yield template_name
