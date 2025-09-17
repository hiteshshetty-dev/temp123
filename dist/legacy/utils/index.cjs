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
  addLivePreviewQueryTags: () => import_addLivePreviewQueryTags.addLivePreviewQueryTags,
  addParamsToUrl: () => addParamsToUrl,
  hasWindow: () => hasWindow,
  isOpenInBuilder: () => isOpenInBuilder,
  isOpenInPreviewShare: () => isOpenInPreviewShare,
  isOpeningInTimeline: () => isOpeningInTimeline
});
module.exports = __toCommonJS(utils_exports);
var import_addLivePreviewQueryTags = require("./addLivePreviewQueryTags.cjs");
function hasWindow() {
  return typeof window !== "undefined";
}
function addParamsToUrl() {
  window.addEventListener("click", (event) => {
    const clickedElement = event.target;
    const anchorElement = clickedElement.closest("a");
    if (!anchorElement || !anchorElement.contains(clickedElement)) {
      return;
    }
    const targetHref = anchorElement.href;
    const docOrigin = document.location.origin;
    if (targetHref && targetHref.includes(docOrigin) && !targetHref.includes("live_preview")) {
      const newUrl = (0, import_addLivePreviewQueryTags.addLivePreviewQueryTags)(targetHref);
      anchorElement.href = newUrl || targetHref;
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
function isOpenInBuilder() {
  if (hasWindow()) {
    const urlParams = new URLSearchParams(window.location.search);
    const builder = urlParams.get("builder");
    return !!builder;
  }
  return false;
}
function isOpenInPreviewShare() {
  if (hasWindow()) {
    const urlParams = new URLSearchParams(window.location.search);
    const previewShare = urlParams.get("preview_share");
    return !!previewShare;
  }
  return false;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addLivePreviewQueryTags,
  addParamsToUrl,
  hasWindow,
  isOpenInBuilder,
  isOpenInPreviewShare,
  isOpeningInTimeline
});
//# sourceMappingURL=index.cjs.map