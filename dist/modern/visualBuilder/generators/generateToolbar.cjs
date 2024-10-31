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
  appendFocusedToolbar: () => appendFocusedToolbar
});
module.exports = __toCommonJS(generateToolbar_exports);
var import_constants = require("../utils/constants.cjs");
var import_FieldToolbar = __toESM(require("../components/FieldToolbar.cjs"), 1);
var import_preact = require("preact");
var import_fieldLabelWrapper = __toESM(require("../components/fieldLabelWrapper.cjs"), 1);
var import_jsx_runtime = require("preact/jsx-runtime");
function appendFocusedToolbar(eventDetails, focusedToolbarElement) {
  appendFieldPathDropdown(eventDetails, focusedToolbarElement);
  appendFieldToolbar(eventDetails, focusedToolbarElement);
}
function appendFieldToolbar(eventDetails, focusedToolbarElement) {
  if (focusedToolbarElement.querySelector(
    ".visual-builder__focused-toolbar__multiple-field-toolbar"
  ))
    return;
  const wrapper = document.createDocumentFragment();
  (0, import_preact.render)(
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_FieldToolbar.default,
      {
        eventDetails
      }
    ),
    wrapper
  );
  focusedToolbarElement.append(wrapper);
}
function appendFieldPathDropdown(eventDetails, focusedToolbarElement) {
  if (document.querySelector("visual-builder__focused-toolbar__field-label-wrapper"))
    return;
  const { editableElement: targetElement, fieldMetadata } = eventDetails;
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  appendFieldPathDropdown,
  appendFieldToolbar,
  appendFocusedToolbar
});
//# sourceMappingURL=generateToolbar.cjs.map