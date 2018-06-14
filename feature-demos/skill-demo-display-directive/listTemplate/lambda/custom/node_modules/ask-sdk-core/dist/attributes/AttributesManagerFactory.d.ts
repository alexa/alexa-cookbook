import { RequestEnvelope } from 'ask-sdk-model';
import { AttributesManager } from './AttributesManager';
import { PersistenceAdapter } from './persistence/PersistenceAdapter';
/**
 * Provider for attributes that can be stored on three levels: request, session and persistence.
 */
export declare class AttributesManagerFactory {
    static init(options: {
        requestEnvelope: RequestEnvelope;
        persistenceAdapter?: PersistenceAdapter;
    }): AttributesManager;
    private constructor();
}
