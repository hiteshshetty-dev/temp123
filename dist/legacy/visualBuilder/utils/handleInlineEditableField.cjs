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

// src/visualBuilder/utils/handleInlineEditableField.ts
var handleInlineEditableField_exports = {};
__export(handleInlineEditableField_exports, {
  handleInlineEditableField: () => handleInlineEditableField
});
module.exports = __toCommonJS(handleInlineEditableField_exports);
var import_constants = require("./constants.cjs");
var import_isFieldMultiple = require("./isFieldMultiple.cjs");
var import_enableInlineEditing = require("./enableInlineEditing.cjs");
function handleInlineEditableField({
  fieldType,
  fieldSchema,
  fieldMetadata,
  expectedFieldData,
  editableElement,
  elements
}) {
  if (!import_constants.ALLOWED_INLINE_EDITABLE_FIELD.includes(fieldType)) return;
  const index = Number(
    fieldMetadata.instance.fieldPathWithIndex.split(".").at(-1)
  );
  const isInstance = Number.isFinite(index);
  if ((0, import_isFieldMultiple.isFieldMultiple)(fieldSchema)) {
    let expectedFieldInstanceData = null;
    if (Array.isArray(expectedFieldData)) {
      if (!isInstance) {
        return;
      }
      if (index >= expectedFieldData.length) {
      } else {
        expectedFieldInstanceData = expectedFieldData.at(index);
      }
    } else {
      expectedFieldInstanceData = expectedFieldData;
    }
    (0, import_enableInlineEditing.enableInlineEditing)({
      fieldType,
      expectedFieldData: expectedFieldInstanceData,
      editableElement,
      elements
    });
  } else {
    let expectedFieldInstanceData = null;
    if (isInstance) {
      if (index !== 0) {
        return;
      }
      expectedFieldInstanceData = Array.isArray(expectedFieldData) ? expectedFieldData.at(0) : expectedFieldData;
    }
    (0, import_enableInlineEditing.enableInlineEditing)({
      fieldType,
      expectedFieldData: expectedFieldInstanceData ?? expectedFieldData,
      editableElement,
      elements
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handleInlineEditableField
});
//# sourceMappingURL=handleInlineEditableField.cjs.map