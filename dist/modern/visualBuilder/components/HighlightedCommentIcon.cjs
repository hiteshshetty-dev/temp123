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

// src/visualBuilder/components/HighlightedCommentIcon.tsx
var HighlightedCommentIcon_exports = {};
__export(HighlightedCommentIcon_exports, {
  default: () => HighlightedCommentIcon_default
});
module.exports = __toCommonJS(HighlightedCommentIcon_exports);
var import_icons = require("./icons/index.cjs");
var import_visualBuilderPostMessage = __toESM(require("../utils/visualBuilderPostMessage.cjs"), 1);
var import_postMessage = require("../utils/types/postMessage.types.cjs");
var import_configManager = __toESM(require("../../configManager/configManager.cjs"), 1);
var import_generateThread = require("../generators/generateThread.cjs");
var import_jsx_runtime = require("preact/jsx-runtime");
var HighlightedCommentIcon = (props) => {
  const { data } = props;
  const config = import_configManager.default.get();
  const handleCommentModal = async () => {
    import_visualBuilderPostMessage.default?.send(
      import_postMessage.VisualBuilderPostMessageEvents.OPEN_FIELD_COMMENT_MODAL,
      {
        fieldMetadata: data?.fieldMetadata,
        discussion: data?.discussion,
        fieldSchema: data?.fieldSchema,
        absolutePath: data.absolutePath
      }
    );
    (0, import_generateThread.toggleCollabPopup)({ threadUid: "", action: "close" });
    import_configManager.default.set("collab.isFeedbackMode", true);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "collab-icon", onClick: handleCommentModal, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons.HighlightCommentIcon, {}) });
};
var HighlightedCommentIcon_default = HighlightedCommentIcon;
//# sourceMappingURL=HighlightedCommentIcon.cjs.map