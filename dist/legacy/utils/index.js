import "../chunk-5WRI5ZAA.js";

// src/utils/index.ts
import { addLivePreviewQueryTags } from "./addLivePreviewQueryTags.js";
function hasWindow() {
  return typeof window !== "undefined";
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