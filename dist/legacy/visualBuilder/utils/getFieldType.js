import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/getFieldType.ts
import { FieldDataType } from "./types/index.types.js";
function getFieldType(fieldSchema) {
  var _a, _b, _c, _d, _e;
  if (!fieldSchema) return;
  if (Object.hasOwnProperty.call(fieldSchema, "extension_uid")) {
    return FieldDataType.CUSTOM_FIELD;
  }
  switch (fieldSchema.data_type) {
    case "text": {
      if ((_a = fieldSchema.field_metadata) == null ? void 0 : _a.multiline) {
        return FieldDataType.MULTILINE;
      } else if ((_b = fieldSchema.field_metadata) == null ? void 0 : _b.allow_rich_text) {
        return FieldDataType.HTML_RTE;
      } else if ((_c = fieldSchema.field_metadata) == null ? void 0 : _c.markdown) {
        return FieldDataType.MARKDOWN_RTE;
      } else if (fieldSchema.enum) {
        return FieldDataType.SELECT;
      } else if (fieldSchema.uid === "url" && ((_d = fieldSchema.field_metadata) == null ? void 0 : _d._default)) {
        return FieldDataType.URL;
      } else {
        return FieldDataType.SINGLELINE;
      }
    }
    case "json": {
      if ((_e = fieldSchema.field_metadata) == null ? void 0 : _e.allow_json_rte) {
        return FieldDataType.JSON_RTE;
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
      return FieldDataType[fieldSchema.data_type.toUpperCase()];
    }
  }
  return "";
}
export {
  getFieldType
};
//# sourceMappingURL=getFieldType.js.map