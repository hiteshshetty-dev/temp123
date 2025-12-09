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

// src/visualBuilder/generators/generateToolbar.tsx
var generateToolbar_exports = {};
__export(generateToolbar_exports, {
  appendFieldPathDropdown: () => appendFieldPathDropdown,
  appendFieldToolbar: () => appendFieldToolbar,
  appendFocusedToolbar: () => appendFocusedToolbar,
  removeFieldToolbar: () => removeFieldToolbar
});
module.exports = __toCommonJS(generateToolbar_exports);
var import_constants = require("../utils/constants.cjs");
var import_FieldToolbar = __toESM(require("../components/FieldToolbar.cjs"), 1);
var import_preact = require("preact");
var import_fieldLabelWrapper = __toESM(require("../components/fieldLabelWrapper.cjs"), 1);
var import_postMessage = require("../utils/types/postMessage.types.cjs");
var import_visualBuilderPostMessage = __toESM(require("../utils/visualBuilderPostMessage.cjs"), 1);
var import_fetchEntryPermissionsAndStageDetails = require("../utils/fetchEntryPermissionsAndStageDetails.cjs");
var import_jsx_runtime = require("preact/jsx-runtime");
function appendFocusedToolbar(eventDetails, focusedToolbarElement, hideOverlay, isVariant = false, options) {
  appendFieldPathDropdown(eventDetails, focusedToolbarElement, options);
  if (options?.isHover) {
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
  const { acl: entryPermissions, workflowStage: entryWorkflowStageDetails, resolvedVariantPermissions } = await (0, import_fetchEntryPermissionsAndStageDetails.fetchEntryPermissionsAndStageDetails)({
    entryUid: eventDetails.fieldMetadata.entry_uid,
    contentTypeUid: eventDetails.fieldMetadata.content_type_uid,
    locale: eventDetails.fieldMetadata.locale,
    variantUid: eventDetails.fieldMetadata.variant,
    fieldPathWithIndex: eventDetails.fieldMetadata.fieldPathWithIndex
  });
  const wrapper = document.createDocumentFragment();
  (0, import_preact.render)(
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_FieldToolbar.default,
      {
        eventDetails,
        hideOverlay,
        isVariant,
        entryPermissions,
        entryWorkflowStageDetails,
        resolvedVariantPermissions
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
  const distanceFromTop = targetElementDimension.top + window.scrollY - import_constants.TOOLBAR_EDGE_BUFFER;
  const adjustedDistanceFromTop = targetElementDimension.top + window.scrollY < import_constants.TOP_EDGE_BUFFER ? distanceFromTop + targetElementDimension.height + import_constants.TOP_EDGE_BUFFER : distanceFromTop;
  const distanceFromLeft = targetElementDimension.left - import_constants.LIVE_PREVIEW_OUTLINE_WIDTH_IN_PX;
  const adjustedDistanceFromLeft = Math.max(
    distanceFromLeft,
    import_constants.TOOLBAR_EDGE_BUFFER
  );
  const targetElementRightEdgeOffset = window.scrollX + window.innerWidth - targetElementDimension.left;
  if (targetElementRightEdgeOffset < import_constants.RIGHT_EDGE_BUFFER) {
    focusedToolbarElement.style.justifyContent = "flex-end";
    focusedToolbarElement.style.left = `${targetElementDimension.right + import_constants.LIVE_PREVIEW_OUTLINE_WIDTH_IN_PX}px`;
  } else {
    focusedToolbarElement.style.justifyContent = "flex-start";
    focusedToolbarElement.style.left = `${adjustedDistanceFromLeft}px`;
  }
  focusedToolbarElement.style.top = `${adjustedDistanceFromTop}px`;
  const parentPaths = collectParentCSLPPaths(targetElement, 2);
  const wrapper = document.createDocumentFragment();
  (0, import_preact.render)(
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_fieldLabelWrapper.default,
      {
        fieldMetadata,
        eventDetails,
        parentPaths,
        getParentEditableElement: (cslp) => {
          const parentElement = targetElement.closest(
            `[${import_constants.DATA_CSLP_ATTR_SELECTOR}="${cslp}"]`
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
    if (currentElement.hasAttribute(import_constants.DATA_CSLP_ATTR_SELECTOR)) {
      cslpPaths.push(
        currentElement.getAttribute(import_constants.DATA_CSLP_ATTR_SELECTOR)
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
    import_postMessage.VisualBuilderPostMessageEvents.DELETE_INSTANCE,
    import_postMessage.VisualBuilderPostMessageEvents.UPDATE_DISCUSSION_ID,
    import_postMessage.VisualBuilderPostMessageEvents.FIELD_LOCATION_DATA
  ];
  toolbarEvents.forEach((event) => {
    if (import_visualBuilderPostMessage.default?.requestMessageHandlers?.has(event)) {
      import_visualBuilderPostMessage.default?.unregisterEvent?.(event);
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  appendFieldPathDropdown,
  appendFieldToolbar,
  appendFocusedToolbar,
  removeFieldToolbar
});
//# sourceMappingURL=generateToolbar.cjs.map