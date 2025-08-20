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
import { VisualBuilderPostMessageEvents } from "../utils/types/postMessage.types.js";
import visualBuilderPostMessage from "../utils/visualBuilderPostMessage.js";
import { fetchEntryPermissionsAndStageDetails } from "../utils/fetchEntryPermissionsAndStageDetails.js";
import { jsx } from "preact/jsx-runtime";
function appendFocusedToolbar(eventDetails, focusedToolbarElement, hideOverlay, isVariant = false, options) {
  appendFieldPathDropdown(eventDetails, focusedToolbarElement, options);
  if (options == null ? void 0 : options.isHover) {
    return;
  }
  appendFieldToolbar(
    eventDetails,
    focusedToolbarElement,
    hideOverlay,
    isVariant
  );
}
async function appendFieldToolbar(eventDetails, focusedToolbarElement, hideOverlay, isVariant = false, options) {
  const { isHover } = options || {};
  if (focusedToolbarElement.querySelector(
    ".visual-builder__focused-toolbar__multiple-field-toolbar"
  ) && !isHover)
    return;
  const { acl: entryPermissions, workflowStage: entryWorkflowStageDetails } = await fetchEntryPermissionsAndStageDetails({
    entryUid: eventDetails.fieldMetadata.entry_uid,
    contentTypeUid: eventDetails.fieldMetadata.content_type_uid,
    locale: eventDetails.fieldMetadata.locale,
    variantUid: eventDetails.fieldMetadata.variant
  });
  const wrapper = document.createDocumentFragment();
  render(
    /* @__PURE__ */ jsx(
      FieldToolbarComponent,
      {
        eventDetails,
        hideOverlay,
        isVariant,
        entryPermissions,
        entryWorkflowStageDetails
      }
    ),
    wrapper
  );
  focusedToolbarElement.append(wrapper);
}
function appendFieldPathDropdown(eventDetails, focusedToolbarElement, options) {
  const { isHover } = options || {};
  const fieldLabelWrapper = document.querySelector(
    ".visual-builder__focused-toolbar__field-label-wrapper"
  );
  const { editableElement: targetElement, fieldMetadata } = eventDetails;
  if (fieldLabelWrapper) {
    if (isHover) {
      const fieldCslp = fieldLabelWrapper.getAttribute("data-hovered-cslp");
      if (fieldCslp === fieldMetadata.cslpValue) {
        return;
      } else {
        removeFieldToolbar(focusedToolbarElement);
      }
    } else {
      return;
    }
  }
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
function removeFieldToolbar(toolbar) {
  toolbar.innerHTML = "";
  const toolbarEvents = [
    VisualBuilderPostMessageEvents.DELETE_INSTANCE,
    VisualBuilderPostMessageEvents.UPDATE_DISCUSSION_ID,
    VisualBuilderPostMessageEvents.FIELD_LOCATION_DATA
  ];
  toolbarEvents.forEach((event) => {
    var _a, _b, _c, _d;
    if ((_b = (_a = visualBuilderPostMessage) == null ? void 0 : _a.requestMessageHandlers) == null ? void 0 : _b.has(event)) {
      (_d = (_c = visualBuilderPostMessage) == null ? void 0 : _c.unregisterEvent) == null ? void 0 : _d.call(_c, event);
    }
  });
}
export {
  appendFieldPathDropdown,
  appendFieldToolbar,
  appendFocusedToolbar,
  removeFieldToolbar
};
//# sourceMappingURL=generateToolbar.js.map