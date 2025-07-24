import {
  require_dist
} from "../../chunk-LNSFZGX4.js";
import {
  __toESM
} from "../../chunk-5WRI5ZAA.js";

// src/timeline/timelinePostMessage/timelinePostMessage.ts
var import_advanced_post_message = __toESM(require_dist(), 1);
import { TIMELINE_CHANNEL_ID } from "./timelinePostMessage.constant.js";
var timelinePostMessage;
if (typeof window !== "undefined") {
  timelinePostMessage = new import_advanced_post_message.EventManager(TIMELINE_CHANNEL_ID, {
    target: window.parent,
    debug: false
  });
}
var timelinePostMessage_default = timelinePostMessage;
export {
  timelinePostMessage_default as default
};
//# sourceMappingURL=timelinePostMessage.js.map