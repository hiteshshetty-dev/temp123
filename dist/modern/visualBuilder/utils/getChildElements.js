import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/getChildElements.ts
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
export {
  getChildElements as default
};
//# sourceMappingURL=getChildElements.js.map