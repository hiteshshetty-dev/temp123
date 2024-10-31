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

// src/utils/compare.ts
var compare_exports = {};
__export(compare_exports, {
  registerCompareElement: () => registerCompareElement
});
module.exports = __toCommonJS(compare_exports);
var DIFF_WRAPPER = "cs-compare";
function registerCompareElement() {
  class Compare extends HTMLSpanElement {
    constructor() {
      super();
    }
  }
  if (!customElements.get(DIFF_WRAPPER)) {
    customElements.define(DIFF_WRAPPER, Compare, {
      extends: "span"
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  registerCompareElement
});
//# sourceMappingURL=compare.cjs.map