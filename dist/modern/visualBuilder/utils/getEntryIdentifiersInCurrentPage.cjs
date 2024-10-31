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

// src/visualBuilder/utils/getEntryIdentifiersInCurrentPage.ts
var getEntryIdentifiersInCurrentPage_exports = {};
__export(getEntryIdentifiersInCurrentPage_exports, {
  getEntryIdentifiersInCurrentPage: () => getEntryIdentifiersInCurrentPage
});
module.exports = __toCommonJS(getEntryIdentifiersInCurrentPage_exports);
var import_cslpdata = require("../../cslp/cslpdata.cjs");
function getEntryIdentifiersInCurrentPage() {
  const elementsWithCslp = Array.from(
    document.querySelectorAll("[data-cslp]")
  );
  const uniqueEntriesMap = /* @__PURE__ */ new Map();
  elementsWithCslp.forEach((element) => {
    const cslpData = (0, import_cslpdata.extractDetailsFromCslp)(
      element.getAttribute("data-cslp")
    );
    uniqueEntriesMap.set(
      cslpData.entry_uid,
      {
        entryUid: cslpData.entry_uid,
        contentTypeUid: cslpData.content_type_uid,
        locale: cslpData.locale
      }
    );
  });
  const uniqueEntriesArray = Array.from(uniqueEntriesMap.values());
  return {
    entriesInCurrentPage: uniqueEntriesArray
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getEntryIdentifiersInCurrentPage
});
//# sourceMappingURL=getEntryIdentifiersInCurrentPage.cjs.map