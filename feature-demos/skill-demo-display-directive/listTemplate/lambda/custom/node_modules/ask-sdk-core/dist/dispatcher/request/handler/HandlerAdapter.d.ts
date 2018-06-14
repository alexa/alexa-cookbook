import { Response } from 'ask-sdk-model';
import { HandlerInput } from './HandlerInput';
/**
 * An interface that abstracts the handling of a request for specific types of handlers.
 */
export interface HandlerAdapter {
    supports(handler: any): boolean;
    execute(handlerInput: HandlerInput, handler: any): Promise<Response> | Response;
}
