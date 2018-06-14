import { Response } from 'ask-sdk-model';
import { HandlerInput } from './request/handler/HandlerInput';
/**
 * An interface providing the logic for dispatching handler input to handler.
 */
export interface RequestDispatcher {
    dispatch(handlerInput: HandlerInput): Promise<Response> | Response;
}
