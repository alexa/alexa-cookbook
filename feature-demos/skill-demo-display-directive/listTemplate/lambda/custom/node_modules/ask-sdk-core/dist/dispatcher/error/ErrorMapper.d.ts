import { HandlerInput } from '../request/handler/HandlerInput';
import { ErrorHandler } from './ErrorHandler';
/**
 * An interface providing a mapping of handler input and error to {@link ErrorHandler}.
 */
export interface ErrorMapper {
    getErrorHandler(handlerInput: HandlerInput, error: Error): Promise<ErrorHandler> | ErrorHandler;
}
