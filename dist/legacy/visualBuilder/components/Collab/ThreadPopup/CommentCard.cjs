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

// src/visualBuilder/components/Collab/ThreadPopup/CommentCard.tsx
var CommentCard_exports = {};
__export(CommentCard_exports, {
  default: () => CommentCard_default
});
module.exports = __toCommonJS(CommentCard_exports);
var import_hooks = require("preact/hooks");
var import_CommentTextArea = __toESM(require("./CommentTextArea.cjs"), 1);
var import_collabUtils = require("../../../utils/collabUtils.cjs");
var import_CommentActionBar = __toESM(require("./CommentActionBar.cjs"), 1);
var import_CommentResolvedText = __toESM(require("./CommentResolvedText.cjs"), 1);
var import_Avatar = __toESM(require("../Avatar/Avatar.cjs"), 1);
var import_ThreadBody = __toESM(require("./loader/ThreadBody.cjs"), 1);
var import_collab = require("../../../collab.style.cjs");
var import_classnames = __toESM(require("classnames"), 1);
var import_jsx_runtime = require("preact/jsx-runtime");
var formatCommentDate = (comment) => {
  return comment ? (0, import_collabUtils.formatDate)(comment.updatedAt || comment.createdAt) : "";
};
var CommentCard = ({
  userState,
  comment,
  onClose,
  handleOnSaveRef,
  mode
}) => {
  const [commentUser, setCommentUser] = (0, import_hooks.useState)(null);
  const [isHovered, setIsHovered] = (0, import_hooks.useState)(false);
  (0, import_hooks.useEffect)(() => {
    setCommentUser(
      comment ? userState.userMap[comment.createdBy] : userState.currentUser
    );
  }, [comment, userState]);
  const formattedDate = (0, import_hooks.useMemo)(() => formatCommentDate(comment), [comment]);
  if (!commentUser) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ThreadBody.default, {}, "collab-thread-body--comment-loader");
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: (0, import_classnames.default)(
        "collab-thread-comment--wrapper",
        (0, import_collab.collabStyles)()["collab-thread-comment--wrapper"]
      ),
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "div",
          {
            className: (0, import_classnames.default)(
              "collab-thread-comment--user-details",
              "flex-v-center",
              (0, import_collab.collabStyles)()["collab-thread-comment--user-details"],
              import_collab.flexAlignCenter
            ),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                import_Avatar.default,
                {
                  avatar: {
                    name: (0, import_collabUtils.getUserName)(commentUser),
                    id: commentUser.uid
                  }
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "div",
                {
                  className: (0, import_classnames.default)(
                    "collab-thread-comment--user-details__text",
                    (0, import_collab.collabStyles)()["collab-thread-comment--user-details__text"]
                  ),
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      "div",
                      {
                        className: (0, import_classnames.default)(
                          "collab-thread-comment--user-name",
                          (0, import_collab.collabStyles)()["collab-thread-comment--user-name"]
                        ),
                        children: (0, import_collabUtils.getUserName)(commentUser)
                      }
                    ),
                    comment && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      "div",
                      {
                        className: (0, import_classnames.default)(
                          "collab-thread-comment--time-details",
                          (0, import_collab.collabStyles)()["collab-thread-comment--time-details"]
                        ),
                        children: formattedDate
                      }
                    )
                  ]
                }
              ),
              isHovered && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                import_CommentActionBar.default,
                {
                  mode,
                  commentUser,
                  currentUser: userState.currentUser,
                  commentUID: comment == null ? void 0 : comment._id
                }
              )
            ]
          }
        ),
        mode === "edit" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_CommentTextArea.default,
          {
            onClose,
            userState,
            handleOnSaveRef,
            comment
          }
        ) : comment && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_CommentResolvedText.default,
          {
            comment,
            userState
          }
        )
      ]
    }
  );
};
var CommentCard_default = CommentCard;
//# sourceMappingURL=CommentCard.cjs.map