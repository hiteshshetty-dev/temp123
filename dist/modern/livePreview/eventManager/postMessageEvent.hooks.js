import "../../chunk-5WRI5ZAA.js";

// src/livePreview/eventManager/postMessageEvent.hooks.ts
import Config, { setConfigFromParams } from "../../configManager/configManager.js";
import { ILivePreviewWindowType } from "../../types/types.js";
import { addParamsToUrl } from "../../utils/index.js";
import livePreviewPostMessage from "./livePreviewEventManager.js";
import { LIVE_PREVIEW_POST_MESSAGE_EVENTS } from "./livePreviewEventManager.constant.js";
function useHistoryPostMessageEvent() {
  livePreviewPostMessage?.on(
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
  livePreviewPostMessage?.on(
    LIVE_PREVIEW_POST_MESSAGE_EVENTS.ON_CHANGE,
    (event) => {
      setConfigFromParams({
        live_preview: event.data.hash
      });
      const { ssr, onChange } = Config.get();
      if (!ssr) {
        onChange();
      }
    }
  );
}
function sendInitializeLivePreviewPostMessageEvent() {
  livePreviewPostMessage?.send(
    LIVE_PREVIEW_POST_MESSAGE_EVENTS.INIT,
    {
      config: {
        shouldReload: Config.get().ssr,
        href: window.location.href,
        sdkVersion: "3.0.1",
        mode: Config.get().mode
      }
    }
  ).then((data) => {
    const {
      contentTypeUid,
      entryUid,
      windowType = ILivePreviewWindowType.PREVIEW
    } = data || {};
    if (Config?.get()?.windowType && Config.get().windowType === ILivePreviewWindowType.BUILDER) {
      return;
    }
    if (contentTypeUid && entryUid) {
      setConfigFromParams({
        content_type_uid: contentTypeUid,
        entry_uid: entryUid
      });
    } else {
    }
    if (Config.get().ssr) {
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
  livePreviewPostMessage?.send(LIVE_PREVIEW_POST_MESSAGE_EVENTS.CHECK_ENTRY_PAGE, {
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