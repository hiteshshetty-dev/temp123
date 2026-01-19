import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/eventManager/useRecalculateVariantDataCSLPValues.ts
import { VisualBuilder } from "../index.js";
import livePreviewPostMessage from "../../livePreview/eventManager/livePreviewEventManager.js";
import { LIVE_PREVIEW_POST_MESSAGE_EVENTS } from "../../livePreview/eventManager/livePreviewEventManager.constant.js";
import { DATA_CSLP_ATTR_SELECTOR } from "../utils/constants.js";
import { visualBuilderStyles } from "../visualBuilder.style.js";
import { setHighlightVariantFields } from "./useVariantsPostMessageEvent.js";
var VARIANT_UPDATE_DELAY_MS = 8e3;
function useRecalculateVariantDataCSLPValues() {
  var _a;
  (_a = livePreviewPostMessage) == null ? void 0 : _a.on(
    LIVE_PREVIEW_POST_MESSAGE_EVENTS.VARIANT_PATCH,
    (event) => {
      if (VisualBuilder.VisualBuilderGlobalState.value.audienceMode) {
        setHighlightVariantFields(event.data.highlightVariantFields);
        updateVariantClasses();
      }
    }
  );
}
function updateVariantClasses() {
  const highlightVariantFields = VisualBuilder.VisualBuilderGlobalState.value.highlightVariantFields;
  const variant = VisualBuilder.VisualBuilderGlobalState.value.variant;
  const observers = [];
  const updateElementClasses = (element, dataCslp, observer) => {
    if (!dataCslp) return;
    if (dataCslp.startsWith("v2:") && !element.classList.contains("visual-builder__variant-field")) {
      if (element.classList.contains("visual-builder__base-field")) {
        element.classList.remove("visual-builder__base-field");
      }
      const variantFieldClasses = ["visual-builder__variant-field"];
      if (highlightVariantFields) {
        variantFieldClasses.push(visualBuilderStyles()["visual-builder__variant-field-outline"]);
      }
      element.classList.add(...variantFieldClasses);
    } else if (!dataCslp.startsWith("v2:") && element.classList.contains("visual-builder__variant-field")) {
      element.classList.remove(
        visualBuilderStyles()["visual-builder__variant-field-outline"],
        "visual-builder__variant-field"
      );
      element.classList.add("visual-builder__base-field");
    } else if (dataCslp.startsWith("v2:") && variant && !dataCslp.includes(variant) && element.classList.contains("visual-builder__variant-field")) {
      element.classList.remove(
        visualBuilderStyles()["visual-builder__variant-field-outline"],
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
    const dataCslp = element.getAttribute(DATA_CSLP_ATTR_SELECTOR);
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
        variantFieldClasses.push(visualBuilderStyles()["visual-builder__variant-field-outline"]);
      }
      element.classList.add(...variantFieldClasses);
    } else if (!dataCslp.startsWith("v2:")) {
      if (element.classList.contains("visual-builder__variant-field")) {
        element.classList.remove(
          visualBuilderStyles()["visual-builder__variant-field-outline"],
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
    `[${DATA_CSLP_ATTR_SELECTOR}]`
  );
  elementsWithCslp.forEach((elementNode) => {
    const element = elementNode;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === DATA_CSLP_ATTR_SELECTOR || mutation.type === "childList") {
          if (mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach((node) => {
              if (node instanceof HTMLElement) {
                addElementClasses(node);
              }
            });
          }
          const dataCslp = element.getAttribute(
            DATA_CSLP_ATTR_SELECTOR
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
export {
  updateVariantClasses,
  useRecalculateVariantDataCSLPValues
};
//# sourceMappingURL=useRecalculateVariantDataCSLPValues.js.map