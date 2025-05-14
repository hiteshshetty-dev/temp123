import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/getEntryPermissionsCached.ts
import { getEntryPermissions } from "./getEntryPermissions.js";
import { createCachedFetch } from "./createCachedFetch.js";
var getEntryPermissionsCached = createCachedFetch(
  getEntryPermissions,
  ({ entryUid, contentTypeUid, locale }) => `${entryUid}.${contentTypeUid}.${locale}`
);
export {
  getEntryPermissionsCached
};
//# sourceMappingURL=getEntryPermissionsCached.js.map