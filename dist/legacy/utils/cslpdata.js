import "../chunk-5WRI5ZAA.js";

// src/utils/cslpdata.ts
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
export {
  extractDetailsFromCslp
};
//# sourceMappingURL=cslpdata.js.map