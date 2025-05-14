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

// src/visualBuilder/utils/getEntryPermissionsCached.ts
var getEntryPermissionsCached_exports = {};
__export(getEntryPermissionsCached_exports, {
  getEntryPermissionsCached: () => getEntryPermissionsCached
});
module.exports = __toCommonJS(getEntryPermissionsCached_exports);
var import_getEntryPermissions = require("./getEntryPermissions.cjs");
var import_createCachedFetch = require("./createCachedFetch.cjs");
var getEntryPermissionsCached = (0, import_createCachedFetch.createCachedFetch)(
  import_getEntryPermissions.getEntryPermissions,
  ({ entryUid, contentTypeUid, locale }) => `${entryUid}.${contentTypeUid}.${locale}`
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getEntryPermissionsCached
});
//# sourceMappingURL=getEntryPermissionsCached.cjs.map