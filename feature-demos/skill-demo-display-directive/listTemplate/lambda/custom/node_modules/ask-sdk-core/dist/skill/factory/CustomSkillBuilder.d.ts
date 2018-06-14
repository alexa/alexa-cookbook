import { services } from 'ask-sdk-model';
import { PersistenceAdapter } from '../../attributes/persistence/PersistenceAdapter';
import { BaseSkillBuilder } from './BaseSkillBuilder';
import ApiClient = services.ApiClient;
/**
 * An interface which helps building a customized skill.
 */
export interface CustomSkillBuilder extends BaseSkillBuilder {
    withPersistenceAdapter(persistenceAdapter: PersistenceAdapter): this;
    withApiClient(apiClient: ApiClient): this;
}
