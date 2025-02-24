import "../../../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/Collab/ThreadPopup/ThreadHeader.tsx
import React from "preact/compat";
import { useCallback } from "preact/hooks";
import classNames from "classnames";
import Button from "../Button/Button.js";
import { collabStyles } from "../../../collab.style.js";
import { getThreadTitle } from "../../../utils/collabUtils.js";
import { jsx, jsxs } from "preact/jsx-runtime";
var ThreadHeader = React.memo(
  ({ onClose, displayResolve, onResolve, commentCount, activeThread }) => {
    const handleResolve = useCallback(async () => {
      try {
        const payload = {
          threadUid: activeThread._id,
          payload: {
            threadState: 2
          }
        };
        const resolveResponse = await onResolve(payload);
        onClose(true);
      } catch (error) {
      }
    }, [activeThread]);
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: classNames(
          "collab-thread-header--wrapper",
          "flex-v-center",
          collabStyles()["collab-thread-header--wrapper"],
          collabStyles()["flex-v-center"]
        ),
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: classNames(
              "collab-thread-header--container",
              "flex-v-center",
              collabStyles()["collab-thread-header--container"],
              collabStyles()["flex-v-center"]
            ),
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: classNames(
                    "collab-thread-header--title",
                    collabStyles()["collab-thread-header--title"]
                  ),
                  children: getThreadTitle(commentCount)
                }
              ),
              displayResolve ? /* @__PURE__ */ jsx(
                Button,
                {
                  buttonType: "tertiary",
                  className: classNames(
                    "collab-thread-header--resolve",
                    collabStyles()["collab-thread-header--resolve"]
                  ),
                  icon: "RightMarkActive",
                  iconProps: {
                    className: classNames(
                      collabStyles()["collab-thread-header--resolve--icon"],
                      "collab-thread-header--resolve--icon"
                    )
                  },
                  onClick: handleResolve,
                  testId: "collab-thread-resolve-btn",
                  children: /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: classNames(
                        "collab-thread-header--resolve--text",
                        collabStyles()["collab-thread-header--resolve--text"]
                      ),
                      children: "Resolve"
                    }
                  )
                }
              ) : null
            ]
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