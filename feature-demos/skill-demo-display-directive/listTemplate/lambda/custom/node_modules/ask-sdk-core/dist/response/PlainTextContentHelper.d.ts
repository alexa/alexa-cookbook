import { interfaces } from 'ask-sdk-model';
import { TextContentHelper } from './TextContentHelper';
/**
 * Responsible for building plain text content object using ask-sdk-model in Alexa skills kit display interface
 * https://developer.amazon.com/docs/custom-skills/display-interface-reference.html#textcontent-object-specifications.
 */
export declare class PlainTextContentHelper extends TextContentHelper {
    constructor();
    /**
     * @returns {interfaces.display.TextContent}
     */
    getTextContent(): interfaces.display.TextContent;
}
