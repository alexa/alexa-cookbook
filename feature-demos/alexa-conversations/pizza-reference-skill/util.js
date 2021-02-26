/**
 * Copyright 2020 Amazon.com, Inc. and its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: LicenseRef-.amazon.com.-AmznSL-1.0
 *
 * Licensed under the Amazon Software License (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://aws.amazon.com/asl/
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 **/
'use strict';

const Alexa = require('ask-sdk-core');
const _ = require('lodash');

const getIntentSlotResolvedValue = (handlerInput, slotName) => {
    const intentSlot = Alexa.getSlot(handlerInput.requestEnvelope, slotName);
    return getSlotResolvedValue(intentSlot);
};

const getSlotResolvedValue = (slot) => {
    const firstAuthority = _.first(_.get(slot, 'resolutions.resolutionsPerAuthority'));
    const firstAuthorityValue = _.first(_.get(firstAuthority, 'values'));
    console.log('Got resolved value: ' + firstAuthorityValue);
    return _.get(firstAuthorityValue, 'value.name');
};

const getSlotResolvedId = (slot) => {
    const firstAuthority = _.first(_.get(slot, 'resolutions.resolutionsPerAuthority'));
    const firstAuthorityValue = _.first(_.get(firstAuthority, 'values'));
    return _.get(firstAuthorityValue, 'value.id');
};

module.exports = {
    getIntentSlotResolvedValue,
    getSlotResolvedValue,
    getSlotResolvedId
};
