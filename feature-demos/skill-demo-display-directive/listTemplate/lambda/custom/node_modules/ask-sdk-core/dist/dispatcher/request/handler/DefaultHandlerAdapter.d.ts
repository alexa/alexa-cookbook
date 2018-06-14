import { Response } from 'ask-sdk-model';
import { HandlerAdapter } from './HandlerAdapter';
import { HandlerInput } from './HandlerInput';
/**
 * Default implementation of {@link HandlerAdapter} that supports the default {@link RequestHandler}.
 */
export declare class DefaultHandlerAdapter implements HandlerAdapter {
    /**
     * Decides if the type of canHandle in request handler is a function or not.
     * @param {any} handler
     * @returns {boolean}
     */
    supports(handler: any): boolean;
    /**
     * Executes the handle function of request handler and returns a promise of response.
     * @param {HandlerInput} handlerInput
     * @param {any} handler
     * @returns {Promise<Response>}
     */
    execute(handlerInput: HandlerInput, handler: any): Promise<Response>;
}
