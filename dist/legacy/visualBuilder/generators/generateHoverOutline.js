import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/generators/generateHoverOutline.tsx
import { visualBuilderStyles } from "../visualBuilder.style.js";
function addHoverOutline(targetElement, disabled, isVariant) {
  const targetElementDimension = targetElement.getBoundingClientRect();
  const hoverOutline = document.querySelector(
    ".visual-builder__hover-outline"
  );
  if (hoverOutline) {
    hoverOutline.classList.remove(
      visualBuilderStyles()["visual-builder__hover-outline--hidden"]
    );
    if (disabled) {
      hoverOutline.classList.add(
        visualBuilderStyles()["visual-builder__hover-outline--disabled"]
      );
    } else {
      hoverOutline.classList.remove(
        visualBuilderStyles()["visual-builder__hover-outline--disabled"]
      );
      if (isVariant) {
        hoverOutline.classList.add(
          visualBuilderStyles()["visual-builder__hover-outline--variant"]
        );
      } else {
        hoverOutline.classList.remove(
          visualBuilderStyles()["visual-builder__hover-outline--variant"]
        );
      }
    }
    hoverOutline.style.top = `${targetElementDimension.top + window.scrollY}px`;
    hoverOutline.style.left = `${targetElementDimension.left}px`;
    hoverOutline.style.width = `${targetElementDimension.width}px`;
    hoverOutline.style.height = `${targetElementDimension.height}px`;
  }
}
export {
  addHoverOutline
};
//# sourceMappingURL=generateHoverOutline.js.map