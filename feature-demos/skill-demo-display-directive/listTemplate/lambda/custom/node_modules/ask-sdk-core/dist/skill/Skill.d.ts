import { RequestEnvelope, ResponseEnvelope, services } from 'ask-sdk-model';
import { PersistenceAdapter } from '../attributes/persistence/PersistenceAdapter';
import { RequestDispatcher } from '../dispatcher/RequestDispatcher';
import { SkillConfiguration } from './SkillConfiguration';
import ApiClient = services.ApiClient;
/**
 * Top level container for request dispatcher.
 */
export declare class Skill {
    protected requestDispatcher: RequestDispatcher;
    protected persistenceAdapter: PersistenceAdapter;
    protected apiClient: ApiClient;
    protected customUserAgent: string;
    protected skillId: string;
    constructor(skillConfiguration: SkillConfiguration);
    /**
     * Invokes the dispatcher to handler the request envelope and construct the handler input.
     * @param {RequestEnvelope} requestEnvelope
     * @param context
     * @returns {Promise<ResponseEnvelope>}
     */
    invoke(requestEnvelope: RequestEnvelope, context?: any): Promise<ResponseEnvelope>;
}
