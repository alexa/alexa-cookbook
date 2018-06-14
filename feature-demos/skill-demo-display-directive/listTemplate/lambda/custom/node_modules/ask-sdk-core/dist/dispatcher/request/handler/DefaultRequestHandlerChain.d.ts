import { RequestInterceptor } from '../interceptor/RequestInterceptor';
import { ResponseInterceptor } from '../interceptor/ResponseInterceptor';
import { GenericRequestHandlerChain } from './GenericRequestHandlerChain';
import { RequestHandler } from './RequestHandler';
/**
 * Default implementation of {@link RequestHandlerChain}.
 */
export declare class DefaultRequestHandlerChain extends GenericRequestHandlerChain {
    constructor(options: {
        requestHandler: RequestHandler;
        requestInterceptors?: RequestInterceptor[];
        responseInterceptors?: ResponseInterceptor[];
    });
    /**
     * Provides request handler.
     * @returns {RequestHandler}
     */
    getRequestHandler(): RequestHandler;
}
