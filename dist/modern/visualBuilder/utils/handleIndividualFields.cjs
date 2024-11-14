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
var import_lodash_es = require("lodash-es");
var import__ = require("../index.cjs");
var import_generatePseudoEditableField = require("../generators/generatePseudoEditableField.cjs");
var import_constants = require("./constants.cjs");
var import_fieldSchemaMap = require("./fieldSchemaMap.cjs");
var import_getFieldData = require("./getFieldData.cjs");
var import_getFieldType = require("./getFieldType.cjs");
var import_handleFieldMouseDown = require("./handleFieldMouseDown.cjs");
var import_isFieldDisabled = require("./isFieldDisabled.cjs");
var import_multipleElementAddButton = require("./multipleElementAddButton.cjs");
var import_updateFocussedState = require("./updateFocussedState.cjs");
var import_types = require("./types/index.types.cjs");
var import_getMultilinePlaintext = require("./getMultilinePlaintext.cjs");
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
  const expectedFieldInstanceData = Array.isArray(expectedFieldData) ? expectedFieldData.at(fieldMetadata.multipleFieldMetadata.index) : void 0;
  const fieldType = (0, import_getFieldType.getFieldType)(fieldSchema);
  const { isDisabled: disabled } = (0, import_isFieldDisabled.isFieldDisabled)(fieldSchema, eventDetails);
  editableElement.setAttribute(
    import_constants.VISUAL_BUILDER_FIELD_TYPE_ATTRIBUTE_KEY,
    fieldType
  );
  if (fieldSchema && (fieldSchema?.multiple || fieldSchema?.data_type === "reference" && // @ts-ignore
  fieldSchema?.field_metadata.ref_multiple)) {
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
    if (eventDetails.fieldMetadata.multipleFieldMetadata.index > -1) {
      handleSingleField(
        {
          editableElement,
          visualBuilderContainer,
          resizeObserver: elements.resizeObserver
        },
        { expectedFieldData: expectedFieldInstanceData, disabled }
      );
    }
  } else {
    handleSingleField(
      {
        editableElement,
        visualBuilderContainer,
        resizeObserver: elements.resizeObserver
      },
      { expectedFieldData, disabled }
    );
  }
  function handleSingleField(elements2, config) {
    const { editableElement: editableElement2, visualBuilderContainer: visualBuilderContainer2 } = elements2;
    if (config.disabled) {
      return;
    }
    if (import_constants.ALLOWED_INLINE_EDITABLE_FIELD.includes(fieldType)) {
      let actualEditableField = editableElement2;
      import__.VisualBuilder.VisualBuilderGlobalState.value.focusFieldValue = actualEditableField?.innerText;
      const elementComputedDisplay = window.getComputedStyle(actualEditableField).display;
      let textContent = editableElement2.innerText || editableElement2.textContent || "";
      if (fieldType === import_types.FieldDataType.MULTILINE) {
        textContent = (0, import_getMultilinePlaintext.getMultilinePlaintext)(actualEditableField);
        actualEditableField.addEventListener("paste", pasteAsPlainText);
      }
      const expectedTextContent = config.expectedFieldData;
      if (textContent !== expectedTextContent || (0, import_generatePseudoEditableField.isEllipsisActive)(editableElement2)) {
        const pseudoEditableField = (0, import_generatePseudoEditableField.generatePseudoEditableElement)(
          { editableElement: editableElement2 },
          { textContent: config.expectedFieldData }
        );
        editableElement2.style.visibility = "hidden";
        pseudoEditableField.setAttribute(
          import_constants.VISUAL_BUILDER_FIELD_TYPE_ATTRIBUTE_KEY,
          fieldType
        );
        visualBuilderContainer2.appendChild(pseudoEditableField);
        actualEditableField = pseudoEditableField;
        if (fieldType === import_types.FieldDataType.MULTILINE)
          actualEditableField.addEventListener(
            "paste",
            pasteAsPlainText
          );
        elements2.resizeObserver.observe(pseudoEditableField);
      } else if (elementComputedDisplay === "inline") {
        const onInlineElementInput = (0, import_lodash_es.throttle)(() => {
          const overlayWrapper = visualBuilderContainer2.querySelector(
            ".visual-builder__overlay__wrapper"
          );
          const focusedToolbar = visualBuilderContainer2.querySelector(
            ".visual-builder__focused-toolbar"
          );
          (0, import_updateFocussedState.updateFocussedState)({
            editableElement: actualEditableField,
            visualBuilderContainer: visualBuilderContainer2,
            overlayWrapper,
            focusedToolbar,
            resizeObserver
          });
        }, 200);
        actualEditableField.addEventListener(
          "input",
          onInlineElementInput
        );
      }
      actualEditableField.setAttribute("contenteditable", "true");
      actualEditableField.addEventListener("input", import_handleFieldMouseDown.handleFieldInput);
      actualEditableField.addEventListener("keydown", import_handleFieldMouseDown.handleFieldKeyDown);
      actualEditableField.focus();
      return;
    }
  }
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
      pasteAsPlainText
    );
    elements.resizeObserver.unobserve(previousSelectedEditableDOM);
  }
  const pseudoEditableElement = visualBuilderContainer?.querySelector(
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
    focusedToolbar.innerHTML = "";
  }
}
var pasteAsPlainText = (0, import_lodash_es.debounce)(
  (e) => {
    e.preventDefault();
    const clipboardData = e.clipboardData;
    document.execCommand(
      "inserttext",
      false,
      clipboardData?.getData("text/plain")
    );
  },
  100,
  { leading: true }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cleanIndividualFieldResidual,
  handleIndividualFields
});
//# sourceMappingURL=handleIndividualFields.cjs.map