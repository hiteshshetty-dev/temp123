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

// src/utils/cslpdata.ts
var cslpdata_exports = {};
__export(cslpdata_exports, {
  extractDetailsFromCslp: () => extractDetailsFromCslp
});
module.exports = __toCommonJS(cslpdata_exports);
function extractDetailsFromCslp(cslpValue) {
  let [cslpVersion, cslpData] = cslpValue.split(":");
  if (cslpVersion.length > 2) {
    cslpData = cslpVersion;
    cslpVersion = "v1";
  }
  return destructureCslpValue(cslpData, cslpVersion);
}
function destructureCslpValue(cslpData, version) {
  const [content_type_uid, entryInfo, locale, ...fieldPath] = cslpData.split(".");
  switch (version) {
    case "v2": {
      const [entry_uid, variant] = entryInfo.split("_");
      return {
        entry_uid,
        content_type_uid,
        variant,
        locale,
        cslpValue: cslpData,
        fieldPath: fieldPath.join(".")
      };
    }
    default:
      return {
        entry_uid: entryInfo,
        content_type_uid,
        locale,
        cslpValue: cslpData,
        fieldPath: fieldPath.join(".")
      };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  extractDetailsFromCslp
});
//# sourceMappingURL=cslpdata.cjs.map