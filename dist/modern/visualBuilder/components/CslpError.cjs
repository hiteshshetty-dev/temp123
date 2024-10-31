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

// src/visualBuilder/components/CslpError.tsx
var CslpError_exports = {};
__export(CslpError_exports, {
  CslpError: () => CslpError
});
module.exports = __toCommonJS(CslpError_exports);
var import_classnames = __toESM(require("classnames"), 1);
var import_visualBuilder = require("../visualBuilder.style.cjs");
var import_icons = require("./icons/index.cjs");
var import_compat = require("preact/compat");
var import_jsx_runtime = require("preact/jsx-runtime");
function CslpError({}) {
  const errorRef = (0, import_compat.useRef)(null);
  const [showTooltip, setShowTooltip] = (0, import_compat.useState)(false);
  (0, import_compat.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: (0, import_classnames.default)(
        (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__focused-toolbar__error"]
      ),
      ref: errorRef,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons.WarningOctagonIcon, {}),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "span",
          {
            className: (0, import_classnames.default)(
              (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__focused-toolbar__error-text"]
            ),
            children: "Error"
          }
        ),
        showTooltip ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "div",
          {
            className: (0, import_classnames.default)(
              (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__focused-toolbar__error-toolip"]
            ),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Invalid CSLP tag" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "The CSLP is invalid or incorrectly generated." })
            ]
          }
        ) : null
      ]
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CslpError
});
//# sourceMappingURL=CslpError.cjs.map