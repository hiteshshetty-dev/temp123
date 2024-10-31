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

// src/visualBuilder/utils/getMultilinePlaintext.ts
var getMultilinePlaintext_exports = {};
__export(getMultilinePlaintext_exports, {
  getMultilinePlaintext: () => getMultilinePlaintext
});
module.exports = __toCommonJS(getMultilinePlaintext_exports);
function getMultilinePlaintext(editableElement) {
  let newValue = "";
  let isOnFreshLine = true;
  function parseChildNodesForValueAndLines(childNodes) {
    for (let i = 0; i < childNodes.length; i++) {
      const childNode = childNodes[i];
      if (childNode.nodeName === "BR") {
        newValue += "\n";
        isOnFreshLine = true;
        continue;
      }
      if (childNode.nodeName === "DIV" && isOnFreshLine === false && i !== 0) {
        newValue += "\n";
      }
      isOnFreshLine = false;
      if (childNode.nodeType === 3 && childNode.textContent && childNode.textContent.trim() !== "") {
        newValue += childNode.textContent;
      }
      parseChildNodesForValueAndLines(childNode.childNodes);
    }
  }
  parseChildNodesForValueAndLines(editableElement.childNodes);
  return newValue;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getMultilinePlaintext
});
//# sourceMappingURL=getMultilinePlaintext.cjs.map