"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/visualBuilder/components/Collab/Tooltip/Tooltip.tsx
var Tooltip_exports = {};
__export(Tooltip_exports, {
  default: () => Tooltip_default
});
module.exports = __toCommonJS(Tooltip_exports);
var import_hooks = require("preact/hooks");
var import_collab = require("../../../collab.style.cjs");
var import_classnames = __toESM(require("classnames"), 1);
var import_jsx_runtime = require("preact/jsx-runtime");
var Tooltip = (props) => {
  const {
    content,
    children,
    position = "bottom",
    className,
    testId,
    ...otherProps
  } = props;
  const [isVisible, setIsVisible] = (0, import_hooks.useState)(false);
  const [actualPosition, setActualPosition] = (0, import_hooks.useState)(position);
  const tooltipRef = (0, import_hooks.useRef)(null);
  const targetRef = (0, import_hooks.useRef)(null);
  const prevChildrenRef = (0, import_hooks.useRef)(children);
  (0, import_hooks.useEffect)(() => {
    if (prevChildrenRef.current !== children) {
      setIsVisible(false);
      prevChildrenRef.current = children;
    }
  }, [children]);
  (0, import_hooks.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      ref: targetRef,
      className: (0, import_classnames.default)(
        "collab-tooltip--wrapper",
        (0, import_collab.collabStyles)()["collab-tooltip--wrapper"],
        className
      ),
      onMouseEnter: () => setIsVisible(true),
      onMouseLeave: () => setIsVisible(false),
      "data-testid": testId,
      ...otherProps,
      children: [
        children,
        isVisible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            ref: tooltipRef,
            className: (0, import_classnames.default)(
              "collab-tooltip",
              `collab-tooltip--${actualPosition}`,
              (0, import_collab.collabStyles)()["collab-tooltip"],
              (0, import_collab.collabStyles)()[`collab-tooltip--${actualPosition}`]
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
//# sourceMappingURL=Tooltip.cjs.map