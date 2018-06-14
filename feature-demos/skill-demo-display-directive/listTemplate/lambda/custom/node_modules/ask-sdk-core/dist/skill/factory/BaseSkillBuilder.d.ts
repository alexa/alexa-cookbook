import { Response } from 'ask-sdk-model';
import { ErrorHandler } from '../../dispatcher/error/ErrorHandler';
import { HandlerInput } from '../../dispatcher/request/handler/HandlerInput';
import { RequestHandler } from '../../dispatcher/request/handler/RequestHandler';
import { RequestInterceptor } from '../../dispatcher/request/interceptor/RequestInterceptor';
import { ResponseInterceptor } from '../../dispatcher/request/interceptor/ResponseInterceptor';
import { Skill } from '../Skill';
import { SkillConfiguration } from '../SkillConfiguration';
import { LambdaHandler } from './BaseSkillFactory';
/**
 * An interface containing help functions to build a {@link Skill}.
 */
export interface BaseSkillBuilder {
    addRequestHandler(matcher: ((handlerInput: HandlerInput) => Promise<boolean> | boolean) | string, executor: (handlerInput: HandlerInput) => Promise<Response> | Response): this;
    addRequestHandlers(...requestHandlers: RequestHandler[]): this;
    addRequestInterceptors(...executors: Array<RequestInterceptor | ((handlerInput: HandlerInput) => Promise<void> | void)>): this;
    addResponseInterceptors(...executors: Array<ResponseInterceptor | ((handlerInput: HandlerInput, response?: Response) => Promise<void> | void)>): this;
    addErrorHandler(matcher: (handlerInput: HandlerInput, error: Error) => Promise<boolean> | boolean, executor: (handlerInput: HandlerInput, error: Error) => Promise<Response> | Response): this;
    addErrorHandlers(...errorHandlers: ErrorHandler[]): this;
    withCustomUserAgent(customUserAgent: string): this;
    withSkillId(skillId: string): this;
    getSkillConfiguration(): SkillConfiguration;
    create(): Skill;
    lambda(): LambdaHandler;
}
