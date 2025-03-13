import "../chunk-IKZWERSR.js";

// src/livePreview/livePreviewProductionCleanup.ts
function removeDataCslp() {
  const nodes = document.querySelectorAll("[data-cslp]");
  nodes.forEach((node) => {
    node.removeAttribute("data-cslp");
    node.removeAttribute("data-cslp-button-position");
  });
}
export {
  removeDataCslp
};
//# sourceMappingURL=livePreviewProductionCleanup.js.map