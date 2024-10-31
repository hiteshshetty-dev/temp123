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

// src/visualBuilder/utils/multipleElementAddButton.ts
var multipleElementAddButton_exports = {};
__export(multipleElementAddButton_exports, {
  handleAddButtonsForMultiple: () => handleAddButtonsForMultiple,
  observeParentAndFocusNewInstance: () => observeParentAndFocusNewInstance,
  removeAddInstanceButtons: () => removeAddInstanceButtons
});
module.exports = __toCommonJS(multipleElementAddButton_exports);
var import_generateAddInstanceButtons = require("../generators/generateAddInstanceButtons.cjs");
var import_visualBuilderPostMessage = __toESM(require("./visualBuilderPostMessage.cjs"), 1);
var import_postMessage = require("./types/postMessage.types.cjs");
var import_getChildrenDirection = __toESM(require("./getChildrenDirection.cjs"), 1);
var import_generateOverlay = require("../generators/generateOverlay.cjs");
var import_mouseHover = require("../listeners/mouseHover.cjs");
var WAIT_FOR_NEW_INSTANCE_TIMEOUT = 4e3;
function handleAddButtonsForMultiple(eventDetails, elements, config) {
  var _a, _b;
  const { editableElement, visualBuilderContainer, resizeObserver } = elements;
  const { expectedFieldData, fieldSchema, disabled, label } = config;
  const parentCslpValue = (_b = (_a = eventDetails.fieldMetadata.multipleFieldMetadata) == null ? void 0 : _a.parentDetails) == null ? void 0 : _b.parentCslpValue;
  if (!editableElement || !parentCslpValue) {
    return;
  }
  const direction = (0, import_getChildrenDirection.default)(editableElement, parentCslpValue);
  if (direction === "none" || !visualBuilderContainer) {
    return;
  }
  const targetDOMDimension = editableElement.getBoundingClientRect();
  removeAddInstanceButtons(
    {
      visualBuilderContainer,
      eventTarget: null,
      overlayWrapper: null
    },
    true
  );
  const overlayWrapper = visualBuilderContainer.querySelector(
    ".visual-builder__overlay__wrapper"
  );
  const focusedToolbar = visualBuilderContainer.querySelector(
    ".visual-builder__focused-toolbar"
  );
  const hideOverlayAndHoverOutline = () => {
    (0, import_mouseHover.hideHoverOutline)(visualBuilderContainer);
    (0, import_generateOverlay.hideOverlay)({
      visualBuilderContainer,
      visualBuilderOverlayWrapper: overlayWrapper,
      focusedToolbar,
      resizeObserver
    });
  };
  if (disabled) {
    return;
  }
  const isField = eventDetails.fieldMetadata.instance.fieldPathWithIndex === eventDetails.fieldMetadata.fieldPathWithIndex;
  const prevIndex = isField ? 0 : eventDetails.fieldMetadata.multipleFieldMetadata.index;
  const nextIndex = isField ? expectedFieldData.length : eventDetails.fieldMetadata.multipleFieldMetadata.index + 1;
  const parentCslp = isField ? eventDetails.cslpData : parentCslpValue;
  const onMessageSent = (index) => {
    hideOverlayAndHoverOutline();
    observeParentAndFocusNewInstance({
      parentCslp,
      index
    });
  };
  const previousButton = (0, import_generateAddInstanceButtons.generateAddInstanceButton)({
    onClick: () => {
      var _a2;
      (_a2 = import_visualBuilderPostMessage.default) == null ? void 0 : _a2.send(import_postMessage.VisualBuilderPostMessageEvents.ADD_INSTANCE, {
        fieldMetadata: eventDetails.fieldMetadata,
        index: prevIndex
      }).then(onMessageSent.bind(null, prevIndex));
    },
    label,
    fieldSchema,
    value: expectedFieldData
  });
  const nextButton = (0, import_generateAddInstanceButtons.generateAddInstanceButton)({
    onClick: () => {
      var _a2;
      (_a2 = import_visualBuilderPostMessage.default) == null ? void 0 : _a2.send(import_postMessage.VisualBuilderPostMessageEvents.ADD_INSTANCE, {
        fieldMetadata: eventDetails.fieldMetadata,
        index: nextIndex
      }).then(onMessageSent.bind(null, nextIndex));
    },
    label,
    fieldSchema,
    value: expectedFieldData
  });
  if (!visualBuilderContainer.contains(previousButton)) {
    visualBuilderContainer.appendChild(previousButton);
  }
  if (!visualBuilderContainer.contains(nextButton)) {
    visualBuilderContainer.appendChild(nextButton);
  }
  if (direction === "horizontal") {
    const middleHeight = targetDOMDimension.top + (targetDOMDimension.bottom - targetDOMDimension.top) / 2 + window.scrollY;
    previousButton.style.left = `${targetDOMDimension.left}px`;
    previousButton.style.top = `${middleHeight}px`;
    nextButton.style.left = `${targetDOMDimension.right}px`;
    nextButton.style.top = `${middleHeight}px`;
  } else {
    const middleWidth = targetDOMDimension.left + (targetDOMDimension.right - targetDOMDimension.left) / 2;
    previousButton.style.left = `${middleWidth}px`;
    previousButton.style.top = `${targetDOMDimension.top + window.scrollY}px`;
    nextButton.style.left = `${middleWidth}px`;
    nextButton.style.top = `${targetDOMDimension.bottom + window.scrollY}px`;
  }
}
function removeAddInstanceButtons(elements, forceRemoveAll = false) {
  const { visualBuilderContainer, overlayWrapper, eventTarget } = elements;
  if (!visualBuilderContainer) {
    return;
  }
  if (forceRemoveAll) {
    const addInstanceButtons2 = (0, import_generateAddInstanceButtons.getAddInstanceButtons)(
      visualBuilderContainer,
      true
    );
    addInstanceButtons2 == null ? void 0 : addInstanceButtons2.forEach((button) => button.remove());
  }
  const addInstanceButtons = (0, import_generateAddInstanceButtons.getAddInstanceButtons)(visualBuilderContainer);
  if (!addInstanceButtons) {
    return;
  }
  const [previousButton, nextButton] = addInstanceButtons;
  if (overlayWrapper == null ? void 0 : overlayWrapper.classList.contains("visible")) {
    return;
  }
  if (eventTarget && (previousButton.contains(eventTarget) || nextButton.contains(eventTarget))) {
    return;
  }
  nextButton.remove();
  previousButton.remove();
}
function observeParentAndFocusNewInstance({
  parentCslp,
  index
}) {
  const parent = document.querySelector(
    `[data-cslp='${parentCslp}']`
  );
  if (parent) {
    const expectedCslp = [parentCslp, index].join(".");
    let hasObserverDisconnected = false;
    let timeoutId = null;
    const mutationObserver = new MutationObserver(
      (_mutations, observer) => {
        const newInstance = parent.querySelector(
          `[data-cslp='${expectedCslp}']`
        );
        if (newInstance) {
          setTimeout(() => newInstance.click(), 150);
          observer.disconnect();
          hasObserverDisconnected = true;
          return;
        }
        if (!hasObserverDisconnected && !timeoutId) {
          timeoutId = setTimeout(() => {
            observer.disconnect();
            hasObserverDisconnected = false;
          }, WAIT_FOR_NEW_INSTANCE_TIMEOUT);
        }
      }
    );
    mutationObserver.observe(parent, {
      childList: true,
      // watch subtrees as there may be wrapper elements
      subtree: true,
      // we don't need to watch for attribute changes
      attributes: false
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handleAddButtonsForMultiple,
  observeParentAndFocusNewInstance,
  removeAddInstanceButtons
});
//# sourceMappingURL=multipleElementAddButton.cjs.map