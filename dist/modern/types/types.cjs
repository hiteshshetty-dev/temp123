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

// src/types/types.ts
var types_exports = {};
__export(types_exports, {
  ILivePreviewModeConfig: () => ILivePreviewModeConfig,
  ILivePreviewWindowType: () => ILivePreviewWindowType
});
module.exports = __toCommonJS(types_exports);
var ILivePreviewModeConfig = /* @__PURE__ */ ((ILivePreviewModeConfig2) => {
  ILivePreviewModeConfig2[ILivePreviewModeConfig2["PREVIEW"] = 1] = "PREVIEW";
  ILivePreviewModeConfig2[ILivePreviewModeConfig2["BUILDER"] = 2] = "BUILDER";
  return ILivePreviewModeConfig2;
})(ILivePreviewModeConfig || {});
var ILivePreviewWindowType = /* @__PURE__ */ ((ILivePreviewWindowType2) => {
  ILivePreviewWindowType2["PREVIEW"] = "preview";
  ILivePreviewWindowType2["BUILDER"] = "builder";
  ILivePreviewWindowType2["INDEPENDENT"] = "independent";
  return ILivePreviewWindowType2;
})(ILivePreviewWindowType || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ILivePreviewModeConfig,
  ILivePreviewWindowType
});
//# sourceMappingURL=types.cjs.map