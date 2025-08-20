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

// src/common/inIframe.ts
var inIframe_exports = {};
__export(inIframe_exports, {
  inIframe: () => inIframe,
  isOpeningInNewTab: () => isOpeningInNewTab
});
module.exports = __toCommonJS(inIframe_exports);
var import_utils = require("../utils/index.cjs");
function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}
function isOpeningInNewTab() {
  try {
    if ((0, import_utils.hasWindow)()) {
      return !!window.opener;
    }
    return false;
  } catch (e) {
    return false;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  inIframe,
  isOpeningInNewTab
});
//# sourceMappingURL=inIframe.cjs.map