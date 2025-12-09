import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/constants.ts
import { FieldDataType } from "./types/index.types.js";
var numericInputRegex = /^-?\d*(\.\d*)?([eE][-+]?\d*)?$/;
var VISUAL_BUILDER_FIELD_TYPE_ATTRIBUTE_KEY = "data-cslp-field-type";
var VISUAL_BUILDER_CHANNEL_ID = "visual-builder";
var LIVE_PREVIEW_OUTLINE_WIDTH_IN_PX = 2;
var TOP_EDGE_BUFFER = 42;
var RIGHT_EDGE_BUFFER = 180;
var TOOLBAR_EDGE_BUFFER = 8;
var DATA_CSLP_ATTR_SELECTOR = "data-cslp";
var RESULT_TYPES = Object.freeze({
  SUCCESS: "success",
  ERROR: "error"
});
var WORKFLOW_STAGES = Object.freeze({
  REVIEW: "Review Stage",
  FINAL_REVIEW: "Final Review",
  UNKNOWN: "Unknown"
});
var ALLOWED_INLINE_EDITABLE_FIELD = [
  FieldDataType.SINGLELINE,
  FieldDataType.MULTILINE,
  FieldDataType.NUMBER
];
var ALLOWED_MODAL_EDITABLE_FIELD = [
  FieldDataType.HTML_RTE,
  FieldDataType.MARKDOWN_RTE,
  FieldDataType.JSON_RTE,
  FieldDataType.CUSTOM_FIELD,
  FieldDataType.LINK,
  FieldDataType.ISODATE,
  FieldDataType.URL
];
var ALLOWED_REPLACE_FIELDS = [
  FieldDataType.REFERENCE,
  FieldDataType.FILE
];
var DEFAULT_MULTIPLE_FIELDS = [
  FieldDataType.GLOBAL_FIELD,
  FieldDataType.GROUP,
  FieldDataType.BLOCK
];
var unicodeNonBreakingSpace = "\xA0";
var mentionLimit = 20;
var maxMessageLength = 500;
export {
  ALLOWED_INLINE_EDITABLE_FIELD,
  ALLOWED_MODAL_EDITABLE_FIELD,
  ALLOWED_REPLACE_FIELDS,
  DATA_CSLP_ATTR_SELECTOR,
  DEFAULT_MULTIPLE_FIELDS,
  LIVE_PREVIEW_OUTLINE_WIDTH_IN_PX,
  RESULT_TYPES,
  RIGHT_EDGE_BUFFER,
  TOOLBAR_EDGE_BUFFER,
  TOP_EDGE_BUFFER,
  VISUAL_BUILDER_CHANNEL_ID,
  VISUAL_BUILDER_FIELD_TYPE_ATTRIBUTE_KEY,
  WORKFLOW_STAGES,
  maxMessageLength,
  mentionLimit,
  numericInputRegex,
  unicodeNonBreakingSpace
};
//# sourceMappingURL=constants.js.map