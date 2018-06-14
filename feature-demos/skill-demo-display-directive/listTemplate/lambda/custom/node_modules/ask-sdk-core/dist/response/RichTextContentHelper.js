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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var TextContentHelper_1 = require("./TextContentHelper");
/**
 * Responsible for building rich text content object using ask-sdk-model in Alexa skills kit display interface
 * https://developer.amazon.com/docs/custom-skills/display-interface-reference.html#textcontent-object-specifications.
 */
var RichTextContentHelper = /** @class */ (function (_super) {
    __extends(RichTextContentHelper, _super);
    function RichTextContentHelper() {
        return _super.call(this) || this;
    }
    /**
     * @returns {interfaces.display.TextContent}
     */
    RichTextContentHelper.prototype.getTextContent = function () {
        var textContent = {};
        if (this.primaryText) {
            textContent.primaryText = {
                type: 'RichText',
                text: this.primaryText,
            };
        }
        if (this.secondaryText) {
            textContent.secondaryText = {
                type: 'RichText',
                text: this.secondaryText,
            };
        }
        if (this.tertiaryText) {
            textContent.tertiaryText = {
                type: 'RichText',
                text: this.tertiaryText,
            };
        }
        return textContent;
    };
    return RichTextContentHelper;
}(TextContentHelper_1.TextContentHelper));
exports.RichTextContentHelper = RichTextContentHelper;
//# sourceMappingURL=RichTextContentHelper.js.map