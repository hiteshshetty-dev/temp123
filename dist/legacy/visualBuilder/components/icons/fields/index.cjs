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

// src/visualBuilder/components/icons/fields/index.ts
var fields_exports = {};
__export(fields_exports, {
  fieldIcons: () => fieldIcons
});
module.exports = __toCommonJS(fields_exports);
var import__ = require("../index.cjs");
var fieldIcons = {
  link: import__.EditIcon,
  json_rte: import__.EditIcon,
  html_rte: import__.EditIcon,
  markdown_rte: import__.EditIcon,
  custom_field: import__.EditIcon,
  isodate: import__.EditIcon,
  url: import__.EditIcon
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fieldIcons
});
//# sourceMappingURL=index.cjs.map