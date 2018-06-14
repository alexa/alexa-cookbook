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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * An abstract class responsible for building text content object using ask-sdk-model in Alexa skills kit display interface
 * https://developer.amazon.com/docs/custom-skills/display-interface-reference.html#textcontent-object-specifications.
 */
var TextContentHelper = /** @class */ (function () {
    function TextContentHelper() {
    }
    /**
     * @param {string} primaryText
     * @returns {this}
     */
    TextContentHelper.prototype.withPrimaryText = function (primaryText) {
        this.primaryText = primaryText;
        return this;
    };
    /**
     * @param {string} secondaryText
     * @returns {this}
     */
    TextContentHelper.prototype.withSecondaryText = function (secondaryText) {
        this.secondaryText = secondaryText;
        return this;
    };
    /**
     * @param {string} tertiaryText
     * @returns {this}
     */
    TextContentHelper.prototype.withTertiaryText = function (tertiaryText) {
        this.tertiaryText = tertiaryText;
        return this;
    };
    return TextContentHelper;
}());
exports.TextContentHelper = TextContentHelper;
//# sourceMappingURL=TextContentHelper.js.map