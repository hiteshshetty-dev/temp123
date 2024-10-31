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
    if (dataCslp == null ? void 0 : dataCslp.includes(variant_uid)) {
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
  var _a, _b, _c, _d, _e;
  (_a = visualBuilderPostMessage) == null ? void 0 : _a.on(
    VisualBuilderPostMessageEvents.GET_VARIANT_ID,
    (event) => {
      setVariant(event.data.variant);
    }
  );
  (_b = visualBuilderPostMessage) == null ? void 0 : _b.on(
    VisualBuilderPostMessageEvents.GET_LOCALE,
    (event) => {
      setLocale(event.data.locale);
    }
  );
  (_c = visualBuilderPostMessage) == null ? void 0 : _c.on(
    VisualBuilderPostMessageEvents.SET_AUDIENCE_MODE,
    (event) => {
      setAudienceMode(event.data.audienceMode);
    }
  );
  (_d = visualBuilderPostMessage) == null ? void 0 : _d.on(
    VisualBuilderPostMessageEvents.SHOW_VARIANT_FIELDS,
    (event) => {
      removeVariantFieldClass();
      addVariantFieldClass(
        event.data.variant_data.variant,
        event.data.variant_data.highlightVariantFields
      );
    }
  );
  (_e = visualBuilderPostMessage) == null ? void 0 : _e.on(
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