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
  showCustomCursor: () => showCustomCursor
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
var import_getEntryPermissionsCached = require("../utils/getEntryPermissionsCached.cjs");
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
function addOutline(editableElement, isFieldDisabled2) {
  if (!editableElement) return;
  (0, import_generateHoverOutline.addHoverOutline)(editableElement, isFieldDisabled2);
}
function hideDefaultCursor() {
  if ((document == null ? void 0 : document.body) && !document.body.classList.contains(
    (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__default-cursor--disabled"]
  ))
    document.body.classList.add(
      (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__default-cursor--disabled"]
    );
}
function showDefaultCursor() {
  if ((document == null ? void 0 : document.body) && document.body.classList.contains(
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
  customCursor == null ? void 0 : customCursor.classList.remove("visible");
}
function showCustomCursor(customCursor) {
  hideDefaultCursor();
  if (config.collab.enable && (!config.collab.isFeedbackMode || config.collab.pauseFeedback))
    return;
  customCursor == null ? void 0 : customCursor.classList.add("visible");
}
function isOverlay(target) {
  return target.classList.contains("visual-builder__overlay");
}
function isContentEditable(target) {
  if (target.hasAttribute("contenteditable"))
    return target.getAttribute("contenteditable") === "true";
  return false;
}
async function handleMouseHover(params) {
  (0, import_lodash_es.throttle)(async (params2) => {
    const eventDetails = (0, import_getCsDataOfElement.getCsDataOfElement)(params2.event);
    const eventTarget = params2.event.target;
    if ((config == null ? void 0 : config.collab.enable) && (config == null ? void 0 : config.collab.pauseFeedback)) {
      hideCustomCursor(params2.customCursor);
      return;
    }
    if (!eventDetails) {
      if (eventTarget && (isOverlay(eventTarget) || isContentEditable(eventTarget) || (0, import_generateThread.isCollabThread)(eventTarget))) {
        handleCursorPosition(params2.event, params2.customCursor);
        hideCustomCursor(params2.customCursor);
        return;
      }
      if (!(config == null ? void 0 : config.collab.enable)) {
        resetCustomCursor(params2.customCursor);
      }
      (0, import_multipleElementAddButton.removeAddInstanceButtons)({
        eventTarget: params2.event.target,
        visualBuilderContainer: params2.visualBuilderContainer,
        overlayWrapper: params2.overlayWrapper
      });
      handleCursorPosition(params2.event, params2.customCursor);
      if ((config == null ? void 0 : config.collab.enable) && (config == null ? void 0 : config.collab.isFeedbackMode)) {
        showCustomCursor(params2.customCursor);
        collabCustomCursor(params2.customCursor);
      }
      return;
    }
    const { editableElement, fieldMetadata } = eventDetails;
    const { content_type_uid, fieldPath } = fieldMetadata;
    if (import__.VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM && import__.VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM.isSameNode(
      editableElement
    )) {
      hideCustomCursor(params2.customCursor);
      return;
    }
    if (params2.customCursor) {
      const elementUnderCursor = document.elementFromPoint(
        params2.event.clientX,
        params2.event.clientY
      );
      if (elementUnderCursor) {
        if (elementUnderCursor.nodeName === "A" || elementUnderCursor.nodeName === "BUTTON") {
          elementUnderCursor.classList.add(
            (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__no-cursor-style"]
          );
        }
      }
      if ((config == null ? void 0 : config.collab.enable) && (config == null ? void 0 : config.collab.isFeedbackMode)) {
        collabCustomCursor(params2.customCursor);
        handleCursorPosition(params2.event, params2.customCursor);
        showCustomCursor(params2.customCursor);
        return;
      } else if ((config == null ? void 0 : config.collab.enable) && !(config == null ? void 0 : config.collab.isFeedbackMode)) {
        hideCustomCursor(params2.customCursor);
        return;
      }
      if (import__.VisualBuilder.VisualBuilderGlobalState.value.previousHoveredTargetDOM !== editableElement) {
        resetCustomCursor(params2.customCursor);
        (0, import_multipleElementAddButton.removeAddInstanceButtons)({
          eventTarget: params2.event.target,
          visualBuilderContainer: params2.visualBuilderContainer,
          overlayWrapper: params2.overlayWrapper
        });
      }
      if (!import_fieldSchemaMap.FieldSchemaMap.hasFieldSchema(content_type_uid, fieldPath)) {
        (0, import_generateCustomCursor.generateCustomCursor)({
          fieldType: "loading",
          customCursor: params2.customCursor
        });
      }
      import_fieldSchemaMap.FieldSchemaMap.getFieldSchema(content_type_uid, fieldPath).then(
        (fieldSchema) => {
          if (!fieldSchema) return;
          let entryAcl;
          (0, import_getEntryPermissionsCached.getEntryPermissionsCached)({
            entryUid: fieldMetadata.entry_uid,
            contentTypeUid: fieldMetadata.content_type_uid,
            locale: fieldMetadata.locale
          }).then((data) => {
            entryAcl = data;
          }).catch((error) => {
            console.error(
              "[Visual Builder] Error retrieving entry permissions:",
              error
            );
          }).finally(() => {
            if (!params2.customCursor) return;
            const { isDisabled: fieldDisabled } = (0, import_isFieldDisabled.isFieldDisabled)(
              fieldSchema,
              eventDetails,
              entryAcl
            );
            const fieldType = (0, import_getFieldType.getFieldType)(fieldSchema);
            (0, import_generateCustomCursor.generateCustomCursor)({
              fieldType,
              customCursor: params2.customCursor,
              fieldDisabled
            });
          });
        }
      );
      handleCursorPosition(params2.event, params2.customCursor);
      showCustomCursor(params2.customCursor);
    }
    if (!editableElement.classList.contains(import__2.VB_EmptyBlockParentClass) && !editableElement.classList.contains("visual-builder__empty-block")) {
      addOutline(editableElement);
      import_fieldSchemaMap.FieldSchemaMap.getFieldSchema(content_type_uid, fieldPath).then(
        (fieldSchema) => {
          let entryAcl;
          if (!fieldSchema) return;
          (0, import_getEntryPermissionsCached.getEntryPermissionsCached)({
            entryUid: fieldMetadata.entry_uid,
            contentTypeUid: fieldMetadata.content_type_uid,
            locale: fieldMetadata.locale
          }).then((data) => {
            entryAcl = data;
          }).catch((error) => {
            console.error(
              "[Visual Builder] Error retrieving entry permissions:",
              error
            );
          }).finally(() => {
            const { isDisabled: fieldDisabled } = (0, import_isFieldDisabled.isFieldDisabled)(
              fieldSchema,
              eventDetails,
              entryAcl
            );
            addOutline(editableElement, fieldDisabled);
          });
        }
      );
    }
    if (import__.VisualBuilder.VisualBuilderGlobalState.value.previousHoveredTargetDOM === editableElement) {
      return;
    }
    import__.VisualBuilder.VisualBuilderGlobalState.value.previousHoveredTargetDOM = editableElement;
  }, 10)(params);
}
var mouseHover_default = handleMouseHover;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  hideCustomCursor,
  hideHoverOutline,
  showCustomCursor
});
//# sourceMappingURL=mouseHover.cjs.map