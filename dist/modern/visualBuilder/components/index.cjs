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

// src/visualBuilder/components/index.tsx
var components_exports = {};
__export(components_exports, {
  default: () => components_default
});
module.exports = __toCommonJS(components_exports);
var import_preact = require("preact");
var import_VisualBuilder = __toESM(require("./VisualBuilder.cjs"), 1);
var import_visualBuilder = require("../visualBuilder.style.cjs");
var import_utils = require("../../utils/index.cjs");
var import_jsx_runtime = require("preact/jsx-runtime");
function initUI(props) {
  const visualBuilderDOM = document.querySelector(
    `.visual-builder__container`
  );
  const isInBuilder = (0, import_utils.isOpenInBuilder)();
  if (!visualBuilderDOM && isInBuilder) {
    const visualBuilderContainer = document.createElement("div");
    visualBuilderContainer.classList.add(
      (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__container"],
      "visual-builder__container"
    );
    visualBuilderContainer.setAttribute(
      "data-testid",
      "visual-builder__container"
    );
    document.body.appendChild(visualBuilderContainer);
    (0, import_preact.render)(
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_VisualBuilder.default,
        {
          visualBuilderContainer,
          resizeObserver: props.resizeObserver
        }
      ),
      visualBuilderContainer
    );
  }
  return;
}
var components_default = initUI;
//# sourceMappingURL=index.cjs.map