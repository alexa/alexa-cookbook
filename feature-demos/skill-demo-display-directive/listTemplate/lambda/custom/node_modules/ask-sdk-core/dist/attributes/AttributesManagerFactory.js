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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var AskSdkUtils_1 = require("../util/AskSdkUtils");
/**
 * Provider for attributes that can be stored on three levels: request, session and persistence.
 */
var AttributesManagerFactory = /** @class */ (function () {
    function AttributesManagerFactory() {
    }
    AttributesManagerFactory.init = function (options) {
        if (!options.requestEnvelope) {
            throw AskSdkUtils_1.createAskSdkError('AttributesManagerFactory', 'RequestEnvelope cannot be null or undefined!');
        }
        var thisRequestAttributes = {};
        var thisSessionAttributes = options.requestEnvelope.session
            ? options.requestEnvelope.session.attributes
                ? JSON.parse(JSON.stringify(options.requestEnvelope.session.attributes))
                : {}
            : undefined;
        var thisPersistentAttributes;
        var persistentAttributesSet = false;
        return {
            getRequestAttributes: function () {
                return thisRequestAttributes;
            },
            getSessionAttributes: function () {
                if (!options.requestEnvelope.session) {
                    throw AskSdkUtils_1.createAskSdkError('AttributesManager', 'Cannot get SessionAttributes from out of session request!');
                }
                return thisSessionAttributes;
            },
            getPersistentAttributes: function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!options.persistenceAdapter) {
                                    throw AskSdkUtils_1.createAskSdkError('AttributesManager', 'Cannot get PersistentAttributes without PersistenceManager');
                                }
                                if (!!persistentAttributesSet) return [3 /*break*/, 2];
                                return [4 /*yield*/, options.persistenceAdapter.getAttributes(options.requestEnvelope)];
                            case 1:
                                thisPersistentAttributes = _a.sent();
                                persistentAttributesSet = true;
                                _a.label = 2;
                            case 2: return [2 /*return*/, thisPersistentAttributes];
                        }
                    });
                });
            },
            setRequestAttributes: function (requestAttributes) {
                thisRequestAttributes = requestAttributes;
            },
            setSessionAttributes: function (sessionAttributes) {
                if (!options.requestEnvelope.session) {
                    throw AskSdkUtils_1.createAskSdkError('AttributesManager', 'Cannot set SessionAttributes to out of session request!');
                }
                thisSessionAttributes = sessionAttributes;
            },
            setPersistentAttributes: function (persistentAttributes) {
                if (!options.persistenceAdapter) {
                    throw AskSdkUtils_1.createAskSdkError('AttributesManager', 'Cannot set PersistentAttributes without persistence adapter!');
                }
                thisPersistentAttributes = persistentAttributes;
                persistentAttributesSet = true;
            },
            savePersistentAttributes: function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!options.persistenceAdapter) {
                                    throw AskSdkUtils_1.createAskSdkError('AttributesManager', 'Cannot save PersistentAttributes without persistence adapter!');
                                }
                                if (!persistentAttributesSet) return [3 /*break*/, 2];
                                return [4 /*yield*/, options.persistenceAdapter.saveAttributes(options.requestEnvelope, thisPersistentAttributes)];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                });
            },
        };
    };
    return AttributesManagerFactory;
}());
exports.AttributesManagerFactory = AttributesManagerFactory;
//# sourceMappingURL=AttributesManagerFactory.js.map