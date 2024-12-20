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

// src/visualBuilder/utils/insertSpaceAtCursor.ts
var insertSpaceAtCursor_exports = {};
__export(insertSpaceAtCursor_exports, {
  insertSpaceAtCursor: () => insertSpaceAtCursor
});
module.exports = __toCommonJS(insertSpaceAtCursor_exports);
var import_constants = require("./constants.cjs");
function insertSpaceAtCursor(element) {
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const spaceNode = document.createTextNode(import_constants.unicodeNonBreakingSpace);
    range.deleteContents();
    range.insertNode(spaceNode);
    range.setStartAfter(spaceNode);
    range.setEndAfter(spaceNode);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  insertSpaceAtCursor
});
//# sourceMappingURL=insertSpaceAtCursor.cjs.map