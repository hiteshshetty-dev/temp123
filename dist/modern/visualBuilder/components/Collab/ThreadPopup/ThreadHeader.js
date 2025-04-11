import "../../../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/Collab/ThreadPopup/ThreadHeader.tsx
import React from "preact/compat";
import { useCallback, useState } from "preact/hooks";
import classNames from "classnames";
import ThreadActionBar from "./ThreadActionBar.js";
import { collabStyles, flexAlignCenter } from "../../../collab.style.js";
import { jsx } from "preact/jsx-runtime";
var ThreadHeader = React.memo(
  ({ onClose, displayResolve, onResolve, commentCount, activeThread }) => {
    const [isResolving, setIsResolving] = useState(false);
    const handleResolve = useCallback(async () => {
      if (isResolving) return;
      try {
        setIsResolving(true);
        const payload = {
          threadUid: activeThread._id,
          payload: { threadState: 2 }
        };
        await onResolve(payload);
      } finally {
        onClose(true);
        setIsResolving(false);
      }
    }, [activeThread, isResolving, onResolve, onClose]);
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: classNames(
          "collab-thread-header--wrapper",
          "flex-v-center",
          collabStyles()["collab-thread-header--wrapper"],
          flexAlignCenter
        ),
        children: /* @__PURE__ */ jsx(
          "div",
          {
            className: classNames(
              "collab-thread-header--container",
              "flex-v-center",
              collabStyles()["collab-thread-header--container"],
              flexAlignCenter
            ),
            children: /* @__PURE__ */ jsx(
              ThreadActionBar,
              {
                commentCount,
                displayResolve,
                handleResolve,
                isResolving
              }
            )
          }
        )
      }
    );
  }
);
var ThreadHeader_default = ThreadHeader;
export {
  ThreadHeader_default as default
};
//# sourceMappingURL=ThreadHeader.js.map