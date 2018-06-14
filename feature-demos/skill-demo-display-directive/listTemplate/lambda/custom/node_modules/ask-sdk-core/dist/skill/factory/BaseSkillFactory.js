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
var DefaultErrorMapper_1 = require("../../dispatcher/error/DefaultErrorMapper");
var DefaultHandlerAdapter_1 = require("../../dispatcher/request/handler/DefaultHandlerAdapter");
var DefaultRequestHandlerChain_1 = require("../../dispatcher/request/handler/DefaultRequestHandlerChain");
var DefaultRequestMapper_1 = require("../../dispatcher/request/mapper/DefaultRequestMapper");
var AskSdkUtils_1 = require("../../util/AskSdkUtils");
var Skill_1 = require("../Skill");
var BaseSkillFactory = /** @class */ (function () {
    function BaseSkillFactory() {
    }
    BaseSkillFactory.init = function () {
        var thisRequestHandlerChains = [];
        var thisRequestInterceptors = [];
        var thisResponseInterceptors = [];
        var thisErrorHandlers = [];
        var thisCustomUserAgent;
        var thisSkillId;
        return {
            addRequestHandler: function (matcher, executor) {
                var canHandle;
                switch (typeof matcher) {
                    case 'string': {
                        canHandle = function (_a) {
                            var requestEnvelope = _a.requestEnvelope;
                            return matcher === (requestEnvelope.request.type === 'IntentRequest'
                                ? requestEnvelope.request.intent.name
                                : requestEnvelope.request.type);
                        };
                        break;
                    }
                    case 'function': {
                        canHandle = matcher;
                        break;
                    }
                    default: {
                        throw AskSdkUtils_1.createAskSdkError('SkillBuilderError', "Matcher must be of type string or function, got: " + typeof matcher + "!");
                    }
                }
                thisRequestHandlerChains.push(new DefaultRequestHandlerChain_1.DefaultRequestHandlerChain({
                    requestHandler: {
                        canHandle: canHandle,
                        handle: executor,
                    },
                }));
                return this;
            },
            addRequestHandlers: function () {
                var requestHandlers = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    requestHandlers[_i] = arguments[_i];
                }
                for (var _a = 0, requestHandlers_1 = requestHandlers; _a < requestHandlers_1.length; _a++) {
                    var requestHandler = requestHandlers_1[_a];
                    thisRequestHandlerChains.push(new DefaultRequestHandlerChain_1.DefaultRequestHandlerChain({
                        requestHandler: requestHandler,
                    }));
                }
                return this;
            },
            addRequestInterceptors: function () {
                var executors = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    executors[_i] = arguments[_i];
                }
                for (var _a = 0, executors_1 = executors; _a < executors_1.length; _a++) {
                    var executor = executors_1[_a];
                    switch (typeof executor) {
                        case 'object': {
                            thisRequestInterceptors.push(executor);
                            break;
                        }
                        case 'function': {
                            thisRequestInterceptors.push({
                                process: executor,
                            });
                            break;
                        }
                        default: {
                            throw AskSdkUtils_1.createAskSdkError('SkillBuilderError', "Executor must be of type Object(RequestInterceptor) or function, got: " + typeof executor);
                        }
                    }
                }
                return this;
            },
            addResponseInterceptors: function () {
                var executors = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    executors[_i] = arguments[_i];
                }
                for (var _a = 0, executors_2 = executors; _a < executors_2.length; _a++) {
                    var executor = executors_2[_a];
                    switch (typeof executor) {
                        case 'object': {
                            thisResponseInterceptors.push(executor);
                            break;
                        }
                        case 'function': {
                            thisResponseInterceptors.push({
                                process: executor,
                            });
                            break;
                        }
                        default: {
                            throw AskSdkUtils_1.createAskSdkError('SkillBuilderError', "Executor must be of type Object(ResponseInterceptor) or function, got: " + typeof executor);
                        }
                    }
                }
                return this;
            },
            addErrorHandler: function (matcher, executor) {
                thisErrorHandlers.push({
                    canHandle: matcher,
                    handle: executor,
                });
                return this;
            },
            addErrorHandlers: function () {
                var errorHandlers = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    errorHandlers[_i] = arguments[_i];
                }
                thisErrorHandlers.push.apply(thisErrorHandlers, errorHandlers);
                return this;
            },
            withCustomUserAgent: function (customUserAgent) {
                thisCustomUserAgent = customUserAgent;
                return this;
            },
            withSkillId: function (skillId) {
                thisSkillId = skillId;
                return this;
            },
            getSkillConfiguration: function () {
                var requestMapper = new DefaultRequestMapper_1.DefaultRequestMapper({
                    requestHandlerChains: thisRequestHandlerChains,
                });
                var errorMapper = thisErrorHandlers.length
                    ? new DefaultErrorMapper_1.DefaultErrorMapper({
                        errorHandlers: thisErrorHandlers,
                    })
                    : undefined;
                return {
                    requestMappers: [requestMapper],
                    handlerAdapters: [new DefaultHandlerAdapter_1.DefaultHandlerAdapter()],
                    errorMapper: errorMapper,
                    requestInterceptors: thisRequestInterceptors,
                    responseInterceptors: thisResponseInterceptors,
                    customUserAgent: thisCustomUserAgent,
                    skillId: thisSkillId,
                };
            },
            create: function () {
                return new Skill_1.Skill(this.getSkillConfiguration());
            },
            lambda: function () {
                var skill = new Skill_1.Skill(this.getSkillConfiguration());
                return function (event, context, callback) {
                    skill.invoke(event, context)
                        .then(function (response) {
                        callback(null, response);
                    })
                        .catch(function (err) {
                        callback(err, null);
                    });
                };
            },
        };
    };
    return BaseSkillFactory;
}());
exports.BaseSkillFactory = BaseSkillFactory;
//# sourceMappingURL=BaseSkillFactory.js.map