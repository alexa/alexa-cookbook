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


class TemplateContent(object):
    """Abstraction of template content stored as a bytes, will be used in
    building responses.

    TemplateContent object used as an abstraction to store template
    data as string.

    :param content_data: Template information to build responses
    :type content_data: bytes
    :param encoding: encoding scheme of the TemplateContent data
    :type encoding: str
    :return: None
    """
    def __init__(self, content_data, encoding):
        # type: (bytes, str) -> None
        """TemplateContent object used as an abstraction to store template
        data as string.

        :param content_data: Template information to build responses
        :type content_data: bytes
        :param encoding: encoding scheme of the TemplateContent data
        :type encoding: str
        :return: None
        """
        self.content_data = content_data
        self.encoding = encoding
