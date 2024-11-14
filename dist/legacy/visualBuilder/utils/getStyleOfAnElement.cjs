"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/visualBuilder/utils/getStyleOfAnElement.ts
var getStyleOfAnElement_exports = {};
__export(getStyleOfAnElement_exports, {
  default: () => getStyleOfAnElement
});
module.exports = __toCommonJS(getStyleOfAnElement_exports);
function getStyleOfAnElement(element) {
  const styleSheetDeclaration = window.getComputedStyle(element);
  const styleSheetArray = Array.from(styleSheetDeclaration);
  const FILTER_STYLES = [
    "position",
    "left",
    "top",
    "right",
    "bottom",
    "text-overflow",
    // allows seeing the text from CMS field as-is
    "text-transform",
    "margin",
    "margin-block-end",
    "margin-block-start",
    "margin-inline-end",
    "margin-inline-start",
    "margin-left",
    "margin-right",
    "margin-top",
    "margin-bottom",
    "-webkit-user-modify",
    "cursor"
  ];
  const styles = {};
  styleSheetArray.forEach((style) => {
    if (!FILTER_STYLES.includes(style)) {
      const styleValue = styleSheetDeclaration.getPropertyValue(style);
      styles[style] = styleValue;
    }
  });
  return styles;
}
//# sourceMappingURL=getStyleOfAnElement.cjs.map