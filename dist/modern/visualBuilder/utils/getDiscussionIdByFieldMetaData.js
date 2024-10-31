import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/getDiscussionIdByFieldMetaData.ts
import visualBuilderPostMessage from "./visualBuilderPostMessage.js";
import { VisualBuilderPostMessageEvents } from "./types/postMessage.types.js";
import { hasPostMessageError } from "./errorHandling.js";
async function getDiscussionIdByFieldMetaData(params) {
  const { fieldMetadata, fieldSchema } = params;
  const discussion = await visualBuilderPostMessage?.send(
    VisualBuilderPostMessageEvents.GET_DISCUSSION_ID,
    { fieldMetadata, fieldSchema }
  ) ?? null;
  if (hasPostMessageError(discussion)) {
    return null;
  }
  return discussion;
}
export {
  getDiscussionIdByFieldMetaData
};
//# sourceMappingURL=getDiscussionIdByFieldMetaData.js.map