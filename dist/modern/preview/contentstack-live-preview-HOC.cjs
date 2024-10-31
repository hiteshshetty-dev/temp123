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

// src/preview/contentstack-live-preview-HOC.ts
var contentstack_live_preview_HOC_exports = {};
__export(contentstack_live_preview_HOC_exports, {
  default: () => contentstack_live_preview_HOC_default
});
module.exports = __toCommonJS(contentstack_live_preview_HOC_exports);
var import_uuid = require("uuid");
var import_lodash_es = require("lodash-es");
var import_config = require("../configManager/config.default.cjs");
var import_configManager = __toESM(require("../configManager/configManager.cjs"), 1);
var import_visualBuilder = require("../visualBuilder/index.cjs");
var import_live_preview = __toESM(require("../livePreview/live-preview.cjs"), 1);
var import_removeFromOnChangeSubscribers = require("../livePreview/removeFromOnChangeSubscribers.cjs");
var import_logger = require("../logger/logger.cjs");
var import_onPageTraversal = require("../livePreview/onPageTraversal.cjs");
var import_compare = require("../timeline/compare/compare.cjs");
var _ContentstackLivePreview = class _ContentstackLivePreview {
  /**
   * Initializes the Live Preview SDK with the provided user configuration.
   * If the SDK is already initialized, subsequent calls to this method will return the existing SDK instance.
   * @param userConfig - The user configuration to initialize the SDK with. See {@link https://github.com/contentstack/live-preview-sdk/blob/main/docs/live-preview-configs.md#initconfig-iconfig|Live preview User config} for more details.
   * @returns A promise that resolves to the constructors of the Live Preview SDK.
   */
  static init(userConfig = (0, import_config.getUserInitData)()) {
    if (typeof window === "undefined") {
      import_logger.PublicLogger.warn("The SDK is not initialized in the browser.");
      return Promise.resolve(_ContentstackLivePreview.previewConstructors);
    }
    import_configManager.default.replace(userConfig);
    (0, import_configManager.updateConfigFromUrl)();
    if (_ContentstackLivePreview.isInitialized()) {
      import_logger.PublicLogger.warn(
        "You have already initialized the Live Preview SDK. So, any subsequent initialization returns the existing SDK instance."
      );
      return Promise.resolve(_ContentstackLivePreview.previewConstructors);
    } else {
      return _ContentstackLivePreview.initializePreview();
    }
  }
  /**
   * It is the live preview hash.
   * This hash could be used when data is fetched manually.
   */
  static get hash() {
    if (!_ContentstackLivePreview.isInitialized()) {
      (0, import_configManager.updateConfigFromUrl)();
    }
    return import_configManager.default.get().hash;
  }
  static isInitialized() {
    return !(0, import_lodash_es.isEmpty)(_ContentstackLivePreview.previewConstructors);
  }
  static initializePreview() {
    _ContentstackLivePreview.previewConstructors = {
      livePreview: new import_live_preview.default(),
      visualBuilder: new import_visualBuilder.VisualBuilder()
    };
    const livePreview = _ContentstackLivePreview.previewConstructors.livePreview;
    Object.entries(_ContentstackLivePreview.onEntryChangeCallbacks).forEach(
      ([callbackUid, callback]) => {
        livePreview.subscribeToOnEntryChange(callback, callbackUid);
      }
    );
    _ContentstackLivePreview.onEntryChangeCallbacks = {};
    (0, import_onPageTraversal.handlePageTraversal)();
    (0, import_compare.handleWebCompare)();
    return Promise.resolve(_ContentstackLivePreview.previewConstructors);
  }
  /**
   * Registers a callback function to be called when an entry changes.
   * @param onChangeCallback The callback function to be called when an entry changes.
   * @param config Optional configuration for the callback.
   * @param config.skipInitialRender If true, the callback will not be called when it is first registered.
   * @returns A unique identifier for the registered callback.
   *
   * @example
   * ```js
   * const callbackUid = ContentstackLivePreview.onEntryChange(() => {
   *    console.log("Entry changed");
   * });
   *
   * // Unsubscribe the callback
   * ContentstackLivePreview.unsubscribeOnEntryChange(callbackUid);
   * ```
   */
  static onEntryChange(onChangeCallback, config = {}) {
    const { skipInitialRender = false } = config;
    const callbackUid = (0, import_uuid.v4)();
    if (_ContentstackLivePreview.isInitialized()) {
      _ContentstackLivePreview.previewConstructors.livePreview.subscribeToOnEntryChange(
        onChangeCallback,
        callbackUid
      );
    } else {
      _ContentstackLivePreview.onEntryChangeCallbacks[callbackUid] = onChangeCallback;
    }
    if (!skipInitialRender) {
      onChangeCallback();
    }
    return callbackUid;
  }
  /**
   * Registers a callback function to be called when there is a change in the entry being edited in live preview mode. The difference between this and `onEntryChange` is that this callback will not be called when it is first registered.
   * @param onChangeCallback The callback function to be called when there is a change in the entry.
   * @returns A unique identifier for the registered callback.
   *
   * @example
   * ```js
   * const callbackUid = ContentstackLivePreview.onLiveEdit(() => {
   *   console.log("Entry changed");
   * });
   *
   * // Unsubscribe the callback
   * ContentstackLivePreview.unsubscribeOnEntryChange(callbackUid);
   * ```
   *
   */
  static onLiveEdit(onChangeCallback) {
    return _ContentstackLivePreview.onEntryChange(onChangeCallback, {
      skipInitialRender: true
    });
  }
  /**
   * Unsubscribes from the entry change event.
   * @param callback - The callback function to be unsubscribed.
   *
   * @example
   * ```js
   * // unsubscribing using the Callback UID
   * const callbackUid = ContentstackLivePreview.onEntryChange(() => {
   *  console.log("Entry changed");
   * });
   *
   * // Unsubscribe the callback
   * ContentstackLivePreview.unsubscribeOnEntryChange(callbackUid);
   * ```
   *
   * @example
   * ```js
   * // unsubscribing using the callback function
   * const callback = () => {console.log("Entry changed")};
   * ContentstackLivePreview.onEntryChange(callback);
   *
   * // Unsubscribe the callback
   * ContentstackLivePreview.unsubscribeOnEntryChange(callback);
   * ```
   *
   * @example
   * ```js
   * // The same is applicable to onLiveEdit
   * const callbackUid = ContentstackLivePreview.onLiveEdit(() => {
   * console.log("Entry changed");
   * });
   *
   * // Unsubscribe the callback
   * ContentstackLivePreview.unsubscribeOnEntryChange(callbackUid);
   * ```
   *
   *
   */
  static unsubscribeOnEntryChange(callback) {
    if (!_ContentstackLivePreview.isInitialized()) {
      (0, import_removeFromOnChangeSubscribers.removeFromOnChangeSubscribers)(
        _ContentstackLivePreview.onEntryChangeCallbacks,
        callback
      );
      return;
    }
    _ContentstackLivePreview.previewConstructors.livePreview.unsubscribeOnEntryChange(
      callback
    );
  }
  /**
   * Retrieves the version of the SDK.
   * @returns The version of the SDK as a string.
   */
  static getSdkVersion() {
    return "3.0.0";
  }
};
_ContentstackLivePreview.previewConstructors = {};
/**
 * The subscribers for the onEntryChange event. We store them here when the SDK is not initialized.
 */
_ContentstackLivePreview.onEntryChangeCallbacks = {};
var ContentstackLivePreview = _ContentstackLivePreview;
var contentstack_live_preview_HOC_default = ContentstackLivePreview;
//# sourceMappingURL=contentstack-live-preview-HOC.cjs.map