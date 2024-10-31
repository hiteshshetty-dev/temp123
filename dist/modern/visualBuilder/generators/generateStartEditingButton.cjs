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

// src/visualBuilder/generators/generateStartEditingButton.tsx
var generateStartEditingButton_exports = {};
__export(generateStartEditingButton_exports, {
  generateStartEditingButton: () => generateStartEditingButton
});
module.exports = __toCommonJS(generateStartEditingButton_exports);
var import_preact = require("preact");
var import_logger = require("../../logger/logger.cjs");
var import_startEditingButton = __toESM(require("../components/startEditingButton.cjs"), 1);
var import_jsx_runtime = require("preact/jsx-runtime");
function generateStartEditingButton(visualBuilderContainer) {
  if (!visualBuilderContainer) {
    import_logger.PublicLogger.warn("Visual builder overlay not found.");
    return;
  }
  const wrapper = document.createDocumentFragment();
  (0, import_preact.render)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_startEditingButton.default, {}), wrapper);
  visualBuilderContainer?.appendChild(wrapper);
  const startEditingButton = document.querySelector(
    ".visual-builder__start-editing-btn"
  );
  return startEditingButton;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generateStartEditingButton
});
//# sourceMappingURL=generateStartEditingButton.cjs.map