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

// src/visualBuilder/generators/generateAddInstanceButtons.tsx
var generateAddInstanceButtons_exports = {};
__export(generateAddInstanceButtons_exports, {
  generateAddInstanceButton: () => generateAddInstanceButton,
  getAddInstanceButtons: () => getAddInstanceButtons
});
module.exports = __toCommonJS(generateAddInstanceButtons_exports);
var import_preact = require("preact");
var import_addInstanceButton = __toESM(require("../components/addInstanceButton.cjs"), 1);
var import_jsx_runtime = require("preact/jsx-runtime");
function generateAddInstanceButton({
  fieldSchema,
  value,
  onClick,
  label
}) {
  const wrapper = document.createDocumentFragment();
  (0, import_preact.render)(
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_addInstanceButton.default,
      {
        value,
        label,
        onClick,
        fieldSchema
      }
    ),
    wrapper
  );
  const button = wrapper.children[0];
  return button;
}
function getAddInstanceButtons(visualBuilderContainer, getAllButtons = false) {
  const buttons = visualBuilderContainer.getElementsByClassName(
    "visual-builder__add-button"
  );
  if (getAllButtons) {
    return Array.from(buttons);
  }
  if (buttons.length < 2) {
    return null;
  }
  const previousButton = buttons[0];
  const nextButton = buttons[1];
  return [previousButton, nextButton];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generateAddInstanceButton,
  getAddInstanceButtons
});
//# sourceMappingURL=generateAddInstanceButtons.cjs.map