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

// src/visualBuilder/listeners/mouseHover.ts
var mouseHover_exports = {};
__export(mouseHover_exports, {
  default: () => mouseHover_default,
  hideCustomCursor: () => hideCustomCursor,
  hideHoverOutline: () => hideHoverOutline,
  showCustomCursor: () => showCustomCursor,
  showHoverToolbar: () => showHoverToolbar
});
module.exports = __toCommonJS(mouseHover_exports);
var import_lodash_es = require("lodash-es");
var import_getCsDataOfElement = require("../utils/getCsDataOfElement.cjs");
var import_multipleElementAddButton = require("../utils/multipleElementAddButton.cjs");
var import_generateCustomCursor = require("../generators/generateCustomCursor.cjs");
var import_fieldSchemaMap = require("../utils/fieldSchemaMap.cjs");
var import_isFieldDisabled = require("../utils/isFieldDisabled.cjs");
var import_getFieldType = require("../utils/getFieldType.cjs");
var import__ = require("../index.cjs");
var import_generateHoverOutline = require("../generators/generateHoverOutline.cjs");
var import_visualBuilder = require("../visualBuilder.style.cjs");
var import__2 = require("../../index.cjs");
var import_configManager = __toESM(require("../../configManager/configManager.cjs"), 1);
var import_generateThread = require("../generators/generateThread.cjs");
var import_generateToolbar = require("../generators/generateToolbar.cjs");
var import_fetchEntryPermissionsAndStageDetails = require("../utils/fetchEntryPermissionsAndStageDetails.cjs");
var config = import_configManager.default.get();
function resetCustomCursor(customCursor) {
  if (customCursor) {
    (0, import_generateCustomCursor.generateCustomCursor)({
      fieldType: "empty",
      customCursor
    });
  }
}
function collabCustomCursor(customCursor) {
  if (!customCursor) return;
  (0, import_generateCustomCursor.generateCustomCursor)({
    fieldType: "discussion",
    customCursor
  });
}
function handleCursorPosition(event, customCursor) {
  if (customCursor) {
    const mouseY = event.clientY;
    const mouseX = event.clientX;
    customCursor.style.left = `${mouseX}px`;
    customCursor.style.top = `${mouseY}px`;
  }
}
async function addOutline(params) {
  if (!params) {
    return;
  }
  const {
    editableElement,
    eventDetails,
    content_type_uid,
    fieldPath,
    fieldMetadata,
    fieldDisabled
  } = params;
  if (!editableElement) return;
  const isVariant = !!fieldMetadata.variant;
  (0, import_generateHoverOutline.addHoverOutline)(editableElement, fieldDisabled, isVariant);
  const fieldSchema = await import_fieldSchemaMap.FieldSchemaMap.getFieldSchema(
    content_type_uid,
    fieldPath
  );
  if (!fieldSchema) return;
  const { acl: entryAcl, workflowStage: entryWorkflowStageDetails } = await (0, import_fetchEntryPermissionsAndStageDetails.fetchEntryPermissionsAndStageDetails)({
    entryUid: fieldMetadata.entry_uid,
    contentTypeUid: fieldMetadata.content_type_uid,
    locale: fieldMetadata.locale,
    variantUid: fieldMetadata.variant
  });
  const { isDisabled } = (0, import_isFieldDisabled.isFieldDisabled)(
    fieldSchema,
    eventDetails,
    entryAcl,
    entryWorkflowStageDetails
  );
  (0, import_generateHoverOutline.addHoverOutline)(editableElement, fieldDisabled || isDisabled, isVariant);
}
var debouncedAddOutline = (0, import_lodash_es.debounce)(addOutline, 50, { trailing: true });
var showOutline = (params) => debouncedAddOutline(params);
function hideDefaultCursor() {
  if (document?.body && !document.body.classList.contains(
    (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__default-cursor--disabled"]
  ))
    document.body.classList.add(
      (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__default-cursor--disabled"]
    );
}
function showDefaultCursor() {
  if (document?.body && document.body.classList.contains(
    (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__default-cursor--disabled"]
  ))
    document.body.classList.remove(
      (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__default-cursor--disabled"]
    );
}
function hideHoverOutline(visualBuilderContainer) {
  if (!visualBuilderContainer) {
    return;
  }
  const hoverOutline = visualBuilderContainer.querySelector(
    ".visual-builder__hover-outline"
  );
  if (!hoverOutline) {
    return;
  }
  hoverOutline.classList.add(
    (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__hover-outline--hidden"]
  );
}
function hideCustomCursor(customCursor) {
  showDefaultCursor();
  customCursor?.classList.remove("visible");
}
function showCustomCursor(customCursor) {
  hideDefaultCursor();
  if (config.collab.enable && (!config.collab.isFeedbackMode || config.collab.pauseFeedback))
    return;
  customCursor?.classList.add("visible");
}
var debouncedRenderHoverToolbar = (0, import_lodash_es.debounce)(async (params) => {
  const eventDetails = (0, import_getCsDataOfElement.getCsDataOfElement)(params.event);
  if (!eventDetails || !params.overlayWrapper || !params.visualBuilderContainer || !params.focusedToolbar) {
    return;
  }
  (0, import_generateToolbar.appendFieldPathDropdown)(eventDetails, params.focusedToolbar, {
    isHover: true
  });
}, 50, { trailing: true });
var showHoverToolbar = async (params) => await debouncedRenderHoverToolbar(params);
function isOverlay(target) {
  return target.classList.contains("visual-builder__overlay");
}
function isContentEditable(target) {
  if (target.hasAttribute("contenteditable"))
    return target.getAttribute("contenteditable") === "true";
  return false;
}
function isFieldPathDropdown(target) {
  return target.classList.contains("visual-builder__focused-toolbar__field-label-wrapper") || target.classList.contains("visual-builder__focused-toolbar__field-label-wrapper__current-field");
}
function isFieldPathParent(target) {
  return target.classList.contains("visual-builder__focused-toolbar__field-label-wrapper__parent-field");
}
var throttledMouseHover = (0, import_lodash_es.throttle)(async (params) => {
  const eventDetails = (0, import_getCsDataOfElement.getCsDataOfElement)(params.event);
  const eventTarget = params.event.target;
  if (config?.collab.enable && config?.collab.pauseFeedback) {
    hideCustomCursor(params.customCursor);
    return;
  }
  if (!eventDetails) {
    if (eventTarget && (isOverlay(eventTarget) || isContentEditable(eventTarget) || (0, import_generateThread.isCollabThread)(eventTarget))) {
      handleCursorPosition(params.event, params.customCursor);
      hideCustomCursor(params.customCursor);
      return;
    }
    if (eventTarget && (isFieldPathDropdown(eventTarget) || isFieldPathParent(eventTarget))) {
      params.customCursor && hideCustomCursor(params.customCursor);
      showOutline();
      showHoverToolbar({
        event: params.event,
        overlayWrapper: params.overlayWrapper,
        visualBuilderContainer: params.visualBuilderContainer,
        previousSelectedEditableDOM: import__.VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM,
        focusedToolbar: params.focusedToolbar,
        resizeObserver: params.resizeObserver
      });
    }
    if (!config?.collab.enable) {
      resetCustomCursor(params.customCursor);
    }
    (0, import_multipleElementAddButton.removeAddInstanceButtons)({
      eventTarget: params.event.target,
      visualBuilderContainer: params.visualBuilderContainer,
      overlayWrapper: params.overlayWrapper
    });
    handleCursorPosition(params.event, params.customCursor);
    if (config?.collab.enable && config?.collab.isFeedbackMode) {
      showCustomCursor(params.customCursor);
      collabCustomCursor(params.customCursor);
    }
    return;
  }
  const { editableElement, fieldMetadata } = eventDetails;
  const { content_type_uid, fieldPath } = fieldMetadata;
  if (import__.VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM && import__.VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM.isSameNode(
    editableElement
  )) {
    hideCustomCursor(params.customCursor);
    return;
  }
  if (params.customCursor) {
    const elementUnderCursor = document.elementFromPoint(
      params.event.clientX,
      params.event.clientY
    );
    if (elementUnderCursor) {
      if (elementUnderCursor.nodeName === "A" || elementUnderCursor.nodeName === "BUTTON") {
        elementUnderCursor.classList.add(
          (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__no-cursor-style"]
        );
      }
    }
    if (config?.collab.enable && config?.collab.isFeedbackMode) {
      collabCustomCursor(params.customCursor);
      handleCursorPosition(params.event, params.customCursor);
      showCustomCursor(params.customCursor);
      return;
    } else if (config?.collab.enable && !config?.collab.isFeedbackMode) {
      hideCustomCursor(params.customCursor);
      return;
    }
    if (import__.VisualBuilder.VisualBuilderGlobalState.value.previousHoveredTargetDOM !== editableElement) {
      resetCustomCursor(params.customCursor);
      (0, import_multipleElementAddButton.removeAddInstanceButtons)({
        eventTarget: params.event.target,
        visualBuilderContainer: params.visualBuilderContainer,
        overlayWrapper: params.overlayWrapper
      });
    }
    if (!import_fieldSchemaMap.FieldSchemaMap.hasFieldSchema(content_type_uid, fieldPath)) {
      (0, import_generateCustomCursor.generateCustomCursor)({
        fieldType: "loading",
        customCursor: params.customCursor
      });
    }
    generateCursor({
      eventDetails,
      customCursor: params.customCursor
    });
    handleCursorPosition(params.event, params.customCursor);
    showCustomCursor(params.customCursor);
  }
  if (!editableElement.classList.contains(import__2.VB_EmptyBlockParentClass) && !editableElement.classList.contains("visual-builder__empty-block")) {
    showOutline({
      editableElement,
      eventDetails,
      content_type_uid,
      fieldPath,
      fieldMetadata
    });
    const isFocussed = import__.VisualBuilder.VisualBuilderGlobalState.value.isFocussed;
    if (!isFocussed) {
      showHoverToolbar(
        {
          event: params.event,
          overlayWrapper: params.overlayWrapper,
          visualBuilderContainer: params.visualBuilderContainer,
          previousSelectedEditableDOM: import__.VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM,
          focusedToolbar: params.focusedToolbar,
          resizeObserver: params.resizeObserver
        }
      );
    }
  }
  if (import__.VisualBuilder.VisualBuilderGlobalState.value.previousHoveredTargetDOM === editableElement) {
    return;
  }
  import__.VisualBuilder.VisualBuilderGlobalState.value.previousHoveredTargetDOM = editableElement;
}, 10);
async function generateCursor({
  eventDetails,
  customCursor
}) {
  if (!customCursor) return;
  const { fieldMetadata } = eventDetails;
  const fieldSchema = await import_fieldSchemaMap.FieldSchemaMap.getFieldSchema(
    fieldMetadata.content_type_uid,
    fieldMetadata.fieldPath
  );
  if (!fieldSchema) {
    return;
  }
  const { acl: entryAcl, workflowStage: entryWorkflowStageDetails } = await (0, import_fetchEntryPermissionsAndStageDetails.fetchEntryPermissionsAndStageDetails)({
    entryUid: fieldMetadata.entry_uid,
    contentTypeUid: fieldMetadata.content_type_uid,
    locale: fieldMetadata.locale,
    variantUid: fieldMetadata.variant
  });
  const { isDisabled: fieldDisabled } = (0, import_isFieldDisabled.isFieldDisabled)(
    fieldSchema,
    eventDetails,
    entryAcl,
    entryWorkflowStageDetails
  );
  const fieldType = (0, import_getFieldType.getFieldType)(fieldSchema);
  (0, import_generateCustomCursor.generateCustomCursor)({
    fieldType,
    customCursor,
    fieldDisabled
  });
}
var handleMouseHover = async (params) => await throttledMouseHover(params);
var mouseHover_default = handleMouseHover;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  hideCustomCursor,
  hideHoverOutline,
  showCustomCursor,
  showHoverToolbar
});
//# sourceMappingURL=mouseHover.cjs.map