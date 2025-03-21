import "../../../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/Collab/ThreadPopup/CommentResolvedText.tsx
import { useMemo } from "preact/hooks";
import { getMessageWithDisplayName } from "../../../utils/collabUtils.js";
import { collabStyles } from "../../../collab.style.js";
import classNames from "classnames";
import { jsx } from "preact/jsx-runtime";
var CommentResolvedText = ({ comment, userState }) => {
  const sanitizedText = useMemo(() => {
    return getMessageWithDisplayName(comment, userState, "html") ?? "";
  }, [comment.message, userState.userMap, comment.toUsers]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-testid": "collab-thread-comment--message",
      className: classNames(
        "collab-thread-comment--message",
        collabStyles()["collab-thread-comment--message"]
      ),
      dangerouslySetInnerHTML: { __html: sanitizedText }
    }
  );
};
var CommentResolvedText_default = CommentResolvedText;
export {
  CommentResolvedText_default as default
};
//# sourceMappingURL=CommentResolvedText.js.map