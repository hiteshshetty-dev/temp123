import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/Tooltip.tsx
import { cloneElement } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import {
  computePosition,
  flip,
  shift,
  offset,
  arrow
} from "@floating-ui/dom";
import { visualBuilderStyles } from "../visualBuilder.style.js";
import classNames from "classnames";
import { ContentTypeIcon } from "./icons/index.js";
import { FieldTypeIconsMap } from "../generators/generateCustomCursor.js";
import { Fragment, jsx, jsxs } from "preact/jsx-runtime";
var Tooltip = ({ children, content, placement = "top-start" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const arrowRef = useRef(null);
  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);
  useEffect(() => {
    if (!isVisible || !triggerRef.current || !tooltipRef.current) {
      return;
    }
    const trigger = triggerRef.current;
    const tooltip = tooltipRef.current;
    computePosition(trigger, tooltip, {
      placement,
      // Middleware runs in order to modify the position
      middleware: [
        offset(8),
        // Add 8px of space between the trigger and tooltip
        flip(),
        // Flip to the opposite side if it overflows
        shift({ padding: 5 }),
        // Shift to keep it in view
        ...arrowRef.current ? [arrow({ element: arrowRef.current })] : []
        // Handle arrow positioning
      ]
    }).then(({ x, y, placement: placement2, middlewareData }) => {
      Object.assign(tooltip.style, {
        left: `${x}px`,
        top: `${y}px`
      });
      if (middlewareData.arrow && arrowRef.current) {
        const { x: arrowX, y: arrowY } = middlewareData.arrow;
        const side = placement2.split("-")[0];
        const staticSide = {
          top: "bottom",
          right: "left",
          bottom: "top",
          left: "right"
        }[side];
        const arrowElement = arrowRef.current;
        Object.assign(arrowElement.style, {
          left: "",
          top: "",
          right: "",
          bottom: ""
        });
        if (placement2.includes("-start") || placement2.includes("-end")) {
          const tooltipRect = tooltip.getBoundingClientRect();
          if (side === "top" || side === "bottom") {
            arrowElement.style.left = `${14}px`;
            if (arrowY != null) {
              arrowElement.style.top = `${arrowY}px`;
            }
          } else {
            arrowElement.style.top = `${tooltipRect.height / 2 - 4}px`;
            if (arrowX != null) {
              arrowElement.style.left = `${arrowX}px`;
            }
          }
        } else {
          if (arrowX != null) {
            arrowElement.style.left = `${arrowX}px`;
          }
          if (arrowY != null) {
            arrowElement.style.top = `${arrowY}px`;
          }
        }
        arrowElement.style[staticSide] = "-4px";
      }
    });
  }, [isVisible, placement, content]);
  const triggerWithListeners = cloneElement(children, {
    ref: triggerRef,
    onMouseEnter: showTooltip,
    onMouseLeave: hideTooltip,
    onFocus: showTooltip,
    onBlur: hideTooltip,
    "aria-describedby": "lightweight-tooltip"
    // for accessibility
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    triggerWithListeners,
    isVisible && /* @__PURE__ */ jsxs(
      "div",
      {
        ref: tooltipRef,
        role: "tooltip",
        id: "lightweight-tooltip",
        className: classNames("tooltip-container", visualBuilderStyles()["tooltip-container"]),
        children: [
          content,
          /* @__PURE__ */ jsx("div", { ref: arrowRef, className: classNames("tooltip-arrow", visualBuilderStyles()["tooltip-arrow"]) })
        ]
      }
    )
  ] });
};
function ToolbarTooltipContent({ contentTypeName, referenceFieldName }) {
  return /* @__PURE__ */ jsxs("div", { className: classNames("toolbar-tooltip-content", visualBuilderStyles()["toolbar-tooltip-content"]), children: [
    contentTypeName && /* @__PURE__ */ jsxs("div", { className: classNames("toolbar-tooltip-content-item", visualBuilderStyles()["toolbar-tooltip-content-item"]), children: [
      /* @__PURE__ */ jsx(ContentTypeIcon, {}),
      /* @__PURE__ */ jsx("p", { children: contentTypeName })
    ] }),
    referenceFieldName && /* @__PURE__ */ jsxs("div", { className: classNames("toolbar-tooltip-content-item", visualBuilderStyles()["toolbar-tooltip-content-item"]), children: [
      /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: FieldTypeIconsMap.reference }, className: classNames("visual-builder__field-icon", visualBuilderStyles()["visual-builder__field-icon"]) }),
      /* @__PURE__ */ jsx("p", { children: referenceFieldName })
    ] })
  ] });
}
function ToolbarTooltip({ children, data, disabled = false }) {
  if (disabled) {
    return children;
  }
  const { contentTypeName, referenceFieldName } = data;
  return /* @__PURE__ */ jsx(Tooltip, { content: /* @__PURE__ */ jsx(ToolbarTooltipContent, { contentTypeName, referenceFieldName }), children });
}
var Tooltip_default = Tooltip;
export {
  ToolbarTooltip,
  Tooltip_default as default
};
//# sourceMappingURL=Tooltip.js.map