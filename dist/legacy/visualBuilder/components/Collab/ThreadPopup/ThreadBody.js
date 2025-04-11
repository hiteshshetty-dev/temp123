import "../../../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/Collab/ThreadPopup/ThreadBody.tsx
import React from "preact/compat";
import ThreadBodyLoader from "./loader/ThreadBody.js";
import CommentCard from "./CommentCard.js";
import classNames from "classnames";
import { collabStyles, flexAlignCenter } from "../../../collab.style.js";
import { Fragment, jsx, jsxs } from "preact/jsx-runtime";
var Loader = ({ isLoading, children }) => {
  return isLoading ? /* @__PURE__ */ jsx(ThreadBodyLoader, {}, "collab-thread-body--comment-loader") : /* @__PURE__ */ jsx(Fragment, { children });
};
var CommentList = ({
  comments,
  userState,
  onClose,
  handleOnSaveRef,
  editComment,
  fetchingMore
}) => {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: classNames(
        "collab-thread-comment--list",
        collabStyles()["collab-thread-comment--list"]
      ),
      id: "collab-thread-comment--list",
      children: [
        comments == null ? void 0 : comments.map((comment) => /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: classNames(
                "collab-thread-comment-seperator",
                "flex-v-center",
                collabStyles()["collab-thread-comment-seperator"],
                flexAlignCenter
              ),
              children: /* @__PURE__ */ jsx(
                "svg",
                {
                  class: "collab-thread-comment-seperator--svg",
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "100%",
                  height: "2",
                  viewBox: "0 0 332 2",
                  fill: "none",
                  preserveAspectRatio: "none",
                  children: /* @__PURE__ */ jsx(
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
          /* @__PURE__ */ jsx(
            CommentCard,
            {
              userState,
              comment,
              onClose,
              handleOnSaveRef,
              mode: editComment === comment._id ? "edit" : "view"
            }
          )
        ] })),
        fetchingMore && /* @__PURE__ */ jsx(ThreadBodyLoader, {})
      ]
    }
  );
};
var ThreadBody = React.memo(
  ({
    handleOnSaveRef,
    onClose,
    userState,
    isLoading,
    comments,
    fetchingMore,
    editComment
  }) => {
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: classNames(
          "collab-thread-body--wrapper",
          collabStyles()["collab-thread-body--wrapper"]
        ),
        children: [
          /* @__PURE__ */ jsx(Loader, { isLoading, children: /* @__PURE__ */ jsx(
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
          editComment === "" && /* @__PURE__ */ jsx(
            CommentCard,
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
export {
  ThreadBody_default as default
};
//# sourceMappingURL=ThreadBody.js.map