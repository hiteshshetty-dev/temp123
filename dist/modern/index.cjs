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

// src/index.ts
var index_exports = {};
__export(index_exports, {
  VB_EmptyBlockParentClass: () => VB_EmptyBlockParentClass,
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);
var import_contentstack_live_preview_HOC = __toESM(require("./preview/contentstack-live-preview-HOC.cjs"), 1);
var import_light_sdk = __toESM(require("./light-sdk.cjs"), 1);
var ContentstackLivePreview = typeof process !== "undefined" && (process.env.PURGE_PREVIEW_SDK === "true" || process.env.REACT_APP_PURGE_PREVIEW_SDK === "true") ? import_light_sdk.default : import_contentstack_live_preview_HOC.default;
var VB_EmptyBlockParentClass = "visual-builder__empty-block-parent";
var index_default = ContentstackLivePreview;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  VB_EmptyBlockParentClass
});
//# sourceMappingURL=index.cjs.map