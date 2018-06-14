import { interfaces } from 'ask-sdk-model';
import TextContent = interfaces.display.TextContent;
/**
 * An abstract class responsible for building text content object using ask-sdk-model in Alexa skills kit display interface
 * https://developer.amazon.com/docs/custom-skills/display-interface-reference.html#textcontent-object-specifications.
 */
export declare abstract class TextContentHelper {
    protected primaryText: string;
    protected secondaryText: string;
    protected tertiaryText: string;
    /**
     * @param {string} primaryText
     * @returns {this}
     */
    withPrimaryText(primaryText: string): this;
    /**
     * @param {string} secondaryText
     * @returns {this}
     */
    withSecondaryText(secondaryText: string): this;
    /**
     * @param {string} tertiaryText
     * @returns {this}
     */
    withTertiaryText(tertiaryText: string): this;
    /**
     * @returns {interfaces.display.TextContent}
     */
    abstract getTextContent(): TextContent;
}
