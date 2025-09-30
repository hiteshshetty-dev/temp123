"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/visualBuilder/components/VariantIndicator.tsx
var VariantIndicator_exports = {};
__export(VariantIndicator_exports, {
  VariantIndicator: () => VariantIndicator
});
module.exports = __toCommonJS(VariantIndicator_exports);
var import_variant = require("./icons/variant.cjs");
var import_visualBuilder = require("../visualBuilder.style.cjs");
var import_jsx_runtime = require("preact/jsx-runtime");
function VariantIndicator() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__variant-indicator"], children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_variant.VariantIcon, { size: "18px" }) });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  VariantIndicator
});
//# sourceMappingURL=VariantIndicator.cjs.map