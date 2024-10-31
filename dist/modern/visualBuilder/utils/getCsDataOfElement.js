import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/getCsDataOfElement.ts
import { extractDetailsFromCslp } from "../../cslp/cslpdata.js";
import { DATA_CSLP_ATTR_SELECTOR } from "./constants.js";
function getCsDataOfElement(event) {
  const targetElement = event.target;
  if (!targetElement) {
    return;
  }
  const editableElement = targetElement.closest("[data-cslp]");
  if (!editableElement) {
    return;
  }
  const cslpData = editableElement.getAttribute("data-cslp");
  if (!cslpData) {
    return;
  }
  const fieldMetadata = extractDetailsFromCslp(cslpData);
  return {
    editableElement,
    cslpData,
    fieldMetadata
  };
}
function getDOMEditStack(ele) {
  const cslpSet = [];
  let curr = ele.closest(`[${DATA_CSLP_ATTR_SELECTOR}]`);
  while (curr) {
    const cslp = curr.getAttribute(DATA_CSLP_ATTR_SELECTOR);
    const entryPrefix = cslp.split(".").slice(0, 3).join(".");
    const hasSamePrevPrefix = (cslpSet.at(0) || "").startsWith(entryPrefix);
    if (!hasSamePrevPrefix) {
      cslpSet.unshift(cslp);
    }
    curr = curr.parentElement?.closest(`[${DATA_CSLP_ATTR_SELECTOR}]`);
  }
  return cslpSet.map((cslp) => extractDetailsFromCslp(cslp));
}
export {
  getCsDataOfElement,
  getDOMEditStack
};
//# sourceMappingURL=getCsDataOfElement.js.map