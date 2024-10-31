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

// src/visualBuilder/utils/types/postMessage.types.ts
var postMessage_types_exports = {};
__export(postMessage_types_exports, {
  VisualBuilderPostMessageEvents: () => VisualBuilderPostMessageEvents
});
module.exports = __toCommonJS(postMessage_types_exports);
var VisualBuilderPostMessageEvents = /* @__PURE__ */ ((VisualBuilderPostMessageEvents2) => {
  VisualBuilderPostMessageEvents2["INIT"] = "init";
  VisualBuilderPostMessageEvents2["ADD_INSTANCE"] = "add-instance";
  VisualBuilderPostMessageEvents2["UPDATE_FIELD"] = "update-field";
  VisualBuilderPostMessageEvents2["SYNC_FIELD"] = "sync-field";
  VisualBuilderPostMessageEvents2["OPEN_ASSET_MODAL"] = "open-asset-modal";
  VisualBuilderPostMessageEvents2["OPEN_REFERENCE_MODAL"] = "open-reference-modal";
  VisualBuilderPostMessageEvents2["OPEN_QUICK_FORM"] = "open-quick-form";
  VisualBuilderPostMessageEvents2["TOGGLE_FORM"] = "toggle-quick-form";
  VisualBuilderPostMessageEvents2["GET_FIELD_SCHEMA"] = "get-field-schema";
  VisualBuilderPostMessageEvents2["GET_FIELD_DATA"] = "get-field-data";
  VisualBuilderPostMessageEvents2["GET_FIELD_PATH_WITH_UID"] = "get-field-path-with-uid";
  VisualBuilderPostMessageEvents2["GET_FIELD_DISPLAY_NAMES"] = "get-field-display-names";
  VisualBuilderPostMessageEvents2["MOUSE_CLICK"] = "mouse-click";
  VisualBuilderPostMessageEvents2["FOCUS_FIELD"] = "focus-field";
  VisualBuilderPostMessageEvents2["OPEN_FIELD_EDIT_MODAL"] = "open-field-edit-modal";
  VisualBuilderPostMessageEvents2["DELETE_INSTANCE"] = "delete-instance";
  VisualBuilderPostMessageEvents2["MOVE_INSTANCE"] = "move-instance";
  VisualBuilderPostMessageEvents2["GET_DISCUSSION_ID"] = "get-discussion-id-for-comment-modal";
  VisualBuilderPostMessageEvents2["OPEN_FIELD_COMMENT_MODAL"] = "open-field-comment-modal";
  VisualBuilderPostMessageEvents2["GET_ALL_ENTRIES_IN_CURRENT_PAGE"] = "get-entries-in-current-page";
  VisualBuilderPostMessageEvents2["HIDE_FOCUS_OVERLAY"] = "hide-focus-overlay";
  VisualBuilderPostMessageEvents2["SHOW_DRAFT_FIELDS"] = "show-draft-fields";
  VisualBuilderPostMessageEvents2["REMOVE_DRAFT_FIELDS"] = "remove-draft-fields";
  VisualBuilderPostMessageEvents2["SHOW_VARIANT_FIELDS"] = "show-variant-fields";
  VisualBuilderPostMessageEvents2["REMOVE_VARIANT_FIELDS"] = "remove-variant-fields";
  VisualBuilderPostMessageEvents2["SET_AUDIENCE_MODE"] = "set-audience-mode";
  VisualBuilderPostMessageEvents2["UPDATE_DISCUSSION_ID"] = "update-discussion-id-for-focus-field";
  VisualBuilderPostMessageEvents2["SCROLL_TO_FIELD"] = "scroll-to-view-field-by-cslp-value";
  VisualBuilderPostMessageEvents2["HIGHLIGHT_ACTIVE_COMMENTS"] = "highlight-active-comments-by-data-cs";
  VisualBuilderPostMessageEvents2["REMOVE_HIGHLIGHTED_COMMENTS"] = "remove-highlighted-comments";
  VisualBuilderPostMessageEvents2["GET_VARIANT_ID"] = "get-variant-id";
  VisualBuilderPostMessageEvents2["GET_LOCALE"] = "get-locale";
  VisualBuilderPostMessageEvents2["SEND_VARIANT_AND_LOCALE"] = "send-variant-and-locale";
  return VisualBuilderPostMessageEvents2;
})(VisualBuilderPostMessageEvents || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  VisualBuilderPostMessageEvents
});
//# sourceMappingURL=postMessage.types.cjs.map