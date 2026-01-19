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

// src/light-sdk.ts
var light_sdk_exports = {};
__export(light_sdk_exports, {
  default: () => light_sdk_default
});
module.exports = __toCommonJS(light_sdk_exports);
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
    return "4.2.1-stage";
  }
};
_LightLivePreviewHoC.previewConstructors = {};
_LightLivePreviewHoC.onEntryChangeCallbacks = {};
var LightLivePreviewHoC = _LightLivePreviewHoC;
var light_sdk_default = LightLivePreviewHoC;
//# sourceMappingURL=light-sdk.cjs.map