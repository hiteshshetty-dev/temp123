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
var import__2 = require("../../index.cjs");
var import_FieldRevertComponent = require("../components/FieldRevert/FieldRevertComponent.cjs");
var import_get_xpath = __toESM(require("get-xpath"), 1);
var import_configManager = __toESM(require("../../configManager/configManager.cjs"), 1);
var import_generateThread = require("../generators/generateThread.cjs");
var import_generateThread2 = require("../generators/generateThread.cjs");
var import_generateThread3 = require("../generators/generateThread.cjs");
var import_collabUtils = require("../utils/collabUtils.cjs");
var import_uuid = require("uuid");
var import_getEntryPermissionsCached = require("../utils/getEntryPermissionsCached.cjs");
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
  (0, import_generateToolbar.appendFocusedToolbar)(
    params.eventDetails,
    params.focusedToolbar,
    params.hideOverlay,
    params.isVariant
  );
}
async function handleBuilderInteraction(params) {
  const eventTarget = params.event.target;
  const isAnchorElement = eventTarget instanceof HTMLAnchorElement;
  const elementHasCslp = eventTarget && (eventTarget.hasAttribute("data-cslp") || eventTarget.closest("[data-cslp]"));
  const duplicates = document.querySelectorAll(
    `[data-cslp="${eventTarget?.getAttribute("data-cslp")}"]`
  );
  if (duplicates.length > 1) {
    duplicates.forEach((ele) => {
      if (!ele.hasAttribute("data-cslp-unique-id")) {
        const uniqueId = `cslp-${(0, import_uuid.v4)()}`;
        ele.setAttribute("data-cslp-unique-id", uniqueId);
      }
    });
  }
  if (eventTarget?.getAttribute("data-studio-ui") === "true") {
    return;
  }
  if (params.event.altKey) {
    if (isAnchorElement) {
      params.event.preventDefault();
      params.event.stopPropagation();
    }
    return;
  }
  if (isAnchorElement || elementHasCslp && !eventTarget.closest(".visual-builder__empty-block")) {
    params.event.preventDefault();
    params.event.stopPropagation();
  }
  const config = import_configManager.default.get();
  if (config?.collab.enable === true) {
    if (config?.collab.pauseFeedback) return;
    const xpath = (0, import_collabUtils.fixSvgXPath)((0, import_get_xpath.default)(eventTarget));
    if (!eventTarget) return;
    const rect = eventTarget.getBoundingClientRect();
    const relativeX = (params.event.clientX - rect.left) / rect.width;
    const relativeY = (params.event.clientY - rect.top) / rect.height;
    if (!(0, import_generateThread2.isCollabThread)(eventTarget)) {
      params.event.preventDefault();
      params.event.stopPropagation();
    }
    if ((0, import_generateThread2.isCollabThread)(eventTarget)) {
      import_configManager.default.set("collab.isFeedbackMode", false);
    } else if (config?.collab.isFeedbackMode) {
      (0, import_generateThread.generateThread)(
        { xpath, relativeX, relativeY },
        {
          isNewThread: true,
          updateConfig: true
        }
      );
    } else {
      (0, import_generateThread3.toggleCollabPopup)({ threadUid: "", action: "close" });
      import_configManager.default.set("collab.isFeedbackMode", true);
    }
    return;
  }
  const eventDetails = (0, import_getCsDataOfElement.getCsDataOfElement)(params.event);
  sendMouseClickPostMessage(eventDetails);
  if (!eventDetails || !params.overlayWrapper || !params.visualBuilderContainer) {
    return;
  }
  const { editableElement, fieldMetadata } = eventDetails;
  const variantStatus = await (0, import_FieldRevertComponent.getFieldVariantStatus)(fieldMetadata);
  const isVariant = variantStatus ? Object.values(variantStatus).some((value) => value === true) : false;
  cleanResidualsIfNeeded(params, editableElement);
  if (isEmptyBlockElement(editableElement)) {
    return;
  }
  const previousSelectedElement = import__.VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM;
  if (isSameSelectedElement(previousSelectedElement, editableElement, params)) {
    return;
  }
  import__.VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM = editableElement;
  addOverlayAndToolbar(params, eventDetails, editableElement, isVariant);
  const { cslpValue } = fieldMetadata;
  (0, import_generateHighlightedComment.toggleHighlightedCommentIconDisplay)(cslpValue, false);
  await handleFieldSchemaAndIndividualFields(
    params,
    eventDetails,
    fieldMetadata,
    editableElement,
    previousSelectedElement
  );
  observeEditableElementChanges(params, editableElement);
}
function sendMouseClickPostMessage(eventDetails) {
  import_visualBuilderPostMessage.default?.send(import_postMessage.VisualBuilderPostMessageEvents.MOUSE_CLICK, {
    cslpData: eventDetails?.cslpData,
    fieldMetadata: eventDetails?.fieldMetadata
  }).catch((err) => {
    console.warn("Error while sending post message", err);
  });
}
function cleanResidualsIfNeeded(params, editableElement) {
  const previousSelectedElement = import__.VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM;
  if (previousSelectedElement && previousSelectedElement !== editableElement || params.reEvaluate) {
    (0, import_handleIndividualFields.cleanIndividualFieldResidual)({
      overlayWrapper: params.overlayWrapper,
      visualBuilderContainer: params.visualBuilderContainer,
      focusedToolbar: params.focusedToolbar,
      resizeObserver: params.resizeObserver
    });
  }
}
function isEmptyBlockElement(editableElement) {
  return editableElement.classList.contains(import__2.VB_EmptyBlockParentClass) || editableElement.classList.contains("visual-builder__empty-block");
}
function isSameSelectedElement(previousSelectedElement, editableElement, params) {
  return !!(previousSelectedElement && previousSelectedElement === editableElement && !params.reEvaluate);
}
function addOverlayAndToolbar(params, eventDetails, editableElement, isVariant) {
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
    },
    isVariant
  });
}
async function handleFieldSchemaAndIndividualFields(params, eventDetails, fieldMetadata, editableElement, previousSelectedElement) {
  const { content_type_uid, entry_uid, fieldPath, locale } = fieldMetadata;
  const fieldSchema = await import_fieldSchemaMap.FieldSchemaMap.getFieldSchema(
    content_type_uid,
    fieldPath
  );
  let entryAcl;
  try {
    entryAcl = await (0, import_getEntryPermissionsCached.getEntryPermissionsCached)({
      entryUid: entry_uid,
      contentTypeUid: content_type_uid,
      locale
    });
  } catch (error) {
    console.error(
      "[Visual Builder] Error retrieving entry permissions:",
      error
    );
    return;
  }
  if (fieldSchema) {
    const { isDisabled } = (0, import_isFieldDisabled.isFieldDisabled)(
      fieldSchema,
      eventDetails,
      entryAcl
    );
    if (isDisabled) {
      addOverlay({
        overlayWrapper: params.overlayWrapper,
        resizeObserver: params.resizeObserver,
        editableElement,
        isFieldDisabled: true
      });
    }
  }
  import_visualBuilderPostMessage.default?.send(import_postMessage.VisualBuilderPostMessageEvents.FOCUS_FIELD, {
    DOMEditStack: (0, import_getCsDataOfElement.getDOMEditStack)(editableElement)
  });
  await (0, import_handleIndividualFields.handleIndividualFields)(eventDetails, {
    visualBuilderContainer: params.visualBuilderContainer,
    resizeObserver: params.resizeObserver,
    lastEditedField: previousSelectedElement
  });
}
function observeEditableElementChanges(params, editableElement) {
  const focusElementObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "attributes" && mutation.attributeName === "data-cslp") {
        focusElementObserver?.disconnect();
        import__.VisualBuilder.VisualBuilderGlobalState.value.focusElementObserver = null;
        handleBuilderInteraction({ ...params, reEvaluate: true });
      }
    });
  });
  import__.VisualBuilder.VisualBuilderGlobalState.value.focusElementObserver = focusElementObserver;
  focusElementObserver.observe(editableElement, { attributes: true });
}
var mouseClick_default = handleBuilderInteraction;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addFocusedToolbar
});
//# sourceMappingURL=mouseClick.cjs.map