import { RequestInterceptor } from '../interceptor/RequestInterceptor';
import { ResponseInterceptor } from '../interceptor/ResponseInterceptor';
import { RequestHandlerChain } from './RequestHandlerChain';
/**
 * Generic implementation of {@link RequestHandlerChain}.
 */
export declare class GenericRequestHandlerChain implements RequestHandlerChain {
    protected requestHandler: any;
    protected requestInterceptors: RequestInterceptor[];
    protected responseInterceptors: ResponseInterceptor[];
    constructor(options: {
        requestHandler: any;
        requestInterceptors?: RequestInterceptor[];
        responseInterceptors?: ResponseInterceptor[];
    });
    /**
     * Provides request handler.
     * @returns {any}
     */
    getRequestHandler(): any;
    /**
     * Provides request interceptor array.
     * @returns {RequestInterceptor[]}
     */
    getRequestInterceptors(): RequestInterceptor[];
    /**
     * Provides response interceptor array.
     * @returns {ResponseInterceptor[]}
     */
    getResponseInterceptors(): ResponseInterceptor[];
}
