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
var GenericRequestHandlerChain_1 = require("./GenericRequestHandlerChain");
/**
 * Default implementation of {@link RequestHandlerChain}.
 */
var DefaultRequestHandlerChain = /** @class */ (function (_super) {
    __extends(DefaultRequestHandlerChain, _super);
    function DefaultRequestHandlerChain(options) {
        return _super.call(this, options) || this;
    }
    /**
     * Provides request handler.
     * @returns {RequestHandler}
     */
    DefaultRequestHandlerChain.prototype.getRequestHandler = function () {
        return this.requestHandler;
    };
    return DefaultRequestHandlerChain;
}(GenericRequestHandlerChain_1.GenericRequestHandlerChain));
exports.DefaultRequestHandlerChain = DefaultRequestHandlerChain;
//# sourceMappingURL=DefaultRequestHandlerChain.js.map