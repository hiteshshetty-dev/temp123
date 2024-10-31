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

// src/visualBuilder/utils/getChildrenDirection.ts
var getChildrenDirection_exports = {};
__export(getChildrenDirection_exports, {
  default: () => getChildrenDirection
});
module.exports = __toCommonJS(getChildrenDirection_exports);
var import_getChildElements = __toESM(require("./getChildElements.cjs"), 1);
function getChildrenDirection(editableElement, parentCslpValue) {
  if (!editableElement) {
    return "none";
  }
  const parentElement = editableElement.closest(
    `[data-cslp="${parentCslpValue}"]`
  );
  if (!parentElement) {
    return "none";
  }
  const [firstChildElement, secondChildElement, removeClone] = (0, import_getChildElements.default)(parentElement, parentCslpValue);
  if (!firstChildElement) return "none";
  const firstChildBounds = firstChildElement.getBoundingClientRect();
  const secondChildBounds = secondChildElement.getBoundingClientRect();
  const deltaX = Math.abs(firstChildBounds.left - secondChildBounds.left);
  const deltaY = Math.abs(firstChildBounds.top - secondChildBounds.top);
  const dir = deltaX > deltaY ? "horizontal" : "vertical";
  removeClone();
  return dir;
}
//# sourceMappingURL=getChildrenDirection.cjs.map