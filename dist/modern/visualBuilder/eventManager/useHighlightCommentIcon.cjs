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

// src/visualBuilder/eventManager/useHighlightCommentIcon.ts
var useHighlightCommentIcon_exports = {};
__export(useHighlightCommentIcon_exports, {
  useHighlightCommentIcon: () => useHighlightCommentIcon
});
module.exports = __toCommonJS(useHighlightCommentIcon_exports);
var import_visualBuilderPostMessage = __toESM(require("../utils/visualBuilderPostMessage.cjs"), 1);
var import_postMessage = require("../utils/types/postMessage.types.cjs");
var import_generateHighlightedComment = require("../generators/generateHighlightedComment.cjs");
var handleAddCommentIcons = (event) => {
  const { payload } = event.data;
  (0, import_generateHighlightedComment.highlightCommentIconOnCanvas)(payload);
};
var handleRemoveCommentIcons = () => {
  (0, import_generateHighlightedComment.removeAllHighlightedCommentIcons)();
};
var useHighlightCommentIcon = () => {
  import_visualBuilderPostMessage.default?.on(
    import_postMessage.VisualBuilderPostMessageEvents.HIGHLIGHT_ACTIVE_COMMENTS,
    handleAddCommentIcons
  );
  import_visualBuilderPostMessage.default?.on(
    import_postMessage.VisualBuilderPostMessageEvents.REMOVE_HIGHLIGHTED_COMMENTS,
    handleRemoveCommentIcons
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useHighlightCommentIcon
});
//# sourceMappingURL=useHighlightCommentIcon.cjs.map