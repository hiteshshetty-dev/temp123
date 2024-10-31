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

// src/visualBuilder/listeners/keyboardShortcuts.ts
var keyboardShortcuts_exports = {};
__export(keyboardShortcuts_exports, {
  addKeyboardShortcuts: () => addKeyboardShortcuts
});
module.exports = __toCommonJS(keyboardShortcuts_exports);
var import_generateOverlay = require("../generators/generateOverlay.cjs");
function addKeyboardShortcuts({
  overlayWrapper,
  visualBuilderContainer,
  focusedToolbar,
  resizeObserver
}) {
  document.addEventListener("keydown", (e) => {
    const event = e;
    if (event.key === "Escape") {
      (0, import_generateOverlay.hideOverlay)({
        visualBuilderOverlayWrapper: overlayWrapper,
        visualBuilderContainer,
        focusedToolbar,
        resizeObserver
      });
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addKeyboardShortcuts
});
//# sourceMappingURL=keyboardShortcuts.cjs.map