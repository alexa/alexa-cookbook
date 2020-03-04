# -*- coding: utf-8 -*-
#
# Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights
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
from enum import Enum
from ask_sdk_model import RequestEnvelope
from ask_sdk_model.interfaces.viewport import Shape

from ..exceptions import AskSdkException


class OrderedEnum(Enum):
    def __ge__(self, other):
        if self.__class__ is other.__class__:
            return self.value >= other.value
        return NotImplemented

    def __gt__(self, other):
        if self.__class__ is other.__class__:
            return self.value > other.value
        return NotImplemented

    def __le__(self, other):
        if self.__class__ is other.__class__:
            return self.value <= other.value
        return NotImplemented

    def __lt__(self, other):
        if self.__class__ is other.__class__:
            return self.value < other.value
        return NotImplemented


class Density(OrderedEnum):
    XLOW = 0
    LOW = 1
    MEDIUM = 2
    HIGH = 3
    XHIGH = 4
    XXHIGH = 5


class Orientation(OrderedEnum):
    LANDSCAPE = 0
    EQUAL = 1
    PORTRAIT = 2


class Size(OrderedEnum):
    XSMALL = 0
    SMALL = 1
    MEDIUM = 2
    LARGE = 3
    XLARGE = 4


class ViewportProfile(Enum):
    HUB_ROUND_SMALL = "HUB_ROUND_SMALL"
    HUB_LANDSCAPE_SMALL = "HUB_LANDSCAPE_SMALL"
    HUB_LANDSCAPE_MEDIUM = "HUB_LANDSCAPE_MEDIUM"
    HUB_LANDSCAPE_LARGE = "HUB_LANDSCAPE_LARGE"
    MOBILE_LANDSCAPE_SMALL = "MOBILE_LANDSCAPE_SMALL"
    MOBILE_PORTRAIT_SMALL = "MOBILE_PORTRAIT_SMALL"
    MOBILE_LANDSCAPE_MEDIUM = "MOBILE_LANDSCAPE_MEDIUM"
    MOBILE_PORTRAIT_MEDIUM = "MOBILE_PORTRAIT_MEDIUM"
    TV_LANDSCAPE_XLARGE = "TV_LANDSCAPE_XLARGE"
    TV_PORTRAIT_MEDIUM = "TV_PORTRAIT_MEDIUM"
    TV_LANDSCAPE_MEDIUM = "TV_LANDSCAPE_MEDIUM"
    UNKNOWN_VIEWPORT_PROFILE = "UNKNOWN_VIEWPORT_PROFILE"


def get_orientation(width, height):
    # type: (int, int) -> Orientation
    """Get viewport orientation from given width and height.

    :type width: int
    :type height: int
    :return: viewport orientation enum
    :rtype: Orientation
    """
    if width > height:
        return Orientation.LANDSCAPE
    elif width < height:
        return Orientation.PORTRAIT
    else:
        return Orientation.EQUAL


def get_size(size):
    # type: (int) -> Size
    """Get viewport size from given size.

    :type size: int
    :return: viewport size enum
    :rtype: Size
    """
    if size in range(0, 600):
        return Size.XSMALL
    elif size in range(600, 960):
        return Size.SMALL
    elif size in range(960, 1280):
        return Size.MEDIUM
    elif size in range(1280, 1920):
        return Size.LARGE
    elif size >= 1920:
        return Size.XLARGE

    raise AskSdkException("Unknown size group value: {}".format(size))


def get_dpi_group(dpi):
    # type: (int) -> Density
    """Get viewport density group from given dpi.

    :type dpi: int
    :return: viewport density group enum
    :rtype: Density
    """
    if dpi in range(0, 121):
        return Density.XLOW
    elif dpi in range(121, 161):
        return Density.LOW
    elif dpi in range(161, 241):
        return Density.MEDIUM
    elif dpi in range(241, 321):
        return Density.HIGH
    elif dpi in range(321, 481):
        return Density.XHIGH
    elif dpi >= 481:
        return Density.XXHIGH

    raise AskSdkException("Unknown dpi group value: {}".format(dpi))


