import { interfaces } from 'ask-sdk-model';
import Image = interfaces.display.Image;
/**
 * Responsible for building image object using ask-sdk-model in Alexa skills kit display interface
 * https://developer.amazon.com/docs/custom-skills/display-interface-reference.html#image-object-specifications.
 */
export declare class ImageHelper {
    protected image: Image;
    /**
     * Sets content description in image object
     * @param {string} description text used to describe the image for a screen reader
     * @returns {ImageHelper}
     */
    withDescription(description: string): this;
    /**
     * Add image instance in image object
     * @param {string} url source of the image
     * @param {interfaces.display.ImageSize} size  size of the image. Accepted values:
     * X_SMALL: Displayed within extra small containers
     * SMALL: Displayed within small  containers
     * MEDIUM: Displayed within medium containers
     * LARGE: Displayed within large containers
     * X_LARGE Displayed within extra large containers
     * By default, for Echo Show, size takes the value X_SMALL. If the other size values are included,
     * then the order of precedence for displaying images begins with X_LARGE and proceeds downward,
     * which means that larger images will be downscaled for display on Echo Show if provided.
     * For the best user experience, include the appropriately sized image, and do not include larger images.
     * @param {number} widthPixels widthPixels of the image
     * @param {number} heightPixels heightPixels of the image
     * @returns {ImageHelper}
     */
    addImageInstance(url: string, size?: interfaces.display.ImageSize, widthPixels?: number, heightPixels?: number): this;
    /**
     * @returns {Image}
     */
    getImage(): Image;
}
