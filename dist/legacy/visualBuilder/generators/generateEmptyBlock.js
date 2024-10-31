import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/generators/generateEmptyBlock.tsx
import { hydrate } from "preact";
import { EmptyBlock } from "../components/emptyBlock.js";
import { extractDetailsFromCslp } from "../../cslp/index.js";
import { FieldSchemaMap } from "../utils/fieldSchemaMap.js";
import { jsx } from "preact/jsx-runtime";
async function generateEmptyBlocks(emptyBlockParents) {
  for (const emptyBlockParent of emptyBlockParents) {
    const cslpData = emptyBlockParent.getAttribute("data-cslp");
    if (!cslpData) {
      return;
    }
    const fieldMetadata = extractDetailsFromCslp(cslpData);
    const fieldSchema = await FieldSchemaMap.getFieldSchema(
      fieldMetadata.content_type_uid,
      fieldMetadata.fieldPath
    );
    if (!fieldSchema) {
      return;
    }
    hydrate(
      /* @__PURE__ */ jsx(
        EmptyBlock,
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
  emptyBlockParents == null ? void 0 : emptyBlockParents.forEach((emptyBlockParent) => {
    const emptyBlock = emptyBlockParent.querySelector(
      ".visual-builder__empty-block"
    );
    if (emptyBlock) {
      emptyBlock.remove();
    }
  });
}
export {
  generateEmptyBlocks,
  removeEmptyBlocks
};
//# sourceMappingURL=generateEmptyBlock.js.map