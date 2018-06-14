/*
 * Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
'use strict';
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var BaseSkillFactory_1 = require("./BaseSkillFactory");
/**
 * Provider for {@link CustomSkillBuilder}
 */
var CustomSkillFactory = /** @class */ (function () {
    function CustomSkillFactory() {
    }
    CustomSkillFactory.init = function () {
        var thisPersistenceAdapter;
        var thisApiClient;
        var baseSkillBuilder = BaseSkillFactory_1.BaseSkillFactory.init();
        return __assign({}, baseSkillBuilder, { getSkillConfiguration: function () {
                var skillConfiguration = baseSkillBuilder.getSkillConfiguration();
                return __assign({}, skillConfiguration, { persistenceAdapter: thisPersistenceAdapter, apiClient: thisApiClient });
            },
            withPersistenceAdapter: function (persistenceAdapter) {
                thisPersistenceAdapter = persistenceAdapter;
                return this;
            },
            withApiClient: function (apiClient) {
                thisApiClient = apiClient;
                return this;
            } });
    };
    return CustomSkillFactory;
}());
exports.CustomSkillFactory = CustomSkillFactory;
//# sourceMappingURL=CustomSkillFactory.js.map