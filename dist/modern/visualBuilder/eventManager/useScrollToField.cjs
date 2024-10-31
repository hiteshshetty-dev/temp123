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

// src/visualBuilder/eventManager/useScrollToField.ts
var useScrollToField_exports = {};
__export(useScrollToField_exports, {
  useScrollToField: () => useScrollToField
});
module.exports = __toCommonJS(useScrollToField_exports);
var import_visualBuilderPostMessage = __toESM(require("../utils/visualBuilderPostMessage.cjs"), 1);
var import_postMessage = require("../utils/types/postMessage.types.cjs");
var handleScrollToField = (event) => {
  const { content_type_uid, entry_uid, locale, path } = event.data.cslpData;
  const cslpValue = `${content_type_uid}.${entry_uid}.${locale}.${path}`;
  const element = document.querySelector(`[data-cslp="${cslpValue}"]`);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};
var useScrollToField = () => {
  import_visualBuilderPostMessage.default?.on(
    import_postMessage.VisualBuilderPostMessageEvents.SCROLL_TO_FIELD,
    handleScrollToField
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useScrollToField
});
//# sourceMappingURL=useScrollToField.cjs.map