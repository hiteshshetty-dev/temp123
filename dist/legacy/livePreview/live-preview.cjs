"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/livePreview/live-preview.ts
var live_preview_exports = {};
__export(live_preview_exports, {
  default: () => LivePreview
});
module.exports = __toCommonJS(live_preview_exports);
var import_configManager = __toESM(require("../configManager/configManager.cjs"), 1);
var import_logger = require("../logger/logger.cjs");
var import_types = require("../types/types.cjs");
var import_utils = require("../utils/index.cjs");
var import_editButton = require("./editButton/editButton.cjs");
var import_postMessageEvent = require("./eventManager/postMessageEvent.hooks.cjs");
var import_livePreviewProductionCleanup = require("./livePreviewProductionCleanup.cjs");
var import_removeFromOnChangeSubscribers = require("./removeFromOnChangeSubscribers.cjs");
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
    const config = import_configManager.default.get();
    if (config.debug) {
      import_logger.PublicLogger.debug(
        "Contentstack Live Preview Debugging mode: config --",
        import_configManager.default.config
      );
    }
    if (config.enable) {
      if (typeof document !== void 0 && document.readyState === "complete") {
        this.requestDataSync();
      } else {
        window.addEventListener("load", this.requestDataSync);
      }
      if (!(0, import_utils.isOpeningInTimeline)() && (config.editButton.enable || config.mode >= import_types.ILivePreviewModeConfig.BUILDER)) {
        import_editButton.LivePreviewEditButton.livePreviewEditButton = new import_editButton.LivePreviewEditButton();
      }
    } else if (config.cleanCslpOnProduction) {
      (0, import_livePreviewProductionCleanup.removeDataCslp)();
    }
  }
  // Request parent for data sync when document loads
  requestDataSync() {
    const config = import_configManager.default.get();
    import_configManager.default.set("onChange", this.publish);
    config.onChange();
    (0, import_postMessageEvent.sendInitializeLivePreviewPostMessageEvent)();
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
    (0, import_removeFromOnChangeSubscribers.removeFromOnChangeSubscribers)(this.subscribers, callback);
  }
};
//! TODO: we replaced the handleOnChange() with this.
//! I don't think we need this. Confirm and remove it.
//# sourceMappingURL=live-preview.cjs.map