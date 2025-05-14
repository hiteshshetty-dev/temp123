import "./chunk-5WRI5ZAA.js";

// src/index.ts
import ContentstackLivePreviewHOC from "./preview/contentstack-live-preview-HOC.js";
var _LightLivePreviewHoC = class _LightLivePreviewHoC {
  static init() {
    if (typeof window === "undefined") {
      return Promise.resolve(_LightLivePreviewHoC.previewConstructors);
    }
    return _LightLivePreviewHoC.initializePreview();
  }
  static initializePreview() {
    _LightLivePreviewHoC.previewConstructors = {
      livePreview: {},
      visualBuilder: {}
    };
    _LightLivePreviewHoC.onEntryChangeCallbacks = {};
    return Promise.resolve(_LightLivePreviewHoC.previewConstructors);
  }
  static get hash() {
    return "";
  }
  static get config() {
    return {};
  }
  static isInitialized() {
    return false;
  }
  static onEntryChange(callback, config = {}) {
    const { skipInitialRender = false } = config;
    if (!skipInitialRender) {
      callback();
    }
    return "live-preview-id";
  }
  static onLiveEdit(callback) {
    return "live-preview-id";
  }
  static unsubscribeOnEntryChange() {
  }
  static getSdkVersion() {
    return "3.2.2";
  }
};
_LightLivePreviewHoC.previewConstructors = {};
_LightLivePreviewHoC.onEntryChangeCallbacks = {};
var LightLivePreviewHoC = _LightLivePreviewHoC;
var ContentstackLivePreview = typeof process !== "undefined" && (process.env.PURGE_PREVIEW_SDK === "true" || process.env.REACT_APP_PURGE_PREVIEW_SDK === "true") ? LightLivePreviewHoC : ContentstackLivePreviewHOC;
var VB_EmptyBlockParentClass = "visual-builder__empty-block-parent";
var index_default = ContentstackLivePreview;
export {
  VB_EmptyBlockParentClass,
  index_default as default
};
//# sourceMappingURL=index.js.map