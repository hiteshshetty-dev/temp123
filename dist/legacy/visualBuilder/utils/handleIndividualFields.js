import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/handleIndividualFields.ts
import { VisualBuilder } from "../index.js";
import { VISUAL_BUILDER_FIELD_TYPE_ATTRIBUTE_KEY } from "./constants.js";
import { FieldSchemaMap } from "./fieldSchemaMap.js";
import { getFieldData } from "./getFieldData.js";
import { getFieldType } from "./getFieldType.js";
import { handleFieldInput, handleFieldKeyDown } from "./handleFieldMouseDown.js";
import { isFieldDisabled } from "./isFieldDisabled.js";
import {
  handleAddButtonsForMultiple,
  removeAddInstanceButtons
} from "./multipleElementAddButton.js";
import { isFieldMultiple } from "./isFieldMultiple.js";
import { handleInlineEditableField } from "./handleInlineEditableField.js";
import { pasteAsPlainText } from "./pasteAsPlainText.js";
import { removeFieldToolbar } from "../generators/generateToolbar.js";
import { fetchEntryPermissionsAndStageDetails } from "./fetchEntryPermissionsAndStageDetails.js";
async function handleIndividualFields(eventDetails, elements) {
  const { fieldMetadata, editableElement } = eventDetails;
  const { visualBuilderContainer, lastEditedField, resizeObserver } = elements;
  const {
    content_type_uid,
    entry_uid,
    locale,
    variant,
    fieldPath,
    fieldPathWithIndex
  } = fieldMetadata;
  const [fieldSchema, expectedFieldData] = await Promise.all([
    FieldSchemaMap.getFieldSchema(content_type_uid, fieldPath),
    getFieldData(
      { content_type_uid, entry_uid, locale },
      fieldPathWithIndex
    )
  ]);
  const fieldType = getFieldType(fieldSchema);
  const { acl: entryAcl, workflowStage: entryWorkflowStageDetails, resolvedVariantPermissions } = await fetchEntryPermissionsAndStageDetails({
    entryUid: entry_uid,
    contentTypeUid: content_type_uid,
    locale,
    variantUid: variant,
    fieldPathWithIndex
  });
  const { isDisabled: disabled } = isFieldDisabled(
    fieldSchema,
    eventDetails,
    resolvedVariantPermissions,
    entryAcl,
    entryWorkflowStageDetails
  );
  editableElement.setAttribute(
    VISUAL_BUILDER_FIELD_TYPE_ATTRIBUTE_KEY,
    fieldType
  );
  if (isFieldMultiple(fieldSchema)) {
    if (lastEditedField !== editableElement) {
      const addButtonLabel = fieldSchema.data_type === "blocks" ? (
        // ? `Add ${fieldSchema.display_name ?? "Modular Block"}`
        "Add Section"
      ) : void 0;
      handleAddButtonsForMultiple(
        eventDetails,
        {
          editableElement: eventDetails.editableElement,
          visualBuilderContainer,
          resizeObserver
        },
        {
          fieldSchema,
          expectedFieldData,
          disabled,
          label: addButtonLabel
        }
      );
    }
  }
  if (disabled) {
    return;
  }
  handleInlineEditableField({
    fieldType,
    fieldSchema,
    fieldMetadata,
    expectedFieldData,
    editableElement,
    elements
  });
}
function cleanIndividualFieldResidual(elements) {
  const { overlayWrapper, visualBuilderContainer, focusedToolbar } = elements;
  removeAddInstanceButtons(
    {
      eventTarget: null,
      visualBuilderContainer,
      overlayWrapper
    },
    true
  );
  const previousSelectedEditableDOM = VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM;
  if (previousSelectedEditableDOM) {
    previousSelectedEditableDOM.removeAttribute(
      VISUAL_BUILDER_FIELD_TYPE_ATTRIBUTE_KEY
    );
    previousSelectedEditableDOM.removeAttribute("contenteditable");
    previousSelectedEditableDOM.removeEventListener(
      "input",
      handleFieldInput
    );
    previousSelectedEditableDOM.removeEventListener(
      "keydown",
      handleFieldKeyDown
    );
    previousSelectedEditableDOM.removeEventListener(
      "paste",
      pasteAsPlainText
    );
    elements.resizeObserver.unobserve(previousSelectedEditableDOM);
  }
  const pseudoEditableElement = visualBuilderContainer == null ? void 0 : visualBuilderContainer.querySelector(
    ".visual-builder__pseudo-editable-element"
  );
  if (pseudoEditableElement) {
    elements.resizeObserver.unobserve(pseudoEditableElement);
    pseudoEditableElement.removeEventListener("paste", pasteAsPlainText);
    pseudoEditableElement.remove();
    if (previousSelectedEditableDOM) {
      previousSelectedEditableDOM.style.removeProperty(
        "visibility"
      );
    }
  }
  if (focusedToolbar) {
    removeFieldToolbar(focusedToolbar);
  }
}
export {
  cleanIndividualFieldResidual,
  handleIndividualFields
};
//# sourceMappingURL=handleIndividualFields.js.map