import { LightningElement, api, track, wire } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class NewRecordModal extends LightningElement {
  @api showSubmitButton;
  @api showSubmitAndNewButton;
  @api showCancelButton;
  @api submitButtonLabel = "Save";
  @api submitAndNewButtonLabel = "Save and New";
  @api returnInsteadOfSubmit = false;
  @api cancelButtonLabel = "Cancel";
  @api showModal;
  @api isLoading = false;
  @api modalWidth;
  @api modalHeader;
  @api modalBody;
  @api objectName;
  @api pageLayout;
  @api prepopulatedFields;
  @api containerSize = "40rem"; // deprecated, no longer used
  newRecordObject = {};
  @api recordTypeId;
  @api relatedToField;
  @api relatedToIdsList;
  @api createForMultipleRelatedRecords;
  @api showSubmissionErrorsOnFooter = false;

  constructor() {
    super();
    this.showNegative = true;
    this.showPositive = true;
    this.showModal = false;
  }

  get isHiddenRelatedToField() {
    if (this.relatedToField && this.createForMultipleRelatedRecords) {
      return true;
    }
    return false;
  }

  firstRelatedToRecord;

  renderedCallback() {
    if (this.relatedToIdsList) {
      this.firstRelatedToRecord = this.relatedToIdsList[0];
    }
  }

  maintainModal;

  handleSaveAndExit() {
    this.maintainModal = false;
    this.handleSubmit();
  }

  handleSaveAndNew() {
    this.maintainModal = true;
    this.handleSubmit();
  }

  handleCreateRecordSuccess(event) {
    const newRecordId = event.detail.id;
    if (this.createForMultipleRelatedRecords) {
      let remainingIds = [];
      this.relatedToIdsList.forEach((id) => {
        if (id != this.firstRelatedToRecord) {
          remainingIds.push(id);
        }
      });

      this.dispatchEvent(
        new CustomEvent("submitmultiple", {
          detail: {
            submittedRecordId: newRecordId,
            idUsedForSubmit: this.firstRelatedToRecord,
            remainingIds: remainingIds
          }
        })
      );
    } else {
      if (this.maintainModal) {
        this.dispatchEvent(
          new CustomEvent("submitandnew", { detail: newRecordId })
        );
        const fields = this.template.querySelectorAll("lightning-input-field");
        fields.forEach((field) => {
          field.reset();
        });
      } else {
        this.dispatchEvent(new CustomEvent("submit", { detail: newRecordId }));
      }
    }
    this.submissionError = null;
  }

  submissionError;
  showError(event) {
    console.log(JSON.stringify(event));
    let errors = "";
    event.detail.output.errors.forEach((err) => {
      errors += err.message + "\n";
    });

    this.submissionError = errors;

    this.showNotification("Submission Error", errors, "error");
  }

  handleSubmit() {
    if (this.createForMultipleRelatedRecords) {
    }
    this.template.querySelector("lightning-record-edit-form").submit();
  }

  handleNegative() {
    this.dispatchEvent(new CustomEvent("negative"));
  }

  handleNewInput(event) {
    const fieldName = event.target.fieldName;
    const value = event.target.value;
    this.newRecordObject[fieldName] = value;
  }

  handleClose() {
    this.dispatchEvent(new CustomEvent("close"));
  }

  showNotification(title, message, variant) {
    const evt = new ShowToastEvent({
      title: title,
      message: message,
      variant: variant
    });
    this.dispatchEvent(evt);
  }
}
