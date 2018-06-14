import { RequestEnvelope } from 'ask-sdk-model';
import { BaseSkillBuilder } from './BaseSkillBuilder';
/**
 * Type definition of LambdaHandler which contains inputs received in lambda function.
 *  https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html.
 */
export declare type LambdaHandler = (requestEnvelope: RequestEnvelope, context: any, callback: (err: Error, result?: any) => void) => void;
export declare class BaseSkillFactory {
    static init(): BaseSkillBuilder;
    private constructor();
}
