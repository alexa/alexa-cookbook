import { HandlerInput } from '../handler/HandlerInput';
import { RequestHandlerChain } from '../handler/RequestHandlerChain';
/**
 * An interface providing a mapping of handler input and error to {@link RequestHandlerChain}.
 */
export interface RequestMapper {
    getRequestHandlerChain(handlerInput: HandlerInput): Promise<RequestHandlerChain> | RequestHandlerChain;
}
