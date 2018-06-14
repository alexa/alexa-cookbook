import { ResponseBuilder } from './ResponseBuilder';
/**
 * Responsible for building JSON responses using ask-sdk-model as per the Alexa skills kit interface
 * https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/alexa-skills-kit-interface-reference#response-body-syntax.
 */
export declare class ResponseFactory {
    static init(): ResponseBuilder;
    private constructor();
}
