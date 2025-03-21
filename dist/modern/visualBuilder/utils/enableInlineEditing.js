import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/enableInlineEditing.ts
import { throttle } from "lodash-es";
import { VisualBuilder } from "../index.js";
import {
  isEllipsisActive,
  generatePseudoEditableElement
} from "../generators/generatePseudoEditableField.js";
import { VISUAL_BUILDER_FIELD_TYPE_ATTRIBUTE_KEY } from "./constants.js";
import { getMultilinePlaintext } from "./getMultilinePlaintext.js";
import { handleFieldInput, handleFieldKeyDown } from "./handleFieldMouseDown.js";
import { FieldDataType } from "./types/index.types.js";
import { updateFocussedState } from "./updateFocussedState.js";
import { pasteAsPlainText } from "./pasteAsPlainText.js";
function enableInlineEditing({
  expectedFieldData,
  editableElement,
  fieldType,
  elements
}) {
  const { visualBuilderContainer, resizeObserver } = elements;
  let actualEditableField = editableElement;
  VisualBuilder.VisualBuilderGlobalState.value.focusFieldValue = actualEditableField?.innerText;
  const elementComputedDisplay = window.getComputedStyle(actualEditableField).display;
  let textContent = editableElement.innerText || editableElement.textContent || "";
  if (fieldType === FieldDataType.MULTILINE) {
    textContent = getMultilinePlaintext(actualEditableField);
    actualEditableField.addEventListener("paste", pasteAsPlainText);
  }
  const expectedTextContent = expectedFieldData;
  if (expectedTextContent && textContent !== expectedTextContent || isEllipsisActive(editableElement)) {
    const pseudoEditableField = generatePseudoEditableElement(
      { editableElement },
      { textContent: expectedFieldData }
    );
    editableElement.style.visibility = "hidden";
    pseudoEditableField.setAttribute(
      VISUAL_BUILDER_FIELD_TYPE_ATTRIBUTE_KEY,
      fieldType
    );
    visualBuilderContainer.appendChild(pseudoEditableField);
    actualEditableField = pseudoEditableField;
    if (fieldType === FieldDataType.MULTILINE)
      actualEditableField.addEventListener("paste", pasteAsPlainText);
    elements.resizeObserver.observe(pseudoEditableField);
  } else if (elementComputedDisplay === "inline") {
    const onInlineElementInput = throttle(() => {
      const overlayWrapper = visualBuilderContainer.querySelector(
        ".visual-builder__overlay__wrapper"
      );
      const focusedToolbar = visualBuilderContainer.querySelector(
        ".visual-builder__focused-toolbar"
      );
      updateFocussedState({
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
  actualEditableField.addEventListener("input", handleFieldInput);
  actualEditableField.addEventListener("keydown", handleFieldKeyDown);
  actualEditableField.focus();
  return;
}
export {
  enableInlineEditing
};
//# sourceMappingURL=enableInlineEditing.js.map