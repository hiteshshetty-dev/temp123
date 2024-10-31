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

// src/visualBuilder/utils/getChildElements.ts
var getChildElements_exports = {};
__export(getChildElements_exports, {
  default: () => getChildElements
});
module.exports = __toCommonJS(getChildElements_exports);
function getChildElements(parentElement, parentCslpValue) {
  const childElements = parentElement.querySelectorAll(
    `[data-cslp^="${parentCslpValue + "."}"]`
  );
  const filteredChildElements = Array.from(childElements).filter(
    (childElement) => childElement.getAttribute("data-cslp")?.match(/\.\d+$/) !== null
  );
  const firstChild = filteredChildElements.at(0);
  if (!firstChild) return [null, null, () => {
  }];
  const secondChild = filteredChildElements.at(1);
  if (secondChild) return [firstChild, secondChild, () => {
  }];
  const firstChildClone = document.createElement(firstChild.tagName);
  firstChildClone.setAttribute(
    "class",
    firstChild.getAttribute("class") ?? ""
  );
  const HIDE_ELEMENT_CSS = "overflow: hidden !important; width: 0 !important; height: 0 !important; padding: 0 !important; border: 0 !important;";
  firstChildClone.setAttribute("style", HIDE_ELEMENT_CSS);
  parentElement.appendChild(firstChildClone);
  function removeClone() {
    parentElement.removeChild(firstChildClone);
  }
  return [firstChild, firstChildClone, removeClone];
}
//# sourceMappingURL=getChildElements.cjs.map