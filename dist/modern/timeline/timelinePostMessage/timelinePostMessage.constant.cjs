"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/timeline/timelinePostMessage/timelinePostMessage.constant.ts
var timelinePostMessage_constant_exports = {};
__export(timelinePostMessage_constant_exports, {
  TIMELINE_CHANNEL_ID: () => TIMELINE_CHANNEL_ID,
  timelinePostMessageEvents: () => timelinePostMessageEvents
});
module.exports = __toCommonJS(timelinePostMessage_constant_exports);
var TIMELINE_CHANNEL_ID = "timeline";
var timelinePostMessageEvents = {
  SEND_CURRENT_BASE_ROUTE: "send-current-base-route",
  SEND_CSLP_DATA: "send-cslp-data",
  DIFF_VALUE: "diff-value",
  REMOVE_DIFF: "remove-diff"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TIMELINE_CHANNEL_ID,
  timelinePostMessageEvents
});
//# sourceMappingURL=timelinePostMessage.constant.cjs.map