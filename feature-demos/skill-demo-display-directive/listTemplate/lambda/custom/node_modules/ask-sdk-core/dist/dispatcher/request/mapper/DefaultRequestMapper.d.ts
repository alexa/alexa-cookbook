import { DefaultRequestHandlerChain } from '../handler/DefaultRequestHandlerChain';
import { HandlerInput } from '../handler/HandlerInput';
import { RequestHandlerChain } from '../handler/RequestHandlerChain';
import { RequestMapper } from './RequestMapper';
/**
 * Default implementation for {@link RequestMapper}.
 */
export declare class DefaultRequestMapper implements RequestMapper {
    protected requestHandlerChains: DefaultRequestHandlerChain[];
    constructor(options: {
        requestHandlerChains: DefaultRequestHandlerChain[];
    });
    /**
     * Loops through the RequestHandlerChain array to find the first handler that can dispatch the given input and returns the request handler chain.
     * @param {HandlerInput} handlerInput
     * @returns {Promise<RequestHandlerChain>}
     */
    getRequestHandlerChain(handlerInput: HandlerInput): Promise<RequestHandlerChain>;
}
