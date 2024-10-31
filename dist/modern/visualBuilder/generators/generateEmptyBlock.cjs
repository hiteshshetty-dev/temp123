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

// src/visualBuilder/generators/generateEmptyBlock.tsx
var generateEmptyBlock_exports = {};
__export(generateEmptyBlock_exports, {
  generateEmptyBlocks: () => generateEmptyBlocks,
  removeEmptyBlocks: () => removeEmptyBlocks
});
module.exports = __toCommonJS(generateEmptyBlock_exports);
var import_preact = require("preact");
var import_emptyBlock = require("../components/emptyBlock.cjs");
var import_cslp = require("../../cslp/index.cjs");
var import_fieldSchemaMap = require("../utils/fieldSchemaMap.cjs");
var import_jsx_runtime = require("preact/jsx-runtime");
async function generateEmptyBlocks(emptyBlockParents) {
  for (const emptyBlockParent of emptyBlockParents) {
    const cslpData = emptyBlockParent.getAttribute("data-cslp");
    if (!cslpData) {
      return;
    }
    const fieldMetadata = (0, import_cslp.extractDetailsFromCslp)(cslpData);
    const fieldSchema = await import_fieldSchemaMap.FieldSchemaMap.getFieldSchema(
      fieldMetadata.content_type_uid,
      fieldMetadata.fieldPath
    );
    if (!fieldSchema) {
      return;
    }
    (0, import_preact.hydrate)(
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_emptyBlock.EmptyBlock,
        {
          details: {
            fieldSchema,
            fieldMetadata
          }
        }
      ),
      emptyBlockParent
    );
  }
}
function removeEmptyBlocks(emptyBlockParents) {
  emptyBlockParents?.forEach((emptyBlockParent) => {
    const emptyBlock = emptyBlockParent.querySelector(
      ".visual-builder__empty-block"
    );
    if (emptyBlock) {
      emptyBlock.remove();
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generateEmptyBlocks,
  removeEmptyBlocks
});
//# sourceMappingURL=generateEmptyBlock.cjs.map