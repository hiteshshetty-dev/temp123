import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/generators/generateToolbar.tsx
import {
  DATA_CSLP_ATTR_SELECTOR,
  LIVE_PREVIEW_OUTLINE_WIDTH_IN_PX,
  RIGHT_EDGE_BUFFER,
  TOOLBAR_EDGE_BUFFER,
  TOP_EDGE_BUFFER
} from "../utils/constants.js";
import FieldToolbarComponent from "../components/FieldToolbar.js";
import { render } from "preact";
import FieldLabelWrapperComponent from "../components/fieldLabelWrapper.js";
import { jsx } from "preact/jsx-runtime";
function appendFocusedToolbar(eventDetails, focusedToolbarElement, hideOverlay) {
  appendFieldPathDropdown(eventDetails, focusedToolbarElement);
  appendFieldToolbar(eventDetails, focusedToolbarElement, hideOverlay);
}
function appendFieldToolbar(eventDetails, focusedToolbarElement, hideOverlay) {
  if (focusedToolbarElement.querySelector(
    ".visual-builder__focused-toolbar__multiple-field-toolbar"
  ))
    return;
  const wrapper = document.createDocumentFragment();
  render(
    /* @__PURE__ */ jsx(
      FieldToolbarComponent,
      {
        eventDetails,
        hideOverlay
      }
    ),
    wrapper
  );
  focusedToolbarElement.append(wrapper);
}
function appendFieldPathDropdown(eventDetails, focusedToolbarElement) {
  if (document.querySelector(".visual-builder__focused-toolbar__field-label-wrapper"))
    return;
  const { editableElement: targetElement, fieldMetadata } = eventDetails;
  const targetElementDimension = targetElement.getBoundingClientRect();
  const distanceFromTop = targetElementDimension.top + window.scrollY - TOOLBAR_EDGE_BUFFER;
  const adjustedDistanceFromTop = targetElementDimension.top + window.scrollY < TOP_EDGE_BUFFER ? distanceFromTop + targetElementDimension.height + TOP_EDGE_BUFFER : distanceFromTop;
  const distanceFromLeft = targetElementDimension.left - LIVE_PREVIEW_OUTLINE_WIDTH_IN_PX;
  const adjustedDistanceFromLeft = Math.max(
    distanceFromLeft,
    TOOLBAR_EDGE_BUFFER
  );
  const targetElementRightEdgeOffset = window.scrollX + window.innerWidth - targetElementDimension.left;
  if (targetElementRightEdgeOffset < RIGHT_EDGE_BUFFER) {
    focusedToolbarElement.style.justifyContent = "flex-end";
    focusedToolbarElement.style.left = `${targetElementDimension.right + LIVE_PREVIEW_OUTLINE_WIDTH_IN_PX}px`;
  } else {
    focusedToolbarElement.style.justifyContent = "flex-start";
    focusedToolbarElement.style.left = `${adjustedDistanceFromLeft}px`;
  }
  focusedToolbarElement.style.top = `${adjustedDistanceFromTop}px`;
  const parentPaths = collectParentCSLPPaths(targetElement, 2);
  const wrapper = document.createDocumentFragment();
  render(
    /* @__PURE__ */ jsx(
      FieldLabelWrapperComponent,
      {
        fieldMetadata,
        eventDetails,
        parentPaths,
        getParentEditableElement: (cslp) => {
          const parentElement = targetElement.closest(
            `[${DATA_CSLP_ATTR_SELECTOR}="${cslp}"]`
          );
          return parentElement;
        }
      }
    ),
    wrapper
  );
  focusedToolbarElement.appendChild(wrapper);
}
function collectParentCSLPPaths(targetElement, count) {
  const cslpPaths = [];
  let currentElement = targetElement.parentElement;
  while (count > 0 || currentElement === window.document.body) {
    if (!currentElement) {
      return cslpPaths;
    }
    if (currentElement.hasAttribute(DATA_CSLP_ATTR_SELECTOR)) {
      cslpPaths.push(
        currentElement.getAttribute(DATA_CSLP_ATTR_SELECTOR)
      );
      count--;
    }
    currentElement = currentElement.parentElement;
  }
  return cslpPaths;
}
export {
  appendFieldPathDropdown,
  appendFieldToolbar,
  appendFocusedToolbar
};
//# sourceMappingURL=generateToolbar.js.map