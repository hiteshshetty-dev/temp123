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

// src/visualBuilder/eventManager/useVariantsPostMessageEvent.ts
var useVariantsPostMessageEvent_exports = {};
__export(useVariantsPostMessageEvent_exports, {
  useVariantFieldsPostMessageEvent: () => useVariantFieldsPostMessageEvent
});
module.exports = __toCommonJS(useVariantsPostMessageEvent_exports);
var import__ = require("../index.cjs");
var import_visualBuilder = require("../visualBuilder.style.cjs");
var import_visualBuilderPostMessage = __toESM(require("../utils/visualBuilderPostMessage.cjs"), 1);
var import_postMessage = require("../utils/types/postMessage.types.cjs");
function addVariantFieldClass(variant_uid, highlightVariantFields) {
  const elements = document.querySelectorAll(`[data-cslp]`);
  elements.forEach((element) => {
    const dataCslp = element.getAttribute("data-cslp");
    if (!dataCslp) return;
    if (dataCslp == null ? void 0 : dataCslp.includes(variant_uid)) {
      highlightVariantFields && element.classList.add(
        (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__variant-field"]
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
      (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__variant-field"],
      "visual-builder__base-field"
    );
  });
}
function setAudienceMode(mode) {
  import__.VisualBuilder.VisualBuilderGlobalState.value.audienceMode = mode;
}
function setVariant(uid) {
  import__.VisualBuilder.VisualBuilderGlobalState.value.variant = uid;
}
function setLocale(locale) {
  import__.VisualBuilder.VisualBuilderGlobalState.value.locale = locale;
}
function useVariantFieldsPostMessageEvent() {
  var _a, _b, _c, _d, _e;
  (_a = import_visualBuilderPostMessage.default) == null ? void 0 : _a.on(
    import_postMessage.VisualBuilderPostMessageEvents.GET_VARIANT_ID,
    (event) => {
      setVariant(event.data.variant);
    }
  );
  (_b = import_visualBuilderPostMessage.default) == null ? void 0 : _b.on(
    import_postMessage.VisualBuilderPostMessageEvents.GET_LOCALE,
    (event) => {
      setLocale(event.data.locale);
    }
  );
  (_c = import_visualBuilderPostMessage.default) == null ? void 0 : _c.on(
    import_postMessage.VisualBuilderPostMessageEvents.SET_AUDIENCE_MODE,
    (event) => {
      setAudienceMode(event.data.audienceMode);
    }
  );
  (_d = import_visualBuilderPostMessage.default) == null ? void 0 : _d.on(
    import_postMessage.VisualBuilderPostMessageEvents.SHOW_VARIANT_FIELDS,
    (event) => {
      removeVariantFieldClass();
      addVariantFieldClass(
        event.data.variant_data.variant,
        event.data.variant_data.highlightVariantFields
      );
    }
  );
  (_e = import_visualBuilderPostMessage.default) == null ? void 0 : _e.on(
    import_postMessage.VisualBuilderPostMessageEvents.REMOVE_VARIANT_FIELDS,
    () => {
      removeVariantFieldClass();
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useVariantFieldsPostMessageEvent
});
//# sourceMappingURL=useVariantsPostMessageEvent.cjs.map