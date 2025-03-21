import "../../../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/Collab/ThreadPopup/CommentActionBar.tsx
import { useContext, useState } from "preact/hooks";
import Icon from "../Icon/Icon.js";
import { ThreadProvider } from "./ContextProvider/index.js";
import { collabStyles } from "../../../collab.style.js";
import classNames from "classnames";
import { jsx, jsxs } from "preact/jsx-runtime";
var CommentActionBar = ({
  mode,
  commentUser,
  currentUser,
  commentUID
}) => {
  const { setThreadState, onDeleteComment, activeThread, onDeleteThread } = useContext(ThreadProvider);
  const [isDeleting, setIsDeleting] = useState(false);
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
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: classNames(
          "collab-thread-comment-action--wrapper",
          collabStyles()["collab-thread-comment-action--wrapper"]
        ),
        children: /* @__PURE__ */ jsx(
          Icon,
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
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: classNames(
        "collab-thread-comment-action--wrapper",
        collabStyles()["collab-thread-comment-action--wrapper"]
      ),
      "data-testid": "collab-thread-comment-action--wrapper",
      children: [
        /* @__PURE__ */ jsx(
          Icon,
          {
            icon: "Edit",
            tooltipContent: "Edit",
            withTooltip: true,
            testId: "collab-thread-comment-edit",
            onClick: handleCommentEdit
          }
        ),
        /* @__PURE__ */ jsx(
          Icon,
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
export {
  CommentActionBar_default as default
};
//# sourceMappingURL=CommentActionBar.js.map