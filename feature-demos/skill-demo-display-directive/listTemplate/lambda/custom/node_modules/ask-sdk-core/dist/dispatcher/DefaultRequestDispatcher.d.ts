import { Response } from 'ask-sdk-model';
import { ErrorMapper } from './error/ErrorMapper';
import { HandlerAdapter } from './request/handler/HandlerAdapter';
import { HandlerInput } from './request/handler/HandlerInput';
import { RequestInterceptor } from './request/interceptor/RequestInterceptor';
import { ResponseInterceptor } from './request/interceptor/ResponseInterceptor';
import { RequestMapper } from './request/mapper/RequestMapper';
import { RequestDispatcher } from './RequestDispatcher';
/**
 * Default implementation of {@link RequestDispatcher}.
 */
export declare class DefaultRequestDispatcher implements RequestDispatcher {
    protected requestMappers: RequestMapper[];
    protected errorMapper: ErrorMapper;
    protected handlerAdapters: HandlerAdapter[];
    protected requestInterceptors: RequestInterceptor[];
    protected responseInterceptors: ResponseInterceptor[];
    constructor(options: {
        requestMappers: RequestMapper[];
        handlerAdapters: HandlerAdapter[];
        errorMapper?: ErrorMapper;
        requestInterceptors?: RequestInterceptor[];
        responseInterceptors?: ResponseInterceptor[];
    });
    /**
     * Main entry point for dispatching logic.
     * Dispatches handlerInput to requestHandlers and error, if any, to _errorHandlers
     * @param {HandlerInput} handlerInput
     * @returns {Promise<Response>}
     */
    dispatch(handlerInput: HandlerInput): Promise<Response>;
    /**
     * Main logic for request dispatching. Binds the forwarding function to the handlerInput
     * @param {HandlerInput} handlerInput
     * @returns {Promise<Response>}
     */
    protected dispatchRequest(handlerInput: HandlerInput): Promise<Response>;
    /**
     * Main logic for error dispatching.
     * @param {HandlerInput} handlerInput
     * @param {Error} error
     * @returns {Promise<Response>}
     */
    protected dispatchError(handlerInput: HandlerInput, error: Error): Promise<Response>;
}
