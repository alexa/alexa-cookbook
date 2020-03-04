# coding: utf-8

#
# Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file
# except in compliance with the License. A copy of the License is located at
#
# http://aws.amazon.com/apache2.0/
#
# or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for
# the specific language governing permissions and limitations under the License.
#

import pprint
import re  # noqa: F401
import six
import typing
from enum import Enum


if typing.TYPE_CHECKING:
    from typing import Dict, List, Optional, Union
    from datetime import datetime
    from ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen_pager_tag import ComponentVisibleOnScreenPagerTag
    from ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen_list_item_tag import ComponentVisibleOnScreenListItemTag
    from ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen_scrollable_tag import ComponentVisibleOnScreenScrollableTag
    from ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen_viewport_tag import ComponentVisibleOnScreenViewportTag
    from ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen_list_tag import ComponentVisibleOnScreenListTag
    from ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen_media_tag import ComponentVisibleOnScreenMediaTag


class ComponentVisibleOnScreenTags(object):
    """
    The tags which were attached to an element.


    :param checked: The checked state of a component that has two states.
    :type checked: (optional) bool
    :param clickable: A button or item that can be pressed.
    :type clickable: (optional) bool
    :param disabled: Whether the element is disabled.
    :type disabled: (optional) bool
    :param focused: The focused state of a component that can take focus.
    :type focused: (optional) bool
    :param list: An ordered list of items.
    :type list: (optional) ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen_list_tag.ComponentVisibleOnScreenListTag
    :param list_item: An element in a sequence.
    :type list_item: (optional) ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen_list_item_tag.ComponentVisibleOnScreenListItemTag
    :param media: Media player
    :type media: (optional) ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen_media_tag.ComponentVisibleOnScreenMediaTag
    :param ordinal: A visibly numbered element.
    :type ordinal: (optional) int
    :param pager: A collection of items that are displayed one at a time.
    :type pager: (optional) ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen_pager_tag.ComponentVisibleOnScreenPagerTag
    :param scrollable: A scrolling region
    :type scrollable: (optional) ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen_scrollable_tag.ComponentVisibleOnScreenScrollableTag
    :param spoken: A region of the screen that can be read out by TTS
    :type spoken: (optional) bool
    :param viewport: The entire screen in which a document is rendered.
    :type viewport: (optional) ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen_viewport_tag.ComponentVisibleOnScreenViewportTag

    """
    deserialized_types = {
        'checked': 'bool',
        'clickable': 'bool',
        'disabled': 'bool',
        'focused': 'bool',
        'list': 'ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen_list_tag.ComponentVisibleOnScreenListTag',
        'list_item': 'ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen_list_item_tag.ComponentVisibleOnScreenListItemTag',
        'media': 'ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen_media_tag.ComponentVisibleOnScreenMediaTag',
        'ordinal': 'int',
        'pager': 'ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen_pager_tag.ComponentVisibleOnScreenPagerTag',
        'scrollable': 'ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen_scrollable_tag.ComponentVisibleOnScreenScrollableTag',
        'spoken': 'bool',
        'viewport': 'ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen_viewport_tag.ComponentVisibleOnScreenViewportTag'
    }  # type: Dict

    attribute_map = {
        'checked': 'checked',
        'clickable': 'clickable',
        'disabled': 'disabled',
        'focused': 'focused',
        'list': 'list',
        'list_item': 'listItem',
        'media': 'media',
        'ordinal': 'ordinal',
        'pager': 'pager',
        'scrollable': 'scrollable',
        'spoken': 'spoken',
        'viewport': 'viewport'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, checked=None, clickable=None, disabled=None, focused=None, list=None, list_item=None, media=None, ordinal=None, pager=None, scrollable=None, spoken=None, viewport=None):
        # type: (Optional[bool], Optional[bool], Optional[bool], Optional[bool], Optional[ComponentVisibleOnScreenListTag], Optional[ComponentVisibleOnScreenListItemTag], Optional[ComponentVisibleOnScreenMediaTag], Optional[int], Optional[ComponentVisibleOnScreenPagerTag], Optional[ComponentVisibleOnScreenScrollableTag], Optional[bool], Optional[ComponentVisibleOnScreenViewportTag]) -> None
        """The tags which were attached to an element.

        :param checked: The checked state of a component that has two states.
        :type checked: (optional) bool
        :param clickable: A button or item that can be pressed.
        :type clickable: (optional) bool
        :param disabled: Whether the element is disabled.
        :type disabled: (optional) bool
        :param focused: The focused state of a component that can take focus.
        :type focused: (optional) bool
        :param list: An ordered list of items.
        :type list: (optional) ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen_list_tag.ComponentVisibleOnScreenListTag
        :param list_item: An element in a sequence.
        :type list_item: (optional) ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen_list_item_tag.ComponentVisibleOnScreenListItemTag
        :param media: Media player
        :type media: (optional) ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen_media_tag.ComponentVisibleOnScreenMediaTag
        :param ordinal: A visibly numbered element.
        :type ordinal: (optional) int
        :param pager: A collection of items that are displayed one at a time.
        :type pager: (optional) ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen_pager_tag.ComponentVisibleOnScreenPagerTag
        :param scrollable: A scrolling region
        :type scrollable: (optional) ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen_scrollable_tag.ComponentVisibleOnScreenScrollableTag
        :param spoken: A region of the screen that can be read out by TTS
        :type spoken: (optional) bool
        :param viewport: The entire screen in which a document is rendered.
        :type viewport: (optional) ask_sdk_model.interfaces.alexa.presentation.apl.component_visible_on_screen_viewport_tag.ComponentVisibleOnScreenViewportTag
        """
        self.__discriminator_value = None  # type: str

        self.checked = checked
        self.clickable = clickable
        self.disabled = disabled
        self.focused = focused
        self.list = list
        self.list_item = list_item
        self.media = media
        self.ordinal = ordinal
        self.pager = pager
        self.scrollable = scrollable
        self.spoken = spoken
        self.viewport = viewport

    def to_dict(self):
        # type: () -> Dict[str, object]
        """Returns the model properties as a dict"""
        result = {}  # type: Dict

        for attr, _ in six.iteritems(self.deserialized_types):
            value = getattr(self, attr)
            if isinstance(value, list):
                result[attr] = list(map(
                    lambda x: x.to_dict() if hasattr(x, "to_dict") else
                    x.value if isinstance(x, Enum) else x,
                    value
                ))
            elif isinstance(value, Enum):
                result[attr] = value.value
            elif hasattr(value, "to_dict"):
                result[attr] = value.to_dict()
            elif isinstance(value, dict):
                result[attr] = dict(map(
                    lambda item: (item[0], item[1].to_dict())
                    if hasattr(item[1], "to_dict") else
                    (item[0], item[1].value)
                    if isinstance(item[1], Enum) else item,
                    value.items()
                ))
            else:
                result[attr] = value

        return result

    def to_str(self):
        # type: () -> str
        """Returns the string representation of the model"""
        return pprint.pformat(self.to_dict())

    def __repr__(self):
        # type: () -> str
        """For `print` and `pprint`"""
        return self.to_str()

    def __eq__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are equal"""
        if not isinstance(other, ComponentVisibleOnScreenTags):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
