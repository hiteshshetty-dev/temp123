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

// src/visualBuilder/components/Collab/ThreadPopup/CommentResolvedText.tsx
var CommentResolvedText_exports = {};
__export(CommentResolvedText_exports, {
  default: () => CommentResolvedText_default
});
module.exports = __toCommonJS(CommentResolvedText_exports);
var import_hooks = require("preact/hooks");
var import_collabUtils = require("../../../utils/collabUtils.cjs");
var import_collab = require("../../../collab.style.cjs");
var import_classnames = __toESM(require("classnames"), 1);
var import_jsx_runtime = require("preact/jsx-runtime");
var CommentResolvedText = ({ comment, userState }) => {
  const sanitizedText = (0, import_hooks.useMemo)(() => {
    return (0, import_collabUtils.getMessageWithDisplayName)(comment, userState, "html") ?? "";
  }, [comment.message, userState.userMap, comment.toUsers]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      "data-testid": "collab-thread-comment--message",
      className: (0, import_classnames.default)(
        "collab-thread-comment--message",
        (0, import_collab.collabStyles)()["collab-thread-comment--message"]
      ),
      dangerouslySetInnerHTML: { __html: sanitizedText }
    }
  );
};
var CommentResolvedText_default = CommentResolvedText;
//# sourceMappingURL=CommentResolvedText.cjs.map