import "../../../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/Collab/Tooltip/Tooltip.tsx
import { useState, useRef, useEffect } from "preact/hooks";
import { collabStyles } from "../../../collab.style.js";
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
  const tooltipRef = useRef(null);
  const targetRef = useRef(null);
  useEffect(() => {
    const positionTooltip = () => {
      if (!isVisible || !tooltipRef.current || !targetRef.current) return;
      const targetRect = targetRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const margin = 8;
      const positions = {
        bottom: {
          top: targetRect.bottom + margin,
          left: targetRect.left + (targetRect.width - tooltipRect.width) / 2
        },
        top: {
          top: targetRect.top - tooltipRect.height - margin,
          left: targetRect.left + (targetRect.width - tooltipRect.width) / 2
        },
        left: {
          top: targetRect.top + (targetRect.height - tooltipRect.height) / 2,
          left: targetRect.left - tooltipRect.width - margin
        },
        right: {
          top: targetRect.top + (targetRect.height - tooltipRect.height) / 2,
          left: targetRect.right + margin
        }
      };
      const coords = positions[position];
      Object.assign(tooltipRef.current.style, {
        top: `${coords.top}px`,
        left: `${coords.left}px`
      });
    };
    positionTooltip();
    window.addEventListener("scroll", positionTooltip);
    window.addEventListener("resize", positionTooltip);
    return () => {
      window.removeEventListener("scroll", positionTooltip);
      window.removeEventListener("resize", positionTooltip);
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
              collabStyles()["collab-tooltip"]
            ),
            role: "tooltip",
            "aria-hidden": !isVisible,
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