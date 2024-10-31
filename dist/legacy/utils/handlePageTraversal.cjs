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

// src/utils/handlePageTraversal.ts
var handlePageTraversal_exports = {};
__export(handlePageTraversal_exports, {
  handlePageTraversal: () => handlePageTraversal
});
module.exports = __toCommonJS(handlePageTraversal_exports);
var handlePageTraversal = () => {
  window.addEventListener("unload", () => {
    const targetURL = document.activeElement.href;
    if (targetURL) {
      window.parent.postMessage(
        {
          from: "live-preview",
          type: "url-change",
          data: {
            targetURL
          }
        },
        "*"
      );
    }
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handlePageTraversal
});
//# sourceMappingURL=handlePageTraversal.cjs.map