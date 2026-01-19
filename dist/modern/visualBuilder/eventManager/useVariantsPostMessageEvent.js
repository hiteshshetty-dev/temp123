import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/eventManager/useVariantsPostMessageEvent.ts
import { VisualBuilder } from "../index.js";
import { visualBuilderStyles } from "../visualBuilder.style.js";
import visualBuilderPostMessage from "../utils/visualBuilderPostMessage.js";
import { VisualBuilderPostMessageEvents } from "../utils/types/postMessage.types.js";
import { FieldSchemaMap } from "../utils/fieldSchemaMap.js";
import { updateVariantClasses } from "./useRecalculateVariantDataCSLPValues.js";
import { debounce } from "lodash-es";
import { extractDetailsFromCslp } from "../../cslp/cslpdata.js";
function isLowerOrderVariant(variant_uid, dataCslp, variantOrder) {
  if (!variantOrder || variantOrder.length === 0) {
    return false;
  }
  const { variant: cslpVariant } = extractDetailsFromCslp(dataCslp);
  const indexOfCmsVariant = variantOrder.lastIndexOf(variant_uid);
  const indexOfCslpVariant = variantOrder.lastIndexOf(cslpVariant || "");
  if (indexOfCslpVariant < 0) {
    return false;
  }
  return indexOfCslpVariant < indexOfCmsVariant;
}
function addVariantFieldClass(variant_uid) {
  const variantOrder = VisualBuilder.VisualBuilderGlobalState.value.variantOrder;
  const highlightVariantFields = VisualBuilder.VisualBuilderGlobalState.value.highlightVariantFields;
  const elements = document.querySelectorAll(`[data-cslp]`);
  elements.forEach((element) => {
    const dataCslp = element.getAttribute("data-cslp");
    if (!dataCslp) return;
    if (dataCslp?.includes(variant_uid)) {
      element.classList.add("visual-builder__variant-field");
      if (highlightVariantFields) {
        element.classList.add(
          visualBuilderStyles()["visual-builder__variant-field-outline"]
        );
      }
    } else if (!dataCslp.startsWith("v2:")) {
      element.classList.add("visual-builder__base-field");
    } else if (isLowerOrderVariant(variant_uid, dataCslp, variantOrder)) {
      element.classList.add("visual-builder__variant-field", "visual-builder__lower-order-variant-field");
    } else {
      element.classList.add("visual-builder__disabled-variant-field");
    }
  });
}
var debounceAddVariantFieldClass = debounce(
  addVariantFieldClass,
  1e3,
  { trailing: true }
);
function removeVariantFieldClass(onlyHighlighted = false) {
  if (onlyHighlighted) {
    const variantElements = document.querySelectorAll(
      `.${visualBuilderStyles()["visual-builder__variant-field-outline"]}`
    );
    variantElements.forEach((element) => {
      element.classList.remove(
        visualBuilderStyles()["visual-builder__variant-field-outline"]
      );
    });
  } else {
    const variantAndBaseFieldElements = document.querySelectorAll(
      ".visual-builder__disabled-variant-field, .visual-builder__variant-field, .visual-builder__base-field, .visual-builder__lower-order-variant-field"
    );
    variantAndBaseFieldElements.forEach((element) => {
      element.classList.remove(
        "visual-builder__disabled-variant-field",
        "visual-builder__variant-field",
        visualBuilderStyles()["visual-builder__variant-field-outline"],
        "visual-builder__base-field",
        "visual-builder__lower-order-variant-field"
      );
    });
  }
}
function setAudienceMode(mode) {
  VisualBuilder.VisualBuilderGlobalState.value.audienceMode = mode;
}
function setVariant(uid) {
  VisualBuilder.VisualBuilderGlobalState.value.variant = uid;
}
function setLocale(locale) {
  VisualBuilder.VisualBuilderGlobalState.value.locale = locale;
}
function setHighlightVariantFields(highlight) {
  VisualBuilder.VisualBuilderGlobalState.value.highlightVariantFields = highlight;
}
function setVariantOrder(variantOrder) {
  VisualBuilder.VisualBuilderGlobalState.value.variantOrder = variantOrder;
}
async function getHighlightVariantFieldsStatus() {
  try {
    const result = await visualBuilderPostMessage?.send(
      VisualBuilderPostMessageEvents.GET_HIGHLIGHT_VARIANT_FIELDS_STATUS
    );
    return result ?? {
      highlightVariantFields: false
    };
  } catch (error) {
    console.error("Failed to get highlight variant fields status:", error);
    return {
      highlightVariantFields: false
    };
  }
}
function useVariantFieldsPostMessageEvent({ isSSR }) {
  visualBuilderPostMessage?.on(
    VisualBuilderPostMessageEvents.GET_VARIANT_ID,
    (event) => {
      const selectedVariant = event.data.variant;
      setVariant(selectedVariant);
      FieldSchemaMap.clear();
      if (isSSR) {
        if (selectedVariant) {
          addVariantFieldClass(selectedVariant);
        }
      } else {
        updateVariantClasses();
      }
    }
  );
  visualBuilderPostMessage?.on(
    VisualBuilderPostMessageEvents.GET_LOCALE,
    (event) => {
      setLocale(event.data.locale);
    }
  );
  visualBuilderPostMessage?.on(
    VisualBuilderPostMessageEvents.SET_AUDIENCE_MODE,
    (event) => {
      setAudienceMode(event.data.audienceMode);
    }
  );
  visualBuilderPostMessage?.on(
    VisualBuilderPostMessageEvents.SHOW_VARIANT_FIELDS,
    (event) => {
      setHighlightVariantFields(event.data.variant_data.highlightVariantFields);
      setVariantOrder(event.data.variant_data.variantOrder || []);
      removeVariantFieldClass();
      addVariantFieldClass(
        event.data.variant_data.variant
      );
    }
  );
  visualBuilderPostMessage?.on(
    VisualBuilderPostMessageEvents.REMOVE_VARIANT_FIELDS,
    (event) => {
      setHighlightVariantFields(false);
      removeVariantFieldClass(event?.data?.onlyHighlighted);
    }
  );
}
export {
  addVariantFieldClass,
  debounceAddVariantFieldClass,
  getHighlightVariantFieldsStatus,
  removeVariantFieldClass,
  setAudienceMode,
  setHighlightVariantFields,
  setLocale,
  setVariant,
  setVariantOrder,
  useVariantFieldsPostMessageEvent
};
//# sourceMappingURL=useVariantsPostMessageEvent.js.map