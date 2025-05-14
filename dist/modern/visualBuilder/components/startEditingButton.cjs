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

// src/visualBuilder/components/startEditingButton.tsx
var startEditingButton_exports = {};
__export(startEditingButton_exports, {
  default: () => startEditingButton_default,
  getEditButtonPosition: () => getEditButtonPosition
});
module.exports = __toCommonJS(startEditingButton_exports);
var import_classnames = __toESM(require("classnames"), 1);
var import_getVisualBuilderRedirectionUrl = __toESM(require("../utils/getVisualBuilderRedirectionUrl.cjs"), 1);
var import_icons = require("./icons/index.cjs");
var import_visualBuilder = require("../visualBuilder.style.cjs");
var import_configManager = __toESM(require("../../configManager/configManager.cjs"), 1);
var import_jsx_runtime = require("preact/jsx-runtime");
var positionStyles = {
  "bottom-right": (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__start-editing-btn__bottom-right"],
  "bottom-left": (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__start-editing-btn__bottom-left"],
  "top-left": (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__start-editing-btn__top-left"],
  "top-right": (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__start-editing-btn__top-right"]
};
function getEditButtonPosition(position) {
  const validPositions = ["bottom-left", "bottom-right", "top-left", "top-right"];
  if (validPositions.includes(position)) {
    return position;
  } else {
    return "bottom-right";
  }
}
function StartEditingButtonComponent() {
  const config = import_configManager.default.get();
  const enable = config.editInVisualBuilderButton.enable;
  const position = config.editInVisualBuilderButton.position || "bottom-right";
  function updateTargetUrl(e) {
    const targetElement = e.target;
    targetElement.setAttribute(
      "href",
      (0, import_getVisualBuilderRedirectionUrl.default)().toString()
    );
  }
  return enable ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "a",
    {
      href: (0, import_getVisualBuilderRedirectionUrl.default)().toString(),
      className: (0, import_classnames.default)(
        "visual-builder__start-editing-btn",
        (0, import_visualBuilder.visualBuilderStyles)()["visual-builder__start-editing-btn"],
        positionStyles[getEditButtonPosition(position)]
      ),
      "data-testid": "vcms-start-editing-btn",
      onMouseEnter: (e) => updateTargetUrl(e),
      onFocus: (e) => updateTargetUrl(e),
      onClick: (e) => updateTargetUrl(e),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons.EditIcon, {}),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Start Editing" })
      ]
    }
  ) : null;
}
var startEditingButton_default = StartEditingButtonComponent;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getEditButtonPosition
});
//# sourceMappingURL=startEditingButton.cjs.map