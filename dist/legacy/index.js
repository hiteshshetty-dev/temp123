import "./chunk-5WRI5ZAA.js";

// src/index.ts
import ContentstackLivePreviewHOC from "./preview/contentstack-live-preview-HOC.js";
import LightLivePreviewHoC from "./light-sdk.js";
console.log("initialised");
var ContentstackLivePreview = typeof process !== "undefined" && (process.env.PURGE_PREVIEW_SDK === "true" || process.env.REACT_APP_PURGE_PREVIEW_SDK === "true") ? LightLivePreviewHoC : ContentstackLivePreviewHOC;
var VB_EmptyBlockParentClass = "visual-builder__empty-block-parent";
var index_default = ContentstackLivePreview;
export {
  VB_EmptyBlockParentClass,
  index_default as default
};
//# sourceMappingURL=index.js.map