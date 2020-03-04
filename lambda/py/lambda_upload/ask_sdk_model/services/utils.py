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
import sys

def user_agent_info(sdk_version, custom_user_agent):
    # type: (str, str) -> str
    """Return the user agent info along with the SDK and Python
    Version information.

    :param sdk_version: Version of the SDK being used.
    :type sdk_version: str
    :param custom_user_agent: Custom User Agent string provided by
        the developer.
    :type custom_user_agent: str
    :return: User Agent Info string
    :rtype: str
    """
    python_version = ".".join(str(x) for x in sys.version_info[0:3])
    user_agent = "ask-python-model/{} Python/{}".format(
        sdk_version, python_version)
    if custom_user_agent is None:
        return user_agent
    else:
        return user_agent + " {}".format(custom_user_agent)
