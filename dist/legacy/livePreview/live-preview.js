import "../chunk-5WRI5ZAA.js";

// src/livePreview/live-preview.ts
import Config from "../configManager/configManager.js";
import { PublicLogger } from "../logger/logger.js";
import { ILivePreviewModeConfig } from "../types/types.js";
import { isOpeningInTimeline } from "../utils/index.js";
import { LivePreviewEditButton } from "./editButton/editButton.js";
import { sendInitializeLivePreviewPostMessageEvent } from "./eventManager/postMessageEvent.hooks.js";
import { removeDataCslp } from "./livePreviewProductionCleanup.js";
import { removeFromOnChangeSubscribers } from "./removeFromOnChangeSubscribers.js";
var LivePreview = class {
  constructor() {
    /**
     * @hideconstructor
     */
    this.subscribers = {};
    this.requestDataSync = this.requestDataSync.bind(this);
    this.subscribeToOnEntryChange = this.subscribeToOnEntryChange.bind(this);
    this.publish = this.publish.bind(this);
    this.unsubscribeOnEntryChange = this.unsubscribeOnEntryChange.bind(this);
    const config = Config.get();
    if (config.debug) {
      PublicLogger.debug(
        "Contentstack Live Preview Debugging mode: config --",
        Config.config
      );
    }
    if (config.enable) {
      if (typeof document !== void 0) {
        if (document.readyState === "interactive" || document.readyState === "complete") {
          this.requestDataSync();
        } else {
          document.addEventListener("DOMContentLoaded", this.requestDataSync);
        }
      } else {
        window.addEventListener("load", this.requestDataSync);
      }
      if (!isOpeningInTimeline() && (config.editButton.enable || config.mode >= ILivePreviewModeConfig.BUILDER)) {
        LivePreviewEditButton.livePreviewEditButton = new LivePreviewEditButton();
      }
    } else if (config.cleanCslpOnProduction) {
      removeDataCslp();
    }
  }
  // Request parent for data sync when document loads
  requestDataSync() {
    const config = Config.get();
    Config.set("onChange", this.publish);
    config.onChange();
    sendInitializeLivePreviewPostMessageEvent();
  }
  subscribeToOnEntryChange(callback, callbackUid) {
    this.subscribers[callbackUid] = callback;
    return callbackUid;
  }
  publish() {
    Object.values(this.subscribers).forEach(
      (func) => {
        func();
      }
    );
  }
  unsubscribeOnEntryChange(callback) {
    removeFromOnChangeSubscribers(this.subscribers, callback);
  }
};
export {
  LivePreview as default
};
//! TODO: we replaced the handleOnChange() with this.
//! I don't think we need this. Confirm and remove it.
//# sourceMappingURL=live-preview.js.map