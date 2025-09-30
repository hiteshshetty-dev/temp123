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

// src/visualBuilder/utils/handleFieldMouseDown.ts
var handleFieldMouseDown_exports = {};
__export(handleFieldMouseDown_exports, {
  handleFieldInput: () => handleFieldInput,
  handleFieldKeyDown: () => handleFieldKeyDown
});
module.exports = __toCommonJS(handleFieldMouseDown_exports);
var import_lodash_es = require("lodash-es");
var import_generateOverlay = require("../generators/generateOverlay.cjs");
var import_constants = require("./constants.cjs");
var import_types = require("./types/index.types.cjs");
var import_postMessage = require("./types/postMessage.types.cjs");
var import_insertSpaceAtCursor = require("./insertSpaceAtCursor.cjs");
var import__ = require("../index.cjs");
function handleFieldInput(e) {
  const event = e;
  const targetElement = event.target;
  const fieldType = targetElement.getAttribute(
    import_constants.VISUAL_BUILDER_FIELD_TYPE_ATTRIBUTE_KEY
  );
  const previousLastEditedElement = document.querySelector("[data-cs-last-edited]");
  if (previousLastEditedElement !== targetElement) {
    previousLastEditedElement?.removeAttribute("data-cs-last-edited");
    targetElement.setAttribute("data-cs-last-edited", "true");
  }
  if (event.type === "input" && import_constants.ALLOWED_INLINE_EDITABLE_FIELD.includes(fieldType)) {
    if (!import__.VisualBuilder.VisualBuilderGlobalState.value.focusFieldReceivedInput) {
      import__.VisualBuilder.VisualBuilderGlobalState.value.focusFieldReceivedInput = true;
    }
    throttledFieldSync();
  }
}
var throttledFieldSync = (0, import_lodash_es.throttle)(() => {
  try {
    const visualBuilderContainer = document.querySelector(
      ".visual-builder__container"
    );
    if (!visualBuilderContainer) return;
    (0, import_generateOverlay.sendFieldEvent)({
      visualBuilderContainer,
      eventType: import_postMessage.VisualBuilderPostMessageEvents.SYNC_FIELD
    });
  } catch (error) {
    console.error("Error in throttledFieldSync", error);
  }
}, 300);
function handleFieldKeyDown(e) {
  const event = e;
  const targetElement = event.target;
  const fieldType = targetElement.getAttribute(
    import_constants.VISUAL_BUILDER_FIELD_TYPE_ATTRIBUTE_KEY
  );
  if (event.composedPath().some(
    (element) => element instanceof Element && element.tagName === "BUTTON"
  )) {
    handleKeyDownOnButton(event);
  }
  if (fieldType === import_types.FieldDataType.NUMBER) {
    handleNumericFieldKeyDown(event);
  } else if (fieldType === import_types.FieldDataType.SINGLELINE) {
    handleSingleLineFieldKeyDown(event);
  }
}
function handleKeyDownOnButton(e) {
  if (e.code === "Space" && e.target) {
    e.preventDefault();
    (0, import_insertSpaceAtCursor.insertSpaceAtCursor)(e.target);
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
  if (!import_constants.numericInputRegex.test(currentInput)) {
    event.preventDefault();
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handleFieldInput,
  handleFieldKeyDown
});
//# sourceMappingURL=handleFieldMouseDown.cjs.map