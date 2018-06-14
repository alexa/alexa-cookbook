import { HandlerInput } from '../handler/HandlerInput';
/**
 * An interface containing the logic to execute before handler is called.
 */
export interface RequestInterceptor {
    process(handlerInput: HandlerInput): Promise<void> | void;
}
