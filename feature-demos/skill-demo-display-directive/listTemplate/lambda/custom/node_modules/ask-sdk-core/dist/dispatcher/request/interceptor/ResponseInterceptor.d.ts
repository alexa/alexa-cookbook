import { Response } from 'ask-sdk-model';
import { HandlerInput } from '../handler/HandlerInput';
/**
 * An interface containing the logic to be executed after handler returns.
 */
export interface ResponseInterceptor {
    process(handlerInput: HandlerInput, response?: Response): Promise<void> | void;
}
