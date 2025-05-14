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
function getPrefix(cslp) {
  let prefix;
  if (cslp.startsWith("v2:")) {
    const variantPrefix = cslp.split(":")[1];
    const content_type_uid = variantPrefix.split(".")[0];
    const euid = variantPrefix.split(".")[1].split("_")[0];
    const locale = variantPrefix.split(".")[2];
    prefix = `${content_type_uid}.${euid}.${locale}`;
  } else {
    prefix = cslp;
  }
  return prefix.split(".").slice(0, 3).join(".");
}
function getDOMEditStack(ele) {
  var _a;
  const cslpSet = [];
  let curr = ele.closest(`[${DATA_CSLP_ATTR_SELECTOR}]`);
  while (curr) {
    const cslp = curr.getAttribute(DATA_CSLP_ATTR_SELECTOR);
    const entryPrefix = getPrefix(cslp);
    const hasSamePrevPrefix = getPrefix(cslpSet.at(0) || "").startsWith(
      entryPrefix
    );
    if (!hasSamePrevPrefix) {
      cslpSet.unshift(cslp);
    }
    curr = (_a = curr.parentElement) == null ? void 0 : _a.closest(`[${DATA_CSLP_ATTR_SELECTOR}]`);
  }
  return cslpSet.map((cslp) => extractDetailsFromCslp(cslp));
}
export {
  getCsDataOfElement,
  getDOMEditStack
};
//# sourceMappingURL=getCsDataOfElement.js.map