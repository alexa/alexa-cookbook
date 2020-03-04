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
import typing
from abc import ABCMeta, abstractmethod
from copy import deepcopy

from .exceptions import AttributesManagerException

if typing.TYPE_CHECKING:
    from typing import Dict, Optional, Any
    from ask_sdk_model import RequestEnvelope


class AbstractPersistenceAdapter(object):
    """Abstract class for storing and retrieving persistent attributes
    from persistence tier given request envelope.

    User needs to implement ``get_attributes`` method to get attributes
    from persistent tier and ``save_attributes`` method to save
    attributes to persistent tier.
    """
    __metaclass__ = ABCMeta

    @abstractmethod
    def get_attributes(self, request_envelope):
        # type: (RequestEnvelope) -> Dict[str, object]
        """Get attributes from persistent tier.

        :param request_envelope: Request Envelope from Alexa service
        :type request_envelope: RequestEnvelope
        :return: A dictionary of attributes retrieved from persistent
            tier
        :rtype: Dict[str, object]
        """
        pass

    @abstractmethod
    def save_attributes(self, request_envelope, attributes):
        # type: (RequestEnvelope, Dict[str, object]) -> None
        """Save attributes to persistent tier.

        :param request_envelope: request envelope.
        :type request_envelope: RequestEnvelope
        :param attributes: attributes to be saved to persistent tier
        :type attributes: Dict[str, object]
        :rtype: None
        """
        pass

    @abstractmethod
    def delete_attributes(self, request_envelope):
        # type: (RequestEnvelope) -> None
        """Delete attributes from  persistent tier.

        :param request_envelope: request envelope.
        :type request_envelope: RequestEnvelope
        :rtype: None
        """
        pass


class AttributesManager(object):
    """AttributesManager is a class that handles three level
    attributes: request, session and persistence.

    :param request_envelope: request envelope.
    :type request_envelope: RequestEnvelope
    :param persistence_adapter: class used for storing and
        retrieving persistent attributes from persistence tier
    :type persistence_adapter: AbstractPersistenceAdapter
    """

    def __init__(self, request_envelope, persistence_adapter=None):
        # type: (RequestEnvelope, AbstractPersistenceAdapter) -> None
        """AttributesManager handling three level of
        attributes: request, session and persistence.

        :param request_envelope: request envelope.
        :type request_envelope: RequestEnvelope
        :param persistence_adapter: class used for storing and
            retrieving persistent attributes from persistence tier
        :type persistence_adapter: AbstractPersistenceAdapter
        """
        if request_envelope is None:
            raise AttributesManagerException("RequestEnvelope cannot be none!")
        self._request_envelope = request_envelope
        self._persistence_adapter = persistence_adapter
        self._persistence_attributes = {}  # type: Dict
        self._request_attributes = {}  # type: Dict
        if request_envelope.session is None:
            self._session_attributes = None  # type: Optional[Dict[str, Any]]
        elif request_envelope.session.attributes is None:
            self._session_attributes = {}
        else:
            self._session_attributes = deepcopy(
                request_envelope.session.attributes)
        self._persistent_attributes_set = False

    @property
    def request_attributes(self):
        # type: () -> Dict[str, object]
        """Attributes stored at the Request level of the skill lifecycle.

        :return: request attributes for the request life cycle
        :rtype: Dict[str, object]
        """
        return self._request_attributes

    @request_attributes.setter
    def request_attributes(self, request_attributes):
        # type: (Dict[str, object]) -> None
        """

        :param request_attributes: attributes for the request life cycle
        :type request_attributes: Dict[str, object]
        """
        self._request_attributes = request_attributes

    @property
    def session_attributes(self):
        # type: () -> Optional[Dict[str, Any]]
        """Attributes stored at the Session level of the skill lifecycle.

        :return: session attributes extracted from request envelope
        :rtype: Dict[str, object]
        """
        if not self._request_envelope.session:
            raise AttributesManagerException(
                "Cannot get SessionAttributes from out of session request!")
        return self._session_attributes

    @session_attributes.setter
    def session_attributes(self, session_attributes):
        # type: (Dict[str, object]) -> None
        """

        :param session_attributes: attributes during the session
        :type session_attributes: Dict[str, object]
        :raises: :py:class:`ask_sdk_core.exceptions.AttributesManagerException`
            if trying to set session attributes to out of session request
        """
        if not self._request_envelope.session:
            raise AttributesManagerException(
                "Cannot set SessionAttributes to out of session request!")
        self._session_attributes = session_attributes

    @property
    def persistent_attributes(self):
        # type: () -> Dict[str, object]
        """Attributes stored at the Persistence level of the skill lifecycle.

        :return: persistent_attributes retrieved from persistence adapter
        :rtype: Dict[str, object]
        :raises: :py:class:`ask_sdk_core.exceptions.AttributesManagerException`
            if trying to get persistent attributes without persistence adapter
        """
        if not self._persistence_adapter:
            raise AttributesManagerException(
                "Cannot get PersistentAttributes without Persistence adapter")
        if not self._persistent_attributes_set:
            self._persistence_attributes = (
                self._persistence_adapter.get_attributes(
                    request_envelope=self._request_envelope))
            self._persistent_attributes_set = True
        return self._persistence_attributes

    @persistent_attributes.setter
    def persistent_attributes(self, persistent_attributes):
        # type: (Dict[str, object]) -> None
        """Overwrites and caches the persistent attributes value.

        Note that the persistent attributes will not be saved to
        persistence layer until the save_persistent_attributes method
        is called.

        :param persistent_attributes: attributes in persistence layer
        :type persistent_attributes: Dict[str, object]
        :raises: :py:class:`ask_sdk_core.exceptions.AttributesManagerException`
            if trying to set persistent attributes without persistence adapter
        """
        if not self._persistence_adapter:
            raise AttributesManagerException(
                "Cannot set PersistentAttributes without persistence adapter!")
        self._persistence_attributes = persistent_attributes
        self._persistent_attributes_set = True

    def save_persistent_attributes(self):
        # type: () -> None
        """Save persistent attributes to the persistence layer if a
        persistence adapter is provided.

        :rtype: None
        :raises: :py:class:`ask_sdk_core.exceptions.AttributesManagerException`
            if trying to save persistence attributes without persistence adapter
        """
        if not self._persistence_adapter:
            raise AttributesManagerException(
                "Cannot save PersistentAttributes without "
                "persistence adapter!")
        if self._persistent_attributes_set:
            self._persistence_adapter.save_attributes(
                request_envelope=self._request_envelope,
                attributes=self._persistence_attributes)

    def delete_persistent_attributes(self):
        # type: () -> None
        """Deletes the persistent attributes from the persistence layer.

        :rtype: None
        :raises: :py:class: `ask_sdk_core.exceptions.AttributesManagerException`
            if trying to delete persistence attributes without persistence adapter
        """
        if not self._persistence_adapter:
            raise AttributesManagerException(
                "Cannot delete PersistentAttributes without "
                "persistence adapter!")

        self._persistence_adapter.delete_attributes(
            request_envelope=self._request_envelope)
        self._persistence_attributes = {}
        self._persistent_attributes_set = False
