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

// src/visualBuilder/components/VisualBuilder.tsx
var VisualBuilder_exports = {};
__export(VisualBuilder_exports, {
  default: () => VisualBuilder_default
});
module.exports = __toCommonJS(VisualBuilder_exports);
var import_classnames = __toESM(require("classnames"), 1);
var import_generateOverlay = require("../generators/generateOverlay.cjs");
var import_visualBuilder = require("../visualBuilder.style.cjs");
var import_jsx_runtime = require("preact/jsx-runtime");
function VisualBuilderComponent(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "style",
      {
        dangerouslySetInnerHTML: {
          __html: import_visualBuilder.VisualBuilderGlobalStyles
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        className: (0, import_classnames.default)(
          (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__cursor"],
          "visual-builder__cursor"
        ),
        "data-testid": "visual-builder__cursor"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        className: (0, import_classnames.default)(
          (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__overlay__wrapper"],
          "visual-builder__overlay__wrapper"
        ),
        "data-testid": "visual-builder__overlay__wrapper",
        onClick: (event) => {
          const targetElement = event.currentTarget;
          const focusedToolbar = document.querySelector(
            ".visual-builder__focused-toolbar"
          );
          (0, import_generateOverlay.hideOverlay)({
            visualBuilderContainer: props.visualBuilderContainer,
            visualBuilderOverlayWrapper: targetElement,
            focusedToolbar,
            resizeObserver: props.resizeObserver
          });
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              className: (0, import_classnames.default)(
                "visual-builder__overlay visual-builder__overlay--top",
                (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__overlay"]
              ),
              "data-testid": "visual-builder__overlay--top"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              "data-testid": "visual-builder__overlay--left",
              className: (0, import_classnames.default)(
                "visual-builder__overlay visual-builder__overlay--left",
                (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__overlay"]
              )
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              "data-testid": "visual-builder__overlay--right",
              className: (0, import_classnames.default)(
                "visual-builder__overlay visual-builder__overlay--right",
                (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__overlay"]
              )
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              "data-testid": "visual-builder__overlay--bottom",
              className: (0, import_classnames.default)(
                "visual-builder__overlay visual-builder__overlay--bottom",
                (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__overlay"]
              )
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              "data-testid": "visual-builder__overlay--outline",
              className: (0, import_classnames.default)(
                "visual-builder__overlay--outline",
                (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__overlay--outline"]
              )
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        className: (0, import_classnames.default)(
          "visual-builder__hover-outline visual-builder__hover-outline--unclickable",
          (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__hover-outline"],
          (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__hover-outline--unclickable"]
        ),
        "data-testid": "visual-builder__hover-outline"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        className: (0, import_classnames.default)(
          "visual-builder__focused-toolbar",
          (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__focused-toolbar"]
        ),
        "data-testid": "visual-builder__focused-toolbar"
      }
    )
  ] });
}
var VisualBuilder_default = VisualBuilderComponent;
//# sourceMappingURL=VisualBuilder.cjs.map