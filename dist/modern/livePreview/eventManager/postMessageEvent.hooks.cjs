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

// src/livePreview/eventManager/postMessageEvent.hooks.ts
var postMessageEvent_hooks_exports = {};
__export(postMessageEvent_hooks_exports, {
  sendInitializeLivePreviewPostMessageEvent: () => sendInitializeLivePreviewPostMessageEvent,
  useHistoryPostMessageEvent: () => useHistoryPostMessageEvent,
  useOnEntryUpdatePostMessageEvent: () => useOnEntryUpdatePostMessageEvent
});
module.exports = __toCommonJS(postMessageEvent_hooks_exports);
var import_inIframe = require("../../common/inIframe.cjs");
var import_configManager = __toESM(require("../../configManager/configManager.cjs"), 1);
var import_logger = require("../../logger/logger.cjs");
var import_types = require("../../types/types.cjs");
var import_utils = require("../../utils/index.cjs");
var import_livePreviewEventManager = __toESM(require("./livePreviewEventManager.cjs"), 1);
var import_livePreviewEventManager2 = require("./livePreviewEventManager.constant.cjs");
var import_livePreviewPostMessageEvent = require("./types/livePreviewPostMessageEvent.type.cjs");
function useHistoryPostMessageEvent() {
  import_livePreviewEventManager.default?.on(
    import_livePreviewEventManager2.LIVE_PREVIEW_POST_MESSAGE_EVENTS.HISTORY,
    (event) => {
      switch (event.data.type) {
        case "forward": {
          window.history.forward();
          break;
        }
        case "backward": {
          window.history.back();
          break;
        }
        case "reload": {
          window.history.go();
          break;
        }
        default: {
          const exhaustiveCheck = event.data.type;
          throw new Error(`Unhandled event: ${exhaustiveCheck}`);
        }
      }
    }
  );
}
function useOnEntryUpdatePostMessageEvent() {
  import_livePreviewEventManager.default?.on(
    import_livePreviewEventManager2.LIVE_PREVIEW_POST_MESSAGE_EVENTS.ON_CHANGE,
    (event) => {
      try {
        const { ssr, onChange } = import_configManager.default.get();
        const event_type = event.data._metadata?.event_type;
        (0, import_configManager.setConfigFromParams)({
          live_preview: event.data.hash
        });
        if (!ssr && !event_type) {
          onChange();
        }
        if ((0, import_inIframe.isOpeningInNewTab)()) {
          if (!window) {
            import_logger.PublicLogger.error("window is not defined");
            return;
          }
          ;
          if (ssr && !event_type) {
            if (window.location.href.includes("live_preview")) {
              window.location.reload();
            } else {
              const url = new URL(window.location.href);
              url.searchParams.set("live_preview", event.data.hash);
              url.searchParams.set("content_type_uid", import_configManager.default.get().stackDetails.contentTypeUid || "");
              url.searchParams.set("entry_uid", import_configManager.default.get().stackDetails.entryUid || "");
              window.location.href = url.toString();
            }
          }
          if (event_type === import_livePreviewPostMessageEvent.OnChangeLivePreviewPostMessageEventTypes.HASH_CHANGE) {
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set("live_preview", event.data.hash);
            window.history.pushState({}, "", newUrl.toString());
          }
          if (event_type === import_livePreviewPostMessageEvent.OnChangeLivePreviewPostMessageEventTypes.URL_CHANGE && event.data.url) {
            window.location.href = event.data.url;
          }
        }
      } catch (error) {
        import_logger.PublicLogger.error("Error handling live preview update:", error);
        return;
      }
    }
  );
}
function sendInitializeLivePreviewPostMessageEvent() {
  import_livePreviewEventManager.default?.send(
    import_livePreviewEventManager2.LIVE_PREVIEW_POST_MESSAGE_EVENTS.INIT,
    {
      config: {
        shouldReload: import_configManager.default.get().ssr,
        href: window.location.href,
        sdkVersion: "4.0.0",
        mode: import_configManager.default.get().mode
      }
    }
  ).then((data) => {
    const {
      contentTypeUid,
      entryUid,
      windowType = import_types.ILivePreviewWindowType.PREVIEW
    } = data || {};
    if (import_configManager.default?.get()?.windowType && import_configManager.default.get().windowType === import_types.ILivePreviewWindowType.BUILDER) {
      return;
    }
    if (contentTypeUid && entryUid) {
      (0, import_configManager.setConfigFromParams)({
        content_type_uid: contentTypeUid,
        entry_uid: entryUid
      });
    } else {
    }
    if (import_configManager.default.get().ssr || (0, import_utils.isOpeningInTimeline)() || (0, import_inIframe.isOpeningInNewTab)()) {
      (0, import_utils.addParamsToUrl)();
    }
    import_configManager.default.set("windowType", windowType);
    if (!import_configManager.default.get().ssr) {
      setInterval(() => {
        sendCurrentPageUrlPostMessageEvent();
      }, 1500);
    }
    useHistoryPostMessageEvent();
    useOnEntryUpdatePostMessageEvent();
  }).catch((e) => {
  });
}
function sendCurrentPageUrlPostMessageEvent() {
  import_livePreviewEventManager.default?.send(import_livePreviewEventManager2.LIVE_PREVIEW_POST_MESSAGE_EVENTS.CHECK_ENTRY_PAGE, {
    href: window.location.href
  }).catch(() => {
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sendInitializeLivePreviewPostMessageEvent,
  useHistoryPostMessageEvent,
  useOnEntryUpdatePostMessageEvent
});
//# sourceMappingURL=postMessageEvent.hooks.cjs.map