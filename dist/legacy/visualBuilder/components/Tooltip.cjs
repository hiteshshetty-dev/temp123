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

// src/visualBuilder/components/Tooltip.tsx
var Tooltip_exports = {};
__export(Tooltip_exports, {
  ToolbarTooltip: () => ToolbarTooltip,
  default: () => Tooltip_default
});
module.exports = __toCommonJS(Tooltip_exports);
var import_preact = require("preact");
var import_hooks = require("preact/hooks");
var import_dom = require("@floating-ui/dom");
var import_visualBuilder = require("../visualBuilder.style.cjs");
var import_classnames = __toESM(require("classnames"), 1);
var import_icons = require("./icons/index.cjs");
var import_generateCustomCursor = require("../generators/generateCustomCursor.cjs");
var import_jsx_runtime = require("preact/jsx-runtime");
var Tooltip = ({ children, content, placement = "top-start" }) => {
  const [isVisible, setIsVisible] = (0, import_hooks.useState)(false);
  const triggerRef = (0, import_hooks.useRef)(null);
  const tooltipRef = (0, import_hooks.useRef)(null);
  const arrowRef = (0, import_hooks.useRef)(null);
  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);
  (0, import_hooks.useEffect)(() => {
    if (!isVisible || !triggerRef.current || !tooltipRef.current) {
      return;
    }
    const trigger = triggerRef.current;
    const tooltip = tooltipRef.current;
    (0, import_dom.computePosition)(trigger, tooltip, {
      placement,
      // Middleware runs in order to modify the position
      middleware: [
        (0, import_dom.offset)(8),
        // Add 8px of space between the trigger and tooltip
        (0, import_dom.flip)(),
        // Flip to the opposite side if it overflows
        (0, import_dom.shift)({ padding: 5 }),
        // Shift to keep it in view
        ...arrowRef.current ? [(0, import_dom.arrow)({ element: arrowRef.current })] : []
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
  const triggerWithListeners = (0, import_preact.cloneElement)(children, {
    ref: triggerRef,
    onMouseEnter: showTooltip,
    onMouseLeave: hideTooltip,
    onFocus: showTooltip,
    onBlur: hideTooltip,
    "aria-describedby": "lightweight-tooltip"
    // for accessibility
  });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    triggerWithListeners,
    isVisible && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        ref: tooltipRef,
        role: "tooltip",
        id: "lightweight-tooltip",
        className: (0, import_classnames.default)("tooltip-container", (0, import_visualBuilder.visualBuilderStyles)()["tooltip-container"]),
        children: [
          content,
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: arrowRef, className: (0, import_classnames.default)("tooltip-arrow", (0, import_visualBuilder.visualBuilderStyles)()["tooltip-arrow"]) })
        ]
      }
    )
  ] });
};
function ToolbarTooltipContent({ contentTypeName, referenceFieldName }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: (0, import_classnames.default)("toolbar-tooltip-content", (0, import_visualBuilder.visualBuilderStyles)()["toolbar-tooltip-content"]), children: [
    contentTypeName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: (0, import_classnames.default)("toolbar-tooltip-content-item", (0, import_visualBuilder.visualBuilderStyles)()["toolbar-tooltip-content-item"]), children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons.ContentTypeIcon, {}),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: contentTypeName })
    ] }),
    referenceFieldName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: (0, import_classnames.default)("toolbar-tooltip-content-item", (0, import_visualBuilder.visualBuilderStyles)()["toolbar-tooltip-content-item"]), children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { dangerouslySetInnerHTML: { __html: import_generateCustomCursor.FieldTypeIconsMap.reference }, className: (0, import_classnames.default)("visual-builder__field-icon", (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__field-icon"]) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: referenceFieldName })
    ] })
  ] });
}
function ToolbarTooltip({ children, data, disabled = false }) {
  if (disabled) {
    return children;
  }
  const { contentTypeName, referenceFieldName } = data;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToolbarTooltipContent, { contentTypeName, referenceFieldName }), children });
}
var Tooltip_default = Tooltip;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ToolbarTooltip
});
//# sourceMappingURL=Tooltip.cjs.map