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

// src/livePreview/onPageTraversal.ts
var onPageTraversal_exports = {};
__export(onPageTraversal_exports, {
  handlePageTraversal: () => handlePageTraversal
});
module.exports = __toCommonJS(onPageTraversal_exports);
var import_livePreviewEventManager = __toESM(require("./eventManager/livePreviewEventManager.cjs"), 1);
var import_livePreviewEventManager2 = require("./eventManager/livePreviewEventManager.constant.cjs");
function handlePageTraversal() {
  window.addEventListener("unload", () => {
    var _a;
    const targetURL = document.activeElement.href;
    if (targetURL) {
      (_a = import_livePreviewEventManager.default) == null ? void 0 : _a.send(
        import_livePreviewEventManager2.LIVE_PREVIEW_POST_MESSAGE_EVENTS.URL_CHANGE,
        {
          targetURL
        }
      );
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handlePageTraversal
});
//# sourceMappingURL=onPageTraversal.cjs.map