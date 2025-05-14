import "../../../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/Collab/ThreadPopup/CommentCard.tsx
import { useEffect, useState, useMemo } from "preact/hooks";
import CommentTextArea from "./CommentTextArea.js";
import { getUserName, formatDate } from "../../../utils/collabUtils.js";
import CommentActionBar from "./CommentActionBar.js";
import CommentResolvedText from "./CommentResolvedText.js";
import Avatar from "../Avatar/Avatar.js";
import ThreadBodyLoader from "./loader/ThreadBody.js";
import { collabStyles, flexAlignCenter } from "../../../collab.style.js";
import classNames from "classnames";
import { jsx, jsxs } from "preact/jsx-runtime";
var formatCommentDate = (comment) => {
  return comment ? formatDate(comment.updatedAt || comment.createdAt) : "";
};
var CommentCard = ({
  userState,
  comment,
  onClose,
  handleOnSaveRef,
  mode
}) => {
  const [commentUser, setCommentUser] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    setCommentUser(
      comment ? userState.userMap[comment.createdBy] : userState.currentUser
    );
  }, [comment, userState]);
  const formattedDate = useMemo(() => formatCommentDate(comment), [comment]);
  if (!commentUser) {
    return /* @__PURE__ */ jsx(ThreadBodyLoader, {}, "collab-thread-body--comment-loader");
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: classNames(
        "collab-thread-comment--wrapper",
        collabStyles()["collab-thread-comment--wrapper"]
      ),
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: classNames(
              "collab-thread-comment--user-details",
              "flex-v-center",
              collabStyles()["collab-thread-comment--user-details"],
              flexAlignCenter
            ),
            children: [
              /* @__PURE__ */ jsx(
                Avatar,
                {
                  avatar: {
                    name: getUserName(commentUser),
                    id: commentUser.uid
                  }
                }
              ),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  className: classNames(
                    "collab-thread-comment--user-details__text",
                    collabStyles()["collab-thread-comment--user-details__text"]
                  ),
                  children: [
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: classNames(
                          "collab-thread-comment--user-name",
                          collabStyles()["collab-thread-comment--user-name"]
                        ),
                        children: getUserName(commentUser)
                      }
                    ),
                    comment && /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: classNames(
                          "collab-thread-comment--time-details",
                          collabStyles()["collab-thread-comment--time-details"]
                        ),
                        children: formattedDate
                      }
                    )
                  ]
                }
              ),
              isHovered && /* @__PURE__ */ jsx(
                CommentActionBar,
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
        mode === "edit" ? /* @__PURE__ */ jsx(
          CommentTextArea,
          {
            onClose,
            userState,
            handleOnSaveRef,
            comment
          }
        ) : comment && /* @__PURE__ */ jsx(
          CommentResolvedText,
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
export {
  CommentCard_default as default
};
//# sourceMappingURL=CommentCard.js.map