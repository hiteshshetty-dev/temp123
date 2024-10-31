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

// src/visualBuilder/utils/types/index.types.ts
var index_types_exports = {};
__export(index_types_exports, {
  FieldDataType: () => FieldDataType
});
module.exports = __toCommonJS(index_types_exports);
var FieldDataType = /* @__PURE__ */ ((FieldDataType2) => {
  FieldDataType2["CUSTOM_FIELD"] = "custom_field";
  FieldDataType2["MULTILINE"] = "multiline";
  FieldDataType2["HTML_RTE"] = "html_rte";
  FieldDataType2["MARKDOWN_RTE"] = "markdown_rte";
  FieldDataType2["SELECT"] = "select";
  FieldDataType2["URL"] = "url";
  FieldDataType2["SINGLELINE"] = "singleline";
  FieldDataType2["JSON_RTE"] = "json_rte";
  FieldDataType2["MODULAR_BLOCK"] = "modular_block";
  FieldDataType2["LINK"] = "link";
  FieldDataType2["ISODATE"] = "isodate";
  FieldDataType2["BOOLEAN"] = "boolean";
  FieldDataType2["BLOCK"] = "block";
  FieldDataType2["NUMBER"] = "number";
  FieldDataType2["REFERENCE"] = "reference";
  FieldDataType2["GROUP"] = "group";
  FieldDataType2["EXPERIENCE_CONTAINER"] = "experience_container";
  FieldDataType2["FILE"] = "file";
  FieldDataType2["GLOBAL_FIELD"] = "global_field";
  FieldDataType2["TAXONOMY"] = "taxonomy";
  return FieldDataType2;
})(FieldDataType || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FieldDataType
});
//# sourceMappingURL=index.types.cjs.map