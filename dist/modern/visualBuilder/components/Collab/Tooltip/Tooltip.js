import "../../../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/Collab/Tooltip/Tooltip.tsx
import { useState, useRef, useEffect } from "preact/hooks";
import { collabStyles } from "../../../collab.style.js";
import { positionTooltip } from "../../../utils/collabUtils.js";
import classNames from "classnames";
import { jsx, jsxs } from "preact/jsx-runtime";
var Tooltip = (props) => {
  const {
    content,
    children,
    position = "bottom",
    className,
    testId,
    ...otherProps
  } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [actualPosition, setActualPosition] = useState(position);
  const tooltipRef = useRef(null);
  const targetRef = useRef(null);
  const prevChildrenRef = useRef(children);
  useEffect(() => {
    if (prevChildrenRef.current !== children) {
      setIsVisible(false);
      prevChildrenRef.current = children;
    }
  }, [children]);
  useEffect(() => {
    const updateTooltip = () => positionTooltip(tooltipRef, targetRef, position, setActualPosition);
    updateTooltip();
    window.addEventListener("scroll", updateTooltip);
    window.addEventListener("resize", updateTooltip);
    return () => {
      window.removeEventListener("scroll", updateTooltip);
      window.removeEventListener("resize", updateTooltip);
    };
  }, [isVisible, position]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: targetRef,
      className: classNames(
        "collab-tooltip--wrapper",
        collabStyles()["collab-tooltip--wrapper"],
        className
      ),
      onMouseEnter: () => setIsVisible(true),
      onMouseLeave: () => setIsVisible(false),
      "data-testid": testId,
      ...otherProps,
      children: [
        children,
        isVisible && /* @__PURE__ */ jsx(
          "div",
          {
            ref: tooltipRef,
            className: classNames(
              "collab-tooltip",
              `collab-tooltip--${actualPosition}`,
              collabStyles()["collab-tooltip"],
              collabStyles()[`collab-tooltip--${actualPosition}`]
            ),
            role: "tooltip",
            "aria-hidden": !isVisible,
            "data-position": actualPosition,
            children: content
          }
        )
      ]
    }
  );
};
Tooltip.defaultProps = {
  testId: "collab-tooltip"
};
var Tooltip_default = Tooltip;
export {
  Tooltip_default as default
};
//# sourceMappingURL=Tooltip.js.map