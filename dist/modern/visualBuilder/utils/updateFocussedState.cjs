"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/visualBuilder/utils/updateFocussedState.ts
var updateFocussedState_exports = {};
__export(updateFocussedState_exports, {
  updateFocussedState: () => updateFocussedState,
  updateFocussedStateOnMutation: () => updateFocussedStateOnMutation
});
module.exports = __toCommonJS(updateFocussedState_exports);
var import__ = require("../index.cjs");
var import_cslp = require("../../cslp/index.cjs");
var import_generateAddInstanceButtons = require("../generators/generateAddInstanceButtons.cjs");
var import_generateOverlay = require("../generators/generateOverlay.cjs");
var import_mouseHover = require("../listeners/mouseHover.cjs");
var import_getEntryPermissionsCached = require("./getEntryPermissionsCached.cjs");
var import_constants = require("./constants.cjs");
var import_fieldSchemaMap = require("./fieldSchemaMap.cjs");
var import_getChildrenDirection = __toESM(require("./getChildrenDirection.cjs"), 1);
var import_getPsuedoEditableStylesElement = require("./getPsuedoEditableStylesElement.cjs");
var import_isFieldDisabled = require("./isFieldDisabled.cjs");
function positionToolbar({
  focusedToolbar,
  selectedElementDimension
}) {
  if (focusedToolbar) {
    const targetElementRightEdgeOffset = window.scrollX + window.innerWidth - selectedElementDimension.left;
    const distanceFromTop = selectedElementDimension.top + window.scrollY - import_constants.TOOLBAR_EDGE_BUFFER;
    const adjustedDistanceFromTop = selectedElementDimension.top + window.scrollY < import_constants.TOP_EDGE_BUFFER ? distanceFromTop + selectedElementDimension.height + import_constants.TOP_EDGE_BUFFER : distanceFromTop;
    const distanceFromLeft = selectedElementDimension.left - import_constants.LIVE_PREVIEW_OUTLINE_WIDTH_IN_PX;
    const adjustedDistanceFromLeft = Math.max(
      distanceFromLeft,
      import_constants.TOOLBAR_EDGE_BUFFER
    );
    if (targetElementRightEdgeOffset < import_constants.RIGHT_EDGE_BUFFER && (focusedToolbar.style.justifyContent !== "flex-end" || focusedToolbar.style.left !== `${selectedElementDimension.right + import_constants.LIVE_PREVIEW_OUTLINE_WIDTH_IN_PX}px`)) {
      focusedToolbar.style.justifyContent = "flex-end";
      focusedToolbar.style.left = `${selectedElementDimension.right + import_constants.LIVE_PREVIEW_OUTLINE_WIDTH_IN_PX}px`;
    } else if (focusedToolbar.style.justifyContent !== "flex-start" || focusedToolbar.style.left !== `${adjustedDistanceFromLeft}px`) {
      focusedToolbar.style.justifyContent = "flex-start";
      focusedToolbar.style.left = `${adjustedDistanceFromLeft}px`;
    }
    if (focusedToolbar.style.top !== `${adjustedDistanceFromTop}px`) {
      focusedToolbar.style.top = `${adjustedDistanceFromTop}px`;
    }
  }
}
async function updateFocussedState({
  editableElement,
  visualBuilderContainer,
  overlayWrapper,
  focusedToolbar,
  resizeObserver
}) {
  let previousSelectedEditableDOM = import__.VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM;
  if (!visualBuilderContainer || !editableElement || !previousSelectedEditableDOM || !overlayWrapper) {
    return;
  }
  const previousSelectedElementCslp = editableElement?.getAttribute("data-cslp") || "";
  const previousSelectedElementCslpUniqueId = previousSelectedEditableDOM?.getAttribute("data-cslp-unique-id");
  const newPreviousSelectedElement = document.querySelector(
    `[data-cslp-unique-id="${previousSelectedElementCslpUniqueId}"]`
  ) || document.querySelector(`[data-cslp="${previousSelectedElementCslp}"]`);
  if (!newPreviousSelectedElement && resizeObserver) {
    (0, import_generateOverlay.hideFocusOverlay)({
      visualBuilderOverlayWrapper: overlayWrapper,
      focusedToolbar,
      visualBuilderContainer,
      resizeObserver,
      noTrigger: true
    });
    return;
  }
  if (newPreviousSelectedElement !== previousSelectedEditableDOM) {
    previousSelectedEditableDOM = newPreviousSelectedElement;
    import__.VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM = previousSelectedEditableDOM;
  }
  const cslp = editableElement?.getAttribute("data-cslp") || "";
  const fieldMetadata = (0, import_cslp.extractDetailsFromCslp)(cslp);
  (0, import_mouseHover.hideHoverOutline)(visualBuilderContainer);
  const fieldSchema = await import_fieldSchemaMap.FieldSchemaMap.getFieldSchema(
    fieldMetadata.content_type_uid,
    fieldMetadata.fieldPath
  );
  const entryAcl = await (0, import_getEntryPermissionsCached.getEntryPermissionsCached)({
    entryUid: fieldMetadata.entry_uid,
    contentTypeUid: fieldMetadata.content_type_uid,
    locale: fieldMetadata.locale
  });
  const { isDisabled } = (0, import_isFieldDisabled.isFieldDisabled)(
    fieldSchema,
    { editableElement, fieldMetadata },
    entryAcl
  );
  (0, import_generateOverlay.addFocusOverlay)(previousSelectedEditableDOM, overlayWrapper, isDisabled);
  const psuedoEditableElement = visualBuilderContainer.querySelector(
    ".visual-builder__pseudo-editable-element"
  );
  if (psuedoEditableElement) {
    const styles = (0, import_getPsuedoEditableStylesElement.getPsuedoEditableElementStyles)(editableElement);
    const styleString = Object.entries(styles).reduce(
      (acc, [key, value]) => {
        return `${acc}${key}:${value};`;
      },
      ""
    );
    psuedoEditableElement.style.cssText = styleString;
    psuedoEditableElement.style.visibility = "visible";
  }
  const targetElementDimension = editableElement.getBoundingClientRect();
  if (targetElementDimension.width && targetElementDimension.height) {
    const selectedElement = import__.VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM;
    if (!selectedElement) return;
    positionToolbar({
      focusedToolbar,
      selectedElementDimension: selectedElement.getBoundingClientRect()
    });
  }
  const buttons = (0, import_generateAddInstanceButtons.getAddInstanceButtons)(visualBuilderContainer);
  const parentCslpValue = fieldMetadata.multipleFieldMetadata?.parentDetails?.parentCslpValue;
  if (buttons && parentCslpValue && buttons.length > 1 && buttons[0] && buttons[1]) {
    const [previousButton, nextButton] = buttons;
    const direction = (0, import_getChildrenDirection.default)(
      editableElement,
      parentCslpValue
    );
    const targetDOMDimension = editableElement.getBoundingClientRect();
    if (direction === "horizontal") {
      const middleHeight = targetDOMDimension.top + (targetDOMDimension.bottom - targetDOMDimension.top) / 2 + window.scrollY;
      previousButton.style.left = `${targetDOMDimension.left}px`;
      previousButton.style.top = `${middleHeight}px`;
      nextButton.style.left = `${targetDOMDimension.right}px`;
      nextButton.style.top = `${middleHeight}px`;
    } else if (direction === "vertical") {
      const middleWidth = targetDOMDimension.left + (targetDOMDimension.right - targetDOMDimension.left) / 2;
      previousButton.style.left = `${middleWidth}px`;
      previousButton.style.top = `${targetDOMDimension.top + window.scrollY}px`;
      nextButton.style.left = `${middleWidth}px`;
      nextButton.style.top = `${targetDOMDimension.bottom + window.scrollY}px`;
    }
  }
}
function updateFocussedStateOnMutation(focusOverlayWrapper, focusedToolbar, visualBuilderContainer, resizeObserver) {
  if (!focusOverlayWrapper) return;
  let selectedElement = import__.VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM;
  if (!selectedElement) return;
  const selectedElementCslp = selectedElement?.getAttribute("data-cslp");
  const selectedElementCslpUniqueId = selectedElement?.getAttribute(
    "data-cslp-unique-id"
  );
  const newSelectedElement = document.querySelector(
    `[data-cslp-unique-id="${selectedElementCslpUniqueId}"]`
  ) || document.querySelector(`[data-cslp="${selectedElementCslp}"]`);
  if (!newSelectedElement && resizeObserver) {
    (0, import_generateOverlay.hideFocusOverlay)({
      visualBuilderOverlayWrapper: focusOverlayWrapper,
      focusedToolbar,
      visualBuilderContainer,
      resizeObserver,
      noTrigger: true
    });
    return;
  }
  if (newSelectedElement !== selectedElement) {
    selectedElement = newSelectedElement;
    import__.VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM = selectedElement;
  }
  const selectedElementDimension = selectedElement.getBoundingClientRect();
  const focusOutline = focusOverlayWrapper.querySelector(
    ".visual-builder__overlay--outline"
  );
  if (focusOutline) {
    const focusOutlineDimension = focusOutline.getBoundingClientRect();
    if (!isSameRect(selectedElementDimension, focusOutlineDimension)) {
      focusOutline.style.top = `${selectedElementDimension.top + window.scrollY}px`;
      focusOutline.style.left = `${selectedElementDimension.left}px`;
      focusOutline.style.width = `${selectedElementDimension.width}px`;
      focusOutline.style.height = `${selectedElementDimension.height}px`;
    }
  }
  const focusedOverlayTop = focusOverlayWrapper.querySelector(
    ".visual-builder__overlay--top"
  );
  const focusedOverlayBottom = focusOverlayWrapper.querySelector(
    ".visual-builder__overlay--bottom"
  );
  const focusedOverlayLeft = focusOverlayWrapper.querySelector(
    ".visual-builder__overlay--left"
  );
  const focusedOverlayRight = focusOverlayWrapper.querySelector(
    ".visual-builder__overlay--right"
  );
  const distanceFromTop = selectedElementDimension.top + window.scrollY;
  if (focusedOverlayTop) {
    const dimension = focusedOverlayTop.getBoundingClientRect();
    if (dimension.height !== distanceFromTop) {
      focusedOverlayTop.style.height = `calc(${distanceFromTop}px)`;
    }
  }
  if (focusedOverlayBottom) {
    const dimension = focusedOverlayBottom.getBoundingClientRect();
    if (dimension.top !== selectedElementDimension.bottom || dimension.height !== window.document.body.scrollHeight - selectedElementDimension.bottom - window.scrollY) {
      focusedOverlayBottom.style.top = `${selectedElementDimension.bottom + window.scrollY}px`;
      focusedOverlayBottom.style.height = `${window.document.body.scrollHeight - selectedElementDimension.bottom - window.scrollY}px`;
    }
  }
  if (focusedOverlayLeft) {
    const dimension = focusedOverlayLeft.getBoundingClientRect();
    if (dimension.top + window.scrollY !== distanceFromTop || dimension.height !== selectedElementDimension.height || dimension.width !== selectedElementDimension.left) {
      focusedOverlayLeft.style.top = `${distanceFromTop}px`;
      focusedOverlayLeft.style.height = `${selectedElementDimension.height}px`;
      focusedOverlayLeft.style.width = `${selectedElementDimension.left}px`;
    }
  }
  if (focusedOverlayRight) {
    const dimension = focusedOverlayRight.getBoundingClientRect();
    if (dimension.left !== selectedElementDimension.right || dimension.top + window.scrollY !== distanceFromTop || dimension.height !== selectedElementDimension.height || dimension.width !== document.documentElement.clientWidth - selectedElementDimension.right) {
      focusedOverlayRight.style.left = `${selectedElementDimension.right}px`;
      focusedOverlayRight.style.top = `${distanceFromTop}px`;
      focusedOverlayRight.style.height = `${selectedElementDimension.height}px`;
      focusedOverlayRight.style.width = `${document.documentElement.clientWidth - selectedElementDimension.right}px`;
    }
  }
  if (focusedToolbar) {
    const targetElementRightEdgeOffset = window.scrollX + window.innerWidth - selectedElementDimension.left;
    const distanceFromTop2 = selectedElementDimension.top + window.scrollY - import_constants.TOOLBAR_EDGE_BUFFER;
    const adjustedDistanceFromTop = selectedElementDimension.top + window.scrollY < import_constants.TOP_EDGE_BUFFER ? distanceFromTop2 + selectedElementDimension.height + import_constants.TOP_EDGE_BUFFER : distanceFromTop2;
    const distanceFromLeft = selectedElementDimension.left - import_constants.LIVE_PREVIEW_OUTLINE_WIDTH_IN_PX;
    const adjustedDistanceFromLeft = Math.max(
      distanceFromLeft,
      import_constants.TOOLBAR_EDGE_BUFFER
    );
    if (targetElementRightEdgeOffset < import_constants.RIGHT_EDGE_BUFFER && (focusedToolbar.style.justifyContent !== "flex-end" || focusedToolbar.style.left !== `${selectedElementDimension.right + import_constants.LIVE_PREVIEW_OUTLINE_WIDTH_IN_PX}px`)) {
      focusedToolbar.style.justifyContent = "flex-end";
      focusedToolbar.style.left = `${selectedElementDimension.right + import_constants.LIVE_PREVIEW_OUTLINE_WIDTH_IN_PX}px`;
    } else if (focusedToolbar.style.justifyContent !== "flex-start" || focusedToolbar.style.left !== `${adjustedDistanceFromLeft}px`) {
      focusedToolbar.style.justifyContent = "flex-start";
      focusedToolbar.style.left = `${adjustedDistanceFromLeft}px`;
    }
    if (focusedToolbar.style.top !== `${adjustedDistanceFromTop}px`) {
      focusedToolbar.style.top = `${adjustedDistanceFromTop}px`;
    }
  }
  if (visualBuilderContainer) {
    const psuedoEditableElement = visualBuilderContainer.querySelector(
      ".visual-builder__pseudo-editable-element"
    );
    const editableElement = selectedElement;
    const styles = (0, import_getPsuedoEditableStylesElement.getPsuedoEditableElementStyles)(editableElement);
    const styleString = Object.entries(styles).reduce(
      (acc, [key, value]) => {
        return `${acc}${key}:${value};`;
      },
      ""
    );
    if (psuedoEditableElement && (psuedoEditableElement.style.cssText !== styleString || psuedoEditableElement.style.visibility !== "visible")) {
      psuedoEditableElement.style.cssText = styleString;
      psuedoEditableElement.style.visibility = "visible";
    }
  }
}
function isSameRect(rect1, rect2) {
  return rect1.top === rect2.top && rect1.left === rect2.left && rect1.width === rect2.width && rect1.height === rect2.height;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  updateFocussedState,
  updateFocussedStateOnMutation
});
//# sourceMappingURL=updateFocussedState.cjs.map