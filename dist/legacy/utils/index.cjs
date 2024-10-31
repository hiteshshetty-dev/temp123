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

// src/utils/index.ts
var utils_exports = {};
__export(utils_exports, {
  addLivePreviewQueryTags: () => addLivePreviewQueryTags,
  addParamsToUrl: () => addParamsToUrl,
  hasWindow: () => hasWindow,
  isOpeningInTimeline: () => isOpeningInTimeline
});
module.exports = __toCommonJS(utils_exports);
var import_logger = require("../logger/logger.cjs");
function hasWindow() {
  return typeof window !== "undefined";
}
function addLivePreviewQueryTags(link) {
  try {
    const docUrl = new URL(document.location.href);
    const newUrl = new URL(link);
    const livePreviewHash = docUrl.searchParams.get("live_preview");
    const ctUid = docUrl.searchParams.get("content_type_uid");
    const entryUid = docUrl.searchParams.get("entry_uid");
    if (livePreviewHash && ctUid && entryUid) {
      newUrl.searchParams.set("live_preview", livePreviewHash);
      newUrl.searchParams.set("content_type_uid", ctUid);
      newUrl.searchParams.set("entry_uid", entryUid);
    }
    return newUrl.href;
  } catch (error) {
    import_logger.PublicLogger.error("Error while adding live preview to URL");
    return link;
  }
}
function addParamsToUrl() {
  window.addEventListener("click", (event) => {
    const target = event.target;
    const targetHref = target.href;
    const docOrigin = document.location.origin;
    if (targetHref && targetHref.includes(docOrigin) && !targetHref.includes("live_preview")) {
      const newUrl = addLivePreviewQueryTags(target.href);
      event.target.href = newUrl || target.href;
    }
  });
}
function isOpeningInTimeline() {
  if (hasWindow()) {
    const urlParams = new URLSearchParams(window.location.search);
    const previewTimestamp = urlParams.get("preview_timestamp");
    return !!previewTimestamp;
  }
  return false;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addLivePreviewQueryTags,
  addParamsToUrl,
  hasWindow,
  isOpeningInTimeline
});
//# sourceMappingURL=index.cjs.map