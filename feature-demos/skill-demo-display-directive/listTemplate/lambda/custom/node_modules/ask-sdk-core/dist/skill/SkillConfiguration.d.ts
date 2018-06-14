import { services } from 'ask-sdk-model';
import { PersistenceAdapter } from '../attributes/persistence/PersistenceAdapter';
import { ErrorMapper } from '../dispatcher/error/ErrorMapper';
import { HandlerAdapter } from '../dispatcher/request/handler/HandlerAdapter';
import { RequestInterceptor } from '../dispatcher/request/interceptor/RequestInterceptor';
import { ResponseInterceptor } from '../dispatcher/request/interceptor/ResponseInterceptor';
import { RequestMapper } from '../dispatcher/request/mapper/RequestMapper';
/**
 * An interfaces that represents the standard components needed to build {@link Skill}.
 */
export interface SkillConfiguration {
    requestMappers: RequestMapper[];
    handlerAdapters: HandlerAdapter[];
    errorMapper?: ErrorMapper;
    requestInterceptors?: RequestInterceptor[];
    responseInterceptors?: ResponseInterceptor[];
    persistenceAdapter?: PersistenceAdapter;
    apiClient?: services.ApiClient;
    customUserAgent?: string;
    skillId?: string;
}
