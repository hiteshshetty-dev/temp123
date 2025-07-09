import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/getPsuedoEditableStylesElement.ts
import getCamelCaseStyles from "./getCamelCaseStyles.js";
import { getPsuedoEditableEssentialStyles } from "./getPsuedoEditableEssentialStyles.js";
import getStyleOfAnElement from "./getStyleOfAnElement.js";
function getPsuedoEditableElementStyles(psuedoEditableElement, camelCase) {
  let styles = getStyleOfAnElement(psuedoEditableElement);
  const rect = psuedoEditableElement.getBoundingClientRect();
  if (camelCase) {
    styles = getCamelCaseStyles(styles);
  }
  const overrides = getPsuedoEditableEssentialStyles({ rect, camelCase });
  return { ...styles, ...overrides };
}
export {
  getPsuedoEditableElementStyles
};
//# sourceMappingURL=getPsuedoEditableStylesElement.js.map