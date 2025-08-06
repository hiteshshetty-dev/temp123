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

// src/utils/addLivePreviewQueryTags.ts
var addLivePreviewQueryTags_exports = {};
__export(addLivePreviewQueryTags_exports, {
  addLivePreviewQueryTags: () => addLivePreviewQueryTags
});
module.exports = __toCommonJS(addLivePreviewQueryTags_exports);
var import_logger = require("../logger/logger.cjs");
function addLivePreviewQueryTags(link) {
  try {
    const docUrl = new URL(document.location.href);
    const newUrl = new URL(link);
    const livePreviewHash = docUrl.searchParams.get("live_preview");
    const ctUid = docUrl.searchParams.get("content_type_uid");
    const entryUid = docUrl.searchParams.get("entry_uid");
    const previewTimestamp = docUrl.searchParams.get("preview_timestamp");
    if (livePreviewHash) {
      newUrl.searchParams.set("live_preview", livePreviewHash);
    }
    if (ctUid && entryUid) {
      newUrl.searchParams.set("content_type_uid", ctUid);
      newUrl.searchParams.set("entry_uid", entryUid);
    }
    if (previewTimestamp) {
      newUrl.searchParams.set("preview_timestamp", previewTimestamp);
    }
    return newUrl.href;
  } catch (error) {
    import_logger.PublicLogger.error("Error while adding live preview to URL");
    return link;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addLivePreviewQueryTags
});
//# sourceMappingURL=addLivePreviewQueryTags.cjs.map