import "../chunk-5WRI5ZAA.js";

// src/utils/index.ts
import { addLivePreviewQueryTags } from "./addLivePreviewQueryTags.js";
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
      const newUrl = addLivePreviewQueryTags(targetHref);
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
export {
  addLivePreviewQueryTags,
  addParamsToUrl,
  hasWindow,
  isOpenInBuilder,
  isOpeningInTimeline
};
//# sourceMappingURL=index.js.map