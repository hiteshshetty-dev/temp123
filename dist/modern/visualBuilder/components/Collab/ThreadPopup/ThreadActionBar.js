import "../../../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/Collab/ThreadPopup/ThreadActionBar.tsx
import classNames from "classnames";
import Button from "../Button/Button.js";
import { collabStyles } from "../../../collab.style.js";
import { getThreadTitle } from "../../../utils/collabUtils.js";
import { Fragment, jsx, jsxs } from "preact/jsx-runtime";
var ThreadActionBar = ({
  commentCount,
  displayResolve,
  handleResolve,
  isResolving
}) => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
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
    displayResolve && /* @__PURE__ */ jsx(
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
        isLoading: isResolving,
        loadingColor: "secondary",
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
    )
  ] });
};
var ThreadActionBar_default = ThreadActionBar;
export {
  ThreadActionBar_default as default
};
//# sourceMappingURL=ThreadActionBar.js.map