import "../chunk-5WRI5ZAA.js";

// src/utils/addLivePreviewQueryTags.ts
import { PublicLogger } from "../logger/logger.js";
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
    PublicLogger.error("Error while adding live preview to URL");
    return link;
  }
}
export {
  addLivePreviewQueryTags
};
//# sourceMappingURL=addLivePreviewQueryTags.js.map