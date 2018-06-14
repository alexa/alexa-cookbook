import { HandlerInput } from '../request/handler/HandlerInput';
import { ErrorHandler } from './ErrorHandler';
import { ErrorMapper } from './ErrorMapper';
/**
 * Default implementation of {@link ErrorMapper}.
 */
export declare class DefaultErrorMapper implements ErrorMapper {
    protected errorHandlers: ErrorHandler[];
    constructor(options: {
        errorHandlers: ErrorHandler[];
    });
    /**
     * Loops through the error handler array in order and finds the first handler that can handle the given input and error.
     * @param {HandlerInput} handlerInput
     * @param {Error} error
     * @returns {Promise<ErrorHandler>} Returns null if no capable error handler is found.
     */
    getErrorHandler(handlerInput: HandlerInput, error: Error): Promise<ErrorHandler>;
}
