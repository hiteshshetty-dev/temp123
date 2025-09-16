import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/fetchEntryPermissionsAndStageDetails.ts
import { getEntryPermissionsCached } from "./getEntryPermissionsCached.js";
import { getWorkflowStageDetails } from "./getWorkflowStageDetails.js";
async function fetchEntryPermissionsAndStageDetails({
  entryUid,
  contentTypeUid,
  locale,
  variantUid
}) {
  const entryAclPromise = getEntryPermissionsCached({
    entryUid,
    contentTypeUid,
    locale
  });
  const entryWorkflowStageDetailsPromise = getWorkflowStageDetails({
    entryUid,
    contentTypeUid,
    locale,
    variantUid
  });
  const results = await Promise.allSettled([
    entryAclPromise,
    entryWorkflowStageDetailsPromise
  ]);
  if (results[0].status === "rejected") {
    console.debug(
      "[Visual Builder] Error retrieving entry permissions",
      results[0].reason
    );
  }
  if (results[1].status === "rejected") {
    console.debug(
      "[Visual Builder] Error retrieving entry stage details",
      results[1].reason
    );
  }
  const acl = results[0].status === "fulfilled" ? results[0].value : void 0;
  const workflowStage = results[1].status === "fulfilled" ? results[1].value : void 0;
  return {
    acl,
    workflowStage
  };
}
export {
  fetchEntryPermissionsAndStageDetails
};
//# sourceMappingURL=fetchEntryPermissionsAndStageDetails.js.map