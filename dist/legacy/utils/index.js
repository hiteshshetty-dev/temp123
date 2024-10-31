import "../chunk-5WRI5ZAA.js";

// src/utils/index.ts
import { PublicLogger } from "../logger/logger.js";
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
    PublicLogger.error("Error while adding live preview to URL");
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
export {
  addLivePreviewQueryTags,
  addParamsToUrl,
  hasWindow,
  isOpeningInTimeline
};
//# sourceMappingURL=index.js.map