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

// src/visualBuilder/components/Collab/ThreadPopup/ThreadBody.tsx
var ThreadBody_exports = {};
__export(ThreadBody_exports, {
  default: () => ThreadBody_default
});
module.exports = __toCommonJS(ThreadBody_exports);
var import_compat = __toESM(require("preact/compat"), 1);
var import_ThreadBody = __toESM(require("./loader/ThreadBody.cjs"), 1);
var import_CommentCard = __toESM(require("./CommentCard.cjs"), 1);
var import_classnames = __toESM(require("classnames"), 1);
var import_collab = require("../../../collab.style.cjs");
var import_jsx_runtime = require("preact/jsx-runtime");
var Loader = ({ isLoading, children }) => {
  return isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ThreadBody.default, {}, "collab-thread-body--comment-loader") : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
};
var CommentList = ({
  comments,
  userState,
  onClose,
  handleOnSaveRef,
  editComment,
  fetchingMore
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: (0, import_classnames.default)(
        "collab-thread-comment--list",
        (0, import_collab.collabStyles)()["collab-thread-comment--list"]
      ),
      id: "collab-thread-comment--list",
      children: [
        comments == null ? void 0 : comments.map((comment) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              className: (0, import_classnames.default)(
                "collab-thread-comment-seperator",
                "flex-v-center",
                (0, import_collab.collabStyles)()["collab-thread-comment-seperator"],
                import_collab.flexAlignCenter
              ),
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "svg",
                {
                  class: "collab-thread-comment-seperator--svg",
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "100%",
                  height: "2",
                  viewBox: "0 0 332 2",
                  fill: "none",
                  preserveAspectRatio: "none",
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "path",
                    {
                      d: "M0 1H332",
                      stroke: "#DDE3EE",
                      strokeDasharray: "2 2"
                    }
                  )
                }
              )
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_CommentCard.default,
            {
              userState,
              comment,
              onClose,
              handleOnSaveRef,
              mode: editComment === comment._id ? "edit" : "view"
            }
          )
        ] })),
        fetchingMore && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ThreadBody.default, {})
      ]
    }
  );
};
var ThreadBody = import_compat.default.memo(
  ({
    handleOnSaveRef,
    onClose,
    userState,
    isLoading,
    comments,
    fetchingMore,
    editComment
  }) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        className: (0, import_classnames.default)(
          "collab-thread-body--wrapper",
          (0, import_collab.collabStyles)()["collab-thread-body--wrapper"]
        ),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Loader, { isLoading, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            CommentList,
            {
              comments,
              userState,
              onClose,
              handleOnSaveRef,
              editComment,
              fetchingMore
            }
          ) }),
          editComment === "" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_CommentCard.default,
            {
              userState,
              comment: null,
              onClose,
              handleOnSaveRef,
              mode: "edit"
            }
          )
        ]
      }
    );
  }
);
var ThreadBody_default = ThreadBody;
//# sourceMappingURL=ThreadBody.cjs.map