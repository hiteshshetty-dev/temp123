import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/utils/getPsuedoEditableEssentialStyles.ts
import getCamelCaseStyles from "./getCamelCaseStyles.js";
function getPsuedoEditableEssentialStyles({
  rect,
  camelCase
}) {
  const overrides = {
    position: "absolute",
    top: `${rect.top + window.scrollY}px`,
    left: `${rect.left + window.scrollX}px`,
    height: "auto",
    "min-height": `${Math.abs(rect.height)}px`,
    "white-space": "normal",
    "text-transform": "none",
    "text-wrap-mode": "wrap",
    "text-overflow": "visible"
  };
  return camelCase ? getCamelCaseStyles(overrides) : overrides;
}
export {
  getPsuedoEditableEssentialStyles
};
//# sourceMappingURL=getPsuedoEditableEssentialStyles.js.map