def get_viewport_profile(request_envelope):
    # type: (RequestEnvelope) -> ViewportProfile
    """Utility method, to get viewport profile.

    The viewport profile is calculated using the shape, current pixel
    width and height, along with the dpi.

    If there is no `viewport`
    value in `request_envelope.context`, then an
    `ViewportProfile.UNKNOWN_VIEWPORT_PROFILE` is returned.

    :param request_envelope: The alexa request envelope object
    :type request_envelope: ask_sdk_model.request_envelope.RequestEnvelope
    :return: Calculated Viewport Profile enum
    :rtype: ViewportProfile
    """
    viewport_state = request_envelope.context.viewport
    if viewport_state:
        shape = viewport_state.shape
        current_pixel_width = int(viewport_state.current_pixel_width)
        current_pixel_height = int(viewport_state.current_pixel_height)
        dpi = int(viewport_state.dpi)

        orientation = get_orientation(
            width=current_pixel_width, height=current_pixel_height)
        dpi_group = get_dpi_group(dpi=dpi)
        pixel_width_size_group = get_size(size=current_pixel_width)
        pixel_height_size_group = get_size(size=current_pixel_height)

        if (shape is Shape.ROUND
                and orientation is Orientation.EQUAL
                and dpi_group is Density.LOW
                and pixel_width_size_group is Size.XSMALL
                and pixel_height_size_group is Size.XSMALL):
            return ViewportProfile.HUB_ROUND_SMALL

        elif (shape is Shape.RECTANGLE
                and orientation is Orientation.LANDSCAPE
                and dpi_group is Density.LOW
                and pixel_width_size_group <= Size.MEDIUM
                and pixel_height_size_group <= Size.XSMALL):
            return ViewportProfile.HUB_LANDSCAPE_SMALL

        elif (shape is Shape.RECTANGLE
                and orientation is Orientation.LANDSCAPE
                and dpi_group is Density.LOW
                and pixel_width_size_group <= Size.MEDIUM
                and pixel_height_size_group <= Size.SMALL):
            return ViewportProfile.HUB_LANDSCAPE_MEDIUM

        elif (shape is Shape.RECTANGLE
                and orientation is Orientation.LANDSCAPE
                and dpi_group is Density.LOW
                and pixel_width_size_group >= Size.LARGE
                and pixel_height_size_group >= Size.SMALL):
            return ViewportProfile.HUB_LANDSCAPE_LARGE

        elif (shape is Shape.RECTANGLE
                and orientation is Orientation.LANDSCAPE
                and dpi_group is Density.MEDIUM
                and pixel_width_size_group >= Size.MEDIUM
                and pixel_height_size_group >= Size.SMALL):
            return ViewportProfile.MOBILE_LANDSCAPE_MEDIUM

        elif (shape is Shape.RECTANGLE
                and orientation is Orientation.PORTRAIT
                and dpi_group is Density.MEDIUM
                and pixel_width_size_group >= Size.SMALL
                and pixel_height_size_group >= Size.MEDIUM):
            return ViewportProfile.MOBILE_PORTRAIT_MEDIUM

        elif (shape is Shape.RECTANGLE
                and orientation is Orientation.LANDSCAPE
                and dpi_group is Density.MEDIUM
                and pixel_width_size_group >= Size.SMALL
                and pixel_height_size_group >= Size.XSMALL):
            return ViewportProfile.MOBILE_LANDSCAPE_SMALL

        elif (shape is Shape.RECTANGLE
                and orientation is Orientation.PORTRAIT
                and dpi_group is Density.MEDIUM
                and pixel_width_size_group >= Size.XSMALL
                and pixel_height_size_group >= Size.SMALL):
            return ViewportProfile.MOBILE_PORTRAIT_SMALL

        elif (shape is Shape.RECTANGLE
                and orientation is Orientation.LANDSCAPE
                and dpi_group >= Density.HIGH
                and pixel_width_size_group >= Size.XLARGE
                and pixel_height_size_group >= Size.MEDIUM):
            return ViewportProfile.TV_LANDSCAPE_XLARGE

        elif (shape is Shape.RECTANGLE
                and orientation is Orientation.PORTRAIT
                and dpi_group >= Density.HIGH
                and pixel_width_size_group is Size.XSMALL
                and pixel_height_size_group is Size.XLARGE):
            return ViewportProfile.TV_PORTRAIT_MEDIUM

        elif (shape is Shape.RECTANGLE
              and orientation is Orientation.LANDSCAPE
              and dpi_group >= Density.HIGH
              and pixel_width_size_group is Size.MEDIUM
              and pixel_height_size_group is Size.SMALL):
            return ViewportProfile.TV_LANDSCAPE_MEDIUM

    return ViewportProfile.UNKNOWN_VIEWPORT_PROFILE
