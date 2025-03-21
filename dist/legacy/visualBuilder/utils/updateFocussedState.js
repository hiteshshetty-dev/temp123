import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/updateFocussedState.ts
import { VisualBuilder } from "../index.js";
import { extractDetailsFromCslp } from "../../cslp/index.js";
import { getAddInstanceButtons } from "../generators/generateAddInstanceButtons.js";
import {
  addFocusOverlay,
  hideFocusOverlay
} from "../generators/generateOverlay.js";
import { hideHoverOutline } from "../listeners/mouseHover.js";
import {
  LIVE_PREVIEW_OUTLINE_WIDTH_IN_PX,
  RIGHT_EDGE_BUFFER,
  TOOLBAR_EDGE_BUFFER,
  TOP_EDGE_BUFFER
} from "./constants.js";
import getChildrenDirection from "./getChildrenDirection.js";
import { getPsuedoEditableElementStyles } from "./getPsuedoEditableStylesElement.js";
function positionToolbar({
  focusedToolbar,
  selectedElementDimension
}) {
  if (focusedToolbar) {
    const targetElementRightEdgeOffset = window.scrollX + window.innerWidth - selectedElementDimension.left;
    const distanceFromTop = selectedElementDimension.top + window.scrollY - TOOLBAR_EDGE_BUFFER;
    const adjustedDistanceFromTop = selectedElementDimension.top + window.scrollY < TOP_EDGE_BUFFER ? distanceFromTop + selectedElementDimension.height + TOP_EDGE_BUFFER : distanceFromTop;
    const distanceFromLeft = selectedElementDimension.left - LIVE_PREVIEW_OUTLINE_WIDTH_IN_PX;
    const adjustedDistanceFromLeft = Math.max(
      distanceFromLeft,
      TOOLBAR_EDGE_BUFFER
    );
    if (targetElementRightEdgeOffset < RIGHT_EDGE_BUFFER && (focusedToolbar.style.justifyContent !== "flex-end" || focusedToolbar.style.left !== `${selectedElementDimension.right + LIVE_PREVIEW_OUTLINE_WIDTH_IN_PX}px`)) {
      focusedToolbar.style.justifyContent = "flex-end";
      focusedToolbar.style.left = `${selectedElementDimension.right + LIVE_PREVIEW_OUTLINE_WIDTH_IN_PX}px`;
    } else if (focusedToolbar.style.justifyContent !== "flex-start" || focusedToolbar.style.left !== `${adjustedDistanceFromLeft}px`) {
      focusedToolbar.style.justifyContent = "flex-start";
      focusedToolbar.style.left = `${adjustedDistanceFromLeft}px`;
    }
    if (focusedToolbar.style.top !== `${adjustedDistanceFromTop}px`) {
      focusedToolbar.style.top = `${adjustedDistanceFromTop}px`;
    }
  }
}
function updateFocussedState({
  editableElement,
  visualBuilderContainer,
  overlayWrapper,
  focusedToolbar,
  resizeObserver
}) {
  var _a, _b;
  let previousSelectedEditableDOM = VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM;
  if (!visualBuilderContainer || !editableElement || !previousSelectedEditableDOM || !overlayWrapper) {
    return;
  }
  const previousSelectedElementCslp = previousSelectedEditableDOM == null ? void 0 : previousSelectedEditableDOM.getAttribute("data-cslp");
  const newPreviousSelectedElement = document.querySelector(
    `[data-cslp="${previousSelectedElementCslp}"]`
  );
  if (!newPreviousSelectedElement && resizeObserver) {
    hideFocusOverlay({
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
    VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM = previousSelectedEditableDOM;
  }
  hideHoverOutline(visualBuilderContainer);
  addFocusOverlay(previousSelectedEditableDOM, overlayWrapper);
  const psuedoEditableElement = visualBuilderContainer.querySelector(
    ".visual-builder__pseudo-editable-element"
  );
  if (psuedoEditableElement) {
    const styles = getPsuedoEditableElementStyles(editableElement);
    const styleString = Object.entries(styles).reduce(
      (acc, [key, value]) => {
        return `${acc}${key}:${value};`;
      },
      ""
    );
    psuedoEditableElement.style.cssText = styleString;
    psuedoEditableElement.style.visibility = "visible";
  }
  const cslp = (editableElement == null ? void 0 : editableElement.getAttribute("data-cslp")) || "";
  const fieldMetadata = extractDetailsFromCslp(cslp);
  const targetElementDimension = editableElement.getBoundingClientRect();
  if (targetElementDimension.width && targetElementDimension.height) {
    const selectedElement = VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM;
    if (!selectedElement) return;
    positionToolbar({
      focusedToolbar,
      selectedElementDimension: selectedElement.getBoundingClientRect()
    });
  }
  const buttons = getAddInstanceButtons(visualBuilderContainer);
  const parentCslpValue = (_b = (_a = fieldMetadata.multipleFieldMetadata) == null ? void 0 : _a.parentDetails) == null ? void 0 : _b.parentCslpValue;
  if (buttons && parentCslpValue && buttons.length > 1 && buttons[0] && buttons[1]) {
    const [previousButton, nextButton] = buttons;
    const direction = getChildrenDirection(
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
  let selectedElement = VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM;
  if (!selectedElement) return;
  const selectedElementCslp = selectedElement == null ? void 0 : selectedElement.getAttribute("data-cslp");
  const newSelectedElement = document.querySelector(
    `[data-cslp="${selectedElementCslp}"]`
  );
  if (!newSelectedElement && resizeObserver) {
    hideFocusOverlay({
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
    VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM = selectedElement;
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
    const distanceFromTop2 = selectedElementDimension.top + window.scrollY - TOOLBAR_EDGE_BUFFER;
    const adjustedDistanceFromTop = selectedElementDimension.top + window.scrollY < TOP_EDGE_BUFFER ? distanceFromTop2 + selectedElementDimension.height + TOP_EDGE_BUFFER : distanceFromTop2;
    const distanceFromLeft = selectedElementDimension.left - LIVE_PREVIEW_OUTLINE_WIDTH_IN_PX;
    const adjustedDistanceFromLeft = Math.max(
      distanceFromLeft,
      TOOLBAR_EDGE_BUFFER
    );
    if (targetElementRightEdgeOffset < RIGHT_EDGE_BUFFER && (focusedToolbar.style.justifyContent !== "flex-end" || focusedToolbar.style.left !== `${selectedElementDimension.right + LIVE_PREVIEW_OUTLINE_WIDTH_IN_PX}px`)) {
      focusedToolbar.style.justifyContent = "flex-end";
      focusedToolbar.style.left = `${selectedElementDimension.right + LIVE_PREVIEW_OUTLINE_WIDTH_IN_PX}px`;
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
    const styles = getPsuedoEditableElementStyles(editableElement);
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
export {
  updateFocussedState,
  updateFocussedStateOnMutation
};
//# sourceMappingURL=updateFocussedState.js.map