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

// src/visualBuilder/utils/getCsDataOfElement.ts
var getCsDataOfElement_exports = {};
__export(getCsDataOfElement_exports, {
  getCsDataOfElement: () => getCsDataOfElement,
  getDOMEditStack: () => getDOMEditStack
});
module.exports = __toCommonJS(getCsDataOfElement_exports);
var import_cslpdata = require("../../cslp/cslpdata.cjs");
var import_constants = require("./constants.cjs");
function getCsDataOfElement(event) {
  const targetElement = event.target;
  if (!targetElement) {
    return;
  }
  const editableElement = targetElement.closest("[data-cslp]");
  if (!editableElement) {
    return;
  }
  const cslpData = editableElement.getAttribute("data-cslp");
  if (!cslpData) {
    return;
  }
  const fieldMetadata = (0, import_cslpdata.extractDetailsFromCslp)(cslpData);
  return {
    editableElement,
    cslpData,
    fieldMetadata
  };
}
function getDOMEditStack(ele) {
  var _a;
  const cslpSet = [];
  let curr = ele.closest(`[${import_constants.DATA_CSLP_ATTR_SELECTOR}]`);
  while (curr) {
    const cslp = curr.getAttribute(import_constants.DATA_CSLP_ATTR_SELECTOR);
    const entryPrefix = cslp.split(".").slice(0, 3).join(".");
    const hasSamePrevPrefix = (cslpSet.at(0) || "").startsWith(entryPrefix);
    if (!hasSamePrevPrefix) {
      cslpSet.unshift(cslp);
    }
    curr = (_a = curr.parentElement) == null ? void 0 : _a.closest(`[${import_constants.DATA_CSLP_ATTR_SELECTOR}]`);
  }
  return cslpSet.map((cslp) => (0, import_cslpdata.extractDetailsFromCslp)(cslp));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getCsDataOfElement,
  getDOMEditStack
});
//# sourceMappingURL=getCsDataOfElement.cjs.map