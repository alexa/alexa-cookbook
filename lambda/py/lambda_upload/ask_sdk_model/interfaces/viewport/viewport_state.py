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
    from ask_sdk_model.interfaces.viewport.experience import Experience
    from ask_sdk_model.interfaces.viewport.touch import Touch
    from ask_sdk_model.interfaces.viewport.keyboard import Keyboard
    from ask_sdk_model.interfaces.viewport.shape import Shape
    from ask_sdk_model.interfaces.viewport.viewport_state_video import Video
    from ask_sdk_model.interfaces.viewport.mode import Mode


class ViewportState(object):
    """
    This object contains the characteristics related to the device&#39;s viewport.


    :param experiences: The experiences supported by the device, in descending order of arcMinuteWidth and arcMinuteHeight.
    :type experiences: (optional) list[ask_sdk_model.interfaces.viewport.experience.Experience]
    :param mode: 
    :type mode: (optional) ask_sdk_model.interfaces.viewport.mode.Mode
    :param shape: 
    :type shape: (optional) ask_sdk_model.interfaces.viewport.shape.Shape
    :param pixel_width: The number of pixels present in the viewport at its maximum width.
    :type pixel_width: (optional) float
    :param pixel_height: The number of pixels present in the viewport at its maximum height.
    :type pixel_height: (optional) float
    :param dpi: The pixel density of the viewport.
    :type dpi: (optional) float
    :param current_pixel_width: The number of horizontal pixels in the viewport that are currently available for Alexa to render an experience.
    :type current_pixel_width: (optional) float
    :param current_pixel_height: The number of vertical pixels in the viewport that are currently available for Alexa to render an experience.
    :type current_pixel_height: (optional) float
    :param touch: The types of touch supported by the device. An empty array indicates no touch support.
    :type touch: (optional) list[ask_sdk_model.interfaces.viewport.touch.Touch]
    :param keyboard: The physical button input mechanisms supported by the device. An empty array indicates physical button input is unsupported.
    :type keyboard: (optional) list[ask_sdk_model.interfaces.viewport.keyboard.Keyboard]
    :param video: 
    :type video: (optional) ask_sdk_model.interfaces.viewport.viewport_state_video.Video

    """
    deserialized_types = {
        'experiences': 'list[ask_sdk_model.interfaces.viewport.experience.Experience]',
        'mode': 'ask_sdk_model.interfaces.viewport.mode.Mode',
        'shape': 'ask_sdk_model.interfaces.viewport.shape.Shape',
        'pixel_width': 'float',
        'pixel_height': 'float',
        'dpi': 'float',
        'current_pixel_width': 'float',
        'current_pixel_height': 'float',
        'touch': 'list[ask_sdk_model.interfaces.viewport.touch.Touch]',
        'keyboard': 'list[ask_sdk_model.interfaces.viewport.keyboard.Keyboard]',
        'video': 'ask_sdk_model.interfaces.viewport.viewport_state_video.Video'
    }  # type: Dict

    attribute_map = {
        'experiences': 'experiences',
        'mode': 'mode',
        'shape': 'shape',
        'pixel_width': 'pixelWidth',
        'pixel_height': 'pixelHeight',
        'dpi': 'dpi',
        'current_pixel_width': 'currentPixelWidth',
        'current_pixel_height': 'currentPixelHeight',
        'touch': 'touch',
        'keyboard': 'keyboard',
        'video': 'video'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, experiences=None, mode=None, shape=None, pixel_width=None, pixel_height=None, dpi=None, current_pixel_width=None, current_pixel_height=None, touch=None, keyboard=None, video=None):
        # type: (Optional[List[Experience]], Optional[Mode], Optional[Shape], Optional[float], Optional[float], Optional[float], Optional[float], Optional[float], Optional[List[Touch]], Optional[List[Keyboard]], Optional[Video]) -> None
        """This object contains the characteristics related to the device&#39;s viewport.

        :param experiences: The experiences supported by the device, in descending order of arcMinuteWidth and arcMinuteHeight.
        :type experiences: (optional) list[ask_sdk_model.interfaces.viewport.experience.Experience]
        :param mode: 
        :type mode: (optional) ask_sdk_model.interfaces.viewport.mode.Mode
        :param shape: 
        :type shape: (optional) ask_sdk_model.interfaces.viewport.shape.Shape
        :param pixel_width: The number of pixels present in the viewport at its maximum width.
        :type pixel_width: (optional) float
        :param pixel_height: The number of pixels present in the viewport at its maximum height.
        :type pixel_height: (optional) float
        :param dpi: The pixel density of the viewport.
        :type dpi: (optional) float
        :param current_pixel_width: The number of horizontal pixels in the viewport that are currently available for Alexa to render an experience.
        :type current_pixel_width: (optional) float
        :param current_pixel_height: The number of vertical pixels in the viewport that are currently available for Alexa to render an experience.
        :type current_pixel_height: (optional) float
        :param touch: The types of touch supported by the device. An empty array indicates no touch support.
        :type touch: (optional) list[ask_sdk_model.interfaces.viewport.touch.Touch]
        :param keyboard: The physical button input mechanisms supported by the device. An empty array indicates physical button input is unsupported.
        :type keyboard: (optional) list[ask_sdk_model.interfaces.viewport.keyboard.Keyboard]
        :param video: 
        :type video: (optional) ask_sdk_model.interfaces.viewport.viewport_state_video.Video
        """
        self.__discriminator_value = None  # type: str

        self.experiences = experiences
        self.mode = mode
        self.shape = shape
        self.pixel_width = pixel_width
        self.pixel_height = pixel_height
        self.dpi = dpi
        self.current_pixel_width = current_pixel_width
        self.current_pixel_height = current_pixel_height
        self.touch = touch
        self.keyboard = keyboard
        self.video = video

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
        if not isinstance(other, ViewportState):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
