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

// src/visualBuilder/utils/getPsuedoEditableEssentialStyles.ts
var getPsuedoEditableEssentialStyles_exports = {};
__export(getPsuedoEditableEssentialStyles_exports, {
  getPsuedoEditableEssentialStyles: () => getPsuedoEditableEssentialStyles
});
module.exports = __toCommonJS(getPsuedoEditableEssentialStyles_exports);
var import_getCamelCaseStyles = __toESM(require("./getCamelCaseStyles.cjs"), 1);
function getPsuedoEditableEssentialStyles({
  rect,
  camelCase
}) {
  const overrides = {
    position: "absolute",
    top: `${rect.top + window.scrollY}px`,
    left: `${rect.left + window.scrollX}px`,
    height: "auto",
    "min-height": `${Math.abs(rect.height)}px`,
    "white-space": "normal",
    "text-transform": "none",
    "text-wrap-mode": "wrap",
    "text-overflow": "visible"
  };
  return camelCase ? (0, import_getCamelCaseStyles.default)(overrides) : overrides;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getPsuedoEditableEssentialStyles
});
//# sourceMappingURL=getPsuedoEditableEssentialStyles.cjs.map