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

// src/visualBuilder/generators/generateOverlay.tsx
var generateOverlay_exports = {};
__export(generateOverlay_exports, {
  addFocusOverlay: () => addFocusOverlay,
  hideFocusOverlay: () => hideFocusOverlay,
  hideOverlay: () => hideOverlay,
  sendFieldEvent: () => sendFieldEvent
});
module.exports = __toCommonJS(generateOverlay_exports);
var import_cslpdata = require("../../cslp/cslpdata.cjs");
var import_handleIndividualFields = require("../utils/handleIndividualFields.cjs");
var import_visualBuilderPostMessage = __toESM(require("../utils/visualBuilderPostMessage.cjs"), 1);
var import_postMessage = require("../utils/types/postMessage.types.cjs");
var import__ = require("../index.cjs");
var import_fieldSchemaMap = require("../utils/fieldSchemaMap.cjs");
var import_types = require("../utils/types/index.types.cjs");
var import_getFieldType = require("../utils/getFieldType.cjs");
var import_getMultilinePlaintext = require("../utils/getMultilinePlaintext.cjs");
var import_generateHighlightedComment = require("./generateHighlightedComment.cjs");
function addFocusOverlay(targetElement, focusOverlayWrapper, disabled) {
  const targetElementDimension = targetElement.getBoundingClientRect();
  if (targetElementDimension.width === 0 || targetElementDimension.height === 0)
    return;
  focusOverlayWrapper.classList.add("visible");
  const distanceFromTop = targetElementDimension.top + window.scrollY;
  const topOverlayDOM = focusOverlayWrapper.querySelector(
    ".visual-builder__overlay--top"
  );
  if (topOverlayDOM) {
    topOverlayDOM.style.top = "0";
    topOverlayDOM.style.left = "0";
    topOverlayDOM.style.width = "100%";
    topOverlayDOM.style.height = `calc(${distanceFromTop}px)`;
  }
  const bottomOverlayDOM = focusOverlayWrapper.querySelector(
    ".visual-builder__overlay--bottom"
  );
  if (bottomOverlayDOM) {
    bottomOverlayDOM.style.top = `${targetElementDimension.bottom + window.scrollY}px`;
    bottomOverlayDOM.style.height = `${window.document.body.scrollHeight - targetElementDimension.bottom - window.scrollY}px`;
    bottomOverlayDOM.style.left = "0";
    bottomOverlayDOM.style.width = "100%";
  }
  const leftOverlayDOM = focusOverlayWrapper.querySelector(
    ".visual-builder__overlay--left"
  );
  if (leftOverlayDOM) {
    leftOverlayDOM.style.left = "0";
    leftOverlayDOM.style.top = `${distanceFromTop}px`;
    leftOverlayDOM.style.height = `${targetElementDimension.height}px`;
    leftOverlayDOM.style.width = `${targetElementDimension.left}px`;
  }
  const rightOverlayDOM = focusOverlayWrapper.querySelector(
    ".visual-builder__overlay--right"
  );
  if (rightOverlayDOM) {
    rightOverlayDOM.style.left = `${targetElementDimension.right}px`;
    rightOverlayDOM.style.top = `${distanceFromTop}px`;
    rightOverlayDOM.style.height = `${targetElementDimension.height}px`;
    rightOverlayDOM.style.width = `${document.documentElement.clientWidth - targetElementDimension.right}px`;
  }
  const outlineDOM = focusOverlayWrapper.querySelector(
    ".visual-builder__overlay--outline"
  );
  if (outlineDOM) {
    outlineDOM.style.top = `${targetElementDimension.top + window.scrollY}px`;
    outlineDOM.style.height = `${targetElementDimension.height}px`;
    outlineDOM.style.width = `${targetElementDimension.width}px`;
    outlineDOM.style.left = `${targetElementDimension.left}px`;
    outlineDOM.style.outlineColor = disabled ? "#909090" : "#715cdd";
  }
}
function hideFocusOverlay(elements) {
  const {
    visualBuilderContainer,
    visualBuilderOverlayWrapper,
    focusedToolbar,
    resizeObserver,
    noTrigger
  } = elements;
  if (visualBuilderOverlayWrapper) {
    visualBuilderOverlayWrapper.classList.remove("visible");
    visualBuilderOverlayWrapper.childNodes.forEach((childNode) => {
      if (childNode instanceof Element) {
        childNode.removeAttribute("style");
      }
    });
    if (!noTrigger && // send update when focussed field has received input
    import__.VisualBuilder.VisualBuilderGlobalState.value.focusFieldReceivedInput) {
      sendFieldEvent({
        visualBuilderContainer,
        eventType: import_postMessage.VisualBuilderPostMessageEvents.UPDATE_FIELD
      });
    } else if (noTrigger) {
      const { previousSelectedEditableDOM, focusFieldValue } = import__.VisualBuilder.VisualBuilderGlobalState.value || {};
      if (previousSelectedEditableDOM && "innerText" in previousSelectedEditableDOM && focusFieldValue != null) {
        previousSelectedEditableDOM.innerText = focusFieldValue;
      }
    }
    import__.VisualBuilder.VisualBuilderGlobalState.value.focusFieldValue = null;
    import__.VisualBuilder.VisualBuilderGlobalState.value.focusFieldReceivedInput = false;
    (0, import_handleIndividualFields.cleanIndividualFieldResidual)({
      overlayWrapper: visualBuilderOverlayWrapper,
      visualBuilderContainer,
      focusedToolbar,
      resizeObserver
    });
  }
}
function sendFieldEvent(options) {
  const { visualBuilderContainer, eventType } = options;
  const previousSelectedEditableDOM = import__.VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM;
  const pseudoEditableElement = visualBuilderContainer?.querySelector(
    "div.visual-builder__pseudo-editable-element"
  );
  if (previousSelectedEditableDOM && (previousSelectedEditableDOM.hasAttribute("contenteditable") || pseudoEditableElement)) {
    const actualEditedElement = pseudoEditableElement || previousSelectedEditableDOM;
    let data = "innerText" in actualEditedElement ? actualEditedElement.innerText : actualEditedElement.textContent;
    const fieldMetadata = (0, import_cslpdata.extractDetailsFromCslp)(
      previousSelectedEditableDOM.getAttribute("data-cslp")
    );
    import_fieldSchemaMap.FieldSchemaMap.getFieldSchema(
      fieldMetadata.content_type_uid,
      fieldMetadata.fieldPath
    ).then((fieldSchema) => {
      if (fieldSchema && eventType === import_postMessage.VisualBuilderPostMessageEvents.UPDATE_FIELD) {
        const fieldType = (0, import_getFieldType.getFieldType)(fieldSchema);
        if (fieldType && fieldType === import_types.FieldDataType.MULTILINE) {
          data = (0, import_getMultilinePlaintext.getMultilinePlaintext)(actualEditedElement);
          actualEditedElement.innerText = data;
        }
      }
    }).finally(() => {
      import_visualBuilderPostMessage.default?.send(eventType, {
        data,
        fieldMetadata
      });
    });
  }
}
function hideOverlay(params) {
  const focusElementObserver = import__.VisualBuilder.VisualBuilderGlobalState.value.focusElementObserver;
  if (focusElementObserver) {
    focusElementObserver.disconnect();
    import__.VisualBuilder.VisualBuilderGlobalState.value.focusElementObserver = null;
  }
  hideFocusOverlay({
    visualBuilderContainer: params.visualBuilderContainer,
    visualBuilderOverlayWrapper: params.visualBuilderOverlayWrapper,
    focusedToolbar: params.focusedToolbar,
    resizeObserver: params.resizeObserver,
    noTrigger: Boolean(params.noTrigger)
  });
  (0, import_generateHighlightedComment.showAllHiddenHighlightedCommentIcons)();
  if (!import__.VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM)
    return;
  params.resizeObserver.unobserve(
    import__.VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM
  );
  import__.VisualBuilder.VisualBuilderGlobalState.value.previousSelectedEditableDOM = null;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addFocusOverlay,
  hideFocusOverlay,
  hideOverlay,
  sendFieldEvent
});
//# sourceMappingURL=generateOverlay.cjs.map