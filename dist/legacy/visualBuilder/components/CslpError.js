import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/CslpError.tsx
import classNames from "classnames";
import { visualBuilderStyles } from "../visualBuilder.style.js";
import { WarningOctagonIcon } from "./icons/index.js";
import { useEffect, useRef, useState } from "preact/compat";
import { jsx, jsxs } from "preact/jsx-runtime";
function CslpError({}) {
  const errorRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);
  useEffect(() => {
    const errorElement = errorRef.current;
    const showTooltip2 = () => {
      setShowTooltip(true);
    };
    const hideTooltip = () => {
      setShowTooltip(false);
    };
    if (errorElement) {
      errorElement.addEventListener("mouseenter", showTooltip2);
      errorElement.addEventListener("mouseleave", hideTooltip);
    }
    return () => {
      if (errorElement) {
        errorElement.removeEventListener("mouseenter", showTooltip2);
        errorElement.removeEventListener("mouseleave", hideTooltip);
      }
    };
  }, []);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: classNames(
        visualBuilderStyles()["visual-builder__focused-toolbar__error"]
      ),
      ref: errorRef,
      children: [
        /* @__PURE__ */ jsx(WarningOctagonIcon, {}),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: classNames(
              visualBuilderStyles()["visual-builder__focused-toolbar__error-text"]
            ),
            children: "Error"
          }
        ),
        showTooltip ? /* @__PURE__ */ jsxs(
          "div",
          {
            className: classNames(
              visualBuilderStyles()["visual-builder__focused-toolbar__error-toolip"]
            ),
            children: [
              /* @__PURE__ */ jsx("p", { children: "Invalid CSLP tag" }),
              /* @__PURE__ */ jsx("span", { children: "The CSLP is invalid or incorrectly generated." })
            ]
          }
        ) : null
      ]
    }
  );
}
export {
  CslpError
};
//# sourceMappingURL=CslpError.js.map