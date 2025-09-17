import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/getWorkflowStageDetails.ts
import { VisualBuilderPostMessageEvents } from "./types/postMessage.types.js";
import visualBuilderPostMessage from "./visualBuilderPostMessage.js";
async function getWorkflowStageDetails({
  entryUid,
  contentTypeUid,
  locale,
  variantUid
}) {
  try {
    const result = await visualBuilderPostMessage?.send(
      VisualBuilderPostMessageEvents.GET_WORKFLOW_STAGE_DETAILS,
      {
        entryUid,
        contentTypeUid,
        locale,
        variantUid
      }
    );
    if (result) {
      return result;
    }
  } catch (e) {
    console.debug(
      "[Visual Builder] Error fetching workflow stage details",
      e
    );
  }
  return {
    stage: {
      name: "Unknown"
    },
    permissions: {
      entry: {
        update: true
      }
    }
  };
}
export {
  getWorkflowStageDetails
};
//# sourceMappingURL=getWorkflowStageDetails.js.map