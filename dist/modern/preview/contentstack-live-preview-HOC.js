import "../chunk-5WRI5ZAA.js";

// src/preview/contentstack-live-preview-HOC.ts
import { cloneDeep, isEmpty, pick } from "lodash-es";
import { v4 as uuidv4 } from "uuid";
import { getUserInitData } from "../configManager/config.default.js";
import Config, { updateConfigFromUrl } from "../configManager/configManager.js";
import LivePreview from "../livePreview/live-preview.js";
import { handlePageTraversal } from "../livePreview/onPageTraversal.js";
import { removeFromOnChangeSubscribers } from "../livePreview/removeFromOnChangeSubscribers.js";
import { PublicLogger } from "../logger/logger.js";
import { handleWebCompare } from "../timeline/compare/compare.js";
import { VisualBuilder } from "../visualBuilder/index.js";
var _ContentstackLivePreview = class _ContentstackLivePreview {
  /**
   * Initializes the Live Preview SDK with the provided user configuration.
   * If the SDK is already initialized, subsequent calls to this method will return the existing SDK instance.
   * @param userConfig - The user configuration to initialize the SDK with. See {@link https://github.com/contentstack/live-preview-sdk/blob/main/docs/live-preview-configs.md#initconfig-iconfig|Live preview User config} for more details.
   * @returns A promise that resolves to the constructors of the Live Preview SDK.
   */
  static init(userConfig = getUserInitData()) {
    if (typeof window === "undefined") {
      PublicLogger.warn("The SDK is not initialized in the browser.");
      return Promise.resolve(_ContentstackLivePreview.previewConstructors);
    }
    Config.replace(userConfig);
    updateConfigFromUrl();
    if (_ContentstackLivePreview.isInitialized()) {
      PublicLogger.warn(
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
      updateConfigFromUrl();
    }
    return Config.get().hash;
  }
  static get config() {
    if (!_ContentstackLivePreview.isInitialized()) {
      updateConfigFromUrl();
    }
    const config = Config.get();
    const clonedConfig = cloneDeep(config);
    const configToShare = pick(clonedConfig, [
      "ssr",
      "enable",
      "cleanCslpOnProduction",
      "stackDetails",
      "clientUrlParams",
      "windowType",
      "hash",
      "editButton",
      "mode"
    ]);
    return configToShare;
  }
  static isInitialized() {
    return !isEmpty(_ContentstackLivePreview.previewConstructors);
  }
  static initializePreview() {
    _ContentstackLivePreview.previewConstructors = {
      livePreview: new LivePreview(),
      visualBuilder: new VisualBuilder()
    };
    const livePreview = _ContentstackLivePreview.previewConstructors.livePreview;
    Object.entries(_ContentstackLivePreview.onEntryChangeCallbacks).forEach(
      ([callbackUid, callback]) => {
        livePreview.subscribeToOnEntryChange(callback, callbackUid);
      }
    );
    _ContentstackLivePreview.onEntryChangeCallbacks = {};
    handlePageTraversal();
    handleWebCompare();
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
    const callbackUid = uuidv4();
    if (_ContentstackLivePreview.isInitialized()) {
      _ContentstackLivePreview.previewConstructors.livePreview.subscribeToOnEntryChange(
        onChangeCallback,
        callbackUid
      );
    } else {
      _ContentstackLivePreview.onEntryChangeCallbacks[callbackUid] = onChangeCallback;
    }
    const searchParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
    const hasLivePreviewHash = searchParams && searchParams.has("live_preview");
    const isBuilder = searchParams && searchParams.has("builder");
    const shouldCallCallback = hasLivePreviewHash && isBuilder;
    if (!skipInitialRender || shouldCallCallback) {
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
      removeFromOnChangeSubscribers(
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
    return "3.2.2";
  }
};
_ContentstackLivePreview.previewConstructors = {};
/**
 * The subscribers for the onEntryChange event. We store them here when the SDK is not initialized.
 */
_ContentstackLivePreview.onEntryChangeCallbacks = {};
var ContentstackLivePreview = _ContentstackLivePreview;
var contentstack_live_preview_HOC_default = ContentstackLivePreview;
export {
  contentstack_live_preview_HOC_default as default
};
//# sourceMappingURL=contentstack-live-preview-HOC.js.map