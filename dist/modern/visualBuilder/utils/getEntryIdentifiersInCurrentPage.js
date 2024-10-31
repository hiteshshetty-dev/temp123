import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/getEntryIdentifiersInCurrentPage.ts
import { extractDetailsFromCslp } from "../../cslp/cslpdata.js";
function getEntryIdentifiersInCurrentPage() {
  const elementsWithCslp = Array.from(
    document.querySelectorAll("[data-cslp]")
  );
  const uniqueEntriesMap = /* @__PURE__ */ new Map();
  elementsWithCslp.forEach((element) => {
    const cslpData = extractDetailsFromCslp(
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
export {
  getEntryIdentifiersInCurrentPage
};
//# sourceMappingURL=getEntryIdentifiersInCurrentPage.js.map