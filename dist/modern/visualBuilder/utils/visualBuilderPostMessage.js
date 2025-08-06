import {
  require_dist
} from "../../chunk-LNSFZGX4.js";
import {
  __toESM
} from "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/visualBuilderPostMessage.ts
var import_advanced_post_message = __toESM(require_dist(), 1);
import { VISUAL_BUILDER_CHANNEL_ID } from "./constants.js";
var visualBuilderPostMessage;
if (typeof window !== "undefined") {
  visualBuilderPostMessage = new import_advanced_post_message.EventManager(VISUAL_BUILDER_CHANNEL_ID, {
    target: window.parent,
    debug: false
    // suppressErrors: true,
  });
}
var visualBuilderPostMessage_default = visualBuilderPostMessage;
export {
  visualBuilderPostMessage_default as default
};
//# sourceMappingURL=visualBuilderPostMessage.js.map