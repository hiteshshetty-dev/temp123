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

// src/visualBuilder/hooks/useDynamicTextareaRows.tsx
var useDynamicTextareaRows_exports = {};
__export(useDynamicTextareaRows_exports, {
  default: () => useDynamicTextareaRows_default
});
module.exports = __toCommonJS(useDynamicTextareaRows_exports);
var import_compat = require("preact/compat");
var useDynamicTextareaRows = (selector, dependency, defaultRows = 1, expandedRows = 3) => {
  (0, import_compat.useEffect)(() => {
    const textAreaElement = document.querySelector(selector);
    if (textAreaElement) {
      textAreaElement.setAttribute(
        "rows",
        dependency.length > 0 ? `${expandedRows}` : `${defaultRows}`
      );
    }
    return () => {
      textAreaElement?.setAttribute("rows", `${defaultRows}`);
    };
  }, [dependency, selector, defaultRows, expandedRows]);
};
var useDynamicTextareaRows_default = useDynamicTextareaRows;
//# sourceMappingURL=useDynamicTextareaRows.cjs.map