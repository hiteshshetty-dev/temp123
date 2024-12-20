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

// src/visualBuilder/utils/getFieldType.ts
var getFieldType_exports = {};
__export(getFieldType_exports, {
  getFieldType: () => getFieldType
});
module.exports = __toCommonJS(getFieldType_exports);
var import_types = require("./types/index.types.cjs");
function getFieldType(fieldSchema) {
  var _a, _b, _c, _d, _e;
  if (!fieldSchema) return;
  if (Object.hasOwnProperty.call(fieldSchema, "extension_uid")) {
    return import_types.FieldDataType.CUSTOM_FIELD;
  }
  switch (fieldSchema.data_type) {
    case "text": {
      if ((_a = fieldSchema.field_metadata) == null ? void 0 : _a.multiline) {
        return import_types.FieldDataType.MULTILINE;
      } else if ((_b = fieldSchema.field_metadata) == null ? void 0 : _b.allow_rich_text) {
        return import_types.FieldDataType.HTML_RTE;
      } else if ((_c = fieldSchema.field_metadata) == null ? void 0 : _c.markdown) {
        return import_types.FieldDataType.MARKDOWN_RTE;
      } else if (fieldSchema.enum) {
        return import_types.FieldDataType.SELECT;
      } else if (fieldSchema.uid === "url" && ((_d = fieldSchema.field_metadata) == null ? void 0 : _d._default)) {
        return import_types.FieldDataType.URL;
      } else {
        return import_types.FieldDataType.SINGLELINE;
      }
    }
    case "json": {
      if ((_e = fieldSchema.field_metadata) == null ? void 0 : _e.allow_json_rte) {
        return import_types.FieldDataType.JSON_RTE;
      }
      break;
    }
    case "blocks": {
      return "modular_block";
    }
    case "link":
    case "isodate":
    case "boolean":
    case "block":
    case "number":
    case "reference":
    case "group":
    case "experience_container":
    case "file":
    case "taxonomy":
    case "global_field": {
      return import_types.FieldDataType[fieldSchema.data_type.toUpperCase()];
    }
  }
  return "";
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getFieldType
});
//# sourceMappingURL=getFieldType.cjs.map