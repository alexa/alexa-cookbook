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


class AuthenticationConfiguration(object):
    """Represents a class that provides authentication configuration.

    :param client_id: Client ID required for authentication.
    :type client_id: str
    :param client_secret: Client Secret required for authentication.
    :type client_secret: str
    :param refresh_token: Client refresh_token required to get access token for API calls.
    :type refresh_token: str
    """

    def __init__(self, client_id=None, client_secret=None, refresh_token=None):
        # type: (str, str, str) -> None
        """Represents a class that provides authentication configuration.

        :param client_id: Client ID required for authentication.
        :type client_id: str
        :param client_secret: Client Secret required for authentication.
        :type client_secret: str
        :param refresh_token: Client refresh_token required to get access token for API calls.
        :type refresh_token: str
        """
        self.client_id = client_id
        self.client_secret = client_secret
        self.refresh_token = refresh_token
