import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/handleFieldMouseDown.ts
import { throttle } from "lodash-es";
import { sendFieldEvent } from "../generators/generateOverlay.js";
import {
  ALLOWED_INLINE_EDITABLE_FIELD,
  VISUAL_BUILDER_FIELD_TYPE_ATTRIBUTE_KEY,
  numericInputRegex
} from "./constants.js";
import { FieldDataType } from "./types/index.types.js";
import { VisualBuilderPostMessageEvents } from "./types/postMessage.types.js";
import { insertSpaceAtCursor } from "./insertSpaceAtCursor.js";
import { VisualBuilder } from "../index.js";
function handleFieldInput(e) {
  const event = e;
  const targetElement = event.target;
  const fieldType = targetElement.getAttribute(
    VISUAL_BUILDER_FIELD_TYPE_ATTRIBUTE_KEY
  );
  if (event.type === "input" && ALLOWED_INLINE_EDITABLE_FIELD.includes(fieldType)) {
    if (!VisualBuilder.VisualBuilderGlobalState.value.focusFieldReceivedInput) {
      VisualBuilder.VisualBuilderGlobalState.value.focusFieldReceivedInput = true;
    }
    throttledFieldSync();
  }
}
var throttledFieldSync = throttle(() => {
  try {
    const visualBuilderContainer = document.querySelector(
      ".visual-builder__container"
    );
    if (!visualBuilderContainer) return;
    sendFieldEvent({
      visualBuilderContainer,
      eventType: VisualBuilderPostMessageEvents.SYNC_FIELD
    });
  } catch (error) {
    console.error("Error in throttledFieldSync", error);
  }
}, 300);
function handleFieldKeyDown(e) {
  const event = e;
  const targetElement = event.target;
  const fieldType = targetElement.getAttribute(
    VISUAL_BUILDER_FIELD_TYPE_ATTRIBUTE_KEY
  );
  if (event.composedPath().some(
    (element) => element instanceof Element && element.tagName === "BUTTON"
  )) {
    handleKeyDownOnButton(event);
  }
  if (fieldType === FieldDataType.NUMBER) {
    handleNumericFieldKeyDown(event);
  } else if (fieldType === FieldDataType.SINGLELINE) {
    handleSingleLineFieldKeyDown(event);
  }
}
function handleKeyDownOnButton(e) {
  if (e.code === "Space" && e.target) {
    e.preventDefault();
    insertSpaceAtCursor(e.target);
    throttledFieldSync();
  }
}
function handleSingleLineFieldKeyDown(e) {
  if (e.code === "Enter") {
    e.preventDefault();
  }
}
function handleNumericFieldKeyDown(event) {
  const targetElement = event.target;
  const allowedKeys = [
    "Backspace",
    "Tab",
    "Enter",
    "End",
    "Home",
    "ArrowLeft",
    "ArrowRight",
    "Delete"
  ];
  if (event.ctrlKey || event.metaKey || event.altKey || allowedKeys.includes(event.code)) {
    return;
  }
  if (event.code.includes("Digit")) {
    return;
  }
  const nonNumericAllowedCharacters = ["-", ".", "e", "E"];
  if (!nonNumericAllowedCharacters.includes(event.key)) {
    event.preventDefault();
    return;
  }
  const selection = {
    startOffset: window.getSelection()?.getRangeAt(0).startOffset || 0,
    endOffset: window.getSelection()?.getRangeAt(0).endOffset || 0
  };
  const existingInput = targetElement.textContent || "";
  const currentOutputArr = existingInput.split("");
  currentOutputArr.splice(
    selection.startOffset,
    selection.endOffset - selection.startOffset,
    event.key
  );
  const currentInput = currentOutputArr.join("");
  if (!numericInputRegex.test(currentInput)) {
    event.preventDefault();
  }
}
export {
  handleFieldInput,
  handleFieldKeyDown
};
//# sourceMappingURL=handleFieldMouseDown.js.map