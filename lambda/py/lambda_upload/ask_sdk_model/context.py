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
    from ask_sdk_model.interfaces.alexa.presentation.apl.rendered_document_state import RenderedDocumentState
    from ask_sdk_model.interfaces.system.system_state import SystemState
    from ask_sdk_model.interfaces.automotive.automotive_state import AutomotiveState
    from ask_sdk_model.interfaces.geolocation.geolocation_state import GeolocationState
    from ask_sdk_model.interfaces.audioplayer.audio_player_state import AudioPlayerState
    from ask_sdk_model.interfaces.viewport.viewport_state import ViewportState
    from ask_sdk_model.interfaces.viewport.typed_viewport_state import TypedViewportState
    from ask_sdk_model.interfaces.display.display_state import DisplayState


class Context(object):
    """

    :param system: Provides information about the current state of the Alexa service and the device interacting with your skill.
    :type system: (optional) ask_sdk_model.interfaces.system.system_state.SystemState
    :param alexa_presentation_apl: Provides the current state for the Alexa.Presentation.APL interface.
    :type alexa_presentation_apl: (optional) ask_sdk_model.interfaces.alexa.presentation.apl.rendered_document_state.RenderedDocumentState
    :param audio_player: Provides the current state for the AudioPlayer interface.
    :type audio_player: (optional) ask_sdk_model.interfaces.audioplayer.audio_player_state.AudioPlayerState
    :param automotive: Provides the automotive specific information of the device.
    :type automotive: (optional) ask_sdk_model.interfaces.automotive.automotive_state.AutomotiveState
    :param display: Provides the current state for the Display interface.
    :type display: (optional) ask_sdk_model.interfaces.display.display_state.DisplayState
    :param geolocation: Provides the last gathered geolocation information of the device.
    :type geolocation: (optional) ask_sdk_model.interfaces.geolocation.geolocation_state.GeolocationState
    :param viewport: Provides the characteristics of a device&#39;s viewport.
    :type viewport: (optional) ask_sdk_model.interfaces.viewport.viewport_state.ViewportState
    :param viewports: This object contains a list of viewports characteristics related to the device&#39;s viewports.
    :type viewports: (optional) list[ask_sdk_model.interfaces.viewport.typed_viewport_state.TypedViewportState]

    """
    deserialized_types = {
        'system': 'ask_sdk_model.interfaces.system.system_state.SystemState',
        'alexa_presentation_apl': 'ask_sdk_model.interfaces.alexa.presentation.apl.rendered_document_state.RenderedDocumentState',
        'audio_player': 'ask_sdk_model.interfaces.audioplayer.audio_player_state.AudioPlayerState',
        'automotive': 'ask_sdk_model.interfaces.automotive.automotive_state.AutomotiveState',
        'display': 'ask_sdk_model.interfaces.display.display_state.DisplayState',
        'geolocation': 'ask_sdk_model.interfaces.geolocation.geolocation_state.GeolocationState',
        'viewport': 'ask_sdk_model.interfaces.viewport.viewport_state.ViewportState',
        'viewports': 'list[ask_sdk_model.interfaces.viewport.typed_viewport_state.TypedViewportState]'
    }  # type: Dict

    attribute_map = {
        'system': 'System',
        'alexa_presentation_apl': 'Alexa.Presentation.APL',
        'audio_player': 'AudioPlayer',
        'automotive': 'Automotive',
        'display': 'Display',
        'geolocation': 'Geolocation',
        'viewport': 'Viewport',
        'viewports': 'Viewports'
    }  # type: Dict
    supports_multiple_types = False

    def __init__(self, system=None, alexa_presentation_apl=None, audio_player=None, automotive=None, display=None, geolocation=None, viewport=None, viewports=None):
        # type: (Optional[SystemState], Optional[RenderedDocumentState], Optional[AudioPlayerState], Optional[AutomotiveState], Optional[DisplayState], Optional[GeolocationState], Optional[ViewportState], Optional[List[TypedViewportState]]) -> None
        """

        :param system: Provides information about the current state of the Alexa service and the device interacting with your skill.
        :type system: (optional) ask_sdk_model.interfaces.system.system_state.SystemState
        :param alexa_presentation_apl: Provides the current state for the Alexa.Presentation.APL interface.
        :type alexa_presentation_apl: (optional) ask_sdk_model.interfaces.alexa.presentation.apl.rendered_document_state.RenderedDocumentState
        :param audio_player: Provides the current state for the AudioPlayer interface.
        :type audio_player: (optional) ask_sdk_model.interfaces.audioplayer.audio_player_state.AudioPlayerState
        :param automotive: Provides the automotive specific information of the device.
        :type automotive: (optional) ask_sdk_model.interfaces.automotive.automotive_state.AutomotiveState
        :param display: Provides the current state for the Display interface.
        :type display: (optional) ask_sdk_model.interfaces.display.display_state.DisplayState
        :param geolocation: Provides the last gathered geolocation information of the device.
        :type geolocation: (optional) ask_sdk_model.interfaces.geolocation.geolocation_state.GeolocationState
        :param viewport: Provides the characteristics of a device&#39;s viewport.
        :type viewport: (optional) ask_sdk_model.interfaces.viewport.viewport_state.ViewportState
        :param viewports: This object contains a list of viewports characteristics related to the device&#39;s viewports.
        :type viewports: (optional) list[ask_sdk_model.interfaces.viewport.typed_viewport_state.TypedViewportState]
        """
        self.__discriminator_value = None  # type: str

        self.system = system
        self.alexa_presentation_apl = alexa_presentation_apl
        self.audio_player = audio_player
        self.automotive = automotive
        self.display = display
        self.geolocation = geolocation
        self.viewport = viewport
        self.viewports = viewports

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
        if not isinstance(other, Context):
            return False

        return self.__dict__ == other.__dict__

    def __ne__(self, other):
        # type: (object) -> bool
        """Returns true if both objects are not equal"""
        return not self == other
