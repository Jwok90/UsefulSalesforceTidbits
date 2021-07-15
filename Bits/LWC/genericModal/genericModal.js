import { LightningElement, api } from "lwc";

export default class GenericModal extends LightningElement {
  //Properties
  @api closeButtonVisible;
  @api containerSize = "40rem";
  @api modalHeader;
  @api negativeButtonLabel;
  @api negativeButtonVisible;
  @api positiveButtonLabel;
  @api positiveButtonVisible;
  @api showModal;

  // Lifecycle Hooks

  // Getters/Setters

  get containerStyle() {
    return (
      "align-items: center; max-width: " + this.containerSize + "; width: 100%;"
    );
  }

  // Other

  handleNegative() {
    this.dispatchEvent(new CustomEvent("negative", {}));
  }

  handlePositive() {
    this.dispatchEvent(new CustomEvent("positive"), {});
  }
}
