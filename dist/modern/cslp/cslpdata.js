import "../chunk-5WRI5ZAA.js";

// src/cslp/cslpdata.ts
import { isNil, isFinite, findLastIndex, findLast } from "lodash-es";
import Config from "../configManager/configManager.js";
import { cslpTagStyles } from "../livePreview/editButton/editButton.style.js";
function extractDetailsFromCslp(cslpValue) {
  let [cslpVersion, cslpData] = cslpValue.split(":");
  if (cslpVersion.length > 2) {
    cslpData = cslpVersion;
    cslpVersion = "v1";
  }
  const [content_type_uid, entryInfo, locale, ...fieldPath] = cslpData.split(".");
  let entry_uid;
  let variant;
  switch (cslpVersion) {
    case "v2": {
      const [uid, variant_uid] = entryInfo.split("_");
      entry_uid = uid;
      variant = variant_uid;
      break;
    }
    default: {
      entry_uid = entryInfo;
      break;
    }
  }
  const instancePathWithInstance = fieldPath.join(".");
  const calculatedPath = fieldPath.filter((path) => {
    const isEmpty = isNil(path);
    const isNumber = isFinite(+path);
    return !isEmpty && !isNumber || false;
  });
  const multipleFieldMetadata = getMultipleFieldMetadata(
    content_type_uid,
    entry_uid,
    locale,
    fieldPath
  );
  if (isFinite(+fieldPath[fieldPath.length - 1])) {
    fieldPath.pop();
  }
  return {
    entry_uid,
    content_type_uid,
    variant,
    locale,
    cslpValue,
    fieldPath: calculatedPath.join("."),
    fieldPathWithIndex: fieldPath.join("."),
    multipleFieldMetadata,
    instance: {
      fieldPathWithIndex: instancePathWithInstance
    }
  };
}
function getParentPathDetails(content_type_uid, entry_uid, locale, fieldPath) {
  const index = findLastIndex(fieldPath, (path) => isFinite(+path));
  if (index === -1) return null;
  const parentPath = fieldPath.slice(0, index);
  return {
    parentPath: parentPath.join("."),
    parentCslpValue: [
      content_type_uid,
      entry_uid,
      locale,
      ...parentPath
    ].join(".")
  };
}
function getMultipleFieldMetadata(content_type_uid, entry_uid, locale, fieldPath) {
  const parentDetails = getParentPathDetails(
    content_type_uid,
    entry_uid,
    locale,
    fieldPath
  );
  const index = findLast(fieldPath, (path) => isFinite(+path));
  return {
    parentDetails,
    index: isNil(index) ? -1 : +index
  };
}
function addCslpOutline(e, callback) {
  const elements = Config.get().elements;
  let trigger = true;
  const eventTargets = e.composedPath();
  for (const eventTarget of eventTargets) {
    const element = eventTarget;
    if (element.nodeName === "BODY") break;
    if (typeof element?.getAttribute !== "function") continue;
    const cslpTag = element.getAttribute("data-cslp");
    if (trigger && cslpTag) {
      if (elements.highlightedElement)
        elements.highlightedElement.classList.remove(
          cslpTagStyles()["cslp-edit-mode"]
        );
      element.classList.add(cslpTagStyles()["cslp-edit-mode"]);
      const updatedElements = elements;
      updatedElements.highlightedElement = element;
      Config.set("elements", updatedElements);
      callback?.({
        cslpTag,
        highlightedElement: element
      });
      trigger = false;
    } else if (!trigger) {
      element.classList.remove(cslpTagStyles()["cslp-edit-mode"]);
    }
  }
}
export {
  addCslpOutline,
  extractDetailsFromCslp
};
//# sourceMappingURL=cslpdata.js.map