import "../../chunk-IKZWERSR.js";

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
    var _a;
    (_a = visualBuilderPostMessage) == null ? void 0 : _a.send(
      VisualBuilderPostMessageEvents.OPEN_FIELD_COMMENT_MODAL,
      {
        fieldMetadata: data == null ? void 0 : data.fieldMetadata,
        discussion: data == null ? void 0 : data.discussion,
        fieldSchema: data == null ? void 0 : data.fieldSchema,
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