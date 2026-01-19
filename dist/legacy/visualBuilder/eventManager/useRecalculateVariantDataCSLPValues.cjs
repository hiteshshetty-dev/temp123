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

// src/visualBuilder/eventManager/useRecalculateVariantDataCSLPValues.ts
var useRecalculateVariantDataCSLPValues_exports = {};
__export(useRecalculateVariantDataCSLPValues_exports, {
  updateVariantClasses: () => updateVariantClasses,
  useRecalculateVariantDataCSLPValues: () => useRecalculateVariantDataCSLPValues
});
module.exports = __toCommonJS(useRecalculateVariantDataCSLPValues_exports);
var import__ = require("../index.cjs");
var import_livePreviewEventManager = __toESM(require("../../livePreview/eventManager/livePreviewEventManager.cjs"), 1);
var import_livePreviewEventManager2 = require("../../livePreview/eventManager/livePreviewEventManager.constant.cjs");
var import_constants = require("../utils/constants.cjs");
var import_visualBuilder = require("../visualBuilder.style.cjs");
var import_useVariantsPostMessageEvent = require("./useVariantsPostMessageEvent.cjs");
var VARIANT_UPDATE_DELAY_MS = 8e3;
function useRecalculateVariantDataCSLPValues() {
  var _a;
  (_a = import_livePreviewEventManager.default) == null ? void 0 : _a.on(
    import_livePreviewEventManager2.LIVE_PREVIEW_POST_MESSAGE_EVENTS.VARIANT_PATCH,
    (event) => {
      if (import__.VisualBuilder.VisualBuilderGlobalState.value.audienceMode) {
        (0, import_useVariantsPostMessageEvent.setHighlightVariantFields)(event.data.highlightVariantFields);
        updateVariantClasses();
      }
    }
  );
}
function updateVariantClasses() {
  const highlightVariantFields = import__.VisualBuilder.VisualBuilderGlobalState.value.highlightVariantFields;
  const variant = import__.VisualBuilder.VisualBuilderGlobalState.value.variant;
  const observers = [];
  const updateElementClasses = (element, dataCslp, observer) => {
    if (!dataCslp) return;
    if (dataCslp.startsWith("v2:") && !element.classList.contains("visual-builder__variant-field")) {
      if (element.classList.contains("visual-builder__base-field")) {
        element.classList.remove("visual-builder__base-field");
      }
      const variantFieldClasses = ["visual-builder__variant-field"];
      if (highlightVariantFields) {
        variantFieldClasses.push((0, import_visualBuilder.visualBuilderStyles)()["visual-builder__variant-field-outline"]);
      }
      element.classList.add(...variantFieldClasses);
    } else if (!dataCslp.startsWith("v2:") && element.classList.contains("visual-builder__variant-field")) {
      element.classList.remove(
        (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__variant-field-outline"],
        "visual-builder__variant-field"
      );
      element.classList.add("visual-builder__base-field");
    } else if (dataCslp.startsWith("v2:") && variant && !dataCslp.includes(variant) && element.classList.contains("visual-builder__variant-field")) {
      element.classList.remove(
        (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__variant-field-outline"],
        "visual-builder__variant-field"
      );
      element.classList.add("visual-builder__disabled-variant-field");
    }
    if (!observer) return;
    observer.disconnect();
    const index = observers.indexOf(observer);
    if (index > -1) {
      observers.splice(index, 1);
    }
  };
  const addElementClasses = (element) => {
    const dataCslp = element.getAttribute(import_constants.DATA_CSLP_ATTR_SELECTOR);
    if (!dataCslp) {
      element.childNodes.forEach((child) => {
        if (child instanceof HTMLElement) {
          addElementClasses(child);
        }
      });
      return;
    }
    if (dataCslp.startsWith("v2:") && element.classList.contains("visual-builder__variant-field")) {
      return;
    }
    if (dataCslp.startsWith("v2:") && !element.classList.contains("visual-builder__variant-field")) {
      if (element.classList.contains("visual-builder__base-field")) {
        element.classList.remove("visual-builder__base-field");
      }
      const variantFieldClasses = ["visual-builder__variant-field"];
      if (highlightVariantFields) {
        variantFieldClasses.push((0, import_visualBuilder.visualBuilderStyles)()["visual-builder__variant-field-outline"]);
      }
      element.classList.add(...variantFieldClasses);
    } else if (!dataCslp.startsWith("v2:")) {
      if (element.classList.contains("visual-builder__variant-field")) {
        element.classList.remove(
          (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__variant-field-outline"],
          "visual-builder__variant-field"
        );
      }
      element.classList.add("visual-builder__base-field");
    }
    element.childNodes.forEach((child) => {
      if (child instanceof HTMLElement) {
        addElementClasses(child);
      }
    });
  };
  const elementsWithCslp = document.querySelectorAll(
    `[${import_constants.DATA_CSLP_ATTR_SELECTOR}]`
  );
  elementsWithCslp.forEach((elementNode) => {
    const element = elementNode;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === import_constants.DATA_CSLP_ATTR_SELECTOR || mutation.type === "childList") {
          if (mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach((node) => {
              if (node instanceof HTMLElement) {
                addElementClasses(node);
              }
            });
          }
          const dataCslp = element.getAttribute(
            import_constants.DATA_CSLP_ATTR_SELECTOR
          );
          updateElementClasses(element, dataCslp || "", observer);
        }
      });
    });
    observers.push(observer);
    observer.observe(element, {
      attributes: true,
      childList: true,
      // Observe direct children
      subtree: true
    });
  });
  setTimeout(() => {
    if (observers.length > 0) {
      observers.forEach((observer) => observer.disconnect());
      observers.length = 0;
    }
  }, VARIANT_UPDATE_DELAY_MS);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  updateVariantClasses,
  useRecalculateVariantDataCSLPValues
});
//# sourceMappingURL=useRecalculateVariantDataCSLPValues.cjs.map