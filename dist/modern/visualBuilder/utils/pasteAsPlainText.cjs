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

// src/visualBuilder/utils/pasteAsPlainText.ts
var pasteAsPlainText_exports = {};
__export(pasteAsPlainText_exports, {
  pasteAsPlainText: () => pasteAsPlainText
});
module.exports = __toCommonJS(pasteAsPlainText_exports);
var import_lodash_es = require("lodash-es");
var pasteAsPlainText = (0, import_lodash_es.debounce)(
  (e) => {
    e.preventDefault();
    const clipboardData = e.clipboardData;
    document.execCommand(
      "inserttext",
      false,
      clipboardData?.getData("text/plain")
    );
  },
  100,
  { leading: true }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pasteAsPlainText
});
//# sourceMappingURL=pasteAsPlainText.cjs.map