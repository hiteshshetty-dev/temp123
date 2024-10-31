import "../chunk-5WRI5ZAA.js";

// src/configManager/configManager.ts
import { deepSignal } from "deepsignal";
import { getDefaultConfig, getUserInitData } from "./config.default.js";
import { handleInitData } from "./handleUserConfig.js";
import { has as lodashHas, set as lodashSet } from "lodash-es";
var Config = class {
  static replace(userInput = getUserInitData()) {
    handleInitData(userInput);
  }
  static set(key, value) {
    if (!lodashHas(this.config.state, key)) {
      throw new Error(`Invalid key: ${key}`);
    }
    lodashSet(this.config.state, key, value);
  }
  static get() {
    return this.config.state;
  }
  static reset() {
    lodashSet(this.config, "state", getDefaultConfig());
  }
};
Config.config = {
  state: deepSignal(getDefaultConfig())
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
export {
  configManager_default as default,
  setConfigFromParams,
  updateConfigFromUrl
};
//# sourceMappingURL=configManager.js.map