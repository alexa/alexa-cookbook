/**
 * This extension is should be placed in the code > extensions folder in a
 * Skill Flow Builder project. This is not a standalone function.
 */

import {
  InstructionExtension,
  DriverExtension,
  InstructionExtensionParameter,
  DriverExtensionParameter,
} from "@alexa-games/sfb-f";

export class ISPExtension implements InstructionExtension, DriverExtension {
  private handlerInput: any;

  async pre(param: DriverExtensionParameter) {
    this.handlerInput = param.userInputHelper.getHandlerInput();

    return;
  }

  async post(param: DriverExtensionParameter) {
    // Use for post processing, not needed this time
  }

  public async purchasable(param: InstructionExtensionParameter): Promise<void> {
    param.instructionParameters.workflowType = "purchasable";
    param.storyState.monetizationPurchasable = false;

    param.storyState = await this.getMonetizationData(param);

    return;
  }

  public async consumable(param: InstructionExtensionParameter): Promise<void> {
    param.instructionParameters.workflowType = "consumable";

    param.storyState = await this.getMonetizationData(param);
    return;
  }

  private async getMonetizationData(param: InstructionExtensionParameter): Promise<any> {
    const product = param.instructionParameters.item; // Supplied from the story file

    if (!product) {
      throw `[AlexaMonetizationExtension Syntax Error] monetized item=[${product}] not provided.`;
    }

    const ms: any = this.handlerInput.serviceClientFactory.getMonetizationServiceClient();
    const locale: string = this.handlerInput.requestEnvelope.request.locale;

    const isp: any = await ms.getInSkillProducts(locale).then((res: any) => {
      if (res.inSkillProducts.length > 0) {
        let item = res.inSkillProducts.filter((record: any) => record.referenceName === product);
        return item;
      }
    });

    // Return product information based on user request
    if (param.instructionParameters.workflowType === "purchasable") {
      if (isp && isp["purchasable"] === "PURCHASABLE") {
        console.info("Item is purchasable: ", isp.name);

        // Easily indicate within the story the item is purchasable
        param.storyState.monetizationPurchasable = true;
      } else {
        console.info("Item cannot be purchased: ", product);
      }
    } else if (param.instructionParameters.workflowType === "consumable") {
      if (isp && isp.activeEntitlementCount) {
        let itemAmount: number = parseInt(isp.activeEntitlementCount);
        param.storyState[`${product}Purchased`] = itemAmount;
        // Set the purchased and consumed session variables to keep track during game
        if (itemAmount) {
          if (!param.storyState[`${product}Consumed`]) {
            param.storyState[`${product}Consumed`] = 0;
          }
          if (param.storyState[`${product}Consumed`] > itemAmount) {
            // User shows as using more of the consumable than purchased
            param.storyState[`${product}Consumed`] = itemAmount;
          }
        }
        param.storyState.monetizationPurchasable = true;
      } else {
        console.info("Item is not available: ", product);
        param.storyState[`${product}Consumed`] = 0;
        param.storyState[`${product}Purchased`] = 0;
        param.storyState[`${product}`] = 0;
        param.storyState.monetizationPurchasable = false;
      }
    }

    return param.storyState;
  }
}
