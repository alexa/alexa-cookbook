import { Response } from 'ask-sdk-model';
import { HandlerInput } from './HandlerInput';
/**
 * An interface for user-created handler logic to add to {@link RequestMapper}.
 */
export interface RequestHandler {
    canHandle(handlerInput: HandlerInput): Promise<boolean> | boolean;
    handle(handlerInput: HandlerInput): Promise<Response> | Response;
}
