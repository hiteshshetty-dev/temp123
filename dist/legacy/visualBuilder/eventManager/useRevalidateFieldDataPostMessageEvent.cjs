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

// src/visualBuilder/eventManager/useRevalidateFieldDataPostMessageEvent.ts
var useRevalidateFieldDataPostMessageEvent_exports = {};
__export(useRevalidateFieldDataPostMessageEvent_exports, {
  handleRevalidateFieldData: () => handleRevalidateFieldData
});
module.exports = __toCommonJS(useRevalidateFieldDataPostMessageEvent_exports);
var import__ = require("../index.cjs");
var import_cslp = require("../../cslp/index.cjs");
var import_fieldSchemaMap = require("../utils/fieldSchemaMap.cjs");
var import_generateOverlay = require("../generators/generateOverlay.cjs");
var import_mouseClick = require("../listeners/mouseClick.cjs");
async function handleRevalidateFieldData() {
  const focusedElement = import__.VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM;
  const hoveredElement = import__.VisualBuilder.VisualBuilderGlobalState.value.previousHoveredTargetDOM;
  const elementCslp = focusedElement == null ? void 0 : focusedElement.getAttribute("data-cslp");
  const elementCslpUniqueId = (focusedElement == null ? void 0 : focusedElement.getAttribute("data-cslp-unique-id")) || null;
  const shouldRefocus = !!focusedElement;
  try {
    if (shouldRefocus) {
      await unfocusElement();
    }
    const targetElement = hoveredElement || focusedElement;
    if (targetElement) {
      const cslp = targetElement.getAttribute("data-cslp");
      if (cslp) {
        const fieldMetadata = (0, import_cslp.extractDetailsFromCslp)(cslp);
        import_fieldSchemaMap.FieldSchemaMap.clearContentTypeSchema(
          fieldMetadata.content_type_uid
        );
      }
    }
    import_fieldSchemaMap.FieldSchemaMap.clear();
  } catch (error) {
    console.error("Error handling revalidate field data:", error);
    window.location.reload();
  } finally {
    if (shouldRefocus && elementCslp) {
      await refocusElement(elementCslp, elementCslpUniqueId);
    }
  }
}
async function unfocusElement() {
  const { visualBuilderContainer, overlayWrapper, focusedToolbar } = getVisualBuilderElements();
  if (!visualBuilderContainer || !overlayWrapper) return;
  const dummyResizeObserver = new ResizeObserver(() => {
  });
  (0, import_generateOverlay.hideFocusOverlay)({
    visualBuilderContainer,
    visualBuilderOverlayWrapper: overlayWrapper,
    focusedToolbar,
    resizeObserver: dummyResizeObserver,
    noTrigger: true
  });
  import__.VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM = null;
  import__.VisualBuilder.VisualBuilderGlobalState.value.isFocussed = false;
}
async function refocusElement(cslp, uniqueId) {
  try {
    const elementToRefocus = uniqueId && document.querySelector(
      `[data-cslp-unique-id="${uniqueId}"]`
    ) || document.querySelector(`[data-cslp="${cslp}"]`);
    if (!elementToRefocus) return;
    const { visualBuilderContainer, overlayWrapper, focusedToolbar } = getVisualBuilderElements();
    if (!visualBuilderContainer || !overlayWrapper) return;
    const syntheticEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true
    });
    Object.defineProperty(syntheticEvent, "target", {
      value: elementToRefocus,
      enumerable: true
    });
    await (0, import_mouseClick.handleBuilderInteraction)({
      event: syntheticEvent,
      previousSelectedEditableDOM: null,
      visualBuilderContainer,
      overlayWrapper,
      focusedToolbar,
      resizeObserver: new ResizeObserver(() => {
      })
    });
  } catch (error) {
    console.warn("Could not refocus element after revalidation:", error);
  }
}
function getVisualBuilderElements() {
  return {
    visualBuilderContainer: document.querySelector(
      ".visual-builder__container"
    ),
    overlayWrapper: document.querySelector(
      ".visual-builder__overlay__wrapper"
    ),
    focusedToolbar: document.querySelector(
      ".visual-builder__focused-toolbar"
    )
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handleRevalidateFieldData
});
//# sourceMappingURL=useRevalidateFieldDataPostMessageEvent.cjs.map