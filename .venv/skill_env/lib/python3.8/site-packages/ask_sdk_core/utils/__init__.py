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
import sys

from ..__version__ import __version__
from .predicate import (
    is_canfulfill_intent_name, is_intent_name, is_request_type)
from ask_sdk_runtime.utils import user_agent_info
from .request_util import (
    get_slot, get_slot_value, get_account_linking_access_token,
    get_api_access_token, get_device_id, get_dialog_state, get_intent_name,
    get_locale, get_request_type, is_new_session, get_supported_interfaces,
    get_user_id)


SDK_VERSION = __version__
RESPONSE_FORMAT_VERSION = "1.0"
