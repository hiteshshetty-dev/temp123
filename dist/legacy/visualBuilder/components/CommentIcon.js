import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/CommentIcon.tsx
import { useEffect, useState } from "preact/compat";
import visualBuilderPostMessage from "../utils/visualBuilderPostMessage.js";
import { VisualBuilderPostMessageEvents } from "../utils/types/postMessage.types.js";
import { AddCommentIcon, ReadCommentIcon } from "./icons/index.js";
import { getDiscussionIdByFieldMetaData } from "../utils/getDiscussionIdByFieldMetaData.js";
import { LoadingIcon } from "./icons/loading.js";
import classNames from "classnames";
import { visualBuilderStyles } from "../visualBuilder.style.js";
import { jsx } from "preact/jsx-runtime";
function CommentIcon(props) {
  const { fieldMetadata, fieldSchema, invertTooltipPosition = false } = props;
  const [activeDiscussion, setActiveDiscussion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchDiscussionId = async () => {
      try {
        setIsLoading(true);
        const discussion = await getDiscussionIdByFieldMetaData({
          fieldMetadata,
          fieldSchema
        });
        setActiveDiscussion(discussion);
      } catch (error) {
        console.error("Failed to fetch discussion ID:", error);
        setActiveDiscussion({ uid: "new" });
      } finally {
        setIsLoading(false);
      }
    };
    fetchDiscussionId();
  }, [fieldMetadata]);
  useEffect(() => {
    var _a;
    const handleReceiveDiscussionId = (response) => {
      const { entryId, discussion, contentTypeId, fieldPath } = response.data;
      if (fieldMetadata.entry_uid === entryId && fieldMetadata.content_type_uid === contentTypeId && fieldMetadata.fieldPathWithIndex === fieldPath) {
        setActiveDiscussion(discussion ?? { uid: "new" });
      }
    };
    const recieveDiscussionIDEvent = (_a = visualBuilderPostMessage) == null ? void 0 : _a.on(
      VisualBuilderPostMessageEvents.UPDATE_DISCUSSION_ID,
      handleReceiveDiscussionId
    );
    return () => {
      recieveDiscussionIDEvent == null ? void 0 : recieveDiscussionIDEvent.unregister();
    };
  }, []);
  const handleCommentModal = async () => {
    var _a;
    (_a = visualBuilderPostMessage) == null ? void 0 : _a.send(
      VisualBuilderPostMessageEvents.OPEN_FIELD_COMMENT_MODAL,
      {
        fieldMetadata,
        discussion: activeDiscussion,
        fieldSchema
      }
    );
  };
  if (isLoading) {
    return /* @__PURE__ */ jsx(
      "button",
      {
        "data-testid": "visual-builder__focused-toolbar__multiple-field-toolbar__comment-button-loading",
        className: classNames(
          "visual-builder__button visual-builder__button--secondary visual-builder__button--comment-loader",
          visualBuilderStyles()["visual-builder__button"],
          visualBuilderStyles()["visual-builder__button--secondary"],
          visualBuilderStyles()["visual-builder__button--comment-loader"]
        ),
        children: /* @__PURE__ */ jsx(LoadingIcon, {})
      }
    );
  }
  if (!(activeDiscussion == null ? void 0 : activeDiscussion.uid)) {
    return;
  }
  return /* @__PURE__ */ jsx(
    "button",
    {
      "data-testid": "visual-builder__focused-toolbar__multiple-field-toolbar__comment-button",
      className: classNames(
        "visual-builder__button visual-builder__button--secondary",
        visualBuilderStyles()["visual-builder__button"],
        visualBuilderStyles()["visual-builder__button--secondary"],
        visualBuilderStyles()["visual-builder__tooltip"],
        {
          "visual-builder__tooltip--bottom": invertTooltipPosition,
          [visualBuilderStyles()["visual-builder__tooltip--bottom"]]: invertTooltipPosition
        }
      ),
      "data-tooltip": "Add comment",
      onClick: (e) => {
        e.preventDefault();
        e.stopPropagation();
        handleCommentModal();
      },
      children: (activeDiscussion == null ? void 0 : activeDiscussion.uid) === "new" ? /* @__PURE__ */ jsx(AddCommentIcon, {}) : /* @__PURE__ */ jsx(ReadCommentIcon, {})
    }
  );
}
export {
  CommentIcon as default
};
//# sourceMappingURL=CommentIcon.js.map