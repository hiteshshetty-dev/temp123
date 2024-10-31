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

// src/livePreview/eventManager/livePreviewEventManager.constant.ts
var livePreviewEventManager_constant_exports = {};
__export(livePreviewEventManager_constant_exports, {
  LIVE_PREVIEW_CHANNEL_ID: () => LIVE_PREVIEW_CHANNEL_ID,
  LIVE_PREVIEW_POST_MESSAGE_EVENTS: () => LIVE_PREVIEW_POST_MESSAGE_EVENTS
});
module.exports = __toCommonJS(livePreviewEventManager_constant_exports);
var LIVE_PREVIEW_POST_MESSAGE_EVENTS = {
  INIT: "init",
  ON_CHANGE: "client-data-send",
  HISTORY: "history",
  CHECK_ENTRY_PAGE: "check-entry-page",
  URL_CHANGE: "url-change",
  VARIANT_PATCH: "variant-patch-update"
};
var LIVE_PREVIEW_CHANNEL_ID = "live-preview";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LIVE_PREVIEW_CHANNEL_ID,
  LIVE_PREVIEW_POST_MESSAGE_EVENTS
});
//# sourceMappingURL=livePreviewEventManager.constant.cjs.map