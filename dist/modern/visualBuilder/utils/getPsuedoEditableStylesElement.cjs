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

// src/visualBuilder/utils/getPsuedoEditableStylesElement.ts
var getPsuedoEditableStylesElement_exports = {};
__export(getPsuedoEditableStylesElement_exports, {
  getPsuedoEditableElementStyles: () => getPsuedoEditableElementStyles
});
module.exports = __toCommonJS(getPsuedoEditableStylesElement_exports);
var import_getCamelCaseStyles = __toESM(require("./getCamelCaseStyles.cjs"), 1);
var import_getPsuedoEditableEssentialStyles = require("./getPsuedoEditableEssentialStyles.cjs");
var import_getStyleOfAnElement = __toESM(require("./getStyleOfAnElement.cjs"), 1);
function getPsuedoEditableElementStyles(psuedoEditableElement, camelCase) {
  let styles = (0, import_getStyleOfAnElement.default)(psuedoEditableElement);
  const rect = psuedoEditableElement.getBoundingClientRect();
  if (camelCase) {
    styles = (0, import_getCamelCaseStyles.default)(styles);
  }
  const overrides = (0, import_getPsuedoEditableEssentialStyles.getPsuedoEditableEssentialStyles)({ rect, camelCase });
  return { ...styles, ...overrides };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getPsuedoEditableElementStyles
});
//# sourceMappingURL=getPsuedoEditableStylesElement.cjs.map