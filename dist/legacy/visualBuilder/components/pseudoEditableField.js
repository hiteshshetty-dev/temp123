import "../../chunk-5WRI5ZAA.js";

// src/visualBuilder/components/pseudoEditableField.tsx
import classNames from "classnames";
import { visualBuilderStyles } from "../visualBuilder.style.js";
import { getPsuedoEditableElementStyles } from "../utils/getPsuedoEditableStylesElement.js";
import { jsx } from "preact/jsx-runtime";
function PseudoEditableFieldComponent(props) {
  const styles = getPsuedoEditableElementStyles(props.editableElement, true);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: classNames(
        "visual-builder__pseudo-editable-element",
        visualBuilderStyles()["visual-builder__pseudo-editable-element"]
      ),
      "data-testid": "visual-builder__pseudo-editable-element",
      style: styles,
      children: props.config.textContent
    }
  );
}
var pseudoEditableField_default = PseudoEditableFieldComponent;
export {
  pseudoEditableField_default as default
};
//# sourceMappingURL=pseudoEditableField.js.map