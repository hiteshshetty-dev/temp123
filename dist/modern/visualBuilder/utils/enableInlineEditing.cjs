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

// src/visualBuilder/utils/enableInlineEditing.ts
var enableInlineEditing_exports = {};
__export(enableInlineEditing_exports, {
  enableInlineEditing: () => enableInlineEditing
});
module.exports = __toCommonJS(enableInlineEditing_exports);
var import_lodash_es = require("lodash-es");
var import__ = require("../index.cjs");
var import_generatePseudoEditableField = require("../generators/generatePseudoEditableField.cjs");
var import_constants = require("./constants.cjs");
var import_getMultilinePlaintext = require("./getMultilinePlaintext.cjs");
var import_handleFieldMouseDown = require("./handleFieldMouseDown.cjs");
var import_types = require("./types/index.types.cjs");
var import_updateFocussedState = require("./updateFocussedState.cjs");
var import_pasteAsPlainText = require("./pasteAsPlainText.cjs");
function enableInlineEditing({
  expectedFieldData,
  editableElement,
  fieldType,
  elements
}) {
  const { visualBuilderContainer, resizeObserver } = elements;
  let actualEditableField = editableElement;
  import__.VisualBuilder.VisualBuilderGlobalState.value.focusFieldValue = actualEditableField?.innerText;
  const elementComputedDisplay = window.getComputedStyle(actualEditableField).display;
  let textContent = editableElement.innerText || editableElement.textContent || "";
  if (fieldType === import_types.FieldDataType.MULTILINE) {
    textContent = (0, import_getMultilinePlaintext.getMultilinePlaintext)(actualEditableField);
    actualEditableField.addEventListener("paste", import_pasteAsPlainText.pasteAsPlainText);
  }
  const expectedTextContent = expectedFieldData;
  const isFieldLastEdited = document.querySelector("[data-cs-last-edited]") === editableElement;
  if (expectedTextContent && textContent !== expectedTextContent || (0, import_generatePseudoEditableField.isEllipsisActive)(editableElement) || isFieldLastEdited) {
    const pseudoEditableField = (0, import_generatePseudoEditableField.generatePseudoEditableElement)(
      { editableElement },
      { textContent: expectedFieldData }
    );
    editableElement.style.visibility = "hidden";
    pseudoEditableField.setAttribute(
      import_constants.VISUAL_BUILDER_FIELD_TYPE_ATTRIBUTE_KEY,
      fieldType
    );
    visualBuilderContainer.appendChild(pseudoEditableField);
    actualEditableField = pseudoEditableField;
    if (fieldType === import_types.FieldDataType.MULTILINE)
      actualEditableField.addEventListener("paste", import_pasteAsPlainText.pasteAsPlainText);
    elements.resizeObserver.observe(pseudoEditableField);
  } else if (elementComputedDisplay === "inline") {
    const onInlineElementInput = (0, import_lodash_es.throttle)(() => {
      const overlayWrapper = visualBuilderContainer.querySelector(
        ".visual-builder__overlay__wrapper"
      );
      const focusedToolbar = visualBuilderContainer.querySelector(
        ".visual-builder__focused-toolbar"
      );
      (0, import_updateFocussedState.updateFocussedState)({
        editableElement: actualEditableField,
        visualBuilderContainer,
        overlayWrapper,
        focusedToolbar,
        resizeObserver
      });
    }, 200);
    actualEditableField.addEventListener("input", onInlineElementInput);
  }
  actualEditableField.setAttribute("contenteditable", "true");
  actualEditableField.addEventListener("input", import_handleFieldMouseDown.handleFieldInput);
  actualEditableField.addEventListener("keydown", import_handleFieldMouseDown.handleFieldKeyDown);
  editableElement.setAttribute("data-cs-last-edited", "true");
  actualEditableField.focus();
  return;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  enableInlineEditing
});
//# sourceMappingURL=enableInlineEditing.cjs.map