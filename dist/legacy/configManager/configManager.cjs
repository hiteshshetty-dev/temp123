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

// src/configManager/configManager.ts
var configManager_exports = {};
__export(configManager_exports, {
  default: () => configManager_default,
  setConfigFromParams: () => setConfigFromParams,
  updateConfigFromUrl: () => updateConfigFromUrl
});
module.exports = __toCommonJS(configManager_exports);
var import_deepsignal = require("deepsignal");
var import_config = require("./config.default.cjs");
var import_handleUserConfig = require("./handleUserConfig.cjs");
var import_lodash_es = require("lodash-es");
var Config = class {
  static replace(userInput = (0, import_config.getUserInitData)()) {
    (0, import_handleUserConfig.handleInitData)(userInput);
  }
  static set(key, value) {
    if (!(0, import_lodash_es.has)(this.config.state, key)) {
      throw new Error(`Invalid key: ${key}`);
    }
    (0, import_lodash_es.set)(this.config.state, key, value);
  }
  static get() {
    return this.config.state;
  }
  static reset() {
    (0, import_lodash_es.set)(this.config, "state", (0, import_config.getDefaultConfig)());
  }
};
Config.config = {
  state: (0, import_deepsignal.deepSignal)((0, import_config.getDefaultConfig)())
};
var configManager_default = Config;
function updateConfigFromUrl() {
  const searchParams = new URLSearchParams(window.location.search);
  setConfigFromParams(searchParams.toString());
}
function setConfigFromParams(params = {}) {
  const urlParams = new URLSearchParams(params);
  const live_preview = urlParams.get("live_preview");
  const content_type_uid = urlParams.get("content_type_uid");
  const entry_uid = urlParams.get("entry_uid");
  const stackSdkLivePreview = Config.get().stackSdk.live_preview;
  if (live_preview) {
    Config.set("hash", live_preview);
    stackSdkLivePreview.hash = live_preview;
    stackSdkLivePreview.live_preview = live_preview;
  }
  if (content_type_uid) {
    Config.set("stackDetails.contentTypeUid", content_type_uid);
    stackSdkLivePreview.content_type_uid = content_type_uid;
  }
  if (entry_uid) {
    Config.set("stackDetails.entryUid", entry_uid);
    stackSdkLivePreview.entry_uid = entry_uid;
  }
  Config.set("stackSdk.live_preview", stackSdkLivePreview);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  setConfigFromParams,
  updateConfigFromUrl
});
//# sourceMappingURL=configManager.cjs.map