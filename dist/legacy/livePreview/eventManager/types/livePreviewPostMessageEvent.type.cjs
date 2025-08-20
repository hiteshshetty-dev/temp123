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

// src/livePreview/eventManager/types/livePreviewPostMessageEvent.type.ts
var livePreviewPostMessageEvent_type_exports = {};
__export(livePreviewPostMessageEvent_type_exports, {
  OnChangeLivePreviewPostMessageEventTypes: () => OnChangeLivePreviewPostMessageEventTypes
});
module.exports = __toCommonJS(livePreviewPostMessageEvent_type_exports);
var OnChangeLivePreviewPostMessageEventTypes = {
  HASH_CHANGE: "hash_change",
  URL_CHANGE: "url_change"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OnChangeLivePreviewPostMessageEventTypes
});
//# sourceMappingURL=livePreviewPostMessageEvent.type.cjs.map