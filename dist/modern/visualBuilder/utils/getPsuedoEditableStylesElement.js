import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/getPsuedoEditableStylesElement.ts
import getCamelCaseStyles from "./getCamelCaseStyles.js";
import getStyleOfAnElement from "./getStyleOfAnElement.js";
function getPsuedoEditableElementStyles(psuedoEditableElement, camelCase) {
  let styles = getStyleOfAnElement(psuedoEditableElement);
  if (camelCase) {
    styles = getCamelCaseStyles(styles);
  }
  const rect = psuedoEditableElement.getBoundingClientRect();
  styles.position = "absolute";
  styles.top = `${rect.top + window.scrollY}px`;
  styles.left = `${rect.left + window.scrollX}px`;
  styles.height = "auto";
  styles.whiteSpace = "pre-line";
  styles.textTransform = "none";
  return styles;
}
export {
  getPsuedoEditableElementStyles
};
//# sourceMappingURL=getPsuedoEditableStylesElement.js.map