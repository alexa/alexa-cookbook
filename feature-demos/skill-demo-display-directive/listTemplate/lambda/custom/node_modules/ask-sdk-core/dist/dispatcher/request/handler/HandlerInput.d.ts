import { RequestEnvelope, services } from 'ask-sdk-model';
import { AttributesManager } from '../../../attributes/AttributesManager';
import { ResponseBuilder } from '../../../response/ResponseBuilder';
import ServiceClientFactory = services.ServiceClientFactory;
/**
 * An interface that represents components passed into {@link RequestHandler} and {@link ErrorHandler}.
 */
export interface HandlerInput {
    requestEnvelope: RequestEnvelope;
    context?: any;
    attributesManager: AttributesManager;
    responseBuilder: ResponseBuilder;
    serviceClientFactory?: ServiceClientFactory;
}
