import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/fieldSchemaMap.ts
import { has, isEqual } from "lodash-es";
import visualBuilderPostMessage from "./visualBuilderPostMessage.js";
import { VisualBuilderPostMessageEvents } from "./types/postMessage.types.js";
var _FieldSchemaMap = class _FieldSchemaMap {
  static async fetchFieldSchema(content_type_uid) {
    var _a, _b;
    if (!((_a = _FieldSchemaMap.fieldSchemaPromise) == null ? void 0 : _a[content_type_uid])) {
      _FieldSchemaMap.fieldSchemaPromise[content_type_uid] = (_b = visualBuilderPostMessage) == null ? void 0 : _b.send(
        VisualBuilderPostMessageEvents.GET_FIELD_SCHEMA,
        {
          contentTypeUid: content_type_uid
        }
      );
    }
    return _FieldSchemaMap.fieldSchemaPromise[content_type_uid];
  }
  /**
   * Retrieves the schema field map for a given content type and field Cslp.
   * @param contentTypeUid - The unique identifier of the content type.
   * @param fieldCslp - The Cslp of the field.
   * @returns The schema field map.
   */
  static async getFieldSchema(contentTypeUid, fieldCslp) {
    var _a, _b;
    if (_FieldSchemaMap.hasFieldSchema(contentTypeUid, fieldCslp)) {
      return Promise.resolve(
        _FieldSchemaMap.fieldSchema[contentTypeUid][fieldCslp]
      );
    }
    const data = await _FieldSchemaMap.fetchFieldSchema(contentTypeUid);
    if (data == null ? void 0 : data.fieldSchemaMap) {
      _FieldSchemaMap.fieldSchema[contentTypeUid] = data.fieldSchemaMap;
    }
    return ((_b = (_a = _FieldSchemaMap == null ? void 0 : _FieldSchemaMap.fieldSchema) == null ? void 0 : _a[contentTypeUid]) == null ? void 0 : _b[fieldCslp]) || null;
  }
  static hasFieldSchema(contentTypeUid, fieldCslp) {
    return has(_FieldSchemaMap.fieldSchema, [contentTypeUid, fieldCslp]);
  }
  /**
   * Checks if two field schemas are equal.
   * @param firstFieldSchema - The first field schema to compare.
   * @param secondFieldSchema - The second field schema to compare.
   * @returns True if the field schemas are equal, false otherwise.
   */
  static areFieldSchemaEqual(firstFieldSchema, secondFieldSchema) {
    return isEqual(firstFieldSchema, secondFieldSchema);
  }
  /**
   * Sets the field schema for a given content type.
   * @param contentTypeUid The unique identifier of the content type.
   * @param fieldSchemaMap The map of individual field schemas.
   */
  static setFieldSchema(contentTypeUid, fieldSchemaMap) {
    _FieldSchemaMap.fieldSchema[contentTypeUid] = fieldSchemaMap;
  }
  /**
   * Clears the field schema cache.
   */
  static clear() {
    _FieldSchemaMap.fieldSchema = {};
  }
};
_FieldSchemaMap.fieldSchema = {};
_FieldSchemaMap.fieldSchemaPromise = {};
var FieldSchemaMap = _FieldSchemaMap;
export {
  FieldSchemaMap
};
//# sourceMappingURL=fieldSchemaMap.js.map