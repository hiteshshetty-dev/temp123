import "../../chunk-5WRI5ZAA.js";

// src/livePreview/eventManager/postMessageEvent.hooks.ts
import { isOpeningInNewTab } from "../../common/inIframe.js";
import Config, { setConfigFromParams } from "../../configManager/configManager.js";
import { PublicLogger } from "../../logger/logger.js";
import { ILivePreviewWindowType } from "../../types/types.js";
import { addParamsToUrl, isOpeningInTimeline } from "../../utils/index.js";
import livePreviewPostMessage from "./livePreviewEventManager.js";
import { LIVE_PREVIEW_POST_MESSAGE_EVENTS } from "./livePreviewEventManager.constant.js";
import {
  OnChangeLivePreviewPostMessageEventTypes
} from "./types/livePreviewPostMessageEvent.type.js";
function useHistoryPostMessageEvent() {
  var _a;
  (_a = livePreviewPostMessage) == null ? void 0 : _a.on(
    LIVE_PREVIEW_POST_MESSAGE_EVENTS.HISTORY,
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
  var _a;
  (_a = livePreviewPostMessage) == null ? void 0 : _a.on(
    LIVE_PREVIEW_POST_MESSAGE_EVENTS.ON_CHANGE,
    (event) => {
      var _a2;
      try {
        const { ssr, onChange } = Config.get();
        const event_type = (_a2 = event.data._metadata) == null ? void 0 : _a2.event_type;
        setConfigFromParams({
          live_preview: event.data.hash
        });
        if (!ssr && !event_type) {
          onChange();
        }
        if (isOpeningInNewTab()) {
          if (!window) {
            PublicLogger.error("window is not defined");
            return;
          }
          ;
          if (ssr && !event_type) {
            if (window.location.href.includes("live_preview")) {
              window.location.reload();
            } else {
              const url = new URL(window.location.href);
              url.searchParams.set("live_preview", event.data.hash);
              url.searchParams.set("content_type_uid", Config.get().stackDetails.contentTypeUid || "");
              url.searchParams.set("entry_uid", Config.get().stackDetails.entryUid || "");
              window.location.href = url.toString();
            }
          }
          if (event_type === OnChangeLivePreviewPostMessageEventTypes.HASH_CHANGE) {
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set("live_preview", event.data.hash);
            window.history.pushState({}, "", newUrl.toString());
          }
          if (event_type === OnChangeLivePreviewPostMessageEventTypes.URL_CHANGE && event.data.url) {
            window.location.href = event.data.url;
          }
        }
      } catch (error) {
        PublicLogger.error("Error handling live preview update:", error);
        return;
      }
    }
  );
}
function sendInitializeLivePreviewPostMessageEvent() {
  var _a;
  (_a = livePreviewPostMessage) == null ? void 0 : _a.send(
    LIVE_PREVIEW_POST_MESSAGE_EVENTS.INIT,
    {
      config: {
        shouldReload: Config.get().ssr,
        href: window.location.href,
        sdkVersion: "4.0.1",
        mode: Config.get().mode
      }
    }
  ).then((data) => {
    var _a2, _b;
    const {
      contentTypeUid,
      entryUid,
      windowType = ILivePreviewWindowType.PREVIEW
    } = data || {};
    if (((_b = (_a2 = Config) == null ? void 0 : _a2.get()) == null ? void 0 : _b.windowType) && Config.get().windowType === ILivePreviewWindowType.BUILDER) {
      return;
    }
    if (contentTypeUid && entryUid) {
      setConfigFromParams({
        content_type_uid: contentTypeUid,
        entry_uid: entryUid
      });
    } else {
    }
    if (Config.get().ssr || isOpeningInTimeline() || isOpeningInNewTab()) {
      addParamsToUrl();
    }
    Config.set("windowType", windowType);
    if (!Config.get().ssr) {
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
  var _a;
  (_a = livePreviewPostMessage) == null ? void 0 : _a.send(LIVE_PREVIEW_POST_MESSAGE_EVENTS.CHECK_ENTRY_PAGE, {
    href: window.location.href
  }).catch(() => {
  });
}
export {
  sendInitializeLivePreviewPostMessageEvent,
  useHistoryPostMessageEvent,
  useOnEntryUpdatePostMessageEvent
};
//# sourceMappingURL=postMessageEvent.hooks.js.map