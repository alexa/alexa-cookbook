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

if typing.TYPE_CHECKING:
    from datetime import datetime

class AccessToken(object):
    """Represents the access token provided by LWA (Login With Amazon).

    This is a wrapper class over
    :py:class:`ask_sdk_model.services.lwa.access_token_response.AccessTokenResponse`
    that retrieves and stores the access token, the expiry time from
    LWA response.

    :param token: access token from LWA
    :type token: str
    :param expiry: exact timestamp in UTC datetime, which is the expiry
        time for this access token. This is set as the combined datetime of
        current system time when the LWA response is received and the
        expiry time in seconds, provided in the LWA response.
    :type expiry: datetime
    """

    def __init__(self, token=None, expiry=None):
        # type: (str, datetime) -> None
        """Represents the access token provided by LWA (Login With Amazon).

        :param token: access token from LWA
        :type token: str
        :param expiry: exact timestamp in UTC datetime, which is the expiry
            time for this access token. This is set as the combined datetime of
            current system time when the LWA response is received and the
            expiry time in seconds, provided in the LWA response.
        :type expiry: datetime
        """
        self.token = token
        self.expiry = expiry
