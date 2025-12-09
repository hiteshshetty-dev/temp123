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

// src/visualBuilder/utils/fetchEntryPermissionsAndStageDetails.ts
var fetchEntryPermissionsAndStageDetails_exports = {};
__export(fetchEntryPermissionsAndStageDetails_exports, {
  fetchEntryPermissionsAndStageDetails: () => fetchEntryPermissionsAndStageDetails
});
module.exports = __toCommonJS(fetchEntryPermissionsAndStageDetails_exports);
var import_getEntryPermissionsCached = require("./getEntryPermissionsCached.cjs");
var import_getResolvedVariantPermissions = require("./getResolvedVariantPermissions.cjs");
var import_getWorkflowStageDetails = require("./getWorkflowStageDetails.cjs");
async function fetchEntryPermissionsAndStageDetails({
  entryUid,
  contentTypeUid,
  locale,
  variantUid,
  fieldPathWithIndex
}) {
  const entryAclPromise = (0, import_getEntryPermissionsCached.getEntryPermissionsCached)({
    entryUid,
    contentTypeUid,
    locale
  });
  const resolvedVariantPermissionsPromise = (0, import_getResolvedVariantPermissions.getResolvedVariantPermissions)({
    entry_uid: entryUid,
    content_type_uid: contentTypeUid,
    locale,
    variant: variantUid,
    fieldPathWithIndex
  });
  const entryWorkflowStageDetailsPromise = (0, import_getWorkflowStageDetails.getWorkflowStageDetails)({
    entryUid,
    contentTypeUid,
    locale,
    variantUid
  });
  const results = await Promise.allSettled([
    entryAclPromise,
    entryWorkflowStageDetailsPromise,
    resolvedVariantPermissionsPromise
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
  if (results[2].status === "rejected") {
    console.debug(
      "[Visual Builder] Error retrieving resolved variant permissions",
      results[2].reason
    );
  }
  const acl = results[0].status === "fulfilled" ? results[0].value : void 0;
  const workflowStage = results[1].status === "fulfilled" ? results[1].value : void 0;
  const resolvedVariantPermissions = results[2].status === "fulfilled" ? results[2].value : void 0;
  return {
    acl,
    workflowStage,
    resolvedVariantPermissions
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fetchEntryPermissionsAndStageDetails
});
//# sourceMappingURL=fetchEntryPermissionsAndStageDetails.cjs.map