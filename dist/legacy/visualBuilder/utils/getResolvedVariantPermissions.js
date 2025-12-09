import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/getResolvedVariantPermissions.ts
import { VisualBuilderPostMessageEvents } from "./types/postMessage.types.js";
import visualBuilderPostMessage from "./visualBuilderPostMessage.js";
async function getResolvedVariantPermissions(fieldContext) {
  var _a;
  try {
    const result = await ((_a = visualBuilderPostMessage) == null ? void 0 : _a.send(VisualBuilderPostMessageEvents.GET_RESOLVED_VARIANT_PERMISSIONS, fieldContext));
    return result ?? {
      update: true,
      error: true
    };
  } catch (e) {
    console.warn("Error retrieving resolved variant permissions", e);
    return {
      update: true,
      error: true
    };
  }
}
export {
  getResolvedVariantPermissions
};
//# sourceMappingURL=getResolvedVariantPermissions.js.map