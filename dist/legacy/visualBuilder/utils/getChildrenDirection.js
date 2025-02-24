import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/getChildrenDirection.ts
import getChildElements from "./getChildElements.js";
var validPositions = ["vertical", "horizontal", "none"];
function getChildrenDirection(editableElement, parentCslpValue) {
  if (!editableElement) {
    return "none";
  }
  const parentElement = editableElement.closest(
    `[data-cslp="${parentCslpValue}"]`
  );
  if (!parentElement) {
    return "none";
  }
  const directionFromParentElement = parentElement.getAttribute("data-add-direction");
  const isValidParentDirection = validPositions.includes(
    directionFromParentElement
  );
  if (directionFromParentElement && isValidParentDirection) {
    return directionFromParentElement;
  }
  const [firstChildElement, secondChildElement, removeClone] = getChildElements(parentElement, parentCslpValue);
  if (!firstChildElement) return "none";
  const firstChildBounds = firstChildElement.getBoundingClientRect();
  const secondChildBounds = secondChildElement.getBoundingClientRect();
  const deltaX = Math.abs(firstChildBounds.left - secondChildBounds.left);
  const deltaY = Math.abs(firstChildBounds.top - secondChildBounds.top);
  const dir = deltaX > deltaY ? "horizontal" : "vertical";
  removeClone();
  return dir;
}
export {
  getChildrenDirection as default
};
//# sourceMappingURL=getChildrenDirection.js.map