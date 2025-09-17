import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/getEntryPermissions.ts
import { VisualBuilderPostMessageEvents } from "./types/postMessage.types.js";
import visualBuilderPostMessage from "./visualBuilderPostMessage.js";
async function getEntryPermissions({
  entryUid,
  contentTypeUid,
  locale
}) {
  var _a;
  try {
    const permissions = await ((_a = visualBuilderPostMessage) == null ? void 0 : _a.send(
      VisualBuilderPostMessageEvents.GET_PERMISSIONS,
      {
        type: "entry",
        entryUid,
        contentTypeUid,
        locale
      }
    ));
    if (permissions) {
      return permissions;
    }
  } catch (error) {
    console.debug("[Visual Builder] Error fetching permissions", error);
  }
  return {
    create: true,
    read: true,
    update: true,
    delete: true,
    publish: true
  };
}
export {
  getEntryPermissions
};
//# sourceMappingURL=getEntryPermissions.js.map