import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/eventManager/useHighlightCommentIcon.ts
import visualBuilderPostMessage from "../utils/visualBuilderPostMessage.js";
import { VisualBuilderPostMessageEvents } from "../utils/types/postMessage.types.js";
import { highlightCommentIconOnCanvas, removeAllHighlightedCommentIcons } from "../generators/generateHighlightedComment.js";
var handleAddCommentIcons = (event) => {
  const { payload } = event.data;
  highlightCommentIconOnCanvas(payload);
};
var handleRemoveCommentIcons = () => {
  removeAllHighlightedCommentIcons();
};
var useHighlightCommentIcon = () => {
  visualBuilderPostMessage?.on(
    VisualBuilderPostMessageEvents.HIGHLIGHT_ACTIVE_COMMENTS,
    handleAddCommentIcons
  );
  visualBuilderPostMessage?.on(
    VisualBuilderPostMessageEvents.REMOVE_HIGHLIGHTED_COMMENTS,
    handleRemoveCommentIcons
  );
};
export {
  useHighlightCommentIcon
};
//# sourceMappingURL=useHighlightCommentIcon.js.map