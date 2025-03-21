import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/generators/generatePseudoEditableField.tsx
import { render } from "preact";
import PseudoEditableFieldComponent from "../components/pseudoEditableField.js";
import { jsx } from "preact/jsx-runtime";
function isEllipsisActive(element) {
  return element.offsetWidth < element.scrollWidth;
}
function generatePseudoEditableElement(elements, config) {
  const { editableElement } = elements;
  const visualBuilderContainer = document.querySelector(
    ".visual-builder__container"
  );
  const wrapper = document.createDocumentFragment();
  render(
    /* @__PURE__ */ jsx(
      PseudoEditableFieldComponent,
      {
        editableElement,
        config
      }
    ),
    wrapper
  );
  visualBuilderContainer?.appendChild(wrapper);
  const pseudoEditableElement = document.querySelector(
    ".visual-builder__pseudo-editable-element"
  );
  return pseudoEditableElement;
}
export {
  generatePseudoEditableElement,
  isEllipsisActive
};
//# sourceMappingURL=generatePseudoEditableField.js.map