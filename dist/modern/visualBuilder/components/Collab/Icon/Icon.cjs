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

// src/visualBuilder/components/Collab/Icon/Icon.tsx
var Icon_exports = {};
__export(Icon_exports, {
  default: () => Icon_default
});
module.exports = __toCommonJS(Icon_exports);
var import_Tooltip = __toESM(require("../Tooltip/Tooltip.cjs"), 1);
var import_CollabIcons = require("../../icons/CollabIcons.cjs");
var import_classnames = __toESM(require("classnames"), 1);
var import_collab = require("../../../collab.style.cjs");
var import_jsx_runtime = require("preact/jsx-runtime");
var IconWrapper = ({
  icon,
  className,
  onClick,
  testId,
  disabled,
  ...otherProps
}) => {
  const IconComponent = import_CollabIcons.iconComponents[icon];
  const handleClick = (e) => {
    if (disabled) return;
    onClick?.(e);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className: (0, import_classnames.default)(
        "collab-icon-wrapper",
        (0, import_collab.collabStyles)()["collab-icon-wrapper"]
      ),
      onClick: handleClick,
      "data-testid": testId,
      ...otherProps,
      children: IconComponent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        IconComponent,
        {
          className: (0, import_classnames.default)(
            "collab-icon",
            (0, import_collab.collabStyles)()["collab-icon"],
            className
          )
        }
      ) : null
    }
  );
};
var withTooltip = (Component) => ({
  withTooltip: withTooltip2 = false,
  tooltipContent = "",
  testId = "collab-icon",
  ...props
}) => {
  return withTooltip2 && tooltipContent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { "data-testid": testId, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Tooltip.default, { content: tooltipContent, position: "bottom", testId: "collab-icon-tooltip", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, { ...props }) }) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, { ...props, testId });
};
var Icon = withTooltip(IconWrapper);
var Icon_default = Icon;
//# sourceMappingURL=Icon.cjs.map