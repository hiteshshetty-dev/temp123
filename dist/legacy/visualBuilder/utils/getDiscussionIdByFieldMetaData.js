import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/getDiscussionIdByFieldMetaData.ts
import visualBuilderPostMessage from "./visualBuilderPostMessage.js";
import { VisualBuilderPostMessageEvents } from "./types/postMessage.types.js";
import { hasPostMessageError } from "./errorHandling.js";
async function getDiscussionIdByFieldMetaData(params) {
  var _a;
  const { fieldMetadata, fieldSchema } = params;
  const discussion = await ((_a = visualBuilderPostMessage) == null ? void 0 : _a.send(
    VisualBuilderPostMessageEvents.GET_DISCUSSION_ID,
    { fieldMetadata, fieldSchema }
  )) ?? null;
  if (hasPostMessageError(discussion)) {
    return null;
  }
  return discussion;
}
export {
  getDiscussionIdByFieldMetaData
};
//# sourceMappingURL=getDiscussionIdByFieldMetaData.js.map