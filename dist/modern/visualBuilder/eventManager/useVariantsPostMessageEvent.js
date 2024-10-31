import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/eventManager/useVariantsPostMessageEvent.ts
import { VisualBuilder } from "../index.js";
import { visualBuilderStyles } from "../visualBuilder.style.js";
import visualBuilderPostMessage from "../utils/visualBuilderPostMessage.js";
import { VisualBuilderPostMessageEvents } from "../utils/types/postMessage.types.js";
function addVariantFieldClass(variant_uid, highlightVariantFields) {
  const elements = document.querySelectorAll(`[data-cslp]`);
  elements.forEach((element) => {
    const dataCslp = element.getAttribute("data-cslp");
    if (!dataCslp) return;
    if (dataCslp?.includes(variant_uid)) {
      highlightVariantFields && element.classList.add(
        visualBuilderStyles()["visual-builder__variant-field"]
      );
      element.classList.add("visual-builder__variant-field");
    } else if (!dataCslp.startsWith("v2:")) {
      element.classList.add("visual-builder__base-field");
    } else {
      element.classList.add("visual-builder__disabled-variant-field");
    }
  });
}
function removeVariantFieldClass() {
  const variantAndBaseFieldElements = document.querySelectorAll(
    ".visual-builder__disabled-variant-field, .visual-builder__variant-field, .visual-builder__base-field"
  );
  variantAndBaseFieldElements.forEach((element) => {
    element.classList.remove(
      "visual-builder__disabled-variant-field",
      "visual-builder__variant-field",
      visualBuilderStyles()["visual-builder__variant-field"],
      "visual-builder__base-field"
    );
  });
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
function useVariantFieldsPostMessageEvent() {
  visualBuilderPostMessage?.on(
    VisualBuilderPostMessageEvents.GET_VARIANT_ID,
    (event) => {
      setVariant(event.data.variant);
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
      removeVariantFieldClass();
      addVariantFieldClass(
        event.data.variant_data.variant,
        event.data.variant_data.highlightVariantFields
      );
    }
  );
  visualBuilderPostMessage?.on(
    VisualBuilderPostMessageEvents.REMOVE_VARIANT_FIELDS,
    () => {
      removeVariantFieldClass();
    }
  );
}
export {
  useVariantFieldsPostMessageEvent
};
//# sourceMappingURL=useVariantsPostMessageEvent.js.map