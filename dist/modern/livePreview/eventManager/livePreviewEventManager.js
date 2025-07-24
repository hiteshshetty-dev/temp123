import {
  require_dist
} from "../../chunk-LNSFZGX4.js";
import {
  __toESM
} from "../../chunk-5WRI5ZAA.js";

// src/livePreview/eventManager/livePreviewEventManager.ts
var import_advanced_post_message = __toESM(require_dist(), 1);
import { LIVE_PREVIEW_CHANNEL_ID } from "./livePreviewEventManager.constant.js";
var livePreviewPostMessage;
if (typeof window !== "undefined") {
  livePreviewPostMessage = new import_advanced_post_message.EventManager(LIVE_PREVIEW_CHANNEL_ID, {
    target: window.parent,
    debug: false,
    suppressErrors: true
  });
}
var livePreviewEventManager_default = livePreviewPostMessage;
export {
  livePreviewEventManager_default as default
};
//# sourceMappingURL=livePreviewEventManager.js.map