import { services } from 'ask-sdk-model';
import ApiClientResponse = services.ApiClientResponse;
import ApiClientRequest = services.ApiClientRequest;
import ApiClient = services.ApiClient;
/**
 * Default implementation of {@link services.ApiClient} which uses the native HTTP/HTTPS library of Node.JS.
 */
export declare class DefaultApiClient implements ApiClient {
    /**
     * Dispatches a request to an API endpoint described in the request.
     * An ApiClient is expected to resolve the Promise in the case an API returns a non-200 HTTP
     * status code. The responsibility of translating a particular response code to an error lies with the
     * caller to invoke.
     * @param {services.ApiClientRequest} request request to dispatch to the ApiClient
     * @returns {Promise<services.ApiClientResponse>} response from the ApiClient
     */
    invoke(request: ApiClientRequest): Promise<ApiClientResponse>;
}
