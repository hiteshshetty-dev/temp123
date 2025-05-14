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

// src/visualBuilder/components/Collab/Button/Button.tsx
var Button_exports = {};
__export(Button_exports, {
  default: () => Button_default
});
module.exports = __toCommonJS(Button_exports);
var import_compat = __toESM(require("preact/compat"), 1);
var import_classnames = __toESM(require("classnames"), 1);
var import_Icon = __toESM(require("../Icon/Icon.cjs"), 1);
var import_AsyncLoader = __toESM(require("../AsyncLoader/AsyncLoader.cjs"), 1);
var import_collab = require("../../../collab.style.cjs");
var import_jsx_runtime = require("preact/jsx-runtime");
var Button = ({
  buttonType = "primary",
  children,
  className = "",
  testId,
  onClick,
  isLoading,
  loadingColor = "primary",
  disabled = false,
  type = "button",
  style,
  href,
  id,
  size = "large",
  icon,
  iconProps,
  iconAlignment = "left"
}) => {
  const Element = href ? "a" : "button";
  let nestedChildren = children && import_compat.default.Children.toArray([children]);
  if (icon) {
    let iconChild = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Icon.default, { icon, ...iconProps });
    switch (iconAlignment) {
      case "left":
        nestedChildren = import_compat.default.Children.toArray([
          iconChild,
          nestedChildren
        ]);
        break;
      case "right":
        nestedChildren = import_compat.default.Children.toArray([
          nestedChildren,
          iconChild
        ]);
        break;
      case "both":
        nestedChildren = import_compat.default.Children.toArray([
          iconChild,
          nestedChildren,
          iconChild
        ]);
        break;
      default:
        break;
    }
  }
  const combinedClassName = (0, import_classnames.default)(
    (0, import_collab.collabStyles)()["collab-button--basestyle"],
    (0, import_collab.collabStyles)()["collab-button--type"][buttonType],
    (0, import_collab.collabStyles)()["collab-button--size"][size],
    icon && (0, import_collab.collabStyles)()["collab-button--icon-allignment"][iconAlignment],
    disabled && (0, import_collab.collabStyles)()["collab-button--disabled"],
    isLoading && (0, import_collab.collabStyles)()["collab-button--loading"],
    className,
    `collab-button collab-button--${buttonType} collab-button--${size} ${icon ? `collab-button--icon-${iconAlignment}` : ""} ${disabled ? "collab-button--disabled" : ""}
        ${isLoading ? "collab-button--loading" : ""}`
  );
  const validStyle = Object.fromEntries(
    Object.entries(style || {}).filter(([_, value]) => value != null)
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    Element,
    {
      className: combinedClassName,
      id,
      onClick,
      type,
      style: validStyle,
      disabled,
      href,
      "data-testid": testId,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: (0, import_classnames.default)("flex-center", import_collab.flexCentered), children: [
        isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            className: (0, import_classnames.default)(
              (0, import_collab.collabStyles)()["collab-button--loader--wrapper"],
              "collab-button--loader--wrapper"
            ),
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_AsyncLoader.default, { color: loadingColor })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            className: (0, import_classnames.default)(
              "flex-v-center",
              import_collab.flexAlignCenter,
              {
                [`${(0, import_collab.collabStyles)()["collab-button--size"]["regular"]} collab-button--regular`]: size !== "small"
              },
              !isLoading ? `${(0, import_collab.collabStyles)()["collab-button--visible"]} collab-button--visible` : `${(0, import_collab.collabStyles)()["collab-button--hidden"]} collab-button--hidden`
            ),
            children: nestedChildren
          }
        )
      ] })
    }
  );
};
var Button_default = Button;
//# sourceMappingURL=Button.cjs.map