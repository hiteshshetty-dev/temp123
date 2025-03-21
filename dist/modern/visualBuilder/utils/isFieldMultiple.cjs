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

// src/visualBuilder/utils/isFieldMultiple.ts
var isFieldMultiple_exports = {};
__export(isFieldMultiple_exports, {
  isFieldMultiple: () => isFieldMultiple
});
module.exports = __toCommonJS(isFieldMultiple_exports);
function isFieldMultiple(fieldSchema) {
  return fieldSchema && (fieldSchema.multiple || fieldSchema.data_type === "reference" && // @ts-expect-error field_metadata will contain ref_multiple
  // for reference fields
  fieldSchema.field_metadata.ref_multiple);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isFieldMultiple
});
//# sourceMappingURL=isFieldMultiple.cjs.map