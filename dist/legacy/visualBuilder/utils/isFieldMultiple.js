import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/isFieldMultiple.ts
function isFieldMultiple(fieldSchema) {
  return fieldSchema && (fieldSchema.multiple || fieldSchema.data_type === "reference" && // @ts-expect-error field_metadata will contain ref_multiple
  // for reference fields
  fieldSchema.field_metadata.ref_multiple);
}
export {
  isFieldMultiple
};
//# sourceMappingURL=isFieldMultiple.js.map