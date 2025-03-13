import "../../../../chunk-IKZWERSR.js";

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
      let bestPosition = position;
      let coords = positions[position];
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const wouldBeOutsideViewport = {
        bottom: coords.top + tooltipRect.height > viewportHeight,
        top: coords.top < 0,
        left: coords.left < 0,
        right: coords.left + tooltipRect.width > viewportWidth
      };
      const horizontalOutOfBounds = coords.left < 0 || coords.left + tooltipRect.width > viewportWidth;
      if (wouldBeOutsideViewport[position] || horizontalOutOfBounds) {
        const positionPriority = ["bottom", "top", "right", "left"];
        positionPriority.splice(positionPriority.indexOf(position), 1);
        positionPriority.push(position);
        for (const pos of positionPriority) {
          const testCoords = positions[pos];
          const isVisible2 = testCoords.top >= 0 && testCoords.top + tooltipRect.height <= viewportHeight && testCoords.left >= 0 && testCoords.left + tooltipRect.width <= viewportWidth;
          if (isVisible2) {
            bestPosition = pos;
            coords = testCoords;
            break;
          }
        }
      }
      if (coords.left < 0) {
        coords.left = margin;
      } else if (coords.left + tooltipRect.width > viewportWidth) {
        coords.left = viewportWidth - tooltipRect.width - margin;
      }
      if (coords.top < 0) {
        coords.top = margin;
      } else if (coords.top + tooltipRect.height > viewportHeight) {
        coords.top = viewportHeight - tooltipRect.height - margin;
      }
      setActualPosition(
        bestPosition
      );
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