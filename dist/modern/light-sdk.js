import "./chunk-5WRI5ZAA.js";

// src/light-sdk.ts
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
    return "3.2.3";
  }
};
_LightLivePreviewHoC.previewConstructors = {};
_LightLivePreviewHoC.onEntryChangeCallbacks = {};
var LightLivePreviewHoC = _LightLivePreviewHoC;
var light_sdk_default = LightLivePreviewHoC;
export {
  light_sdk_default as default
};
//# sourceMappingURL=light-sdk.js.map