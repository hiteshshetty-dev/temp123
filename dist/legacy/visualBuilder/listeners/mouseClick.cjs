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

// src/visualBuilder/listeners/mouseClick.ts
var mouseClick_exports = {};
__export(mouseClick_exports, {
  addFocusedToolbar: () => addFocusedToolbar,
  default: () => mouseClick_default
});
module.exports = __toCommonJS(mouseClick_exports);
var import_handleIndividualFields = require("../utils/handleIndividualFields.cjs");
var import_getCsDataOfElement = require("../utils/getCsDataOfElement.cjs");
var import_generateToolbar = require("../generators/generateToolbar.cjs");
var import_generateOverlay = require("../generators/generateOverlay.cjs");
var import_visualBuilderPostMessage = __toESM(require("../utils/visualBuilderPostMessage.cjs"), 1);
var import_postMessage = require("../utils/types/postMessage.types.cjs");
var import__ = require("../index.cjs");
var import_fieldSchemaMap = require("../utils/fieldSchemaMap.cjs");
var import_isFieldDisabled = require("../utils/isFieldDisabled.cjs");
var import_generateHighlightedComment = require("../generators/generateHighlightedComment.cjs");
function addOverlay(params) {
  if (!params.overlayWrapper || !params.editableElement) return;
  (0, import_generateOverlay.addFocusOverlay)(
    params.editableElement,
    params.overlayWrapper,
    params.isFieldDisabled
  );
  params.resizeObserver.observe(params.editableElement);
}
function addFocusedToolbar(params) {
  const { editableElement } = params.eventDetails;
  if (!editableElement || !params.focusedToolbar) return;
  (0, import_generateToolbar.appendFocusedToolbar)(params.eventDetails, params.focusedToolbar, params.hideOverlay);
}
async function handleBuilderInteraction(params) {
  var _a, _b;
  const eventTarget = params.event.target;
  const isAnchorElement = eventTarget instanceof HTMLAnchorElement;
  const elementHasCslp = eventTarget && (eventTarget.hasAttribute("data-cslp") || eventTarget.closest("[data-cslp]"));
  if (isAnchorElement || elementHasCslp && !eventTarget.closest(".visual-builder__empty-block")) {
    params.event.preventDefault();
    params.event.stopPropagation();
  }
  const eventDetails = (0, import_getCsDataOfElement.getCsDataOfElement)(params.event);
  (_a = import_visualBuilderPostMessage.default) == null ? void 0 : _a.send(import_postMessage.VisualBuilderPostMessageEvents.MOUSE_CLICK, {
    cslpData: eventDetails == null ? void 0 : eventDetails.cslpData,
    fieldMetadata: eventDetails == null ? void 0 : eventDetails.fieldMetadata
  }).catch((err) => {
    console.warn("Error while sending post message", err);
  });
  if (!eventDetails || !params.overlayWrapper || !params.visualBuilderContainer) {
    return;
  }
  const { editableElement, fieldMetadata } = eventDetails;
  if (import__.VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM && import__.VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM !== editableElement) {
    (0, import_handleIndividualFields.cleanIndividualFieldResidual)({
      overlayWrapper: params.overlayWrapper,
      visualBuilderContainer: params.visualBuilderContainer,
      focusedToolbar: params.focusedToolbar,
      resizeObserver: params.resizeObserver
    });
  }
  if (editableElement.classList.contains(
    "visual-builder__empty-block-parent"
  ) || editableElement.classList.contains("visual-builder__empty-block")) {
    return;
  }
  const previousSelectedElement = import__.VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM;
  if (previousSelectedElement && previousSelectedElement === editableElement) {
    return;
  }
  import__.VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM = editableElement;
  addOverlay({
    overlayWrapper: params.overlayWrapper,
    resizeObserver: params.resizeObserver,
    editableElement
  });
  addFocusedToolbar({
    eventDetails,
    focusedToolbar: params.focusedToolbar,
    hideOverlay: () => {
      (0, import_generateOverlay.hideOverlay)({
        visualBuilderContainer: params.visualBuilderContainer,
        visualBuilderOverlayWrapper: params.overlayWrapper,
        focusedToolbar: params.focusedToolbar,
        resizeObserver: params.resizeObserver
      });
    }
  });
  const { content_type_uid, fieldPath, cslpValue } = fieldMetadata;
  (0, import_generateHighlightedComment.toggleHighlightedCommentIconDisplay)(cslpValue, false);
  const fieldSchema = await import_fieldSchemaMap.FieldSchemaMap.getFieldSchema(
    content_type_uid,
    fieldPath
  );
  if (fieldSchema) {
    const { isDisabled } = (0, import_isFieldDisabled.isFieldDisabled)(fieldSchema, eventDetails);
    if (isDisabled) {
      addOverlay({
        overlayWrapper: params.overlayWrapper,
        resizeObserver: params.resizeObserver,
        editableElement,
        isFieldDisabled: true
      });
    }
  }
  (_b = import_visualBuilderPostMessage.default) == null ? void 0 : _b.send(import_postMessage.VisualBuilderPostMessageEvents.FOCUS_FIELD, {
    DOMEditStack: (0, import_getCsDataOfElement.getDOMEditStack)(editableElement)
  });
  await (0, import_handleIndividualFields.handleIndividualFields)(eventDetails, {
    visualBuilderContainer: params.visualBuilderContainer,
    resizeObserver: params.resizeObserver,
    lastEditedField: previousSelectedElement
  });
}
var mouseClick_default = handleBuilderInteraction;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addFocusedToolbar
});
//# sourceMappingURL=mouseClick.cjs.map