import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/HighlightedCommentIcon.tsx
import { HighlightCommentIcon } from "./icons/index.js";
import visualBuilderPostMessage from "../utils/visualBuilderPostMessage.js";
import { VisualBuilderPostMessageEvents } from "../utils/types/postMessage.types.js";
import Config from "../../configManager/configManager.js";
import { toggleCollabPopup } from "../generators/generateThread.js";
import { jsx } from "preact/jsx-runtime";
var HighlightedCommentIcon = (props) => {
  const { data } = props;
  const config = Config.get();
  const handleCommentModal = async () => {
    visualBuilderPostMessage?.send(
      VisualBuilderPostMessageEvents.OPEN_FIELD_COMMENT_MODAL,
      {
        fieldMetadata: data?.fieldMetadata,
        discussion: data?.discussion,
        fieldSchema: data?.fieldSchema,
        absolutePath: data.absolutePath
      }
    );
    toggleCollabPopup({ threadUid: "", action: "close" });
    Config.set("collab.isFeedbackMode", true);
  };
  return /* @__PURE__ */ jsx("div", { className: "collab-icon", onClick: handleCommentModal, children: /* @__PURE__ */ jsx(HighlightCommentIcon, {}) });
};
var HighlightedCommentIcon_default = HighlightedCommentIcon;
export {
  HighlightedCommentIcon_default as default
};
//# sourceMappingURL=HighlightedCommentIcon.js.map