"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/visualBuilder/utils/handleIndividualFields.ts
var handleIndividualFields_exports = {};
__export(handleIndividualFields_exports, {
  cleanIndividualFieldResidual: () => cleanIndividualFieldResidual,
  handleIndividualFields: () => handleIndividualFields
});
module.exports = __toCommonJS(handleIndividualFields_exports);
var import__ = require("../index.cjs");
var import_constants = require("./constants.cjs");
var import_fieldSchemaMap = require("./fieldSchemaMap.cjs");
var import_getFieldData = require("./getFieldData.cjs");
var import_getFieldType = require("./getFieldType.cjs");
var import_handleFieldMouseDown = require("./handleFieldMouseDown.cjs");
var import_isFieldDisabled = require("./isFieldDisabled.cjs");
var import_multipleElementAddButton = require("./multipleElementAddButton.cjs");
var import_isFieldMultiple = require("./isFieldMultiple.cjs");
var import_handleInlineEditableField = require("./handleInlineEditableField.cjs");
var import_pasteAsPlainText = require("./pasteAsPlainText.cjs");
var import_getEntryPermissionsCached = require("./getEntryPermissionsCached.cjs");
var import_generateToolbar = require("../generators/generateToolbar.cjs");
async function handleIndividualFields(eventDetails, elements) {
  const { fieldMetadata, editableElement } = eventDetails;
  const { visualBuilderContainer, lastEditedField, resizeObserver } = elements;
  const {
    content_type_uid,
    entry_uid,
    locale,
    fieldPath,
    fieldPathWithIndex
  } = fieldMetadata;
  const [fieldSchema, expectedFieldData] = await Promise.all([
    import_fieldSchemaMap.FieldSchemaMap.getFieldSchema(content_type_uid, fieldPath),
    (0, import_getFieldData.getFieldData)(
      { content_type_uid, entry_uid, locale },
      fieldPathWithIndex
    )
  ]);
  const fieldType = (0, import_getFieldType.getFieldType)(fieldSchema);
  const entryAcl = await (0, import_getEntryPermissionsCached.getEntryPermissionsCached)({
    entryUid: entry_uid,
    contentTypeUid: content_type_uid,
    locale
  });
  const { isDisabled: disabled } = (0, import_isFieldDisabled.isFieldDisabled)(
    fieldSchema,
    eventDetails,
    entryAcl
  );
  editableElement.setAttribute(
    import_constants.VISUAL_BUILDER_FIELD_TYPE_ATTRIBUTE_KEY,
    fieldType
  );
  if ((0, import_isFieldMultiple.isFieldMultiple)(fieldSchema)) {
    if (lastEditedField !== editableElement) {
      const addButtonLabel = fieldSchema.data_type === "blocks" ? (
        // ? `Add ${fieldSchema.display_name ?? "Modular Block"}`
        "Add Section"
      ) : void 0;
      (0, import_multipleElementAddButton.handleAddButtonsForMultiple)(
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
  (0, import_handleInlineEditableField.handleInlineEditableField)({
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
  (0, import_multipleElementAddButton.removeAddInstanceButtons)(
    {
      eventTarget: null,
      visualBuilderContainer,
      overlayWrapper
    },
    true
  );
  const previousSelectedEditableDOM = import__.VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM;
  if (previousSelectedEditableDOM) {
    previousSelectedEditableDOM.removeAttribute(
      import_constants.VISUAL_BUILDER_FIELD_TYPE_ATTRIBUTE_KEY
    );
    previousSelectedEditableDOM.removeAttribute("contenteditable");
    previousSelectedEditableDOM.removeEventListener(
      "input",
      import_handleFieldMouseDown.handleFieldInput
    );
    previousSelectedEditableDOM.removeEventListener(
      "keydown",
      import_handleFieldMouseDown.handleFieldKeyDown
    );
    previousSelectedEditableDOM.removeEventListener(
      "paste",
      import_pasteAsPlainText.pasteAsPlainText
    );
    elements.resizeObserver.unobserve(previousSelectedEditableDOM);
  }
  const pseudoEditableElement = visualBuilderContainer?.querySelector(
    ".visual-builder__pseudo-editable-element"
  );
  if (pseudoEditableElement) {
    elements.resizeObserver.unobserve(pseudoEditableElement);
    pseudoEditableElement.removeEventListener("paste", import_pasteAsPlainText.pasteAsPlainText);
    pseudoEditableElement.remove();
    if (previousSelectedEditableDOM) {
      previousSelectedEditableDOM.style.removeProperty(
        "visibility"
      );
    }
  }
  if (focusedToolbar) {
    (0, import_generateToolbar.removeFieldToolbar)(focusedToolbar);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cleanIndividualFieldResidual,
  handleIndividualFields
});
//# sourceMappingURL=handleIndividualFields.cjs.map