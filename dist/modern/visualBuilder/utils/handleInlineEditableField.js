import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/handleInlineEditableField.ts
import { ALLOWED_INLINE_EDITABLE_FIELD } from "./constants.js";
import { isFieldMultiple } from "./isFieldMultiple.js";
import { enableInlineEditing } from "./enableInlineEditing.js";
function handleInlineEditableField({
  fieldType,
  fieldSchema,
  fieldMetadata,
  expectedFieldData,
  editableElement,
  elements
}) {
  if (!ALLOWED_INLINE_EDITABLE_FIELD.includes(fieldType)) return;
  const index = Number(
    fieldMetadata.instance.fieldPathWithIndex.split(".").at(-1)
  );
  const isInstance = Number.isFinite(index);
  if (isFieldMultiple(fieldSchema)) {
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
    enableInlineEditing({
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
    enableInlineEditing({
      fieldType,
      expectedFieldData: expectedFieldInstanceData ?? expectedFieldData,
      editableElement,
      elements
    });
  }
}
export {
  handleInlineEditableField
};
//# sourceMappingURL=handleInlineEditableField.js.map