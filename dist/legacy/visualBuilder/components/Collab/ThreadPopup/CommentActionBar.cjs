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

// src/visualBuilder/components/Collab/ThreadPopup/CommentActionBar.tsx
var CommentActionBar_exports = {};
__export(CommentActionBar_exports, {
  default: () => CommentActionBar_default
});
module.exports = __toCommonJS(CommentActionBar_exports);
var import_hooks = require("preact/hooks");
var import_Icon = __toESM(require("../Icon/Icon.cjs"), 1);
var import_ContextProvider = require("./ContextProvider/index.cjs");
var import_collab = require("../../../collab.style.cjs");
var import_classnames = __toESM(require("classnames"), 1);
var import_jsx_runtime = require("preact/jsx-runtime");
var CommentActionBar = ({
  mode,
  commentUser,
  currentUser,
  commentUID
}) => {
  const { setThreadState, onDeleteComment, activeThread, onDeleteThread } = (0, import_hooks.useContext)(import_ContextProvider.ThreadProvider);
  const [isDeleting, setIsDeleting] = (0, import_hooks.useState)(false);
  const setEditComment = (uid) => {
    setThreadState((prevState) => ({
      ...prevState,
      editComment: uid || ""
    }));
  };
  const handleCancel = () => {
    setEditComment(null);
  };
  const handleCommentEdit = () => {
    if (commentUID) {
      setEditComment(commentUID);
    }
  };
  const handleCommentDelete = async () => {
    if (!commentUID || isDeleting) {
      return;
    }
    setIsDeleting(true);
    try {
      const deleteResponse = await onDeleteComment({
        threadUid: activeThread == null ? void 0 : activeThread._id,
        commentUid: commentUID
      });
      setThreadState((prevState) => {
        const updatedComments = prevState.comments.filter(
          (comment) => comment._id !== commentUID
        );
        if (prevState.commentCount - 1 === 0) {
          onDeleteThread({ threadUid: activeThread == null ? void 0 : activeThread._id });
        }
        return {
          ...prevState,
          comments: updatedComments,
          commentCount: prevState.commentCount - 1
        };
      });
    } catch (error) {
    } finally {
      setIsDeleting(false);
    }
  };
  if (mode === "edit" && commentUID) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        className: (0, import_classnames.default)(
          "collab-thread-comment-action--wrapper",
          (0, import_collab.collabStyles)()["collab-thread-comment-action--wrapper"]
        ),
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_Icon.default,
          {
            icon: "Cancel",
            withTooltip: true,
            tooltipContent: "Cancel",
            onClick: handleCancel
          }
        )
      }
    );
  }
  if ((commentUser == null ? void 0 : commentUser.uid) !== (currentUser == null ? void 0 : currentUser.uid) || !commentUID) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: (0, import_classnames.default)(
        "collab-thread-comment-action--wrapper",
        (0, import_collab.collabStyles)()["collab-thread-comment-action--wrapper"]
      ),
      "data-testid": "collab-thread-comment-action--wrapper",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_Icon.default,
          {
            icon: "Edit",
            tooltipContent: "Edit",
            withTooltip: true,
            testId: "collab-thread-comment-edit",
            onClick: handleCommentEdit
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_Icon.default,
          {
            icon: "Delete",
            tooltipContent: "Delete",
            withTooltip: true,
            testId: "collab-thread-comment-delete",
            onClick: handleCommentDelete,
            disabled: isDeleting
          }
        )
      ]
    }
  );
};
var CommentActionBar_default = CommentActionBar;
//# sourceMappingURL=CommentActionBar.cjs.map