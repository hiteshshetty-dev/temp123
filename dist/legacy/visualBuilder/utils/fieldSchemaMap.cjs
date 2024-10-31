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

// src/visualBuilder/utils/fieldSchemaMap.ts
var fieldSchemaMap_exports = {};
__export(fieldSchemaMap_exports, {
  FieldSchemaMap: () => FieldSchemaMap
});
module.exports = __toCommonJS(fieldSchemaMap_exports);
var import_lodash_es = require("lodash-es");
var import_visualBuilderPostMessage = __toESM(require("./visualBuilderPostMessage.cjs"), 1);
var import_postMessage = require("./types/postMessage.types.cjs");
var _FieldSchemaMap = class _FieldSchemaMap {
  static async fetchFieldSchema(content_type_uid) {
    var _a, _b;
    if (!((_a = _FieldSchemaMap.fieldSchemaPromise) == null ? void 0 : _a[content_type_uid])) {
      _FieldSchemaMap.fieldSchemaPromise[content_type_uid] = (_b = import_visualBuilderPostMessage.default) == null ? void 0 : _b.send(
        import_postMessage.VisualBuilderPostMessageEvents.GET_FIELD_SCHEMA,
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
    return (0, import_lodash_es.has)(_FieldSchemaMap.fieldSchema, [contentTypeUid, fieldCslp]);
  }
  /**
   * Checks if two field schemas are equal.
   * @param firstFieldSchema - The first field schema to compare.
   * @param secondFieldSchema - The second field schema to compare.
   * @returns True if the field schemas are equal, false otherwise.
   */
  static areFieldSchemaEqual(firstFieldSchema, secondFieldSchema) {
    return (0, import_lodash_es.isEqual)(firstFieldSchema, secondFieldSchema);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FieldSchemaMap
});
//# sourceMappingURL=fieldSchemaMap.cjs.map