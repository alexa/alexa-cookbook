import { Response } from 'ask-sdk-model';
import { HandlerInput } from '../request/handler/HandlerInput';
/**
 * An interface for user created handler logic to add to {@link ErrorMapper}.
 */
export interface ErrorHandler {
    canHandle(handlerInput: HandlerInput, error: Error): Promise<boolean> | boolean;
    handle(handlerInput: HandlerInput, error: Error): Promise<Response> | Response;
}
