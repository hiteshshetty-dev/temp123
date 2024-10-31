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

// src/visualBuilder/utils/constants.ts
var constants_exports = {};
__export(constants_exports, {
  ALLOWED_INLINE_EDITABLE_FIELD: () => ALLOWED_INLINE_EDITABLE_FIELD,
  ALLOWED_MODAL_EDITABLE_FIELD: () => ALLOWED_MODAL_EDITABLE_FIELD,
  ALLOWED_REPLACE_FIELDS: () => ALLOWED_REPLACE_FIELDS,
  DATA_CSLP_ATTR_SELECTOR: () => DATA_CSLP_ATTR_SELECTOR,
  DEFAULT_MULTIPLE_FIELDS: () => DEFAULT_MULTIPLE_FIELDS,
  LIVE_PREVIEW_OUTLINE_WIDTH_IN_PX: () => LIVE_PREVIEW_OUTLINE_WIDTH_IN_PX,
  RIGHT_EDGE_BUFFER: () => RIGHT_EDGE_BUFFER,
  TOOLBAR_EDGE_BUFFER: () => TOOLBAR_EDGE_BUFFER,
  TOP_EDGE_BUFFER: () => TOP_EDGE_BUFFER,
  VISUAL_BUILDER_CHANNEL_ID: () => VISUAL_BUILDER_CHANNEL_ID,
  VISUAL_BUILDER_FIELD_TYPE_ATTRIBUTE_KEY: () => VISUAL_BUILDER_FIELD_TYPE_ATTRIBUTE_KEY,
  numericInputRegex: () => numericInputRegex
});
module.exports = __toCommonJS(constants_exports);
var import_types = require("./types/index.types.cjs");
var numericInputRegex = /^-?\d*(\.\d*)?([eE][-+]?\d*)?$/;
var VISUAL_BUILDER_FIELD_TYPE_ATTRIBUTE_KEY = "data-cslp-field-type";
var VISUAL_BUILDER_CHANNEL_ID = "visual-builder";
var LIVE_PREVIEW_OUTLINE_WIDTH_IN_PX = 2;
var TOP_EDGE_BUFFER = 42;
var RIGHT_EDGE_BUFFER = 180;
var TOOLBAR_EDGE_BUFFER = 8;
var DATA_CSLP_ATTR_SELECTOR = "data-cslp";
var ALLOWED_INLINE_EDITABLE_FIELD = [
  import_types.FieldDataType.SINGLELINE,
  import_types.FieldDataType.MULTILINE,
  import_types.FieldDataType.NUMBER
];
var ALLOWED_MODAL_EDITABLE_FIELD = [
  import_types.FieldDataType.HTML_RTE,
  import_types.FieldDataType.MARKDOWN_RTE,
  import_types.FieldDataType.JSON_RTE,
  import_types.FieldDataType.CUSTOM_FIELD,
  import_types.FieldDataType.LINK,
  import_types.FieldDataType.ISODATE,
  import_types.FieldDataType.URL
];
var ALLOWED_REPLACE_FIELDS = [
  import_types.FieldDataType.REFERENCE,
  import_types.FieldDataType.FILE
];
var DEFAULT_MULTIPLE_FIELDS = [
  import_types.FieldDataType.GLOBAL_FIELD,
  import_types.FieldDataType.GROUP,
  import_types.FieldDataType.BLOCK
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ALLOWED_INLINE_EDITABLE_FIELD,
  ALLOWED_MODAL_EDITABLE_FIELD,
  ALLOWED_REPLACE_FIELDS,
  DATA_CSLP_ATTR_SELECTOR,
  DEFAULT_MULTIPLE_FIELDS,
  LIVE_PREVIEW_OUTLINE_WIDTH_IN_PX,
  RIGHT_EDGE_BUFFER,
  TOOLBAR_EDGE_BUFFER,
  TOP_EDGE_BUFFER,
  VISUAL_BUILDER_CHANNEL_ID,
  VISUAL_BUILDER_FIELD_TYPE_ATTRIBUTE_KEY,
  numericInputRegex
});
//# sourceMappingURL=constants.cjs.map