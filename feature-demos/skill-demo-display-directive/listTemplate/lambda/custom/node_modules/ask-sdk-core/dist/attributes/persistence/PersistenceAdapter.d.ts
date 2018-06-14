import { RequestEnvelope } from 'ask-sdk-model';
/**
 * An interface for storing and retrieving persistent attributes from persistence tier given request envelope.
 */
export interface PersistenceAdapter {
    getAttributes(requestEnvelope: RequestEnvelope): Promise<{
        [key: string]: any;
    }>;
    saveAttributes(requestEnvelope: RequestEnvelope, attributes: {
        [key: string]: any;
    }): Promise<void>;
}
